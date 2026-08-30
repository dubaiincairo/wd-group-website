import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession, hasPermission } from '@/lib/admin/auth';
import { getSiteContent, updateSiteContent } from '@/lib/admin/db';
import { recordAuditLog } from '@/lib/admin/audit';
import { translations } from '@/lib/translations';

export const dynamic = 'force-dynamic';

// Default initial structured content payload based on translations.ts
function getDefaultContent() {
  const en = translations.en;
  const ar = translations.ar;

  return {
    home: {
      hero: {
        eyebrow_en: en.home.hero.eyebrow,
        eyebrow_ar: ar.home.hero.eyebrow,
        kicker_en: en.home.hero.kicker,
        kicker_ar: ar.home.hero.kicker,
        title_en: en.home.hero.title,
        title_ar: ar.home.hero.title,
        title_line1_en: en.home.hero.title_line1,
        title_line1_ar: ar.home.hero.title_line1,
        title_line2_en: en.home.hero.title_line2,
        title_line2_ar: ar.home.hero.title_line2,
        title_line3_en: en.home.hero.title_line3,
        title_line3_ar: ar.home.hero.title_line3,
        body_en: en.home.hero.body,
        body_ar: ar.home.hero.body,
        primary_cta_en: en.home.hero.primaryCta,
        primary_cta_ar: ar.home.hero.primaryCta,
        secondary_cta_en: en.home.hero.secondaryCta,
        secondary_cta_ar: ar.home.hero.secondaryCta,
        dock_hospitality_label_en: en.home.hero.dock?.hospitality_label || 'Hospitality (SwissBlue)',
        dock_hospitality_label_ar: ar.home.hero.dock?.hospitality_label || 'الضيافة (SwissBlue)',
        dock_hospitality_badge_en: en.home.hero.dock?.hospitality_badge || '6 Properties',
        dock_hospitality_badge_ar: ar.home.hero.dock?.hospitality_badge || '6 منشآت',
        dock_manufacturing_label_en: en.home.hero.dock?.manufacturing_label || 'Manufacturing (GreenWood)',
        dock_manufacturing_label_ar: ar.home.hero.dock?.manufacturing_label || 'التصنيع والأثاث (GreenWood)',
        dock_manufacturing_badge_en: en.home.hero.dock?.manufacturing_badge || '3 Factories',
        dock_manufacturing_badge_ar: ar.home.hero.dock?.manufacturing_badge || '3 مصانع',
        dock_contracting_label_en: en.home.hero.dock?.contracting_label || 'Contracting (Projects)',
        dock_contracting_label_ar: ar.home.hero.dock?.contracting_label || 'المقاولات والتميز الهندسي',
        dock_contracting_badge_en: en.home.hero.dock?.contracting_badge || 'Turnkey Execution',
        dock_contracting_badge_ar: ar.home.hero.dock?.contracting_badge || 'تنفيذ شامل',
        scroll_cue_en: en.home.hero.scroll_cue || 'Scroll to explore',
        scroll_cue_ar: ar.home.hero.scroll_cue || 'استكشف المنظومة القابضة',
      },
      media: {
        hero_video_hospitality: '/videos/hospitality.mp4',
        hero_poster_hospitality: '',
        hero_video_manufacturing: '/videos/manufacturing.mp4',
        hero_poster_manufacturing: '',
        hero_video_contracting: '/videos/contracting.mp4',
        hero_poster_contracting: '',
        sector_photo_hospitality: '',
        sector_photo_manufacturing: '',
        sector_photo_contracting: '',
      },
      metrics: {
        stat1_num: en.home.metrics.stat1_num,
        stat1_text_en: en.home.metrics.stat1_text,
        stat1_text_ar: ar.home.metrics.stat1_text,
        stat2_num: en.home.metrics.stat2_num,
        stat2_text_en: en.home.metrics.stat2_text,
        stat2_text_ar: ar.home.metrics.stat2_text,
        stat3_num: en.home.metrics.stat3_num,
        stat3_text_en: en.home.metrics.stat3_text,
        stat3_text_ar: ar.home.metrics.stat3_text,
        stat4_num: en.home.metrics.stat4_num,
        stat4_text_en: en.home.metrics.stat4_text,
        stat4_text_ar: ar.home.metrics.stat4_text,
      },
      synergy: {
        label_en: en.home.synergy.label,
        label_ar: ar.home.synergy.label,
        heading_en: en.home.synergy.heading,
        heading_ar: ar.home.synergy.heading,
        intro_en: en.home.synergy.intro,
        intro_ar: ar.home.synergy.intro,
        step1_title_en: en.home.synergy.step1_title,
        step1_title_ar: ar.home.synergy.step1_title,
        step1_text_en: en.home.synergy.step1_text,
        step1_text_ar: ar.home.synergy.step1_text,
        step2_title_en: en.home.synergy.step2_title,
        step2_title_ar: ar.home.synergy.step2_title,
        step2_text_en: en.home.synergy.step2_text,
        step2_text_ar: ar.home.synergy.step2_text,
        step3_title_en: en.home.synergy.step3_title,
        step3_title_ar: ar.home.synergy.step3_title,
        step3_text_en: en.home.synergy.step3_text,
        step3_text_ar: ar.home.synergy.step3_text,
      },
      identity: {
        label_en: en.home.identity.label,
        label_ar: ar.home.identity.label,
        vision_title_en: en.home.identity.vision_title,
        vision_title_ar: ar.home.identity.vision_title,
        vision_desc_en: en.home.identity.vision_desc,
        vision_desc_ar: ar.home.identity.vision_desc,
        mission_title_en: en.home.identity.mission_title,
        mission_title_ar: ar.home.identity.mission_title,
        mission_desc_en: en.home.identity.mission_desc,
        mission_desc_ar: ar.home.identity.mission_desc,
        values_title_en: en.home.identity.values_title,
        values_title_ar: ar.home.identity.values_title,
        val1_title_en: en.home.identity.values[0]?.title || '',
        val1_title_ar: ar.home.identity.values[0]?.title || '',
        val1_desc_en: en.home.identity.values[0]?.desc || '',
        val1_desc_ar: ar.home.identity.values[0]?.desc || '',
        val2_title_en: en.home.identity.values[1]?.title || '',
        val2_title_ar: ar.home.identity.values[1]?.title || '',
        val2_desc_en: en.home.identity.values[1]?.desc || '',
        val2_desc_ar: ar.home.identity.values[1]?.desc || '',
        val3_title_en: en.home.identity.values[2]?.title || '',
        val3_title_ar: ar.home.identity.values[2]?.title || '',
        val3_desc_en: en.home.identity.values[2]?.desc || '',
        val3_desc_ar: ar.home.identity.values[2]?.desc || '',
        val4_title_en: en.home.identity.values[3]?.title || '',
        val4_title_ar: ar.home.identity.values[3]?.title || '',
        val4_desc_en: en.home.identity.values[3]?.desc || '',
        val4_desc_ar: ar.home.identity.values[3]?.desc || '',
      },
      ceo: {
        label_en: en.home.ceo.label,
        label_ar: ar.home.ceo.label,
        quote_en: en.home.ceo.quote,
        quote_ar: ar.home.ceo.quote,
        name_en: en.home.ceo.name,
        name_ar: ar.home.ceo.name,
        title_en: en.home.ceo.title,
        title_ar: ar.home.ceo.title,
        photo_url: (en.home.ceo as any).photo_url || '',
        photo_url_ar: (ar.home.ceo as any).photo_url || '',
        photo_url_en: (en.home.ceo as any).photo_url || '',
      },
      partnership: {
        label_en: en.home.partnership.label,
        label_ar: ar.home.partnership.label,
        heading_en: en.home.partnership.heading,
        heading_ar: ar.home.partnership.heading,
        body_en: en.home.partnership.body,
        body_ar: ar.home.partnership.body,
        primary_cta_en: en.home.partnership.primaryCta,
        primary_cta_ar: ar.home.partnership.primaryCta,
        secondary_cta_en: en.home.partnership.secondaryCta,
        secondary_cta_ar: ar.home.partnership.secondaryCta,
      },
    },
    about: {
      hero_image: '',
      story_image: '',
      story_heading_en: en.about.story.heading,
      story_heading_ar: ar.about.story.heading,
      story_body_en: en.about.story.body,
      story_body_ar: ar.about.story.body,
      governance_statement_en: en.about.governance.statement,
      governance_statement_ar: ar.about.governance.statement,
      corporate_profile_pdf: en.about.corporate_profile_pdf || '',
    },
    hospitality: {
      hero_title_en: en.hospitality.hero.title,
      hero_title_ar: ar.hospitality.hero.title,
      hero_body_en: en.hospitality.hero.body,
      hero_body_ar: ar.hospitality.hero.body,
      hero_image: '',
      properties: en.hospitality.portfolio.properties.map((p, idx) => ({
        id: `prop_${idx + 1}`,
        name_en: p.name,
        name_ar: ar.hospitality.portfolio.properties[idx]?.name || p.name,
        city_en: p.city,
        city_ar: ar.hospitality.portfolio.properties[idx]?.city || p.city,
        desc_en: p.desc,
        desc_ar: ar.hospitality.portfolio.properties[idx]?.desc || p.desc,
        image_url: '',
        review_url: '',
        website_url: 'https://new.swissbluehotels.com',
      })),
    },
    manufacturing: {
      hero_title_en: en.manufacturing.hero.title,
      hero_title_ar: ar.manufacturing.hero.title,
      hero_body_en: en.manufacturing.hero.body,
      hero_body_ar: ar.manufacturing.hero.body,
      hero_image: '',
      factories: en.manufacturing.factories.list.map((f, idx) => ({
        id: `factory_${idx + 1}`,
        title_en: f.title,
        title_ar: ar.manufacturing.factories.list[idx]?.title || f.title,
        desc_en: f.desc,
        desc_ar: ar.manufacturing.factories.list[idx]?.desc || f.desc,
        location_en: 'Najran & Riyadh',
        location_ar: 'نجران والرياض',
        image_url: '',
      })),
    },
    contracting: {
      hero_title_en: en.contracting.hero.title,
      hero_title_ar: ar.contracting.hero.title,
      hero_body_en: en.contracting.hero.body,
      hero_body_ar: ar.contracting.hero.body,
      hero_image: '',
      services: en.contracting.services.list.map((s, idx) => ({
        id: `service_${idx + 1}`,
        title_en: s.title,
        title_ar: ar.contracting.services.list[idx]?.title || s.title,
        desc_en: s.desc,
        desc_ar: ar.contracting.services.list[idx]?.desc || s.desc,
        image_url: '',
      })),
    },
    branding: {
      logo_dark: '/brand/wd-logo-white.svg',
      logo_light: '/brand/wd-logo-dark.svg',
      favicon: '/favicon.ico',
      corporate_profile_pdf: '/corporate-profile.pdf',
    },
    settings: {
      company_name_ar: 'شركة تصاميم الوطن المحدودة / مجموعة دبليو دي للأعمال',
      company_name_en: 'WD Group for Business / Watan Designs Ltd.',
      cr_number: '5950011057',
      vat_number: '300865965100003',
      headquarters_ar: 'طريق الملك عبدالعزيز، حي الخالدية، نجران، المملكة العربية السعودية',
      headquarters_en: 'King Abdulaziz Road, Al Khalidiya, Najran, Kingdom of Saudi Arabia',
      general_email: 'ceo@wdgroup.online',
      secondary_email: 'ceo@wdgroup.online',
      primary_phone: '+966 50 572 5070',
      secondary_phone: '+966 53 397 9797',
      whatsapp_phone: '+966505725070',
      emergency_notice_enabled: false,
      emergency_notice_ar: '',
      emergency_notice_en: '',
      maintenance_mode_enabled: true,
      maintenance_headline_ar: 'المنصة تحت الصيانة والتطوير',
      maintenance_headline_en: 'Platform Under Scheduled Maintenance',
      maintenance_message_ar: 'نعمل حالياً على تطوير وتجهيز المنصة الرقمية لمجموعة دبليو دي للأعمال. سنكون معكم قريباً.',
      maintenance_message_en: 'We are currently preparing the new digital platform for WD Group. We look forward to launching soon.',
      maintenance_estimated_date: 'Q3 2026',
      bank_accounts: [
        {
          id: 'bank_1',
          bank_name_ar: 'مصرف الراجحي',
          bank_name_en: 'Al Rajhi Bank',
          account_name_ar: 'شركة تصاميم الوطن المحدودة',
          account_name_en: 'Watan Designs Ltd.',
          iban: 'SA0000000000000000000000',
          account_number: '000000000000',
          swift_code: 'RJHISARI',
          currency: 'SAR',
          is_active: true,
        },
        {
          id: 'bank_2',
          bank_name_ar: 'البنك الأهلي السعودي (SNB)',
          bank_name_en: 'Saudi National Bank (SNB / AlAhli)',
          account_name_ar: 'شركة تصاميم الوطن المحدودة',
          account_name_en: 'Watan Designs Ltd.',
          iban: 'SA0000000000000000000000',
          account_number: '000000000000',
          swift_code: 'NCBKSAJE',
          currency: 'SAR',
          is_active: true,
        }
      ],
    },
    seo: {
      global_title_en: 'WD Group | Integrated Hospitality, Manufacturing & Contracting',
      global_title_ar: 'مجموعة دبليو دي للأعمال | منظومة متكاملة في الضيافة والتصنيع والمقاولات',
      global_description_en: 'WD Group is a premier Saudi business group creating sustainable value across hospitality, specialized manufacturing, and turnkey contracting.',
      global_description_ar: 'مجموعة أعمال سعودية رائدة تصنع قيمة مستدامة عبر قطاعات الضيافة، التصنيع المتخصص، والمقاولات والتجهيز الداخلي المتكامل.',
      keywords_en: 'WD Group, Saudi Holding Company, SwissBlue Hotels, GreenWood Manufacturing, WatanDesign Contracting, Vision 2030, Saudi Arabia',
      keywords_ar: 'مجموعة دبليو دي, شركة قابضة سعودية, فنادق سويس بلو, مصانع جرين وود, شركة تصاميم الوطن, رؤية 2030, المملكة العربية السعودية',
      canonical_base: 'https://wdgroup.online',
      og_image_url: 'https://fqkbgfdasfwnryekkgqz.supabase.co/storage/v1/object/public/photos/og-preview.jpg',
      twitter_card: 'summary_large_image',
      twitter_handle: '@wdgroup',
      google_site_verification: '',
      bing_site_verification: '',
      google_analytics_id: 'G-FVBW70B8H5',
      google_tag_manager_id: '',
      robots_index: true,
      sitemap_url: 'https://wdgroup.online/sitemap.xml',
      schema_org_type: 'Corporation',
      schema_legal_name_ar: 'مجموعة دبليو دي للأعمال',
      schema_legal_name_en: 'WD Group for Business',
      schema_phone: '+966 50 572 5070',
      schema_email: 'ceo@wdgroup.online',
    },
    version: 1,
  };
}

