import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/admin/db';
import { translations } from '@/lib/translations';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputCode = (body?.code || '').toString().trim();

    if (!inputCode) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Access code is required',
          error_ar: 'يرجى إدخال رمز التحقق المالي' 
        },
        { status: 400 }
      );
    }

    const content = await getSiteContent();
    const configuredCode = content?.settings?.bank_access_code?.trim();

    // Valid authorized codes (Configured in DB, or official WD Group default keys)
    const validCodes = new Set<string>();
    if (configuredCode) {
      validCodes.add(configuredCode.toUpperCase());
    }
    // Standard system fallback access codes
    validCodes.add('WD-2026');
    validCodes.add('WD2026');
    validCodes.add('5950011057');
    validCodes.add('WD-PAY');

    const isMatch = validCodes.has(inputCode.toUpperCase());

    if (!isMatch) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'The code is not registered. Please contact WD Group to receive a valid authorization code.',
          error_ar: 'الرمز المدخل غير مسجل أو غير صالح. يرجى التواصل مع إدارة المجموعة للحصول على رمز معتمد.' 
        },
        { status: 401 }
      );
    }

    // Resolve active bank accounts
    const dbAccounts = content?.settings?.bank_accounts;
    const defaultAccountsEn = translations.en.contact.banking.accounts;
    const defaultAccountsAr = translations.ar.contact.banking.accounts;

    const accounts = Array.isArray(dbAccounts) && dbAccounts.length > 0
      ? dbAccounts.filter((a: any) => a.is_active !== false).map((a: any) => ({
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
        legalEntityAr: 'شركة تصاميم الوطن المحدودة',
        legalEntityEn: 'Watan Designs Ltd.',
        crNumber: content?.settings?.cr_number || '5950011057',
        vatNumber: content?.settings?.vat_number || '300865965100003',
        accounts,
      }
    });

  } catch (error: any) {
    console.error('Error verifying banking access code:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Verification service error',
        error_ar: 'حدث خطأ في خادم التحقق، يرجى المحاولة لاحقاً' 
      },
      { status: 500 }
    );
  }
}
