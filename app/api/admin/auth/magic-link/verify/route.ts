import { NextRequest, NextResponse } from 'next/server';
import { verifyAndConsumePasswordResetToken, getAdminUserByEmail } from '@/lib/admin/db';
import { hashToken, createAdminSession, ADMIN_COOKIE_NAME } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const origin = host ? `${proto}://${host}` : (req.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online');

  if (!token) {
    return NextResponse.redirect(`${origin}/admin/login?error=${encodeURIComponent('Missing or invalid sign-in token.')}`);
  }

  try {
    const tokenHash = hashToken(token);

    // 1. Verify and consume the magic token
    const verification = await verifyAndConsumePasswordResetToken(tokenHash, email || undefined);

    if (!verification.success || !verification.email) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent(verification.error || 'The sign-in link has expired or has already been used.')}`
      );
    }

    // 2. Fetch admin user
    const user = await getAdminUserByEmail(verification.email);
    if (!user || !user.is_active) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=${encodeURIComponent('Administrator account is deactivated or not found.')}`
      );
    }

    // 3. Create active session
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'magic-link';
    const { token: sessionToken, expiresAt } = await createAdminSession(user.id, ip, userAgent);

    // 4. Record audit log
    await recordAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'auth.magic_link_login',
      resourceType: 'admin_session',
      resourceId: user.id,
      details: { ip, userAgent },
      ipAddress: ip,
    });

    // 5. Set session cookie and redirect directly to Admin Dashboard
    const redirectResponse = NextResponse.redirect(`${origin}/admin`);
    redirectResponse.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });

    return redirectResponse;
  } catch (error: any) {
    console.error('Magic link verification error:', error);
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent('An error occurred during authentication. Please try again.')}`
    );
  }
}
