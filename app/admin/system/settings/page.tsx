'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Building, Phone, Mail, AlertTriangle } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import { useToast } from '@/components/admin/ToastProvider';
import type { SiteContentPayload } from '@/lib/admin/types';

export default function GlobalSettingsAdminPage() {
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
        showToast('Failed to load system settings', 'error');
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

      if (!res.ok) throw new Error('Failed to save settings');
      showToast('Global settings saved and updated', 'success');
    } catch (err: any) {
      showToast(err.message || 'Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="text-xs text-zinc-400 font-mono">Loading global system settings…</p>
      </div>
    );
  }

  const s = content.settings;

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>GLOBAL CONFIGURATION</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Company & System Settings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Official commercial registration, tax IDs, contact channels, and emergency banners.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing…' : 'Save & Publish Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Legal Entity & Credentials */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span>LEGAL IDENTITY & CREDENTIALS</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Commercial Registration (CR)</label>
            <input
              type="text"
              value={s.cr_number || ''}
              onChange={(e) => setContent({ ...content, settings: { ...s, cr_number: e.target.value } })}
              placeholder="5950011057"
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">VAT / Tax Identification Number</label>
            <input
              type="text"
              value={s.vat_number || ''}
              onChange={(e) => setContent({ ...content, settings: { ...s, vat_number: e.target.value } })}
              placeholder="300865965100003"
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <BilingualInput
            label="Headquarters Address"
            valueEn={s.headquarters_en}
            valueAr={s.headquarters_ar}
            onChangeEn={(v) => setContent({ ...content, settings: { ...s, headquarters_en: v } })}
            onChangeAr={(v) => setContent({ ...content, settings: { ...s, headquarters_ar: v } })}
          />
        </div>

        {/* 2. Official Communications */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>OFFICIAL COMMUNICATION CHANNELS</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">Primary Phone</label>
              <input
                type="text"
                value={s.primary_phone || ''}
                onChange={(e) => setContent({ ...content, settings: { ...s, primary_phone: e.target.value } })}
                placeholder="+966 50 572 5070"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">Secondary Phone</label>
              <input
                type="text"
                value={s.secondary_phone || ''}
                onChange={(e) => setContent({ ...content, settings: { ...s, secondary_phone: e.target.value } })}
                placeholder="+966 53 397 9797"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">General Inquiries Email</label>
              <input
                type="email"
                value={s.general_email || ''}
                onChange={(e) => setContent({ ...content, settings: { ...s, general_email: e.target.value } })}
                placeholder="info@wdgroup.sa"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">Secondary / Watan Designs Email</label>
              <input
                type="email"
                value={s.secondary_email || ''}
                onChange={(e) => setContent({ ...content, settings: { ...s, secondary_email: e.target.value } })}
                placeholder="info@watandesigns.sa"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">Official WhatsApp Dispatch Number</label>
            <input
              type="text"
              value={s.whatsapp_phone || ''}
              onChange={(e) => setContent({ ...content, settings: { ...s, whatsapp_phone: e.target.value } })}
              placeholder="+966505725070"
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

      </div>

    </form>
  );
}
