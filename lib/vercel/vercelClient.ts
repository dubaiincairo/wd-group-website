/**
 * Vercel REST API Client for Dynamic Environment Variables Synchronization
 *
 * Enables the WD Group Admin Panel to automatically push and sync configuration secrets
 * (such as Odoo ERP credentials) directly into Vercel's cloud environment variables.
 */

export interface VercelEnvSyncResult {
  success: boolean;
  syncedKeys: string[];
  failedKeys: string[];
  message: string;
  error?: string;
}

export function getVercelApiCredentials(): {
  token: string | null;
  projectId: string;
  teamId: string;
} {
  const token = process.env.VERCEL_TOKEN || process.env.VERCEL_ACCESS_TOKEN || null;
  const projectId = process.env.VERCEL_PROJECT_ID || 'prj_2G9L6WDdBOylWRyQDjWe05PjHW63';
  const teamId = process.env.VERCEL_TEAM_ID || 'team_HYBx4XcaN8YFB1GItHJNrWhS';

  return { token, projectId, teamId };
}

export function isVercelApiConfigured(): boolean {
  const { token } = getVercelApiCredentials();
  return Boolean(token && token.trim());
}

/**
 * Push Odoo credentials to Vercel Environment Variables across Production, Preview, & Dev
 */
export async function syncOdooEnvToVercel(
  odooConfig: {
    url: string;
    db: string;
    username: string;
    apiKey?: string;
  },
  overrideToken?: string
): Promise<VercelEnvSyncResult> {
  const { token: defaultToken, projectId, teamId } = getVercelApiCredentials();
  const token = overrideToken?.trim() || defaultToken;

  if (!token) {
    return {
      success: false,
      syncedKeys: [],
      failedKeys: ['ODOO_URL', 'ODOO_DB', 'ODOO_USERNAME', 'ODOO_API_KEY'],
      message: 'VERCEL_TOKEN is not configured in the server environment.',
      error: 'Missing Vercel API token.',
    };
  }

  const teamParam = teamId ? `?teamId=${encodeURIComponent(teamId)}` : '';
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Fetch current environment variables for the project
    const listRes = await fetch(
      `https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}/env${teamParam}`,
      { headers, cache: 'no-store' }
    );

    if (!listRes.ok) {
      const errBody = await listRes.text();
      return {
        success: false,
        syncedKeys: [],
        failedKeys: [],
        message: `Vercel API returned status ${listRes.status}`,
        error: errBody,
      };
    }

    const listData = await listRes.json();
    const existingEnvs: Array<{ id: string; key: string }> = listData.envs || [];

    // 2. Prepare keys to sync
    const keysToSync: Record<string, string> = {
      ODOO_URL: odooConfig.url.trim(),
      ODOO_DB: odooConfig.db.trim(),
      ODOO_USERNAME: odooConfig.username.trim(),
    };

    if (odooConfig.apiKey && odooConfig.apiKey.trim()) {
      keysToSync['ODOO_API_KEY'] = odooConfig.apiKey.trim();
    }

    const syncedKeys: string[] = [];
    const failedKeys: string[] = [];

    // 3. Upsert each key
    for (const [key, value] of Object.entries(keysToSync)) {
      if (!value) continue;

      const existing = existingEnvs.find((e) => e.key === key);

      try {
        if (existing) {
          // Update existing env var
          const patchRes = await fetch(
            `https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}/env/${encodeURIComponent(existing.id)}${teamParam}`,
            {
              method: 'PATCH',
              headers,
              body: JSON.stringify({
                value,
                type: 'encrypted',
                target: ['production', 'preview', 'development'],
              }),
            }
          );

          if (patchRes.ok) {
            syncedKeys.push(key);
          } else {
            console.error(`[Vercel Sync] Failed to update ${key}:`, await patchRes.text());
            failedKeys.push(key);
          }
        } else {
          // Create new env var
          const postRes = await fetch(
            `https://api.vercel.com/v10/projects/${encodeURIComponent(projectId)}/env${teamParam}`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify({
                key,
                value,
                type: 'encrypted',
                target: ['production', 'preview', 'development'],
              }),
            }
          );

          if (postRes.ok) {
            syncedKeys.push(key);
          } else {
            console.error(`[Vercel Sync] Failed to create ${key}:`, await postRes.text());
            failedKeys.push(key);
          }
        }
      } catch (keyErr) {
        console.error(`[Vercel Sync] Error processing key ${key}:`, keyErr);
        failedKeys.push(key);
      }
    }

    const allSucceeded = failedKeys.length === 0;

    return {
      success: allSucceeded,
      syncedKeys,
      failedKeys,
      message: allSucceeded
        ? `Successfully synchronized ${syncedKeys.length} variables to Vercel (${syncedKeys.join(', ')}).`
        : `Synchronized ${syncedKeys.length} variables. Failed: ${failedKeys.join(', ')}.`,
    };
  } catch (err: any) {
    return {
      success: false,
      syncedKeys: [],
      failedKeys: ['ODOO_URL', 'ODOO_DB', 'ODOO_USERNAME', 'ODOO_API_KEY'],
      message: err.message || 'Error communicating with Vercel API',
      error: err.toString(),
    };
  }
}
