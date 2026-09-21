'use client';

import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  Activity, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  Minimize2,
  Building2,
  Factory,
  Users,
  Layers
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import { useToast } from '@/components/admin/ToastProvider';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function MetricsEditorPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [content, setContent] = useState<SiteContentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Accordion state for 4 metrics
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    stat1: true,
    stat2: false,
    stat3: false,
    stat4: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setOpenSections({
      stat1: true,
      stat2: true,
      stat3: true,
      stat4: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      stat1: false,
      stat2: false,
      stat3: false,
      stat4: false,
    });
  };

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
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل إحصائيات وأرقام المنظومة…' : 'Loading metrics configuration…'} />;
  }

  const metrics = content.home.metrics;

  const metricItems = [
    {
      id: 'stat1',
      idx: '01',
      color: 'sky',
      icon: Building2,
      num: metrics.stat1_num,
      titleEn: 'Metric 01 (Hospitality Portfolio)',
      titleAr: 'المؤشر 01 (قطاع الضيافة والفنادق)',
      textEn: metrics.stat1_text_en,
      textAr: metrics.stat1_text_ar,
      setNum: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat1_num: v } } }),
      setTextEn: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat1_text_en: v } } }),
      setTextAr: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat1_text_ar: v } } }),
    },
    {
      id: 'stat2',
      idx: '02',
      color: 'emerald',
      icon: Factory,
      num: metrics.stat2_num,
      titleEn: 'Metric 02 (Manufacturing Plants)',
      titleAr: 'المؤشر 02 (المصانع والإنتاج)',
      textEn: metrics.stat2_text_en,
      textAr: metrics.stat2_text_ar,
      setNum: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat2_num: v } } }),
      setTextEn: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat2_text_en: v } } }),
      setTextAr: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat2_text_ar: v } } }),
    },
    {
      id: 'stat3',
      idx: '03',
      color: 'purple',
      icon: Users,
      num: metrics.stat3_num,
      titleEn: 'Metric 03 (Workforce & Talent)',
      titleAr: 'المؤشر 03 (فريق العمل والكفاءات)',
      textEn: metrics.stat3_text_en,
      textAr: metrics.stat3_text_ar,
      setNum: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat3_num: v } } }),
      setTextEn: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat3_text_en: v } } }),
      setTextAr: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat3_text_ar: v } } }),
    },
    {
      id: 'stat4',
      idx: '04',
      color: 'amber',
      icon: Layers,
      num: metrics.stat4_num,
      titleEn: 'Metric 04 (Integrated Core Sectors)',
      titleAr: 'المؤشر 04 (القطاعات المتكاملة)',
      textEn: metrics.stat4_text_en,
      textAr: metrics.stat4_text_ar,
      setNum: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat4_num: v } } }),
      setTextEn: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat4_text_en: v } } }),
      setTextAr: (v: string) => setContent({ ...content, home: { ...content.home, metrics: { ...metrics, stat4_text_ar: v } } }),
    },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-300">
      
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

      {/* Accordion Quick Expand / Collapse Controls */}
      <div className="flex items-center justify-between px-1 py-1">
        <span className="text-xs font-mono text-zinc-400 font-bold">
          {isAr ? 'بطاقات الإحصائيات (4 بطاقات قابلة للطي)' : 'CORPORATE METRIC CARDS (4 FOLDABLE MODULES)'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isAr ? 'فتح الكل' : 'Expand All'}</span>
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <Minimize2 className="w-3 h-3" />
            <span>{isAr ? 'طي الكل' : 'Collapse All'}</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Foldable Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {metricItems.map((m) => {
          const isOpen = Boolean(openSections[m.id]);
          const Icon = m.icon;
          return (
            <div 
              key={m.id}
              className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 shadow-xl transition-all hover:border-white/20"
            >
              {/* Header */}
              <div 
                onClick={() => toggleSection(m.id)}
                className="flex items-center justify-between cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-white">
                    {m.idx}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                        {isAr ? m.titleAr : m.titleEn}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold shrink-0">
                        {m.num}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      {isAr ? (m.textAr || m.textEn) : (m.textEn || m.textAr)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                    {isOpen ? (isAr ? 'طي البطاقة' : 'Collapse') : (isAr ? 'تعديل الرقم' : 'Expand')}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </div>
              </div>

              {/* Form Fields (Rendered when open) */}
              {isOpen && (
                <div className="space-y-4 pt-6 border-t border-white/10 mt-5 animate-in fade-in duration-150">
                  <div className="space-y-1.5 max-w-sm">
                    <label className="text-xs font-bold text-zinc-300">
                      {isAr ? 'قيمة المؤشر / الرقم الرئيسي' : 'Metric Value / Number'}
                    </label>
                    <input
                      type="text"
                      value={m.num}
                      onChange={(e) => m.setNum(e.target.value)}
                      className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <BilingualInput
                    label={isAr ? 'عنوان وتسمية المؤشر' : 'Metric Label / Caption'}
                    valueEn={m.textEn}
                    valueAr={m.textAr}
                    onChangeEn={m.setTextEn}
                    onChangeAr={m.setTextAr}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </form>
  );
}
