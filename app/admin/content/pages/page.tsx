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
          </div>

          {/* Section 2: Hero Background Videos & Posters */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>02. HERO BACKGROUND VIDEOS & POSTERS</span>
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

          {/* Section 3: Homepage Sectors Photo Cards */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                <span>03. STRATEGIC SECTORS PHOTO CARDS</span>
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

          {/* Section 4: Value Chain Synergy */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                04. INTEGRATED VALUE CHAIN SYNERGY
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
