import { NextRequest, NextResponse } from 'next/server';
import { createOdooLead, testOdooConnection, isOdooConfigured, getOdooConfig } from '@/lib/odoo/odooClient';

export const dynamic = 'force-dynamic';

// Test Odoo connection
export async function GET() {
  try {
    const config = getOdooConfig();
    const isConfigured = isOdooConfigured();
    const status = await testOdooConnection();
    return NextResponse.json({
      success: true,
      data: status,
      configured: isConfigured,
      details: {
        url: config.url || 'https://wdgroup.odoo.com',
        db: config.db || 'wdgroup',
        username: config.username || null,
        hasApiKey: Boolean(config.apiKey),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Error testing Odoo connection',
        configured: isOdooConfigured(),
      },
      { status: 500 }
    );
  }
}

// Create Odoo lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await createOdooLead({
      title: body.title || `Inquiry from ${body.contactName || body.name || 'Client'}`,
      contactName: body.contactName || body.fullName || body.name || 'Valued Client',
      email: body.email,
      phone: body.phone,
      city: body.city,
      company: body.company,
      sector: body.sector || 'general',
      subject: body.subject,
      message: body.message,
      orderRef: body.orderRef,
      totalAmount: body.totalAmount,
      items: body.items,
      priority: body.priority || '2',
    });

    return NextResponse.json({
      success: result.success,
      data: result,
    });
  } catch (err: any) {
    console.error('Error creating lead in Odoo:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to dispatch lead to Odoo',
      },
      { status: 500 }
    );
  }
}
