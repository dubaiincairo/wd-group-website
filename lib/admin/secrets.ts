import { getSiteContent } from './db';
import type { IntegrationsConfig, CustomVariableRecord } from './types';

/**
 * Retrieve the active Integrations and Secrets Configuration.
 * Checks Supabase settings.integrations first, falling back to process.env.
 */
export async function getIntegrationsConfig(): Promise<IntegrationsConfig> {
  let dbIntegrations: IntegrationsConfig = {};
  try {
    const content = await getSiteContent();
    if (content?.settings?.integrations) {
      dbIntegrations = content.settings.integrations;
    }
  } catch (err) {
    console.warn('[Secrets Resolver] Failed to load db integrations:', err);
  }

  return {
    brevo_api_key: dbIntegrations.brevo_api_key?.trim() || process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY || '',
    brevo_sender_email: dbIntegrations.brevo_sender_email?.trim() || process.env.BREVO_SENDER_EMAIL || process.env.SMTP_FROM || 'ceo@wdgroup.online',
    brevo_sender_name: dbIntegrations.brevo_sender_name?.trim() || process.env.BREVO_SENDER_NAME || 'WD Group',
    admin_notification_email: dbIntegrations.admin_notification_email?.trim() || process.env.ADMIN_NOTIFICATION_EMAIL || 'ceo@wdgroup.online',
    resend_api_key: dbIntegrations.resend_api_key?.trim() || process.env.RESEND_API_KEY || '',
    resend_sender_email: dbIntegrations.resend_sender_email?.trim() || process.env.RESEND_SENDER_EMAIL || 'noreply@wdgroup.online',
    whatsapp_provider: dbIntegrations.whatsapp_provider || 'cloud_api',
    whatsapp_api_key: dbIntegrations.whatsapp_api_key?.trim() || process.env.WHATSAPP_API_KEY || '',
    whatsapp_phone_number_id: dbIntegrations.whatsapp_phone_number_id?.trim() || process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    whatsapp_business_account_id: dbIntegrations.whatsapp_business_account_id?.trim() || process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
    whatsapp_dispatch_phone: dbIntegrations.whatsapp_dispatch_phone?.trim() || process.env.WHATSAPP_PHONE || '+966505725070',
    openai_api_key: dbIntegrations.openai_api_key?.trim() || process.env.OPENAI_API_KEY || '',
    openai_model: dbIntegrations.openai_model || process.env.OPENAI_MODEL || 'gpt-4o',
    openai_chatkit_workflow_id: dbIntegrations.openai_chatkit_workflow_id?.trim() || process.env.OPENAI_CHATKIT_WORKFLOW_ID || '',
    chatkit_enabled: dbIntegrations.chatkit_enabled !== undefined ? Boolean(dbIntegrations.chatkit_enabled) : (process.env.CHATKIT_ENABLED !== 'false'),
    chatkit_system_prompt: dbIntegrations.chatkit_system_prompt || process.env.CHATKIT_SYSTEM_PROMPT || '',
    google_cloud_api_key: dbIntegrations.google_cloud_api_key?.trim() || process.env.GOOGLE_CLOUD_API_KEY || process.env.GEMINI_API_KEY || '',
    nanobanana_api_key: dbIntegrations.nanobanana_api_key?.trim() || process.env.NANOBANANA_API_KEY || '',
    site_password: dbIntegrations.site_password?.trim() || process.env.SITE_PASSWORD || '',
    moyasar_secret_key: dbIntegrations.moyasar_secret_key?.trim() || process.env.MOYASAR_SECRET_KEY || 'sk_test_demo_wdgroup_sec_2026',
    moyasar_publishable_key: dbIntegrations.moyasar_publishable_key?.trim() || process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY || 'pk_test_demo_wdgroup_pub_2026',
    moyasar_webhook_secret: dbIntegrations.moyasar_webhook_secret?.trim() || process.env.MOYASAR_WEBHOOK_SECRET || '',
    moyasar_test_mode: dbIntegrations.moyasar_test_mode !== undefined ? Boolean(dbIntegrations.moyasar_test_mode) : (process.env.MOYASAR_TEST_MODE !== 'false'),
    custom_variables: dbIntegrations.custom_variables || [],
  };
}

/**
 * Retrieve a specific variable/secret by key.
 * Checks:
 * 1. Matching property on IntegrationsConfig
 * 2. Any entry in custom_variables table
 * 3. Fallback to process.env[key]
 */
export async function getIntegrationSecret(key: string, defaultValue: string = ''): Promise<string> {
  const config = await getIntegrationsConfig();

  // Known direct keys
  if (key in config) {
    const val = (config as any)[key];
    if (val && typeof val === 'string') return val;
  }

  // Custom variables table
  const custom = config.custom_variables?.find((c) => c.key.trim().toUpperCase() === key.trim().toUpperCase());
  if (custom && custom.value) {
    return custom.value;
  }

  // Environment variable
  if (process.env[key]) {
    return process.env[key] as string;
  }

  return defaultValue;
}
