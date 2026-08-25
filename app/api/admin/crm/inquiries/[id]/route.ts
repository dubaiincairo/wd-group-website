import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { updateInquiry } from '@/lib/admin/db';
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

    if (!hasPermission(session.role, ['owner', 'admin', 'crm'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { status, assigned_to, new_note } = body;

    const patch: any = {};
    if (status) patch.status = status;
    if (assigned_to !== undefined) patch.assigned_to = assigned_to;

    // If new note is provided, fetch existing or append
    if (new_note && typeof new_note === 'string' && new_note.trim()) {
      // First get existing
      const { getInquiries } = await import('@/lib/admin/db');
      const current = await getInquiries({ limit: 1 });
      // We will handle note append safely
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

    const updated = await updateInquiry(id, patch);

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'crm.inquiry_update',
      resourceType: 'contact_submissions',
      resourceId: id,
      details: patch,
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      inquiry: updated,
    });
  } catch (error: any) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}
