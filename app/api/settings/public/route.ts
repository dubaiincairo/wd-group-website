import { NextResponse } from 'next/server';
import { getSiteContent } from '@/lib/admin/db';
import type { SiteSettings } from '@/lib/admin/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const content = await getSiteContent();
    const settings: Partial<SiteSettings> = content?.settings || {};

    return NextResponse.json({
      success: true,
      settings: {
        maintenance_mode_enabled: settings.maintenance_mode_enabled ?? true,
        maintenance_headline_ar: settings.maintenance_headline_ar || 'المنصة تحت الصيانة والتطوير',
        maintenance_headline_en: settings.maintenance_headline_en || 'Platform Under Scheduled Maintenance',
        maintenance_message_ar: settings.maintenance_message_ar || 'نعمل حالياً على تطوير وتجهيز المنصة الرقمية الرسمية لمجموعة دبليو دي للأعمال. سنكون معكم قريباً بحلتنا الجديدة.',
        maintenance_message_en: settings.maintenance_message_en || 'We are currently preparing and upgrading the official digital platform for WD Group. We look forward to welcoming you soon.',
        maintenance_estimated_date: settings.maintenance_estimated_date || 'Q3 2026',
        emergency_notice_enabled: settings.emergency_notice_enabled || false,
        emergency_notice_ar: settings.emergency_notice_ar || '',
        emergency_notice_en: settings.emergency_notice_en || '',
      },
    });
  } catch (error: any) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json(
      {
        success: true,
        settings: {
          maintenance_mode_enabled: true,
          maintenance_headline_ar: 'المنصة تحت الصيانة والتطوير',
          maintenance_headline_en: 'Platform Under Scheduled Maintenance',
          maintenance_message_ar: 'نعمل حالياً على تطوير وتجهيز المنصة الرقمية الرسمية لمجموعة دبليو دي للأعمال.',
          maintenance_message_en: 'We are currently preparing the new digital platform for WD Group.',
          maintenance_estimated_date: 'Q3 2026',
        },
      },
      { status: 200 }
    );
  }
}
