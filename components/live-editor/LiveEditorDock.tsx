'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Globe,
  Loader2
} from 'lucide-react';
import './liveEditor.css';

const en = translations.en || {} as any;
const ar = translations.ar || {} as any;

function containsArabic(str: string): boolean {
  if (!str) return false;
  return /[\u0600-\u06FF]/.test(str);
}

function getArabicField(serverVal: any, fallbackVal: string): string {
  if (serverVal && typeof serverVal === 'string' && containsArabic(serverVal)) {
    return serverVal;
  }
  return fallbackVal;
}

// Build baseline default content matching SiteContentPayload with 100% safe fallback guards
function createDefaultState() {
  return {
    home: {
      hero: {
        eyebrow_en: en.home?.hero?.eyebrow || 'WD Group for Business',
        eyebrow_ar: ar.home?.hero?.eyebrow || 'مجموعة دبليو دي للأعمال',
        kicker_en: en.home?.hero?.kicker || 'Integrated Hospitality, Manufacturing & Contracting',
        kicker_ar: ar.home?.hero?.kicker || 'منظومة متكاملة في الضيافة والصناعة والمقاولات',
        title_line1_en: en.home?.hero?.title_line1 || 'Solid Vision.',
        title_line1_ar: ar.home?.hero?.title_line1 || 'رؤية راسخة.',
        title_line2_en: en.home?.hero?.title_line2 || 'Diverse Sectors.',
        title_line2_ar: ar.home?.hero?.title_line2 || 'قطاعات متنوعة.',
        title_line3_en: en.home?.hero?.title_line3 || 'Promising Future.',
        title_line3_ar: ar.home?.hero?.title_line3 || 'مستقبل واعد.',
        body_en: en.home?.hero?.body || 'A Saudi business group creating sustainable value through hospitality, manufacturing, and contracting.',
        body_ar: ar.home?.hero?.body || 'مجموعة أعمال سعودية تصنع قيمة مستدامة عبر قطاعات الضيافة والصناعة والمقاولات.',
        primary_cta_en: en.home?.hero?.primaryCta || 'Discover Our Group',
        primary_cta_ar: ar.home?.hero?.primaryCta || 'اكتشف مجموعتنا',
        secondary_cta_en: en.home?.hero?.secondaryCta || 'Explore Our Sectors',
        secondary_cta_ar: ar.home?.hero?.secondaryCta || 'استكشف قطاعاتنا',
        dock_hospitality_label_en: en.home?.hero?.dock?.hospitality_label || 'Hospitality (SwissBlue)',
        dock_hospitality_label_ar: ar.home?.hero?.dock?.hospitality_label || 'الضيافة (سويس بلو)',
        dock_hospitality_badge_en: en.home?.hero?.dock?.hospitality_badge || '6 Properties',
        dock_hospitality_badge_ar: ar.home?.hero?.dock?.hospitality_badge || '6 منشآت',
        dock_manufacturing_label_en: en.home?.hero?.dock?.manufacturing_label || 'Manufacturing (GreenWood)',
        dock_manufacturing_label_ar: ar.home?.hero?.dock?.manufacturing_label || 'التصنيع والأثاث (جرين وود)',
        dock_manufacturing_badge_en: en.home?.hero?.dock?.manufacturing_badge || '3 Factories',
        dock_manufacturing_badge_ar: ar.home?.hero?.dock?.manufacturing_badge || '3 مصانع',
        dock_contracting_label_en: en.home?.hero?.dock?.contracting_label || 'Contracting (Projects)',
        dock_contracting_label_ar: ar.home?.hero?.dock?.contracting_label || 'المقاولات والتميز الهندسي',
        dock_contracting_badge_en: en.home?.hero?.dock?.contracting_badge || 'Turnkey',
        dock_contracting_badge_ar: ar.home?.hero?.dock?.contracting_badge || 'تنفيذ شامل',
      },
      metrics: {
        stat1_num: en.home?.metrics?.stat1_num || '6',
        stat1_text_en: en.home?.metrics?.stat1_text || 'Hotels & Residences',
        stat1_text_ar: ar.home?.metrics?.stat1_text || 'فنادق وشقق مخدومة',
        stat2_num: en.home?.metrics?.stat2_num || '3',
        stat2_text_en: en.home?.metrics?.stat2_text || 'Industrial Factories',
        stat2_text_ar: ar.home?.metrics?.stat2_text || 'مصانع إنتاج متخصصة',
        stat3_num: en.home?.metrics?.stat3_num || '80+',
        stat3_text_en: en.home?.metrics?.stat3_text || 'Active Professionals',
        stat3_text_ar: ar.home?.metrics?.stat3_text || 'كادر مهني وإداري',
        stat4_num: en.home?.metrics?.stat4_num || '3',
        stat4_text_en: en.home?.metrics?.stat4_text || 'Core Sectors',
        stat4_text_ar: ar.home?.metrics?.stat4_text || 'قطاعات استراتيجية متكاملة',
      },
      sectors: {
        label_en: en.home?.sectors?.label || 'Strategic Sectors',
        label_ar: ar.home?.sectors?.label || 'قطاعاتنا الاستراتيجية',
        heading_en: en.home?.sectors?.heading || 'Integrated Pillars Driving Growth',
        heading_ar: ar.home?.sectors?.heading || 'ركائز متكاملة تقود النمو',
        intro_en: en.home?.sectors?.intro || 'Operating across hospitality, manufacturing, and general contracting.',
        intro_ar: ar.home?.sectors?.intro || 'نعمل عبر قطاعات الضيافة، التصنيع، والمقاولات العامة.',
        hospitality_eyebrow_en: en.home?.sectors?.hospitality?.eyebrow || 'SwissBlue Hotels',
        hospitality_eyebrow_ar: ar.home?.sectors?.hospitality?.eyebrow || 'فنادق سويس بلو',
        hospitality_title_en: en.home?.sectors?.hospitality?.title || 'Hospitality & Extended Stays',
        hospitality_title_ar: ar.home?.sectors?.hospitality?.title || 'الضيافة والإقامة الفندقية',
        hospitality_desc_en: en.home?.sectors?.hospitality?.desc || 'Six active properties across Saudi Arabia.',
        hospitality_desc_ar: ar.home?.sectors?.hospitality?.desc || 'ست منشآت فندقية وسكنية في المملكة.',
        hospitality_proof_en: en.home?.sectors?.hospitality?.proof || '6 Properties',
        hospitality_proof_ar: ar.home?.sectors?.hospitality?.proof || '6 منشآت',
        hospitality_cta_en: en.home?.sectors?.hospitality?.cta || 'Explore Hospitality',
        hospitality_cta_ar: ar.home?.sectors?.hospitality?.cta || 'استكشف قطاع الضيافة',

        manufacturing_eyebrow_en: en.home?.sectors?.manufacturing?.eyebrow || 'GreenWood & Al-Watan',
        manufacturing_eyebrow_ar: ar.home?.sectors?.manufacturing?.eyebrow || 'جرين وود ومصنع الوطن',
        manufacturing_title_en: en.home?.sectors?.manufacturing?.title || 'Manufacturing & Furniture',
        manufacturing_title_ar: ar.home?.sectors?.manufacturing?.title || 'التصنيع والأثاث',
        manufacturing_desc_en: en.home?.sectors?.manufacturing?.desc || 'Three specialized factories producing wooden and metal furniture.',
        manufacturing_desc_ar: ar.home?.sectors?.manufacturing?.desc || 'ثلاثة مصانع متخصصة في تصنيع الأثاث الخشبي والمعدني.',
        manufacturing_proof_en: en.home?.sectors?.manufacturing?.proof || '3 Factories',
        manufacturing_proof_ar: ar.home?.sectors?.manufacturing?.proof || '3 مصانع',
        manufacturing_cta_en: en.home?.sectors?.manufacturing?.cta || 'Explore Manufacturing',
        manufacturing_cta_ar: ar.home?.sectors?.manufacturing?.cta || 'استكشف قطاع التصنيع',

        contracting_eyebrow_en: en.home?.sectors?.contracting?.eyebrow || 'Watan Design Contracting',
        contracting_eyebrow_ar: ar.home?.sectors?.contracting?.eyebrow || 'تصاميم الوطن للمقاولات',
        contracting_title_en: en.home?.sectors?.contracting?.title || 'Contracting & Fit-Out',
        contracting_title_ar: ar.home?.sectors?.contracting?.title || 'المقاولات والتنفيذ المتكامل',
        contracting_desc_en: en.home?.sectors?.contracting?.desc || 'General contracting, architectural fit-out, and turnkey execution.',
        contracting_desc_ar: ar.home?.sectors?.contracting?.desc || 'المقاولات العامة والتشطيبات المعمارية والتنفيذ المتكامل.',
        contracting_proof_en: en.home?.sectors?.contracting?.proof || 'Turnkey Execution',
        contracting_proof_ar: ar.home?.sectors?.contracting?.proof || 'تنفيذ شامل',
        contracting_cta_en: en.home?.sectors?.contracting?.cta || 'Explore Contracting',
        contracting_cta_ar: ar.home?.sectors?.contracting?.cta || 'استكشف قطاع المقاولات',
      },
      synergy: {
        label_en: en.home?.synergy?.label || 'Synergy Model',
        label_ar: ar.home?.synergy?.label || 'نموذج التكامل',
        heading_en: en.home?.synergy?.heading || 'Integrated Lifecycle Advantage',
        heading_ar: ar.home?.synergy?.heading || 'تكامل دورة الحياة الكاملة',
        intro_en: en.home?.synergy?.intro || 'By uniting manufacturing, contracting, and hospitality under one holding, WD Group delivers end-to-end efficiency.',
        intro_ar: ar.home?.synergy?.intro || 'عبر جمع التصنيع والمقاولات والضيافة تحت مظلة قابضة واحدة، تحقق مجموعة دبليو دي كفاءة شاملة.',
        step1_title_en: en.home?.synergy?.step1_title || 'Manufacturing Power',
        step1_title_ar: ar.home?.synergy?.step1_title || 'قوة التصنيع المحلي',
        step1_text_en: en.home?.synergy?.step1_text || 'Direct factory supply for wooden and metal fit-out.',
        step1_text_ar: ar.home?.synergy?.step1_text || 'توريد مباشر من المصانع للتأثيث الخشبي والمعدني.',
        step2_title_en: en.home?.synergy?.step2_title || 'Contracting Execution',
        step2_title_ar: ar.home?.synergy?.step2_title || 'التنفيذ الهندسي والمقاولات',
        step2_text_en: en.home?.synergy?.step2_text || 'Precision fit-out delivered with strict quality controls.',
        step2_text_ar: ar.home?.synergy?.step2_text || 'تنفيذ تشطيبات معمارية بدقة متناهية ومعايير جودة صارمة.',
        step3_title_en: en.home?.synergy?.step3_title || 'Hospitality Operations',
        step3_title_ar: ar.home?.synergy?.step3_title || 'التشغيل الفندقي المستدام',
        step3_text_en: en.home?.synergy?.step3_text || 'Managing properties with ongoing quality and maintenance oversight.',
        step3_text_ar: ar.home?.synergy?.step3_text || 'تشغيل وإدارة المنشآت مع إشراف دائم على الجودة والصيانة.',
      },
      identity: {
        vision_desc_en: en.home?.identity?.vision_desc || 'To be a leading integrated Saudi business group setting benchmarks in hospitality, industrial manufacturing, and general contracting.',
        vision_desc_ar: ar.home?.identity?.vision_desc || 'أن نكون مجموعة أعمال سعودية رائدة ومتكاملة تضع معايير جديدة في الضيافة والتصنيع والمقاولات.',
        mission_desc_en: en.home?.identity?.mission_desc || 'Delivering high-value products and services through operational synergy, dependable execution, and dedicated Saudi talent.',
        mission_desc_ar: ar.home?.identity?.mission_desc || 'تقديم منتجات وخدمات عالية القيمة من خلال التكامل التشغيلي والتنفيذ الموثوق والكوادر السعودية المتميزة.',
      },
      ceo: {
        label_en: en.home?.ceo?.label || 'Leadership Message',
        label_ar: ar.home?.ceo?.label || 'رسالة القيادة',
        quote_en: en.home?.ceo?.quote || 'Our strength lies in integration: we build what we design, furnish what we build, and operate what we develop.',
        quote_ar: ar.home?.ceo?.quote || 'قوتنا تكمن في التكامل: نبني ما نصممه، ونؤثث ما نبنيه، وندير ما نطوره بأعلى معايير الكفاءة الوطنية.',
        name_en: en.home?.ceo?.name || 'Watan Designs Leadership',
        name_ar: ar.home?.ceo?.name || 'قيادة تصاميم الوطن',
        title_en: en.home?.ceo?.title || 'Executive Board',
        title_ar: ar.home?.ceo?.title || 'مجلس الإدارة التنفيذي',
      },
      partnership: {
        heading_en: en.home?.partnership?.heading || 'Build the Future With WD Group',
        heading_ar: ar.home?.partnership?.heading || 'اصنع المستقبل مع مجموعة دبليو دي',
        subheading_en: en.home?.partnership?.subheading || 'Partner with an integrated leader in hospitality, manufacturing, and general contracting across Saudi Arabia.',
        subheading_ar: ar.home?.partnership?.subheading || 'شراكة استراتيجية مع رواد الضيافة والتصنيع والمقاولات في المملكة العربية السعودية.',
        primary_cta_en: en.home?.partnership?.primary_cta || 'Request RFP / Inquire',
        primary_cta_ar: ar.home?.partnership?.primary_cta || 'طلب عرض أسعار / استفسار',
      },
    },
    about: {
      hero: {
        eyebrow_en: en.about?.hero?.eyebrow || 'About WD Group',
        eyebrow_ar: ar.about?.hero?.eyebrow || 'عن مجموعة دبليو دي',
        title_en: en.about?.hero?.title || 'A Heritage of Integrated Enterprise',
        title_ar: ar.about?.hero?.title || 'مسيرة ريادية متكاملة',
        body_en: en.about?.hero?.body || 'Founded in Saudi Arabia with a commitment to sustainable excellence across key commercial and industrial sectors.',
        body_ar: ar.about?.hero?.body || 'تأسست في المملكة العربية السعودية بالتزام راسخ بالتميز المستدام عبر القطاعات التجارية والصناعية.',
      },
      story: {
        heading_en: en.about?.story?.heading || 'Our Journey & Growth',
        heading_ar: ar.about?.story?.heading || 'مسيرتنا ونمونا',
        p1_en: en.about?.story?.p1 || 'From specialized beginnings to an integrated holding operating hospitality assets, industrial manufacturing complexes, and contracting projects.',
        p1_ar: ar.about?.story?.p1 || 'من بدايات متخصصة إلى مجموعة قابضة متكاملة تدير منشآت ضيافة ومجمعات صناعية ومشاريع مقاولات.',
        p2_en: en.about?.story?.p2 || 'With over 80 professionals and multi-city operations, WD Group continues to expand with disciplined strategic investments.',
        p2_ar: ar.about?.story?.p2 || 'مع أكثر من 80 كادراً متخصصاً وتواجد في مدن متعددة، تواصل المجموعة توسعها باستثمارات استراتيجية مدروسة.',
      },
    },
    hospitality: {
      hero_title_en: en.hospitality?.hero?.title || 'Comfortable Stays. Thoughtful Service.',
      hero_title_ar: ar.hospitality?.hero?.title || 'إقامة مريحة وخدمة مدروسة.',
      hero_desc_en: en.hospitality?.hero?.body || 'Our hospitality portfolio brings together hotels and serviced residences designed for business and leisure.',
      hero_desc_ar: ar.hospitality?.hero?.body || 'تضم محفظتنا الفندقية فنادق وشققاً مخدومة مصممة لرحلات الأعمال والعائلات.',
    },
    manufacturing: {
      hero_title_en: en.manufacturing?.hero?.title || 'Precision Manufacturing & Quality Furniture',
      hero_title_ar: ar.manufacturing?.hero?.title || 'تصنيع دقيق وأثاث عالي الجودة',
      hero_desc_en: en.manufacturing?.hero?.body || 'Three dedicated factories engineered for architectural joinery, hotel furniture, and industrial fit-out.',
      hero_desc_ar: ar.manufacturing?.hero?.body || 'ثلاثة مصانع متخصصة في الأعمال الخشبية المعمارية وأثاث الفنادق والتجهيزات الصناعية.',
    },
    contracting: {
      hero_title_en: en.contracting?.hero?.title || 'Engineered Excellence & Turnkey Contracting',
      hero_title_ar: ar.contracting?.hero?.title || 'تميز هندسي ومقاولات متكاملة',
      hero_desc_en: en.contracting?.hero?.body || 'End-to-end project delivery, fit-out execution, and commercial contracting with zero compromise.',
      hero_desc_ar: ar.contracting?.hero?.body || 'تنفيذ شامل للمشاريع والتشطيبات والمقاولات التجارية دون أي مساومة على الجودة.',
    },
    careers: {
      hero_title_en: en.careers?.hero?.title || 'Build Your Career With WD Group',
      hero_title_ar: ar.careers?.hero?.title || 'ابنِ مسيرتك المهنية مع مجموعة دبليو دي',
      hero_body_en: en.careers?.hero?.body || 'Explore opportunities to contribute to dynamic projects in hospitality, manufacturing, and engineering.',
      hero_body_ar: ar.careers?.hero?.body || 'استكشف الفرص الوظيفية للمساهمة في مشاريع متطورة في الضيافة والتصنيع والهندسة.',
    },
    contact: {
      hero_title_en: en.contact?.hero?.title || 'Let’s Start the Right Conversation',
      hero_title_ar: ar.contact?.hero?.title || 'دعنا نبدأ الحوار المناسب',
      hero_body_en: en.contact?.hero?.body || 'Choose the sector that best matches your request. We will direct your inquiry to the appropriate team.',
      hero_body_ar: ar.contact?.hero?.body || 'اختر القطاع الأنسب لطلبك، وسنقوم بتوجيه استفسارك للفريق المختص مباشرة.',
      hq_address_en: en.contact?.cards?.hq_address || 'King Abdulaziz Road, Al Khalidiya, Najran, Kingdom of Saudi Arabia',
      hq_address_ar: ar.contact?.cards?.hq_address || 'طريق الملك عبدالعزيز، الخالدية، نجران، المملكة العربية السعودية',
      general_email: en.contact?.cards?.general_email || 'ceo@wdgroup.online',
      primary_phone: en.contact?.cards?.primary_phone || '+966 50 572 5070',
    },
    settings: {
      nav_cta_en: en.nav?.contactCta || 'Contact Us',
      nav_cta_ar: ar.nav?.contactCta || 'تواصل معنا',
    }
  };
}

