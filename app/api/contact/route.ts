import { NextRequest, NextResponse } from 'next/server';
import { submitContactInquiry } from '@/lib/supabase';
import { 
  sendContactConfirmationEmail, 
  sendContactAdminNotificationEmail, 
  sendOrderConfirmationEmail 
} from '@/lib/email/brevo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if it's an ecommerce order placement
    if (body.type === 'furniture_checkout' && body.customer) {
      const { orderRef, customer, items, total, paymentMethod } = body;
      const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Valued Customer';
      const customerEmail = customer.email;
      const fullAddress = `${customer.address || ''}, ${customer.district || ''}, ${customer.city || ''}`.trim();

      if (customerEmail && customerEmail.includes('@')) {
        try {
          await Promise.allSettled([
            sendOrderConfirmationEmail({
              customerName,
              customerEmail,
              orderNumber: orderRef || `WD-ORD-${Date.now().toString().slice(-6)}`,
              items: (items || []).map((i: any) => ({
                title: i.name || 'Furniture Item',
                quantity: i.qty || 1,
                price: i.unitPrice || 0,
              })),
              totalAmount: total || 0,
              currency: 'ر.س',
              shippingAddress: fullAddress,
            }),
            sendContactAdminNotificationEmail({
              fullName: customerName,
              email: customerEmail,
              phone: customer.phone,
              company: `Order ${orderRef} (${paymentMethod})`,
              sector: 'manufacturing',
              subject: `New Store Order: ${orderRef}`,
              message: `New furniture store order placed by ${customerName}. Total: ${total} SAR. Delivery Address: ${fullAddress}. Items: ${(items || []).map((i: any) => `${i.name} (x${i.qty})`).join(', ')}`,
            }),
          ]);
        } catch (err) {
          console.error('Order confirmation email error:', err);
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Order received and confirmation dispatched',
      });
    }

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
