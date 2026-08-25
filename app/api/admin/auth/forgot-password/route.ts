import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminUserByEmail, createPasswordResetToken } from '@/lib/admin/db';
import { hashToken } from '@/lib/admin/auth';
import { sendPasswordResetEmail } from '@/lib/email/brevo';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Check if admin user exists
    const user = await getAdminUserByEmail(trimmedEmail);

    // For security, always respond with success even if email not found to avoid enumeration
    if (!user || !user.is_active) {
      return NextResponse.json({
        success: true,
        message: 'If the provided email belongs to an active administrator, a reset link has been dispatched.',
      });
    }

    // 2. Generate secure random token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    // 3. Store reset token in database
    const saved = await createPasswordResetToken(trimmedEmail, tokenHash, expiresAt);
    if (!saved) {
      throw new Error('Could not create reset token');
    }

    // 4. Construct reset URL
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const origin = host ? `${proto}://${host}` : (req.nextUrl.origin || process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online');
    const resetUrl = `${origin}/admin/reset-password?token=${token}&email=${encodeURIComponent(trimmedEmail)}`;

    // 5. Send password reset email via Brevo
    await sendPasswordResetEmail({
      adminName: user.full_name || 'Administrator',
      adminEmail: user.email,
      resetUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'If the provided email belongs to an active administrator, a reset link has been dispatched.',
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
