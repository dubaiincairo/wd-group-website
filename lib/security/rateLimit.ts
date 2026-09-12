/**
 * WD Group - Enterprise Anti-Abuse, Rate Limiting & Bot Deterrence Engine
 * Prevents telecommunications quota exhaustion (Taqnyat/Unifonic SMS),
 * blocks card testing / brute-force checkout spam, and provides silent bot traps.
 */

import { NextRequest } from 'next/server';

interface RateLimitRecord {
  timestamps: number[];
}

// Global in-memory cache preserved across Next.js serverless invocations where possible
declare global {
  // eslint-disable-next-line no-var
  var __wd_rate_limit_store: Map<string, RateLimitRecord> | undefined;
}

const rateLimitStore: Map<string, RateLimitRecord> =
  global.__wd_rate_limit_store || new Map<string, RateLimitRecord>();
global.__wd_rate_limit_store = rateLimitStore;

/**
 * Clean up expired entries every 5 minutes to ensure minimal memory footprint
 */
let lastCleanup = Date.now();
function cleanupExpired(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;

  for (const [key, record] of rateLimitStore.entries()) {
    const valid = record.timestamps.filter((ts) => now - ts < windowMs);
    if (valid.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, { timestamps: valid });
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
  reason?: string;
}

/**
 * Generic sliding window rate limiter
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  cleanupExpired(windowMs);

  const record = rateLimitStore.get(key) || { timestamps: [] };
  // Keep only timestamps within the active sliding window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= limit) {
    const oldestTimestamp = activeTimestamps[0];
    const resetMs = windowMs - (now - oldestTimestamp);
    const resetSeconds = Math.max(1, Math.ceil(resetMs / 1000));

    return {
      allowed: false,
      remaining: 0,
      resetSeconds,
      reason: `Rate limit exceeded. Maximum ${limit} requests per ${Math.round(
        windowMs / 60000
      )} minutes. Try again in ${resetSeconds}s.`,
    };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(key, { timestamps: activeTimestamps });

  return {
    allowed: true,
    remaining: limit - activeTimestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * 1. Telecommunications SMS Rate Limiter
 * Enforces max 3 SMS per phone number per 10 minutes to protect provider quotas.
 */
export function checkSmsRateLimit(phone: string): RateLimitResult {
  const clean = phone.replace(/[^0-9]/g, '');
  const key = `sms:phone:${clean}`;
  return checkRateLimit(key, 3, 10 * 60 * 1000); // 3 SMS per 10 min
}

/**
 * 2. Checkout & Payment Initiation Rate Limiter
 * Enforces max 10 checkout / payment sessions per 15 minutes per IP to deter card testing.
 */
export function checkCheckoutRateLimit(ip: string): RateLimitResult {
  const cleanIp = ip.trim() || 'unknown';
  const key = `checkout:ip:${cleanIp}`;
  return checkRateLimit(key, 10, 15 * 60 * 1000); // 10 attempts per 15 min
}

/**
 * 3. Banking & Account OTP Rate Limiter
 * Enforces max 4 OTP requests per 10 minutes per recipient, and max 15 per IP.
 */
export function checkOtpRateLimit(recipient: string, ip: string): RateLimitResult {
  const cleanRecipient = recipient.trim().toLowerCase();
  const recipientCheck = checkRateLimit(`otp:rec:${cleanRecipient}`, 4, 10 * 60 * 1000);
  if (!recipientCheck.allowed) return recipientCheck;

  const cleanIp = ip.trim() || 'unknown';
  return checkRateLimit(`otp:ip:${cleanIp}`, 15, 10 * 60 * 1000);
}

/**
 * 4. Silent Honeypot Bot Detector
 * Checks for hidden input fields populated exclusively by automated scrapers/bots.
 */
export function verifyHoneypot(body: any): boolean {
  if (!body || typeof body !== 'object') return false;

  const honeypotKeys = [
    '_hp_website',
    'website_hp',
    'fax_number_hp',
    'security_trap_field',
    '_honeypot',
  ];

  for (const key of honeypotKeys) {
    if (body[key] && String(body[key]).trim().length > 0) {
      console.warn(`[SECURITY TRAP] Bot detected and blocked via honeypot field "${key}".`);
      return true; // Is a bot!
    }
  }

  return false; // Legitimate user
}

/**
 * Helper to extract client IP address across reverse proxies and Vercel edge headers
 */
export function getClientIp(req: Request | NextRequest): string {
  const headers = req.headers;
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  return '127.0.0.1';
}
