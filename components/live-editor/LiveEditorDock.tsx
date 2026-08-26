'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ExternalLink,
  LayoutDashboard,
  ArrowUpRight,
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
  Quote,
  Handshake,
  Maximize2
} from 'lucide-react';

function createDefaultState(dict: any) {
  return {
    home: {
      hero: {
        eyebrow_en: dict?.home?.hero?.eyebrow || 'WD Group for Business',
        eyebrow_ar: dict?.home?.hero?.eyebrow || 'مجموعة دبليو دي للأعمال',
        title_line1_en: dict?.home?.hero?.title_line1 || 'Solid Vision.',
        title_line1_ar: 'رؤية راسخة.',
        title_line2_en: dict?.home?.hero?.title_line2 || 'Diverse Sectors.',
        title_line2_ar: 'قطاعات متعددة.',
        title_line3_en: dict?.home?.hero?.title_line3 || 'Promising Future.',
        title_line3_ar: 'مستقبل واعد.',
        body_en: dict?.home?.hero?.body || 'A premier multi-disciplinary Saudi business group empowering the national transformation.',
        body_ar: 'مجموعة أعمال سعودية رائدة ومتعددة القطاعات تقود مسيرة التحول الوطني.',
      },
      metrics: {
        stat1_num: dict?.home?.metrics?.stat1_num || '6',
        stat1_text_en: dict?.home?.metrics?.stat1_text || 'Hospitality properties across Saudi Arabia',
        stat1_text_ar: 'منشآت ضيافة في المملكة العربية السعودية',
        stat2_num: dict?.home?.metrics?.stat2_num || '3',
        stat2_text_en: dict?.home?.metrics?.stat2_text || 'Specialized factories',
        stat2_text_ar: 'مصانع متخصصة',
        stat3_num: dict?.home?.metrics?.stat3_num || '80+',
        stat3_text_en: dict?.home?.metrics?.stat3_text || 'Professionals across our sectors',
        stat3_text_ar: 'موظفًا وخبيرًا في مختلف قطاعاتنا',
        stat4_num: dict?.home?.metrics?.stat4_num || '3',
        stat4_text_en: dict?.home?.metrics?.stat4_text || 'Strategic business sectors',
        stat4_text_ar: 'قطاعات أعمال استراتيجية',
      },
      synergy: {
        heading_en: dict?.home?.synergy?.heading || 'Integrated Holding Synergy & Lifecycle Chain',
        heading_ar: 'سلسلة القيمة والتكامل الاستراتيجي للمجموعة',
        intro_en: dict?.home?.synergy?.intro || 'A complete lifecycle from precision factory manufacturing to turnkey interior fit-out and luxury hospitality operations.',
        intro_ar: 'دورة عمل متكاملة تبدأ من التصنيع الدقيق في المصانع إلى التنفيذ المعماري والتشغيل الفندقي الراقي.',
      },
      ceo: {
        quote_en: dict?.home?.ceo?.quote || 'Our strength lies in our integrated foundation—uniting hospitality, manufacturing, and contracting under one vision.',
        quote_ar: 'قوتنا تكمن في تكامل منظومتنا القابضة التي تجمع بين الضيافة والتصنيع والمقاولات تحت مظلة رؤية واحدة راسخة.',
        name_en: dict?.home?.ceo?.name || 'Eng. Mohammed Ali Saleh Al-Shaibani',
        name_ar: 'المهندس محمد علي صالح الشيباني',
        title_en: dict?.home?.ceo?.title || 'Chief Executive Officer',
        title_ar: 'المدير التنفيذي',
      },
    },
    about: {
      hero_eyebrow_en: 'About WD Group',
      hero_eyebrow_ar: 'عن مجموعة دبليو دي',
      hero_title_en: 'A Saudi Group Built for Sustainable Growth',
      hero_title_ar: 'مجموعة سعودية تنمو برؤية مستدامة',
      hero_body_en: 'Established on principles of executive governance, national capability building, and multi-sector excellence.',
      hero_body_ar: 'تأسست على مبادئ الحوكمة التنفيذية وبناء الكفاءات الوطنية والتميز في مختلف القطاعات.',
      story_heading_en: 'Experience Connected by One Vision',
      story_heading_ar: 'خبرات تجمعها رؤية واحدة',
      story_body_en: 'From our origins in specialized manufacturing and construction to nationwide hospitality chains.',
      story_body_ar: 'من جذورنا في التصنيع المتخصص والإنشاءات إلى سلاسل الضيافة والفنادق على مستوى المملكة.',
      governance_statement_en: 'Committed to ethical leadership, operational transparency, and alignment with Saudi Vision 2030.',
      governance_statement_ar: 'ملتزمون بالقيادة المسؤولة والشفافية التشغيلية والتوافق التام مع رؤية السعودية 2030.',
    },
    hospitality: {
      hero_eyebrow_en: 'SwissBlue Hospitality',
      hero_eyebrow_ar: 'ضيافة SwissBlue',
      hero_title_en: 'Comfortable Stays. Thoughtful Service.',
      hero_title_ar: 'إقامة مريحة وخدمة باهتمام أصيل',
      hero_body_en: 'Managing premium hotel properties and serviced residences across Jeddah, Riyadh, and Jazan.',
      hero_body_ar: 'إدارة وتطوير منشآت فندقية راقية وشقق مفروشة متميزة في جدة والرياض وجازان.',
    },
    manufacturing: {
      hero_eyebrow_en: 'GreenWood Manufacturing',
      hero_eyebrow_ar: 'مصانع GreenWood للأثاث والديكور',
      hero_title_en: 'Precision Manufacturing. Made for Every Space.',
      hero_title_ar: 'تصنيع دقيق لكل مساحة معمارية',
      hero_body_en: 'Three specialized manufacturing facilities in Riyadh and Najran delivering custom woodwork, aluminum, and contract furniture.',
      hero_body_ar: 'ثلاثة مصانع متخصصة في الرياض ونجران لإنتاج أعمال النجارة والألمنيوم وأثاث المشروعات.',
    },
    contracting: {
      hero_eyebrow_en: 'Engineering Excellence',
      hero_eyebrow_ar: 'المقاولات والتنفيذ المتكامل',
      hero_title_en: 'From Blueprint to Handover',
      hero_title_ar: 'من المخطط الهندسي إلى التسليم النهائي',
      hero_body_en: 'Comprehensive turnkey contracting, commercial fit-out, MEP engineering, and project delivery.',
      hero_body_ar: 'تنفيذ شامل للمشروعات التجارية والتجهيز الداخلي والأعمال الكهروميكانيكية بأعلى معايير الجودة.',
    },
    careers: {
      hero_eyebrow_en: 'Careers at WD Group',
      hero_eyebrow_ar: 'الوظائف في مجموعة دبليو دي',
      hero_title_en: 'Build Your Future With Us',
      hero_title_ar: 'ابنِ مستقبلك المهني معنا',
      hero_body_en: 'Join an ambitious team of professionals driving Saudi transformation across diverse industries.',
      hero_body_ar: 'انضم إلى فريق طموح من الخبراء والمتخصصين الذين يقودون التحول الوطني في مختلف القطاعات.',
    },
    contact: {
      hero_eyebrow_en: 'CONTACT WD GROUP',
      hero_eyebrow_ar: 'تواصل مع مجموعة دبليو دي',
      hero_title_en: "Let's Start the Right Conversation",
      hero_title_ar: 'لنبدأ الحوار المناسب لشراكتنا',
      hero_body_en: 'Whether you represent a property, procurement team, or future employee, our team is ready.',
      hero_body_ar: 'سواء كنت تمثل مالك عقار أو فريق مشتريات أو كفاءة طموحة، فريقنا جاهز للتواصل معك.',
      hq_address_en: 'Prince Mishaal Street, Najran, Kingdom of Saudi Arabia',
      hq_address_ar: 'شارع الأمير مشعل، نجران، المملكة العربية السعودية',
      general_email: 'info@wdgroup.com.sa',
      primary_phone: '+966 17 522 2229',
    },
    settings: {
      nav_cta_en: 'Contact Us',
      nav_cta_ar: 'تواصل معنا',
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
                metrics: {
                  ...(prev?.home?.metrics || {}),
                  ...(d.data?.home?.metrics || {}),
                },
                synergy: {
                  ...(prev?.home?.synergy || {}),
                  ...(d.data?.home?.synergy || {}),
                },
                ceo: {
                  ...(prev?.home?.ceo || {}),
                  ...(d.data?.home?.ceo || {}),
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
    { id: 'hospitality', label: lang === 'ar' ? 'الضيافة (SwissBlue)' : 'Hospitality (SwissBlue)', icon: Building2 },
    { id: 'manufacturing', label: lang === 'ar' ? 'التصنيع (GreenWood)' : 'Manufacturing (GreenWood)', icon: Factory },
    { id: 'contracting', label: lang === 'ar' ? 'المقاولات (WatanDesign)' : 'Contracting (Fit-Out)', icon: HardHat },
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
            {lang === 'ar' ? `المحرر المباشر: ${pathname || '/'}` : `Live Visual Editor: ${pathname || '/'}`}
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
                    {lang === 'ar' ? 'محرر النصوص المباشر' : 'Live On-Page Visual Editor'}
                  </h4>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    MATCHING: {pathname || '/'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  {lang === 'ar' ? 'التعديلات تنعكس فوراً أثناء الكتابة وتُحفظ مباشرة في قاعدة البيانات' : 'Type to preview live and sync directly with the live database'}
                </p>
              </div>
            </div>

            {/* Quick Links & Actions */}
            <div className="flex items-center gap-2">
              
              {/* Direct Link to Main Admin Dashboard */}
              <Link
                href="/admin/dashboard"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all whitespace-nowrap cursor-pointer"
                title="Open Main Admin Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'لوحة التحكم' : 'Main Dashboard'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              {/* Language Switcher */}
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

              {/* Save & Publish Button */}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap leading-none"
              >
                {saving ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span className="whitespace-nowrap leading-none">{saving ? (lang === 'ar' ? 'جارٍ الحفظ…' : 'Saving…') : (lang === 'ar' ? 'حفظ ونشر' : 'Save & Publish')}</span>
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
                <span>{lang === 'ar' ? 'تم حفظ ونشر التعديلات بنجاح وتحديث قاعدة البيانات!' : 'Changes saved & published live to database!'}</span>
              </div>
              <Link
                href="/admin/content/pages"
                className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View Full CMS</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
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
                    Homepage 3-Line Slogan Headline
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
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Accent] (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.hero?.title_line2_en || ''}
                        onChange={(e) => updateField(['home', 'hero', 'title_line2_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-sky-950/40 border border-sky-500/40 text-sky-200"
                        placeholder="Diverse Sectors."
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-sky-400 font-semibold mb-1">Line 2 [Accent] (Arabic)</label>
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

                {/* Subtitle & Header CTA */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase">
                    Narrative Subtitle & Header Navigation CTA
                  </div>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="block text-[11px] text-[#C9A86A] font-semibold mb-1">Header Top-Right Button (English)</label>
                      <input
                        type="text"
                        value={localEdits?.settings?.nav_cta_en || 'Contact Us'}
                        onChange={(e) => updateField(['settings', 'nav_cta_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-[#C9A86A]/40 text-[#C9A86A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#C9A86A] font-semibold mb-1">Header Top-Right Button (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.settings?.nav_cta_ar || 'تواصل معنا'}
                        onChange={(e) => updateField(['settings', 'nav_cta_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-[#C9A86A]/40 text-[#C9A86A]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4-Metric Statistics Bar */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    4-Metric Statistics Bar
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Stat 1 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-sky-400">Stat 1</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat1_num || '6'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat1_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-sky-950 border border-sky-500/40 text-sky-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat1_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat1_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat1_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat1_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>

                    {/* Stat 2 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400">Stat 2</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat2_num || '3'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat2_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat2_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat2_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat2_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat2_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>

                    {/* Stat 3 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-purple-400">Stat 3</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat3_num || '80+'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat3_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat3_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat3_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat3_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat3_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>

                    {/* Stat 4 */}
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400">Stat 4</span>
                        <input
                          type="text"
                          value={localEdits?.home?.metrics?.stat4_num || '3'}
                          onChange={(e) => updateField(['home', 'metrics', 'stat4_num'], e.target.value)}
                          className="w-12 text-center px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        value={localEdits?.home?.metrics?.stat4_text_en || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat4_text_en'], e.target.value)}
                        placeholder="Label EN"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.metrics?.stat4_text_ar || ''}
                        onChange={(e) => updateField(['home', 'metrics', 'stat4_text_ar'], e.target.value)}
                        placeholder="الوصف AR"
                        className="w-full px-2 py-1 rounded bg-black/50 border border-white/10 text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* CEO Leadership Statement */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-[#C9A86A] uppercase">
                    CEO Leadership Statement
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Executive Quote (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.home?.ceo?.quote_en || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'quote_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Executive Quote (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.home?.ceo?.quote_ar || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'quote_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Leader Name (English)</label>
                      <input
                        type="text"
                        value={localEdits?.home?.ceo?.name_en || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'name_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Leader Name (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.home?.ceo?.name_ar || ''}
                        onChange={(e) => updateField(['home', 'ceo', 'name_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ══════════ PAGE 2: ABOUT US (/about) ══════════ */}
            {selectedPage === 'about' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    About Us Page Hero & Story
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={localEdits?.about?.hero_title_en || ''}
                        onChange={(e) => updateField(['about', 'hero_title_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Title (Arabic)</label>
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
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={localEdits?.about?.hero_body_en || ''}
                        onChange={(e) => updateField(['about', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={localEdits?.about?.hero_body_ar || ''}
                        onChange={(e) => updateField(['about', 'hero_body_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════ PAGE 3: HOSPITALITY ══════════ */}
            {selectedPage === 'hospitality' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-sky-500/20 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase">
                    SwissBlue Hospitality Page Content
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
                        rows={2}
                        value={localEdits?.hospitality?.hero_body_en || ''}
                        onChange={(e) => updateField(['hospitality', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
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

            {/* ══════════ PAGE 4: MANUFACTURING ══════════ */}
            {selectedPage === 'manufacturing' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-emerald-500/20 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                    GreenWood Manufacturing Page Content
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
                        rows={2}
                        value={localEdits?.manufacturing?.hero_body_en || ''}
                        onChange={(e) => updateField(['manufacturing', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
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

            {/* ══════════ PAGE 5: CONTRACTING ══════════ */}
            {selectedPage === 'contracting' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Contracting & Fit-Out Page Content
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
                        rows={2}
                        value={localEdits?.contracting?.hero_body_en || ''}
                        onChange={(e) => updateField(['contracting', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
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

            {/* ══════════ PAGE 6: CAREERS ══════════ */}
            {selectedPage === 'careers' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-purple-400 uppercase">
                    Careers Page Content
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
                        rows={2}
                        value={localEdits?.careers?.hero_body_en || ''}
                        onChange={(e) => updateField(['careers', 'hero_body_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Hero Subtitle (Arabic)</label>
                      <textarea
                        rows={2}
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

            {/* ══════════ PAGE 7: CONTACT US ══════════ */}
            {selectedPage === 'contact' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    Contact Information & Credentials
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">HQ Address (English)</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.hq_address_en || ''}
                        onChange={(e) => updateField(['contact', 'hq_address_en'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">HQ Address (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={localEdits?.contact?.hq_address_ar || ''}
                        onChange={(e) => updateField(['contact', 'hq_address_ar'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">General Email</label>
                      <input
                        type="email"
                        value={localEdits?.contact?.general_email || 'info@wdgroup.com.sa'}
                        onChange={(e) => updateField(['contact', 'general_email'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Primary Phone</label>
                      <input
                        type="text"
                        value={localEdits?.contact?.primary_phone || '+966 17 522 2229'}
                        onChange={(e) => updateField(['contact', 'primary_phone'], e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Persistent Footer with Direct Link to Main Admin Dashboard */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="font-mono text-[11px] text-zinc-300 font-semibold">WD GROUP REALTIME LIVE CMS</span>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-500 transition-all font-mono text-[11px] font-bold shadow-sm cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Main Dashboard</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>

              <Link
                href="/admin/content/pages"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all font-mono text-[11px] font-semibold cursor-pointer"
              >
                <span>Full Pages CMS</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
