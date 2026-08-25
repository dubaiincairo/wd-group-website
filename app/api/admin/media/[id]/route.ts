import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { deleteMediaRecord } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin', 'editor'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const { id } = params;
    const success = await deleteMediaRecord(id);

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'media.delete',
      resourceType: 'media_record',
      resourceId: id,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Error deleting media record:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete media record' }, { status: 500 });
  }
}
