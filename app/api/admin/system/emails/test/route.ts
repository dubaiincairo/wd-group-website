import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/admin/auth';
import {
  sendContactConfirmationEmail,
  sendContactAdminNotificationEmail,
  sendJobApplicationConfirmationEmail,
  sendJobApplicationAdminNotificationEmail,
  sendPasswordResetEmail,
  sendMagicSignInEmail,
  sendOrderConfirmationEmail,
} from '@/lib/email/brevo';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { templateId, targetEmail } = body;

    const emailToSend = targetEmail?.trim() || session.email;

    if (!emailToSend || !emailToSend.includes('@')) {
      return NextResponse.json({ error: 'Valid target email required' }, { status: 400 });
    }

    let result: { success: boolean; messageId?: string; error?: string; simulated?: boolean };

    switch (templateId) {
      case 'client-inquiry':
        result = await sendContactConfirmationEmail({
          toName: session.fullName || 'Valued Partner',
          toEmail: emailToSend,
          sector: 'manufacturing',
          subject: '[TEST] Factory Furnishing & Millwork Inquiry',
          message: 'This is a test commercial inquiry dispatched from the WD Group Admin Console.',
        });
        break;

      case 'admin-lead':
        result = await sendContactAdminNotificationEmail({
          fullName: 'Eng. Mohammed Al-Shaibani (Test Lead)',
          email: emailToSend,
          phone: '+966 50 572 5070',
          company: 'WD Group Testing Corp',
          sector: 'hospitality',
          subject: '[TEST] VIP Hospitality Contract RFP',
          message: 'This is a test lead dispatch notification previewing the admin CRM email format.',
        });
        break;

      case 'career-candidate':
        result = await sendJobApplicationConfirmationEmail({
          candidateName: session.fullName || 'Candidate Partner',
          candidateEmail: emailToSend,
          jobTitle: 'Senior Interior Architect',
        });
        break;

      case 'hr-ats':
        result = await sendJobApplicationAdminNotificationEmail({
          candidateName: 'Fahad Al-Husseini (Test Candidate)',
          email: emailToSend,
          phone: '+966 55 123 4567',
          city: 'Riyadh, Saudi Arabia',
          sector: 'manufacturing',
          jobTitle: 'Senior Interior Architect',
          linkedinUrl: 'https://linkedin.com/in/wdgroup',
          resumeUrl: 'https://fqkbgfdasfwnryekkgqz.supabase.co/storage/v1/object/public/assets/test_resume.pdf',
          coverNote: 'Excited to bring 10+ years of Saudi mega-project architectural experience to WD Group.',
        });
        break;

      case 'admin-reset':
        result = await sendPasswordResetEmail({
          adminName: session.fullName || 'Executive Admin',
          adminEmail: emailToSend,
          resetUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online'}/admin/auth/reset-password?token=sample_demo_token`,
        });
        break;

      case 'magic-link':
        result = await sendMagicSignInEmail({
          adminName: session.fullName || 'Executive Admin',
          adminEmail: emailToSend,
          magicUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online'}/api/admin/auth/magic-link/verify?token=sample_demo_token`,
        });
        break;

      case 'furniture-order':
        result = await sendOrderConfirmationEmail({
          customerName: session.fullName || 'Valued Buyer',
          customerEmail: emailToSend,
          orderNumber: `WD-ORD-${Date.now().toString().slice(-6)}`,
          items: [
            { title: 'طقم كنب الضيافة الملكي (Royal Velvet Sofa)', quantity: 1, price: 14500 },
            { title: 'طاولة طعام خشب الجوز الفاخر (Walnut Dining Table)', quantity: 1, price: 8200 },
          ],
          totalAmount: 22700,
          currency: 'ر.س',
          shippingAddress: 'حي النرجس، شارع أنس بن مالك، الرياض، المملكة العربية السعودية',
        });
        break;

      default:
        return NextResponse.json({ error: 'Unknown template ID' }, { status: 400 });
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to dispatch email' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      simulated: result.simulated,
      messageId: result.messageId,
      message: result.simulated
        ? `Simulation: Email logged to console for ${emailToSend}`
        : `Email dispatched successfully to ${emailToSend}`,
    });
  } catch (error: any) {
    console.error('Test email route error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
