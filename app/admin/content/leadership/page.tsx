'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Sparkles, Quote, Award } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import { useToast } from '@/components/admin/ToastProvider';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function LeadershipEditorPage() {
  const { showToast } = useToast();
  const [content, setContent] = useState<SiteContentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        showToast('Failed to load leadership data', 'error');
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

      if (!res.ok) throw new Error('Failed to save leadership data');
      showToast('Leadership and governance statement published', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving leadership data', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">Loading leadership statements…</p>
      </div>
    );
  }

  const ceo = content.home.ceo;
  const identity = content.home.identity;

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GOVERNANCE & LEADERSHIP</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Leadership & Vision
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage the CEO statement, corporate vision, and mission across all languages.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing…' : 'Save & Publish'}</span>
        </button>
      </div>

      {/* CEO Quote Card */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-white/10 pb-3">
          <Quote className="w-4 h-4" />
          <span>// CHIEF EXECUTIVE OFFICER STATEMENT</span>
        </div>

        <BilingualInput
          label="CEO Official Quote / Message"
          isTextarea
          rows={4}
          valueEn={ceo.quote_en}
          valueAr={ceo.quote_ar}
          onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, quote_en: v } } })}
          onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, quote_ar: v } } })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BilingualInput
            label="CEO Name"
            valueEn={ceo.name_en}
            valueAr={ceo.name_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, name_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, name_ar: v } } })}
          />

          <BilingualInput
            label="CEO Official Title"
            valueEn={ceo.title_en}
            valueAr={ceo.title_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, title_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, title_ar: v } } })}
          />
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-white/10 pb-3">
          <Award className="w-4 h-4" />
          <span>// CORPORATE VISION & MISSION</span>
        </div>

        <BilingualInput
          label="Corporate Vision Narrative"
          isTextarea
          rows={3}
          valueEn={identity.vision_desc_en}
          valueAr={identity.vision_desc_ar}
          onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...identity, vision_desc_en: v } } })}
          onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...identity, vision_desc_ar: v } } })}
        />

        <BilingualInput
          label="Corporate Mission Narrative"
          isTextarea
          rows={3}
          valueEn={identity.mission_desc_en}
          valueAr={identity.mission_desc_ar}
          onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...identity, mission_desc_en: v } } })}
          onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...identity, mission_desc_ar: v } } })}
        />
      </div>

    </form>
  );
}
