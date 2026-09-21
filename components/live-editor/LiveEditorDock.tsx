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
  Loader2,
  Lock,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import './liveEditor.css';

// ----------------------------------------------------------------------
// 1. Translation to Admin Field Mapping
// ----------------------------------------------------------------------
const TRANSLATION_TO_ADMIN_FIELD: Record<string, string> = {
  'home.hero.eyebrow': 'home.hero.eyebrow',
  'home.hero.kicker': 'home.hero.kicker',
  'home.hero.title': 'home.hero.title',
  'home.hero.title_line1': 'home.hero.title_line1',
  'home.hero.title_line2': 'home.hero.title_line2',
  'home.hero.title_line3': 'home.hero.title_line3',
  'home.hero.body': 'home.hero.body',
  'home.hero.primaryCta': 'home.hero.primary_cta',
  'home.hero.secondaryCta': 'home.hero.secondary_cta',
  'home.hero.dock.hospitality_label': 'home.hero.dock_hospitality_label',
  'home.hero.dock.hospitality_badge': 'home.hero.dock_hospitality_badge',
  'home.hero.dock.manufacturing_label': 'home.hero.dock_manufacturing_label',
  'home.hero.dock.manufacturing_badge': 'home.hero.dock_manufacturing_badge',
  'home.hero.dock.contracting_label': 'home.hero.dock_contracting_label',
  'home.hero.dock.contracting_badge': 'home.hero.dock_contracting_badge',
  'home.hero.scroll_cue': 'home.hero.scroll_cue',
  'home.metrics.stat1_text': 'home.metrics.stat1_text',
  'home.metrics.stat2_text': 'home.metrics.stat2_text',
  'home.metrics.stat3_text': 'home.metrics.stat3_text',
  'home.metrics.stat4_text': 'home.metrics.stat4_text',
  'home.sectors.label': 'home.sectors.label',
  'home.sectors.heading': 'home.sectors.heading',
  'home.sectors.intro': 'home.sectors.intro',
  'home.sectors.hospitality.eyebrow': 'home.sectors.hospitality_eyebrow',
  'home.sectors.hospitality.title': 'home.sectors.hospitality_title',
  'home.sectors.hospitality.desc': 'home.sectors.hospitality_desc',
  'home.sectors.hospitality.proof': 'home.sectors.hospitality_proof',
  'home.sectors.hospitality.cta': 'home.sectors.hospitality_cta',
  'home.sectors.manufacturing.eyebrow': 'home.sectors.manufacturing_eyebrow',
  'home.sectors.manufacturing.title': 'home.sectors.manufacturing_title',
  'home.sectors.manufacturing.desc': 'home.sectors.manufacturing_desc',
  'home.sectors.manufacturing.proof': 'home.sectors.manufacturing_proof',
  'home.sectors.manufacturing.cta': 'home.sectors.manufacturing_cta',
  'home.sectors.contracting.eyebrow': 'home.sectors.contracting_eyebrow',
  'home.sectors.contracting.title': 'home.sectors.contracting_title',
  'home.sectors.contracting.desc': 'home.sectors.contracting_desc',
  'home.sectors.contracting.proof': 'home.sectors.contracting_proof',
  'home.sectors.contracting.cta': 'home.sectors.contracting_cta',
  'home.synergy.label': 'home.synergy.label',
  'home.synergy.heading': 'home.synergy.heading',
  'home.synergy.intro': 'home.synergy.intro',
  'home.synergy.step1_title': 'home.synergy.step1_title',
  'home.synergy.step1_text': 'home.synergy.step1_text',
  'home.synergy.step2_title': 'home.synergy.step2_title',
  'home.synergy.step2_text': 'home.synergy.step2_text',
  'home.synergy.step3_title': 'home.synergy.step3_title',
  'home.synergy.step3_text': 'home.synergy.step3_text',
  'home.identity.label': 'home.identity.label',
  'home.identity.vision_title': 'home.identity.vision_title',
  'home.identity.vision_desc': 'home.identity.vision_desc',
  'home.identity.mission_title': 'home.identity.mission_title',
  'home.identity.mission_desc': 'home.identity.mission_desc',
  'home.identity.values_title': 'home.identity.values_title',
  'home.ceo.label': 'home.ceo.label',
  'home.ceo.quote': 'home.ceo.quote',
  'home.ceo.name': 'home.ceo.name',
  'home.ceo.title': 'home.ceo.title',
  'home.partnership.label': 'home.partnership.label',
  'home.partnership.heading': 'home.partnership.heading',
  'home.partnership.body': 'home.partnership.body',
  'home.partnership.primaryCta': 'home.partnership.primary_cta',
  'home.partnership.secondaryCta': 'home.partnership.secondary_cta',
  'about.hero.eyebrow': 'about.hero_eyebrow',
  'about.hero.title': 'about.hero_title',
  'about.hero.body': 'about.hero_body',
  'about.story.heading': 'about.story_heading',
  'about.story.body': 'about.story_body',
  'about.governance.statement': 'about.governance_statement',
  'hospitality.hero.title': 'hospitality.hero_title',
  'hospitality.hero.body': 'hospitality.hero_body',
  'manufacturing.hero.title': 'manufacturing.hero_title',
  'manufacturing.hero.body': 'manufacturing.hero_body',
  'contracting.hero.title': 'contracting.hero_title',
  'contracting.hero.body': 'contracting.hero_body',
  'careers.hero.title': 'careers.hero_title',
  'careers.hero.body': 'careers.hero_body',
  'contact.hero.title': 'contact.hero_title',
  'contact.hero.body': 'contact.hero_body',
  'contact.cards.hq_address': 'settings.headquarters',
  'nav.contactCta': 'settings.nav_cta',
  'nav.furniture': 'settings.nav_furniture',
  'nav.furnitureBadge': 'settings.nav_furniture_badge',
  'nav.brand': 'settings.company_name',
  'nav.holding': 'settings.company_name',
};

