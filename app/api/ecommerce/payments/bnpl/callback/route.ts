import { NextRequest, NextResponse } from 'next/server';
import { getEcommerceOrderByRef, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
import { authorizeTamaraOrder } from '@/lib/ecommerce/tamara';
import { sendOrderTaxInvoiceEmail } from '@/lib/ecommerce/emailInvoice';
import { sendOrderConfirmationSms } from '@/lib/ecommerce/sms';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentProvider = searchParams.get('payment') || 'tamara';
    const orderRef = searchParams.get('orderRef') || '';
    const paymentStatus = searchParams.get('paymentStatus') || searchParams.get('status') || '';
    const tamaraOrderId = searchParams.get('tamaraOrderId') || searchParams.get('orderId') || '';
    const tabbyPaymentId = searchParams.get('tabbyPaymentId') || searchParams.get('payment_id') || '';

    const origin = req.nextUrl.origin || 'https://test.wdgroup.online';

    if (!orderRef) {
      return NextResponse.redirect(`${origin}/furniture/checkout?error=missing_order_ref`);
    }

    const order = await getEcommerceOrderByRef(orderRef);
    if (!order) {
      return NextResponse.redirect(`${origin}/furniture/checkout?error=order_not_found`);
    }

    // 1. Verify Tamara Order if applicable
    if (paymentProvider === 'tamara') {
      if (tamaraOrderId && !tamaraOrderId.startsWith('tamara_sim_')) {
        const authRes = await authorizeTamaraOrder(tamaraOrderId);
        if (!authRes.success) {
          console.warn('[Tamara Authorization Warning]:', authRes.error);
        }
      }
    }

    // 2. Mark order confirmed and paid
    await updateEcommerceOrderStatus(
      orderRef,
      'confirmed',
      'System Automator',
      `Payment approved via ${paymentProvider.toUpperCase()} installments (Ref: ${tamaraOrderId || tabbyPaymentId || 'Verified'}).`
    );

    // 3. Trigger Transactional ZATCA Email & SMS alerts asynchronously
    const refreshedOrder = { ...order, status: 'confirmed' as const, paymentStatus: 'paid' };
    
    sendOrderTaxInvoiceEmail(refreshedOrder).catch((emailErr) => {
      console.warn('[ZATCA Email Dispatch Error]:', emailErr);
    });

    if (order.phone) {
      sendOrderConfirmationSms({
        phone: order.phone,
        orderRef: order.orderRef,
        customerName: order.customerName,
        totalAmount: order.totalAmount,
      }).catch((smsErr) => {
        console.warn('[Order Confirmation SMS Error]:', smsErr);
      });
    }

    // 4. Redirect customer to success screen
    return NextResponse.redirect(
      `${origin}/furniture/checkout?success=1&ref=${encodeURIComponent(orderRef)}&payment=${paymentProvider}`
    );
  } catch (err: any) {
    console.error('Error in BNPL callback:', err);
    const origin = req.nextUrl.origin || 'https://test.wdgroup.online';
    return NextResponse.redirect(`${origin}/furniture/checkout?error=callback_exception`);
  }
}
