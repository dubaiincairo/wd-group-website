'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  Save, 
  RefreshCw, 
  Star,
  CheckCircle2
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function HospitalitySectorAdminPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [content, setContent] = useState<SiteContentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        showToast(isAr ? 'فشل تحميل بيانات الضيافة' : 'Failed to load hospitality data', 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [showToast, isAr]);

  const handleSave = async () => {
    if (!content) return;
    try {
      setSaving(true);
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Failed to save hospitality data');
      showToast(isAr ? 'تم حفظ ونشر بيانات الضيافة بنجاح' : 'Hospitality properties saved and published', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في الحفظ' : 'Failed to save hospitality data'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddProperty = () => {
    if (!content) return;
    const currentProps = content.hospitality?.properties || [];
    const newProp = {
      id: `prop_${Date.now()}`,
      name_en: 'SwissBlue New Property',
      name_ar: 'فندق سويس بلو الجديد',
      city_en: 'Riyadh',
      city_ar: 'الرياض',
      stars: 4,
      desc_en: 'Premium serviced residence providing modern hospitality excellence.',
      desc_ar: 'وحدات سكنية فندقية راقية تقدم تجربة ضيافة عصرية متميزة.',
      image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      google_maps_url: 'https://maps.google.com',
      review_url: '',
      website_url: 'https://new.swissbluehotels.com',
    };

    setContent({
      ...content,
      hospitality: {
        ...content.hospitality,
        properties: [...currentProps, newProp],
      },
    });
    showToast(isAr ? 'تمت إضافة المنشأة. اضغط حفظ ونشر.' : 'New property added. Remember to Save & Publish.', 'info');
  };

  const handleDeleteProperty = (id: string) => {
    if (!content) return;
    setContent({
      ...content,
      hospitality: {
        ...content.hospitality,
        properties: content.hospitality.properties.filter((p) => p.id !== id),
      },
    });
    setDeletingId(null);
    showToast(isAr ? 'تم حذف المنشأة' : 'Property removed', 'info');
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">{isAr ? 'جارٍ تحميل محفظة منشآت سويس بلو الفندقية…' : 'Loading SwissBlue properties portfolio…'}</p>
      </div>
    );
  }

  const properties = content.hospitality.properties || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'محفظة منشآت ضيافة سويس بلو' : 'SWISSBLUE HOSPITALITY PORTFOLIO'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'الفنادق والوحدات السكنية المخدومة' : 'Hotel & Serviced Residences'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'إدارة منشآت سويس بلو في السعودية، تصنيف النجوم، وروابط خرائط جوجل والتفاصيل.' : 'Manage the 6 Saudi properties, location tags, Google review links, and descriptions.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddProperty}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all"
          >
            <Plus className="w-4 h-4 text-sky-400" />
            <span>{isAr ? 'إضافة منشأة' : 'Add Property'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-sky cursor-pointer whitespace-nowrap shrink-0 leading-none"
          >
            <Save className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ النشر…' : 'Publishing…') : (isAr ? 'حفظ ونشر المنشآت' : 'Save & Publish')}</span>
          </button>
        </div>
      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((prop, idx) => (
          <div 
            key={prop.id}
            className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl relative group"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-sky-400">
                {isAr ? `المنشأة الفندقية #${idx + 1}` : `PROPERTY 0${idx + 1}`}
              </span>
              <button
                type="button"
                onClick={() => setDeletingId(prop.id)}
                className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                aria-label={isAr ? 'حذف المنشأة' : 'Delete property'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <BilingualInput
              label={isAr ? 'اسم المنشأة الفندقية' : 'Property Name'}
              valueEn={prop.name_en}
              valueAr={prop.name_ar}
              onChangeEn={(v) => {
                const next = [...properties];
                next[idx].name_en = v;
                setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
              }}
              onChangeAr={(v) => {
                const next = [...properties];
                next[idx].name_ar = v;
                setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
              }}
            />

            <BilingualInput
              label={isAr ? 'المدينة والحي' : 'City & District'}
              valueEn={prop.city_en}
              valueAr={prop.city_ar}
              onChangeEn={(v) => {
                const next = [...properties];
                next[idx].city_en = v;
                setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
              }}
              onChangeAr={(v) => {
                const next = [...properties];
                next[idx].city_ar = v;
                setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
              }}
            />

            <BilingualInput
              label={isAr ? 'الوصف وأبرز المميزات' : 'Description & Highlights'}
              isTextarea
              rows={2}
              valueEn={prop.desc_en}
              valueAr={prop.desc_ar}
              onChangeEn={(v) => {
                const next = [...properties];
                next[idx].desc_en = v;
                setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
              }}
              onChangeAr={(v) => {
                const next = [...properties];
                next[idx].desc_ar = v;
                setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
              }}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                <span>{isAr ? 'رابط تقييمات جوجل / الحجز المباشر' : 'Google Review / Booking URL'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </label>
              <input
                type="url"
                value={prop.review_url || ''}
                onChange={(e) => {
                  const next = [...properties];
                  next[idx].review_url = e.target.value;
                  setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
                }}
                placeholder="https://g.page/r/..."
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title={isAr ? 'حذف المنشأة الفندقية' : 'Remove Property'}
        message={isAr ? 'هل أنت متأكد من رغبتك في حذف هذه المنشأة من محفظة فنادق سويس بلو؟ تذكر النقر على حفظ ونشر بعد الحذف.' : 'Are you sure you want to remove this property from the SwissBlue portfolio? Remember to save changes afterwards.'}
        confirmLabel={isAr ? 'حذف' : 'Remove'}
        onConfirm={() => deletingId && handleDeleteProperty(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
