import { NextRequest, NextResponse } from 'next/server';
import { createEcommerceOrder } from '@/lib/admin/ecommerceDb';
import { createTamaraCheckoutSession } from '@/lib/ecommerce/tamara';
import { createTabbyCheckoutSession } from '@/lib/ecommerce/tabby';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    const calculatedSubtotal = Number(subtotal) || items.reduce((s: number, i: any) => s + (Number(i.unitPrice) * i.quantity), 0);
    const calculatedVat = Number(vatAmount) || (calculatedSubtotal * 0.15);
    const calculatedTotal = Number(totalAmount) || (calculatedSubtotal - Number(discountAmount) + calculatedVat);

    // 2. Persist order in DB with pending_payment
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
      subtotal: calculatedSubtotal,
      discountAmount: Number(discountAmount),
      promoCode,
      vatAmount: calculatedVat,
      totalAmount: calculatedTotal,
      items: items.map((it: any) => ({
        productId: it.productId || it.id,
        sku: it.sku,
        nameEn: it.nameEn,
        nameAr: it.nameAr,
        finishId: it.finishId,
        finishNameEn: it.finishNameEn,
        finishNameAr: it.finishNameAr,
        unitPrice: Number(it.unitPrice || it.price),
        quantity: Number(it.quantity || 1),
        image: it.image,
      })),
    });

    const origin = req.nextUrl.origin || 'https://test.wdgroup.online';
    const successCallbackUrl = `${origin}/api/ecommerce/payments/bnpl/callback?payment=${provider}&orderRef=${encodeURIComponent(orderRef)}`;
    const cancelCallbackUrl = `${origin}/furniture/checkout?cancelled=1&ref=${encodeURIComponent(orderRef)}`;
    const failureCallbackUrl = `${origin}/furniture/checkout?failed=1&ref=${encodeURIComponent(orderRef)}`;

    // 3. Initiate BNPL Provider Session
    if (provider === 'tamara') {
      const tamaraResult = await createTamaraCheckoutSession({
        orderRef,
        totalAmount: calculatedTotal,
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
        items: items.map((it: any) => ({
          name: it.nameEn,
          referenceId: it.sku,
          sku: it.sku,
          quantity: Number(it.quantity || 1),
          unitPrice: Number(it.unitPrice || it.price),
          totalAmount: Number(it.unitPrice || it.price) * Number(it.quantity || 1),
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
        totalAmount: calculatedTotal,
        buyer: {
          name: customerFullName,
          email: customer.email,
          phone: customer.phone,
        },
        city: customer.city || 'Riyadh',
        address: `${customer.address || ''} ${customer.district || ''}`.trim(),
        items: items.map((it: any) => ({
          title: it.nameEn,
          sku: it.sku,
          unitPrice: Number(it.unitPrice || it.price),
          quantity: Number(it.quantity || 1),
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
