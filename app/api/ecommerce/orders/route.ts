import { NextRequest, NextResponse } from 'next/server';
import { createEcommerceOrder, listEcommerceOrders, updateEcommerceOrderStatus, getEcommerceOrderByRef } from '@/lib/admin/ecommerceDb';
import { sendOrderStageNotification } from '@/lib/email/orderNotifications';
import { createOdooSaleOrder, isOdooConfiguredAsync } from '@/lib/odoo/odooClient';
import { sendOrderTaxInvoiceEmail } from '@/lib/ecommerce/emailInvoice';
import { sendOrderConfirmationSms, sendOrderDispatchSms } from '@/lib/ecommerce/sms';
import { calculateAuthoritativePricing } from '@/lib/ecommerce/pricing';
import { checkCheckoutRateLimit, verifyHoneypot, getClientIp } from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 0. Anti-Bot Honeypot Trap
    if (verifyHoneypot(body)) {
      return NextResponse.json({
        success: true,
        orderRef: `WD-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'pending_payment',
      });
    }

    // 1. Anti-Abuse Rate Limiting (10 checkouts per 15 min per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkCheckoutRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: rateLimit.reason },
        { status: 429 }
      );
    }

    const {
      customer,
      items,
      paymentMethod = 'card',
      orderType = 'retail',
      companyName,
      crNumber,
      vatNumber,
      deliveryDate,
      timeSlot = 'morning',
      whiteGloveAssembly = true,
      wallAnchoring = false,
      subtotal,
      discountAmount = 0,
      promoCode,
      vatAmount,
      totalAmount,
      orderRef: customRef,
    } = body;

    // 1. Basic validation
    if (!customer || !customer.email || !customer.phone) {
      return NextResponse.json(
        { success: false, error: 'Customer contact details (email and phone) are required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot create an order without items.' },
        { status: 400 }
      );
    }

    // 2. Generate canonical Order Reference
    const prefix = orderType === 'b2b' ? 'WD-RFQ' : 'WD-ORD';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderRef = customRef || `${prefix}-2026-${randomSuffix}`;

    // Customer full name
    const customerFullName = customer.fullName || 
      `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 
      'Valued Client';

    // 3. Authoritative Server Pricing & Anti-Tampering Engine
    const pricing = await calculateAuthoritativePricing({
      items,
      promoCode,
      clientSubtotal: Number(subtotal),
      clientVatAmount: Number(vatAmount),
      clientTotalAmount: Number(totalAmount),
    });

    if (pricing.isTampered) {
      console.warn(`[SECURITY ALERT] Price tampering intercepted on order ${orderRef}: ${pricing.tamperReason}`);
    }

    const formattedItems = pricing.items.map((it) => ({
      productId: it.productId,
      sku: it.sku,
      nameEn: it.nameEn,
      nameAr: it.nameAr,
      finishId: it.finishId,
      finishNameEn: it.finishNameEn,
      finishNameAr: it.finishNameAr,
      unitPrice: it.unitPrice,
      quantity: it.quantity,
      image: it.image,
    }));

    // 4. Save to Database via dual-layer helper with tamper-proof totals
    const order = await createEcommerceOrder({
      orderRef,
      customerName: customerFullName,
      email: customer.email,
      phone: customer.phone,
      city: customer.city || 'Riyadh',
      district: customer.district || '',
      address: customer.address || '',
      villaBuilding: customer.villaBuilding || '',
      deliveryNotes: customer.deliveryNotes || '',
      orderType,
      companyName,
      crNumber,
      vatNumber,
      deliveryDate,
      timeSlot,
      whiteGloveAssembly: Boolean(whiteGloveAssembly),
      wallAnchoring: Boolean(wallAnchoring),
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'unpaid' : (paymentMethod === 'bank_transfer' ? 'pending' : 'paid'),
      subtotal: pricing.subtotal,
      discountAmount: pricing.discountAmount,
      promoCode,
      vatAmount: pricing.vatAmount,
      totalAmount: pricing.totalAmount,
      items: formattedItems,
    });

    // 5. Asynchronous Notification via Brevo
    sendOrderStageNotification({
      orderRef,
      customerName: customerFullName,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      newStatus: 'pending_payment',
      city: customer.city || 'Riyadh',
      leadTechnician: 'م. فهد الغامدي',
      scheduledDeliveryDate: deliveryDate,
      totalAmount: calculatedTotal,
      lang: 'ar',
    }).catch((err) => {
      console.warn('[Order Notification Email Failed]', err);
    });

    // 5b. Dispatch Official ZATCA Tax Invoice Email & Saudi SMS Confirmation
    sendOrderTaxInvoiceEmail(order).catch((err) => {
      console.warn('[ZATCA Email Dispatch Error]', err);
    });

    if (customer.phone) {
      sendOrderConfirmationSms({
        phone: customer.phone,
        orderRef: order.orderRef,
        customerName: customerFullName,
        totalAmount: calculatedTotal,
        lang: 'ar',
      }).catch((err) => {
        console.warn('[Order Confirmation SMS Error]', err);
      });
    }

    // 6. Optional Sync with Odoo ERP
    isOdooConfiguredAsync().then((configured) => {
      if (configured) {
        createOdooSaleOrder({
          orderRef,
          customer: {
            name: customerFullName,
            email: customer.email,
            phone: customer.phone,
            city: customer.city,
            address: customer.address,
            district: customer.district,
            companyName: companyName,
          },
          items: formattedItems.map((item) => ({
            name: item.nameEn,
            sku: item.sku,
            qty: item.quantity,
            unitPrice: item.unitPrice,
            finishName: item.finishNameEn,
          })),
          totalAmount: calculatedTotal,
          paymentMethod,
          deliveryNotes: customer.deliveryNotes,
          autoConfirm: false,
        }).catch((odooErr) => {
          console.warn('[Odoo Background Sync Error]', odooErr);
        });
      }
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      orderRef: order.orderRef,
      order,
      trackUrl: `/furniture/track?ref=${encodeURIComponent(order.orderRef)}`,
    });

  } catch (error: any) {
    console.error('Error creating ecommerce order:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to place order.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const orderType = searchParams.get('orderType') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0;

    const result = await listEcommerceOrders({
      status,
      orderType,
      search,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error('Error listing ecommerce orders:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderRef, status, leadTechnician, noteText } = body;

    if (!orderRef || !status) {
      return NextResponse.json(
        { success: false, error: 'orderRef and status are required' },
        { status: 400 }
      );
    }

    const updated = await updateEcommerceOrderStatus(
      orderRef,
      status,
      leadTechnician,
      noteText
    );

    // If out for delivery, dispatch real-time fleet SMS
    if ((status === 'dispatched' || status === 'out_for_delivery') && updated) {
      getEcommerceOrderByRef(orderRef).then((order) => {
        if (order?.phone) {
          sendOrderDispatchSms({
            phone: order.phone,
            orderRef: order.orderRef,
            customerName: order.customerName,
            leadTechnician,
            lang: 'ar',
          }).catch((smsErr) => {
            console.warn('[Dispatch SMS Error]:', smsErr);
          });
        }
      }).catch(() => {});
    }

    return NextResponse.json({
      success: updated,
      orderRef,
      status,
    });
  } catch (error: any) {
    console.error('Error updating ecommerce order status:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update order status' },
      { status: 500 }
    );
  }
}

