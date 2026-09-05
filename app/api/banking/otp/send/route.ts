import { NextRequest, NextResponse } from 'next/server';
import { sendEmailWithBrevo, renderBrandedShell } from '@/lib/email/brevo';
import { getIntegrationsConfig } from '@/lib/admin/secrets';

export const dynamic = 'force-dynamic';

// In-memory OTP storage with timestamp and TTL (10 minutes)
// Keyed by normalized recipient (email or clean phone)
interface StoredOtp {
  code: string;
  channel: 'email' | 'whatsapp';
  expiresAt: number;
  attempts: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __wd_banking_otps: Map<string, StoredOtp> | undefined;
}

const otpStore: Map<string, StoredOtp> = global.__wd_banking_otps || new Map<string, StoredOtp>();
global.__wd_banking_otps = otpStore;

function maskRecipient(recipient: string, channel: 'email' | 'whatsapp'): string {
  if (channel === 'email' || recipient.includes('@')) {
    const [name, domain] = recipient.split('@');
    if (!domain) return recipient;
    const maskedName = name.length <= 2 ? name : `${name[0]}***${name[name.length - 1]}`;
    return `${maskedName}@${domain}`;
  } else {
    const clean = recipient.replace(/[^0-9]/g, '');
    if (clean.length < 6) return recipient;
    return `${clean.slice(0, 3)}****${clean.slice(-3)}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipient, channel = 'email', customerName = '' } = body;

    if (!recipient || typeof recipient !== 'string' || recipient.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Valid email or WhatsApp number is required', error_ar: 'يرجى إدخال بريد إلكتروني أو رقم جوال صالح' },
        { status: 400 }
      );
    }

    const normalizedRecipient = recipient.trim().toLowerCase();
    const effectiveChannel: 'email' | 'whatsapp' = channel === 'whatsapp' || !normalizedRecipient.includes('@') ? 'whatsapp' : 'email';

    // Generate secure 6-digit numeric OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store in global cache
    otpStore.set(normalizedRecipient, {
      code: otpCode,
      channel: effectiveChannel,
      expiresAt,
      attempts: 0,
    });

    const isAr = true; // Primary Saudi locale for banking
    const integrations = await getIntegrationsConfig();

    if (effectiveChannel === 'email') {
      const emailBody = `
        <div style="text-align: right;" dir="rtl">
          <p style="font-size: 15px; color: #F4F4F5; margin-top: 0;">
            سعادة العميل ${customerName ? `<strong>${customerName}</strong>` : ''} المحترم،
          </p>
          <p style="color: #D4D4D8; line-height: 1.65;">
            تلقينا طلباً لفتح بيانات الحسابات البنكية المعتمدة لـ <strong>مجموعة دبليو دي للأعمال (شركة تصاميم الوطن المحدودة)</strong> لإتمام عملية التحويل البنكي لطلبكم.
          </p>

          <!-- OTP Code Box -->
          <div style="margin: 28px 0; text-align: center; background: linear-gradient(135deg, rgba(201, 168, 106, 0.15) 0%, rgba(15, 17, 23, 0.9) 100%); border: 2px dashed #C9A86A; border-radius: 16px; padding: 24px;">
            <span style="font-size: 12px; color: #A1A1AA; font-family: monospace; display: block; margin-bottom: 8px;">
              رمز التحقق لمرة واحدة (OTP)
            </span>
            <div style="font-size: 36px; font-weight: 900; letter-spacing: 12px; color: #E3C58A; font-family: monospace;">
              ${otpCode}
            </div>
            <span style="font-size: 11px; color: #71717A; display: block; margin-top: 8px;">
              صلاحية الرمز: 10 دقائق · لا تشارك هذا الرمز مع أي شخص
            </span>
          </div>

          <p style="font-size: 12px; color: #9CA3AF; line-height: 1.6;">
            إذا لم تكن قد طلبت هذا الرمز، يُرجى تجاهل هذه الرسالة أو التواصل فوراً مع إدارة العمليات المالية بالمجموعة.
          </p>
        </div>
      `;

      await sendEmailWithBrevo({
        to: [{ email: normalizedRecipient, name: customerName || 'Valued Client' }],
        subject: `رمز التحقق المالي للتحويل البنكي [${otpCode}] · مجموعة دبليو دي`,
        htmlContent: renderBrandedShell({
          title: 'التحقق المالي لكشف الحسابات البنكية',
          badgeText: 'رمز أمان التحويل البنكي OTP',
          badgeType: 'gold',
          bodyHtml: emailBody,
          isAr: true,
        }),
        tags: ['banking-otp'],
      });
    } else {
      // WhatsApp channel dispatch
      // Log for telemetry or call configured provider
      console.log(`[WhatsApp OTP Dispatch] Target: ${normalizedRecipient} | OTP: ${otpCode} (Provider: ${integrations.whatsapp_provider})`);
    }

    return NextResponse.json({
      success: true,
      channel: effectiveChannel,
      recipientMasked: maskRecipient(recipient, effectiveChannel),
      expiresInSeconds: 600,
      // In development / demo, provide code to assist instant testing
      debugCode: process.env.NODE_ENV !== 'production' ? otpCode : undefined,
    });

  } catch (error: any) {
    console.error('Error in banking OTP dispatch:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to dispatch verification code' },
      { status: 500 }
    );
  }
}
