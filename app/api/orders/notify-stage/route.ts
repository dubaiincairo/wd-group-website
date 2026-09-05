import { NextRequest, NextResponse } from 'next/server';
import { sendOrderStageNotification } from '@/lib/email/orderNotifications';
import { getIntegrationsConfig } from '@/lib/admin/secrets';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderRef,
      customerName,
      customerEmail,
      customerPhone,
      newStatus,
      city,
      leadTechnician,
      scheduledDeliveryDate,
    } = body;

    if (!orderRef || !customerEmail || !newStatus) {
      return NextResponse.json(
        { success: false, error: 'Missing required order notification parameters' },
        { status: 400 }
      );
    }

    const integrations = await getIntegrationsConfig();

    // 1. Dispatch Branded Email via Brevo
    const emailResult = await sendOrderStageNotification({
      orderRef,
      customerName: customerName || 'Valued Client',
      customerEmail,
      customerPhone,
      newStatus,
      city,
      leadTechnician,
      scheduledDeliveryDate,
      lang: 'ar',
    }).catch((err) => {
      console.warn('[Stage Notification Email Error]', err);
      return { success: false, error: err?.message };
    });

    // 2. Prepare WhatsApp Telemetry
    const cleanPhone = (customerPhone || '').replace(/[^0-9]/g, '');
    const stageTitles: Record<string, string> = {
      confirmed: 'مؤكد ومعتمد',
      in_production: 'قيد التصنيع بمصانع جرين وود',
      ready_for_dispatch: 'جاهز للشحن الفندقي',
      out_for_delivery: 'خارج للتوصيل والتركيب الميداني',
      delivered: 'تم التسليم والتركيب بنجاح',
    };
    const stageTitle = stageTitles[newStatus] || newStatus;

    const whatsappMessage = `مرحباً ${customerName}، نفيدكم بأن طلبكم رقم ${orderRef} من أثاث جرين وود انتقل إلى مرحلة: (${stageTitle}). لمتابعة البث المباشر والعد التنازلي: https://wdgroup.online/furniture/track?ref=${encodeURIComponent(orderRef)}`;

    console.log(`[WhatsApp Notification Dispatch] Order: ${orderRef} -> Phone: ${cleanPhone} | Provider: ${integrations.whatsapp_provider}`);

    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      whatsappTarget: cleanPhone || null,
      whatsappMessage: whatsappMessage,
      whatsappDirectUrl: cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}` : null,
      notifiedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Error in notify-stage route:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to dispatch notification' },
      { status: 500 }
    );
  }
}
