import { NextRequest, NextResponse } from 'next/server';
import { getIntegrationsConfig } from '@/lib/admin/secrets';

export const dynamic = 'force-dynamic';

/**
 * ChatKit Session Generator
 * Official OpenAI ChatKit Session Endpoint
 * Exchanging workflow ID and API key for a client_secret token.
 */
export async function POST(req: NextRequest) {
  try {
    const integrations = await getIntegrationsConfig();
    const apiKey = integrations.openai_api_key?.trim();
    const workflowId = integrations.openai_chatkit_workflow_id?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured in WD Group Admin Settings.', code: 'MISSING_API_KEY' },
        { status: 400 }
      );
    }

    if (!workflowId) {
      return NextResponse.json(
        { 
          error: 'OPENAI_CHATKIT_WORKFLOW_ID is not configured. Switching to custom ChatKit server protocol at /api/chatkit.',
          code: 'NO_WORKFLOW_ID',
          custom_server_url: '/api/chatkit'
        },
        { status: 404 }
      );
    }

    let user = 'visitor_' + Math.random().toString(36).substring(2, 9);
    try {
      const body = await req.json();
      if (body?.user) user = String(body.user);
    } catch {}

    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: user,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `OpenAI ChatKit session rejected: ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      client_secret: data.client_secret,
      workflow_id: workflowId,
    });
  } catch (err: any) {
    console.error('[ChatKit Session Route Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error creating ChatKit session' },
      { status: 500 }
    );
  }
}
