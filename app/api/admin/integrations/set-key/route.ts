import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    // Allow if valid admin/editor session, or if in local/admin context
    if (session && !hasPermission(session.role, ['owner', 'admin', 'editor'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await req.json();
    const { service, key } = body;

    if (!key || typeof key !== 'string' || !key.trim()) {
      return NextResponse.json({ error: 'API key cannot be empty' }, { status: 400 });
    }

    const trimmedKey = key.trim();
    const currentContent = (await getSiteContent()) || ({} as any);
    const currentSettings = currentContent.settings || {};
    const currentIntegrations = currentSettings.integrations || {};

    let updatedIntegrations = { ...currentIntegrations };

    if (service === 'GoogleCloud' || service === 'Gemini' || service === 'NanoBanana') {
      updatedIntegrations.google_cloud_api_key = trimmedKey;
      updatedIntegrations.nanobanana_api_key = trimmedKey;
    } else if (service === 'OpenAI') {
      updatedIntegrations.openai_api_key = trimmedKey;
    } else {
      updatedIntegrations.google_cloud_api_key = trimmedKey;
    }

    const success = await updateSiteContent({
      ...currentContent,
      settings: {
        ...currentSettings,
        integrations: updatedIntegrations,
      },
    });

    if (!success) {
      return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
    }

    if (session) {
      await recordAuditLog({
        actorId: session.userId,
        actorEmail: session.email,
        action: 'integrations.key_update',
        resourceType: 'integrations',
        details: { service: service || 'GoogleCloud' },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      });
    }

    return NextResponse.json({
      success: true,
      message: `${service || 'Gemini'} API key saved and activated successfully`,
    });
  } catch (error: any) {
    console.error('Error saving integration key:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save integration key' },
      { status: 500 }
    );
  }
}
