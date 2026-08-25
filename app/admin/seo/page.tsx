'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Globe, Save, RefreshCw, Sparkles, Share2 } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
import { useToast } from '@/components/admin/ToastProvider';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function SEOAdminPage() {
  const { showToast } = useToast();
  const [content, setContent] = useState<SiteContentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ogImageError, setOgImageError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const d = await res.json();
          setContent(d.data);
        }
      } catch (err) {
        showToast('Failed to load SEO metadata', 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [showToast]);

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
      showToast('Search engine & social graph metadata saved', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving SEO data', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">Loading SEO metadata…</p>
      </div>
    );
  }

  const seo = content.seo;

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>SEARCH ENGINE & OPEN GRAPH</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            SEO & Social Metadata
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Optimize search engine ranking snippets, social card sharing previews, and canonical domains.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing…' : 'Save & Publish Metadata'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl">
            <BilingualInput
              label="Global Site Title (<title>)"
              description="Primary headline in browser tabs and search engine listings (recommended ~60 chars)"
              valueEn={seo.global_title_en}
              valueAr={seo.global_title_ar}
              onChangeEn={(v) => setContent({ ...content, seo: { ...seo, global_title_en: v } })}
              onChangeAr={(v) => setContent({ ...content, seo: { ...seo, global_title_ar: v } })}
            />

            <BilingualInput
              label="Meta Description (<meta name='description'>)"
              description="Summary paragraph displayed below the title in search engine results (~150-160 chars)"
              isTextarea
              rows={3}
              valueEn={seo.global_description_en}
              valueAr={seo.global_description_ar}
              onChangeEn={(v) => setContent({ ...content, seo: { ...seo, global_description_en: v } })}
              onChangeAr={(v) => setContent({ ...content, seo: { ...seo, global_description_ar: v } })}
            />

            <MediaFieldUploader
              label="Open Graph Social Preview Image (og:image)"
              description="Preview banner displayed when sharing website links across WhatsApp, LinkedIn, Twitter, and Facebook (recommended 1200x630px)"
              bucket="photos"
              accept="image"
              value={seo.og_image_url || ''}
              onChange={(url) => setContent({ ...content, seo: { ...seo, og_image_url: url } })}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">Canonical Base URL</label>
              <input
                type="url"
                value={seo.canonical_base || 'https://wdgroup.sa'}
                onChange={(e) => setContent({ ...content, seo: { ...seo, canonical_base: e.target.value } })}
                placeholder="https://wdgroup.sa"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Search Snippet & Social Previews */}
        <div className="space-y-6">
          
          {/* Google Search Snippet Preview */}
          <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              GOOGLE SEARCH PREVIEW
            </h3>

            {/* Arabic Preview */}
            <div className="bg-[#1F1F1F] rounded-2xl p-4 space-y-1.5 font-sans" dir="rtl">
              <div className="text-[11px] text-zinc-400 font-mono">wdgroup.sa › ar</div>
              <div className="text-sm font-bold text-[#8AB4F8] hover:underline cursor-pointer leading-tight">
                {seo.global_title_ar || 'مجموعة دبليو دي للأعمال'}
              </div>
              <p className="text-xs text-[#BDC1C6] leading-relaxed line-clamp-2">
                {seo.global_description_ar || 'مجموعة أعمال سعودية رائدة...'}
              </p>
            </div>

            {/* English Preview */}
            <div className="bg-[#1F1F1F] rounded-2xl p-4 space-y-1.5 font-sans" dir="ltr">
              <div className="text-[11px] text-zinc-400 font-mono">wdgroup.sa</div>
              <div className="text-sm font-bold text-[#8AB4F8] hover:underline cursor-pointer leading-tight">
                {seo.global_title_en || 'WD Group | Integrated Holding'}
              </div>
              <p className="text-xs text-[#BDC1C6] leading-relaxed line-clamp-2">
                {seo.global_description_en || 'A premier Saudi business group...'}
              </p>
            </div>
          </div>

            {/* Social Share Card Preview */}
            <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span>SOCIAL CARD PREVIEW</span>
              </h3>

              <div className="bg-black/50 border border-white/15 rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-[#08090C] overflow-hidden relative flex items-center justify-center">
                  {seo.og_image_url && !ogImageError ? (
                    <img 
                      src={seo.og_image_url} 
                      alt="Social Card" 
                      className="w-full h-full object-cover" 
                      onError={() => setOgImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0c1222] via-[#090d18] to-[#040508] relative flex flex-col items-center justify-center p-6 text-center border border-white/5 overflow-hidden">
                      {/* Ambient Glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22)_0%,transparent_70%)] pointer-events-none" />

                      {/* Header Badge */}
                      <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold mb-3 shadow-glow-card">
                        <Sparkles className="w-3 h-3" />
                        <span>WD GROUP · OFFICIAL PREVIEW</span>
                      </div>

                      {/* Centered Brand Logo */}
                      <div className="relative z-10 h-10 w-44 mb-2">
                        <Image
                          src="/brand/wd-group-logo-white.png"
                          alt="WD Group Logo"
                          fill
                          className="object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                        />
                      </div>

                      <p className="relative z-10 text-[11px] text-zinc-400 font-medium tracking-wide">
                        Hospitality · Manufacturing · Contracting
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-1 bg-[#0D0F16] border-t border-white/10">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">WDGROUP.SA</span>
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
