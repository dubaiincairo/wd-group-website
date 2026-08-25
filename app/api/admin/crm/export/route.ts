import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { getInquiries } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin', 'crm'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector') || 'all';
    const status = searchParams.get('status') || 'all';

    const { data } = await getInquiries({ sector, status, limit: 1000 });

    // Build CSV with UTF-8 BOM
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company', 'Sector', 'Subject', 'Status', 'Message'];
    const rows = data.map((item) => [
      `"${item.id}"`,
      `"${new Date(item.created_at).toLocaleString('en-US')}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.company || '').replace(/"/g, '""')}"`,
      `"${(item.sector || '').replace(/"/g, '""')}"`,
      `"${(item.subject || '').replace(/"/g, '""')}"`,
      `"${item.status || 'new'}"`,
      `"${(item.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'crm.export_csv',
      resourceType: 'contact_submissions',
      details: { rowCount: data.length, sector, status },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="wdgroup_leads_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    console.error('Error exporting CSV:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
