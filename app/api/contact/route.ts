import { NextRequest, NextResponse } from 'next/server';
import { submitContactInquiry } from '@/lib/supabase';

const MAX_BODY_BYTES = 20_000;
const ALLOWED_SECTORS = new Set([
  'general',
  'hospitality',
  'manufacturing',
  'contracting',
  'partnership',
  'tender',
  'careers',
  'media',
]);

const cleanString = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
    }

    const body = await req.json();
    const contactName = cleanString(body.fullName || body.name, 120);
    const email = cleanString(body.email, 254).toLowerCase();
    const phone = cleanString(body.phone, 40);
    const company = cleanString(body.company, 160);
    const requestedSector = cleanString(body.sector, 40);
    const sector = ALLOWED_SECTORS.has(requestedSector) ? requestedSector : 'general';
    const subject = cleanString(body.subject, 200);
    const message = cleanString(body.message, 5_000);

    if (!contactName) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    await submitContactInquiry({
      fullName: contactName,
      email,
      phone,
      company,
      sector,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
    });
  } catch (error: unknown) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
