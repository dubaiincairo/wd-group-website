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
  Eye
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
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

      showToast('Page content saved and published successfully', 'success');
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
      
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>UNIFIED DUAL-LOCALE CMS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pages & Sections Editor
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage page headlines, subtitles, and call-to-action buttons across Arabic & English.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing…' : 'Save & Publish All'}</span>
          </button>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0F1117] border border-white/10">
        {[
          { id: 'home', label: 'Homepage (/)', icon: Home },
          { id: 'about', label: 'About Us (/about)', icon: Compass },
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

      {/* ─── TAB: HOMEPAGE ─── */}
      {activeTab === 'home' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Section 1: Hero Section */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                // 01. CINEMATIC HERO SECTION
              </span>
            </div>

            <BilingualInput
              label="Hero Eyebrow / Tag"
              valueEn={content.home.hero.eyebrow_en}
              valueAr={content.home.hero.eyebrow_ar}
              onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_en: v } } })}
              onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, eyebrow_ar: v } } })}
            />

            <BilingualInput
              label="Hero Main Headline"
              valueEn={content.home.hero.title_en}
              valueAr={content.home.hero.title_ar}
              onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_en: v } } })}
              onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, title_ar: v } } })}
            />

            <BilingualInput
              label="Hero Subtitle / Narrative Body"
              isTextarea
              rows={3}
              valueEn={content.home.hero.body_en}
              valueAr={content.home.hero.body_ar}
              onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, body_en: v } } })}
              onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, body_ar: v } } })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BilingualInput
                label="Primary CTA Button Label"
                valueEn={content.home.hero.primary_cta_en}
                valueAr={content.home.hero.primary_cta_ar}
                onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, primary_cta_en: v } } })}
                onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, primary_cta_ar: v } } })}
              />

              <BilingualInput
                label="Secondary CTA Button Label"
                valueEn={content.home.hero.secondary_cta_en}
                valueAr={content.home.hero.secondary_cta_ar}
                onChangeEn={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, secondary_cta_en: v } } })}
                onChangeAr={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, secondary_cta_ar: v } } })}
              />
            </div>
          </div>

          {/* Section 2: Value Chain Synergy */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                // 02. INTEGRATED VALUE CHAIN SYNERGY
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

      {/* ─── TAB: ABOUT US ─── */}
      {activeTab === 'about' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                // ABOUT US STORY & HERITAGE
              </span>
            </div>

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

      {/* ─── TAB: HOSPITALITY ─── */}
      {activeTab === 'hospitality' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                // SWISSBLUE HOSPITALITY HERO
              </span>
            </div>

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
        </div>
      )}

      {/* ─── TAB: MANUFACTURING ─── */}
      {activeTab === 'manufacturing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                // GREENWOOD MANUFACTURING HERO
              </span>
            </div>

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
        </div>
      )}

      {/* ─── TAB: CONTRACTING ─── */}
      {activeTab === 'contracting' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                // CONTRACTING & FIT-OUT HERO
              </span>
            </div>

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
        </div>
      )}

    </form>
  );
}
