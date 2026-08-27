'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Sparkles, Quote, Award, Camera } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
import { useToast } from '@/components/admin/ToastProvider';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function LeadershipEditorPage() {
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
        showToast(isAr ? 'فشل تحميل بيانات القيادة' : 'Failed to load leadership data', 'error');
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

      if (!res.ok) throw new Error('Failed to save leadership data');
      showToast(isAr ? 'تم حفظ ونشر كلمة القيادة والرؤية بنجاح' : 'Leadership and governance statement published', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في الحفظ' : 'Error saving leadership data'), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل بيانات القيادة والرؤية…' : 'Loading leadership statements…'} />;
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
            <span>{isAr ? 'الحوكمة والقيادة التنفيذية' : 'GOVERNANCE & LEADERSHIP'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'القيادة التنفيذية والرؤية' : 'Leadership & Vision'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'إدارة كلمة الرئيس التنفيذي، ورؤية ورسالة المنظومة بكافة اللغات.' : 'Manage the CEO statement, corporate vision, and mission across all languages.'}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer whitespace-nowrap shrink-0 leading-none self-start sm:self-auto"
        >
          <Save className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ النشر…' : 'Publishing…') : (isAr ? 'حفظ ونشر التعديلات' : 'Save & Publish')}</span>
        </button>
      </div>

      {/* CEO Quote Card */}
      <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-white/10 pb-3">
          <Quote className="w-4 h-4" />
          <span>{isAr ? 'كلمة وصورة الرئيس التنفيذي' : 'CHIEF EXECUTIVE OFFICER STATEMENT & PORTRAIT'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <MediaFieldUploader
            label={isAr ? 'صورة الرئيس التنفيذي للنسخة العربية (RTL Posture)' : 'CEO Portrait - Arabic / RTL Posture'}
            description={isAr ? 'الصورة الشخصية للنسخة العربية تراعي توجيه الجسد نحو اليمين/الوسط' : 'Body posture oriented for RTL / Arabic layout'}
            aspectRatio="1:1"
            bucket="photos"
            value={ceo.photo_url_ar || ceo.photo_url || ''}
            onChange={(url) => setContent({
              ...content,
              home: {
                ...content.home,
                ceo: { ...ceo, photo_url_ar: url, photo_url: url }
              }
            })}
          />

          <MediaFieldUploader
            label={isAr ? 'صورة الرئيس التنفيذي للنسخة الإنجليزية (LTR Posture)' : 'CEO Portrait - English / LTR Posture'}
            description={isAr ? 'الصورة الشخصية للنسخة الإنجليزية تراعي توجيه الجسد نحو اليسار/الوسط' : 'Body posture oriented for LTR / English layout'}
            aspectRatio="1:1"
            bucket="photos"
            value={ceo.photo_url_en || ceo.photo_url || ''}
            onChange={(url) => setContent({
              ...content,
              home: {
                ...content.home,
                ceo: { ...ceo, photo_url_en: url, photo_url: ceo.photo_url || url }
              }
            })}
          />
        </div>

        <BilingualInput
          label={isAr ? 'نص كلمة / رسالة الرئيس التنفيذي' : 'CEO Official Quote / Message'}
          isTextarea
          rows={4}
          valueEn={ceo.quote_en}
          valueAr={ceo.quote_ar}
          onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, quote_en: v } } })}
          onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, quote_ar: v } } })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BilingualInput
            label={isAr ? 'اسم الرئيس التنفيذي' : 'CEO Name'}
            valueEn={ceo.name_en}
            valueAr={ceo.name_ar}
            onChangeEn={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, name_en: v } } })}
            onChangeAr={(v) => setContent({ ...content, home: { ...content.home, ceo: { ...ceo, name_ar: v } } })}
          />

          <BilingualInput
            label={isAr ? 'المسمى الوظيفي للرئيس التنفيذي' : 'CEO Official Title'}
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
          <span>{isAr ? 'الرؤية والرسالة المؤسسية' : 'CORPORATE VISION & MISSION'}</span>
        </div>

        <BilingualInput
          label={isAr ? 'نص الرؤية المؤسسية' : 'Corporate Vision Narrative'}
          isTextarea
          rows={3}
          valueEn={identity.vision_desc_en}
          valueAr={identity.vision_desc_ar}
          onChangeEn={(v) => setContent({ ...content, home: { ...content.home, identity: { ...identity, vision_desc_en: v } } })}
          onChangeAr={(v) => setContent({ ...content, home: { ...content.home, identity: { ...identity, vision_desc_ar: v } } })}
        />

        <BilingualInput
          label={isAr ? 'نص الرسالة المؤسسية' : 'Corporate Mission Narrative'}
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
