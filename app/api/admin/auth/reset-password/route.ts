import { NextRequest, NextResponse } from 'next/server';
import { verifyAndConsumePasswordResetToken, updateAdminPasswordByEmail } from '@/lib/admin/db';
import { hashToken, hashPassword } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, email, password } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Reset token is required' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const tokenHash = hashToken(token);

    // 1. Verify and consume token
    const verification = await verifyAndConsumePasswordResetToken(tokenHash, email);
    if (!verification.success || !verification.email) {
      return NextResponse.json(
        { error: verification.error || 'Invalid or expired password reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    // 2. Hash new password
    const newPasswordHash = hashPassword(password);

    // 3. Update user password
    const { success: updateSuccess, user: updatedUser } = await updateAdminPasswordByEmail(
      verification.email,
      newPasswordHash
    );

    if (!updateSuccess || !updatedUser) {
      throw new Error('Failed to update administrator password');
    }

    // 4. Record audit log
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    await recordAuditLog({
      actorId: updatedUser.id,
      actorEmail: updatedUser.email,
      action: 'auth.reset_password',
      resourceType: 'admin_user',
      resourceId: updatedUser.id,
      details: { ip, message: 'Password reset via email token' },
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new credentials.',
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to reset password' },
      { status: 500 }
    );
  }
}
