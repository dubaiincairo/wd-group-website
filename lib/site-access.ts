export const SITE_ACCESS_COOKIE_NAME = 'wdgroup_site_access';

/**
 * Generate a SHA-256 hex string from the configured SITE_PASSWORD using standard Web Crypto API.
 * This runs seamlessly in both Edge Middleware and Node.js Serverless runtime.
 */
export async function getSiteAccessToken(password: string): Promise<string> {
  const normalized = password.trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${normalized}_wdgroup_access_salt_2026`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
