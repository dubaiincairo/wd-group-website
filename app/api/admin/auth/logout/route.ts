import { NextRequest, NextResponse } from 'next/server';
import { revokeAdminSession, ADMIN_COOKIE_NAME, getRequestSession } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const sessionUser = await getRequestSession(req);
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
    const token = cookie?.value;

    if (token) {
      await revokeAdminSession(token);
    }

    if (sessionUser) {
      await recordAuditLog({
        actorId: sessionUser.userId,
        actorEmail: sessionUser.email,
        action: 'auth.logout',
        resourceType: 'admin_session',
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      });
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    // Clear cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error?.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
