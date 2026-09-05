import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/admin/db';
import { getResolvedOdooConfig, testOdooConnection } from '@/lib/odoo/odooClient';
import { syncOdooEnvToVercel, isVercelApiConfigured } from '@/lib/vercel/vercelClient';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/odoo/config
 * Retrieves the current Odoo configuration and connection health
 */
export async function GET() {
  try {
    const config = await getResolvedOdooConfig();
    const vercelConfigured = isVercelApiConfigured();
    const connection = await testOdooConnection(config);

    return NextResponse.json({
      success: true,
      config: {
        url: config.url || 'https://wdgroup.odoo.com',
        db: config.db || 'wdgroup',
        username: config.username || '',
        hasApiKey: Boolean(config.apiKey && config.apiKey.trim()),
        maskedApiKey: config.apiKey ? '••••••••••••••••' : '',
      },
      vercelConfigured,
      connectionStatus: connection,
    });
  } catch (err: any) {
    console.error('Error fetching admin Odoo config:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to fetch Odoo configuration',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/odoo/config
 * Saves Odoo credentials in Supabase and synchronizes them with Vercel Environment Variables
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, db, username, apiKey, syncToVercel = true, vercelToken } = body;

    if (!url || !db || !username) {
      return NextResponse.json(
        {
          success: false,
          error: 'Instance URL, Database Name, and Username are required.',
        },
        { status: 400 }
      );
    }

    // 1. Get existing content to preserve current API key if none passed
    const currentContent = await getSiteContent();
    const currentOdoo = currentContent?.settings?.odoo || {};

    const cleanUrl = url.trim().replace(/\/+$/, '');
    const cleanDb = db.trim();
    const cleanUsername = username.trim();
    const resolvedApiKey = (apiKey && apiKey.trim() && !apiKey.includes('••••'))
      ? apiKey.trim()
      : currentOdoo.apiKey || process.env.ODOO_API_KEY || '';

    // 2. Persist to Supabase wdgroup_content table (Instant Runtime Effect)
    const updatedSettings = {
      ...(currentContent?.settings || {}),
      odoo: {
        url: cleanUrl,
        db: cleanDb,
        username: cleanUsername,
        apiKey: resolvedApiKey,
      },
    };

    await updateSiteContent({
      settings: updatedSettings as any,
    });

    // 3. Sync to Vercel Environment Variables if enabled
    let vercelResult = null;
    if (syncToVercel) {
      vercelResult = await syncOdooEnvToVercel(
        {
          url: cleanUrl,
          db: cleanDb,
          username: cleanUsername,
          apiKey: resolvedApiKey,
        },
        vercelToken
      );
    }

    // 4. Test live connection immediately with the new credentials
    const connectionTest = await testOdooConnection({
      url: cleanUrl,
      db: cleanDb,
      username: cleanUsername,
      apiKey: resolvedApiKey,
    });

    return NextResponse.json({
      success: true,
      message: 'Odoo credentials saved and updated in system.',
      vercelSync: vercelResult,
      connectionStatus: connectionTest,
      config: {
        url: cleanUrl,
        db: cleanDb,
        username: cleanUsername,
        hasApiKey: Boolean(resolvedApiKey),
        maskedApiKey: resolvedApiKey ? '••••••••••••••••' : '',
      },
    });
  } catch (err: any) {
    console.error('Error updating Odoo configuration:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to update Odoo configuration',
      },
      { status: 500 }
    );
  }
}
