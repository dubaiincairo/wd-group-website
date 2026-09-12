/**
 * WD Group - GreenWood Furniture
 * Bilingual WhatsApp Notification & Customer Support Helper
 */

export interface WhatsAppOrderDetails {
  orderRef: string;
  customerName: string;
  phone?: string;
  totalAmount: number;
  itemsCount?: number;
  trackingUrl?: string;
  carrierName?: string;
  trackingNumber?: string;
}

const OFFICIAL_WHATSAPP_NUMBER = '966505725070'; // WD Group Saudi Executive Desk

/**
 * Generate a WhatsApp click-to-chat URL for customer order confirmation & dispatch updates.
 */
export function getWhatsAppOrderConfirmationUrl(
  order: WhatsAppOrderDetails,
  lang: 'ar' | 'en' = 'ar'
): string {
  const isAr = lang === 'ar';
  const trackUrl = order.trackingUrl || `https://test.wdgroup.online/furniture/track?ref=${encodeURIComponent(order.orderRef)}`;

  const text = isAr
    ? `مرحباً ${order.customerName}،\n\nنشكرك لاختيارك مجموعة دبليو دي (جرين وود للأثاث الفندقي والمكتبي).\n\nتم تأكيد طلبك بنجاح:\n• رقم الطلب: ${order.orderRef}\n• إجمالي الفاتورة (شامل ضريبة 15%): ${order.totalAmount.toLocaleString('en-US')} ر.س\n\nيمكنك متابعة مراحل التصنيع والشحن مباشرة عبر الرابط التالي:\n${trackUrl}\n\nفريق خدمة العملاء متواجد لخدمتكم دائماً.`
    : `Hello ${order.customerName},\n\nThank you for choosing WD Group (GreenWood Hospitality & Corporate Furniture).\n\nYour order has been confirmed:\n• Order Ref: ${order.orderRef}\n• Total (incl. 15% VAT): ${order.totalAmount.toLocaleString('en-US')} SAR\n\nYou can track live production and dispatch status here:\n${trackUrl}\n\nWD Group Concierge is at your service.`;

  const phone = order.phone ? order.phone.replace(/[^0-9]/g, '') : OFFICIAL_WHATSAPP_NUMBER;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate a WhatsApp click-to-chat URL for dispatch notifications.
 */
export function getWhatsAppDispatchAlertUrl(
  order: WhatsAppOrderDetails,
  lang: 'ar' | 'en' = 'ar'
): string {
  const isAr = lang === 'ar';
  const trackUrl = order.trackingUrl || `https://test.wdgroup.online/furniture/track?ref=${encodeURIComponent(order.orderRef)}`;

  const text = isAr
    ? `عزيزنا ${order.customerName}،\n\nيسعدنا إبلاغك بأن طلبك رقم (${order.orderRef}) خرج للتسليم والتركيب عبر أسطولنا.\n\n• الناقل: ${order.carrierName || 'أسطول الدعم اللوجستي - دبليو دي'}\n• بوليصة التتبع: ${order.trackingNumber || order.orderRef}\n\nتتبع مسار التسليم لحظياً:\n${trackUrl}\n\nيرجى التواجد في الموقع المحدد لاستلام وتركيب القطع.`
    : `Dear ${order.customerName},\n\nGreat news! Your order (${order.orderRef}) has been dispatched for delivery and white-glove installation.\n\n• Carrier: ${order.carrierName || 'WD Logistics Fleet'}\n• Tracking No: ${order.trackingNumber || order.orderRef}\n\nTrack delivery progress:\n${trackUrl}\n\nPlease ensure site readiness for handover and installation.`;

  const phone = order.phone ? order.phone.replace(/[^0-9]/g, '') : OFFICIAL_WHATSAPP_NUMBER;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generate a customer care inquiry URL where customer initiates chat with WD Group desk.
 */
export function getWhatsAppSupportUrl(
  orderRef?: string,
  lang: 'ar' | 'en' = 'ar'
): string {
  const isAr = lang === 'ar';

  const text = orderRef
    ? isAr
      ? `السلام عليكم، أستفسر بخصوص طلبي لدى دبليو دي للأثاث، رقم الطلب: ${orderRef}`
      : `Hello WD Group, I have an inquiry regarding my furniture order #${orderRef}`
    : isAr
      ? `السلام عليكم، أود الاستفسار عن منتجات وتفصيل الأثاث لدى مجموعة دبليو دي.`
      : `Hello WD Group, I would like to inquire about your custom furniture solutions.`;

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
