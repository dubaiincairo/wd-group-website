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

const en = translations.en;
const ar = translations.ar;

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

// Build baseline default content matching SiteContentPayload
function createDefaultState() {
  return {
    home: {
      hero: {
        eyebrow_en: en.home.hero.eyebrow,
        eyebrow_ar: ar.home.hero.eyebrow,
        kicker_en: en.home.hero.kicker,
        kicker_ar: ar.home.hero.kicker,
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
        dock_hospitality_label_ar: ar.home.hero.dock?.hospitality_label || 'الضيافة (سويس بلو)',
        dock_hospitality_badge_en: en.home.hero.dock?.hospitality_badge || '6 Properties',
        dock_hospitality_badge_ar: ar.home.hero.dock?.hospitality_badge || '6 منشآت',
        dock_manufacturing_label_en: en.home.hero.dock?.manufacturing_label || 'Manufacturing (GreenWood)',
        dock_manufacturing_label_ar: ar.home.hero.dock?.manufacturing_label || 'التصنيع والأثاث (جرين وود)',
        dock_manufacturing_badge_en: en.home.hero.dock?.manufacturing_badge || '3 Factories',
        dock_manufacturing_badge_ar: ar.home.hero.dock?.manufacturing_badge || '3 مصانع',
        dock_contracting_label_en: en.home.hero.dock?.contracting_label || 'Contracting (Projects)',
        dock_contracting_label_ar: ar.home.hero.dock?.contracting_label || 'المقاولات والتميز الهندسي',
        dock_contracting_badge_en: en.home.hero.dock?.contracting_badge || 'Turnkey',
        dock_contracting_badge_ar: ar.home.hero.dock?.contracting_badge || 'تنفيذ شامل',
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
      sectors: {
        label_en: en.home.sectors.label,
        label_ar: ar.home.sectors.label,
        heading_en: en.home.sectors.heading,
        heading_ar: ar.home.sectors.heading,
        intro_en: en.home.sectors.intro,
        intro_ar: ar.home.sectors.intro,
        hospitality_eyebrow_en: en.home.sectors.hospitality.eyebrow,
        hospitality_eyebrow_ar: ar.home.sectors.hospitality.eyebrow,
        hospitality_title_en: en.home.sectors.hospitality.title,
        hospitality_title_ar: ar.home.sectors.hospitality.title,
        hospitality_desc_en: en.home.sectors.hospitality.desc,
        hospitality_desc_ar: ar.home.sectors.hospitality.desc,
        hospitality_proof_en: en.home.sectors.hospitality.proof,
        hospitality_proof_ar: ar.home.sectors.hospitality.proof,
        hospitality_cta_en: en.home.sectors.hospitality.cta,
        hospitality_cta_ar: ar.home.sectors.hospitality.cta,

        manufacturing_eyebrow_en: en.home.sectors.manufacturing.eyebrow,
        manufacturing_eyebrow_ar: ar.home.sectors.manufacturing.eyebrow,
        manufacturing_title_en: en.home.sectors.manufacturing.title,
        manufacturing_title_ar: ar.home.sectors.manufacturing.title,
        manufacturing_desc_en: en.home.sectors.manufacturing.desc,
        manufacturing_desc_ar: ar.home.sectors.manufacturing.desc,
        manufacturing_proof_en: en.home.sectors.manufacturing.proof,
        manufacturing_proof_ar: ar.home.sectors.manufacturing.proof,
        manufacturing_cta_en: en.home.sectors.manufacturing.cta,
        manufacturing_cta_ar: ar.home.sectors.manufacturing.cta,

        contracting_eyebrow_en: en.home.sectors.contracting.eyebrow,
        contracting_eyebrow_ar: ar.home.sectors.contracting.eyebrow,
        contracting_title_en: en.home.sectors.contracting.title,
        contracting_title_ar: ar.home.sectors.contracting.title,
        contracting_desc_en: en.home.sectors.contracting.desc,
        contracting_desc_ar: ar.home.sectors.contracting.desc,
        contracting_proof_en: en.home.sectors.contracting.proof,
        contracting_proof_ar: ar.home.sectors.contracting.proof,
        contracting_cta_en: en.home.sectors.contracting.cta,
        contracting_cta_ar: ar.home.sectors.contracting.cta,
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
        vision_desc_en: en.home.identity.vision_desc,
        vision_desc_ar: ar.home.identity.vision_desc,
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
      partnership: {
        heading_en: en.home.partnership?.heading || 'Build the Future With WD Group',
        heading_ar: ar.home.partnership?.heading || 'اصنع المستقبل مع مجموعة دبليو دي',
        subheading_en: en.home.partnership?.subheading || 'Partner with an integrated leader in hospitality, manufacturing, and general contracting across Saudi Arabia.',
        subheading_ar: ar.home.partnership?.subheading || 'شراكة استراتيجية مع رواد الضيافة والتصنيع والمقاولات في المملكة العربية السعودية.',
        primary_cta_en: en.home.partnership?.primary_cta || 'Request RFP / Inquire',
        primary_cta_ar: ar.home.partnership?.primary_cta || 'طلب عرض أسعار / استفسار',
      },
    },
    about: {
      hero: {
        eyebrow_en: en.about.hero.eyebrow,
        eyebrow_ar: ar.about.hero.eyebrow,
        title_en: en.about.hero.title,
        title_ar: ar.about.hero.title,
        body_en: en.about.hero.body,
        body_ar: ar.about.hero.body,
      },
      story: {
        heading_en: en.about.story.heading,
        heading_ar: ar.about.story.heading,
        p1_en: en.about.story.p1,
        p1_ar: ar.about.story.p1,
        p2_en: en.about.story.p2,
        p2_ar: ar.about.story.p2,
      },
    },
    hospitality: {
      hero_title_en: en.sectors.hospitality.title,
      hero_title_ar: ar.sectors.hospitality.title,
      hero_desc_en: en.sectors.hospitality.desc,
      hero_desc_ar: ar.sectors.hospitality.desc,
    },
    manufacturing: {
      hero_title_en: en.sectors.manufacturing.title,
      hero_title_ar: ar.sectors.manufacturing.title,
      hero_desc_en: en.sectors.manufacturing.desc,
      hero_desc_ar: ar.sectors.manufacturing.desc,
    },
    contracting: {
      hero_title_en: en.sectors.contracting.title,
      hero_title_ar: ar.sectors.contracting.title,
      hero_desc_en: en.sectors.contracting.desc,
      hero_desc_ar: ar.sectors.contracting.desc,
    },
    careers: {
      hero_title_en: en.careers.hero.title,
      hero_title_ar: ar.careers.hero.title,
      hero_body_en: en.careers.hero.body,
      hero_body_ar: ar.careers.hero.body,
    },
    contact: {
      hero_title_en: en.contact.hero.title,
      hero_title_ar: ar.contact.hero.title,
      hero_body_en: en.contact.hero.body,
      hero_body_ar: ar.contact.hero.body,
      hq_address_en: en.contact.cards.hq_address,
      hq_address_ar: ar.contact.cards.hq_address,
      general_email: en.contact.cards.general_email,
      primary_phone: en.contact.cards.primary_phone,
    },
    settings: {
      nav_cta_en: en.nav.contactCta,
      nav_cta_ar: ar.nav.contactCta,
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

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [serverState, setServerState] = useState<any>(() => createDefaultState());
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const unsavedCount = Object.keys(pendingChanges).length;
  const hasUnsaved = unsavedCount > 0;

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

  // Suppress on admin or maintenance routes
  if (pathname?.startsWith('/admin') || pathname === '/maintenance') {
    return null;
  }

  // Load server content initially
  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            const defaults = createDefaultState();
            const merged = { ...defaults, ...json.data };
            setServerState(merged);
          }
        }
      } catch (err) {
        // Fallback to static defaults
      }
    }
    loadContent();
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
    if (typeof window === 'undefined') return;

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

    // Build reverse dictionary for the current language
    const currentMerged = dynamicContent || serverState;
    const flattened = flattenContent(currentMerged);

    // Invert: Text -> FieldPath
    // Filter only fields matching the active language suffix or universal numbers
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
          // Check if element is a leaf text container (no heavy block children)
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
  }, [isEditMode, lang, dynamicContent, serverState]);

  // Global event listeners for in-place editing interactions
  useEffect(() => {
    if (!isEditMode) return;

    // 1. Click Handler: Prevent links and buttons from navigating when clicked in Edit Mode
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('#live-editor-floating-dock')) return;

      const editable = target.closest('.live-editor-target') as HTMLElement;
      if (editable) {
        // Prevent navigation if inside an <a> or <button>
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
        // Disallow Enter on headings, buttons, spans to prevent layout breakage
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
  }, [isEditMode, applyFieldEdit]);

  // Save all pending changes to the live database API
  const handleSave = async () => {
    if (saving || !hasUnsaved) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      // Build updated payload by merging pendingChanges into serverState
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

      // Remove dirty attributes from DOM
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
