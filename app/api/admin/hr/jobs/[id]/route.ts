import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { upsertJobListing, deleteJobListing } from '@/lib/admin/db';
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

    if (!hasPermission(session.role, ['owner', 'admin', 'hr'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const updated = await upsertJobListing({ ...body, id });

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'hr.job_update',
      resourceType: 'job_listings',
      resourceId: id,
      details: { title: updated.title, published: updated.published },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success: true, job: updated });
  } catch (error: any) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin', 'hr'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const { id } = params;
    const success = await deleteJobListing(id);

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'hr.job_delete',
      resourceType: 'job_listings',
      resourceId: id,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete job' }, { status: 500 });
  }
}
