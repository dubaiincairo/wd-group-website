import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hashPassword, verifyPassword } from '@/lib/admin/auth';
import { callRpc } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Verify current password
    const rows = await callRpc<any[]>('rpc_admin_login', { p_email: session.email });
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0];
    const isCurrentValid = verifyPassword(currentPassword, user.password_hash);
    if (!isCurrentValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash and update
    const newHash = hashPassword(newPassword);
    await callRpc('rpc_admin_upsert_user', {
      p_id: session.userId,
      p_email: session.email,
      p_password_hash: newHash,
      p_full_name: session.fullName,
      p_role: session.role,
      p_is_active: true,
    });

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'auth.change_password',
      resourceType: 'admin_user',
      resourceId: session.userId,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error: any) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to change password' },
      { status: 500 }
    );
  }
}
