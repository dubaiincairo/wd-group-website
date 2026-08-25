import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminUserByEmail } from '@/lib/admin/db';
import { createAdminSession, ADMIN_COOKIE_NAME } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, credentialId } = body;

    const trimmedEmail = (email || '').trim().toLowerCase();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid administrator email is required' }, { status: 400 });
    }

    const user = await getAdminUserByEmail(trimmedEmail);
    if (!user || !user.is_active) {
      return NextResponse.json({ error: 'Administrator account not found or deactivated' }, { status: 403 });
    }

    // Action 1: Get challenge for Touch ID / Passkey prompt
    if (action === 'get_challenge') {
      const challenge = crypto.randomBytes(32).toString('base64url');
      return NextResponse.json({
        success: true,
        challenge,
        userId: user.id,
        userName: user.email,
        displayName: user.full_name,
      });
    }

    // Action 2: Verify biometric passkey and establish session
    if (action === 'verify_passkey') {
      const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
      const userAgent = req.headers.get('user-agent') || 'biometric-passkey';
      const { token, expiresAt } = await createAdminSession(user.id, ip, userAgent);

      await recordAuditLog({
        actorId: user.id,
        actorEmail: user.email,
        action: 'auth.passkey_biometric_login',
        resourceType: 'admin_session',
        resourceId: user.id,
        details: { ip, userAgent, credentialId },
        ipAddress: ip,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Biometric Touch ID authentication successful',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
        },
      });

      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
      });

      return response;
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('Passkey error:', error);
    return NextResponse.json(
      { error: error?.message || 'Biometric authentication failed' },
      { status: 500 }
    );
  }
}
