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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [dynamicContent, setDynamicContent] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wd_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLang(saved);
    }

    // Fetch dynamic published CMS content
    async function loadDynamicContent() {
      try {
        const res = await fetch('/api/content');
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

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

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

  // Base dictionary from translations.ts
  const baseDict = translations[lang];

  // Deep-merge dynamic content if present
  let dict = { ...baseDict };
  if (dynamicContent) {
    const isAr = lang === 'ar';
    const c = dynamicContent;

    dict = {
      ...baseDict,
      home: {
        ...baseDict.home,
        hero: {
          ...baseDict.home.hero,
          eyebrow: (isAr ? c.home?.hero?.eyebrow_ar : c.home?.hero?.eyebrow_en) || baseDict.home.hero.eyebrow,
          kicker: (isAr ? c.home?.hero?.kicker_ar : c.home?.hero?.kicker_en) || baseDict.home.hero.kicker,
          title: (isAr ? c.home?.hero?.title_ar : c.home?.hero?.title_en) || baseDict.home.hero.title,
          title_line1: (isAr ? c.home?.hero?.title_line1_ar : c.home?.hero?.title_line1_en) || baseDict.home.hero.title_line1,
          title_line2: (isAr ? c.home?.hero?.title_line2_ar : c.home?.hero?.title_line2_en) || baseDict.home.hero.title_line2,
          title_line3: (isAr ? c.home?.hero?.title_line3_ar : c.home?.hero?.title_line3_en) || baseDict.home.hero.title_line3,
          body: (isAr ? c.home?.hero?.body_ar : c.home?.hero?.body_en) || baseDict.home.hero.body,
          primaryCta: (isAr ? c.home?.hero?.primary_cta_ar : c.home?.hero?.primary_cta_en) || baseDict.home.hero.primaryCta,
          secondaryCta: (isAr ? c.home?.hero?.secondary_cta_ar : c.home?.hero?.secondary_cta_en) || baseDict.home.hero.secondaryCta,
          dock: {
            hospitality_label: (isAr ? c.home?.hero?.dock_hospitality_label_ar : c.home?.hero?.dock_hospitality_label_en) || baseDict.home.hero.dock.hospitality_label,
            hospitality_badge: (isAr ? c.home?.hero?.dock_hospitality_badge_ar : c.home?.hero?.dock_hospitality_badge_en) || baseDict.home.hero.dock.hospitality_badge,
            manufacturing_label: (isAr ? c.home?.hero?.dock_manufacturing_label_ar : c.home?.hero?.dock_manufacturing_label_en) || baseDict.home.hero.dock.manufacturing_label,
            manufacturing_badge: (isAr ? c.home?.hero?.dock_manufacturing_badge_ar : c.home?.hero?.dock_manufacturing_badge_en) || baseDict.home.hero.dock.manufacturing_badge,
            contracting_label: (isAr ? c.home?.hero?.dock_contracting_label_ar : c.home?.hero?.dock_contracting_label_en) || baseDict.home.hero.dock.contracting_label,
            contracting_badge: (isAr ? c.home?.hero?.dock_contracting_badge_ar : c.home?.hero?.dock_contracting_badge_en) || baseDict.home.hero.dock.contracting_badge,
          },
          scroll_cue: (isAr ? c.home?.hero?.scroll_cue_ar : c.home?.hero?.scroll_cue_en) || baseDict.home.hero.scroll_cue,
        },
        media: {
          ...(baseDict.home as any).media,
          ...(c.home?.media || {}),
        },
        metrics: {
          ...baseDict.home.metrics,
          stat1_num: c.home?.metrics?.stat1_num || baseDict.home.metrics.stat1_num,
          stat1_text: (isAr ? c.home?.metrics?.stat1_text_ar : c.home?.metrics?.stat1_text_en) || baseDict.home.metrics.stat1_text,
          stat2_num: c.home?.metrics?.stat2_num || baseDict.home.metrics.stat2_num,
          stat2_text: (isAr ? c.home?.metrics?.stat2_text_ar : c.home?.metrics?.stat2_text_en) || baseDict.home.metrics.stat2_text,
          stat3_num: c.home?.metrics?.stat3_num || baseDict.home.metrics.stat3_num,
          stat3_text: (isAr ? c.home?.metrics?.stat3_text_ar : c.home?.metrics?.stat3_text_en) || baseDict.home.metrics.stat3_text,
          stat4_num: c.home?.metrics?.stat4_num || baseDict.home.metrics.stat4_num,
          stat4_text: (isAr ? c.home?.metrics?.stat4_text_ar : c.home?.metrics?.stat4_text_en) || baseDict.home.metrics.stat4_text,
        },
        synergy: {
          ...baseDict.home.synergy,
          label: (isAr ? c.home?.synergy?.label_ar : c.home?.synergy?.label_en) || baseDict.home.synergy.label,
          heading: (isAr ? c.home?.synergy?.heading_ar : c.home?.synergy?.heading_en) || baseDict.home.synergy.heading,
          intro: (isAr ? c.home?.synergy?.intro_ar : c.home?.synergy?.intro_en) || baseDict.home.synergy.intro,
          step1_title: (isAr ? c.home?.synergy?.step1_title_ar : c.home?.synergy?.step1_title_en) || baseDict.home.synergy.step1_title,
          step1_text: (isAr ? c.home?.synergy?.step1_text_ar : c.home?.synergy?.step1_text_en) || baseDict.home.synergy.step1_text,
          step2_title: (isAr ? c.home?.synergy?.step2_title_ar : c.home?.synergy?.step2_title_en) || baseDict.home.synergy.step2_title,
          step2_text: (isAr ? c.home?.synergy?.step2_text_ar : c.home?.synergy?.step2_text_en) || baseDict.home.synergy.step2_text,
          step3_title: (isAr ? c.home?.synergy?.step3_title_ar : c.home?.synergy?.step3_title_en) || baseDict.home.synergy.step3_title,
          step3_text: (isAr ? c.home?.synergy?.step3_text_ar : c.home?.synergy?.step3_text_en) || baseDict.home.synergy.step3_text,
        },
        identity: {
          ...baseDict.home.identity,
          label: (isAr ? c.home?.identity?.label_ar : c.home?.identity?.label_en) || baseDict.home.identity.label,
          vision_title: (isAr ? c.home?.identity?.vision_title_ar : c.home?.identity?.vision_title_en) || baseDict.home.identity.vision_title,
          vision_desc: (isAr ? c.home?.identity?.vision_desc_ar : c.home?.identity?.vision_desc_en) || baseDict.home.identity.vision_desc,
          mission_title: (isAr ? c.home?.identity?.mission_title_ar : c.home?.identity?.mission_title_en) || baseDict.home.identity.mission_title,
          mission_desc: (isAr ? c.home?.identity?.mission_desc_ar : c.home?.identity?.mission_desc_en) || baseDict.home.identity.mission_desc,
          values_title: (isAr ? c.home?.identity?.values_title_ar : c.home?.identity?.values_title_en) || baseDict.home.identity.values_title,
          values: [
            {
              title: (isAr ? c.home?.identity?.val1_title_ar : c.home?.identity?.val1_title_en) || baseDict.home.identity.values[0]?.title,
              desc: (isAr ? c.home?.identity?.val1_desc_ar : c.home?.identity?.val1_desc_en) || baseDict.home.identity.values[0]?.desc,
            },
            {
              title: (isAr ? c.home?.identity?.val2_title_ar : c.home?.identity?.val2_title_en) || baseDict.home.identity.values[1]?.title,
              desc: (isAr ? c.home?.identity?.val2_desc_ar : c.home?.identity?.val2_desc_en) || baseDict.home.identity.values[1]?.desc,
            },
            {
              title: (isAr ? c.home?.identity?.val3_title_ar : c.home?.identity?.val3_title_en) || baseDict.home.identity.values[2]?.title,
              desc: (isAr ? c.home?.identity?.val3_desc_ar : c.home?.identity?.val3_desc_en) || baseDict.home.identity.values[2]?.desc,
            },
            {
              title: (isAr ? c.home?.identity?.val4_title_ar : c.home?.identity?.val4_title_en) || baseDict.home.identity.values[3]?.title,
              desc: (isAr ? c.home?.identity?.val4_desc_ar : c.home?.identity?.val4_desc_en) || baseDict.home.identity.values[3]?.desc,
            },
          ],
        },
        ceo: {
          ...baseDict.home.ceo,
          label: (isAr ? c.home?.ceo?.label_ar : c.home?.ceo?.label_en) || baseDict.home.ceo.label,
          quote: (isAr ? c.home?.ceo?.quote_ar : c.home?.ceo?.quote_en) || baseDict.home.ceo.quote,
          name: (isAr ? c.home?.ceo?.name_ar : c.home?.ceo?.name_en) || baseDict.home.ceo.name,
          title: (isAr ? c.home?.ceo?.title_ar : c.home?.ceo?.title_en) || baseDict.home.ceo.title,
        },
        partnership: {
          ...baseDict.home.partnership,
          label: (isAr ? c.home?.partnership?.label_ar : c.home?.partnership?.label_en) || baseDict.home.partnership.label,
          heading: (isAr ? c.home?.partnership?.heading_ar : c.home?.partnership?.heading_en) || baseDict.home.partnership.heading,
          body: (isAr ? c.home?.partnership?.body_ar : c.home?.partnership?.body_en) || baseDict.home.partnership.body,
          primaryCta: (isAr ? c.home?.partnership?.primary_cta_ar : c.home?.partnership?.primary_cta_en) || baseDict.home.partnership.primaryCta,
          secondaryCta: (isAr ? c.home?.partnership?.secondary_cta_ar : c.home?.partnership?.secondary_cta_en) || baseDict.home.partnership.secondaryCta,
        },
      },
      about: {
        ...baseDict.about,
        hero: {
          ...baseDict.about.hero,
          eyebrow: (isAr ? c.about?.hero_eyebrow_ar : c.about?.hero_eyebrow_en) || baseDict.about.hero.eyebrow,
          title: (isAr ? c.about?.hero_title_ar : c.about?.hero_title_en) || baseDict.about.hero.title,
          body: (isAr ? c.about?.hero_body_ar : c.about?.hero_body_en) || baseDict.about.hero.body,
        },
        hero_image: c.about?.hero_image || (baseDict.about as any).hero_image,
        story: {
          ...baseDict.about.story,
          heading: (isAr ? c.about?.story_heading_ar : c.about?.story_heading_en) || baseDict.about.story.heading,
          body: (isAr ? c.about?.story_body_ar : c.about?.story_body_en) || baseDict.about.story.body,
        },
        governance: {
          ...baseDict.about.governance,
          statement: (isAr ? c.about?.governance_statement_ar : c.about?.governance_statement_en) || baseDict.about.governance.statement,
        },
      },
      hospitality: {
        ...baseDict.hospitality,
        hero: {
          ...baseDict.hospitality.hero,
          eyebrow: (isAr ? c.hospitality?.hero_eyebrow_ar : c.hospitality?.hero_eyebrow_en) || baseDict.hospitality.hero.eyebrow,
          title: (isAr ? c.hospitality?.hero_title_ar : c.hospitality?.hero_title_en) || baseDict.hospitality.hero.title,
          body: (isAr ? c.hospitality?.hero_body_ar : c.hospitality?.hero_body_en) || baseDict.hospitality.hero.body,
        },
        hero_image: c.hospitality?.hero_image || (baseDict.hospitality as any).hero_image,
        hero_video: c.hospitality?.hero_video || (baseDict.hospitality as any).hero_video,
        portfolio: {
          ...baseDict.hospitality.portfolio,
          properties: Array.isArray(c.hospitality?.properties) && c.hospitality.properties.length > 0
            ? c.hospitality.properties.map((p: any, idx: number) => ({
                name: (isAr ? p.name_ar : p.name_en) || p.name_en,
                city: (isAr ? p.city_ar : p.city_en) || p.city_en,
                desc: (isAr ? p.desc_ar : p.desc_en) || p.desc_en,
                image_url: p.image_url || (baseDict.hospitality.portfolio.properties[idx] as any)?.image_url,
              }))
            : baseDict.hospitality.portfolio.properties,
        },
      },
      manufacturing: {
        ...baseDict.manufacturing,
        hero: {
          ...baseDict.manufacturing.hero,
          eyebrow: (isAr ? c.manufacturing?.hero_eyebrow_ar : c.manufacturing?.hero_eyebrow_en) || baseDict.manufacturing.hero.eyebrow,
          title: (isAr ? c.manufacturing?.hero_title_ar : c.manufacturing?.hero_title_en) || baseDict.manufacturing.hero.title,
          body: (isAr ? c.manufacturing?.hero_body_ar : c.manufacturing?.hero_body_en) || baseDict.manufacturing.hero.body,
        },
        hero_image: c.manufacturing?.hero_image || (baseDict.manufacturing as any).hero_image,
        hero_video: c.manufacturing?.hero_video || (baseDict.manufacturing as any).hero_video,
        factories: {
          ...baseDict.manufacturing.factories,
          list: Array.isArray(c.manufacturing?.factories) && c.manufacturing.factories.length > 0
            ? c.manufacturing.factories.map((f: any, idx: number) => ({
                title: (isAr ? f.title_ar : f.title_en) || f.title_en,
                desc: (isAr ? f.desc_ar : f.desc_en) || f.desc_en,
                image_url: f.image_url || (baseDict.manufacturing.factories.list[idx] as any)?.image_url,
              }))
            : baseDict.manufacturing.factories.list,
        },
      },
      contracting: {
        ...baseDict.contracting,
        hero: {
          ...baseDict.contracting.hero,
          eyebrow: (isAr ? c.contracting?.hero_eyebrow_ar : c.contracting?.hero_eyebrow_en) || baseDict.contracting.hero.eyebrow,
          title: (isAr ? c.contracting?.hero_title_ar : c.contracting?.hero_title_en) || baseDict.contracting.hero.title,
          body: (isAr ? c.contracting?.hero_body_ar : c.contracting?.hero_body_en) || baseDict.contracting.hero.body,
        },
        hero_image: c.contracting?.hero_image || (baseDict.contracting as any).hero_image,
        hero_video: c.contracting?.hero_video || (baseDict.contracting as any).hero_video,
        services: {
          ...baseDict.contracting.services,
          list: Array.isArray(c.contracting?.services) && c.contracting.services.length > 0
            ? c.contracting.services.map((s: any, idx: number) => ({
                title: (isAr ? s.title_ar : s.title_en) || s.title_en,
                desc: (isAr ? s.desc_ar : s.desc_en) || s.desc_en,
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
          eyebrow: (isAr ? c.careers?.hero_eyebrow_ar : c.careers?.hero_eyebrow_en) || baseDict.careers.hero.eyebrow,
          title: (isAr ? c.careers?.hero_title_ar : c.careers?.hero_title_en) || baseDict.careers.hero.title,
          body: (isAr ? c.careers?.hero_body_ar : c.careers?.hero_body_en) || baseDict.careers.hero.body,
          proof: (isAr ? c.careers?.hero_proof_ar : c.careers?.hero_proof_en) || baseDict.careers.hero.proof,
        },
      },
      contact: {
        ...baseDict.contact,
        hero: {
          ...baseDict.contact.hero,
          eyebrow: (isAr ? c.contact?.hero_eyebrow_ar : c.contact?.hero_eyebrow_en) || baseDict.contact.hero.eyebrow,
          title: (isAr ? c.contact?.hero_title_ar : c.contact?.hero_title_en) || baseDict.contact.hero.title,
          body: (isAr ? c.contact?.hero_body_ar : c.contact?.hero_body_en) || baseDict.contact.hero.body,
        },
        cards: {
          ...baseDict.contact.cards,
          hq_address: (isAr ? (c.settings?.headquarters_ar || c.contact?.hq_address_ar) : (c.settings?.headquarters_en || c.contact?.hq_address_en)) || baseDict.contact.cards.hq_address,
          general_email: c.settings?.general_email || c.contact?.general_email || baseDict.contact.cards.general_email,
          secondary_email: c.settings?.secondary_email || c.contact?.secondary_email || baseDict.contact.cards.secondary_email,
          primary_phone: c.settings?.primary_phone || c.contact?.primary_phone || baseDict.contact.cards.primary_phone,
          secondary_phone: c.settings?.secondary_phone || c.contact?.secondary_phone || baseDict.contact.cards.secondary_phone,
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
