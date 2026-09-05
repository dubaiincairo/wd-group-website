import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/admin/db';
import { translations } from '@/lib/translations';

export const dynamic = 'force-dynamic';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const recipient = (body?.recipient || '').toString().trim().toLowerCase();
    const inputCode = (body?.code || '').toString().trim();

    if (!inputCode) {
      return NextResponse.json(
        { success: false, error: 'OTP code is required', error_ar: 'يرجى إدخال رمز التحقق' },
        { status: 400 }
      );
    }

    const content = await getSiteContent();
    const configuredCode = content?.settings?.bank_access_code?.trim().toUpperCase();

    // 1. Check Master Corporate Backup Codes
    const masterCodes = new Set<string>();
    if (configuredCode) masterCodes.add(configuredCode);
    masterCodes.add('WD-2026');
    masterCodes.add('WD2026');
    masterCodes.add('5950011057');
    masterCodes.add('8812'); // Demo reference key

    let isVerified = false;

    if (masterCodes.has(inputCode.toUpperCase())) {
      isVerified = true;
    } else if (recipient) {
      const otpStore = global.__wd_banking_otps;
      const record = otpStore?.get(recipient);

      if (record) {
        if (Date.now() > record.expiresAt) {
          otpStore?.delete(recipient);
          return NextResponse.json(
            { 
              success: false, 
              error: 'Verification code has expired. Please request a new code.', 
              error_ar: 'انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.' 
            },
            { status: 410 }
          );
        }

        if (record.attempts >= 5) {
          otpStore?.delete(recipient);
          return NextResponse.json(
            { 
              success: false, 
              error: 'Too many incorrect attempts. Please request a new code.', 
              error_ar: 'تم تجاوز الحد الأقصى للمحاولات الخاطئة. يرجى طلب رمز جديد.' 
            },
            { status: 429 }
          );
        }

        if (record.code === inputCode) {
          isVerified = true;
          // Consume OTP
          otpStore?.delete(recipient);
        } else {
          record.attempts += 1;
        }
      }
    }

    if (!isVerified) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid verification code. Please check and try again.', 
          error_ar: 'رمز التحقق غير صحيح. يرجى التأكد وإعادة المحاولة.' 
        },
        { status: 401 }
      );
    }

    // Resolve Corporate Bank Accounts
    const dbAccounts = content?.settings?.bank_accounts;
    const defaultAccountsEn = translations.en.contact.banking.accounts;
    const defaultAccountsAr = translations.ar.contact.banking.accounts;

    const accounts = Array.isArray(dbAccounts) && dbAccounts.length > 0
      ? dbAccounts.filter((a: any) => a.is_active !== false).map((a: any) => ({
          id: a.id,
          bankNameEn: a.bank_name_en,
          bankNameAr: a.bank_name_ar || a.bank_name_en,
          accountNameEn: a.account_name_en,
          accountNameAr: a.account_name_ar || a.account_name_en,
          iban: a.iban,
          accountNumber: a.account_number,
          swiftCode: a.swift_code || '',
          currency: a.currency || 'SAR',
        }))
      : defaultAccountsEn.map((a: any, idx: number) => ({
          id: `acc_${idx + 1}`,
          bankNameEn: a.bankName,
          bankNameAr: defaultAccountsAr[idx]?.bankName || a.bankName,
          accountNameEn: a.accountName,
          accountNameAr: defaultAccountsAr[idx]?.accountName || a.accountName,
          iban: a.iban,
          accountNumber: a.accountNumber,
          swiftCode: a.swiftCode,
          currency: a.currency,
        }));

    return NextResponse.json({
      success: true,
      data: {
        verified: true,
        legalEntityAr: 'شركة تصاميم الوطن المحدودة / مجموعة دبليو دي للأعمال',
        legalEntityEn: 'Watan Designs Ltd. / WD Group for Business',
        crNumber: content?.settings?.cr_number || '5950011057',
        vatNumber: content?.settings?.vat_number || '300865965100003',
        accounts,
      }
    });

  } catch (error: any) {
    console.error('Error verifying banking OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Verification service error' },
      { status: 500 }
    );
  }
}
