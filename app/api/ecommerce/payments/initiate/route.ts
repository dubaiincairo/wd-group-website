import { NextRequest, NextResponse } from 'next/server';
import { createEcommerceOrder, getEcommerceOrderByRef } from '@/lib/admin/ecommerceDb';
import { initiateMoyasarPayment } from '@/lib/ecommerce/moyasar';
import { calculateAuthoritativePricing } from '@/lib/ecommerce/pricing';
import { checkCheckoutRateLimit, verifyHoneypot, getClientIp } from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 0. Honeypot check
    if (verifyHoneypot(body)) {
      return NextResponse.json({ success: true, status: 'initiated', transactionUrl: '#' });
    }

    // 1. Rate limiting (10 attempts per 15 min per IP)
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
      card,
      applePayToken,
      paymentMethod = 'card',
      orderType = 'retail',
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

    // 1. Validation
    if (!customer || !customer.email || !customer.phone) {
      return NextResponse.json(
        { success: false, error: 'Customer contact info (email and phone) is required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot process payment without order items.' },
        { status: 400 }
      );
    }

    if (!card && !applePayToken) {
      return NextResponse.json(
        { success: false, error: 'Card details or Apple Pay token must be provided.' },
        { status: 400 }
      );
    }

    // 2. Generate canonical Order Reference if not existing
    const prefix = orderType === 'b2b' ? 'WD-RFQ' : 'WD-ORD';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderRef = customRef || `${prefix}-2026-${randomSuffix}`;

    const customerFullName = customer.fullName || 
      `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 
      'Valued Client';

    // 3. Authoritative Pricing & Anti-Tampering Engine
    const pricing = await calculateAuthoritativePricing({
      items,
      promoCode,
      clientSubtotal: Number(subtotal),
      clientVatAmount: Number(vatAmount),
      clientTotalAmount: Number(totalAmount),
    });

    if (pricing.isTampered) {
      console.warn(`[SECURITY ALERT] Payment initiation price tampering intercepted on ${orderRef}: ${pricing.tamperReason}`);
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

    // 4. Persist Order in Pending State with verified totals
    const existing = await getEcommerceOrderByRef(orderRef);
    if (!existing) {
      await createEcommerceOrder({
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
        deliveryDate,
        timeSlot,
        whiteGloveAssembly: Boolean(whiteGloveAssembly),
        wallAnchoring: Boolean(wallAnchoring),
        paymentMethod,
        paymentStatus: 'pending',
        subtotal: pricing.subtotal,
        discountAmount: pricing.discountAmount,
        promoCode,
        vatAmount: pricing.vatAmount,
        totalAmount: pricing.totalAmount,
        items: formattedItems,
      });
    }

    // 5. Construct Absolute Callback URL
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'test.wdgroup.online';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const callbackUrl = `${proto}://${host}/api/ecommerce/payments/callback?ref=${encodeURIComponent(orderRef)}`;

    // 6. Verified Amount in Halalas (1 SAR = 100 Halalas)
    const amountHalalas = Math.round(pricing.totalAmount * 100);

    // 6. Charge via Moyasar
    const moyasarResult = await initiateMoyasarPayment({
      amountHalalas,
      description: `GreenWood Luxury Furniture Order ${orderRef} (${customerFullName})`,
      callbackUrl,
      metadata: {
        orderRef,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      },
      card,
      applePayToken,
    });

    if (!moyasarResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: moyasarResult.error || 'Payment gateway declined the transaction.',
          errorDetails: moyasarResult.errorDetails,
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      orderRef,
      status: moyasarResult.status,
      paymentId: moyasarResult.paymentId,
      transactionUrl: moyasarResult.transactionUrl, // 3D-Secure bank page URL
    });

  } catch (error: any) {
    console.error('Error initiating Moyasar payment:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Payment service error.' },
      { status: 500 }
    );
  }
}
