'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Activity, CheckCircle2 } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function MetricsEditorPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

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
        showToast(isAr ? 'فشل تحميل بيانات الأرقام والإحصائيات' : 'Failed to load metrics data', 'error');
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

      if (!res.ok) throw new Error('Failed to save metrics');
      showToast(isAr ? 'تم حفظ ونشر الإحصائيات والأرقام بنجاح' : 'Metrics updated and published successfully', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في حفظ الإحصائيات' : 'Error saving metrics'), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">{isAr ? 'جارٍ تحميل إحصائيات وأرقام المنظومة…' : 'Loading metrics configuration…'}</p>
      </div>
    );
  }

  const metrics = content.home.metrics;

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>{isAr ? 'شريط المؤشرات والأرقام الرئيسية' : 'STATISTICS BAR'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'المؤشرات والأرقام الرئيسية' : 'Corporate Key Metrics'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'تعديل بطاقات الإحصاءات الأربع الرئيسية المعروضة في الصفحة الرئيسية.' : 'Edit the 4 primary statistics cards displayed on the homepage stats bar.'}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer whitespace-nowrap shrink-0 leading-none self-start sm:self-auto"
        >
          <Save className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ النشر…' : 'Publishing…') : (isAr ? 'حفظ ونشر الإحصائيات' : 'Save & Publish Metrics')}</span>
        </button>
      </div>

      {/* 4 Metric Cards Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-sky-400">METRIC 01 (HOSPITALITY)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Metric Value / Number</label>
            <input
              type="text"
              value={metrics.stat1_num}
              onChange={(e) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat1_num: e.target.value } } })}
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <BilingualInput
            label="Metric Label / Caption"
            valueEn={metrics.stat1_text_en}
            valueAr={metrics.stat1_text_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat1_text_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat1_text_ar: v } } })}
          />
        </div>

        {/* Metric 2 */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-emerald-400">METRIC 02 (FACTORIES)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Metric Value / Number</label>
            <input
              type="text"
              value={metrics.stat2_num}
              onChange={(e) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat2_num: e.target.value } } })}
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <BilingualInput
            label="Metric Label / Caption"
            valueEn={metrics.stat2_text_en}
            valueAr={metrics.stat2_text_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat2_text_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat2_text_ar: v } } })}
          />
        </div>

        {/* Metric 3 */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-purple-400">METRIC 03 (TALENT)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Metric Value / Number</label>
            <input
              type="text"
              value={metrics.stat3_num}
              onChange={(e) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat3_num: e.target.value } } })}
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <BilingualInput
            label="Metric Label / Caption"
            valueEn={metrics.stat3_text_en}
            valueAr={metrics.stat3_text_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat3_text_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat3_text_ar: v } } })}
          />
        </div>

        {/* Metric 4 */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400">METRIC 04 (SECTORS)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Metric Value / Number</label>
            <input
              type="text"
              value={metrics.stat4_num}
              onChange={(e) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat4_num: e.target.value } } })}
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <BilingualInput
            label="Metric Label / Caption"
            valueEn={metrics.stat4_text_en}
            valueAr={metrics.stat4_text_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat4_text_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat4_text_ar: v } } })}
          />
        </div>

      </div>

    </form>
  );
}
