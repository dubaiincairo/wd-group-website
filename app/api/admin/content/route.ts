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
        title_en: en.home.hero.title,
        title_ar: ar.home.hero.title,
        body_en: en.home.hero.body,
        body_ar: ar.home.hero.body,
        primary_cta_en: en.home.hero.primaryCta,
        primary_cta_ar: ar.home.hero.primaryCta,
        secondary_cta_en: en.home.hero.secondaryCta,
        secondary_cta_ar: ar.home.hero.secondaryCta,
      },
      media: {
        hero_video_hospitality: '/videos/hospitality.mp4',
        hero_poster_hospitality: 'https://cdn.sanity.io/images/uoj8zwj3/production/00b20cc6cb3d8c613964965da5556e8396305950-2400x1792.jpg',
        hero_video_manufacturing: '/videos/manufacturing.mp4',
        hero_poster_manufacturing: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=2400&q=85',
        hero_video_contracting: '/videos/contracting.mp4',
        hero_poster_contracting: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
        sector_photo_hospitality: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
        sector_photo_manufacturing: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
        sector_photo_contracting: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=1600&q=80',
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
        heading_en: en.home.synergy.heading,
        heading_ar: ar.home.synergy.heading,
        intro_en: en.home.synergy.intro,
        intro_ar: ar.home.synergy.intro,
      },
      identity: {
        vision_title_en: en.home.identity.vision_title,
        vision_title_ar: ar.home.identity.vision_title,
        vision_desc_en: en.home.identity.vision_desc,
        vision_desc_ar: ar.home.identity.vision_desc,
        mission_title_en: en.home.identity.mission_title,
        mission_title_ar: ar.home.identity.mission_title,
        mission_desc_en: en.home.identity.mission_desc,
        mission_desc_ar: ar.home.identity.mission_desc,
      },
      ceo: {
        quote_en: en.home.ceo.quote,
        quote_ar: ar.home.ceo.quote,
        name_en: en.home.ceo.name,
        name_ar: ar.home.ceo.name,
        title_en: en.home.ceo.title,
        title_ar: ar.home.ceo.title,
      },
    },
    about: {
      hero_image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85',
      story_heading_en: en.about.story.heading,
      story_heading_ar: ar.about.story.heading,
      story_body_en: en.about.story.body,
      story_body_ar: ar.about.story.body,
      governance_statement_en: en.about.governance.statement,
      governance_statement_ar: ar.about.governance.statement,
    },
    hospitality: {
      hero_title_en: en.hospitality.hero.title,
      hero_title_ar: ar.hospitality.hero.title,
      hero_body_en: en.hospitality.hero.body,
      hero_body_ar: ar.hospitality.hero.body,
      hero_image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85',
      properties: en.hospitality.portfolio.properties.map((p, idx) => ({
        id: `prop_${idx + 1}`,
        name_en: p.name,
        name_ar: ar.hospitality.portfolio.properties[idx]?.name || p.name,
        city_en: p.city,
        city_ar: ar.hospitality.portfolio.properties[idx]?.city || p.city,
        desc_en: p.desc,
        desc_ar: ar.hospitality.portfolio.properties[idx]?.desc || p.desc,
        image_url: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        ][idx % 6],
        review_url: '',
        website_url: 'https://new.swissbluehotels.com',
      })),
    },
    manufacturing: {
      hero_title_en: en.manufacturing.hero.title,
      hero_title_ar: ar.manufacturing.hero.title,
      hero_body_en: en.manufacturing.hero.body,
      hero_body_ar: ar.manufacturing.hero.body,
      hero_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=85',
      factories: en.manufacturing.factories.list.map((f, idx) => ({
        id: `factory_${idx + 1}`,
        title_en: f.title,
        title_ar: ar.manufacturing.factories.list[idx]?.title || f.title,
        desc_en: f.desc,
        desc_ar: ar.manufacturing.factories.list[idx]?.desc || f.desc,
        location_en: 'Najran & Riyadh',
        location_ar: 'نجران والرياض',
        image_url: [
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        ][idx % 3],
      })),
    },
    contracting: {
      hero_title_en: en.contracting.hero.title,
      hero_title_ar: ar.contracting.hero.title,
      hero_body_en: en.contracting.hero.body,
      hero_body_ar: ar.contracting.hero.body,
      hero_image: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=2400&q=85',
      services: en.contracting.services.list.map((s, idx) => ({
        id: `service_${idx + 1}`,
        title_en: s.title,
        title_ar: ar.contracting.services.list[idx]?.title || s.title,
        desc_en: s.desc,
        desc_ar: ar.contracting.services.list[idx]?.desc || s.desc,
        image_url: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        ][idx % 3],
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
    },
    seo: {
      global_title_en: 'WD Group | Integrated Hospitality, Manufacturing & Contracting',
      global_title_ar: 'مجموعة دبليو دي للأعمال | منظومة متكاملة في الضيافة والتصنيع والمقاولات',
      global_description_en: 'WD Group is a premier Saudi business group creating sustainable value across hospitality, specialized manufacturing, and turnkey contracting.',
      global_description_ar: 'مجموعة أعمال سعودية رائدة تصنع قيمة مستدامة عبر قطاعات الضيافة، التصنيع المتخصص، والمقاولات والتجهيز الداخلي المتكامل.',
      og_image_url: 'https://fqkbgfdasfwnryekkgqz.supabase.co/storage/v1/object/public/photos/og-preview.jpg',
      canonical_base: 'https://wdgroup.online',
    },
    version: 1,
  };
}

export async function GET(req: NextRequest) {
  try {
    const dbContent = await getSiteContent();
    const defaultContent = getDefaultContent();
    
    // Deep merge to guarantee all sections exist
    const merged = {
      ...defaultContent,
      ...(dbContent || {}),
      home: { ...defaultContent.home, ...(dbContent?.home || {}) },
      about: { ...defaultContent.about, ...(dbContent?.about || {}) },
      hospitality: { ...defaultContent.hospitality, ...(dbContent?.hospitality || {}) },
      manufacturing: { ...defaultContent.manufacturing, ...(dbContent?.manufacturing || {}) },
      contracting: { ...defaultContent.contracting, ...(dbContent?.contracting || {}) },
      settings: { ...defaultContent.settings, ...(dbContent?.settings || {}) },
      seo: { ...defaultContent.seo, ...(dbContent?.seo || {}) },
    };

    return NextResponse.json({ success: true, data: merged });
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
