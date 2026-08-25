'use client';

import React, { useState, useEffect } from 'react';
import { Factory, Plus, Trash2, Save, RefreshCw, Layers } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import ConfirmationModal from '@/components/admin/ConfirmationModal';
import { useToast } from '@/components/admin/ToastProvider';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function ManufacturingSectorAdminPage() {
  const { showToast } = useToast();
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
        showToast('Failed to load manufacturing data', 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [showToast]);

  const handleSave = async () => {
    if (!content) return;
    try {
      setSaving(true);
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Failed to save manufacturing data');
      showToast('Manufacturing factories data saved and published', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving manufacturing data', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddFactory = () => {
    if (!content) return;
    const newFactory = {
      id: `factory_${Date.now()}`,
      title_en: 'New Specialized Production Facility',
      title_ar: 'منشأة إنتاجية متخصصة جديدة',
      desc_en: 'Precision woodworking, metal processing, and automated CNC joinery.',
      desc_ar: 'تشغيل أخشاب دقيق ومعالجة معادن ونجارة آلية عبر مكائن CNC.',
      location_en: 'Riyadh',
      location_ar: 'الرياض',
    };

    setContent({
      ...content,
      manufacturing: {
        ...content.manufacturing,
        factories: [...content.manufacturing.factories, newFactory],
      },
    });
    showToast('New factory added', 'info');
  };

  const handleDeleteFactory = (id: string) => {
    if (!content) return;
    setContent({
      ...content,
      manufacturing: {
        ...content.manufacturing,
        factories: content.manufacturing.factories.filter((f) => f.id !== id),
      },
    });
    setDeletingId(null);
    showToast('Factory removed', 'info');
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">Loading GreenWood manufacturing specs…</p>
      </div>
    );
  }

  const factories = content.manufacturing.factories || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-2">
            <Factory className="w-3.5 h-3.5" />
            <span>GREENWOOD MANUFACTURING & CNC</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Production Centers
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage the 3 manufacturing factories in Riyadh & Najran, production lines, and FF&E capabilities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddFactory}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-bold transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Factory</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-emerald"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing…' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>

      {/* Factories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {factories.map((fact, idx) => (
          <div 
            key={fact.id}
            className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl relative group"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400">
                FACTORY 0{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => setDeletingId(fact.id)}
                className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                aria-label="Delete factory"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <BilingualInput
              label="Factory Title & Scope"
              valueEn={fact.title_en}
              valueAr={fact.title_ar}
              onChangeEn={(v) => {
                const next = [...factories];
                next[idx].title_en = v;
                setContent({ ...content, manufacturing: { ...content.manufacturing, factories: next } });
              }}
              onChangeAr={(v) => {
                const next = [...factories];
                next[idx].title_ar = v;
                setContent({ ...content, manufacturing: { ...content.manufacturing, factories: next } });
              }}
            />

            <BilingualInput
              label="Production Capabilities"
              isTextarea
              rows={3}
              valueEn={fact.desc_en}
              valueAr={fact.desc_ar}
              onChangeEn={(v) => {
                const next = [...factories];
                next[idx].desc_en = v;
                setContent({ ...content, manufacturing: { ...content.manufacturing, factories: next } });
              }}
              onChangeAr={(v) => {
                const next = [...factories];
                next[idx].desc_ar = v;
                setContent({ ...content, manufacturing: { ...content.manufacturing, factories: next } });
              }}
            />

            <BilingualInput
              label="Location"
              valueEn={fact.location_en}
              valueAr={fact.location_ar}
              onChangeEn={(v) => {
                const next = [...factories];
                next[idx].location_en = v;
                setContent({ ...content, manufacturing: { ...content.manufacturing, factories: next } });
              }}
              onChangeAr={(v) => {
                const next = [...factories];
                next[idx].location_ar = v;
                setContent({ ...content, manufacturing: { ...content.manufacturing, factories: next } });
              }}
            />
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={Boolean(deletingId)}
        title="Remove Factory"
        message="Are you sure you want to remove this factory entry? Remember to click 'Save & Publish' afterwards."
        confirmLabel="Remove"
        onConfirm={() => deletingId && handleDeleteFactory(deletingId)}
        onClose={() => setDeletingId(null)}
      />

    </div>
  );
}
