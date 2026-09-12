import { NextRequest, NextResponse } from 'next/server';
import { createEcommerceOrder, getEcommerceOrderByRef } from '@/lib/admin/ecommerceDb';
import { initiateMoyasarPayment } from '@/lib/ecommerce/moyasar';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    const calculatedSubtotal = Number(subtotal) || items.reduce((s: number, i: any) => s + (Number(i.unitPrice || i.price) * (i.quantity || i.qty || 1)), 0);
    const calculatedVat = Number(vatAmount) || (calculatedSubtotal * 0.15);
    const calculatedTotal = Number(totalAmount) || (calculatedSubtotal - Number(discountAmount) + calculatedVat);

    // 3. Persist Order in Pending State
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
        subtotal: calculatedSubtotal,
        discountAmount: Number(discountAmount) || 0,
        promoCode,
        vatAmount: calculatedVat,
        totalAmount: calculatedTotal,
        items: items.map((it: any) => ({
          productId: it.productId || it.id || 'custom-piece',
          sku: it.sku || 'GW-BESPOKE',
          nameEn: it.nameEn || it.name || 'Bespoke Furniture Piece',
          nameAr: it.nameAr || it.name || 'قطعة أثاث فاخرة',
          finishId: it.finishId || it.finish || 'standard',
          finishNameEn: it.finishNameEn || it.finishName || 'Standard Finish',
          finishNameAr: it.finishNameAr || it.finishName || 'التشطيب المعتمد',
          unitPrice: Number(it.unitPrice || it.price || 0),
          quantity: Number(it.quantity || it.qty || 1),
          image: it.image || (it.images && it.images[0]) || '',
        })),
      });
    }

    // 4. Construct Absolute Callback URL
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'test.wdgroup.online';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const callbackUrl = `${proto}://${host}/api/ecommerce/payments/callback?ref=${encodeURIComponent(orderRef)}`;

    // 5. Amount in Halalas (1 SAR = 100 Halalas)
    const amountHalalas = Math.round(calculatedTotal * 100);

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
