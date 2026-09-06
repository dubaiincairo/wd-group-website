'use client';

import React, { useState, useEffect } from 'react';
import { 
  HardHat, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  Minimize2,
  CheckCircle2
} from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function ContractingSectorAdminPage() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [content, setContent] = useState<SiteContentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Accordion open/close state by service ID
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
          const servs = d.data?.contracting?.services || [];
          if (servs.length > 0) {
            setOpenSections({ [servs[0].id]: true });
          }
        }
      } catch (err) {
        showToast(isAr ? 'فشل تحميل بيانات المقاولات' : 'Failed to load contracting data', 'error');
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
      if (!res.ok) throw new Error('Failed to save contracting data');
      showToast(isAr ? 'تم حفظ ونشر خدمات المقاولات بنجاح' : 'Contracting services saved and published', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في حفظ خدمات المقاولات' : 'Failed to save contracting data'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddService = () => {
    if (!content) return;
    const currentServices = content.contracting?.services || [];
    const newId = `serv_${Date.now()}`;
    const newService = {
      id: newId,
      title_en: 'New Contracting Capability',
      title_ar: 'خدمة مقاولات وتجهيز جديدة',
      desc_en: 'Comprehensive execution, engineering compliance, and turnkey delivery.',
      desc_ar: 'تنفيذ متكامل ومطابقة هندسية وتسليم شامل للمشاريع.',
    };

    setContent({
      ...content,
      contracting: {
        ...content.contracting,
        services: [...currentServices, newService],
      },
    });
    setOpenSections((prev) => ({ ...prev, [newId]: true }));
    showToast(isAr ? 'تمت إضافة الخدمة. اضغط حفظ ونشر.' : 'New service added. Remember to Save & Publish.', 'info');
  };

  const handleDeleteService = (id: string) => {
    if (!content) return;
    setContent({
      ...content,
      contracting: {
        ...content.contracting,
        services: content.contracting.services.filter((s) => s.id !== id),
      },
    });
    setDeletingId(null);
    showToast(isAr ? 'تم حذف الخدمة' : 'Service removed', 'info');
  };

  if (loading || !content) {
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل خدمات المقاولات والتجهيز…' : 'Loading Contracting services…'} />;
  }

  const services = content.contracting.services || [];
  const serviceIds = services.map((s) => s.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold mb-2">
            <HardHat className="w-3.5 h-3.5" />
            <span>{isAr ? 'خدمات المقاولات والتجهيز الداخلي' : 'CONTRACTING & FIT-OUT SERVICES'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'الخدمات الشاملة ودورة التنفيذ' : 'Turnkey Services & Lifecycle'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'إدارة قدرات المقاولات العامة وخدمات التجهيز الداخلي والتنفيذ المتكامل.' : 'Manage general contracting capabilities, interior fit-out services, and execution lifecycle.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'إضافة خدمة' : 'Add Service'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-gold cursor-pointer whitespace-nowrap shrink-0 leading-none"
          >
            <Save className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ النشر…' : 'Publishing…') : (isAr ? 'حفظ ونشر الخدمات' : 'Save & Publish')}</span>
          </button>
        </div>
      </div>

      {/* Accordion Quick Expand / Collapse Controls */}
      <div className="flex items-center justify-between px-1 py-1">
        <span className="text-xs font-mono text-zinc-400 font-bold">
          {isAr ? `خدمات وقدرات المقاولات (${services.length} خدمات)` : `CONTRACTING CAPABILITIES (${services.length} SERVICES)`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => expandAll(serviceIds)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isAr ? 'فتح الكل' : 'Expand All'}</span>
          </button>
          <button
            type="button"
            onClick={() => collapseAll(serviceIds)}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <Minimize2 className="w-3 h-3" />
            <span>{isAr ? 'طي الكل' : 'Collapse All'}</span>
          </button>
        </div>
      </div>

      {/* Services Foldable Accordions */}
      <div className="space-y-4">
        {services.map((serv, idx) => {
          const isOpen = openSections[serv.id] ?? (idx === 0);
          return (
            <div 
              key={serv.id}
              className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 shadow-xl transition-all hover:border-amber-500/30"
            >
              {/* Accordion Header */}
              <div className="flex items-center justify-between gap-3">
                <div 
                  onClick={() => toggleSection(serv.id)}
                  className="flex items-center gap-3.5 cursor-pointer select-none group flex-1 min-w-0"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-white block truncate">
                      {isAr ? (serv.title_ar || `الخدمة 0${idx + 1}`) : (serv.title_en || `Capability 0${idx + 1}`)}
                    </span>
                    <span className="text-xs text-zinc-400 block truncate mt-0.5">
                      {isAr ? serv.title_en : serv.title_ar}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setDeletingId(serv.id)}
                    className="text-zinc-500 hover:text-rose-400 transition-colors p-2 rounded-xl hover:bg-white/5 flex items-center gap-1.5 text-xs cursor-pointer"
                    aria-label={isAr ? 'حذف الخدمة' : 'Delete service'}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{isAr ? 'حذف' : 'Remove'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSection(serv.id)}
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
                  <BilingualInput
                    label={isAr ? 'عنوان الخدمة' : 'Service Title'}
                    valueEn={serv.title_en}
                    valueAr={serv.title_ar}
                    onChangeEn={(v) => {
                      const next = [...services];
                      next[idx].title_en = v;
                      setContent({ ...content, contracting: { ...content.contracting, services: next } });
                    }}
                    onChangeAr={(v) => {
                      const next = [...services];
                      next[idx].title_ar = v;
                      setContent({ ...content, contracting: { ...content.contracting, services: next } });
                    }}
                  />

                  <BilingualInput
                    label={isAr ? 'نطاق الخدمة ومخرجاتها الهندسية' : 'Service Scope & Deliverables'}
                    isTextarea
                    rows={3}
                    valueEn={serv.desc_en}
                    valueAr={serv.desc_ar}
                    onChangeEn={(v) => {
                      const next = [...services];
                      next[idx].desc_en = v;
                      setContent({ ...content, contracting: { ...content.contracting, services: next } });
                    }}
                    onChangeAr={(v) => {
                      const next = [...services];
                      next[idx].desc_ar = v;
                      setContent({ ...content, contracting: { ...content.contracting, services: next } });
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title={isAr ? 'حذف الخدمة' : 'Remove Service'}
        message={isAr ? 'هل أنت متأكد من رغبتك في حذف هذه الخدمة؟ تذكر النقر على حفظ ونشر بعد الحذف.' : "Are you sure you want to remove this contracting service? Remember to click 'Save & Publish' afterwards."}
        confirmLabel={isAr ? 'حذف' : 'Remove'}
        onConfirm={() => deletingId && handleDeleteService(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
