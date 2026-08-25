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
          title: (isAr ? c.home?.hero?.title_ar : c.home?.hero?.title_en) || baseDict.home.hero.title,
          body: (isAr ? c.home?.hero?.body_ar : c.home?.hero?.body_en) || baseDict.home.hero.body,
          primaryCta: (isAr ? c.home?.hero?.primary_cta_ar : c.home?.hero?.primary_cta_en) || baseDict.home.hero.primaryCta,
          secondaryCta: (isAr ? c.home?.hero?.secondary_cta_ar : c.home?.hero?.secondary_cta_en) || baseDict.home.hero.secondaryCta,
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
          heading: (isAr ? c.home?.synergy?.heading_ar : c.home?.synergy?.heading_en) || baseDict.home.synergy.heading,
          intro: (isAr ? c.home?.synergy?.intro_ar : c.home?.synergy?.intro_en) || baseDict.home.synergy.intro,
        },
        ceo: {
          ...baseDict.home.ceo,
          quote: (isAr ? c.home?.ceo?.quote_ar : c.home?.ceo?.quote_en) || baseDict.home.ceo.quote,
          name: (isAr ? c.home?.ceo?.name_ar : c.home?.ceo?.name_en) || baseDict.home.ceo.name,
          title: (isAr ? c.home?.ceo?.title_ar : c.home?.ceo?.title_en) || baseDict.home.ceo.title,
        },
      },
      about: {
        ...baseDict.about,
        story: {
          ...baseDict.about.story,
          heading: (isAr ? c.about?.story_heading_ar : c.about?.story_heading_en) || baseDict.about.story.heading,
          body: (isAr ? c.about?.story_body_ar : c.about?.story_body_en) || baseDict.about.story.body,
        },
      },
      hospitality: {
        ...baseDict.hospitality,
        hero: {
          ...baseDict.hospitality.hero,
          title: (isAr ? c.hospitality?.hero_title_ar : c.hospitality?.hero_title_en) || baseDict.hospitality.hero.title,
          body: (isAr ? c.hospitality?.hero_body_ar : c.hospitality?.hero_body_en) || baseDict.hospitality.hero.body,
        },
        portfolio: {
          ...baseDict.hospitality.portfolio,
          properties: Array.isArray(c.hospitality?.properties) && c.hospitality.properties.length > 0
            ? c.hospitality.properties.map((p: any) => ({
                name: (isAr ? p.name_ar : p.name_en) || p.name_en,
                city: (isAr ? p.city_ar : p.city_en) || p.city_en,
                desc: (isAr ? p.desc_ar : p.desc_en) || p.desc_en,
              }))
            : baseDict.hospitality.portfolio.properties,
        },
      },
      manufacturing: {
        ...baseDict.manufacturing,
        hero: {
          ...baseDict.manufacturing.hero,
          title: (isAr ? c.manufacturing?.hero_title_ar : c.manufacturing?.hero_title_en) || baseDict.manufacturing.hero.title,
          body: (isAr ? c.manufacturing?.hero_body_ar : c.manufacturing?.hero_body_en) || baseDict.manufacturing.hero.body,
        },
        factories: {
          ...baseDict.manufacturing.factories,
          list: Array.isArray(c.manufacturing?.factories) && c.manufacturing.factories.length > 0
            ? c.manufacturing.factories.map((f: any) => ({
                title: (isAr ? f.title_ar : f.title_en) || f.title_en,
                desc: (isAr ? f.desc_ar : f.desc_en) || f.desc_en,
              }))
            : baseDict.manufacturing.factories.list,
        },
      },
      contracting: {
        ...baseDict.contracting,
        hero: {
          ...baseDict.contracting.hero,
          title: (isAr ? c.contracting?.hero_title_ar : c.contracting?.hero_title_en) || baseDict.contracting.hero.title,
          body: (isAr ? c.contracting?.hero_body_ar : c.contracting?.hero_body_en) || baseDict.contracting.hero.body,
        },
        services: {
          ...baseDict.contracting.services,
          list: Array.isArray(c.contracting?.services) && c.contracting.services.length > 0
            ? c.contracting.services.map((s: any) => ({
                title: (isAr ? s.title_ar : s.title_en) || s.title_en,
                desc: (isAr ? s.desc_ar : s.desc_en) || s.desc_en,
              }))
            : baseDict.contracting.services.list,
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
    <LanguageContext.Provider value={{ lang, dir, t, setLanguage, toggleLanguage, dict, dynamicContent }}>
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
