import { NextRequest, NextResponse } from 'next/server';
import { getEcommerceOrderByRef, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
import { sendOrderTaxInvoiceEmail } from '@/lib/ecommerce/emailInvoice';
import { sendOrderConfirmationSms } from '@/lib/ecommerce/sms';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const provider = searchParams.get('provider') || 'tamara';
    const body = await req.json().catch(() => ({}));

    // Resolve order reference
    const orderRef = body.order_reference_id || body.reference_id || body.data?.order_reference_id;
    const eventType = body.event_type || body.type || body.status;

    if (!orderRef) {
      return NextResponse.json({ success: false, error: 'No order reference found in webhook payload.' }, { status: 400 });
    }

    const order = await getEcommerceOrderByRef(orderRef);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found in database.' }, { status: 404 });
    }

    // Tamara events: 'order_captured', 'order_authorised', 'payment_approved'
    // Tabby events: 'payment.authorized', 'payment.captured'
    const isApproved = 
      eventType === 'order_captured' || 
      eventType === 'order_authorised' || 
      eventType === 'payment_approved' ||
      eventType === 'payment.authorized' ||
      eventType === 'payment.captured' ||
      body.status === 'authorised' ||
      body.status === 'captured';

    if (isApproved && order.paymentStatus !== 'paid') {
      await updateEcommerceOrderStatus(
        orderRef,
        'confirmed',
        'Webhook Automator',
        `Reconciled asynchronously via ${provider.toUpperCase()} webhook (${eventType}).`
      );

      const refreshedOrder = { ...order, status: 'confirmed' as const, paymentStatus: 'paid' };
      sendOrderTaxInvoiceEmail(refreshedOrder).catch(() => {});
      if (order.phone) {
        sendOrderConfirmationSms({
          phone: order.phone,
          orderRef: order.orderRef,
          customerName: order.customerName,
          totalAmount: order.totalAmount,
        }).catch(() => {});
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (err: any) {
    console.error('BNPL Webhook Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
