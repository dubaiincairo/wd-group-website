import crypto from 'crypto';
import { callRpc } from './db';
import type { AdminRole, AdminSessionUser } from './types';

export const ADMIN_COOKIE_NAME = 'wdgroup_admin_session';
const SESSION_DURATION_DAYS = 7;

/**
 * Hash a plain text password using PBKDF2 with SHA-512 and random salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}$${hash}`;
}

/**
 * Verify a plain text password against a stored PBKDF2 hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes('$')) return false;
  try {
    const [salt, originalHash] = storedHash.split('$');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}

/**
 * Generate a cryptographically random session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash a session token for safe database indexing
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Authenticate email and password
 */
export async function authenticateCredentials(email: string, password: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const rows = await callRpc<any[]>('rpc_admin_login', { p_email: trimmedEmail });
  
  if (!rows || rows.length === 0) {
    return null;
  }

  const user = rows[0];
  const isValid = verifyPassword(password, user.password_hash);
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    role: user.role as AdminRole,
    isActive: user.is_active,
  };
}

/**
 * Create a new admin session in Supabase and return the plain token
 */
export async function createAdminSession(
  userId: string,
  ipAddress: string = '0.0.0.0',
  userAgent: string = 'unknown'
): Promise<{ token: string; expiresAt: Date }> {
  const token = generateSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);

  await callRpc('rpc_admin_create_session', {
    p_user_id: userId,
    p_token_hash: tokenHash,
    p_expires_at: expiresAt.toISOString(),
    p_ip: ipAddress,
    p_user_agent: userAgent,
  });

  return { token, expiresAt };
}

/**
 * Verify session token against Supabase
 */
export async function verifyAdminSessionToken(token: string): Promise<AdminSessionUser | null> {
  if (!token || typeof token !== 'string') return null;

  try {
    const tokenHash = hashToken(token);
    const rows = await callRpc<any[]>('rpc_admin_verify_session', { p_token_hash: tokenHash });

    if (!rows || rows.length === 0) {
      return null;
    }

    const session = rows[0];
    return {
      userId: session.user_id,
      email: session.email,
      fullName: session.full_name,
      role: session.role as AdminRole,
      isActive: session.is_active,
      expiresAt: session.expires_at,
    };
  } catch (err) {
    console.error('Error verifying admin session:', err);
    return null;
  }
}

/**
 * Revoke an active admin session token
 */
export async function revokeAdminSession(token: string): Promise<void> {
  if (!token) return;
  try {
    const tokenHash = hashToken(token);
    await callRpc('rpc_admin_revoke_session', { p_token_hash: tokenHash });
  } catch (err) {
    console.error('Error revoking session:', err);
  }
}

/**
 * Helper to extract session from Request headers or cookies
 */
export async function getRequestSession(req: Request): Promise<AdminSessionUser | null> {
  const authHeader = req.headers.get('authorization');
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`));
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

  if (!token) return null;
  return verifyAdminSessionToken(token);
}

/**
 * Check if user has required role
 */
export function hasPermission(
  userRole: AdminRole,
  allowedRoles: AdminRole[] = ['owner', 'admin']
): boolean {
  if (userRole === 'owner') return true;
  return allowedRoles.includes(userRole);
}
