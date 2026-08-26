import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminUserByEmail, createPasswordResetToken } from '@/lib/admin/db';
import { hashToken } from '@/lib/admin/auth';
import { sendMagicSignInEmail } from '@/lib/email/brevo';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid administrator email is required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Check if admin user exists in DB
    const user = await getAdminUserByEmail(trimmedEmail);

    if (!user || !user.is_active) {
      // Return success even if not found to prevent user enumeration
      return NextResponse.json({
        success: true,
        message: 'If an administrator account exists with this email, a 1-click sign-in link has been dispatched.',
      });
    }

    // 2. Generate secure single-use token (15-minute expiry)
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // 3. Store in database
    await createPasswordResetToken(trimmedEmail, tokenHash, expiresAt);

    // 4. Construct magic link URL
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = host ? `${proto}://${host}` : (req.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online');
    const magicUrl = `${origin}/api/admin/auth/magic-link/verify?token=${token}&email=${encodeURIComponent(trimmedEmail)}`;

    // 5. Send Magic Link email via Brevo
    const emailResult = await sendMagicSignInEmail({
      adminName: user.full_name || 'Administrator',
      adminEmail: user.email,
      magicUrl,
    });

    if (!emailResult.success) {
      console.error('[Magic Link Dispatch Failed]:', emailResult.error);
      return NextResponse.json(
        { error: `Email dispatch failed: ${emailResult.error || 'Check Brevo API Key'}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'A 1-click magic sign-in link has been dispatched to your email.',
    });
  } catch (error: any) {
    console.error('Magic link dispatch error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to dispatch magic link' },
      { status: 500 }
    );
  }
}
