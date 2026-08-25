import { NextRequest, NextResponse } from 'next/server';
import { submitContactInquiry } from '@/lib/supabase';
import { sendContactConfirmationEmail, sendContactAdminNotificationEmail } from '@/lib/email/brevo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, name, email, phone, company, sector, subject, message } = body;

    const contactName = fullName || name;

    if (!contactName || typeof contactName !== 'string' || !contactName.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const result = await submitContactInquiry({
      fullName: contactName,
      email,
      phone,
      company,
      sector,
      subject,
      message,
    });

    // Send transactional emails via Brevo
    try {
      await Promise.allSettled([
        sendContactConfirmationEmail({
          toName: contactName,
          toEmail: email,
          sector,
          subject,
          message,
        }),
        sendContactAdminNotificationEmail({
          fullName: contactName,
          email,
          phone,
          company,
          sector,
          subject,
          message,
        }),
      ]);
    } catch (emailErr) {
      console.error('Brevo email sending notice:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
