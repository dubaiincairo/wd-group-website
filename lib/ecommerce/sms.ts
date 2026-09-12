/**
 * WD Group - Saudi SMS Notification Service
 * Integrates with Unifonic / Taqnyat SMS Gateways with Sandbox Simulator Fallback
 */

import { getIntegrationsConfig } from '@/lib/admin/secrets';
import { getEcommerceSettings } from '@/lib/ecommerce/settings';

export interface SendSmsParams {
  phone: string;
  message: string;
  senderName?: string;
}

export interface SmsResult {
  success: boolean;
  messageId?: string;
  error?: string;
  simulated?: boolean;
}

/**
 * Low-level SMS sender
 */
export async function sendSms({
  phone,
  message,
  senderName = 'WD GROUP',
}: SendSmsParams): Promise<SmsResult> {
  const settings = await getEcommerceSettings().catch(() => null);

  // If SMS notifications are completely disabled by admin
  if (settings && settings.enableSms === false) {
    console.log('[Saudi SMS] SMS notifications are disabled in Admin Panel.');
    return { success: true, simulated: true };
  }

  const integrations = await getIntegrationsConfig().catch(() => null);
  const provider = settings?.smsProvider || integrations?.sms_provider || process.env.SMS_PROVIDER || 'simulator';
  const apiKey = settings?.smsApiKey || integrations?.sms_api_key || process.env.SMS_API_KEY;
  const officialSender = settings?.smsSenderName || integrations?.sms_sender_name || process.env.SMS_SENDER_NAME || senderName;

  // Format Saudi mobile number
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('05')) {
    cleanPhone = '966' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('966')) {
    cleanPhone = '966' + cleanPhone;
  }

  // Simulation mode when no active gateway key is configured
  if (!apiKey || provider === 'simulator') {
    console.log(`[Saudi SMS Simulator] To: +${cleanPhone} | Sender: "${officialSender}" | Text:\n"${message}"`);
    return {
      success: true,
      messageId: `sms_sim_${Date.now()}`,
      simulated: true,
    };
  }

  // 1. Taqnyat Gateway Integration (Saudi Arabia SAMA / CITC Registered)
  if (provider === 'taqnyat') {
    try {
      const res = await fetch('https://api.taqnyat.sa/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: [cleanPhone],
          body: message,
          sender: officialSender,
        }),
      });

      const data = await res.json();
      if (res.ok && data.statusCode === 201) {
        return { success: true, messageId: data.messageId };
      }

      console.error('[Taqnyat SMS Error]:', data);
      return { success: false, error: data.message || 'Taqnyat SMS dispatch failed.' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  // 2. Unifonic Gateway Integration
  if (provider === 'unifonic') {
    try {
      const res = await fetch('https://api.unifonic.com/rest/SMS/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          AppSid: apiKey,
          Recipient: cleanPhone,
          Body: message,
          SenderID: officialSender,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, messageId: data.data?.MessageID };
      }

      console.error('[Unifonic SMS Error]:', data);
      return { success: false, error: data.message || 'Unifonic SMS dispatch failed.' };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  return { success: true, simulated: true };
}

/**
 * High-level Order Confirmation SMS
 */
export async function sendOrderConfirmationSms(params: {
  phone: string;
  orderRef: string;
  customerName: string;
  totalAmount: number;
  lang?: 'ar' | 'en';
}): Promise<SmsResult> {
  const settings = await getEcommerceSettings().catch(() => null);
  if (settings && settings.notifySmsOrderConfirmation === false) {
    console.log('[Saudi SMS] Order confirmation SMS is disabled in Admin Panel.');
    return { success: true, simulated: true };
  }

  const isAr = params.lang !== 'en';
  const trackUrl = `https://test.wdgroup.online/furniture/track?ref=${encodeURIComponent(params.orderRef)}`;

  const text = isAr
    ? `مرحباً ${params.customerName}، تم تأكيد طلبك رقم (${params.orderRef}) بمبلغ ${params.totalAmount.toLocaleString('en-US')} ر.س لدى مجموعة دبليو دي (جرين وود للأثاث). يمكنك تتبع مراحل التصنيع والشحن مباشرة: ${trackUrl}`
    : `Dear ${params.customerName}, your GreenWood furniture order #${params.orderRef} (${params.totalAmount.toLocaleString('en-US')} SAR) has been confirmed. Track manufacturing live: ${trackUrl}`;

  return await sendSms({
    phone: params.phone,
    message: text,
  });
}

/**
 * High-level Out-for-Delivery & Installation Fleet SMS
 */
export async function sendOrderDispatchSms(params: {
  phone: string;
  orderRef: string;
  customerName: string;
  leadTechnician?: string;
  lang?: 'ar' | 'en';
}): Promise<SmsResult> {
  const settings = await getEcommerceSettings().catch(() => null);
  if (settings && settings.notifySmsDispatch === false) {
    console.log('[Saudi SMS] Out-for-delivery SMS is disabled in Admin Panel.');
    return { success: true, simulated: true };
  }

  const isAr = params.lang !== 'en';
  const technician = params.leadTechnician || settings?.leadTechnicianDefault || '';
  const trackUrl = `https://test.wdgroup.online/furniture/track?ref=${encodeURIComponent(params.orderRef)}`;

  const text = isAr
    ? `عزيزنا ${params.customerName}، طلبك رقم (${params.orderRef}) خرج للتسليم والتركيب عبر أسطول دبليو دي المعتمد${technician ? ` بقيادة ${technician}` : ''}. يرجى التواجد بالموقع للاستلام: ${trackUrl}`
    : `Dear ${params.customerName}, order #${params.orderRef} has been dispatched for white-glove assembly${technician ? ` led by ${technician}` : ''}. Track arrival: ${trackUrl}`;

  return await sendSms({
    phone: params.phone,
    message: text,
  });
}
