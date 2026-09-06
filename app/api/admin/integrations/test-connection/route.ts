import { NextRequest, NextResponse } from 'next/server';
import { getIntegrationsConfig } from '@/lib/admin/secrets';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { service, key: providedKey, model: providedModel } = body;

    const integrations = await getIntegrationsConfig();

    if (service === 'OpenAI') {
      const apiKey = (providedKey || integrations.openai_api_key || process.env.OPENAI_API_KEY || '').trim();
      const model = providedModel || integrations.openai_model || 'gpt-4o';

      if (!apiKey) {
        return NextResponse.json({
          success: false,
          service: 'OpenAI',
          error: 'No OpenAI API key configured. Please enter your API key.',
          latencyMs: Date.now() - startTime,
        }, { status: 400 });
      }

      const res = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const latencyMs = Date.now() - startTime;

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const models = Array.isArray(data?.data) ? data.data.map((m: any) => m.id) : [];
        const hasTargetModel = models.some((m: string) => m.includes('gpt-4o') || m.includes(model));

        return NextResponse.json({
          success: true,
          service: 'OpenAI',
          latencyMs,
          status: res.status,
          message: `Connected successfully (${latencyMs}ms). ${models.length} models available.`,
          details: {
            targetModel: model,
            modelAvailable: hasTargetModel,
            sampleModels: models.slice(0, 5),
          },
        });
      } else {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `OpenAI returned status ${res.status}`;
        return NextResponse.json({
          success: false,
          service: 'OpenAI',
          latencyMs,
          status: res.status,
          error: errMsg,
        }, { status: 200 });
      }
    }

    if (service === 'GoogleCloud' || service === 'Google Cloud' || service === 'NanoBanana') {
      const apiKey = (providedKey || integrations.google_cloud_api_key || integrations.nanobanana_api_key || process.env.GOOGLE_CLOUD_API_KEY || process.env.GEMINI_API_KEY || '').trim();

      if (!apiKey) {
        return NextResponse.json({
          success: false,
          service: 'Google Cloud / NanoBanana Pro',
          error: 'No Google Cloud / Gemini API key configured. Please enter your API key.',
          latencyMs: Date.now() - startTime,
        }, { status: 400 });
      }

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
        method: 'GET',
      });

      const latencyMs = Date.now() - startTime;

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        const models = Array.isArray(data?.models) ? data.models.map((m: any) => m.name.replace('models/', '')) : [];
        const hasGemini = models.some((m: string) => m.includes('gemini'));

        return NextResponse.json({
          success: true,
          service: 'Google Cloud / NanoBanana Pro',
          latencyMs,
          status: res.status,
          message: `Connected to Google Generative AI (${latencyMs}ms). ${models.length} models verified.`,
          details: {
            hasGemini,
            sampleModels: models.slice(0, 6),
          },
        });
      } else {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `Google Cloud API returned status ${res.status}`;
        return NextResponse.json({
          success: false,
          service: 'Google Cloud / NanoBanana Pro',
          latencyMs,
          status: res.status,
          error: errMsg,
        }, { status: 200 });
      }
    }

    if (service === 'Brevo') {
      const apiKey = (providedKey || integrations.brevo_api_key || process.env.BREVO_API_KEY || '').trim();

      if (!apiKey) {
        return NextResponse.json({
          success: false,
          service: 'Brevo',
          error: 'No Brevo API key provided.',
          latencyMs: Date.now() - startTime,
        }, { status: 400 });
      }

      const res = await fetch('https://api.brevo.com/v3/account', {
        method: 'GET',
        headers: { 'api-key': apiKey },
      });

      const latencyMs = Date.now() - startTime;
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json({
          success: true,
          service: 'Brevo',
          latencyMs,
          status: res.status,
          message: `Brevo connected successfully (${latencyMs}ms). Account: ${data.email || 'Verified'}.`,
        });
      } else {
        const errJson = await res.json().catch(() => ({}));
        return NextResponse.json({
          success: false,
          service: 'Brevo',
          latencyMs,
          status: res.status,
          error: errJson.message || `Brevo returned status ${res.status}`,
        }, { status: 200 });
      }
    }

    if (service === 'Resend') {
      const apiKey = (providedKey || integrations.resend_api_key || process.env.RESEND_API_KEY || '').trim();

      if (!apiKey) {
        return NextResponse.json({
          success: false,
          service: 'Resend',
          error: 'No Resend API key provided.',
          latencyMs: Date.now() - startTime,
        }, { status: 400 });
      }

      const res = await fetch('https://api.resend.com/api-keys', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });

      const latencyMs = Date.now() - startTime;
      if (res.ok) {
        return NextResponse.json({
          success: true,
          service: 'Resend',
          latencyMs,
          status: res.status,
          message: `Resend API verified successfully (${latencyMs}ms).`,
        });
      } else {
        const errJson = await res.json().catch(() => ({}));
        return NextResponse.json({
          success: false,
          service: 'Resend',
          latencyMs,
          status: res.status,
          error: errJson.message || `Resend returned status ${res.status}`,
        }, { status: 200 });
      }
    }

    if (service === 'WhatsApp') {
      const apiKey = (providedKey || integrations.whatsapp_api_key || process.env.WHATSAPP_API_KEY || '').trim();
      const phoneId = (integrations.whatsapp_phone_number_id || process.env.WHATSAPP_PHONE_NUMBER_ID || '').trim();

      if (!apiKey) {
        return NextResponse.json({
          success: false,
          service: 'WhatsApp',
          error: 'No WhatsApp Access Token provided.',
          latencyMs: Date.now() - startTime,
        }, { status: 400 });
      }

      const endpoint = phoneId
        ? `https://graph.facebook.com/v18.0/${phoneId}?access_token=${apiKey}`
        : `https://graph.facebook.com/v18.0/me?access_token=${apiKey}`;

      const res = await fetch(endpoint, { method: 'GET' });
      const latencyMs = Date.now() - startTime;

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return NextResponse.json({
          success: true,
          service: 'WhatsApp',
          latencyMs,
          status: res.status,
          message: `WhatsApp API connected (${latencyMs}ms). ID: ${data.id || 'Verified'}.`,
        });
      } else {
        const errJson = await res.json().catch(() => ({}));
        return NextResponse.json({
          success: false,
          service: 'WhatsApp',
          latencyMs,
          status: res.status,
          error: errJson?.error?.message || `WhatsApp returned status ${res.status}`,
        }, { status: 200 });
      }
    }

    return NextResponse.json({
      success: false,
      error: `Unknown service: ${service}`,
      latencyMs: Date.now() - startTime,
    }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || 'Connection test failed',
      latencyMs: Date.now() - startTime,
    }, { status: 500 });
  }
}
