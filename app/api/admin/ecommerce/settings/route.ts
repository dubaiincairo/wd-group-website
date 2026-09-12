import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/admin/db';
import { getRequestSession } from '@/lib/admin/auth';
import { recordAuditLog } from '@/lib/admin/audit';
import { DEFAULT_ECOMMERCE_SETTINGS, EcommerceSettingsPayload } from '@/lib/ecommerce/settingsConfig';

export const dynamic = 'force-dynamic';

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
