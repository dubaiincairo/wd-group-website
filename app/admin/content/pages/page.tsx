'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  Globe, 
  Home, 
  Compass, 
  Building2, 
  Factory, 
  HardHat, 
  CheckCircle2,
  Sparkles,
  Layers,
  Eye,
  Image as ImageIcon,
  Video,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Award,
  Users,
  Quote,
  Handshake,
  FileText
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
import { useToast } from '@/components/admin/ToastProvider';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import type { SiteContentPayload } from '@/lib/admin/types';

function createDefaultContent(): SiteContentPayload {
  const en = translations.en;
  const ar = translations.ar;

  return {
    home: {
      hero: {
        eyebrow_en: en.home.hero.eyebrow,
        eyebrow_ar: ar.home.hero.eyebrow,
        kicker_en: en.home.hero.kicker,
        kicker_ar: ar.home.hero.kicker,
        title_en: en.home.hero.title,
        title_ar: ar.home.hero.title,
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
        dock_hospitality_label_ar: ar.home.hero.dock?.hospitality_label || 'الضيافة (SwissBlue)',
        dock_hospitality_badge_en: en.home.hero.dock?.hospitality_badge || '6 Properties',
        dock_hospitality_badge_ar: ar.home.hero.dock?.hospitality_badge || '6 منشآت',
        dock_manufacturing_label_en: en.home.hero.dock?.manufacturing_label || 'Manufacturing (GreenWood)',
        dock_manufacturing_label_ar: ar.home.hero.dock?.manufacturing_label || 'التصنيع والأثاث (GreenWood)',
        dock_manufacturing_badge_en: en.home.hero.dock?.manufacturing_badge || '3 Factories',
        dock_manufacturing_badge_ar: ar.home.hero.dock?.manufacturing_badge || '3 مصانع',
        dock_contracting_label_en: en.home.hero.dock?.contracting_label || 'Contracting (Projects)',
        dock_contracting_label_ar: ar.home.hero.dock?.contracting_label || 'المقاولات والتميز الهندسي',
        dock_contracting_badge_en: en.home.hero.dock?.contracting_badge || 'Turnkey Execution',
        dock_contracting_badge_ar: ar.home.hero.dock?.contracting_badge || 'تنفيذ شامل',
        scroll_cue_en: en.home.hero.scroll_cue || 'Scroll to explore',
        scroll_cue_ar: ar.home.hero.scroll_cue || 'استكشف المنظومة القابضة',
      },
      media: {
        hero_video_hospitality: '/videos/hospitality.mp4',
        hero_poster_hospitality: '',
        hero_video_manufacturing: '/videos/manufacturing.mp4',
        hero_poster_manufacturing: '',
        hero_video_contracting: '/videos/contracting.mp4',
        hero_poster_contracting: '',
        sector_photo_hospitality: '',
        sector_photo_manufacturing: '',
        sector_photo_contracting: '',
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
        label_en: en.home.identity.label,
        label_ar: ar.home.identity.label,
        vision_title_en: en.home.identity.vision_title,
        vision_title_ar: ar.home.identity.vision_title,
        vision_desc_en: en.home.identity.vision_desc,
        vision_desc_ar: ar.home.identity.vision_desc,
        mission_title_en: en.home.identity.mission_title,
        mission_title_ar: ar.home.identity.mission_title,
        mission_desc_en: en.home.identity.mission_desc,
        mission_desc_ar: ar.home.identity.mission_desc,
        values_title_en: en.home.identity.values_title,
        values_title_ar: ar.home.identity.values_title,
        val1_title_en: en.home.identity.values[0]?.title || '',
        val1_title_ar: ar.home.identity.values[0]?.title || '',
        val1_desc_en: en.home.identity.values[0]?.desc || '',
        val1_desc_ar: ar.home.identity.values[0]?.desc || '',
        val2_title_en: en.home.identity.values[1]?.title || '',
        val2_title_ar: ar.home.identity.values[1]?.title || '',
        val2_desc_en: en.home.identity.values[1]?.desc || '',
        val2_desc_ar: ar.home.identity.values[1]?.desc || '',
        val3_title_en: en.home.identity.values[2]?.title || '',
        val3_title_ar: ar.home.identity.values[2]?.title || '',
        val3_desc_en: en.home.identity.values[2]?.desc || '',
        val3_desc_ar: ar.home.identity.values[2]?.desc || '',
        val4_title_en: en.home.identity.values[3]?.title || '',
        val4_title_ar: ar.home.identity.values[3]?.title || '',
        val4_desc_en: en.home.identity.values[3]?.desc || '',
        val4_desc_ar: ar.home.identity.values[3]?.desc || '',
      },
      ceo: {
        label_en: en.home.ceo.label,
        label_ar: ar.home.ceo.label,
        quote_en: en.home.ceo.quote,
        quote_ar: ar.home.ceo.quote,
        name_en: en.home.ceo.name,
        name_ar: ar.home.ceo.name,
        title_en: en.home.ceo.title,
        title_ar: ar.home.ceo.title,
        photo_url: '',
      },
      partnership: {
        label_en: en.home.partnership.label,
        label_ar: ar.home.partnership.label,
        heading_en: en.home.partnership.heading,
        heading_ar: ar.home.partnership.heading,
        body_en: en.home.partnership.body,
        body_ar: ar.home.partnership.body,
        primary_cta_en: en.home.partnership.primaryCta,
        primary_cta_ar: ar.home.partnership.primaryCta,
        secondary_cta_en: en.home.partnership.secondaryCta,
        secondary_cta_ar: ar.home.partnership.secondaryCta,
      },
    },
    about: {
      hero_image: '',
      story_image: '',
      story_heading_en: en.about.story.heading,
      story_heading_ar: ar.about.story.heading,
      story_body_en: en.about.story.body,
      story_body_ar: ar.about.story.body,
      governance_statement_en: en.about.governance.statement,
      governance_statement_ar: ar.about.governance.statement,
      corporate_profile_pdf: en.about.corporate_profile_pdf || '',
    },
    hospitality: {
      hero_title_en: en.hospitality.hero.title,
      hero_title_ar: ar.hospitality.hero.title,
      hero_body_en: en.hospitality.hero.body,
      hero_body_ar: ar.hospitality.hero.body,
      hero_image: '',
      properties: en.hospitality.portfolio.properties.map((p, idx) => ({
        id: `prop_${idx + 1}`,
        name_en: p.name,
        name_ar: ar.hospitality.portfolio.properties[idx]?.name || p.name,
        city_en: p.city,
        city_ar: ar.hospitality.portfolio.properties[idx]?.city || p.city,
        desc_en: p.desc,
        desc_ar: ar.hospitality.portfolio.properties[idx]?.desc || p.desc,
        image_url: '',
        review_url: '',
        website_url: 'https://new.swissbluehotels.com',
      })),
    },
    manufacturing: {
      hero_title_en: en.manufacturing.hero.title,
      hero_title_ar: ar.manufacturing.hero.title,
      hero_body_en: en.manufacturing.hero.body,
      hero_body_ar: ar.manufacturing.hero.body,
      hero_image: '',
      factories: en.manufacturing.factories.list.map((f, idx) => ({
        id: `factory_${idx + 1}`,
        title_en: f.title,
        title_ar: ar.manufacturing.factories.list[idx]?.title || f.title,
        desc_en: f.desc,
        desc_ar: ar.manufacturing.factories.list[idx]?.desc || f.desc,
        location_en: 'Najran & Riyadh',
        location_ar: 'نجران والرياض',
        image_url: '',
      })),
    },
    contracting: {
      hero_title_en: en.contracting.hero.title,
      hero_title_ar: ar.contracting.hero.title,
      hero_body_en: en.contracting.hero.body,
      hero_body_ar: ar.contracting.hero.body,
      hero_image: '',
      services: en.contracting.services.list.map((s, idx) => ({
        id: `service_${idx + 1}`,
        title_en: s.title,
        title_ar: ar.contracting.services.list[idx]?.title || s.title,
        desc_en: s.desc,
        desc_ar: ar.contracting.services.list[idx]?.desc || s.desc,
        image_url: '',
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
      keywords_en: 'WD Group, Saudi Holding Company, SwissBlue Hotels, GreenWood Manufacturing, WatanDesign Contracting, Vision 2030, Saudi Arabia',
      keywords_ar: 'مجموعة دبليو دي, شركة قابضة سعودية, فنادق سويس بلو, مصانع جرين وود, شركة تصاميم الوطن, رؤية 2030, المملكة العربية السعودية',
      canonical_base: 'https://wdgroup.online',
      og_image_url: 'https://fqkbgfdasfwnryekkgqz.supabase.co/storage/v1/object/public/photos/og-preview.jpg',
      twitter_card: 'summary_large_image',
      twitter_handle: '@wdgroup',
      google_site_verification: '',
      bing_site_verification: '',
      google_analytics_id: 'G-FVBW70B8H5',
      google_tag_manager_id: '',
      robots_index: true,
      sitemap_url: 'https://wdgroup.online/sitemap.xml',
      schema_org_type: 'Corporation',
      schema_legal_name_ar: 'مجموعة دبليو دي للأعمال',
      schema_legal_name_en: 'WD Group for Business',
      schema_phone: '+966 50 572 5070',
      schema_email: 'ceo@wdgroup.online',
    },
    version: 1,
  };
}

export default function PagesContentEditor() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'hospitality' | 'manufacturing' | 'contracting'>('home');
  const [content, setContent] = useState<SiteContentPayload>(createDefaultContent());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Collapsible Accordion State for Modules
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
    dock: false,
    videos: false,
    sectors: false,
    synergy: false,
    identity: false,
    ceo: false,
    partnership: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setOpenSections({
      hero: true,
      dock: true,
      videos: true,
      sectors: true,
      synergy: true,
      identity: true,
      ceo: true,
      partnership: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      hero: false,
      dock: false,
      videos: false,
      sectors: false,
      synergy: false,
      identity: false,
      ceo: false,
      partnership: false,
    });
  };

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const d = await res.json();
        if (d.data) {
          const defaults = createDefaultContent();
          setContent({
            ...defaults,
            ...d.data,
            home: {
              ...defaults.home,
              ...(d.data.home || {}),
              hero: { ...defaults.home.hero, ...(d.data.home?.hero || {}) },
              metrics: { ...defaults.home.metrics, ...(d.data.home?.metrics || {}) },
              synergy: { ...defaults.home.synergy, ...(d.data.home?.synergy || {}) },
              identity: { ...defaults.home.identity, ...(d.data.home?.identity || {}) },
              ceo: { ...defaults.home.ceo, ...(d.data.home?.ceo || {}) },
              partnership: { ...defaults.home.partnership, ...(d.data.home?.partnership || {}) },
              media: { ...defaults.home.media, ...(d.data.home?.media || {}) },
            },
            about: { ...defaults.about, ...(d.data.about || {}) },
            hospitality: {
              ...defaults.hospitality,
              ...(d.data.hospitality || {}),
              properties: Array.isArray(d.data.hospitality?.properties) && d.data.hospitality.properties.length > 0
                ? d.data.hospitality.properties
                : defaults.hospitality.properties,
            },
            manufacturing: {
              ...defaults.manufacturing,
              ...(d.data.manufacturing || {}),
              factories: Array.isArray(d.data.manufacturing?.factories) && d.data.manufacturing.factories.length > 0
                ? d.data.manufacturing.factories
                : defaults.manufacturing.factories,
            },
            contracting: {
              ...defaults.contracting,
              ...(d.data.contracting || {}),
              services: Array.isArray(d.data.contracting?.services) && d.data.contracting.services.length > 0
                ? d.data.contracting.services
                : defaults.contracting.services,
            },
            settings: { ...defaults.settings, ...(d.data.settings || {}) },
            seo: { ...defaults.seo, ...(d.data.seo || {}) },
          });
        }
      }
    } catch (e) {
      console.error('Failed to load content:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      setSaving(true);
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update content');
      }

      showToast(isAr ? 'تم حفظ ونشر محتوى الصفحات والوسائط بنجاح' : 'Page content & media saved and published successfully', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'حدث خطأ أثناء حفظ المحتوى' : 'Error saving content'), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل محتوى النظام والصفحات…' : 'Loading multilingual CMS content…'} />;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>{isAr ? 'نظام إدارة المحتوى والوسائط الثنائي' : 'UNIFIED DUAL-LOCALE & MEDIA CMS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'محرر الصفحات والوسائط والأقسام' : 'Pages, Media & Sections Editor'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'إدارة العناوين والنصوص والصور والفيديوهات في جميع القطاعات مع المزامنة الفورية.' : 'Manage headlines, narratives, photos, and videos across all sectors with instant live sync.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer whitespace-nowrap shrink-0 leading-none"
          >
            <Save className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ الحفظ…' : 'Publishing…') : (isAr ? 'حفظ ونشر الكل' : 'Save & Publish All')}</span>
          </button>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0F1117] border border-white/10">
        {[
          { id: 'home', label: isAr ? 'الرئيسية' : 'Home', icon: Home },
          { id: 'about', label: isAr ? 'عنّا' : 'About Us', icon: Compass },
          { id: 'hospitality', label: isAr ? 'الضيافة' : 'SwissBlue Hospitality', icon: Building2 },
          { id: 'manufacturing', label: isAr ? 'التصنيع' : 'GreenWood Manufacturing', icon: Factory },
          { id: 'contracting', label: isAr ? 'المقاولات' : 'Contracting & Fit-Out', icon: HardHat },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>      {/* ─── TAB 1: HOMEPAGE (COMPACT ACCORDION MODULES) ─── */}
      {activeTab === 'home' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Quick Accordion Expand / Collapse Controls */}
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-mono text-zinc-400 font-bold">
              {isAr ? 'أقسام محتوى الصفحة الرئيسية (8 أقسام)' : 'HOMEPAGE CONTENT MODULES (8 SECTIONS)'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>{isAr ? 'عرض المحتوى للكل' : 'Expand All'}</span>
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all cursor-pointer"
              >
                <Minimize2 className="w-3 h-3" />
                <span>{isAr ? 'إغلاق الكل' : 'Collapse All'}</span>
              </button>
            </div>
          </div>

          {/* Section 1: Hero Section */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('hero')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-xs font-bold shrink-0">
                  01
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">
                    {isAr ? 'القسم الرئيسي للواجهة وزر التواصل' : 'CINEMATIC HERO SECTION & HEADER CTA'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'العنوان الترويجي، الشعار من 3 أسطر، النص التوضيحي وزر التواصل العلوي' : 'Eyebrow, 3-line slogan, subtitle narrative & top-right contact button'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.hero ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.hero ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.hero && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                {/* Hero Badge Pill Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-[#C9A86A]/30 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold font-mono text-[#C9A86A] uppercase tracking-wider">
                        {isAr ? 'شارة أعلى الهيرو (الشعار والتعريف)' : 'Hero Pill Badge (Brand & Tagline)'}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        {isAr ? 'الشارة الدائرية أعلى الشعار الثلاثي في الصفحة الرئيسية للموقع' : 'The circular pill badge rendered directly above the 3-line headline on homepage'}
                      </p>
                    </div>

                    {/* Live Preview Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0F1117]/90 border border-[#C9A86A]/40 text-zinc-300 backdrop-blur-md shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse"></span>
                      <span className="font-bold text-white tracking-wide">
                        {isAr ? (content.home.hero.eyebrow_ar || 'مجموعة دبليو دي للأعمال') : (content.home.hero.eyebrow_en || 'WD Group for Business')}
                      </span>
                      <span className="text-[#C9A86A]/60">•</span>
                      <span className="text-zinc-300 font-normal">
                        {isAr ? (content.home.hero.kicker_ar || 'منظومة متكاملة في الضيافة والتصنيع والمقاولات') : (content.home.hero.kicker_en || 'Integrated Hospitality, Manufacturing & Contracting')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <BilingualInput
                      label={isAr ? 'اسم العلامة في الشارة (الجزء الأول)' : 'Badge Brand Name (Part 1)'}
                      valueEn={content.home.hero.eyebrow_en}
                      valueAr={content.home.hero.eyebrow_ar}
                      placeholderEn="WD Group for Business"
                      placeholderAr="مجموعة دبليو دي للأعمال"
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_ar: v } } })}
                    />

                    <BilingualInput
                      label={isAr ? 'النص التعريفي في الشارة (الجزء الثاني / Kicker)' : 'Badge Tagline / Kicker (Part 2)'}
                      valueEn={content.home.hero.kicker_en || 'Integrated Hospitality, Manufacturing & Contracting'}
                      valueAr={content.home.hero.kicker_ar || 'منظومة متكاملة في الضيافة والتصنيع والمقاولات'}
                      placeholderEn="Integrated Hospitality, Manufacturing & Contracting"
                      placeholderAr="منظومة متكاملة في الضيافة والتصنيع والمقاولات"
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, kicker_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, kicker_ar: v } } })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <BilingualInput
                    label={isAr ? 'السطر الرئيسي 1' : 'Headline Line 1'}
                    valueEn={content.home.hero.title_line1_en || 'Solid Vision.'}
                    valueAr={content.home.hero.title_line1_ar || 'رؤية راسخة.'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line1_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line1_ar: v } } })}
                  />

                  <BilingualInput
                    label={isAr ? 'السطر الرئيسي 2 [المميز بالذهبي]' : 'Headline Line 2 [Accent]'}
                    valueEn={content.home.hero.title_line2_en || 'Diverse Sectors.'}
                    valueAr={content.home.hero.title_line2_ar || 'قطاعات متعددة.'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line2_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line2_ar: v } } })}
                  />

                  <BilingualInput
                    label={isAr ? 'السطر الرئيسي 3' : 'Headline Line 3'}
                    valueEn={content.home.hero.title_line3_en || 'Promising Future.'}
                    valueAr={content.home.hero.title_line3_ar || 'مستقبل واعد.'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line3_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line3_ar: v } } })}
                  />
                </div>

                <BilingualInput
                  label={isAr ? 'النص التعريفي / التوضيحي' : 'Hero Subtitle / Narrative Body'}
                  isTextarea
                  rows={3}
                  valueEn={content.home.hero.body_en}
                  valueAr={content.home.hero.body_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, body_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, body_ar: v } } })}
                />

                <BilingualInput
                  label={isAr ? 'زر التواصل في القائمة العلوية (أعلى الزاوية)' : 'Header Navigation CTA Button (Top Right Corner)'}
                  valueEn={content.settings.nav_cta_en || 'Contact Us'}
                  valueAr={content.settings.nav_cta_ar || 'تواصل معنا'}
                  onChangeEn={(v) => setContent({ ...content, settings: { ...content.settings, nav_cta_en: v } })}
                  onChangeAr={(v) => setContent({ ...content, settings: { ...content.settings, nav_cta_ar: v } })}
                />
              </div>
            )}
          </div>

          {/* Section 2: Floating Sector Switcher Dock */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('dock')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A] font-mono text-xs font-bold shrink-0">
                  02
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider block">
                    {isAr ? 'الشريط العائم للتنقل بين القطاعات' : 'FLOATING SECTOR SWITCHER DOCK & BADGES'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'تسميات تبويبات التنقل التفاعلية وشارات العدادات' : 'Interactive switcher tab labels & counter badges'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.dock ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.dock ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.dock && (
              <div className="space-y-4 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">{isAr ? 'القطاع 1: شريط الضيافة' : 'Sector 1: Hospitality Switcher Dock'}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualInput
                      label={isAr ? 'اسم تبويب الضيافة' : 'Hospitality Tab Label'}
                      valueEn={content.home.hero.dock_hospitality_label_en || 'Hospitality (SwissBlue)'}
                      valueAr={content.home.hero.dock_hospitality_label_ar || 'الضيافة (SwissBlue)'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_label_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_label_ar: v } } })}
                    />
                    <BilingualInput
                      label={isAr ? 'شارة العداد / عدد الفنادق' : 'Hospitality Badge / Count'}
                      valueEn={content.home.hero.dock_hospitality_badge_en || '6 Properties'}
                      valueAr={content.home.hero.dock_hospitality_badge_ar || '6 منشآت'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_badge_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_badge_ar: v } } })}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">{isAr ? 'القطاع 2: شريط التصنيع' : 'Sector 2: Manufacturing Switcher Dock'}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualInput
                      label={isAr ? 'اسم تبويب التصنيع' : 'Manufacturing Tab Label'}
                      valueEn={content.home.hero.dock_manufacturing_label_en || 'Manufacturing (GreenWood)'}
                      valueAr={content.home.hero.dock_manufacturing_label_ar || 'التصنيع والأثاث (GreenWood)'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_label_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_label_ar: v } } })}
                    />
                    <BilingualInput
                      label={isAr ? 'شارة العداد / عدد المصانع' : 'Manufacturing Badge / Count'}
                      valueEn={content.home.hero.dock_manufacturing_badge_en || '3 Factories'}
                      valueAr={content.home.hero.dock_manufacturing_badge_ar || '3 مصانع'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_badge_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_badge_ar: v } } })}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">{isAr ? 'القطاع 3: شريط المقاولات' : 'Sector 3: Contracting Switcher Dock'}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualInput
                      label={isAr ? 'اسم تبويب المقاولات' : 'Contracting Tab Label'}
                      valueEn={content.home.hero.dock_contracting_label_en || 'Contracting (Projects)'}
                      valueAr={content.home.hero.dock_contracting_label_ar || 'المقاولات والتميز الهندسي'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_label_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_label_ar: v } } })}
                    />
                    <BilingualInput
                      label={isAr ? 'شارة الحالة / التنفيذ' : 'Contracting Badge / Status'}
                      valueEn={content.home.hero.dock_contracting_badge_en || 'Turnkey Execution'}
                      valueAr={content.home.hero.dock_contracting_badge_ar || 'تنفيذ شامل'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_badge_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_badge_ar: v } } })}
                    />
                  </div>
                </div>

                <BilingualInput
                  label={isAr ? 'نص مؤشر التمرير للأسفل' : 'Scroll Cue Indicator Text'}
                  valueEn={content.home.hero.scroll_cue_en || 'Scroll to explore'}
                  valueAr={content.home.hero.scroll_cue_ar || 'استكشف المنظومة القابضة'}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, scroll_cue_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, scroll_cue_ar: v } } })}
                />
              </div>
            )}
          </div>

          {/* Section 3: Hero Background Videos */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('videos')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                  03
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    {isAr ? 'الفيديوهات الخلفية التفاعلية للقطاعات' : 'HERO BACKGROUND VIDEOS'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'فيديوهات خلفيات أقسام الضيافة، التصنيع، والمقاولات' : 'Hospitality, Manufacturing, and Contracting background video stream URLs'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.videos ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.videos ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.videos && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <MediaFieldUploader
                  label={isAr ? 'فيديو قطاع الضيافة' : 'SwissBlue Hospitality Video'}
                  accept="video"
                  bucket="videos"
                  value={content.home.media?.hero_video_hospitality || '/videos/hospitality.mp4'}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), hero_video_hospitality: url } } })}
                />

                <MediaFieldUploader
                  label={isAr ? 'فيديو قطاع التصنيع' : 'GreenWood Manufacturing Video'}
                  accept="video"
                  bucket="videos"
                  value={content.home.media?.hero_video_manufacturing || '/videos/manufacturing.mp4'}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), hero_video_manufacturing: url } } })}
                />

                <MediaFieldUploader
                  label={isAr ? 'فيديو قطاع المقاولات' : 'Contracting & Fit-Out Video'}
                  accept="video"
                  bucket="videos"
                  value={content.home.media?.hero_video_contracting || '/videos/contracting.mp4'}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), hero_video_contracting: url } } })}
                />
              </div>
            )}
          </div>

          {/* Section 4: Homepage Sectors Photo Cards */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('sectors')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-mono text-xs font-bold shrink-0">
                  04
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                    {isAr ? 'صور وبطاقات القطاعات الاستراتيجية' : 'STRATEGIC SECTORS PHOTO CARDS'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'صور بطاقات قطاعات الضيافة، التصنيع، والمقاولات بالصفحة الرئيسية' : 'Cover photos for Hospitality, Manufacturing & Contracting sector cards'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.sectors ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.sectors ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.sectors && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <MediaFieldUploader
                  label={isAr ? 'صورة بطاقة الضيافة' : 'Hospitality Sector Card Photo'}
                  bucket="photos"
                  value={content.home.media?.sector_photo_hospitality || ''}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_hospitality: url } } })}
                />

                <MediaFieldUploader
                  label={isAr ? 'صورة بطاقة التصنيع' : 'Manufacturing Sector Card Photo'}
                  bucket="photos"
                  value={content.home.media?.sector_photo_manufacturing || ''}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_manufacturing: url } } })}
                />

                <MediaFieldUploader
                  label={isAr ? 'صورة بطاقة المقاولات' : 'Contracting Sector Card Photo'}
                  bucket="photos"
                  value={content.home.media?.sector_photo_contracting || ''}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_contracting: url } } })}
                />
              </div>
            )}
          </div>

          {/* Section 5: Value Chain Synergy */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('synergy')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0">
                  05
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                    {isAr ? 'تكامل سلاسل القيمة المضافة' : 'INTEGRATED VALUE CHAIN SYNERGY'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'سلسلة القيمة المضافة للمنظومة القابضة: نصنّع، نبني، نشغّل' : 'Holding lifecycle synergy: Manufacture, Build, Operate'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.synergy ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.synergy ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.synergy && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <BilingualInput
                  label={isAr ? 'عنوان التكامل وسلاسل القيمة' : 'Synergy Heading'}
                  valueEn={content.home.synergy.heading_en}
                  valueAr={content.home.synergy.heading_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, heading_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, heading_ar: v } } })}
                />

                <BilingualInput
                  label={isAr ? 'مقدمة التكامل والمنظومة' : 'Synergy Intro Description'}
                  isTextarea
                  rows={3}
                  valueEn={content.home.synergy.intro_en}
                  valueAr={content.home.synergy.intro_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, intro_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, intro_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">{isAr ? 'المرحلة 01: التصنيع' : 'Step 01: Manufacturing'}</span>
                    <BilingualInput
                      label={isAr ? 'عنوان المرحلة 1' : 'Step 1 Title'}
                      valueEn={content.home.synergy.step1_title_en || 'Manufacture'}
                      valueAr={content.home.synergy.step1_title_ar || 'التصنيع والإنتاج'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_title_ar: v } } })}
                    />
                    <BilingualInput
                      label={isAr ? 'نص المرحلة 1' : 'Step 1 Narrative'}
                      isTextarea
                      rows={3}
                      valueEn={content.home.synergy.step1_text_en || ''}
                      valueAr={content.home.synergy.step1_text_ar || ''}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_text_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_text_ar: v } } })}
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-400">{isAr ? 'المرحلة 02: المقاولات والتجهيز' : 'Step 02: Fit-Out & Contracting'}</span>
                    <BilingualInput
                      label={isAr ? 'عنوان المرحلة 2' : 'Step 2 Title'}
                      valueEn={content.home.synergy.step2_title_en || 'Build & Fit Out'}
                      valueAr={content.home.synergy.step2_title_ar || 'التنفيذ والتجهيز المعماري'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_title_ar: v } } })}
                    />
                    <BilingualInput
                      label={isAr ? 'نص المرحلة 2' : 'Step 2 Narrative'}
                      isTextarea
                      rows={3}
                      valueEn={content.home.synergy.step2_text_en || ''}
                      valueAr={content.home.synergy.step2_text_ar || ''}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_text_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_text_ar: v } } })}
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-sky-400">{isAr ? 'المرحلة 03: التشغيل الفندقي' : 'Step 03: Hospitality Operations'}</span>
                    <BilingualInput
                      label={isAr ? 'عنوان المرحلة 3' : 'Step 3 Title'}
                      valueEn={content.home.synergy.step3_title_en || 'Operate'}
                      valueAr={content.home.synergy.step3_title_ar || 'التشغيل الفندقي وإدارة الأصول'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step3_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step3_title_ar: v } } })}
                    />
                    <BilingualInput
                      label={isAr ? 'نص المرحلة 3' : 'Step 3 Narrative'}
                      isTextarea
                      rows={3}
                      valueEn={content.home.synergy.step3_text_en || ''}
                      valueAr={content.home.synergy.step3_text_ar || ''}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step3_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step3_title_ar: v } } })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Identity, Vision, Mission & Values */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('identity')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xs font-bold shrink-0">
                  06
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block">
                    {isAr ? 'الهوية المؤسسية، الرؤية والرسالة والقيم' : 'IDENTITY, VISION, MISSION & VALUES'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'نصوص الرؤية، مبادئ الرسالة وقيم المنظومة القابضة' : 'Vision narrative, mission principles & corporate values'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.identity ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.identity ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.identity && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BilingualInput
                    label={isAr ? 'عنوان الرؤية' : 'Vision Title'}
                    valueEn={content.home.identity.vision_title_en || 'Vision'}
                    valueAr={content.home.identity.vision_title_ar || 'الرؤية'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_title_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_title_ar: v } } })}
                  />
                  <BilingualInput
                    label={isAr ? 'عنوان الرسالة' : 'Mission Title'}
                    valueEn={content.home.identity.mission_title_en || 'Mission'}
                    valueAr={content.home.identity.mission_title_ar || 'الرسالة'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, mission_title_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, mission_title_ar: v } } })}
                  />
                </div>

                <BilingualInput
                  label={isAr ? 'بيان الرؤية' : 'Vision Statement'}
                  isTextarea
                  rows={3}
                  valueEn={content.home.identity.vision_desc_en || ''}
                  valueAr={content.home.identity.vision_desc_ar || ''}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_desc_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_desc_ar: v } } })}
                />

                <BilingualInput
                  label={isAr ? 'بيان الرسالة' : 'Mission Statement'}
                  isTextarea
                  rows={3}
                  valueEn={content.home.identity.mission_desc_en || ''}
                  valueAr={content.home.identity.mission_desc_ar || ''}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, mission_desc_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, mission_desc_ar: v } } })}
                />
              </div>
            )}
          </div>

          {/* Section 7: CEO Quote & Governance */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('ceo')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A] font-mono text-xs font-bold shrink-0">
                  07
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider block">
                    {isAr ? 'الرسالة التنفيذية وصورة الرئيس التنفيذي' : 'CEO LEADERSHIP QUOTE & 1:1 PORTRAIT'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'الرسالة التنفيذية، الاسم، المنصب، وصورة شخصية بنسبة 1:1' : 'Executive statement, leader name, title & 1:1 photo uploader'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.ceo ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.ceo ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.ceo && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <MediaFieldUploader
                    label={isAr ? 'صورة الرئيس التنفيذي للنسخة العربية (RTL Posture)' : 'CEO Portrait - Arabic / RTL Posture'}
                    description={isAr ? 'الصورة الشخصية للنسخة العربية تراعي توجيه الجسد نحو اليمين/الوسط' : 'Body posture oriented for RTL / Arabic layout'}
                    aspectRatio="1:1"
                    bucket="photos"
                    value={content.home.ceo.photo_url_ar || content.home.ceo.photo_url || ''}
                    onChange={(url) => setContent({
                      ...content,
                      home: {
                        ...content.home,
                        ceo: { ...content.home.ceo, photo_url_ar: url, photo_url: url }
                      }
                    })}
                  />

                  <MediaFieldUploader
                    label={isAr ? 'صورة الرئيس التنفيذي للنسخة الإنجليزية (LTR Posture)' : 'CEO Portrait - English / LTR Posture'}
                    description={isAr ? 'الصورة الشخصية للنسخة الإنجليزية تراعي توجيه الجسد نحو اليسار/الوسط' : 'Body posture oriented for LTR / English layout'}
                    aspectRatio="1:1"
                    bucket="photos"
                    value={content.home.ceo.photo_url_en || content.home.ceo.photo_url || ''}
                    onChange={(url) => setContent({
                      ...content,
                      home: {
                        ...content.home,
                        ceo: { ...content.home.ceo, photo_url_en: url, photo_url: content.home.ceo.photo_url || url }
                      }
                    })}
                  />
                </div>

                <BilingualInput
                  label={isAr ? 'نص الرسالة التنفيذية' : 'Quote Statement'}
                  isTextarea
                  rows={3}
                  valueEn={content.home.ceo.quote_en}
                  valueAr={content.home.ceo.quote_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, quote_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, quote_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BilingualInput
                    label={isAr ? 'اسم الرئيس التنفيذي' : 'Leader Name'}
                    valueEn={content.home.ceo.name_en}
                    valueAr={content.home.ceo.name_ar}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, name_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, name_ar: v } } })}
                  />
                  <BilingualInput
                    label={isAr ? 'المنصب والصفة' : 'Leader Title / Role'}
                    valueEn={content.home.ceo.title_en}
                    valueAr={content.home.ceo.title_ar}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, title_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, title_ar: v } } })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 8: Strategic Partnership CTA Banner */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 transition-all">
            <div 
              onClick={() => toggleSection('partnership')}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-xs font-bold shrink-0">
                  08
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block">
                    {isAr ? 'قسم الشراكات الاستراتيجية والتواصل' : 'STRATEGIC PARTNERSHIP & CONTACT CTA'}
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    {isAr ? 'عنوان الاستفسارات والشراكات، النص الترويجي وأزرار الإجراءات' : 'Inquiry headline, narrative & custom CTA action buttons'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.partnership ? (isAr ? 'إغلاق' : 'Collapse') : (isAr ? 'عرض المحتوى' : 'Expand')}
                </span>
                {openSections.partnership ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.partnership && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <BilingualInput
                  label={isAr ? 'عنوان البانر الرئيسي' : 'Banner Heading'}
                  valueEn={content.home.partnership?.heading_en || 'Interested in Building a Partnership With Us?'}
                  valueAr={content.home.partnership?.heading_ar || 'هل ترغب في بناء شراكة استراتيجية معنا؟'}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), heading_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), heading_ar: v } } })}
                />

                <BilingualInput
                  label={isAr ? 'النص الترويجي للبانر' : 'Banner Narrative'}
                  isTextarea
                  rows={3}
                  valueEn={content.home.partnership?.body_en || ''}
                  valueAr={content.home.partnership?.body_ar || ''}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), body_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), body_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BilingualInput
                    label={isAr ? 'نص زر الإجراء الرئيسي' : 'Primary CTA Button Label'}
                    valueEn={content.home.partnership?.primary_cta_en || 'Start a Partnership'}
                    valueAr={content.home.partnership?.primary_cta_ar || 'ابدأ شراكة جديدة'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), primary_cta_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), primary_cta_ar: v } } })}
                  />
                  <BilingualInput
                    label={isAr ? 'نص زر الإجراء الثانوي' : 'Secondary CTA Button Label'}
                    valueEn={content.home.partnership?.secondary_cta_en || 'Join Our Team'}
                    valueAr={content.home.partnership?.secondary_cta_ar || 'انضم إلى فريقنا'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), secondary_cta_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), secondary_cta_ar: v } } })}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ─── TAB 2: ABOUT US ─── */}
      {activeTab === 'about' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                {isAr ? 'صور وقصة ورسالة صفحة عنّا' : 'ABOUT US HERO IMAGE & STORY'}
              </span>
            </div>

            <MediaFieldUploader
              label={isAr ? 'صورة الغلاف لصفحة عنّا' : 'About Us Hero Background Image'}
              bucket="photos"
              value={content.about.hero_image || ''}
              onChange={(url) => setContent({ ...content, about: { ...content.about, hero_image: url } })}
            />

            <MediaFieldUploader
              label={isAr ? 'صورة التراث ومسيرة المجموعة' : 'About Us Heritage & Story Photo'}
              bucket="photos"
              value={content.about.story_image || ''}
              onChange={(url) => setContent({ ...content, about: { ...content.about, story_image: url } })}
            />

            <BilingualInput
              label={isAr ? 'عنوان القصة والمسيرة' : 'Story Heading'}
              valueEn={content.about.story_heading_en}
              valueAr={content.about.story_heading_ar}
              onChangeEn={(v) => setContent({ ...content, about: { ...content.about, story_heading_en: v } })}
              onChangeAr={(v) => setContent({ ...content, about: { ...content.about, story_heading_ar: v } })}
            />

            <BilingualInput
              label={isAr ? 'نص القصة والمسيرة' : 'Story Narrative Body'}
              isTextarea
              rows={4}
              valueEn={content.about.story_body_en}
              valueAr={content.about.story_body_ar}
              onChangeEn={(v) => setContent({ ...content, about: { ...content.about, story_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, about: { ...content.about, story_body_ar: v } })}
            />

            <BilingualInput
              label={isAr ? 'بيان الحوكمة والغاية المؤسسية' : 'Governance & Purpose Statement'}
              isTextarea
              rows={4}
              valueEn={content.about.governance_statement_en}
              valueAr={content.about.governance_statement_ar}
              onChangeEn={(v) => setContent({ ...content, about: { ...content.about, governance_statement_en: v } })}
              onChangeAr={(v) => setContent({ ...content, about: { ...content.about, governance_statement_ar: v } })}
            />

            {/* Downloadable Corporate Profile PDF Attachment (Bilingual) */}
            <div className="pt-5 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C9A86A]" />
                <span className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider">
                  {isAr ? 'الملف التعريفي للشركة (PDF)' : 'OFFICIAL CORPORATE PROFILE PDF'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {isAr ? 'ارفع أو حدد ملف الـ PDF الخاص بالنسخة العربية والنسخة الإنجليزية، ليتمكن الزوار من تحميل الملف المناسب للغتهم.' : 'Upload official PDF profiles for both Arabic and English visitors.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <MediaFieldUploader
                  label={isAr ? 'الملف التعريفي باللغة العربية (PDF - Arabic)' : 'Corporate Profile PDF (Arabic Version)'}
                  description={isAr ? 'الملف الذي سيتم تحميله عند تصفح الموقع باللغة العربية' : 'Downloaded when visitor is on Arabic version'}
                  bucket="documents"
                  accept="pdf"
                  value={content.about.corporate_profile_pdf_ar || content.about.corporate_profile_pdf || ''}
                  onChange={(url) => setContent({ 
                    ...content, 
                    about: { ...content.about, corporate_profile_pdf_ar: url, corporate_profile_pdf: url },
                    branding: { ...(content.branding || {}), corporate_profile_pdf: url }
                  })}
                />

                <MediaFieldUploader
                  label={isAr ? 'الملف التعريفي باللغة الإنجليزية (PDF - English)' : 'Corporate Profile PDF (English Version)'}
                  description={isAr ? 'الملف الذي سيتم تحميله عند تصفح الموقع باللغة الإنجليزية' : 'Downloaded when visitor is on English version'}
                  bucket="documents"
                  accept="pdf"
                  value={content.about.corporate_profile_pdf_en || content.about.corporate_profile_pdf || ''}
                  onChange={(url) => setContent({ 
                    ...content, 
                    about: { ...content.about, corporate_profile_pdf_en: url, corporate_profile_pdf: content.about.corporate_profile_pdf || url },
                    branding: { ...(content.branding || {}), corporate_profile_pdf: content.branding?.corporate_profile_pdf || url }
                  })}
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ─── TAB 3: HOSPITALITY ─── */}
      {activeTab === 'hospitality' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                {isAr ? 'الواجهة وصور قطاع الضيافة (فنادق سويس بلو)' : 'SWISSBLUE HOSPITALITY HERO & PHOTOS'}
              </span>
            </div>

            <MediaFieldUploader
              label={isAr ? 'صورة غلاف قطاع الضيافة' : 'Hospitality Hero Background Photo'}
              bucket="photos"
              value={content.hospitality.hero_image || ''}
              onChange={(url) => setContent({ ...content, hospitality: { ...content.hospitality, hero_image: url } })}
            />

            <BilingualInput
              label={isAr ? 'عنوان صفحة الضيافة' : 'Hospitality Page Title'}
              valueEn={content.hospitality.hero_title_en}
              valueAr={content.hospitality.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, hospitality: { ...content.hospitality, hero_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, hospitality: { ...content.hospitality, hero_title_ar: v } })}
            />

            <BilingualInput
              label={isAr ? 'النص التعريفي لقطاع الضيافة' : 'Hospitality Subtitle / Intro'}
              isTextarea
              rows={3}
              valueEn={content.hospitality.hero_body_en}
              valueAr={content.hospitality.hero_body_ar}
              onChangeEn={(v) => setContent({ ...content, hospitality: { ...content.hospitality, hero_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, hospitality: { ...content.hospitality, hero_body_ar: v } })}
            />
          </div>

          {/* Properties Photo List */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {isAr ? 'صور وتفاصيل فنادق سويس بلو' : 'HOSPITALITY PROPERTIES PHOTOS & DETAILS'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(content.hospitality?.properties || []).map((prop, idx) => (
                <div key={prop.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{isAr ? prop.name_ar : prop.name_en}</span>
                    <span className="text-[10px] font-mono text-sky-400">{isAr ? prop.city_ar : prop.city_en}</span>
                  </div>

                  <MediaFieldUploader
                    label={isAr ? `صورة المنشأة: ${prop.name_ar || prop.name_en}` : `Property Photo: ${prop.name_en}`}
                    bucket="photos"
                    value={prop.image_url || ''}
                    onChange={(url) => {
                      const updated = [...(content.hospitality?.properties || [])];
                      updated[idx] = { ...updated[idx], image_url: url };
                      setContent({ ...content, hospitality: { ...content.hospitality, properties: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ─── TAB 4: MANUFACTURING ─── */}
      {activeTab === 'manufacturing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {isAr ? 'بيانات وصور قطاع التصنيع والأثاث (جرين وود)' : 'GREENWOOD MANUFACTURING HERO & ASSETS'}
              </span>
            </div>

            <MediaFieldUploader
              label={isAr ? 'صورة الغلاف لقطاع التصنيع' : 'Manufacturing Hero Background Photo'}
              bucket="photos"
              value={content.manufacturing?.hero_image || ''}
              onChange={(url) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_image: url } })}
            />

            <BilingualInput
              label={isAr ? 'عنوان صفحة التصنيع' : 'Manufacturing Page Title'}
              valueEn={content.manufacturing?.hero_title_en}
              valueAr={content.manufacturing?.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_title_ar: v } })}
            />

            <BilingualInput
              label={isAr ? 'النص التعريفي لقطاع التصنيع' : 'Manufacturing Subtitle / Intro'}
              isTextarea
              rows={3}
              valueEn={content.manufacturing?.hero_body_en}
              valueAr={content.manufacturing?.hero_body_ar}
              onChangeEn={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_body_ar: v } })}
            />
          </div>

          {/* Factories List */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              {isAr ? 'صور المصانع الثلاثة المتخصصة' : '3 SPECIALIZED FACTORIES PHOTOS'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(content.manufacturing?.factories || []).map((fac, idx) => (
                <div key={fac.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">{isAr ? fac.title_ar : fac.title_en}</span>

                  <MediaFieldUploader
                    label={isAr ? `صورة المصنع: ${fac.title_ar || fac.title_en}` : `Factory Photo: ${fac.title_en}`}
                    bucket="photos"
                    value={fac.image_url || ''}
                    onChange={(url) => {
                      const updated = [...(content.manufacturing?.factories || [])];
                      updated[idx] = { ...updated[idx], image_url: url };
                      setContent({ ...content, manufacturing: { ...content.manufacturing, factories: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ─── TAB 5: CONTRACTING ─── */}
      {activeTab === 'contracting' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                {isAr ? 'بيانات وصور قطاع المقاولات والتجهيز الداخلي' : 'CONTRACTING & FIT-OUT HERO & PROJECT MEDIA'}
              </span>
            </div>

            <MediaFieldUploader
              label={isAr ? 'صورة الغلاف لقطاع المقاولات' : 'Contracting Hero Background Photo'}
              bucket="photos"
              value={content.contracting?.hero_image || ''}
              onChange={(url) => setContent({ ...content, contracting: { ...content.contracting, hero_image: url } })}
            />

            <BilingualInput
              label={isAr ? 'عنوان صفحة المقاولات' : 'Contracting Page Title'}
              valueEn={content.contracting?.hero_title_en}
              valueAr={content.contracting?.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_title_ar: v } })}
            />

            <BilingualInput
              label={isAr ? 'النص التعريفي لقطاع المقاولات' : 'Contracting Subtitle / Intro'}
              isTextarea
              rows={3}
              valueEn={content.contracting?.hero_body_en}
              valueAr={content.contracting?.hero_body_ar}
              onChangeEn={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_body_ar: v } })}
            />
          </div>

          {/* Contracting Services / Showcase Photos */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              {isAr ? 'صور مجالات وخدمات المقاولات' : 'CONTRACTING & FIT-OUT SERVICES SHOWCASE PHOTOS'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(content.contracting?.services || []).map((srv, idx) => (
                <div key={srv.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">{isAr ? srv.title_ar : srv.title_en}</span>

                  <MediaFieldUploader
                    label={isAr ? `معرض المشروع: ${srv.title_ar || srv.title_en}` : `Project Showcase: ${srv.title_en}`}
                    bucket="photos"
                    value={srv.image_url || ''}
                    onChange={(url) => {
                      const updated = [...(content.contracting?.services || [])];
                      updated[idx] = { ...updated[idx], image_url: url };
                      setContent({ ...content, contracting: { ...content.contracting, services: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </form>
  );
}
