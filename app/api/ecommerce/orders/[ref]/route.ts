import { NextRequest, NextResponse } from 'next/server';
import { getEcommerceOrderByRef } from '@/lib/admin/ecommerceDb';
import { getOrderTrackingStatus } from '@/lib/odoo/odooClient';

export const dynamic = 'force-dynamic';

const STAGE_ORDER_MAP: Record<string, number> = {
  pending_payment: 0,
  confirmed: 1,
  in_production: 2,
  ready_for_dispatch: 3,
  out_for_delivery: 4,
  delivered: 5,
};

const STAGES_TEMPLATE = [
  { stageNum: 1, titleEn: 'Order Registered & Verified', titleAr: 'تسجيل واعتماد تفاصيل الطلب' },
  { stageNum: 2, titleEn: 'Shop Drawings & CAD Review', titleAr: 'اعتماد المخططات التنفيذية وتجهيز المواد' },
  { stageNum: 3, titleEn: 'CNC Machining & Hand Joinery', titleAr: 'أعمال النجارة الدقيقة وماكينات الـ CNC' },
  { stageNum: 4, titleEn: 'Hospitality QA & Safe Crating', titleAr: 'الفحص الفندقي النهائي والتغليف الآمن' },
  { stageNum: 5, titleEn: 'Climate-Controlled Fleet Dispatch', titleAr: 'خروج شاحنات التوصيل والتركيب الميداني' },
  { stageNum: 6, titleEn: 'White-Glove Assembly Completed', titleAr: 'اكتمال التوصيل والتركيب الفندقي' },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { ref: string } }
) {
  try {
    const rawRef = params.ref;
    if (!rawRef) {
      return NextResponse.json(
        { success: false, error: 'Missing order reference' },
        { status: 400 }
      );
    }

    const orderRef = decodeURIComponent(rawRef).trim().toUpperCase();

    // 1. Check Primary Database
    const dbOrder = await getEcommerceOrderByRef(orderRef);

    if (dbOrder) {
      const currentStageIdx = STAGE_ORDER_MAP[dbOrder.status] ?? 0;

      const stagesLog = STAGES_TEMPLATE.map((st, idx) => ({
        stageNum: st.stageNum,
        titleEn: st.titleEn,
        titleAr: st.titleAr,
        completed: idx < currentStageIdx,
        inProgress: idx === currentStageIdx,
      }));

      const formattedTracking = {
        orderRef: dbOrder.orderRef,
        customerName: dbOrder.customerName,
        phone: dbOrder.phone,
        city: dbOrder.city + (dbOrder.district ? ` — ${dbOrder.district}` : ''),
        orderDate: new Date(dbOrder.createdAt).toLocaleDateString('en-GB'),
        estimatedDelivery: dbOrder.deliveryDate || 'Within 10–14 Business Days',
        factory: dbOrder.factory || 'GreenWood Factory 1 & 3 — Riyadh',
        leadTechnician: dbOrder.leadTechnician || 'م. فهد الغامدي',
        currentStageIdx,
        statusText: dbOrder.status,
        paymentStatus: dbOrder.paymentStatus,
        paymentMethod: dbOrder.paymentMethod,
        totalAmount: dbOrder.totalAmount,
        subtotal: dbOrder.subtotal,
        vatAmount: dbOrder.vatAmount,
        orderType: dbOrder.orderType,
        isLiveOdoo: false,
        items: dbOrder.items.map((it) => ({
          name: it.nameEn,
          nameAr: it.nameAr,
          finishName: it.finishNameAr || it.finishNameEn,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          image: it.image,
          sku: it.sku,
        })),
        stagesLog,
      };

      return NextResponse.json({
        success: true,
        source: 'database',
        data: formattedTracking,
      });
    }

    // 2. Secondary fallback: Odoo ERP
    try {
      const odooStatus = await getOrderTrackingStatus(orderRef);
      if (odooStatus) {
        return NextResponse.json({
          success: true,
          source: 'odoo',
          data: odooStatus,
        });
      }
    } catch (odooErr) {
      // Ignore and proceed to 404
    }

    return NextResponse.json(
      { success: false, error: 'Order reference not found' },
      { status: 404 }
    );

  } catch (error: any) {
    console.error('Error fetching order tracking info:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to retrieve tracking status' },
      { status: 500 }
    );
  }
}
