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
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
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

  // Accordion open/close state by property ID
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : false,
    }));
  };

  const expandAll = (ids: string[]) => {
    const next: Record<string, boolean> = {};
    ids.forEach((id) => { next[id] = true; });
    setOpenSections(next);
  };

  const collapseAll = (ids: string[]) => {
    const next: Record<string, boolean> = {};
    ids.forEach((id) => { next[id] = false; });
    setOpenSections(next);
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const d = await res.json();
          setContent(d.data);
          const props = d.data?.hospitality?.properties || [];
          if (props.length > 0) {
            setOpenSections({ [props[0].id]: true });
          }
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
    const newId = `prop_${Date.now()}`;
    const newProp = {
      id: newId,
      name_en: 'SwissBlue New Property',
      name_ar: 'فندق سويس بلو الجديد',
      city_en: 'Riyadh',
      city_ar: 'الرياض',
      stars: 4,
      desc_en: 'Premium serviced residence providing modern hospitality excellence.',
      desc_ar: 'وحدات سكنية فندقية راقية تقدم تجربة ضيافة عصرية متميزة.',
      image_url: '',
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
    setOpenSections((prev) => ({ ...prev, [newId]: true }));
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
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل محفظة منشآت سويس بلو الفندقية…' : 'Loading SwissBlue properties portfolio…'} />;
  }

  const properties = content.hospitality.properties || [];
  const propertyIds = properties.map((p) => p.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
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
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
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

      {/* Accordion Quick Expand / Collapse Controls */}
      <div className="flex items-center justify-between px-1 py-1">
        <span className="text-xs font-mono text-zinc-400 font-bold">
          {isAr ? `المنشآت الفندقية المسجلة (${properties.length} منشآت)` : `HOSPITALITY PROPERTIES (${properties.length} PROPERTIES)`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => expandAll(propertyIds)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-400 hover:text-sky-300 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isAr ? 'فتح الكل' : 'Expand All'}</span>
          </button>
          <button
            type="button"
            onClick={() => collapseAll(propertyIds)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <Minimize2 className="w-3 h-3" />
            <span>{isAr ? 'طي الكل' : 'Collapse All'}</span>
          </button>
        </div>
      </div>

      {/* Properties Foldable Accordions */}
      <div className="space-y-4">
        {properties.map((prop, idx) => {
          const isOpen = openSections[prop.id] ?? (idx === 0);
          return (
            <div 
              key={prop.id}
              className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 shadow-xl transition-all hover:border-sky-500/30"
            >
              {/* Accordion Header */}
              <div className="flex items-center justify-between gap-3">
                <div 
                  onClick={() => toggleSection(prop.id)}
                  className="flex items-center gap-3.5 cursor-pointer select-none group flex-1 min-w-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white block truncate">
                        {isAr ? (prop.name_ar || `المنشأة 0${idx + 1}`) : (prop.name_en || `Property 0${idx + 1}`)}
                      </span>
                      {(prop.city_en || prop.city_ar) && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 shrink-0 hidden sm:inline-flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{isAr ? (prop.city_ar || prop.city_en) : (prop.city_en || prop.city_ar)}</span>
                        </span>
                      )}
                      {prop.stars && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 shrink-0 hidden md:inline-flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-amber-300" />
                          <span>{prop.stars} {isAr ? 'نجوم' : 'Stars'}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 block truncate mt-0.5">
                      {isAr ? prop.name_en : prop.name_ar}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setDeletingId(prop.id)}
                    className="text-zinc-500 hover:text-rose-400 transition-colors p-2 rounded-xl hover:bg-white/5 flex items-center gap-1.5 text-xs cursor-pointer"
                    aria-label={isAr ? 'حذف المنشأة' : 'Delete property'}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{isAr ? 'حذف' : 'Remove'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSection(prop.id)}
                    className="text-zinc-400 hover:text-white p-2 rounded-xl hover:bg-white/5 flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                  >
                    <span className="text-[10px] text-zinc-500 hidden sm:inline">
                      {isOpen ? (isAr ? 'طي' : 'Collapse') : (isAr ? 'تعديل' : 'Expand')}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                </div>
              </div>

              {/* Form Fields (Rendered when open) */}
              {isOpen && (
                <div className="space-y-4 pt-6 border-t border-white/10 mt-5 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                        <span>{isAr ? 'رابط تقييمات جوجل / خرائط Google Maps' : 'Google Review / Maps URL'}</span>
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
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-300">
                        {isAr ? 'تصنيف النجوم' : 'Star Rating'}
                      </label>
                      <select
                        value={prop.stars || 4}
                        onChange={(e) => {
                          const next = [...properties];
                          next[idx].stars = Number(e.target.value);
                          setContent({ ...content, hospitality: { ...content.hospitality, properties: next } });
                        }}
                        className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                      >
                        <option value={3}>3 {isAr ? 'نجوم (خدمة سريعة متميزة)' : 'Stars (Premium)'}</option>
                        <option value={4}>4 {isAr ? 'نجوم (شقق فندقية فاخرة)' : 'Stars (Deluxe Residences)'}</option>
                        <option value={5}>5 {isAr ? 'نجوم (أجنحة فندقية ملكية)' : 'Stars (Luxury Suites)'}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
