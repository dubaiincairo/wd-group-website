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
  Handshake
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
import { useToast } from '@/components/admin/ToastProvider';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function PagesContentEditor() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'hospitality' | 'manufacturing' | 'contracting'>('home');
  const [content, setContent] = useState<SiteContentPayload | null>(null);
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
        setContent(d.data);
      }
    } catch (e) {
      console.error('Failed to load content:', e);
      showToast('Failed to load content', 'error');
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

      showToast('Page content & media saved and published successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">Loading multilingual CMS schemas…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>UNIFIED DUAL-LOCALE & MEDIA CMS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pages, Media & Sections Editor
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage headlines, narratives, photos, and videos across all sectors with instant live sync.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer whitespace-nowrap shrink-0 leading-none"
          >
            <Save className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap leading-none">{saving ? 'Publishing…' : 'Save & Publish All'}</span>
          </button>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0F1117] border border-white/10">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'about', label: 'About Us', icon: Compass },
          { id: 'hospitality', label: 'SwissBlue Hospitality', icon: Building2 },
          { id: 'manufacturing', label: 'GreenWood Manufacturing', icon: Factory },
          { id: 'contracting', label: 'Contracting & Fit-Out', icon: HardHat },
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
      </div>

      {/* ─── TAB 1: HOMEPAGE (COMPACT ACCORDION MODULES) ─── */}
      {activeTab === 'home' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Quick Accordion Expand / Collapse Controls */}
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-mono text-zinc-400 font-bold">
              HOMEPAGE CONTENT MODULES (8 SECTIONS)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Expand All</span>
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all cursor-pointer"
              >
                <Minimize2 className="w-3 h-3" />
                <span>Collapse All</span>
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
                    CINEMATIC HERO SECTION & HEADER CTA
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Eyebrow, 3-line slogan, subtitle narrative & top-right contact button
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.hero ? 'Collapse' : 'Expand'}
                </span>
                {openSections.hero ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.hero && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <BilingualInput
                  label="Hero Eyebrow / Tag"
                  valueEn={content.home.hero.eyebrow_en}
                  valueAr={content.home.hero.eyebrow_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <BilingualInput
                    label="Headline Line 1"
                    valueEn={content.home.hero.title_line1_en || 'Solid Vision.'}
                    valueAr={content.home.hero.title_line1_ar || 'رؤية راسخة.'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line1_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line1_ar: v } } })}
                  />

                  <BilingualInput
                    label="Headline Line 2 [Accent]"
                    valueEn={content.home.hero.title_line2_en || 'Diverse Sectors.'}
                    valueAr={content.home.hero.title_line2_ar || 'قطاعات متعددة.'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line2_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line2_ar: v } } })}
                  />

                  <BilingualInput
                    label="Headline Line 3"
                    valueEn={content.home.hero.title_line3_en || 'Promising Future.'}
                    valueAr={content.home.hero.title_line3_ar || 'مستقبل واعد.'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line3_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_line3_ar: v } } })}
                  />
                </div>

                <BilingualInput
                  label="Hero Subtitle / Narrative Body"
                  isTextarea
                  rows={3}
                  valueEn={content.home.hero.body_en}
                  valueAr={content.home.hero.body_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, body_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, body_ar: v } } })}
                />

                <BilingualInput
                  label="Hero Kicker / Secondary Tag"
                  valueEn={content.home.hero.kicker_en || 'Integrated Hospitality, Manufacturing & Contracting'}
                  valueAr={content.home.hero.kicker_ar || 'منظومة متكاملة في الضيافة والتصنيع والمقاولات'}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, kicker_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, kicker_ar: v } } })}
                />

                <BilingualInput
                  label="Header Navigation CTA Button (Top Right Corner)"
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
                    FLOATING SECTOR SWITCHER DOCK & BADGES
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Interactive switcher tab labels & counter badges
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.dock ? 'Collapse' : 'Expand'}
                </span>
                {openSections.dock ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.dock && (
              <div className="space-y-4 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">Sector 1: Hospitality Switcher Dock</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualInput
                      label="Hospitality Tab Label"
                      valueEn={content.home.hero.dock_hospitality_label_en || 'Hospitality (SwissBlue)'}
                      valueAr={content.home.hero.dock_hospitality_label_ar || 'الضيافة (SwissBlue)'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_label_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_label_ar: v } } })}
                    />
                    <BilingualInput
                      label="Hospitality Badge / Count"
                      valueEn={content.home.hero.dock_hospitality_badge_en || '6 Properties'}
                      valueAr={content.home.hero.dock_hospitality_badge_ar || '6 منشآت'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_badge_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_hospitality_badge_ar: v } } })}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Sector 2: Manufacturing Switcher Dock</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualInput
                      label="Manufacturing Tab Label"
                      valueEn={content.home.hero.dock_manufacturing_label_en || 'Manufacturing (GreenWood)'}
                      valueAr={content.home.hero.dock_manufacturing_label_ar || 'التصنيع والأثاث (GreenWood)'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_label_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_label_ar: v } } })}
                    />
                    <BilingualInput
                      label="Manufacturing Badge / Count"
                      valueEn={content.home.hero.dock_manufacturing_badge_en || '3 Factories'}
                      valueAr={content.home.hero.dock_manufacturing_badge_ar || '3 مصانع'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_badge_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_manufacturing_badge_ar: v } } })}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Sector 3: Contracting Switcher Dock</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BilingualInput
                      label="Contracting Tab Label"
                      valueEn={content.home.hero.dock_contracting_label_en || 'Contracting (Projects)'}
                      valueAr={content.home.hero.dock_contracting_label_ar || 'المقاولات والتميز الهندسي'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_label_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_label_ar: v } } })}
                    />
                    <BilingualInput
                      label="Contracting Badge / Status"
                      valueEn={content.home.hero.dock_contracting_badge_en || 'Turnkey Execution'}
                      valueAr={content.home.hero.dock_contracting_badge_ar || 'تنفيذ شامل'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_badge_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, dock_contracting_badge_ar: v } } })}
                    />
                  </div>
                </div>

                <BilingualInput
                  label="Scroll Cue Indicator Text"
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
                    HERO BACKGROUND VIDEOS
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Hospitality, Manufacturing, and Contracting background video stream URLs
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.videos ? 'Collapse' : 'Expand'}
                </span>
                {openSections.videos ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.videos && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <MediaFieldUploader
                  label="SwissBlue Hospitality Video"
                  accept="video"
                  bucket="videos"
                  value={content.home.media?.hero_video_hospitality || '/videos/hospitality.mp4'}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), hero_video_hospitality: url } } })}
                />

                <MediaFieldUploader
                  label="GreenWood Manufacturing Video"
                  accept="video"
                  bucket="videos"
                  value={content.home.media?.hero_video_manufacturing || '/videos/manufacturing.mp4'}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), hero_video_manufacturing: url } } })}
                />

                <MediaFieldUploader
                  label="Contracting & Fit-Out Video"
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
                    STRATEGIC SECTORS PHOTO CARDS
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Cover photos for Hospitality, Manufacturing & Contracting sector cards
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.sectors ? 'Collapse' : 'Expand'}
                </span>
                {openSections.sectors ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.sectors && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <MediaFieldUploader
                  label="Hospitality Sector Card Photo"
                  bucket="photos"
                  value={content.home.media?.sector_photo_hospitality || ''}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_hospitality: url } } })}
                />

                <MediaFieldUploader
                  label="Manufacturing Sector Card Photo"
                  bucket="photos"
                  value={content.home.media?.sector_photo_manufacturing || ''}
                  onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_manufacturing: url } } })}
                />

                <MediaFieldUploader
                  label="Contracting Sector Card Photo"
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
                    INTEGRATED VALUE CHAIN SYNERGY
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Holding lifecycle synergy: Manufacture, Build, Operate
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.synergy ? 'Collapse' : 'Expand'}
                </span>
                {openSections.synergy ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.synergy && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <BilingualInput
                  label="Synergy Heading"
                  valueEn={content.home.synergy.heading_en}
                  valueAr={content.home.synergy.heading_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, heading_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, heading_ar: v } } })}
                />

                <BilingualInput
                  label="Synergy Intro Description"
                  isTextarea
                  rows={3}
                  valueEn={content.home.synergy.intro_en}
                  valueAr={content.home.synergy.intro_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, intro_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, intro_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">Step 01: Manufacturing</span>
                    <BilingualInput
                      label="Step 1 Title"
                      valueEn={content.home.synergy.step1_title_en || 'Manufacture'}
                      valueAr={content.home.synergy.step1_title_ar || 'التصنيع والإنتاج'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_title_ar: v } } })}
                    />
                    <BilingualInput
                      label="Step 1 Narrative"
                      isTextarea
                      rows={3}
                      valueEn={content.home.synergy.step1_text_en || ''}
                      valueAr={content.home.synergy.step1_text_ar || ''}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_text_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step1_text_ar: v } } })}
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-amber-400">Step 02: Fit-Out & Contracting</span>
                    <BilingualInput
                      label="Step 2 Title"
                      valueEn={content.home.synergy.step2_title_en || 'Build & Fit Out'}
                      valueAr={content.home.synergy.step2_title_ar || 'التنفيذ والتجهيز المعماري'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_title_ar: v } } })}
                    />
                    <BilingualInput
                      label="Step 2 Narrative"
                      isTextarea
                      rows={3}
                      valueEn={content.home.synergy.step2_text_en || ''}
                      valueAr={content.home.synergy.step2_text_ar || ''}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_text_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step2_text_ar: v } } })}
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-3">
                    <span className="text-xs font-mono font-bold text-sky-400">Step 03: Hospitality Operations</span>
                    <BilingualInput
                      label="Step 3 Title"
                      valueEn={content.home.synergy.step3_title_en || 'Operate'}
                      valueAr={content.home.synergy.step3_title_ar || 'التشغيل الفندقي وإدارة الأصول'}
                      onChangeEn={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step3_title_en: v } } })}
                      onChangeAr={(v) => setContent({ ...content, home: { ...content.home, synergy: { ...content.home.synergy, step3_title_ar: v } } })}
                    />
                    <BilingualInput
                      label="Step 3 Narrative"
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
                    IDENTITY, VISION, MISSION & VALUES
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Vision narrative, mission principles & corporate values
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.identity ? 'Collapse' : 'Expand'}
                </span>
                {openSections.identity ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.identity && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BilingualInput
                    label="Vision Title"
                    valueEn={content.home.identity.vision_title_en || 'Vision'}
                    valueAr={content.home.identity.vision_title_ar || 'الرؤية'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_title_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_title_ar: v } } })}
                  />
                  <BilingualInput
                    label="Mission Title"
                    valueEn={content.home.identity.mission_title_en || 'Mission'}
                    valueAr={content.home.identity.mission_title_ar || 'الرسالة'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, mission_title_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, mission_title_ar: v } } })}
                  />
                </div>

                <BilingualInput
                  label="Vision Statement"
                  isTextarea
                  rows={3}
                  valueEn={content.home.identity.vision_desc_en || ''}
                  valueAr={content.home.identity.vision_desc_ar || ''}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_desc_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...content.home.identity, vision_desc_ar: v } } })}
                />

                <BilingualInput
                  label="Mission Statement"
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
                    CEO LEADERSHIP QUOTE & 1:1 PORTRAIT
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Executive statement, leader name, title & 1:1 photo uploader
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.ceo ? 'Collapse' : 'Expand'}
                </span>
                {openSections.ceo ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.ceo && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <MediaFieldUploader
                  label="CEO Executive Portrait / Photo (1:1 Ratio)"
                  description="Square 1:1 aspect ratio recommended for leadership portrait"
                  aspectRatio="1:1"
                  bucket="photos"
                  value={content.home.ceo.photo_url || content.home.media?.ceo_photo || ''}
                  onChange={(url) => setContent({
                    ...content,
                    home: {
                      ...content.home,
                      ceo: { ...content.home.ceo, photo_url: url },
                      media: { ...(content.home.media || {}), ceo_photo: url }
                    }
                  })}
                />

                <BilingualInput
                  label="Quote Statement"
                  isTextarea
                  rows={3}
                  valueEn={content.home.ceo.quote_en}
                  valueAr={content.home.ceo.quote_ar}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, quote_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, quote_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BilingualInput
                    label="Leader Name"
                    valueEn={content.home.ceo.name_en}
                    valueAr={content.home.ceo.name_ar}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, name_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...content.home.ceo, name_ar: v } } })}
                  />
                  <BilingualInput
                    label="Leader Title / Role"
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
                    STRATEGIC PARTNERSHIP & CONTACT CTA
                  </span>
                  <span className="text-[10px] text-zinc-500 block -mt-0.5">
                    Inquiry headline, narrative & custom CTA action buttons
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300">
                  {openSections.partnership ? 'Collapse' : 'Expand'}
                </span>
                {openSections.partnership ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
              </div>
            </div>

            {openSections.partnership && (
              <div className="space-y-5 pt-5 border-t border-white/10 mt-4 animate-in fade-in duration-150">
                <BilingualInput
                  label="Banner Heading"
                  valueEn={content.home.partnership?.heading_en || 'Interested in Building a Partnership With Us?'}
                  valueAr={content.home.partnership?.heading_ar || 'هل ترغب في بناء شراكة استراتيجية معنا؟'}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), heading_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), heading_ar: v } } })}
                />

                <BilingualInput
                  label="Banner Narrative"
                  isTextarea
                  rows={3}
                  valueEn={content.home.partnership?.body_en || ''}
                  valueAr={content.home.partnership?.body_ar || ''}
                  onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), body_en: v } } })}
                  onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), body_ar: v } } })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BilingualInput
                    label="Primary CTA Button Label"
                    valueEn={content.home.partnership?.primary_cta_en || 'Start a Partnership'}
                    valueAr={content.home.partnership?.primary_cta_ar || 'ابدأ شراكة جديدة'}
                    onChangeEn={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), primary_cta_en: v } } })}
                    onChangeAr={(v) => setContent({ ...content, home: { ...content.home, partnership: { ...(content.home.partnership || {}), primary_cta_ar: v } } })}
                  />
                  <BilingualInput
                    label="Secondary CTA Button Label"
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
                ABOUT US HERO IMAGE & STORY
              </span>
            </div>

            <MediaFieldUploader
              label="About Us Hero Background Image"
              bucket="photos"
              value={content.about.hero_image || ''}
              onChange={(url) => setContent({ ...content, about: { ...content.about, hero_image: url } })}
            />

            <MediaFieldUploader
              label="About Us Heritage & Story Photo"
              bucket="photos"
              value={content.about.story_image || ''}
              onChange={(url) => setContent({ ...content, about: { ...content.about, story_image: url } })}
            />

            <BilingualInput
              label="Story Heading"
              valueEn={content.about.story_heading_en}
              valueAr={content.about.story_heading_ar}
              onChangeEn={(v) => setContent({ ...content, about: { ...content.about, story_heading_en: v } })}
              onChangeAr={(v) => setContent({ ...content, about: { ...content.about, story_heading_ar: v } })}
            />

            <BilingualInput
              label="Story Narrative Body"
              isTextarea
              rows={4}
              valueEn={content.about.story_body_en}
              valueAr={content.about.story_body_ar}
              onChangeEn={(v) => setContent({ ...content, about: { ...content.about, story_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, about: { ...content.about, story_body_ar: v } })}
            />

            <BilingualInput
              label="Governance & Purpose Statement"
              isTextarea
              rows={4}
              valueEn={content.about.governance_statement_en}
              valueAr={content.about.governance_statement_ar}
              onChangeEn={(v) => setContent({ ...content, about: { ...content.about, governance_statement_en: v } })}
              onChangeAr={(v) => setContent({ ...content, about: { ...content.about, governance_statement_ar: v } })}
            />
          </div>

        </div>
      )}

      {/* ─── TAB 3: HOSPITALITY ─── */}
      {activeTab === 'hospitality' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                SWISSBLUE HOSPITALITY HERO & PHOTOS
              </span>
            </div>

            <MediaFieldUploader
              label="Hospitality Hero Background Photo"
              bucket="photos"
              value={content.hospitality.hero_image || ''}
              onChange={(url) => setContent({ ...content, hospitality: { ...content.hospitality, hero_image: url } })}
            />

            <BilingualInput
              label="Hospitality Page Title"
              valueEn={content.hospitality.hero_title_en}
              valueAr={content.hospitality.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, hospitality: { ...content.hospitality, hero_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, hospitality: { ...content.hospitality, hero_title_ar: v } })}
            />

            <BilingualInput
              label="Hospitality Subtitle / Intro"
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
              HOSPITALITY PROPERTIES PHOTOS & DETAILS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.hospitality.properties.map((prop, idx) => (
                <div key={prop.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{prop.name_en}</span>
                    <span className="text-[10px] font-mono text-sky-400">{prop.city_en}</span>
                  </div>

                  <MediaFieldUploader
                    label={`Property Photo: ${prop.name_en}`}
                    bucket="photos"
                    value={prop.image_url || ''}
                    onChange={(url) => {
                      const updated = [...content.hospitality.properties];
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
                GREENWOOD MANUFACTURING HERO & ASSETS
              </span>
            </div>

            <MediaFieldUploader
              label="Manufacturing Hero Background Photo"
              bucket="photos"
              value={content.manufacturing.hero_image || ''}
              onChange={(url) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_image: url } })}
            />

            <BilingualInput
              label="Manufacturing Page Title"
              valueEn={content.manufacturing.hero_title_en}
              valueAr={content.manufacturing.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_title_ar: v } })}
            />

            <BilingualInput
              label="Manufacturing Subtitle / Intro"
              isTextarea
              rows={3}
              valueEn={content.manufacturing.hero_body_en}
              valueAr={content.manufacturing.hero_body_ar}
              onChangeEn={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, manufacturing: { ...content.manufacturing, hero_body_ar: v } })}
            />
          </div>

          {/* Factories List */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              3 SPECIALIZED FACTORIES PHOTOS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.manufacturing.factories.map((fac, idx) => (
                <div key={fac.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">{fac.title_en}</span>

                  <MediaFieldUploader
                    label={`Factory Photo: ${fac.title_en}`}
                    bucket="photos"
                    value={fac.image_url || ''}
                    onChange={(url) => {
                      const updated = [...content.manufacturing.factories];
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
                CONTRACTING & FIT-OUT HERO & PROJECT MEDIA
              </span>
            </div>

            <MediaFieldUploader
              label="Contracting Hero Background Photo"
              bucket="photos"
              value={content.contracting.hero_image || ''}
              onChange={(url) => setContent({ ...content, contracting: { ...content.contracting, hero_image: url } })}
            />

            <BilingualInput
              label="Contracting Page Title"
              valueEn={content.contracting.hero_title_en}
              valueAr={content.contracting.hero_title_ar}
              onChangeEn={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_title_ar: v } })}
            />

            <BilingualInput
              label="Contracting Subtitle / Intro"
              isTextarea
              rows={3}
              valueEn={content.contracting.hero_body_en}
              valueAr={content.contracting.hero_body_ar}
              onChangeEn={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_body_en: v } })}
              onChangeAr={(v) => setContent({ ...content, contracting: { ...content.contracting, hero_body_ar: v } })}
            />
          </div>

          {/* Contracting Services / Showcase Photos */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              CONTRACTING & FIT-OUT SERVICES SHOWCASE PHOTOS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.contracting.services.map((srv, idx) => (
                <div key={srv.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">{srv.title_en}</span>

                  <MediaFieldUploader
                    label={`Project Showcase: ${srv.title_en}`}
                    bucket="photos"
                    value={srv.image_url || ''}
                    onChange={(url) => {
                      const updated = [...content.contracting.services];
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
