import { NextRequest, NextResponse } from 'next/server';
import { getEcommerceOrderByRef, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
import { sendOrderStageNotification } from '@/lib/email/orderNotifications';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Moyasar webhook event can be wrapped in { type, data } or direct payment object
    const payment = payload.data || payload;
    const paymentId = payment.id;
    const paymentStatus = payment.status;
    const metadata = payment.metadata || {};
    const orderRef = metadata.orderRef;

    if (!orderRef) {
      // If orderRef not in metadata, attempt extraction from description
      const desc = payment.description || '';
      const match = desc.match(/WD-(?:ORD|RFQ)-2026-\d{4}/);
      if (!match) {
        return NextResponse.json({ received: true, note: 'No matching order reference found.' });
      }
    }

    const effectiveRef = orderRef || (payment.description?.match(/WD-(?:ORD|RFQ)-2026-\d{4}/)?.[0]);

    if (paymentStatus === 'paid' && effectiveRef) {
      const order = await getEcommerceOrderByRef(effectiveRef);

      // Only advance status if order is currently pending_payment
      if (order && order.status === 'pending_payment') {
        await updateEcommerceOrderStatus(
          effectiveRef,
          'confirmed',
          order.leadTechnician || 'م. فهد الغامدي',
          `Webhook Reconciled: Payment verified via Moyasar webhook (${paymentId}).`
        );

        sendOrderStageNotification({
          orderRef: effectiveRef,
          customerName: order.customerName,
          customerEmail: order.email,
          customerPhone: order.phone,
          newStatus: 'confirmed',
          city: order.city,
          leadTechnician: order.leadTechnician,
          scheduledDeliveryDate: order.deliveryDate,
          totalAmount: order.totalAmount,
          lang: 'ar',
        }).catch((err) => console.warn('[Webhook Brevo Notification Failed]', err));
      }
    }

    return NextResponse.json({
      received: true,
      processedRef: effectiveRef || null,
      status: paymentStatus || null,
    });

  } catch (error: any) {
    console.error('Error handling Moyasar payment webhook:', error);
    return NextResponse.json(
      { received: false, error: error?.message || 'Webhook processing failed.' },
      { status: 500 }
    );
  }
}
