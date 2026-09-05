import { sendEmailWithBrevo, renderBrandedShell } from './brevo';
import { EcommerceOrderStatus } from '../admin/types';

export interface StageNotificationParams {
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  newStatus: EcommerceOrderStatus;
  city?: string;
  leadTechnician?: string;
  scheduledDeliveryDate?: string;
  totalAmount?: number;
  lang?: 'ar' | 'en';
}

const STAGE_CONFIG: Record<EcommerceOrderStatus, {
  num: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  badgeAr: string;
  badgeEn: string;
  badgeType: 'blue' | 'emerald' | 'amber' | 'gold';
}> = {
  pending_payment: {
    num: 1,
    titleAr: 'طلب جديد بانتظار إتمام الدفع أو التحويل',
    titleEn: 'Order Awaiting Payment Clearance',
    descAr: 'تم تسجيل تفاصيل طلبكم بنجاح. بمجرد تأكيد الدفع أو إيداع التحويل البنكي سيبدأ تجهيز المخططات الهندسية فوراً.',
    descEn: 'Your order details have been registered. Fabrication preparation will begin immediately upon payment clearance.',
    badgeAr: 'بانتظار التأكيد المالي',
    badgeEn: 'Payment Verification',
    badgeType: 'amber',
  },
  confirmed: {
    num: 2,
    titleAr: 'تم تأكيد واعتماد الطلب والمخططات التنفيذية',
    titleEn: 'Order & Shop Drawings Officially Confirmed',
    descAr: 'تم تأكيد طلبكم واعتماده من قبل الإدارة الهندسية. يجري إعداد أوامر الصرف للمواد الأولية وخشب الجوز الطبيعي.',
    descEn: 'Your order has been officially confirmed by engineering. Raw material requisitions and natural timber staging are underway.',
    badgeAr: 'معتمد ومؤكد هندسياً',
    badgeEn: 'Shop Drawings Approved',
    badgeType: 'blue',
  },
  in_production: {
    num: 3,
    titleAr: 'بدء عمليات التشكيل والتصنيع بمصانع جرين وود',
    titleEn: 'Manufacturing Initiated at GreenWood CNC Workcenters',
    descAr: 'بدأت ماكينات الـ CNC خماسية المحاور وأقسام النجارة اليدوية الفاخرة العمل على تشكيل وتجهيز قطع الأثاث الخاصة بكم.',
    descEn: 'Precision 5-axis CNC machining and artisan hand-joinery have commenced on your bespoke furniture batch.',
    badgeAr: 'قيد التصنيع الميداني',
    badgeEn: 'In Active Production',
    badgeType: 'amber',
  },
  ready_for_dispatch: {
    num: 4,
    titleAr: 'اجتياز فحص الجودة الفندقية وجاهزية الشحن',
    titleEn: 'Hospitality Quality Cleared & Ready for Dispatch',
    descAr: 'اجتازت كافة القطع اختبارات الجودة والمطابقة الفندقية FF&E وتم نقلها إلى مستودع التغليف المقاوم للصدمات.',
    descEn: 'All pieces have passed rigorous FF&E hospitality quality audits and have entered shockproof crating staging.',
    badgeAr: 'معتمد ومطابق للجودة',
    badgeEn: 'QA Inspection Passed',
    badgeType: 'emerald',
  },
  out_for_delivery: {
    num: 5,
    titleAr: 'أسطول التوصيل الفندقي المبرد في طريقه إليك',
    titleEn: 'White-Glove Installation Fleet En Route',
    descAr: 'تم تحميل قطع الأثاث على شاحنات التوصيل المبردة المجهزة، وفريق التركيبات المعتمد في طريقه إلى موقعكم.',
    descEn: 'Your bespoke furniture has been loaded onto our climate-controlled fleet. Our certified assembly engineers are en route.',
    badgeAr: 'خارج للتوصيل والتركيب',
    badgeEn: 'Out for Delivery',
    badgeType: 'blue',
  },
  delivered: {
    num: 6,
    titleAr: 'تم التسليم والتركيب الفندقي بنجاح',
    titleEn: 'Delivered & Assembled with White-Glove Care',
    descAr: 'نهنئكم باكتمال تسليم وتركيب طلبكم بنجاح. يسري ضمان المصنع الشامل الممتد لـ 5 سنوات ابتداءً من اليوم.',
    descEn: 'Congratulations! Your order has been successfully delivered and assembled. Your 5-year comprehensive warranty is active.',
    badgeAr: 'مكتمل ومسلّم بنجاح',
    badgeEn: 'Delivered & Verified',
    badgeType: 'emerald',
  },
  cancelled: {
    num: 0,
    titleAr: 'تم إلغاء الطلب',
    titleEn: 'Order Cancelled',
    descAr: 'تم إلغاء الطلب بناءً على رغبتكم أو عدم اكتمال متطلبات التوريد. لأي استفسار يمكنكم التواصل مع الإدارة.',
    descEn: 'This order has been cancelled. For any inquiries, please contact our executive customer support.',
    badgeAr: 'طلب ملغي',
    badgeEn: 'Cancelled',
    badgeType: 'amber',
  },
};

