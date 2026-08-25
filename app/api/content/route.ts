import { NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/admin/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getSiteContent();
    return NextResponse.json({ success: true, data: data || null });
  } catch (error: any) {
    return NextResponse.json({ success: false, data: null }, { status: 500 });
  }
}
