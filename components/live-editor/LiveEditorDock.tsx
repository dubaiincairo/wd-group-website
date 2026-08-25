'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Edit3, 
  Save, 
  RotateCcw, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Sliders, 
  Eye, 
  ExternalLink,
  Layers,
  Building2,
  Factory,
  HardHat,
  MessageSquare
} from 'lucide-react';

export default function LiveEditorDock() {
  const pathname = usePathname();
  const { lang, setLanguage, dict, dynamicContent, setDynamicContent } = useLanguage();

  const [isMinimized, setIsMinimized] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'metrics' | 'synergy' | 'identity' | 'ceo' | 'sectors'>('hero');
  const [localEdits, setLocalEdits] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Suppress completely on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Initialize editable fields from current dynamic content or dictionary
  useEffect(() => {
    async function initEditorContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const d = await res.json();
          if (d.data) {
            setLocalEdits(d.data);
            return;
          }
        }
      } catch (e) {
        // Fallback to local default structure
      }

      // Default state schema
      setLocalEdits({
        home: {
          hero: {
            eyebrow_en: dict.home.hero.eyebrow,
            eyebrow_ar: dict.home.hero.eyebrow,
            title_line1_en: dict.home.hero.title_line1 || 'Solid Vision.',
            title_line1_ar: dict.home.hero.title_line1 || 'رؤية راسخة.',
            title_line2_en: dict.home.hero.title_line2 || 'Diverse Sectors.',
            title_line2_ar: dict.home.hero.title_line2 || 'قطاعات متعددة.',
            title_line3_en: dict.home.hero.title_line3 || 'Promising Future.',
            title_line3_ar: dict.home.hero.title_line3 || 'مستقبل واعد.',
            body_en: dict.home.hero.body,
            body_ar: dict.home.hero.body,
          },
          metrics: {
            stat1_num: dict.home.metrics.stat1_num,
            stat1_text_en: dict.home.metrics.stat1_text,
            stat1_text_ar: dict.home.metrics.stat1_text,
            stat2_num: dict.home.metrics.stat2_num,
            stat2_text_en: dict.home.metrics.stat2_text,
            stat2_text_ar: dict.home.metrics.stat2_text,
            stat3_num: dict.home.metrics.stat3_num,
            stat3_text_en: dict.home.metrics.stat3_text,
            stat3_text_ar: dict.home.metrics.stat3_text,
            stat4_num: dict.home.metrics.stat4_num,
            stat4_text_en: dict.home.metrics.stat4_text,
            stat4_text_ar: dict.home.metrics.stat4_text,
          },
          synergy: {
            heading_en: dict.home.synergy.heading,
            heading_ar: dict.home.synergy.heading,
            intro_en: dict.home.synergy.intro,
            intro_ar: dict.home.synergy.intro,
          },
          ceo: {
            quote_en: dict.home.ceo.quote,
            quote_ar: dict.home.ceo.quote,
            name_en: dict.home.ceo.name,
            name_ar: dict.home.ceo.name,
            title_en: dict.home.ceo.title,
            title_ar: dict.home.ceo.title,
          },
        },
      });
    }

    initEditorContent();
  }, []);

  // Update a nested field and reflect immediately in LanguageContext
  const handleFieldChange = (section: string, subSection: string, field: string, value: string) => {
    setLocalEdits((prev: any) => {
      const updated = {
        ...prev,
        [section]: {
          ...(prev?.[section] || {}),
          [subSection]: {
            ...(prev?.[section]?.[subSection] || {}),
            [field]: value,
          },
        },
      };

      // Instantly push to dynamicContent so all components on the page re-render live
      setDynamicContent(updated);
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  // Save to database & admin panel
  const handleSave = async () => {
    if (!localEdits) return;
    setSaving(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localEdits),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Failed to save edits to server');
      }

      setSaveSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  // Discard & Reload
  const handleDiscard = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const d = await res.json();
        if (d.data) {
          setLocalEdits(d.data);
          setDynamicContent(d.data);
          setHasUnsavedChanges(false);
        }
      }
    } catch (e) {
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  if (!localEdits) return null;

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
      
      {/* Minimized Floating Launcher Badge */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0F1117]/95 hover:bg-[#151922] text-white border border-blue-500/40 hover:border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.4)] backdrop-blur-2xl transition-all transform hover:scale-105 active:scale-95"
          title="Open Live On-Page Visual Editor"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <Edit3 className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide">
            {lang === 'ar' ? 'محرر النصوص المباشر' : 'Live Visual Editor'}
          </span>
          {hasUnsavedChanges && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono font-bold">
              Unsaved
            </span>
          )}
        </button>
      ) : (
        /* Full Floating Editor HUD */
        <div className="pointer-events-auto w-full max-w-4xl bg-[#0F1117]/95 border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl text-white space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {lang === 'ar' ? 'محرر النصوص المباشر (CMS)' : 'Live On-Page Visual Editor'}
                  </h4>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    REALTIME PREVIEW
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {lang === 'ar' ? 'عدّل أي نص لتجربته فوراً على الصفحة ومزامنته مع لوحة التحكم' : 'Type to preview instantly on the live webpage and sync with Admin CMS'}
                </p>
              </div>
            </div>

            {/* Language & Action Controls */}
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    lang === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    lang === 'ar' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  العربية
                </button>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue disabled:opacity-50 transition-all cursor-pointer"
              >
                {saving ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>{saving ? (lang === 'ar' ? 'جارٍ الحفظ…' : 'Saving…') : (lang === 'ar' ? 'حفظ ونشر' : 'Save & Publish')}</span>
              </button>

              {hasUnsavedChanges && (
                <button
                  onClick={handleDiscard}
                  disabled={saving}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  title="Discard changes and reload"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                title="Minimize Editor"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Feedback Alerts */}
          {saveSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'تم حفظ التعديلات بنجاح وتحديث لوحة التحكم والموقع مباشرة!' : 'Changes saved! Text updated live on the website and synced with the Admin Panel.'}</span>
              </div>
              <a
                href="/admin/content/pages"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View in Admin CMS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 pb-2">
            {[
              { id: 'hero', label: lang === 'ar' ? 'الهيدر والشعار (Hero)' : 'Hero & Slogans' },
              { id: 'metrics', label: lang === 'ar' ? 'أرقام المجموعة (Metrics)' : 'Metrics & Counters' },
              { id: 'synergy', label: lang === 'ar' ? 'سلسلة القيمة (Synergy)' : 'Holding Synergy' },
              { id: 'ceo', label: lang === 'ar' ? 'كلمة القيادة (CEO Quote)' : 'CEO & Leadership' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Live Editable Fields Form Container */}
          <div className="max-h-60 overflow-y-auto pr-1 space-y-3 text-xs">
            
            {/* TAB 1: HERO & SLOGANS */}
            {activeTab === 'hero' && (
              <div className="space-y-3">
                
                {/* 3-Line Headline Section */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    // Main 3-Line Slogan Headline
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 1 (English)</label>
                      <input
                        type="text"
                        value={localEdits.home?.hero?.title_line1_en || ''}
                        onChange={(e) => handleFieldChange('home', 'hero', 'title_line1_en', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Solid Vision."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 1 (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits.home?.hero?.title_line1_ar || ''}
                        onChange={(e) => handleFieldChange('home', 'hero', 'title_line1_ar', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-blue-500"
                        placeholder="رؤية راسخة."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Sapphire Accent] (English)</label>
                      <input
                        type="text"
                        value={localEdits.home?.hero?.title_line2_en || ''}
                        onChange={(e) => handleFieldChange('home', 'hero', 'title_line2_en', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200 focus:outline-none focus:border-sky-400"
                        placeholder="Diverse Sectors."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Sapphire Accent] (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits.home?.hero?.title_line2_ar || ''}
                        onChange={(e) => handleFieldChange('home', 'hero', 'title_line2_ar', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200 focus:outline-none focus:border-sky-400"
                        placeholder="قطاعات متعددة."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 3 (English)</label>
                      <input
                        type="text"
                        value={localEdits.home?.hero?.title_line3_en || ''}
                        onChange={(e) => handleFieldChange('home', 'hero', 'title_line3_en', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Promising Future."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 3 (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits.home?.hero?.title_line3_ar || ''}
                        onChange={(e) => handleFieldChange('home', 'hero', 'title_line3_ar', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-blue-500"
                        placeholder="مستقبل واعد."
                      />
                    </div>
                  </div>
                </div>

                {/* Subtitle Body */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                    <textarea
                      rows={2}
                      value={localEdits.home?.hero?.body_en || ''}
                      onChange={(e) => handleFieldChange('home', 'hero', 'body_en', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={localEdits.home?.hero?.body_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'hero', 'body_ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: METRICS & COUNTERS */}
            {activeTab === 'metrics' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-sky-400">Metric 1 (Hospitality)</span>
                      <input
                        type="text"
                        value={localEdits.home?.metrics?.stat1_num || '6'}
                        onChange={(e) => handleFieldChange('home', 'metrics', 'stat1_num', e.target.value)}
                        className="w-14 text-center px-2 py-1 rounded-lg bg-black/50 border border-sky-400/40 text-sky-300 font-mono font-bold text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      value={localEdits.home?.metrics?.stat1_text_en || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat1_text_en', e.target.value)}
                      placeholder="Label in English"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={localEdits.home?.metrics?.stat1_text_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat1_text_ar', e.target.value)}
                      placeholder="الوصف بالعربية"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400">Metric 2 (Manufacturing)</span>
                      <input
                        type="text"
                        value={localEdits.home?.metrics?.stat2_num || '3'}
                        onChange={(e) => handleFieldChange('home', 'metrics', 'stat2_num', e.target.value)}
                        className="w-14 text-center px-2 py-1 rounded-lg bg-black/50 border border-emerald-400/40 text-emerald-300 font-mono font-bold text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      value={localEdits.home?.metrics?.stat2_text_en || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat2_text_en', e.target.value)}
                      placeholder="Label in English"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={localEdits.home?.metrics?.stat2_text_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat2_text_ar', e.target.value)}
                      placeholder="الوصف بالعربية"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400">Metric 3 (Professionals)</span>
                      <input
                        type="text"
                        value={localEdits.home?.metrics?.stat3_num || '80+'}
                        onChange={(e) => handleFieldChange('home', 'metrics', 'stat3_num', e.target.value)}
                        className="w-14 text-center px-2 py-1 rounded-lg bg-black/50 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      value={localEdits.home?.metrics?.stat3_text_en || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat3_text_en', e.target.value)}
                      placeholder="Label in English"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={localEdits.home?.metrics?.stat3_text_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat3_text_ar', e.target.value)}
                      placeholder="الوصف بالعربية"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-blue-400">Metric 4 (Sectors)</span>
                      <input
                        type="text"
                        value={localEdits.home?.metrics?.stat4_num || '3'}
                        onChange={(e) => handleFieldChange('home', 'metrics', 'stat4_num', e.target.value)}
                        className="w-14 text-center px-2 py-1 rounded-lg bg-black/50 border border-blue-400/40 text-blue-300 font-mono font-bold text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      value={localEdits.home?.metrics?.stat4_text_en || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat4_text_en', e.target.value)}
                      placeholder="Label in English"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={localEdits.home?.metrics?.stat4_text_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'metrics', 'stat4_text_ar', e.target.value)}
                      placeholder="الوصف بالعربية"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: HOLDING SYNERGY */}
            {activeTab === 'synergy' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Synergy Heading (English)</label>
                    <input
                      type="text"
                      value={localEdits.home?.synergy?.heading_en || ''}
                      onChange={(e) => handleFieldChange('home', 'synergy', 'heading_en', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Synergy Heading (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={localEdits.home?.synergy?.heading_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'synergy', 'heading_ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Synergy Intro (English)</label>
                    <textarea
                      rows={2}
                      value={localEdits.home?.synergy?.intro_en || ''}
                      onChange={(e) => handleFieldChange('home', 'synergy', 'intro_en', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Synergy Intro (Arabic)</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={localEdits.home?.synergy?.intro_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'synergy', 'intro_ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CEO QUOTE */}
            {activeTab === 'ceo' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">CEO Quote (English)</label>
                    <textarea
                      rows={3}
                      value={localEdits.home?.ceo?.quote_en || ''}
                      onChange={(e) => handleFieldChange('home', 'ceo', 'quote_en', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">CEO Quote (Arabic)</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={localEdits.home?.ceo?.quote_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'ceo', 'quote_ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Leader Name (English)</label>
                    <input
                      type="text"
                      value={localEdits.home?.ceo?.name_en || ''}
                      onChange={(e) => handleFieldChange('home', 'ceo', 'name_en', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Leader Name (Arabic)</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={localEdits.home?.ceo?.name_ar || ''}
                      onChange={(e) => handleFieldChange('home', 'ceo', 'name_ar', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Quick Links */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
            <span>WD Group Realtime Visual CMS</span>
            <a
              href="/admin/content/pages"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1 font-mono"
            >
              <span>Full Admin CMS Dashboard</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
