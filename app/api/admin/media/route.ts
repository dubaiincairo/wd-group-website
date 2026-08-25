import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { getMediaRecords, registerMediaRecord } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const bucket = searchParams.get('bucket') || 'all';

    const media = await getMediaRecords(bucket);
    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin', 'editor'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await req.json();
    const { bucket_id, file_name, file_url, file_size, mime_type, alt_text_ar, alt_text_en, tags } = body;

    if (!file_url || !file_name) {
      return NextResponse.json({ error: 'File name and URL are required' }, { status: 400 });
    }

    const record = await registerMediaRecord({
      bucket_id: bucket_id || 'photos',
      file_name,
      file_url,
      file_size,
      mime_type,
      alt_text_ar,
      alt_text_en,
      tags: Array.isArray(tags) ? tags : [],
      uploaded_by: session.userId,
    });

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'media.upload',
      resourceType: 'media_record',
      resourceId: record.id,
      details: { file_name, bucket_id },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success: true, media: record });
  } catch (error: any) {
    console.error('Error registering media:', error);
    return NextResponse.json({ error: error?.message || 'Failed to register media' }, { status: 500 });
  }
}
