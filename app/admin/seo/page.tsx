'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Globe, 
  Save, 
  RefreshCw, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  Activity, 
  Shield, 
  FileCode2, 
  Bot, 
  Building,
  Key,
  ExternalLink,
  Code
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
import { useToast } from '@/components/admin/ToastProvider';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function SEOAdminPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [content, setContent] = useState<SiteContentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ogImageError, setOgImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'google' | 'analytics' | 'meta' | 'social' | 'schema' | 'robots'>('google');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const d = await res.json();
          if (d.data) {
            if (!d.data.seo.google_analytics_id) {
              d.data.seo.google_analytics_id = 'G-FVBW70B8H5';
            }
            setContent(d.data);
          }
        }
      } catch (err) {
        showToast(isAr ? 'فشل تحميل بيانات محركات البحث' : 'Failed to load SEO configuration', 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [showToast, isAr]);

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
      if (!res.ok) throw new Error('Failed to save SEO metadata');
      showToast(isAr ? 'تم حفظ ونشر بيانات السيو ومحركات البحث بنجاح' : 'Google Search records & SEO metadata published successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في الحفظ' : 'Error saving SEO data'), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل سجلات محركات البحث وبيانات السيو…' : 'Loading Google Search & SEO records…'} />;
  }

  const seo = content.seo;

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>{isAr ? 'مركز التحكم في محركات البحث وجوجل' : 'GOOGLE SEARCH & SEO CONTROL CENTER'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'سجلات محركات البحث والسيو' : 'Google Search & SEO Records'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'إدارة ظهور الموقع في نتائج جوجل، بطاقات المشاركة على السوشيال ميديا، وإحصائيات جوجل.' : 'Configure search appearance, OpenGraph sharing cards, structured JSON-LD schemas, and Google Analytics.'}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer whitespace-nowrap shrink-0 leading-none self-start sm:self-auto"
        >
          <Save className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ النشر…' : 'Publishing…') : (isAr ? 'حفظ ونشر إعدادات السيو' : 'Save & Publish SEO')}</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        {[
          { id: 'google', label: isAr ? 'التحقق ومحركات البحث' : 'Google Search & Verification', icon: Key },
          { id: 'analytics', label: isAr ? 'إحصائيات جوجل GA4 و GTM' : 'GA4 & Tag Manager', icon: Activity },
          { id: 'meta', label: isAr ? 'عناوين الميتا والكلمات الدلالية' : 'Meta Titles & Keywords', icon: Globe },
          { id: 'social', label: isAr ? 'المشاركة والسوشيال ميديا' : 'Social & Open Graph', icon: Share2 },
          { id: 'schema', label: isAr ? 'البيانات المنظمة Schema.org' : 'Schema.org JSON-LD', icon: FileCode2 },
          { id: 'robots', label: isAr ? 'الأرشفة وملف Robots.txt' : 'Robots & Indexing', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Active Tab Content */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* ══════════ TAB 1: GOOGLE SEARCH CONSOLE & VERIFICATION ══════════ */}
          {activeTab === 'google' && (
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-150">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Google Search Console & Webmaster Verification</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter your verification codes to claim ownership of your domain in search consoles without editing DNS manually.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    Google Site Verification Meta Tag
                  </label>
                  <p className="text-[11px] text-zinc-400 mb-2">
                    Enter the code from Google Search Console (e.g., <code className="text-amber-300 font-mono">google-site-verification=abc123xyz...</code> or string token).
                  </p>
                  <input
                    type="text"
                    value={seo.google_site_verification || ''}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, google_site_verification: e.target.value } })}
                    placeholder="e.g. google-site-verification=XXXXXXXXXXXXXXXXXXXXXXX"
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    Bing Webmaster Verification Code
                  </label>
                  <p className="text-[11px] text-zinc-400 mb-2">
                    Microsoft Bing Webmaster Tools meta tag verification (<code className="text-blue-300 font-mono">msvalidate.01</code>).
                  </p>
                  <input
                    type="text"
                    value={seo.bing_site_verification || ''}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, bing_site_verification: e.target.value } })}
                    placeholder="e.g. 7F34B9C8E1D2A540XXXXXXXXXXXXXXXX"
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                  <span className="font-bold block">💡 How It Works:</span>
                  <p className="text-[11px] leading-relaxed text-amber-200/80">
                    Once saved, our system dynamically injects these exact verification meta tags into the <code className="font-mono text-white">&lt;head&gt;</code> of all live pages on <code className="font-mono text-white">wdgroup.online</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB 2: GOOGLE ANALYTICS 4 & GTM ══════════ */}
          {activeTab === 'analytics' && (
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-150">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Google Analytics 4 (GA4) & Google Tag Manager (GTM)</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Connect real-time visitor traffic telemetry, conversion funnels, and event triggers.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    Google Analytics 4 Measurement ID (GA4)
                  </label>
                  <p className="text-[11px] text-zinc-400 mb-2">
                    Found in Google Analytics Admin &gt; Data Streams (format: <code className="text-emerald-300 font-mono">G-XXXXXXXXXX</code>).
                  </p>
                  <input
                    type="text"
                    value={seo.google_analytics_id || ''}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, google_analytics_id: e.target.value } })}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    Google Tag Manager Container ID (GTM)
                  </label>
                  <p className="text-[11px] text-zinc-400 mb-2">
                    Found in Tag Manager dashboard (format: <code className="text-sky-300 font-mono">GTM-XXXXXXX</code>).
                  </p>
                  <input
                    type="text"
                    value={seo.google_tag_manager_id || ''}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, google_tag_manager_id: e.target.value } })}
                    placeholder="GTM-XXXXXXX"
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 space-y-1">
                  <span className="font-bold block">🚀 Async High-Performance Script Injection:</span>
                  <p className="text-[11px] leading-relaxed text-emerald-200/80">
                    Google Analytics and Tag Manager scripts are loaded asynchronously with zero performance degradation, maintaining 100% Core Web Vitals score.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB 3: META TITLES & KEYWORDS ══════════ */}
          {activeTab === 'meta' && (
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-150">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Meta Titles, Descriptions & Search Keywords</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Define primary bilingual search snippets for English and Arabic Google queries.
                </p>
              </div>

              <div className="space-y-5">
                <BilingualInput
                  label="Global Meta Title"
                  description="Headline in search listings and browser tabs (~50-60 characters)"
                  valueEn={seo.global_title_en}
                  valueAr={seo.global_title_ar}
                  onChangeEn={(v) => setContent({ ...content, seo: { ...seo, global_title_en: v } })}
                  onChangeAr={(v) => setContent({ ...content, seo: { ...seo, global_title_ar: v } })}
                />

                <BilingualInput
                  label="Global Meta Description"
                  description="Summary paragraph displayed below the headline (~150-160 characters)"
                  isTextarea
                  rows={3}
                  valueEn={seo.global_description_en}
                  valueAr={seo.global_description_ar}
                  onChangeEn={(v) => setContent({ ...content, seo: { ...seo, global_description_en: v } })}
                  onChangeAr={(v) => setContent({ ...content, seo: { ...seo, global_description_ar: v } })}
                />

                <BilingualInput
                  label="Search Keywords & Meta Tags"
                  description="Comma-separated keywords for search engines and indexing directories"
                  isTextarea
                  rows={2}
                  valueEn={seo.keywords_en || ''}
                  valueAr={seo.keywords_ar || ''}
                  onChangeEn={(v) => setContent({ ...content, seo: { ...seo, keywords_en: v } })}
                  onChangeAr={(v) => setContent({ ...content, seo: { ...seo, keywords_ar: v } })}
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Canonical Base URL</label>
                  <input
                    type="url"
                    value={seo.canonical_base || 'https://wdgroup.online'}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, canonical_base: e.target.value } })}
                    placeholder="https://wdgroup.online"
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-4 border-t border-white/10">
                  <MediaFieldUploader
                    label={isAr ? 'أيقونة المتصفح والمفضلة (Favicon & Touch Icon)' : 'Browser Favicon & Touch Icon'}
                    description={isAr ? 'أيقونة الموقع التي تظهر في ألسنة المتصفحات ومحركات البحث وقوائم المشاركة' : 'Favicon displayed in browser tabs, address bar, mobile shortcuts, and search engine snippets'}
                    value={seo.favicon_url || content.branding?.favicon || content.settings?.favicon_url || ''}
                    onChange={(url) => setContent({
                      ...content,
                      seo: { ...seo, favicon_url: url },
                      settings: { ...content.settings, favicon_url: url },
                      branding: { ...content.branding, favicon: url }
                    })}
                    bucket="photos"
                    accept="image"
                    aspectRatio="1:1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB 4: SOCIAL GRAPH & OPEN GRAPH ══════════ */}
          {activeTab === 'social' && (
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-150">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-sky-400" />
                  <span>Social Graph & Open Graph Sharing</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Control how links appear when shared on WhatsApp, LinkedIn, Twitter/X, and Facebook.
                </p>
              </div>

              <div className="space-y-5">
                <MediaFieldUploader
                  label="Open Graph Preview Banner (1200x630px)"
                  description="Banner image shown when sharing the link on WhatsApp, LinkedIn, and social media"
                  bucket="photos"
                  accept="image"
                  value={seo.og_image_url || ''}
                  onChange={(url) => {
                    setOgImageError(false);
                    setContent({ ...content, seo: { ...seo, og_image_url: url } });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Twitter / X Card Format
                    </label>
                    <select
                      value={seo.twitter_card || 'summary_large_image'}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, twitter_card: e.target.value } })}
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="summary_large_image">summary_large_image (Large Hero Banner)</option>
                      <option value="summary">summary (Compact Square Thumbnail)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Twitter / X Handle
                    </label>
                    <input
                      type="text"
                      value={seo.twitter_handle || '@wdgroup'}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, twitter_handle: e.target.value } })}
                      placeholder="@wdgroup"
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB 5: SCHEMA.ORG STRUCTURED DATA ══════════ */}
          {activeTab === 'schema' && (
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-150">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-purple-400" />
                  <span>Schema.org JSON-LD Structured Data</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Enables Google Knowledge Graph panel, rich snippets, and institutional verified organization status.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    Organization Type
                  </label>
                  <select
                    value={seo.schema_org_type || 'Corporation'}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, schema_org_type: e.target.value } })}
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Corporation">Corporation (Holding Company)</option>
                    <option value="Organization">Organization</option>
                    <option value="LocalBusiness">LocalBusiness</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Legal Entity Name (Arabic)
                    </label>
                    <input
                      type="text"
                      value={seo.schema_legal_name_ar || 'مجموعة دبليو دي للأعمال'}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, schema_legal_name_ar: e.target.value } })}
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Legal Entity Name (English)
                    </label>
                    <input
                      type="text"
                      value={seo.schema_legal_name_en || 'WD Group for Business'}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, schema_legal_name_en: e.target.value } })}
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Official Contact Phone
                    </label>
                    <input
                      type="text"
                      value={seo.schema_phone || '+966 50 572 5070'}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, schema_phone: e.target.value } })}
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white block mb-1">
                      Official Inquiries Email
                    </label>
                    <input
                      type="email"
                      value={seo.schema_email || 'ceo@wdgroup.online'}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, schema_email: e.target.value } })}
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB 6: ROBOTS & INDEXING ══════════ */}
          {activeTab === 'robots' && (
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in duration-150">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-rose-400" />
                  <span>Search Crawling, Robots & XML Sitemap</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Instruct search spiders how to index and discover your site pages.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Search Engine Indexing
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Allow Google, Bing, and other search engines to crawl and index this site (robots: index, follow).
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seo.robots_index !== false}
                      onChange={(e) => setContent({ ...content, seo: { ...seo, robots_index: e.target.checked } })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="text-xs font-bold text-white block mb-1">
                    XML Sitemap URL
                  </label>
                  <input
                    type="url"
                    value={seo.sitemap_url || 'https://wdgroup.online/sitemap.xml'}
                    onChange={(e) => setContent({ ...content, seo: { ...seo, sitemap_url: e.target.value } })}
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 5 Cols: Interactive Previews */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Google Search Snippet Preview */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>LIVE GOOGLE SEARCH PREVIEW</span>
            </h3>

            {/* Arabic Preview */}
            <div className="bg-[#1F1F1F] rounded-2xl p-4 space-y-1.5 font-sans border border-white/5" dir="rtl">
              <div className="text-[11px] text-zinc-400 font-mono">wdgroup.online › ar</div>
              <div className="text-sm font-bold text-[#8AB4F8] hover:underline cursor-pointer leading-tight">
                {seo.global_title_ar || 'مجموعة دبليو دي للأعمال'}
              </div>
              <p className="text-xs text-[#BDC1C6] leading-relaxed line-clamp-2">
                {seo.global_description_ar || 'مجموعة أعمال سعودية رائدة تصنع قيمة مستدامة...'}
              </p>
            </div>

            {/* English Preview */}
            <div className="bg-[#1F1F1F] rounded-2xl p-4 space-y-1.5 font-sans border border-white/5" dir="ltr">
              <div className="text-[11px] text-zinc-400 font-mono">wdgroup.online</div>
              <div className="text-sm font-bold text-[#8AB4F8] hover:underline cursor-pointer leading-tight">
                {seo.global_title_en || 'WD Group | Integrated Holding'}
              </div>
              <p className="text-xs text-[#BDC1C6] leading-relaxed line-clamp-2">
                {seo.global_description_en || 'A premier Saudi business group creating sustainable value...'}
              </p>
            </div>
          </div>

          {/* Social Share Card Preview */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5" />
              <span>SOCIAL SHARE CARD PREVIEW</span>
            </h3>

            <div className="bg-black/50 border border-white/15 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video bg-[#08090C] overflow-hidden relative flex items-center justify-center">
                {seo.og_image_url && !ogImageError ? (
                  <img 
                    src={seo.og_image_url} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    onError={() => setOgImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0c1222] via-[#090d18] to-[#040508] relative flex items-center justify-center p-6 text-center select-none">
                    <div className="relative h-12 w-48">
                      <Image
                        src="/brand/wd-group-logo-white.png"
                        alt="WD Group Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1 bg-[#0D0F16] border-t border-white/10">
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">WDGROUP.ONLINE</span>
                <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">{seo.global_title_en || 'WD Group | Saudi Business Group'}</p>
                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{seo.global_description_en || 'A premier Saudi business group creating sustainable value across hospitality, manufacturing, and contracting.'}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </form>
  );
}