// Deep get helper
function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[part];
  }
  return curr;
}

// Deep set helper (returns a cloned modified copy)
function setNestedValue(obj: any, path: string, value: any): any {
  try {
    const clone = JSON.parse(JSON.stringify(obj || {}));
    const parts = path.split('.');
    let curr = clone;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!curr[part] || typeof curr[part] !== 'object') {
        curr[part] = {};
      }
      curr = curr[part];
    }
    curr[parts[parts.length - 1]] = value;
    return clone;
  } catch (e) {
    return obj;
  }
}

// Flatten all string fields into a path-to-string dictionary
function flattenContent(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (!obj || typeof obj !== 'object') return result;

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string' && val.trim().length > 0) {
      result[fullPath] = val.trim();
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenContent(val, fullPath));
    }
  }
  return result;
}

export default function LiveEditorDock() {
  const pathname = usePathname();
  const { lang, setLanguage, dynamicContent, setDynamicContent } = useLanguage();
  const isAr = lang === 'ar';

  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [serverState, setServerState] = useState<any>(() => createDefaultState());
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const unsavedCount = Object.keys(pendingChanges).length;
  const hasUnsaved = unsavedCount > 0;

  // Track client hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Ref to hold current state for event handlers without stale closures
  const stateRef = useRef({
    isEditMode,
    lang,
    serverState,
    pendingChanges,
    dynamicContent
  });

  useEffect(() => {
    stateRef.current = {
      isEditMode,
      lang,
      serverState,
      pendingChanges,
      dynamicContent
    };
  });

  // Load server content initially
  useEffect(() => {
    let isCancelled = false;
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (json.data && !isCancelled) {
            const defaults = createDefaultState();
            const merged = { ...defaults, ...json.data };
            setServerState(merged);
          }
        }
      } catch (err) {
        // Fallback to static defaults silently
      }
    }
    loadContent();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Update dynamic content live when pending changes or serverState change
  const applyFieldEdit = useCallback((targetPath: string, newText: string) => {
    let resolvedPath = targetPath;
    const currentLang = stateRef.current.lang;
    if (
      !resolvedPath.endsWith('_ar') && 
      !resolvedPath.endsWith('_en') && 
      !resolvedPath.endsWith('_num') && 
      !resolvedPath.includes('email') && 
      !resolvedPath.includes('phone') && 
      !resolvedPath.includes('url')
    ) {
      resolvedPath = `${resolvedPath}_${currentLang}`;
    }

    setPendingChanges((prev) => {
      const next = { ...prev, [resolvedPath]: newText };
      return next;
    });

    // Update dynamicContent in LanguageContext immediately
    setDynamicContent((prevContent: any) => {
      const base = prevContent || stateRef.current.serverState || createDefaultState();
      return setNestedValue(base, resolvedPath, newText);
    });
  }, [setDynamicContent]);

  // Bind and unbind DOM elements for in-place editing
  useEffect(() => {
    if (typeof window === 'undefined' || !hasMounted) return;

    if (!isEditMode) {
      document.body.classList.remove('live-editor-active');
      // Strip contenteditable from all active elements
      document.querySelectorAll('.live-editor-target').forEach((el) => {
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-live-dirty');
        el.classList.remove('live-editor-target');
      });
      return;
    }

    document.body.classList.add('live-editor-active');

    try {
      // Build reverse dictionary for the current language
      const currentMerged = dynamicContent || serverState;
      const flattened = flattenContent(currentMerged);

      // Invert: Text -> FieldPath
      const textToPath = new Map<string, string>();
      const langSuffix = isAr ? '_ar' : '_en';

      for (const [path, textVal] of Object.entries(flattened)) {
        if (path.endsWith(langSuffix) || path.endsWith('_num') || (!path.endsWith('_en') && !path.endsWith('_ar'))) {
          if (textVal && textVal.length > 1) {
            textToPath.set(textVal.toLowerCase(), path);
          }
        }
      }

      function scanAndBindElements() {
        const candidates = document.querySelectorAll(
          'h1, h2, h3, h4, h5, h6, p, span, a, button, label, li, blockquote, [data-live-field]'
        );

        candidates.forEach((node) => {
          const el = node as HTMLElement;

          // Skip our floating dock UI elements
          if (el.closest('#live-editor-floating-dock')) return;

          // Check if element already has explicit data-live-field
          let fieldPath = el.getAttribute('data-live-field');

          // If not explicit, check text content if it's a leaf text container
          if (!fieldPath) {
            const hasBlockChildren = el.querySelector('h1, h2, h3, h4, h5, h6, p, div, section, article');
            if (!hasBlockChildren) {
              const rawText = el.innerText?.trim();
              if (rawText && rawText.length > 1) {
                const matched = textToPath.get(rawText.toLowerCase());
                if (matched) {
                  fieldPath = matched;
                  el.setAttribute('data-live-field', matched);
                }
              }
            }
          }

          if (fieldPath) {
            el.setAttribute('contenteditable', 'true');
            el.setAttribute('spellcheck', 'false');
            el.classList.add('live-editor-target');

            // Highlight if dirty
            const resolved = (fieldPath.endsWith('_ar') || fieldPath.endsWith('_en') || fieldPath.endsWith('_num'))
              ? fieldPath
              : `${fieldPath}_${stateRef.current.lang}`;

            if (stateRef.current.pendingChanges[resolved] !== undefined || stateRef.current.pendingChanges[fieldPath] !== undefined) {
              el.setAttribute('data-live-dirty', 'true');
            } else {
              el.removeAttribute('data-live-dirty');
            }
          }
        });
      }

      scanAndBindElements();

      // Listen to route and DOM updates
      const observer = new MutationObserver(() => {
        scanAndBindElements();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    } catch (err) {
      console.warn('Live In-Place Editor DOM binding non-fatal error:', err);
    }
  }, [isEditMode, lang, dynamicContent, serverState, hasMounted]);

  // Global event listeners for in-place editing interactions
  useEffect(() => {
    if (!isEditMode || !hasMounted) return;

    // 1. Click Handler: Prevent links and buttons from navigating when clicked in Edit Mode
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('#live-editor-floating-dock')) return;

      const editable = target.closest('.live-editor-target') as HTMLElement;
      if (editable) {
        const clickableParent = target.closest('a, button');
        if (clickableParent) {
          e.preventDefault();
        }
      }
    };

    // 2. Input Handler: Capture text edits in real-time
    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('live-editor-target')) return;

      const fieldPath = target.getAttribute('data-live-field');
      if (!fieldPath) return;

      const newText = target.innerText; // Clean text
      applyFieldEdit(fieldPath, newText);
      target.setAttribute('data-live-dirty', 'true');
    };

    // 3. Keydown Handler: Handle Enter, Esc, Ctrl+S
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Keyboard Shortcut: Ctrl+S / Cmd+S to Save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (Object.keys(stateRef.current.pendingChanges).length > 0) {
          handleSave();
        }
        return;
      }

      // Keyboard Shortcut: Ctrl+E / Cmd+E to Toggle Edit Mode
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEditMode((prev) => !prev);
        return;
      }

      // Esc to blur active element
      if (e.key === 'Escape') {
        if (document.activeElement && document.activeElement !== document.body) {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      // Enter key handling on single-line items
      if (e.key === 'Enter' && target.classList.contains('live-editor-target')) {
        const tag = target.tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'button', 'a'].includes(tag)) {
          e.preventDefault();
          target.blur();
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('input', handleInput);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('input', handleInput);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditMode, applyFieldEdit, hasMounted]);

  // Save all pending changes to the live database API
  const handleSave = async () => {
    if (saving || !hasUnsaved) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      let merged = JSON.parse(JSON.stringify(dynamicContent || serverState));
      for (const [path, val] of Object.entries(pendingChanges)) {
        merged = setNestedValue(merged, path, val);
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save content to database');
      }

      setServerState(merged);
      setDynamicContent(merged);
      setPendingChanges({});
      setSaveSuccess(true);

      document.querySelectorAll('[data-live-dirty]').forEach((el) => {
        el.removeAttribute('data-live-dirty');
      });

      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  // Discard local unsaved changes
  const handleDiscard = () => {
    if (!hasUnsaved) return;
    const confirmText = isAr 
      ? `هل أنت متأكد من التراجع عن ${unsavedCount} تعديل؟` 
      : `Discard ${unsavedCount} unsaved text edits?`;

    if (window.confirm(confirmText)) {
      setPendingChanges({});
      setDynamicContent(serverState);
      window.location.reload();
    }
  };

  // Unconditionally placed AFTER all React hooks
  if (!hasMounted || pathname?.startsWith('/admin') || pathname === '/maintenance') {
    return null;
  }

  return (
    <div 
      id="live-editor-floating-dock" 
      dir={isAr ? 'rtl' : 'ltr'} 
      className="fixed bottom-6 inset-x-0 z-[9999] pointer-events-none flex justify-center px-4"
    >
      {/* 1. Minimized Launcher Button (When Edit Mode is OFF or user minimized) */}
      {!isEditMode ? (
        <button
          type="button"
          onClick={() => setIsEditMode(true)}
          className="pointer-events-auto group inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0A0D14]/90 hover:bg-[#121622] text-white border border-[#C9A86A]/40 hover:border-[#C9A86A] shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
          title={isAr ? 'تشغيل وضع التحرير المباشر (Ctrl+E)' : 'Turn On Live In-Place Editor (Ctrl+E)'}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E3C58A]"></span>
          </span>
          <Edit3 className="w-4 h-4 text-[#C9A86A] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide font-sans">
            {isAr ? 'تعديل النصوص مباشرة' : 'Edit Website In-Place'}
          </span>
        </button>
      ) : isMinimized ? (
        /* Minimized floating circle when Edit Mode is active */
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0D14]/95 text-[#C9A86A] border border-[#C9A86A] shadow-2xl backdrop-blur-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
          title={isAr ? 'توسيع شريط التحكم' : 'Expand In-Place Editor Controls'}
        >
          <span className="animate-ping absolute -top-1 -right-1 flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <Maximize2 className="w-5 h-5" />
          {hasUnsaved && (
            <span className="absolute -bottom-1 -left-1 bg-amber-500 text-black text-[9px] font-mono font-black w-4 h-4 rounded-full flex items-center justify-center">
              {unsavedCount}
            </span>
          )}
        </button>
      ) : (
        /* 2. Full In-Place Control Toolbar Pill */
        <div className="pointer-events-auto inline-flex items-center flex-wrap gap-2.5 sm:gap-3 px-4 py-2 sm:py-2.5 rounded-full bg-[#0A0D14]/95 border border-[#C9A86A]/40 shadow-[0_12px_45px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-white animate-in slide-in-from-bottom-3 duration-200">
          
          {/* Active Mode Status Indicator */}
          <div className="flex items-center gap-2 pr-1 sm:pr-2 border-r border-white/10 rtl:pr-0 rtl:pl-2 rtl:border-r-0 rtl:border-l">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-zinc-200 tracking-tight hidden sm:inline">
              {isAr ? 'وضع التحرير المباشر' : 'Live In-Place Edit'}
            </span>
          </div>

          {/* Language Switcher Pill */}
          <div className="inline-flex items-center bg-white/5 rounded-full p-0.5 border border-white/10">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                lang === 'en'
                  ? 'bg-[#C9A86A] text-[#0A0D14] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                lang === 'ar'
                  ? 'bg-[#C9A86A] text-[#0A0D14] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Unsaved Edits Badge */}
          {hasUnsaved && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              {isAr ? `${unsavedCount} تعديل غير محفوظ` : `${unsavedCount} Unsaved`}
            </span>
          )}

          {/* Save Button */}
          <button
            type="button"
            disabled={!hasUnsaved || saving}
            onClick={handleSave}
            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              saveSuccess
                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : hasUnsaved
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer'
                : 'bg-white/5 text-zinc-500 border border-white/5 cursor-not-allowed'
            }`}
            title="Save changes to live database (Ctrl+S)"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isAr ? 'جارِ الحفظ...' : 'Saving...'}</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'تم الحفظ بنجاح!' : 'Saved Live!'}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isAr ? 'حفظ التعديلات' : 'Save'}</span>
              </>
            )}
          </button>

          {/* Discard Button */}
          {hasUnsaved && (
            <button
              type="button"
              disabled={saving}
              onClick={handleDiscard}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all cursor-pointer"
              title={isAr ? 'التراجع عن التعديلات غير المحفوظة' : 'Discard Unsaved Edits'}
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">{isAr ? 'تراجع' : 'Discard'}</span>
            </button>
          )}

          {/* Minimize Button */}
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isAr ? 'تصغير الشريط' : 'Minimize Controls'}
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>

          {/* Exit Edit Mode Button */}
          <button
            type="button"
            onClick={() => {
              if (hasUnsaved) {
                if (!window.confirm(isAr ? 'لديك تعديلات غير محفوظة، هل تريد الخروج دون حفظ؟' : 'You have unsaved changes. Exit without saving?')) {
                  return;
                }
              }
              setIsEditMode(false);
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title={isAr ? 'إغلاق وضع التحرير' : 'Exit Edit Mode'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
