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
  Video
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing…' : 'Save & Publish All'}</span>
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
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── TAB 1: HOMEPAGE ─── */}
      {activeTab === 'home' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Section 1: Hero Section */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                01. CINEMATIC HERO SECTION HEADLINES
              </span>
            </div>

            <BilingualInput
              label="Hero Eyebrow / Tag"
              valueEn={content.home.hero.eyebrow_en}
              valueAr={content.home.hero.eyebrow_ar}
              onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_en: v } } })}
              onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_ar: v } } })}
            />

            {/* 3-Line Slogan Breakdown */}
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
          </div>

          {/* Section 2: Floating Sector Switcher Dock */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>02. FLOATING SECTOR SWITCHER DOCK & BADGES</span>
              </span>
            </div>

            <div className="space-y-4">
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
          </div>

          {/* Section 3: Hero Background Videos & Posters */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>03. HERO BACKGROUND VIDEOS & POSTERS</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>

          {/* Section 4: Homepage Sectors Photo Cards */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                <span>04. STRATEGIC SECTORS PHOTO CARDS</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MediaFieldUploader
                label="Hospitality Sector Card Photo"
                bucket="photos"
                value={content.home.media?.sector_photo_hospitality || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'}
                onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_hospitality: url } } })}
              />

              <MediaFieldUploader
                label="Manufacturing Sector Card Photo"
                bucket="photos"
                value={content.home.media?.sector_photo_manufacturing || 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'}
                onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_manufacturing: url } } })}
              />

              <MediaFieldUploader
                label="Contracting Sector Card Photo"
                bucket="photos"
                value={content.home.media?.sector_photo_contracting || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                onChange={(url) => setContent({ ...content, home: { ...content.home, media: { ...(content.home.media || {}), sector_photo_contracting: url } } })}
              />
            </div>
          </div>

          {/* Section 5: Value Chain Synergy (Heading & 3 Steps) */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                05. INTEGRATED VALUE CHAIN SYNERGY
              </span>
            </div>

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

          {/* Section 6: Identity, Vision, Mission & Values */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                06. IDENTITY, VISION, MISSION & VALUES
              </span>
            </div>

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

          {/* Section 7: CEO Quote & Governance */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider">
                07. CEO LEADERSHIP QUOTE, PORTRAIT & GOVERNANCE
              </span>
            </div>

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

          {/* Section 8: Strategic Partnership CTA Banner */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                08. STRATEGIC PARTNERSHIP CTA BANNER
              </span>
            </div>

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
              value={content.about.hero_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85'}
              onChange={(url) => setContent({ ...content, about: { ...content.about, hero_image: url } })}
            />

            <MediaFieldUploader
              label="About Us Heritage & Story Photo"
              bucket="photos"
              value={content.about.story_image || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'}
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
              value={content.hospitality.hero_image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85'}
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
              value={content.manufacturing.hero_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=85'}
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
              value={content.contracting.hero_image || 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=2400&q=85'}
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
