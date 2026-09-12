import { NextRequest, NextResponse } from 'next/server';
import { createEcommerceOrder } from '@/lib/admin/ecommerceDb';
import { createTamaraCheckoutSession } from '@/lib/ecommerce/tamara';
import { createTabbyCheckoutSession } from '@/lib/ecommerce/tabby';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';
import { calculateAuthoritativePricing } from '@/lib/ecommerce/pricing';
import { checkCheckoutRateLimit, verifyHoneypot, getClientIp } from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 0. Honeypot check
    if (verifyHoneypot(body)) {
      return NextResponse.json({ success: true, checkoutUrl: '#' });
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
      provider, // 'tamara' | 'tabby'
      customer,
      items,
      orderType = 'retail',
      companyName,
      crNumber,
      vatNumber,
      deliveryDate,
      timeSlot,
      whiteGloveAssembly,
      wallAnchoring,
      subtotal,
      discountAmount = 0,
      promoCode,
      vatAmount,
      totalAmount,
      installmentsCount = 4,
    } = body;

    if (!provider || (provider !== 'tamara' && provider !== 'tabby')) {
      return NextResponse.json(
        { success: false, error: 'Invalid BNPL provider specified. Choose tamara or tabby.' },
        { status: 400 }
      );
    }

    const settings = await getEcommerceSettings().catch(() => null);
    if (provider === 'tamara' && settings && settings.enableTamara === false) {
      return NextResponse.json(
        { success: false, error: 'Tamara installment payments are currently disabled by the store administrator.' },
        { status: 403 }
      );
    }
    if (provider === 'tabby' && settings && settings.enableTabby === false) {
      return NextResponse.json(
        { success: false, error: 'Tabby installment payments are currently disabled by the store administrator.' },
        { status: 403 }
      );
    }

    if (!customer?.phone || !customer?.email) {
      return NextResponse.json(
        { success: false, error: 'Customer phone and email are required for BNPL verification.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart cannot be empty.' },
        { status: 400 }
      );
    }

    // 1. Generate Order Reference
    const prefix = provider === 'tamara' ? 'WD-TMR' : 'WD-TBY';
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `${prefix}-2026-${randomSuffix}`;

    const customerFullName = customer.fullName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'WD Client';

    // 2. Authoritative Pricing & Anti-Tampering Engine
    const pricing = await calculateAuthoritativePricing({
      items,
      promoCode,
      clientSubtotal: Number(subtotal),
      clientVatAmount: Number(vatAmount),
      clientTotalAmount: Number(totalAmount),
    });

    if (pricing.isTampered) {
      console.warn(`[SECURITY ALERT] BNPL session price tampering intercepted on ${orderRef}: ${pricing.tamperReason}`);
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

    // 3. Persist order in DB with pending_payment and tamper-proof totals
    const newOrder = await createEcommerceOrder({
      orderRef,
      customerName: customerFullName,
      email: customer.email,
      phone: customer.phone,
      city: customer.city || 'Riyadh',
      district: customer.district,
      address: customer.address,
      villaBuilding: customer.villaBuilding,
      deliveryNotes: customer.deliveryNotes,
      orderType,
      companyName,
      crNumber,
      vatNumber,
      deliveryDate,
      timeSlot,
      whiteGloveAssembly,
      wallAnchoring,
      paymentMethod: provider,
      paymentStatus: 'unpaid',
      status: 'pending_payment',
      subtotal: pricing.subtotal,
      discountAmount: pricing.discountAmount,
      promoCode,
      vatAmount: pricing.vatAmount,
      totalAmount: pricing.totalAmount,
      items: formattedItems,
    });

    const origin = req.nextUrl.origin || 'https://test.wdgroup.online';
    const successCallbackUrl = `${origin}/api/ecommerce/payments/bnpl/callback?payment=${provider}&orderRef=${encodeURIComponent(orderRef)}`;
    const cancelCallbackUrl = `${origin}/furniture/checkout?cancelled=1&ref=${encodeURIComponent(orderRef)}`;
    const failureCallbackUrl = `${origin}/furniture/checkout?failed=1&ref=${encodeURIComponent(orderRef)}`;

    // 4. Initiate BNPL Provider Session with Authoritative Total
    if (provider === 'tamara') {
      const tamaraResult = await createTamaraCheckoutSession({
        orderRef,
        totalAmount: pricing.totalAmount,
        consumer: {
          firstName: customer.firstName || 'Valued',
          lastName: customer.lastName || 'Client',
          phone: customer.phone,
          email: customer.email,
        },
        shippingAddress: {
          firstName: customer.firstName || 'Valued',
          lastName: customer.lastName || 'Client',
          line1: `${customer.address || ''} ${customer.district || ''}`.trim() || 'Kingdom of Saudi Arabia',
          city: customer.city || 'Riyadh',
          countryCode: 'SA',
          phone: customer.phone,
        },
        items: pricing.items.map((it) => ({
          name: it.nameEn,
          referenceId: it.sku,
          sku: it.sku,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalAmount: it.totalPrice,
          imageUrl: it.image,
        })),
        installmentsCount: installmentsCount as 3 | 4,
        successUrl: successCallbackUrl,
        cancelUrl: cancelCallbackUrl,
        failureUrl: failureCallbackUrl,
      });

      if (tamaraResult.success && tamaraResult.checkoutUrl) {
        return NextResponse.json({
          success: true,
          provider: 'tamara',
          redirectUrl: tamaraResult.checkoutUrl,
          orderRef,
          isSimulated: tamaraResult.isSimulated,
        });
      }

      return NextResponse.json(
        { success: false, error: tamaraResult.error || 'Failed to initialize Tamara checkout session.' },
        { status: 500 }
      );
    }

    if (provider === 'tabby') {
      const tabbyResult = await createTabbyCheckoutSession({
        orderRef,
        totalAmount: pricing.totalAmount,
        buyer: {
          name: customerFullName,
          email: customer.email,
          phone: customer.phone,
        },
        city: customer.city || 'Riyadh',
        address: `${customer.address || ''} ${customer.district || ''}`.trim(),
        items: pricing.items.map((it) => ({
          title: it.nameEn,
          sku: it.sku,
          unitPrice: it.unitPrice,
          quantity: it.quantity,
          imageUrl: it.image,
        })),
        successUrl: successCallbackUrl,
        cancelUrl: cancelCallbackUrl,
        failureUrl: failureCallbackUrl,
      });

      if (tabbyResult.success && tabbyResult.checkoutUrl) {
        return NextResponse.json({
          success: true,
          provider: 'tabby',
          redirectUrl: tabbyResult.checkoutUrl,
          orderRef,
          isSimulated: tabbyResult.isSimulated,
        });
      }

      return NextResponse.json(
        { success: false, error: tabbyResult.error || 'Failed to initialize Tabby checkout session.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: false, error: 'Provider not supported.' }, { status: 400 });
  } catch (err: any) {
    console.error('Error initiating BNPL payment:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error while initiating installment session.' },
      { status: 500 }
    );
  }
}
