import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/admin/db';
import { getRequestSession } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export interface EcommerceSettingsPayload {
  // 1. Payment Gateways
  enableMadaCards: boolean;
  enableApplePay: boolean;
  moyasarPublishableKey?: string;
  moyasarSecretKey?: string;
  moyasarWebhookSecret?: string;
  moyasarTestMode: boolean;

  // 2. BNPL (Tamara & Tabby)
  enableTamara: boolean;
  tamaraApiToken?: string;
  tamaraNotificationToken?: string;
  tamaraTestMode: boolean;
  tamaraInstallmentsCount: 3 | 4;
  enableTabby: boolean;
  tabbyPublicKey?: string;
  tabbySecretKey?: string;
  tabbyWebhookSecret?: string;
  tabbyTestMode: boolean;
  enablePdpBnplWidget: boolean;

  // 3. ZATCA & Invoicing
  vatEnabled: boolean;
  vatRate: number;
  taxNumber: string;
  crNumber: string;
  companyNameAr: string;
  companyNameEn: string;
  enableZatcaQr: boolean;
  enablePdfQuotation: boolean;

  // 4. Saudi SMS Gateway
  enableSms: boolean;
  smsProvider: 'taqnyat' | 'unifonic' | 'simulator';
  smsApiKey?: string;
  smsSenderName: string;
  notifySmsOrderConfirmation: boolean;
  notifySmsDispatch: boolean;

  // 5. Brevo Email
  enableOrderEmails: boolean;
  brevoApiKey?: string;
  brevoSenderEmail: string;
  brevoSenderName: string;
  adminAlertEmail: string;
  highTicketThreshold: number;
  attachZatcaInvoice: boolean;

  // 6. Logistics & Operations
  enableCustomerPortal: boolean;
  leadTechnicianDefault: string;
  supportWhatsappNumber: string;
  freeShippingThreshold: number;
  whiteGloveAssemblyDefault: boolean;
}

export const DEFAULT_ECOMMERCE_SETTINGS: EcommerceSettingsPayload = {
  enableMadaCards: true,
  enableApplePay: true,
  moyasarPublishableKey: 'pk_test_demo_wdgroup_pub_2026',
  moyasarSecretKey: 'sk_test_demo_wdgroup_sec_2026',
  moyasarWebhookSecret: '',
  moyasarTestMode: false,

  enableTamara: true,
  tamaraApiToken: '',
  tamaraNotificationToken: '',
  tamaraTestMode: true,
  tamaraInstallmentsCount: 4,
  enableTabby: true,
  tabbyPublicKey: '',
  tabbySecretKey: '',
  tabbyWebhookSecret: '',
  tabbyTestMode: true,
  enablePdpBnplWidget: true,

  vatEnabled: true,
  vatRate: 15,
  taxNumber: '310492817400003',
  crNumber: '1010724891',
  companyNameAr: 'شركة تصاميم الوطن المحدودة - مجموعة دبليو دي',
  companyNameEn: 'WD Group for Contracting & Hospitality LLC',
  enableZatcaQr: true,
  enablePdfQuotation: true,

  enableSms: true,
  smsProvider: 'taqnyat',
  smsApiKey: '',
  smsSenderName: 'WD GROUP',
  notifySmsOrderConfirmation: true,
  notifySmsDispatch: true,

  enableOrderEmails: true,
  brevoApiKey: '',
  brevoSenderEmail: 'ceo@wdgroup.online',
  brevoSenderName: 'WD Group - GreenWood',
  adminAlertEmail: 'ceo@wdgroup.online',
  highTicketThreshold: 35000,
  attachZatcaInvoice: true,

  enableCustomerPortal: true,
  leadTechnicianDefault: 'م. فهد الغامدي',
  supportWhatsappNumber: '966505725070',
  freeShippingThreshold: 10000,
  whiteGloveAssemblyDefault: true,
};

export async function GET() {
  try {
    const siteContent = await getSiteContent();
    const stored = (siteContent as any)?.ecommerce_settings || {};
    const settings = { ...DEFAULT_ECOMMERCE_SETTINGS, ...stored };

    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    console.error('Error fetching ecommerce settings:', err);
    return NextResponse.json({ success: true, settings: DEFAULT_ECOMMERCE_SETTINGS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession();
    const body = await req.json();

    const siteContent = (await getSiteContent()) || {};
    const existingSettings = (siteContent as any)?.ecommerce_settings || DEFAULT_ECOMMERCE_SETTINGS;

    const mergedSettings: EcommerceSettingsPayload = {
      ...existingSettings,
      ...body,
    };

    // Also mirror relevant integration keys to siteContent.settings.integrations
    const existingIntegrations = siteContent.settings?.integrations || {};
    const updatedIntegrations = {
      ...existingIntegrations,
      moyasar_secret_key: mergedSettings.moyasarSecretKey || existingIntegrations.moyasar_secret_key,
      moyasar_publishable_key: mergedSettings.moyasarPublishableKey || existingIntegrations.moyasar_publishable_key,
      moyasar_webhook_secret: mergedSettings.moyasarWebhookSecret || existingIntegrations.moyasar_webhook_secret,
      moyasar_test_mode: mergedSettings.moyasarTestMode,
      tamara_api_token: mergedSettings.tamaraApiToken || existingIntegrations.tamara_api_token,
      tamara_notification_token: mergedSettings.tamaraNotificationToken || existingIntegrations.tamara_notification_token,
      tamara_test_mode: mergedSettings.tamaraTestMode,
      tabby_secret_key: mergedSettings.tabbySecretKey || existingIntegrations.tabby_secret_key,
      tabby_public_key: mergedSettings.tabbyPublicKey || existingIntegrations.tabby_public_key,
      tabby_webhook_secret: mergedSettings.tabbyWebhookSecret || existingIntegrations.tabby_webhook_secret,
      tabby_test_mode: mergedSettings.tabbyTestMode,
      sms_provider: mergedSettings.smsProvider,
      sms_api_key: mergedSettings.smsApiKey || existingIntegrations.sms_api_key,
      sms_sender_name: mergedSettings.smsSenderName || existingIntegrations.sms_sender_name,
      brevo_api_key: mergedSettings.brevoApiKey || existingIntegrations.brevo_api_key,
      brevo_sender_email: mergedSettings.brevoSenderEmail || existingIntegrations.brevo_sender_email,
      brevo_sender_name: mergedSettings.brevoSenderName || existingIntegrations.brevo_sender_name,
    };

    await updateSiteContent({
      ...siteContent,
      ecommerce_settings: mergedSettings,
      settings: {
        ...(siteContent.settings || {}),
        integrations: updatedIntegrations,
      },
    } as any);

    // Record Audit Log if authenticated
    if (session) {
      await recordAuditLog({
        userId: session.user.id,
        userEmail: session.user.email,
        action: 'UPDATE',
        resourceType: 'ECOMMERCE_SETTINGS',
        resourceId: 'global',
        details: { updatedFields: Object.keys(body) },
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, settings: mergedSettings });
  } catch (err: any) {
    console.error('Error saving ecommerce settings:', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to save settings' }, { status: 500 });
  }
}