export async function sendOrderStageNotification(params: StageNotificationParams) {
  const {
    orderRef,
    customerName,
    customerEmail,
    newStatus,
    city = 'الرياض',
    leadTechnician,
    scheduledDeliveryDate,
    lang = 'ar',
  } = params;

  const isAr = lang === 'ar';
  const stage = STAGE_CONFIG[newStatus] || STAGE_CONFIG.in_production;
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.online';
  const trackingUrl = `${siteUrl}/furniture/track?ref=${encodeURIComponent(orderRef)}`;

  const bodyHtml = isAr ? `
    <div style="text-align: right;" dir="rtl">
      <p style="font-size: 15px; color: #F4F4F5; margin-top: 0;">
        سعادة العميل <strong>${customerName}</strong> المحترم،
      </p>
      <p style="color: #D4D4D8; line-height: 1.65;">
        يسعدنا إفادتكم بحدوث تحديث جديد في مسار تصنيع وتجهيز طلبكم رقم <strong style="color: #E3C58A; font-family: monospace;">${orderRef}</strong> لدى <strong>مصانع جرين وود (مجموعة دبليو دي للأعمال)</strong>.
      </p>

      <!-- Stage Status Card -->
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-right: 4px solid #C9A86A; border-radius: 14px; overflow: hidden; text-align: right;">
        <tr>
          <td style="padding: 20px;">
            <div style="font-size: 11px; font-weight: 800; color: #C9A86A; font-family: monospace; margin-bottom: 6px;">
              // المرحلة الحالية: ${stage.titleAr}
            </div>
            <p style="margin: 6px 0 14px 0; font-size: 13px; color: #E4E4E7; line-height: 1.6;">
              ${stage.descAr}
            </p>
            <div style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #A1A1AA;">
              ${scheduledDeliveryDate ? `<strong>الموعد المجدول للتسليم:</strong> <span style="color: #34D399; font-weight: bold;">${scheduledDeliveryDate}</span><br>` : ''}
              ${city ? `<strong>وجهة التركيب:</strong> <span style="color: #FFFFFF;">${city}</span><br>` : ''}
              ${leadTechnician ? `<strong>مشرف التركيبات المعتمد:</strong> <span style="color: #FFFFFF;">${leadTechnician}</span>` : ''}
            </div>
          </td>
        </tr>
      </table>

      <p style="font-size: 12px; color: #9CA3AF; line-height: 1.6;">
        يمكنكم متابعة البث المباشر لمراحل التصنيع وعدّاد الأيام المتبقية حتى التسليم في أي وقت عبر بوابة التتبع الذكية.
      </p>
    </div>
  ` : `
    <div style="text-align: left;" dir="ltr">
      <p style="font-size: 15px; color: #F4F4F5; margin-top: 0;">
        Dear <strong>${customerName}</strong>,
      </p>
      <p style="color: #D4D4D8; line-height: 1.65;">
        We are pleased to inform you that your bespoke furniture order <strong style="color: #E3C58A; font-family: monospace;">${orderRef}</strong> with <strong>WD Group (GreenWood Manufacturing)</strong> has advanced to a new stage.
      </p>

      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0; background-color: #141722; border: 1px solid #232733; border-left: 4px solid #C9A86A; border-radius: 14px; overflow: hidden;">
        <tr>
          <td style="padding: 20px;">
            <div style="font-size: 11px; font-weight: 800; color: #C9A86A; font-family: monospace; margin-bottom: 6px;">
              // CURRENT PIPELINE: ${stage.titleEn}
            </div>
            <p style="margin: 6px 0 14px 0; font-size: 13px; color: #E4E4E7; line-height: 1.6;">
              ${stage.descEn}
            </p>
            <div style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #A1A1AA;">
              ${scheduledDeliveryDate ? `<strong>Target Delivery:</strong> <span style="color: #34D399; font-weight: bold;">${scheduledDeliveryDate}</span><br>` : ''}
              ${city ? `<strong>Destination:</strong> <span style="color: #FFFFFF;">${city}</span><br>` : ''}
              ${leadTechnician ? `<strong>Assembly Engineer:</strong> <span style="color: #FFFFFF;">${leadTechnician}</span>` : ''}
            </div>
          </td>
        </tr>
      </table>

      <p style="font-size: 12px; color: #9CA3AF; line-height: 1.6;">
        You can monitor real-time CNC telemetry and your remaining delivery countdown anytime on our tracking portal.
      </p>
    </div>
  `;

  const emailSubject = isAr
    ? `تحديث مسار تصنيع طلبكم [${orderRef}] · ${stage.titleAr}`
    : `Order Update [${orderRef}] · ${stage.titleEn}`;

  return sendEmailWithBrevo({
    to: [{ email: customerEmail, name: customerName }],
    subject: emailSubject,
    htmlContent: renderBrandedShell({
      title: isAr ? stage.titleAr : stage.titleEn,
      badgeText: isAr ? stage.badgeAr : stage.badgeEn,
      badgeType: stage.badgeType,
      bodyHtml,
      isAr,
      actionButton: {
        label: isAr ? 'تتبع مراحل الطلب والعد التنازلي' : 'Track Order & Live Countdown',
        url: trackingUrl,
        variant: 'gold',
      },
    }),
    tags: ['order-stage-update', newStatus],
  });
}
