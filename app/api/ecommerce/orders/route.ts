import { NextRequest, NextResponse } from 'next/server';
import { createEcommerceOrder, listEcommerceOrders, updateEcommerceOrderStatus } from '@/lib/admin/ecommerceDb';
import { sendOrderStageNotification } from '@/lib/email/orderNotifications';
import { createOdooSaleOrder, isOdooConfiguredAsync } from '@/lib/odoo/odooClient';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    // Financial calculations fallback check
    const calculatedSubtotal = Number(subtotal) || items.reduce((s: number, i: any) => s + (Number(i.unitPrice || i.price) * (i.quantity || i.qty || 1)), 0);
    const calculatedVat = Number(vatAmount) || (calculatedSubtotal * 0.15);
    const calculatedTotal = Number(totalAmount) || (calculatedSubtotal - Number(discountAmount) + calculatedVat);

    // 3. Format items
    const formattedItems = items.map((it: any) => ({
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
    }));

    // 4. Save to Database via dual-layer helper
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
      paymentStatus: paymentMethod === 'wire_transfer' ? 'pending' : 'paid',
      subtotal: calculatedSubtotal,
      discountAmount: Number(discountAmount) || 0,
      promoCode,
      vatAmount: calculatedVat,
      totalAmount: calculatedTotal,
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

