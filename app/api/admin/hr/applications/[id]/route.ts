import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { updateApplication } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function PATCH(
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
    const { status, rating, new_note } = body;

    const patch: any = {};
    if (status) patch.status = status;
    if (rating !== undefined) patch.rating = rating;

    if (new_note && typeof new_note === 'string' && new_note.trim()) {
      patch.internal_notes = body.internal_notes || [
        {
          id: `note_${Date.now()}`,
          text: new_note.trim(),
          author: session.fullName,
          authorEmail: session.email,
          createdAt: new Date().toISOString(),
        }
      ];
    } else if (body.internal_notes) {
      patch.internal_notes = body.internal_notes;
    }

    const updated = await updateApplication(id, patch);

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'hr.application_update',
      resourceType: 'job_applications',
      resourceId: id,
      details: patch,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update application' }, { status: 500 });
  }
}
