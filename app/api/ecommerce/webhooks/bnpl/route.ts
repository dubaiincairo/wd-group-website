import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getEcommerceOrderByRef, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
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
    const { searchParams } = new URL(req.url);
    const provider = (searchParams.get('provider') || 'tamara').toLowerCase();
    const rawBody = await req.text();
    let body: any = {};
    try {
      body = JSON.parse(rawBody || '{}');
    } catch {
      body = {};
    }

    const settings = await getEcommerceSettings();

    // 1. Authenticate Provider Webhook
    if (provider === 'tamara') {
      const expectedToken = settings.tamaraNotificationToken?.trim();
      if (expectedToken) {
        const authHeader = req.headers.get('authorization') || '';
        const bearerToken = authHeader.toLowerCase().startsWith('bearer ')
          ? authHeader.substring(7).trim()
          : authHeader.trim();
        const signature = req.headers.get('tamara-signature') || '';
        const tokenHeader = req.headers.get('x-tamara-token') || '';
        const queryToken = searchParams.get('token') || searchParams.get('notification_token') || '';

        const candidateToken = signature || bearerToken || tokenHeader || queryToken;

        if (!candidateToken || !timingSafeMatch(candidateToken, expectedToken)) {
          console.warn('[Security Alert] Unauthorized Tamara webhook attempt. Invalid notification token.');
          return NextResponse.json(
            { success: false, error: 'Unauthorized: Invalid Tamara notification token or signature.' },
            { status: 401 }
          );
        }
      } else {
        console.warn('[Security Warning] tamaraNotificationToken not configured. Allowing Tamara webhook in fallback mode.');
      }
    } else if (provider === 'tabby') {
      const expectedSecret = settings.tabbyWebhookSecret?.trim();
      if (expectedSecret) {
        const authHeader = req.headers.get('authorization') || '';
        const bearerToken = authHeader.toLowerCase().startsWith('bearer ')
          ? authHeader.substring(7).trim()
          : authHeader.trim();
        const tabbySig = req.headers.get('x-tabby-signature') || req.headers.get('x-signature') || '';
        const querySecret = searchParams.get('secret') || '';

        // Tabby HMAC verification
        const computedHmac = crypto.createHmac('sha256', expectedSecret).update(rawBody).digest('hex');

        const isHmacValid = tabbySig ? timingSafeMatch(tabbySig, computedHmac) : false;
        const isTokenValid = (bearerToken || querySecret) ? timingSafeMatch(bearerToken || querySecret, expectedSecret) : false;

        if (!isHmacValid && !isTokenValid) {
          console.warn('[Security Alert] Unauthorized Tabby webhook attempt. Invalid HMAC signature or secret.');
          return NextResponse.json(
            { success: false, error: 'Unauthorized: Invalid Tabby webhook HMAC signature or secret.' },
            { status: 401 }
          );
        }
      } else {
        console.warn('[Security Warning] tabbyWebhookSecret not configured. Allowing Tabby webhook in fallback mode.');
      }
    }

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
