import { NextRequest, NextResponse } from 'next/server';
import { 
  WHATSAPP_SERVICE_TEMPLATES, 
  generateWhatsAppChatUrl, 
  formatWhatsAppPhone,
  WhatsAppAudience 
} from '@/lib/whatsapp/businessService';
import { getIntegrationsConfig } from '@/lib/admin/secrets';
import { recordAuditLog } from '@/lib/admin/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const integrations = await getIntegrationsConfig();

    return NextResponse.json({
      success: true,
      data: {
        templates: WHATSAPP_SERVICE_TEMPLATES.map(t => ({
          id: t.id,
          audience: t.audience,
          titleAr: t.titleAr,
          titleEn: t.titleEn,
          badgeAr: t.badgeAr,
          badgeEn: t.badgeEn,
          badgeColor: t.badgeColor,
          descriptionAr: t.descriptionAr,
          descriptionEn: t.descriptionEn,
          suggestedVariables: t.suggestedVariables,
        })),
        config: {
          provider: integrations.whatsapp_provider || 'cloud_api',
          dispatchPhone: integrations.whatsapp_dispatch_phone || '+966505725070',
          hasApiKey: Boolean(integrations.whatsapp_api_key),
          hasPhoneNumberId: Boolean(integrations.whatsapp_phone_number_id),
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      templateId,
      audience = 'clients',
      recipientPhone,
      recipientName,
      language = 'ar',
      variables = {},
      customText,
      sendViaApi = false,
    } = body;

    if (!recipientPhone) {
      return NextResponse.json({ success: false, error: 'Recipient phone number is required.' }, { status: 400 });
    }

    const cleanPhone = formatWhatsAppPhone(recipientPhone);
    const template = WHATSAPP_SERVICE_TEMPLATES.find(t => t.id === templateId);

    // Merge recipientName into variables
    const mergedVars = {
      customerName: recipientName || '',
      userName: recipientName || '',
      employeeName: recipientName || '',
      technicianName: recipientName || '',
      ...variables,
    };

    let messageText = customText;
    if (!messageText && template) {
      messageText = language === 'en' 
        ? template.generateTextEn(mergedVars) 
        : template.generateTextAr(mergedVars);
    }

    if (!messageText) {
      return NextResponse.json({ success: false, error: 'Message text or valid template is required.' }, { status: 400 });
    }

    const waMeUrl = generateWhatsAppChatUrl(cleanPhone, messageText);
    const integrations = await getIntegrationsConfig();

    let apiDispatchResult: { sent: boolean; response?: any; mode: 'cloud_api' | 'deep_link' | 'simulation' } = {
      sent: false,
      mode: 'deep_link',
    };

    // If API dispatch is explicitly requested and Cloud API credentials exist
    if (sendViaApi && integrations.whatsapp_api_key && integrations.whatsapp_phone_number_id) {
      try {
        const metaRes = await fetch(
          `https://graph.facebook.com/v19.0/${integrations.whatsapp_phone_number_id}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${integrations.whatsapp_api_key}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              recipient_type: 'individual',
              to: cleanPhone,
              type: 'text',
              text: { body: messageText },
            }),
          }
        );

        const metaData = await metaRes.json().catch(() => ({}));
        if (metaRes.ok) {
          apiDispatchResult = { sent: true, response: metaData, mode: 'cloud_api' };
        } else {
          apiDispatchResult = { sent: false, response: metaData, mode: 'cloud_api' };
        }
      } catch (apiErr: any) {
        apiDispatchResult = { sent: false, response: { error: apiErr.message }, mode: 'cloud_api' };
      }
    } else if (sendViaApi) {
      // Simulation mode when no API keys are configured
      apiDispatchResult = {
        sent: true,
        mode: 'simulation',
        response: {
          note: 'Simulation mode: Message prepared and validated for WhatsApp dispatch.',
        },
      };
    }

    // Record in audit log
    await recordAuditLog({
      action: 'whatsapp_service_dispatch',
      entity: 'whatsapp_message',
      entity_id: templateId || 'custom',
      details: {
        audience,
        phone: cleanPhone,
        recipientName,
        language,
        mode: apiDispatchResult.mode,
        sentViaApi: apiDispatchResult.sent,
        messagePreview: messageText.substring(0, 100),
      },
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      data: {
        phone: cleanPhone,
        message: messageText,
        waMeUrl,
        apiDispatch: apiDispatchResult,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
