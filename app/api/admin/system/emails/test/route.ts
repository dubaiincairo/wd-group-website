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
    const { templateId, targetEmail, lang = 'ar' } = body;

    const emailToSend = targetEmail?.trim() || session.email;

    if (!emailToSend || !emailToSend.includes('@')) {
      return NextResponse.json({ error: 'Valid target email required' }, { status: 400 });
    }

    let result: { success: boolean; messageId?: string; error?: string; simulated?: boolean };
    const isAr = lang === 'ar';

    switch (templateId) {
      case 'client-inquiry':
        result = await sendContactConfirmationEmail({
          toName: session.fullName || (isAr ? 'الأستاذ سلطان العتيبي' : 'Eng. Sultan Al-Otaibi'),
          toEmail: emailToSend,
          sector: 'manufacturing',
          subject: isAr ? 'استفسار توريد وتصنيع أثاث فندقي' : 'Hotel Furnishing Package & Joinery Inquiry',
          message: isAr 
            ? 'نقوم حالياً بتطوير مشروع فندق بوتيك بالرياض ونرغب في التعاقد لتوريد الأبواب والأعمال الخشبية والمفروشات الفاخرة.'
            : 'We are developing a boutique hotel in Riyadh and require custom millwork, doors, and luxury guest room furniture.',
          lang,
        });
        break;

      case 'admin-lead':
        result = await sendContactAdminNotificationEmail({
          fullName: isAr ? 'م. سلطان العتيبي (استفسار تجريبي)' : 'Eng. Sultan Al-Otaibi (Test Lead)',
          email: emailToSend,
          phone: '+966 50 123 4567',
          company: isAr ? 'مجموعة العتيبي للتطوير العقاري' : 'Al-Otaibi Developments',
          sector: 'manufacturing',
          subject: isAr ? '[تجربة] استفسار توريد وتصنيع أثاث فندقي' : '[TEST] VIP Hospitality Contract RFP',
          message: isAr
            ? 'هذا إشعار تجريبي لاختبار نموذج تنبيه الإدارة وفريق المبيعات بالعملاء الجدد في نظام CRM.'
            : 'This is a test lead dispatch notification previewing the admin CRM email format.',
          lang,
        });
        break;

      case 'career-candidate':
        result = await sendJobApplicationConfirmationEmail({
          candidateName: session.fullName || (isAr ? 'فهد الحسيني' : 'Fahad Al-Husseini'),
          candidateEmail: emailToSend,
          jobTitle: isAr ? 'مهندس معماري وتصميم داخلي أول' : 'Senior Interior Architect',
          lang,
        });
        break;

      case 'hr-ats':
        result = await sendJobApplicationAdminNotificationEmail({
          candidateName: isAr ? 'فهد الحسيني (مرشح تجريبي)' : 'Fahad Al-Husseini (Test Candidate)',
          email: emailToSend,
          phone: '+966 55 123 4567',
          city: isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
          sector: 'manufacturing',
          jobTitle: isAr ? 'مهندس معماري وتصميم داخلي أول' : 'Senior Interior Architect',
          linkedinUrl: 'https://linkedin.com/in/wdgroup',
          resumeUrl: 'https://fqkbgfdasfwnryekkgqz.supabase.co/storage/v1/object/public/assets/test_resume.pdf',
          coverNote: isAr 
            ? 'يسرني تقديم خبرتي الممتدة لأكثر من 10 سنوات في مشاريع الضيافة الكبرى بالمملكة للانضمام لفريق مجموعة دبليو دي.'
            : 'Excited to bring 10+ years of Saudi mega-project architectural experience to WD Group.',
          lang,
        });
        break;

      case 'admin-reset':
        result = await sendPasswordResetEmail({
          adminName: session.fullName || (isAr ? 'محمد علي الشيباني' : 'Mohammed Ali Al-Shaibani'),
          adminEmail: emailToSend,
          resetUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online'}/admin/auth/reset-password?token=sample_demo_token`,
          lang,
        });
        break;

      case 'magic-link':
        result = await sendMagicSignInEmail({
          adminName: session.fullName || (isAr ? 'محمد علي الشيباني' : 'Mohammed Ali Al-Shaibani'),
          adminEmail: emailToSend,
          magicUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online'}/api/admin/auth/magic-link/verify?token=sample_demo_token`,
          lang,
        });
        break;

      case 'furniture-order':
        result = await sendOrderConfirmationEmail({
          customerName: session.fullName || (isAr ? 'عبدالله الفولي' : 'Abdallah Elfouly'),
          customerEmail: emailToSend,
          orderNumber: `WD-ORD-${Date.now().toString().slice(-6)}`,
          items: [
            { title: isAr ? 'طقم كنب الضيافة الملكي الفاخر' : 'Royal Velvet Luxury Sofa Set', quantity: 1, price: 14500 },
            { title: isAr ? 'طاولة طعام خشب الجوز الطبيعي مع 8 كراسي' : 'Solid Walnut Dining Table (8-Seat)', quantity: 1, price: 8200 },
          ],
          totalAmount: 22700,
          currency: 'ر.س',
          shippingAddress: isAr 
            ? 'حي النرجس، شارع أنس بن مالك، الرياض، المملكة العربية السعودية'
            : 'Al-Narjis District, Anas Ibn Malik St, Riyadh, Saudi Arabia',
          lang,
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
        : `Email dispatched successfully in ${isAr ? 'Arabic' : 'English'} to ${emailToSend}`,
    });
  } catch (error: any) {
    console.error('Test email route error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
