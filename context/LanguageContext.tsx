'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  dir: 'ltr' | 'rtl';
  t: (path: string) => any;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dict: typeof translations.en;
  dynamicContent: any;
  setDynamicContent: (data: any) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function isArabicText(str: any): boolean {
  if (!str || typeof str !== 'string') return false;
  return /[\u0600-\u06FF]/.test(str);
}

function resolveField(isAr: boolean, valAr: any, valEn: any, baseAr: any, baseEn: any): any {
  if (isAr) {
    if (valAr && typeof valAr === 'string' && isArabicText(valAr)) {
      return valAr.trim();
    }
    return baseAr;
  } else {
    if (valEn && typeof valEn === 'string' && !isArabicText(valEn) && valEn.trim().length > 0) {
      return valEn.trim();
    }
    return baseEn;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('wd_lang') as Language;
        if (saved === 'en' || saved === 'ar') return saved;
        const docLang = document.documentElement.lang as Language;
        if (docLang === 'en' || docLang === 'ar') return docLang;
        if (document.documentElement.dir === 'rtl') return 'ar';
      } catch (e) {}
    }
    return 'en';
  });
  const [dynamicContent, setDynamicContent] = useState<any>(null);

  useEffect(() => {
    // Fetch dynamic published CMS content
    async function loadDynamicContent() {
      try {
        const res = await fetch(`/api/content?t=${Date.now()}`, { 
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        if (res.ok) {
          const d = await res.json();
          if (d.data) {
            setDynamicContent(d.data);
          }
        }
      } catch (err) {
        // Silently fallback to static translations
      }
    }
    loadDynamicContent();
  }, []);

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem('wd_lang', lang);
  }, [lang, dir]);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isAr = lang === 'ar';
  const arDict = translations.ar;
  const enDict = translations.en;
  const baseDict = isAr ? arDict : enDict;

  let dict = { ...baseDict };
  if (dynamicContent) {
    const c = dynamicContent;

    dict = {
      ...baseDict,
      nav: {
        ...baseDict.nav,
        contactCta: resolveField(isAr, c.settings?.nav_cta_ar, c.settings?.nav_cta_en, arDict.nav.contactCta, enDict.nav.contactCta),
      },
      home: {
        ...baseDict.home,
        hero: {
          ...baseDict.home.hero,
          eyebrow: resolveField(isAr, c.home?.hero?.eyebrow_ar, c.home?.hero?.eyebrow_en, arDict.home.hero.eyebrow, enDict.home.hero.eyebrow),
          kicker: resolveField(isAr, c.home?.hero?.kicker_ar, c.home?.hero?.kicker_en, arDict.home.hero.kicker, enDict.home.hero.kicker),
          title: resolveField(isAr, c.home?.hero?.title_ar, c.home?.hero?.title_en, arDict.home.hero.title, enDict.home.hero.title),
          title_line1: resolveField(isAr, c.home?.hero?.title_line1_ar, c.home?.hero?.title_line1_en, arDict.home.hero.title_line1, enDict.home.hero.title_line1),
          title_line2: resolveField(isAr, c.home?.hero?.title_line2_ar, c.home?.hero?.title_line2_en, arDict.home.hero.title_line2, enDict.home.hero.title_line2),
          title_line3: resolveField(isAr, c.home?.hero?.title_line3_ar, c.home?.hero?.title_line3_en, arDict.home.hero.title_line3, enDict.home.hero.title_line3),
          body: resolveField(isAr, c.home?.hero?.body_ar, c.home?.hero?.body_en, arDict.home.hero.body, enDict.home.hero.body),
          primaryCta: resolveField(isAr, c.home?.hero?.primary_cta_ar, c.home?.hero?.primary_cta_en, arDict.home.hero.primaryCta, enDict.home.hero.primaryCta),
          secondaryCta: resolveField(isAr, c.home?.hero?.secondary_cta_ar, c.home?.hero?.secondary_cta_en, arDict.home.hero.secondaryCta, enDict.home.hero.secondaryCta),
          dock: {
            hospitality_label: resolveField(isAr, c.home?.hero?.dock_hospitality_label_ar, c.home?.hero?.dock_hospitality_label_en, arDict.home.hero.dock.hospitality_label, enDict.home.hero.dock.hospitality_label),
            hospitality_badge: resolveField(isAr, c.home?.hero?.dock_hospitality_badge_ar, c.home?.hero?.dock_hospitality_badge_en, arDict.home.hero.dock.hospitality_badge, enDict.home.hero.dock.hospitality_badge),
            manufacturing_label: resolveField(isAr, c.home?.hero?.dock_manufacturing_label_ar, c.home?.hero?.dock_manufacturing_label_en, arDict.home.hero.dock.manufacturing_label, enDict.home.hero.dock.manufacturing_label),
            manufacturing_badge: resolveField(isAr, c.home?.hero?.dock_manufacturing_badge_ar, c.home?.hero?.dock_manufacturing_badge_en, arDict.home.hero.dock.manufacturing_badge, enDict.home.hero.dock.manufacturing_badge),
            contracting_label: resolveField(isAr, c.home?.hero?.dock_contracting_label_ar, c.home?.hero?.dock_contracting_label_en, arDict.home.hero.dock.contracting_label, enDict.home.hero.dock.contracting_label),
            contracting_badge: resolveField(isAr, c.home?.hero?.dock_contracting_badge_ar, c.home?.hero?.dock_contracting_badge_en, arDict.home.hero.dock.contracting_badge, enDict.home.hero.dock.contracting_badge),
          },
          scroll_cue: resolveField(isAr, c.home?.hero?.scroll_cue_ar, c.home?.hero?.scroll_cue_en, arDict.home.hero.scroll_cue, enDict.home.hero.scroll_cue),
        },
        media: {
          ...(baseDict.home as any).media,
          ...(c.home?.media || {}),
        },
        metrics: {
          ...baseDict.home.metrics,
          stat1_num: c.home?.metrics?.stat1_num || baseDict.home.metrics.stat1_num,
          stat1_text: resolveField(isAr, c.home?.metrics?.stat1_text_ar, c.home?.metrics?.stat1_text_en, arDict.home.metrics.stat1_text, enDict.home.metrics.stat1_text),
          stat2_num: c.home?.metrics?.stat2_num || baseDict.home.metrics.stat2_num,
          stat2_text: resolveField(isAr, c.home?.metrics?.stat2_text_ar, c.home?.metrics?.stat2_text_en, arDict.home.metrics.stat2_text, enDict.home.metrics.stat2_text),
          stat3_num: c.home?.metrics?.stat3_num || baseDict.home.metrics.stat3_num,
          stat3_text: resolveField(isAr, c.home?.metrics?.stat3_text_ar, c.home?.metrics?.stat3_text_en, arDict.home.metrics.stat3_text, enDict.home.metrics.stat3_text),
          stat4_num: c.home?.metrics?.stat4_num || baseDict.home.metrics.stat4_num,
          stat4_text: resolveField(isAr, c.home?.metrics?.stat4_text_ar, c.home?.metrics?.stat4_text_en, arDict.home.metrics.stat4_text, enDict.home.metrics.stat4_text),
        },
        sectors: {
          ...baseDict.home.sectors,
          label: resolveField(isAr, c.home?.sectors?.label_ar, c.home?.sectors?.label_en, arDict.home.sectors.label, enDict.home.sectors.label),
          heading: resolveField(isAr, c.home?.sectors?.heading_ar, c.home?.sectors?.heading_en, arDict.home.sectors.heading, enDict.home.sectors.heading),
          intro: resolveField(isAr, c.home?.sectors?.intro_ar, c.home?.sectors?.intro_en, arDict.home.sectors.intro, enDict.home.sectors.intro),
          hospitality: {
            ...baseDict.home.sectors.hospitality,
            eyebrow: resolveField(isAr, c.home?.sectors?.hospitality_eyebrow_ar, c.home?.sectors?.hospitality_eyebrow_en, arDict.home.sectors.hospitality.eyebrow, enDict.home.sectors.hospitality.eyebrow),
            title: resolveField(isAr, c.home?.sectors?.hospitality_title_ar, c.home?.sectors?.hospitality_title_en, arDict.home.sectors.hospitality.title, enDict.home.sectors.hospitality.title),
            desc: resolveField(isAr, c.home?.sectors?.hospitality_desc_ar, c.home?.sectors?.hospitality_desc_en, arDict.home.sectors.hospitality.desc, enDict.home.sectors.hospitality.desc),
            proof: resolveField(isAr, c.home?.sectors?.hospitality_proof_ar, c.home?.sectors?.hospitality_proof_en, arDict.home.sectors.hospitality.proof, enDict.home.sectors.hospitality.proof),
            cta: resolveField(isAr, c.home?.sectors?.hospitality_cta_ar, c.home?.sectors?.hospitality_cta_en, arDict.home.sectors.hospitality.cta, enDict.home.sectors.hospitality.cta),
          },
          manufacturing: {
            ...baseDict.home.sectors.manufacturing,
            eyebrow: resolveField(isAr, c.home?.sectors?.manufacturing_eyebrow_ar, c.home?.sectors?.manufacturing_eyebrow_en, arDict.home.sectors.manufacturing.eyebrow, enDict.home.sectors.manufacturing.eyebrow),
            title: resolveField(isAr, c.home?.sectors?.manufacturing_title_ar, c.home?.sectors?.manufacturing_title_en, arDict.home.sectors.manufacturing.title, enDict.home.sectors.manufacturing.title),
            desc: resolveField(isAr, c.home?.sectors?.manufacturing_desc_ar, c.home?.sectors?.manufacturing_desc_en, arDict.home.sectors.manufacturing.desc, enDict.home.sectors.manufacturing.desc),
            proof: resolveField(isAr, c.home?.sectors?.manufacturing_proof_ar, c.home?.sectors?.manufacturing_proof_en, arDict.home.sectors.manufacturing.proof, enDict.home.sectors.manufacturing.proof),
            cta: resolveField(isAr, c.home?.sectors?.manufacturing_cta_ar, c.home?.sectors?.manufacturing_cta_en, arDict.home.sectors.manufacturing.cta, enDict.home.sectors.manufacturing.cta),
          },
          contracting: {
            ...baseDict.home.sectors.contracting,
            eyebrow: resolveField(isAr, c.home?.sectors?.contracting_eyebrow_ar, c.home?.sectors?.contracting_eyebrow_en, arDict.home.sectors.contracting.eyebrow, enDict.home.sectors.contracting.eyebrow),
            title: resolveField(isAr, c.home?.sectors?.contracting_title_ar, c.home?.sectors?.contracting_title_en, arDict.home.sectors.contracting.title, enDict.home.sectors.contracting.title),
            desc: resolveField(isAr, c.home?.sectors?.contracting_desc_ar, c.home?.sectors?.contracting_desc_en, arDict.home.sectors.contracting.desc, enDict.home.sectors.contracting.desc),
            proof: resolveField(isAr, c.home?.sectors?.contracting_proof_ar, c.home?.sectors?.contracting_proof_en, arDict.home.sectors.contracting.proof, enDict.home.sectors.contracting.proof),
            cta: resolveField(isAr, c.home?.sectors?.contracting_cta_ar, c.home?.sectors?.contracting_cta_en, arDict.home.sectors.contracting.cta, enDict.home.sectors.contracting.cta),
          },
        },
        synergy: {
          ...baseDict.home.synergy,
          label: resolveField(isAr, c.home?.synergy?.label_ar, c.home?.synergy?.label_en, arDict.home.synergy.label, enDict.home.synergy.label),
          heading: resolveField(isAr, c.home?.synergy?.heading_ar, c.home?.synergy?.heading_en, arDict.home.synergy.heading, enDict.home.synergy.heading),
          intro: resolveField(isAr, c.home?.synergy?.intro_ar, c.home?.synergy?.intro_en, arDict.home.synergy.intro, enDict.home.synergy.intro),
          step1_title: resolveField(isAr, c.home?.synergy?.step1_title_ar, c.home?.synergy?.step1_title_en, arDict.home.synergy.step1_title, enDict.home.synergy.step1_title),
          step1_text: resolveField(isAr, c.home?.synergy?.step1_text_ar, c.home?.synergy?.step1_text_en, arDict.home.synergy.step1_text, enDict.home.synergy.step1_text),
          step2_title: resolveField(isAr, c.home?.synergy?.step2_title_ar, c.home?.synergy?.step2_title_en, arDict.home.synergy.step2_title, enDict.home.synergy.step2_title),
          step2_text: resolveField(isAr, c.home?.synergy?.step2_text_ar, c.home?.synergy?.step2_text_en, arDict.home.synergy.step2_text, enDict.home.synergy.step2_text),
          step3_title: resolveField(isAr, c.home?.synergy?.step3_title_ar, c.home?.synergy?.step3_title_en, arDict.home.synergy.step3_title, enDict.home.synergy.step3_title),
          step3_text: resolveField(isAr, c.home?.synergy?.step3_text_ar, c.home?.synergy?.step3_text_en, arDict.home.synergy.step3_text, enDict.home.synergy.step3_text),
        },
        identity: {
          ...baseDict.home.identity,
          label: resolveField(isAr, c.home?.identity?.label_ar, c.home?.identity?.label_en, arDict.home.identity.label, enDict.home.identity.label),
          vision_title: resolveField(isAr, c.home?.identity?.vision_title_ar, c.home?.identity?.vision_title_en, arDict.home.identity.vision_title, enDict.home.identity.vision_title),
          vision_desc: resolveField(isAr, c.home?.identity?.vision_desc_ar, c.home?.identity?.vision_desc_en, arDict.home.identity.vision_desc, enDict.home.identity.vision_desc),
          mission_title: resolveField(isAr, c.home?.identity?.mission_title_ar, c.home?.identity?.mission_title_en, arDict.home.identity.mission_title, enDict.home.identity.mission_title),
          mission_desc: resolveField(isAr, c.home?.identity?.mission_desc_ar, c.home?.identity?.mission_desc_en, arDict.home.identity.mission_desc, enDict.home.identity.mission_desc),
          values_title: resolveField(isAr, c.home?.identity?.values_title_ar, c.home?.identity?.values_title_en, arDict.home.identity.values_title, enDict.home.identity.values_title),
          values: [
            {
              title: resolveField(isAr, c.home?.identity?.val1_title_ar, c.home?.identity?.val1_title_en, arDict.home.identity.values[0]?.title, enDict.home.identity.values[0]?.title),
              desc: resolveField(isAr, c.home?.identity?.val1_desc_ar, c.home?.identity?.val1_desc_en, arDict.home.identity.values[0]?.desc, enDict.home.identity.values[0]?.desc),
            },
            {
              title: resolveField(isAr, c.home?.identity?.val2_title_ar, c.home?.identity?.val2_title_en, arDict.home.identity.values[1]?.title, enDict.home.identity.values[1]?.title),
              desc: resolveField(isAr, c.home?.identity?.val2_desc_ar, c.home?.identity?.val2_desc_en, arDict.home.identity.values[1]?.desc, enDict.home.identity.values[1]?.desc),
            },
            {
              title: resolveField(isAr, c.home?.identity?.val3_title_ar, c.home?.identity?.val3_title_en, arDict.home.identity.values[2]?.title, enDict.home.identity.values[2]?.title),
              desc: resolveField(isAr, c.home?.identity?.val3_desc_ar, c.home?.identity?.val3_desc_en, arDict.home.identity.values[2]?.desc, enDict.home.identity.values[2]?.desc),
            },
            {
              title: resolveField(isAr, c.home?.identity?.val4_title_ar, c.home?.identity?.val4_title_en, arDict.home.identity.values[3]?.title, enDict.home.identity.values[3]?.title),
              desc: resolveField(isAr, c.home?.identity?.val4_desc_ar, c.home?.identity?.val4_desc_en, arDict.home.identity.values[3]?.desc, enDict.home.identity.values[3]?.desc),
            },
          ],
        },
        ceo: {
          ...baseDict.home.ceo,
          label: resolveField(isAr, c.home?.ceo?.label_ar, c.home?.ceo?.label_en, arDict.home.ceo.label, enDict.home.ceo.label),
          quote: resolveField(isAr, c.home?.ceo?.quote_ar, c.home?.ceo?.quote_en, arDict.home.ceo.quote, enDict.home.ceo.quote),
          name: resolveField(isAr, c.home?.ceo?.name_ar, c.home?.ceo?.name_en, arDict.home.ceo.name, enDict.home.ceo.name),
          title: resolveField(isAr, c.home?.ceo?.title_ar, c.home?.ceo?.title_en, arDict.home.ceo.title, enDict.home.ceo.title),
          photo_url: resolveField(isAr, c.home?.ceo?.photo_url_ar || c.home?.ceo?.photo_url, c.home?.ceo?.photo_url_en || c.home?.ceo?.photo_url, (arDict.home.ceo as any).photo_url, (enDict.home.ceo as any).photo_url)
            || c.home?.media?.ceo_photo
            || (baseDict.home.ceo as any).photo_url,
        },
        partnership: {
          ...baseDict.home.partnership,
          label: resolveField(isAr, c.home?.partnership?.label_ar, c.home?.partnership?.label_en, arDict.home.partnership.label, enDict.home.partnership.label),
          heading: resolveField(isAr, c.home?.partnership?.heading_ar, c.home?.partnership?.heading_en, arDict.home.partnership.heading, enDict.home.partnership.heading),
          body: resolveField(isAr, c.home?.partnership?.body_ar, c.home?.partnership?.body_en, arDict.home.partnership.body, enDict.home.partnership.body),
          primaryCta: resolveField(isAr, c.home?.partnership?.primary_cta_ar, c.home?.partnership?.primary_cta_en, arDict.home.partnership.primaryCta, enDict.home.partnership.primaryCta),
          secondaryCta: resolveField(isAr, c.home?.partnership?.secondary_cta_ar, c.home?.partnership?.secondary_cta_en, arDict.home.partnership.secondaryCta, enDict.home.partnership.secondaryCta),
        },
      },
      about: {
        ...baseDict.about,
        hero: {
          ...baseDict.about.hero,
          eyebrow: resolveField(isAr, c.about?.hero_eyebrow_ar, c.about?.hero_eyebrow_en, arDict.about.hero.eyebrow, enDict.about.hero.eyebrow),
          title: resolveField(isAr, c.about?.hero_title_ar, c.about?.hero_title_en, arDict.about.hero.title, enDict.about.hero.title),
          body: resolveField(isAr, c.about?.hero_body_ar, c.about?.hero_body_en, arDict.about.hero.body, enDict.about.hero.body),
        },
        hero_image: c.about?.hero_image || (baseDict.about as any).hero_image,
        story_image: c.about?.story_image || (baseDict.about as any).story_image,
        corporate_profile_pdf: isAr
          ? (c.about?.corporate_profile_pdf_ar || c.about?.corporate_profile_pdf || c.branding?.corporate_profile_pdf || (baseDict.about as any).corporate_profile_pdf || '')
          : (c.about?.corporate_profile_pdf_en || c.about?.corporate_profile_pdf || c.branding?.corporate_profile_pdf || (baseDict.about as any).corporate_profile_pdf || ''),
        story: {
          ...baseDict.about.story,
          heading: resolveField(isAr, c.about?.story_heading_ar, c.about?.story_heading_en, arDict.about.story.heading, enDict.about.story.heading),
          body: resolveField(isAr, c.about?.story_body_ar, c.about?.story_body_en, arDict.about.story.body, enDict.about.story.body),
        },
        governance: {
          ...baseDict.about.governance,
          statement: resolveField(isAr, c.about?.governance_statement_ar || c.home?.ceo?.quote_ar, c.about?.governance_statement_en || c.home?.ceo?.quote_en, arDict.about.governance.statement, enDict.about.governance.statement),
        },
        leadership: {
          ...baseDict.about.leadership,
          name: resolveField(isAr, c.home?.ceo?.name_ar, c.home?.ceo?.name_en, arDict.about.leadership.name, enDict.about.leadership.name),
          role: resolveField(isAr, c.home?.ceo?.title_ar, c.home?.ceo?.title_en, arDict.about.leadership.role, enDict.about.leadership.role),
        },
      },
      hospitality: {
        ...baseDict.hospitality,
        hero: {
          ...baseDict.hospitality.hero,
          eyebrow: resolveField(isAr, c.hospitality?.hero_eyebrow_ar, c.hospitality?.hero_eyebrow_en, arDict.hospitality.hero.eyebrow, enDict.hospitality.hero.eyebrow),
          title: resolveField(isAr, c.hospitality?.hero_title_ar, c.hospitality?.hero_title_en, arDict.hospitality.hero.title, enDict.hospitality.hero.title),
          body: resolveField(isAr, c.hospitality?.hero_body_ar, c.hospitality?.hero_body_en, arDict.hospitality.hero.body, enDict.hospitality.hero.body),
        },
        hero_image: c.hospitality?.hero_image || (baseDict.hospitality as any).hero_image,
        hero_video: c.hospitality?.hero_video || (baseDict.hospitality as any).hero_video,
        services: {
          ...baseDict.hospitality.services,
          heading: resolveField(isAr, c.hospitality?.services_heading_ar, c.hospitality?.services_heading_en, arDict.hospitality.services.heading, enDict.hospitality.services.heading),
          intro: resolveField(isAr, c.hospitality?.services_intro_ar, c.hospitality?.services_intro_en, arDict.hospitality.services.intro, enDict.hospitality.services.intro),
        },
        rfp: {
          ...baseDict.hospitality.rfp,
          heading: resolveField(isAr, c.hospitality?.rfp_heading_ar, c.hospitality?.rfp_heading_en, arDict.hospitality.rfp.heading, enDict.hospitality.rfp.heading),
          body: resolveField(isAr, c.hospitality?.rfp_body_ar, c.hospitality?.rfp_body_en, arDict.hospitality.rfp.body, enDict.hospitality.rfp.body),
        },
        portfolio: {
          ...baseDict.hospitality.portfolio,
          properties: Array.isArray(c.hospitality?.properties) && c.hospitality.properties.length > 0
            ? c.hospitality.properties.map((p: any, idx: number) => ({
                name: resolveField(isAr, p.name_ar, p.name_en, arDict.hospitality.portfolio.properties[idx]?.name, enDict.hospitality.portfolio.properties[idx]?.name) || (isAr ? arDict.hospitality.portfolio.properties[idx]?.name : enDict.hospitality.portfolio.properties[idx]?.name),
                city: resolveField(isAr, p.city_ar, p.city_en, arDict.hospitality.portfolio.properties[idx]?.city, enDict.hospitality.portfolio.properties[idx]?.city) || (isAr ? arDict.hospitality.portfolio.properties[idx]?.city : enDict.hospitality.portfolio.properties[idx]?.city),
                desc: resolveField(isAr, p.desc_ar, p.desc_en, arDict.hospitality.portfolio.properties[idx]?.desc, enDict.hospitality.portfolio.properties[idx]?.desc) || (isAr ? arDict.hospitality.portfolio.properties[idx]?.desc : enDict.hospitality.portfolio.properties[idx]?.desc),
                image_url: p.image_url || (baseDict.hospitality.portfolio.properties[idx] as any)?.image_url,
              }))
            : baseDict.hospitality.portfolio.properties,
        },
      },
      manufacturing: {
        ...baseDict.manufacturing,
        hero: {
          ...baseDict.manufacturing.hero,
          eyebrow: resolveField(isAr, c.manufacturing?.hero_eyebrow_ar, c.manufacturing?.hero_eyebrow_en, arDict.manufacturing.hero.eyebrow, enDict.manufacturing.hero.eyebrow),
          title: resolveField(isAr, c.manufacturing?.hero_title_ar, c.manufacturing?.hero_title_en, arDict.manufacturing.hero.title, enDict.manufacturing.hero.title),
          body: resolveField(isAr, c.manufacturing?.hero_body_ar, c.manufacturing?.hero_body_en, arDict.manufacturing.hero.body, enDict.manufacturing.hero.body),
        },
        hero_image: c.manufacturing?.hero_image || (baseDict.manufacturing as any).hero_image,
        hero_video: c.manufacturing?.hero_video || (baseDict.manufacturing as any).hero_video,
        capabilities: {
          ...baseDict.manufacturing.capabilities,
          heading: resolveField(isAr, c.manufacturing?.capabilities_heading_ar, c.manufacturing?.capabilities_heading_en, arDict.manufacturing.capabilities.heading, enDict.manufacturing.capabilities.heading),
        },
        rfp: {
          ...baseDict.manufacturing.rfp,
          heading: resolveField(isAr, c.manufacturing?.rfp_heading_ar, c.manufacturing?.rfp_heading_en, arDict.manufacturing.rfp.heading, enDict.manufacturing.rfp.heading),
          body: resolveField(isAr, c.manufacturing?.rfp_body_ar, c.manufacturing?.rfp_body_en, arDict.manufacturing.rfp.body, enDict.manufacturing.rfp.body),
        },
        factories: {
          ...baseDict.manufacturing.factories,
          list: Array.isArray(c.manufacturing?.factories) && c.manufacturing.factories.length > 0
            ? c.manufacturing.factories.map((f: any, idx: number) => ({
                title: resolveField(isAr, f.title_ar, f.title_en, arDict.manufacturing.factories.list[idx]?.title, enDict.manufacturing.factories.list[idx]?.title),
                desc: resolveField(isAr, f.desc_ar, f.desc_en, arDict.manufacturing.factories.list[idx]?.desc, enDict.manufacturing.factories.list[idx]?.desc),
                image_url: f.image_url || (baseDict.manufacturing.factories.list[idx] as any)?.image_url,
              }))
            : baseDict.manufacturing.factories.list,
        },
      },
      contracting: {
        ...baseDict.contracting,
        hero: {
          ...baseDict.contracting.hero,
          eyebrow: resolveField(isAr, c.contracting?.hero_eyebrow_ar, c.contracting?.hero_eyebrow_en, arDict.contracting.hero.eyebrow, enDict.contracting.hero.eyebrow),
          title: resolveField(isAr, c.contracting?.hero_title_ar, c.contracting?.hero_title_en, arDict.contracting.hero.title, enDict.contracting.hero.title),
          body: resolveField(isAr, c.contracting?.hero_body_ar, c.contracting?.hero_body_en, arDict.contracting.hero.body, enDict.contracting.hero.body),
        },
        hero_image: c.contracting?.hero_image || (baseDict.contracting as any).hero_image,
        hero_video: c.contracting?.hero_video || (baseDict.contracting as any).hero_video,
        lifecycle: {
          ...baseDict.contracting.lifecycle,
          heading: resolveField(isAr, c.contracting?.lifecycle_heading_ar, c.contracting?.lifecycle_heading_en, arDict.contracting.lifecycle.heading, enDict.contracting.lifecycle.heading),
        },
        rfp: {
          ...baseDict.contracting.rfp,
          heading: resolveField(isAr, c.contracting?.rfp_heading_ar, c.contracting?.rfp_heading_en, arDict.contracting.rfp.heading, enDict.contracting.rfp.heading),
          body: resolveField(isAr, c.contracting?.rfp_body_ar, c.contracting?.rfp_body_en, arDict.contracting.rfp.body, enDict.contracting.rfp.body),
        },
        services: {
          ...baseDict.contracting.services,
          list: Array.isArray(c.contracting?.services) && c.contracting.services.length > 0
            ? c.contracting.services.map((s: any, idx: number) => ({
                title: resolveField(isAr, s.title_ar, s.title_en, arDict.contracting.services.list[idx]?.title, enDict.contracting.services.list[idx]?.title),
                desc: resolveField(isAr, s.desc_ar, s.desc_en, arDict.contracting.services.list[idx]?.desc, enDict.contracting.services.list[idx]?.desc),
                image_url: s.image_url || (baseDict.contracting.services.list[idx] as any)?.image_url,
              }))
            : baseDict.contracting.services.list,
        },
      },
      branding: {
        ...(baseDict as any).branding,
        ...(c.branding || {}),
      },
      careers: {
        ...baseDict.careers,
        hero: {
          ...baseDict.careers.hero,
          eyebrow: resolveField(isAr, c.careers?.hero_eyebrow_ar, c.careers?.hero_eyebrow_en, arDict.careers.hero.eyebrow, enDict.careers.hero.eyebrow),
          title: resolveField(isAr, c.careers?.hero_title_ar, c.careers?.hero_title_en, arDict.careers.hero.title, enDict.careers.hero.title),
          body: resolveField(isAr, c.careers?.hero_body_ar, c.careers?.hero_body_en, arDict.careers.hero.body, enDict.careers.hero.body),
          proof: resolveField(isAr, c.careers?.hero_proof_ar, c.careers?.hero_proof_en, arDict.careers.hero.proof, enDict.careers.hero.proof),
        },
      },
      contact: {
        ...baseDict.contact,
        hero: {
          ...baseDict.contact.hero,
          eyebrow: resolveField(isAr, c.contact?.hero_eyebrow_ar, c.contact?.hero_eyebrow_en, arDict.contact.hero.eyebrow, enDict.contact.hero.eyebrow),
          title: resolveField(isAr, c.contact?.hero_title_ar, c.contact?.hero_title_en, arDict.contact.hero.title, enDict.contact.hero.title),
          body: resolveField(isAr, c.contact?.hero_body_ar, c.contact?.hero_body_en, arDict.contact.hero.body, enDict.contact.hero.body),
        },
        cards: {
          ...baseDict.contact.cards,
          hq_address: resolveField(isAr, c.settings?.headquarters_ar || c.contact?.hq_address_ar, c.settings?.headquarters_en || c.contact?.hq_address_en, arDict.contact.cards.hq_address, enDict.contact.cards.hq_address),
          general_email: c.settings?.general_email || c.contact?.general_email || baseDict.contact.cards.general_email,
          secondary_email: c.settings?.secondary_email || c.contact?.secondary_email || baseDict.contact.cards.secondary_email,
          primary_phone: c.settings?.primary_phone || c.contact?.primary_phone || baseDict.contact.cards.primary_phone,
          secondary_phone: c.settings?.secondary_phone || c.contact?.secondary_phone || baseDict.contact.cards.secondary_phone,
        },
        banking: {
          ...(baseDict.contact as any).banking,
          accounts: Array.isArray(c.settings?.bank_accounts) && c.settings.bank_accounts.length > 0
            ? c.settings.bank_accounts
                .filter((b: any) => b.is_active !== false)
                .map((b: any) => ({
                  bankName: (isAr ? b.bank_name_ar : b.bank_name_en) || b.bank_name_en,
                  accountName: (isAr ? b.account_name_ar : b.account_name_en) || b.account_name_en,
                  iban: b.iban,
                  accountNumber: b.account_number,
                  swiftCode: b.swift_code || '',
                  currency: b.currency || (isAr ? 'ريال سعودي (SAR)' : 'SAR'),
                }))
            : (baseDict.contact as any).banking?.accounts || [],
        },
      },
    };
  }

  // Helper to access nested translation keys like 'nav.about'
  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = dict;
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return path;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, t, setLanguage, toggleLanguage, dict, dynamicContent, setDynamicContent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
