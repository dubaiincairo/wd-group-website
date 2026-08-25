import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { getInquiries } from '@/lib/admin/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector') || 'all';
    const status = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const result = await getInquiries({ sector, status, search, limit, offset });

    return NextResponse.json({
      success: true,
      inquiries: result.data,
      total: result.count,
    });
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
