'use client';

import React, { useState, useEffect } from 'react';
import { HardHat, Plus, Trash2, Save, RefreshCw } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
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
    const newService = {
      id: `serv_${Date.now()}`,
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
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">{isAr ? 'جارٍ تحميل خدمات المقاولات والتجهيز…' : 'Loading Contracting services…'}</p>
      </div>
    );
  }

  const services = content.contracting.services || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
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
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all"
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((serv, idx) => (
          <div 
            key={serv.id}
            className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl relative group"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-amber-400">
                SERVICE 0{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => setDeletingId(serv.id)}
                className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                aria-label="Delete service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <BilingualInput
              label="Service Title"
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
              label="Service Scope & Deliverables"
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
        ))}
      </div>

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title="Remove Service"
        message="Are you sure you want to remove this contracting service? Remember to click 'Save & Publish' afterwards."
        confirmLabel="Remove"
        onConfirm={() => deletingId && handleDeleteService(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
