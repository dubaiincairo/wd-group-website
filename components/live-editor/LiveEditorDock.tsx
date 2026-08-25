'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Building2,
  Factory,
  HardHat,
  Briefcase,
  Home,
  Info,
  Layers,
  Sparkles,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';

function createDefaultState(dict: any) {
  return {
    home: {
      hero: {
        eyebrow_en: dict?.home?.hero?.eyebrow || 'WD Group for Business',
        eyebrow_ar: dict?.home?.hero?.eyebrow || 'مجموعة دبليو دي للأعمال',
        title_line1_en: dict?.home?.hero?.title_line1 || 'Solid Vision.',
        title_line1_ar: dict?.home?.hero?.title_line1 || 'رؤية راسخة.',
        title_line2_en: dict?.home?.hero?.title_line2 || 'Diverse Sectors.',
        title_line2_ar: dict?.home?.hero?.title_line2 || 'قطاعات متعددة.',
        title_line3_en: dict?.home?.hero?.title_line3 || 'Promising Future.',
        title_line3_ar: dict?.home?.hero?.title_line3 || 'مستقبل واعد.',
        body_en: dict?.home?.hero?.body || '',
        body_ar: dict?.home?.hero?.body || '',
      },
      media: {
        hero_video_hospitality: dict?.home?.media?.hero_video_hospitality || '/videos/hospitality.mp4',
        hero_video_manufacturing: dict?.home?.media?.hero_video_manufacturing || '/videos/manufacturing.mp4',
        hero_video_contracting: dict?.home?.media?.hero_video_contracting || '/videos/contracting.mp4',
        sector_photo_hospitality: dict?.home?.media?.sector_photo_hospitality || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        sector_photo_manufacturing: dict?.home?.media?.sector_photo_manufacturing || 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
        sector_photo_contracting: dict?.home?.media?.sector_photo_contracting || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      },
      metrics: {
        stat1_num: dict?.home?.metrics?.stat1_num || '6',
        stat1_text_en: dict?.home?.metrics?.stat1_text || 'Hospitality properties across Saudi Arabia',
        stat1_text_ar: dict?.home?.metrics?.stat1_text || 'منشآت ضيافة في المملكة العربية السعودية',
        stat2_num: dict?.home?.metrics?.stat2_num || '3',
        stat2_text_en: dict?.home?.metrics?.stat2_text || 'Specialized factories',
        stat2_text_ar: dict?.home?.metrics?.stat2_text || 'مصانع متخصصة',
        stat3_num: dict?.home?.metrics?.stat3_num || '80+',
        stat3_text_en: dict?.home?.metrics?.stat3_text || 'Professionals across our sectors',
        stat3_text_ar: dict?.home?.metrics?.stat3_text || 'موظفًا وخبيرًا في مختلف قطاعاتنا',
        stat4_num: dict?.home?.metrics?.stat4_num || '3',
        stat4_text_en: dict?.home?.metrics?.stat4_text || 'Strategic business sectors',
        stat4_text_ar: dict?.home?.metrics?.stat4_text || 'قطاعات أعمال استراتيجية',
      },
      synergy: {
        heading_en: dict?.home?.synergy?.heading || 'From Production to Delivery and Operation',
        heading_ar: dict?.home?.synergy?.heading || 'من الإنتاج إلى التنفيذ والتشغيل',
        intro_en: dict?.home?.synergy?.intro || '',
        intro_ar: dict?.home?.synergy?.intro || '',
      },
      ceo: {
        quote_en: dict?.home?.ceo?.quote || '',
        quote_ar: dict?.home?.ceo?.quote || '',
        name_en: dict?.home?.ceo?.name || 'Eng. Mohammed Ali Saleh Al-Shaibani',
        name_ar: dict?.home?.ceo?.name || 'المهندس محمد علي صالح الشيباني',
        title_en: dict?.home?.ceo?.title || 'Chief Executive Officer',
        title_ar: dict?.home?.ceo?.title || 'المدير التنفيذي',
      },
    },
    about: {
      hero_eyebrow_en: dict?.about?.hero?.eyebrow || 'About WD Group',
      hero_eyebrow_ar: dict?.about?.hero?.eyebrow || 'عن مجموعة دبليو دي',
      hero_title_en: dict?.about?.hero?.title || 'A Saudi Group Built for Sustainable Growth',
      hero_title_ar: dict?.about?.hero?.title || 'مجموعة سعودية تنمو برؤية مستدامة',
      hero_body_en: dict?.about?.hero?.body || '',
      hero_body_ar: dict?.about?.hero?.body || '',
      story_heading_en: dict?.about?.story?.heading || 'Experience Connected by One Vision',
      story_heading_ar: dict?.about?.story?.heading || 'خبرات تجمعها رؤية واحدة',
      story_body_en: dict?.about?.story?.body || '',
      story_body_ar: dict?.about?.story?.body || '',
      governance_statement_en: dict?.about?.governance?.statement || '',
      governance_statement_ar: dict?.about?.governance?.statement || '',
    },
    hospitality: {
      hero_eyebrow_en: dict?.hospitality?.hero?.eyebrow || 'SwissBlue Hospitality',
      hero_eyebrow_ar: dict?.hospitality?.hero?.eyebrow || 'ضيافة SwissBlue',
      hero_title_en: dict?.hospitality?.hero?.title || 'Comfortable Stays. Thoughtful Service.',
      hero_title_ar: dict?.hospitality?.hero?.title || 'إقامة مريحة وخدمة باهتمام',
      hero_body_en: dict?.hospitality?.hero?.body || '',
      hero_body_ar: dict?.hospitality?.hero?.body || '',
    },
    manufacturing: {
      hero_eyebrow_en: dict?.manufacturing?.hero?.eyebrow || 'GreenWood Furniture & More',
      hero_eyebrow_ar: dict?.manufacturing?.hero?.eyebrow || 'GreenWood للأثاث والديكور',
      hero_title_en: dict?.manufacturing?.hero?.title || 'Precision Manufacturing. Made for Every Space.',
      hero_title_ar: dict?.manufacturing?.hero?.title || 'تصنيع دقيق لكل مساحة',
      hero_body_en: dict?.manufacturing?.hero?.body || '',
      hero_body_ar: dict?.manufacturing?.hero?.body || '',
    },
    contracting: {
      hero_eyebrow_en: dict?.contracting?.hero?.eyebrow || 'Engineering Excellence',
      hero_eyebrow_ar: dict?.contracting?.hero?.eyebrow || 'تميز هندسي',
      hero_title_en: dict?.contracting?.hero?.title || 'From Blueprint to Handover',
      hero_title_ar: dict?.contracting?.hero?.title || 'من المخطط إلى التسليم',
      hero_body_en: dict?.contracting?.hero?.body || '',
      hero_body_ar: dict?.contracting?.hero?.body || '',
    },
    careers: {
      hero_eyebrow_en: dict?.careers?.hero?.eyebrow || 'Careers at WD Group',
      hero_eyebrow_ar: dict?.careers?.hero?.eyebrow || 'الوظائف في مجموعة دبليو دي',
      hero_title_en: dict?.careers?.hero?.title || 'Build Your Future With Us',
      hero_title_ar: dict?.careers?.hero?.title || 'ابنِ مستقبلك معنا',
      hero_body_en: dict?.careers?.hero?.body || '',
      hero_body_ar: dict?.careers?.hero?.body || '',
      hero_proof_en: dict?.careers?.hero?.proof || '80+ professionals across our sectors',
      hero_proof_ar: dict?.careers?.hero?.proof || 'أكثر من 80 موظفًا وخبيرًا في قطاعاتنا',
    },
    contact: {
      hero_eyebrow_en: dict?.contact?.hero?.eyebrow || 'CONTACT WD GROUP',
      hero_eyebrow_ar: dict?.contact?.hero?.eyebrow || 'تواصل مع مجموعة دبليو دي',
      hero_title_en: dict?.contact?.hero?.title || "Let's Start the Right Conversation",
      hero_title_ar: dict?.contact?.hero?.title || 'لنبدأ الحوار المناسب',
      hero_body_en: dict?.contact?.hero?.body || '',
      hero_body_ar: dict?.contact?.hero?.body || '',
      hq_address_en: dict?.contact?.cards?.hq_address || 'Prince Mishaal Street, Najran, Kingdom of Saudi Arabia',
      hq_address_ar: dict?.contact?.cards?.hq_address || 'شارع الأمير مشعل، نجران، المملكة العربية السعودية',
      general_email: dict?.contact?.cards?.general_email || 'info@wdgroup.com.sa',
      primary_phone: dict?.contact?.cards?.primary_phone || '+966 17 522 2229',
    },
    settings: {
      headquarters_en: dict?.contact?.cards?.hq_address || 'Prince Mishaal Street, Najran, Kingdom of Saudi Arabia',
      headquarters_ar: dict?.contact?.cards?.hq_address || 'شارع الأمير مشعل، نجران، المملكة العربية السعودية',
      general_email: 'info@wdgroup.com.sa',
      primary_phone: '+966 17 522 2229',
    }
  };
}

