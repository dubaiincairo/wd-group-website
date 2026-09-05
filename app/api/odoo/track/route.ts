import { NextRequest, NextResponse } from 'next/server';
import { getOrderTrackingStatus } from '@/lib/odoo/odooClient';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get('ref') || 'WD-ORD-2026-8812';

    const orderStatus = await getOrderTrackingStatus(ref);

    return NextResponse.json({
      success: true,
      data: orderStatus,
    });
  } catch (err: any) {
    console.error('Error fetching order tracking from Odoo:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to query order tracking status',
      },
      { status: 500 }
    );
  }
}
