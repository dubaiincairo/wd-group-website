import { NextRequest, NextResponse } from 'next/server';
import { submitJobApplication } from '@/lib/supabase';

const MAX_BODY_BYTES = 20_000;
const ALLOWED_SECTORS = new Set(['hospitality', 'manufacturing', 'contracting', 'corporate']);

const cleanString = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const cleanHttpUrl = (value: unknown) => {
  const candidate = cleanString(value, 2_048);
  if (!candidate) return '';

  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : '';
  } catch {
    return '';
  }
};

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request is too large' }, { status: 413 });
    }

    const body = await req.json();
    const fullName = cleanString(body.fullName, 120);
    const email = cleanString(body.email, 254).toLowerCase();
    const phone = cleanString(body.phone, 40);
    const city = cleanString(body.city, 120);
    const requestedSector = cleanString(body.sector, 40);
    const sector = ALLOWED_SECTORS.has(requestedSector) ? requestedSector : null;
    const linkedin = cleanHttpUrl(body.linkedin);
    const resumeUrl = cleanHttpUrl(body.resumeUrl);
    const coverNote = cleanString(body.coverNote, 3_000);
    const jobId = cleanString(body.jobId, 100);
    const jobTitle = cleanString(body.jobTitle, 200);

    if (!fullName) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    await submitJobApplication({
      fullName,
      email,
      phone,
      city,
      sector,
      linkedin,
      coverNote,
      resumeUrl,
      jobId,
      jobTitle,
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error: unknown) {
    console.error('Error submitting job application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