export default function LiveEditorDock() {
  const pathname = usePathname();
  const { lang, setLanguage, dict, setDynamicContent } = useLanguage();

  const [isMinimized, setIsMinimized] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localEdits, setLocalEdits] = useState<any>(() => createDefaultState(dict));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Derive current page from pathname
  const getCurrentPageKey = (path: string): 'home' | 'about' | 'hospitality' | 'manufacturing' | 'contracting' | 'careers' | 'contact' => {
    if (!path || path === '/') return 'home';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/sectors/hospitality')) return 'hospitality';
    if (path.startsWith('/sectors/manufacturing')) return 'manufacturing';
    if (path.startsWith('/sectors/contracting')) return 'contracting';
    if (path.startsWith('/careers')) return 'careers';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const [selectedPage, setSelectedPage] = useState<'home' | 'about' | 'hospitality' | 'manufacturing' | 'contracting' | 'careers' | 'contact'>('home');

  // Sync selectedPage whenever pathname changes
  useEffect(() => {
    if (pathname) {
      setSelectedPage(getCurrentPageKey(pathname));
    }
  }, [pathname]);

  // Suppress completely on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Initialize and merge content from API
  useEffect(() => {
    async function initEditorContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const d = await res.json();
          if (d.data) {
            setLocalEdits((prev: any) => ({
              ...(prev || createDefaultState(dict)),
              ...d.data,
              home: {
                ...(prev?.home || {}),
                ...(d.data?.home || {}),
                hero: {
                  ...(prev?.home?.hero || {}),
                  ...(d.data?.home?.hero || {}),
                },
                media: {
                  ...(prev?.home?.media || {}),
                  ...(d.data?.home?.media || {}),
                }
              }
            }));
          }
        }
      } catch (e) {
        // Fallback already in place
      }
    }

    initEditorContent();
  }, []);

  // Update a nested field and broadcast to LanguageContext immediately
  const updateField = (path: string[], val: any) => {
    setLocalEdits((prev: any) => {
      const base = prev ? JSON.parse(JSON.stringify(prev)) : createDefaultState(dict);
      let curr = base;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!curr[key]) curr[key] = {};
        curr = curr[key];
      }
      curr[path[path.length - 1]] = val;

      // Broadcast to dynamic content context immediately
      setDynamicContent(base);
      setHasUnsavedChanges(true);
      return base;
    });
  };

  // Save changes to database API
  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage(null);

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

  const PAGE_OPTIONS = [
    { id: 'home', label: lang === 'ar' ? 'الرئيسية (/)' : 'Homepage (/)', icon: Home },
    { id: 'about', label: lang === 'ar' ? 'من نحن (/about)' : 'About Us (/about)', icon: Info },
    { id: 'hospitality', label: lang === 'ar' ? 'قطاع الضيافة' : 'Hospitality', icon: Building2 },
    { id: 'manufacturing', label: lang === 'ar' ? 'قطاع التصنيع' : 'Manufacturing', icon: Factory },
    { id: 'contracting', label: lang === 'ar' ? 'قطاع المقاولات' : 'Contracting', icon: HardHat },
    { id: 'careers', label: lang === 'ar' ? 'الوظائف (/careers)' : 'Careers (/careers)', icon: Briefcase },
    { id: 'contact', label: lang === 'ar' ? 'تواصل معنا (/contact)' : 'Contact Us (/contact)', icon: Mail },
  ];

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
      
      {/* Minimized Floating Launcher Badge */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0F1117]/95 hover:bg-[#151922] text-white border border-blue-500/40 hover:border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.4)] backdrop-blur-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Live On-Page Visual Editor"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <Edit3 className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold tracking-wide">
            {lang === 'ar' ? `محرر الصفحة: ${pathname || '/'}` : `Live Editor: ${pathname || '/'}`}
          </span>
          {hasUnsavedChanges && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono font-bold">
              Unsaved
            </span>
          )}
        </button>
      ) : (
        /* Full Floating Editor HUD */
        <div className="pointer-events-auto w-full max-w-4xl bg-[#0F1117]/95 border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl text-white space-y-3.5 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {lang === 'ar' ? 'محرر النصوص والوسائط المباشر' : 'Live On-Page Visual Editor'}
                  </h4>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    MATCHING URL: {pathname || '/'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {lang === 'ar' ? 'التعديلات تنعكس مباشرة أثناء الكتابة وتُحفظ في قاعدة البيانات' : 'Type to preview changes live and sync directly with the live database'}
                </p>
              </div>
            </div>

            {/* Language & Action Controls */}
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    lang === 'en' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    lang === 'ar' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  العربية
                </button>
              </div>

              <button
                type="button"
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
                  type="button"
                  onClick={handleDiscard}
                  disabled={saving}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                  title="Discard changes and reload"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
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
                <span>{lang === 'ar' ? 'تم حفظ التعديلات وتحديث لوحة التحكم والموقع مباشرة!' : 'Changes saved! Synced live with database.'}</span>
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

          {/* Active Page Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 pb-2">
            {PAGE_OPTIONS.map((page) => {
              const Icon = page.icon;
              const isSelected = selectedPage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => setSelectedPage(page.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400/50'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live Editable Fields Container */}
          <div className="max-h-72 overflow-y-auto pr-1 space-y-3.5 text-xs">
            
            {/* ══════════ PAGE 1: HOMEPAGE (/) ══════════ */}
            {selectedPage === 'home' && (
              <div className="space-y-3">
                {/* 3-Line Headline Section */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    // Homepage 3-Line Slogan Headline
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 1 (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line1_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line1_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="Solid Vision."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 1 (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.title_line1_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line1_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="رؤية راسخة."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Sapphire Accent] (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line2_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line2_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200"
                        placeholder="Diverse Sectors."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Sapphire Accent] (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.title_line2_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line2_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200"
                        placeholder="قطاعات متعددة."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 3 (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line3_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line3_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="Promising Future."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Line 3 (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.hero?.title_line3_ar || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line3_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
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
                      value={localEdits?.home?.hero?.body_en || ''}
                      onChange={(e) => updateField(['home', 'hero', 'body_en'], e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={localEdits?.home?.hero?.body_ar || ''}
                      onChange={(e) => updateField(['home', 'hero', 'body_ar'], e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                    />
                  </div>
                </div>

                {/* Homepage Media Uploaders */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    // Hero Background Videos & Sector Photos
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <MediaFieldUploader
                      label="SwissBlue Video"
                      accept="video"
                      value={localEdits?.home?.media?.hero_video_hospitality || '/videos/hospitality.mp4'}
                      onChange={(url) => updateField(['home', 'media', 'hero_video_hospitality'], url)}
                    />
                    <MediaFieldUploader
                      label="GreenWood Video"
                      accept="video"
                      value={localEdits?.home?.media?.hero_video_manufacturing || '/videos/manufacturing.mp4'}
                      onChange={(url) => updateField(['home', 'media', 'hero_video_manufacturing'], url)}
                    />
                    <MediaFieldUploader
                      label="Contracting Video"
                      accept="video"
                      value={localEdits?.home?.media?.hero_video_contracting || '/videos/contracting.mp4'}
                      onChange={(url) => updateField(['home', 'media', 'hero_video_contracting'], url)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <MediaFieldUploader
                      label="Hospitality Photo"
                      value={localEdits?.home?.media?.sector_photo_hospitality || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'}
                      onChange={(url) => updateField(['home', 'media', 'sector_photo_hospitality'], url)}
                    />
                    <MediaFieldUploader
                      label="Manufacturing Photo"
                      value={localEdits?.home?.media?.sector_photo_manufacturing || 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'}
                      onChange={(url) => updateField(['home', 'media', 'sector_photo_manufacturing'], url)}
                    />
                    <MediaFieldUploader
                      label="Contracting Photo"
                      value={localEdits?.home?.media?.sector_photo_contracting || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                      onChange={(url) => updateField(['home', 'media', 'sector_photo_contracting'], url)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 2: CONTACT US (/contact) ══════════ */}
            {selectedPage === 'contact' && (
              <div className="space-y-3">
                {/* Contact Hero */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    // Contact Us Header & Tagline
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Eyebrow (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.hero_eyebrow_en || ''}
                        onChange={(e) => updateField(['contact', 'hero_eyebrow_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="CONTACT WD GROUP"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Eyebrow (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contact?.hero_eyebrow_ar || ''}
                        onChange={(e) => updateField(['contact', 'hero_eyebrow_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="تواصل مع مجموعة دبليو دي"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Headline (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.hero_title_en || ''}
                        onChange={(e) => updateField(['contact', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="Let's Start the Right Conversation"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Headline (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contact?.hero_title_ar || ''}
                        onChange={(e) => updateField(['contact', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="لنبدأ الحوار المناسب"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Body Description (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.contact?.hero_body_en || ''}
                        onChange={(e) => updateField(['contact', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Body Description (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.contact?.hero_body_ar || ''}
                        onChange={(e) => updateField(['contact', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Headquarters and Contact Details */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                    // Headquarters & Direct Communications
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>Headquarters Address (English)</span>
                      </label>
                      <input
                        type="text"
                        value={localEdits?.settings?.headquarters_en || localEdits?.contact?.hq_address_en || ''}
                        onChange={(e) => {
                          updateField(['settings', 'headquarters_en'], e.target.value);
                          updateField(['contact', 'hq_address_en'], e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="Prince Mishaal Street, Najran, KSA"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>Headquarters Address (Arabic)</span>
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.settings?.headquarters_ar || localEdits?.contact?.hq_address_ar || ''}
                        onChange={(e) => {
                          updateField(['settings', 'headquarters_ar'], e.target.value);
                          updateField(['contact', 'hq_address_ar'], e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="شارع الأمير مشعل، نجران، المملكة العربية السعودية"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-blue-400" />
                        <span>Corporate Email</span>
                      </label>
                      <input
                        type="email"
                        value={localEdits?.settings?.general_email || localEdits?.contact?.general_email || ''}
                        onChange={(e) => {
                          updateField(['settings', 'general_email'], e.target.value);
                          updateField(['contact', 'general_email'], e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="info@wdgroup.com.sa"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-amber-400" />
                        <span>Primary Phone</span>
                      </label>
                      <input
                        type="tel"
                        value={localEdits?.settings?.primary_phone || localEdits?.contact?.primary_phone || ''}
                        onChange={(e) => {
                          updateField(['settings', 'primary_phone'], e.target.value);
                          updateField(['contact', 'primary_phone'], e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                        placeholder="+966 17 522 2229"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 3: ABOUT US (/about) ══════════ */}
            {selectedPage === 'about' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    // About Us Page Headlines
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Headline (English)</label>
                      <input
                        type="text"
                        value={localEdits?.about?.hero_title_en || ''}
                        onChange={(e) => updateField(['about', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Headline (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.about?.hero_title_ar || ''}
                        onChange={(e) => updateField(['about', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Story Body Narrative (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.about?.story_body_en || ''}
                        onChange={(e) => updateField(['about', 'story_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Story Body Narrative (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.about?.story_body_ar || ''}
                        onChange={(e) => updateField(['about', 'story_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 4: HOSPITALITY (/sectors/hospitality) ══════════ */}
            {selectedPage === 'hospitality' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase">
                    // SwissBlue Hospitality Content
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.hospitality?.hero_title_en || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.hospitality?.hero_title_ar || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.hospitality?.hero_body_en || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.hospitality?.hero_body_ar || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 5: MANUFACTURING (/sectors/manufacturing) ══════════ */}
            {selectedPage === 'manufacturing' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                    // GreenWood Manufacturing Content
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.manufacturing?.hero_title_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.manufacturing?.hero_title_ar || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.manufacturing?.hero_body_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.manufacturing?.hero_body_ar || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 6: CONTRACTING (/sectors/contracting) ══════════ */}
            {selectedPage === 'contracting' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    // Contracting & Fit-Out Content
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contracting?.hero_title_en || ''}
                        onChange={(e) => updateField(['contracting', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contracting?.hero_title_ar || ''}
                        onChange={(e) => updateField(['contracting', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.contracting?.hero_body_en || ''}
                        onChange={(e) => updateField(['contracting', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.contracting?.hero_body_ar || ''}
                        onChange={(e) => updateField(['contracting', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 7: CAREERS (/careers) ══════════ */}
            {selectedPage === 'careers' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-purple-400 uppercase">
                    // Careers Content
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.careers?.hero_title_en || ''}
                        onChange={(e) => updateField(['careers', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.careers?.hero_title_ar || ''}
                        onChange={(e) => updateField(['careers', 'hero_title_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={3}
                        value={localEdits?.careers?.hero_body_en || ''}
                        onChange={(e) => updateField(['careers', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={localEdits?.careers?.hero_body_ar || ''}
                        onChange={(e) => updateField(['careers', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
