import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getEcommerceOrderByRef, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
import { sendOrderStageNotification } from '@/lib/email/orderNotifications';
import { sendOrderTaxInvoiceEmail } from '@/lib/ecommerce/emailInvoice';
import { sendOrderConfirmationSms } from '@/lib/ecommerce/sms';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';

export const dynamic = 'force-dynamic';

function timingSafeMatch(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const hProvided = crypto.createHash('sha256').update(provided).digest();
  const hExpected = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(hProvided, hExpected);
}

export async function POST(req: NextRequest) {
  try {
    const settings = await getEcommerceSettings();
    const configuredSecret = settings.moyasarWebhookSecret?.trim();

    // Cryptographic Authentication if secret is configured
    if (configuredSecret) {
      const headerSecret = req.headers.get('x-moyasar-secret') || '';
      const authHeader = req.headers.get('authorization') || '';
      const bearerToken = authHeader.toLowerCase().startsWith('bearer ')
        ? authHeader.substring(7).trim()
        : authHeader.trim();
      const querySecret = new URL(req.url).searchParams.get('secret') || '';

      const candidateSecret = headerSecret || bearerToken || querySecret;

      if (!candidateSecret || !timingSafeMatch(candidateSecret, configuredSecret)) {
        console.warn('[Security Alert] Unauthorized Moyasar webhook attempt. Invalid webhook secret provided.');
        return NextResponse.json(
          { received: false, error: 'Unauthorized: Invalid Moyasar webhook signature or secret.' },
          { status: 401 }
        );
      }
    } else {
      console.warn('[Security Warning] moyasarWebhookSecret not set in Ecommerce Settings. Processing in fallback dev/sandbox mode.');
    }

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
