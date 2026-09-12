import { NextRequest, NextResponse } from 'next/server';
import { getEcommerceOrderByRef, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
import { verifyMoyasarPayment } from '@/lib/ecommerce/moyasar';
import { sendOrderStageNotification } from '@/lib/email/orderNotifications';
import { createOdooSaleOrder, isOdooConfiguredAsync } from '@/lib/odoo/odooClient';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get('id');
  const statusParam = searchParams.get('status');
  const messageParam = searchParams.get('message');
  const orderRef = searchParams.get('ref');

  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'test.wdgroup.online';
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${proto}://${host}`;

  if (!orderRef) {
    return NextResponse.redirect(`${baseUrl}/furniture/checkout?error=missing_ref`);
  }

  // 1. If status is directly failed or no paymentId
  if (statusParam === 'failed' || !paymentId) {
    const errorMsg = messageParam || 'Payment was declined by card issuing bank';
    return NextResponse.redirect(
      `${baseUrl}/furniture/checkout?paymentError=${encodeURIComponent(errorMsg)}&ref=${encodeURIComponent(orderRef)}`
    );
  }

  // 2. Server-to-Server Verification with Moyasar
  const verifyResult = await verifyMoyasarPayment(paymentId);

  if (!verifyResult.success || !verifyResult.payment || verifyResult.payment.status !== 'paid') {
    const errorMsg = verifyResult.error || 'Payment verification failed';
    return NextResponse.redirect(
      `${baseUrl}/furniture/checkout?paymentError=${encodeURIComponent(errorMsg)}&ref=${encodeURIComponent(orderRef)}`
    );
  }

  // 3. Mark Order as Confirmed and Paid in Database
  const order = await getEcommerceOrderByRef(orderRef);
  if (order) {
    await updateEcommerceOrderStatus(
      orderRef,
      'confirmed',
      order.leadTechnician || 'م. فهد الغامدي',
      `Payment verified & captured via Moyasar gateway (Moyasar ID: ${paymentId}). Card: ${verifyResult.payment.source?.company || 'Mada'}.`
    );

    // 4. Send Confirmation Email via Brevo
    sendOrderStageNotification({
      orderRef,
      customerName: order.customerName,
      customerEmail: order.email,
      customerPhone: order.phone,
      newStatus: 'confirmed',
      city: order.city,
      leadTechnician: order.leadTechnician,
      scheduledDeliveryDate: order.deliveryDate,
      totalAmount: order.totalAmount,
      lang: 'ar',
    }).catch((e) => console.warn('[Callback Email Notification Warning]', e));

    // 5. Sync to Odoo ERP
    isOdooConfiguredAsync().then((configured) => {
      if (configured && order) {
        createOdooSaleOrder({
          orderRef,
          customer: {
            name: order.customerName,
            email: order.email,
            phone: order.phone,
            city: order.city,
            address: order.address,
            district: order.district,
          },
          items: order.items.map((i) => ({
            name: i.nameEn,
            sku: i.sku,
            qty: i.quantity,
            unitPrice: i.unitPrice,
            finishName: i.finishNameEn,
          })),
          totalAmount: order.totalAmount,
          paymentMethod: 'moyasar_card',
          deliveryNotes: order.deliveryNotes,
          autoConfirm: true,
        }).catch(() => {});
      }
    }).catch(() => {});
  }

  // 6. Redirect to Checkout with Confirmed Success State
  return NextResponse.redirect(
    `${baseUrl}/furniture/checkout?paymentSuccess=true&ref=${encodeURIComponent(orderRef)}&paymentId=${encodeURIComponent(paymentId)}`
  );
}