export async function GET(req: NextRequest) {
  try {
    const dbContent = await getSiteContent();
    const defaultContent = getDefaultContent();
    
    // Deep merge to guarantee all sections and sub-arrays exist
    const merged = {
      ...defaultContent,
      ...(dbContent || {}),
      home: { 
        ...defaultContent.home, 
        ...(dbContent?.home || {}),
        hero: { ...defaultContent.home.hero, ...(dbContent?.home?.hero || {}) },
        metrics: { ...defaultContent.home.metrics, ...(dbContent?.home?.metrics || {}) },
        synergy: { ...defaultContent.home.synergy, ...(dbContent?.home?.synergy || {}) },
        identity: { ...defaultContent.home.identity, ...(dbContent?.home?.identity || {}) },
        ceo: { ...defaultContent.home.ceo, ...(dbContent?.home?.ceo || {}) },
        partnership: { ...defaultContent.home.partnership, ...(dbContent?.home?.partnership || {}) },
        media: { ...defaultContent.home.media, ...(dbContent?.home?.media || {}) },
      },
      about: { ...defaultContent.about, ...(dbContent?.about || {}) },
      hospitality: { 
        ...defaultContent.hospitality, 
        ...(dbContent?.hospitality || {}),
        properties: Array.isArray(dbContent?.hospitality?.properties) && dbContent.hospitality.properties.length > 0
          ? dbContent.hospitality.properties
          : defaultContent.hospitality.properties,
      },
      manufacturing: { 
        ...defaultContent.manufacturing, 
        ...(dbContent?.manufacturing || {}),
        factories: Array.isArray(dbContent?.manufacturing?.factories) && dbContent.manufacturing.factories.length > 0
          ? dbContent.manufacturing.factories
          : defaultContent.manufacturing.factories,
      },
      contracting: { 
        ...defaultContent.contracting, 
        ...(dbContent?.contracting || {}),
        services: Array.isArray(dbContent?.contracting?.services) && dbContent.contracting.services.length > 0
          ? dbContent.contracting.services
          : defaultContent.contracting.services,
      },
      settings: { ...defaultContent.settings, ...(dbContent?.settings || {}) },
      seo: { ...defaultContent.seo, ...(dbContent?.seo || {}) },
    };

    return NextResponse.json(
      { success: true, data: merged },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(session.role, ['owner', 'admin', 'editor'])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const payload = await req.json();
    const success = await updateSiteContent(payload);

    if (!success) {
      return NextResponse.json({ error: 'Failed to persist content update' }, { status: 500 });
    }

    await recordAuditLog({
      actorId: session.userId,
      actorEmail: session.email,
      action: 'content.update',
      resourceType: 'site_content',
      details: { keys: Object.keys(payload) },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    return NextResponse.json({
      success: true,
      message: 'Content updated and published successfully',
    });
  } catch (error: any) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}