// Flatten any deeply nested object into a key -> value dictionary
function flattenObject(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  if (!obj || typeof obj !== 'object') return result;

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string' && val.trim().length > 0) {
      result[fullPath] = val.trim();
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, fullPath));
    }
  }
  return result;
}

// Normalize text for fuzzy reverse lookup
function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Generate simple deterministic hash for custom text
function hashText(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

// Deep set helper with flat key support for translations_override
function setNestedValue(obj: any, path: string, value: any): any {
  try {
    const clone = JSON.parse(JSON.stringify(obj || {}));

    // If path starts with 'translations_override.', keep the keyPath flat!
    // Example: translations_override.ar.nav.furniture -> clone.translations_override.ar["nav.furniture"] = value
    if (path.startsWith('translations_override.')) {
      const parts = path.split('.');
      const overrideLang = parts[1];
      const keyPath = parts.slice(2).join('.');

      if (!clone.translations_override) clone.translations_override = {};
      if (!clone.translations_override[overrideLang]) clone.translations_override[overrideLang] = {};
      clone.translations_override[overrideLang][keyPath] = value;
      return clone;
    }

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

export default function LiveEditorDock() {
  const pathname = usePathname();
  const { lang, setLanguage, dynamicContent, setDynamicContent } = useLanguage();
  const isAr = lang === 'ar';

  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [serverState, setServerState] = useState<any>(null);
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('ceo@wdgroup.online');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const unsavedCount = Object.keys(pendingChanges).length;
  const hasUnsaved = unsavedCount > 0;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Hold current state ref for stable event handlers
  const stateRef = useRef({
    isEditMode,
    lang,
    serverState,
    pendingChanges,
    dynamicContent,
    pathname,
  });

  useEffect(() => {
    stateRef.current = {
      isEditMode,
      lang,
      serverState,
      pendingChanges,
      dynamicContent,
      pathname,
    };
  });

  // Load server content initially
  useEffect(() => {
    let isCancelled = false;
    async function loadContent() {
      try {
        const res = await fetch(`/api/content?t=${Date.now()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && !isCancelled) {
            setServerState(json.data);
          }
        }
      } catch (err) {
        // Fallback silently
      }
    }
    loadContent();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Apply a field edit into state & context
  const applyFieldEdit = useCallback((targetPath: string, newText: string, originalText?: string) => {
    const currentLang = stateRef.current.lang;

    // Check if targetPath maps to an admin field
    const adminField = TRANSLATION_TO_ADMIN_FIELD[targetPath];
    const changes: Record<string, string> = {};

    if (adminField) {
      const primaryPath = `${adminField}_${currentLang}`;
      changes[primaryPath] = newText;
      // Also sync to translations_override for double reliability
      changes[`translations_override.${currentLang}.${targetPath}`] = newText;
    } else if (!targetPath.startsWith('translations_override.') && !targetPath.endsWith('_en') && !targetPath.endsWith('_ar') && !targetPath.endsWith('_num')) {
      const primaryPath = `${targetPath}_${currentLang}`;
      changes[primaryPath] = newText;
      changes[`translations_override.${currentLang}.${targetPath}`] = newText;
    } else {
      changes[targetPath] = newText;
    }

    // If custom override, also track in _custom_map for universal DOM replacer
    if (targetPath.includes('.custom.')) {
      const parts = targetPath.split('.');
      const hash = parts[parts.length - 1];
      const routeSlug = parts[parts.length - 2] || 'home';
      if (originalText) {
        changes[`translations_override.${currentLang}._custom_map.${hash}.original`] = originalText;
        changes[`translations_override.${currentLang}._custom_map.${hash}.replacement`] = newText;
        changes[`translations_override.${currentLang}._custom_map.${hash}.route`] = routeSlug;
      }
    }

    setPendingChanges((prev) => ({
      ...prev,
      ...changes,
    }));

    // Update dynamicContent live
    setDynamicContent((prevContent: any) => {
      let base = prevContent || stateRef.current.serverState || {};
      for (const [p, v] of Object.entries(changes)) {
        base = setNestedValue(base, p, v);
      }
      return base;
    });
  }, [setDynamicContent]);

  // Universal DOM Element Scanning and Binding
  useEffect(() => {
    if (typeof window === 'undefined' || !hasMounted) return;

    if (!isEditMode) {
      document.body.classList.remove('live-editor-active');
      document.querySelectorAll('.live-editor-target').forEach((el) => {
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-live-dirty');
        el.classList.remove('live-editor-target');
      });
      return;
    }

    document.body.classList.add('live-editor-active');

    try {
      // 1. Build comprehensive reverse index for the current language
      const currentTrans = translations[lang] || {};
      const flattenedTrans = flattenObject(currentTrans);
      const flattenedDynamic = flattenObject(dynamicContent || serverState || {});

      // Text -> Field Path maps
      const exactMap = new Map<string, string>();
      const normalizedMap = new Map<string, string>();

      const langSuffix = isAr ? '_ar' : '_en';

      // Index base translations
      for (const [transPath, textVal] of Object.entries(flattenedTrans)) {
        if (textVal && textVal.length > 0) {
          // Map to admin field if exists, else translations_override
          const adminField = TRANSLATION_TO_ADMIN_FIELD[transPath];
          const resolvedPath = adminField 
            ? `${adminField}_${lang}`
            : `translations_override.${lang}.${transPath}`;

          exactMap.set(textVal, resolvedPath);
          normalizedMap.set(normalizeText(textVal), resolvedPath);
        }
      }

      // Index dynamic content from database
      for (const [dynPath, textVal] of Object.entries(flattenedDynamic)) {
        if (textVal && textVal.length > 0) {
          if (dynPath.endsWith(langSuffix) || dynPath.includes(`.${lang}.`)) {
            exactMap.set(textVal, dynPath);
            normalizedMap.set(normalizeText(textVal), dynPath);
          }
        }
      }

      function scanAndBindElements() {
        const candidates = document.querySelectorAll(
          'h1, h2, h3, h4, h5, h6, p, button, a, span, label, li, blockquote, div, small, strong, b, em, i, [data-live-field]'
        );

        candidates.forEach((node) => {
          const el = node as HTMLElement;

          // Skip dock UI and scripts/styles/media
          if (
            el.closest('#live-editor-floating-dock') ||
            el.closest('script, style, svg, pre, code, input, textarea, select, canvas, video, audio, iframe')
          ) {
            return;
          }

          // Check if already tagged
          let fieldPath = el.getAttribute('data-live-field');

          // If not tagged, check if it's an editable leaf element
          if (!fieldPath) {
            const rawText = (el.innerText || el.textContent || '').trim();
            if (!rawText || rawText.length === 0 || rawText.startsWith('http://') || rawText.startsWith('https://')) {
              return;
            }

            // Skip parent containers that hold block-level children
            const hasBlockChild = el.querySelector('h1, h2, h3, h4, h5, h6, p, blockquote, li, ul, ol, table, form, section, article, nav, header, footer, main');
            if (hasBlockChild) {
              return;
            }

            // If it has children with text, let the innermost child handle the edit
            const childrenWithText = Array.from(el.children).filter((child) => {
              const childTag = child.tagName.toLowerCase();
              if (['svg', 'path', 'img', 'video', 'canvas', 'hr'].includes(childTag)) return false;
              return (child.textContent || '').trim().length > 0;
            });

            if (childrenWithText.length > 0) {
              return;
            }

            // 1. Exact match
            fieldPath = exactMap.get(rawText);

            // 2. Normalized match
            if (!fieldPath) {
              fieldPath = normalizedMap.get(normalizeText(rawText));
            }

            // 3. Deterministic custom override fallback for any unindexed text
            if (!fieldPath) {
              const routeSlug = (pathname || 'home').replace(/[^a-zA-Z0-9]/g, '_');
              const hash = hashText(rawText);
              fieldPath = `translations_override.${lang}.custom.${routeSlug}.${hash}`;
            }

            if (fieldPath) {
              el.setAttribute('data-live-field', fieldPath);
            }
          }

          if (fieldPath) {
            const currentRaw = (el.innerText || el.textContent || '').trim();
            if (!el.hasAttribute('data-live-original') && currentRaw) {
              el.setAttribute('data-live-original', currentRaw);
            }

            el.setAttribute('contenteditable', 'true');
            el.setAttribute('spellcheck', 'false');
            el.classList.add('live-editor-target');

            // Set dirty state if edited
            const isDirty = 
              stateRef.current.pendingChanges[fieldPath] !== undefined ||
              stateRef.current.pendingChanges[`${fieldPath}_${stateRef.current.lang}`] !== undefined;

            if (isDirty) {
              el.setAttribute('data-live-dirty', 'true');
            } else {
              el.removeAttribute('data-live-dirty');
            }
          }
        });
      }

      scanAndBindElements();

      const observer = new MutationObserver(() => {
        scanAndBindElements();
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    } catch (err) {
      console.warn('Live In-Place Editor DOM binding warning:', err);
    }
  }, [isEditMode, lang, dynamicContent, serverState, hasMounted, pathname]);

  // Global event listeners for editing interactions
  useEffect(() => {
    if (!isEditMode || !hasMounted) return;

    // 1. Intercept click: Prevent buttons and links from navigating when in Edit Mode
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('#live-editor-floating-dock')) return;

      // In Edit Mode, prevent navigation on any clicked link or button
      const clickableParent = target.closest('a, button');
      if (clickableParent) {
        e.preventDefault();
        e.stopPropagation();

        const editable = target.closest('.live-editor-target') as HTMLElement;
        if (editable) {
          editable.focus();
        } else {
          const innerEditable = clickableParent.querySelector('.live-editor-target') as HTMLElement;
          if (innerEditable) {
            innerEditable.focus();
          }
        }
      }
    };

    // 2. Real-time text input
    const handleInput = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('live-editor-target')) return;

      const fieldPath = target.getAttribute('data-live-field');
      if (!fieldPath) return;

      const newText = target.innerText;
      const originalText = target.getAttribute('data-live-original') || '';
      applyFieldEdit(fieldPath, newText, originalText);
      target.setAttribute('data-live-dirty', 'true');
    };

    // 3. Keyboard handlers (Enter, Escape, Ctrl+S, Ctrl+E)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Ctrl+S / Cmd+S: Save
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (Object.keys(stateRef.current.pendingChanges).length > 0) {
          handleSave();
        }
        return;
      }

      // Ctrl+E / Cmd+E: Toggle Edit Mode
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEditMode((prev) => !prev);
        return;
      }

      // Escape: blur active element
      if (e.key === 'Escape') {
        if (document.activeElement && document.activeElement !== document.body) {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      // Enter key: Single-line elements blur on Enter to prevent awkward breaks
      if (e.key === 'Enter' && target.classList.contains('live-editor-target')) {
        const tag = target.tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'button', 'a', 'label'].includes(tag)) {
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

  // Execute database save
  const handleSave = async () => {
    if (saving || !hasUnsaved) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      // Build full merged payload
      let merged = JSON.parse(JSON.stringify(dynamicContent || serverState || {}));

      for (const [path, val] of Object.entries(pendingChanges)) {
        merged = setNestedValue(merged, path, val);
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged),
      });

      const data = await res.json();

      // Check if session required
      if (res.status === 401 || data.requireAuth) {
        setShowAuthModal(true);
        setSaving(false);
        return;
      }

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

  // Authenticate inline and auto-retry save
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const loginRes = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok || !loginData.success) {
        throw new Error(loginData.error || 'Invalid credentials');
      }

      setShowAuthModal(false);
      setAuthPassword('');

      // Auto-retry save immediately
      await handleSave();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setAuthLoading(false);
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

  if (!hasMounted || pathname?.startsWith('/admin') || pathname === '/maintenance') {
    return null;
  }

  return (
    <>
      <div 
        id="live-editor-floating-dock" 
        dir={isAr ? 'rtl' : 'ltr'} 
        className="fixed bottom-6 inset-x-0 z-[9999] pointer-events-none flex justify-center px-4"
      >
        {/* 1. Minimized Launcher Button */}
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
              {isAr ? 'تعديل كل نصوص الصفحة' : 'Edit All Page Text'}
            </span>
          </button>
        ) : isMinimized ? (
          /* Minimized floating circle */
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
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 pr-1 sm:pr-2 border-r border-white/10 rtl:pr-0 rtl:pl-2 rtl:border-r-0 rtl:border-l">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-zinc-200 tracking-tight hidden sm:inline">
                {isAr ? 'تحرير النصوص مباشر' : 'Live In-Place Edit'}
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
              title="Save changes permanently to database and admin panel (Ctrl+S)"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{isAr ? 'جارِ الحفظ الدائم...' : 'Saving Live...'}</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تم الحفظ وتحديث الإدارة!' : 'Saved to Database & Admin!'}</span>
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

      {/* 3. In-Dock Admin Authentication Modal (if saving without active session) */}
      {showAuthModal && (
        <div 
          dir={isAr ? 'rtl' : 'ltr'} 
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-[#0D111A] border border-[#C9A86A]/40 rounded-2xl p-6 shadow-2xl text-white">
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'مصادقة الإدارة لحفظ التعديلات' : 'Admin Authentication Required'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isAr 
                    ? 'لحفظ التعديلات في قاعدة البيانات ولوحة الإدارة مباشرة' 
                    : 'To save changes permanently to Supabase and the Admin Panel'}
                </p>
              </div>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {isAr ? 'البريد الإلكتروني للمسؤول' : 'Admin Email'}
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#C9A86A] focus:outline-none"
                  placeholder="admin@wdgroup.online"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#C9A86A] focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold bg-[#C9A86A] hover:bg-[#B39355] text-black transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{isAr ? 'جارِ التحقق...' : 'Authenticating...'}</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تسجيل الدخول والحفظ فوراً' : 'Login & Save Now'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
