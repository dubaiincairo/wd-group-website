import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/admin/db';
import { getRequestSession } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getSiteContent();
    return NextResponse.json({ success: true, data: data || null });
  } catch (error: any) {
    return NextResponse.json({ success: false, data: null }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid content payload' }, { status: 400 });
    }

    const ok = await updateSiteContent(body);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Failed to update content in database' }, { status: 500 });
    }

    // Record audit log if session exists
    const session = await getRequestSession(req);
    if (session) {
      await recordAuditLog({
        actorId: session.userId,
        actorEmail: session.email,
        action: 'UPDATE_CONTENT_LIVE_EDITOR',
        resourceType: 'site_content',
        resourceId: 'main',
        details: { liveEditor: true, timestamp: new Date().toISOString() },
      });
    }

    return NextResponse.json({ success: true, message: 'Content updated successfully' });
  } catch (error: any) {
    console.error('Error saving content via live editor API:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
