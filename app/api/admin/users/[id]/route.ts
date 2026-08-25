import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission, hashPassword } from '@/lib/admin/auth';
import { callRpc } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { email, password, full_name, role, is_active } = body;

    let passwordHash = null;
    if (password && typeof password === 'string' && password.trim().length >= 8) {
      passwordHash = hashPassword(password);
    }

    const userId = await callRpc<string>('rpc_admin_upsert_user', {
      p_id: id,
      p_email: email.trim().toLowerCase(),
      p_password_hash: passwordHash,
      p_full_name: full_name.trim(),
      p_role: role || 'editor',
      p_is_active: is_active ?? true,
    });

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'user.update',
      resourceType: 'admin_user',
      resourceId: id,
      details: { email, role, is_active },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success: true, userId });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update user' }, { status: 500 });
  }
}
