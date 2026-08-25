import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserByEmail } from '@/lib/admin/db';
import { createAdminSession, ADMIN_COOKIE_NAME } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const origin = host ? `${proto}://${host}` : (req.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online');

  if (error || !code) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(error || 'Google sign-in was cancelled or failed.')}`
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${origin}/api/admin/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent('Google OAuth is not configured. Missing Client ID or Secret.')}`
    );
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const errData = await tokenRes.json().catch(() => ({}));
      console.error('Google token exchange error:', errData);
      throw new Error('Failed to exchange code with Google');
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch user profile from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      throw new Error('Failed to fetch user info from Google');
    }

    const googleUser = await userRes.json();
    const googleEmail = (googleUser.email || '').toLowerCase().trim();

    if (!googleEmail) {
      throw new Error('No email returned by Google');
    }

    // 3. Verify user is an authorized administrator in Supabase
    const adminUser = await getAdminUserByEmail(googleEmail);

    if (!adminUser || !adminUser.is_active) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent(`Access denied: The Google account (${googleEmail}) does not have administrative privileges.`)}`
      );
    }

    // 4. Create active session
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Google-OAuth';
    const { token: sessionToken, expiresAt } = await createAdminSession(adminUser.id, ip, userAgent);

    // 5. Record audit log
    await recordAuditLog({
      actorId: adminUser.id,
      actorEmail: adminUser.email,
      action: 'auth.google_login',
      resourceType: 'admin_session',
      resourceId: adminUser.id,
      details: { ip, userAgent, googleId: googleUser.sub },
      ipAddress: ip,
    });

    // 6. Set cookie & redirect to Admin console
    const response = NextResponse.redirect(`${origin}/admin`);
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });

    return response;
  } catch (err: any) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(err.message || 'Google authentication failed.')}`
    );
  }
}
