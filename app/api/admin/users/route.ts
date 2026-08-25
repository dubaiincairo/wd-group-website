import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission, hashPassword } from '@/lib/admin/auth';
import { callRpc } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';
import type { AdminUser } from '@/lib/admin/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const rows = await callRpc<AdminUser[]>('rpc_admin_list_users');
    return NextResponse.json({ success: true, users: rows });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await req.json();
    const { email, password, full_name, role, is_active } = body;

    if (!email || !password || !full_name || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Email, Full Name, and password (at least 8 chars) are required' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);
    const userId = await callRpc<string>('rpc_admin_upsert_user', {
      p_id: null,
      p_email: email.trim().toLowerCase(),
      p_password_hash: passwordHash,
      p_full_name: full_name.trim(),
      p_role: role || 'editor',
      p_is_active: is_active ?? true,
    });

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'user.create',
      resourceType: 'admin_user',
      resourceId: userId,
      details: { email, role },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success: true, userId });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create user' }, { status: 500 });
  }
}
