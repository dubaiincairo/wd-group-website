import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { getAllJobListings, upsertJobListing } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jobs = await getAllJobListings();
    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin', 'hr'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await req.json();
    const { title } = body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    const job = await upsertJobListing(body);

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'hr.job_create',
      resourceType: 'job_listings',
      resourceId: job.id,
      details: { title: job.title, published: job.published },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create job' }, { status: 500 });
  }
}
