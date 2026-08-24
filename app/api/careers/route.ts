import { NextRequest, NextResponse } from 'next/server';
import { submitJobApplication } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, city, sector, linkedin, coverNote, resumeUrl, jobId, jobTitle } = body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const result = await submitJobApplication({
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
      data: result,
    });
  } catch (error: any) {
    console.error('Error submitting job application:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}
