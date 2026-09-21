'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  Settings, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  Save, 
  Percent, 
  MapPin, 
  Lock,
  FileCheck,
  Building2,
  PhoneCall,
  MessageSquare,
  Globe,
  Sliders,
  CheckCircle2,
  Receipt,
  FileText,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Key,
  Eye,
  EyeOff,
  Sparkles,
  Smartphone,
  Mail,
  UserCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { EcommerceSettingsPayload, DEFAULT_ECOMMERCE_SETTINGS } from '@/lib/ecommerce/settingsConfig';

export default function SettingsTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<EcommerceSettingsPayload>(DEFAULT_ECOMMERCE_SETTINGS);

  // Accordion state for 6 main sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    payments: true,
    bnpl: true,
    zatca: true,
    sms: true,
    email: false,
    storefront: false,
  });

  // Password / Secret visibility toggles
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setOpenSections({
      payments: true,
      bnpl: true,
      zatca: true,
      sms: true,
      email: true,
      storefront: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      payments: false,
      bnpl: false,
      zatca: false,
      sms: false,
      email: false,
      storefront: false,
    });
  };

  // Load existing settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/ecommerce/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (err) {
        console.warn('Failed to load ecommerce settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/ecommerce/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          isAr
            ? '✓ تم حفظ وتفعيل كافة إعدادات المتجر وبوابات الدفع والرسائل'
            : '✓ All store, payment, BNPL, and SMS settings updated and active!',
          'success'
        );
      } else {
        throw new Error(data.error || 'Failed to save settings');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-400 font-mono text-xs flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-[#C9A86A]" />
        <span>{isAr ? 'جاري تحميل إعدادات المتجر...' : 'Loading store settings...'}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6 max-w-5xl">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#C9A86A]" />
            <span>{isAr ? 'لوحة التحكم الشاملة بإعدادات المتجر والعمليات' : 'Enterprise E-Commerce Operations & Gateway Control Hub'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr 
              ? 'تحكم كامل وتفعيل مباشر لبوابات الدفع (ميسر)، التقسيط (تمارا وتابي)، الفوترة (ZATCA)، ورسائل الجوال (SMS).' 
              : 'Full admin governance for Moyasar, Tamara/Tabby BNPL, ZATCA Phase-2 e-invoices, and Saudi SMS telecommunications.'}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(201,168,106,0.4)] transition-all cursor-pointer font-mono shrink-0 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ وتفعيل كافة الإعدادات' : 'Save & Deploy All Settings')}</span>
        </button>
      </div>

      {/* Accordion Controls */}
      <div className="flex items-center justify-between px-1 py-1">
        <span className="text-xs font-mono text-zinc-400 font-bold">
          {isAr ? 'أقسام التحكم بالمنظومة (6 أقسام قابلة للطي)' : 'ECOMMERCE CONTROL MODULES (6 FOLDABLE SECTIONS)'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 transition-all cursor-pointer"
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

      {/* Stacked Foldable Sections */}
      <div className="space-y-4">

        {/* 1. Payment Gateways (Moyasar - Mada, Cards, Apple Pay) */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('payments')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'بوابة الدفع الرسمية (ميسر Moyasar) · مدى و Apple Pay' : 'MOYASAR PAYMENT GATEWAY (MADA & APPLE PAY)'}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full hidden sm:inline ${
                    settings.moyasarTestMode ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {settings.moyasarTestMode ? 'SANDBOX TEST' : 'LIVE PRODUCTION'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'التحكم ببيئة التشغيل ومفاتيح مدى، فيزا/ماستركارد، و Apple Pay المباشر' : 'Live / Sandbox keys, Mada 3D-Secure, and instant Apple Pay authorization'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.payments ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الإعدادات' : 'Expand')}
              </span>
              {openSections.payments ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.payments && (
            <div className="space-y-4 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 text-xs">
              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableMadaCards}
                    onChange={(e) => setSettings({ ...settings, enableMadaCards: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تفعيل مدى والبطاقات البنكية' : 'Enable Mada & Cards'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableApplePay}
                    onChange={(e) => setSettings({ ...settings, enableApplePay: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تفعيل Apple Pay المباشر' : 'Enable Apple Pay'}</span>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <span className="text-zinc-200 font-semibold">{isAr ? 'وضع التجربة (Sandbox):' : 'Sandbox Test Mode:'}</span>
                  <input
                    type="checkbox"
                    checked={settings.moyasarTestMode}
                    onChange={(e) => setSettings({ ...settings, moyasarTestMode: e.target.checked })}
                    className="rounded text-amber-400"
                  />
                </label>
              </div>

              {/* API Keys */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'المفتاح العام (Publishable Key)' : 'Moyasar Publishable Key'}</span>
                  <input
                    type="text"
                    value={settings.moyasarPublishableKey || ''}
                    onChange={(e) => setSettings({ ...settings, moyasarPublishableKey: e.target.value })}
                    placeholder="pk_live_... / pk_test_..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'المفتاح السري (Secret Key)' : 'Moyasar Secret Key'}</span>
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('moyasar_sec')}
                      className="text-zinc-500 hover:text-white"
                    >
                      {showKeys.moyasar_sec ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showKeys.moyasar_sec ? 'text' : 'password'}
                    value={settings.moyasarSecretKey || ''}
                    onChange={(e) => setSettings({ ...settings, moyasarSecretKey: e.target.value })}
                    placeholder="sk_live_... / sk_test_..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-amber-400 font-bold"
                  />
                </div>

                {/* Moyasar Webhook Secret */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 block font-sans font-bold">
                      {isAr ? 'رمز أمان الويب هوك (Moyasar Webhook Secret)' : 'Moyasar Webhook Secret / Signature'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('moyasar_wh')}
                      className="text-zinc-500 hover:text-white"
                    >
                      {showKeys.moyasar_wh ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showKeys.moyasar_wh ? 'text' : 'password'}
                    value={settings.moyasarWebhookSecret || ''}
                    onChange={(e) => setSettings({ ...settings, moyasarWebhookSecret: e.target.value })}
                    placeholder="whsec_... (Cryptographically verifies incoming Moyasar payment webhooks)"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-emerald-400 font-bold"
                  />
                  <span className="text-[10px] text-zinc-500 block font-sans">
                    {isAr ? 'يتم التحقق من هذا الرمز عند استلام إشعارات الدفع من ميسر لمنع تزوير العمليات' : 'Used to authenticate asynchronous payment reconciliation webhooks and block forgery attempts.'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Buy-Now-Pay-Later (Tamara & Tabby) */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('bnpl')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'منظومة التقسيط الذكي (تمارا وتابي · Tamara & Tabby)' : 'BUY-NOW-PAY-LATER (TAMARA & TABBY FINTECH)'}
                  </h4>
                  <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full hidden sm:inline">
                    {isAr ? 'تقسيط 0% فوائد' : '0% INTEREST BNPL'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'التحكم بروابط ومفاتيح تمارا وتابي وعرض ويدجت التقسيط بصفحات المنتجات (PDP)' : 'Tamara/Tabby API tokens, installments count, and PDP price widgets'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.bnpl ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الإعدادات' : 'Expand')}
              </span>
              {openSections.bnpl ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.bnpl && (
            <div className="space-y-6 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 text-xs">
              
              {/* Storefront PDP Widget Toggle */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#171C2B] to-[#12151F] border border-[#C9A86A]/40 cursor-pointer">
                <div className="space-y-0.5">
                  <span className="text-white font-bold block">
                    {isAr ? 'إظهار ويدجت التقسيط (تمارا / تابي) بصفحات المنتجات (PDP)' : 'Show BNPL 4-Installment Widget on Product Detail Pages'}
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    {isAr ? 'يعرض للعميل تلقائياً خيار تقسيط القطعة على 4 دفعات أسفل السعر مع شرح شروط التقسيط' : 'Displays dynamic 4 monthly payments breakdown below price on all PDPs'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enablePdpBnplWidget}
                  onChange={(e) => setSettings({ ...settings, enablePdpBnplWidget: e.target.checked })}
                  className="rounded text-[#C9A86A]"
                />
              </label>

              {/* Tamara Sub-Box */}
              <div className="p-4 rounded-2xl bg-[#141721] border border-[#FF5C39]/30 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#FF5C39]/20 text-[#FF7A5C] font-black font-mono text-[10px]">TAMARA</span>
                    <span className="text-white font-bold">{isAr ? 'إعدادات تمارا' : 'Tamara Settings'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300 text-[11px]">
                      <input
                        type="checkbox"
                        checked={settings.enableTamara}
                        onChange={(e) => setSettings({ ...settings, enableTamara: e.target.checked })}
                        className="rounded text-[#FF5C39]"
                      />
                      <span>{isAr ? 'تفعيل تمارا' : 'Enable'}</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer text-amber-400 text-[11px] font-mono">
                      <input
                        type="checkbox"
                        checked={settings.tamaraTestMode}
                        onChange={(e) => setSettings({ ...settings, tamaraTestMode: e.target.checked })}
                        className="rounded text-amber-400"
                      />
                      <span>{isAr ? 'وضع الاختبار (Sandbox)' : 'Sandbox'}</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-zinc-400 block font-sans">{isAr ? 'رمز الربط (Tamara API Token):' : 'Tamara API Token:'}</span>
                      <button
                        type="button"
                        onClick={() => toggleKeyVisibility('tamara_token')}
                        className="text-zinc-500 hover:text-white"
                      >
                        {showKeys.tamara_token ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <input
                      type={showKeys.tamara_token ? 'text' : 'password'}
                      value={settings.tamaraApiToken || ''}
                      onChange={(e) => setSettings({ ...settings, tamaraApiToken: e.target.value })}
                      placeholder="tamara_live_token_..."
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold text-xs"
                    />
                  </div>

                  <div>
                    <span className="text-zinc-400 block font-sans mb-1">{isAr ? 'عدد الدفعات الافتراضي:' : 'Default Installments:'}</span>
                    <select
                      value={settings.tamaraInstallmentsCount}
                      onChange={(e) => setSettings({ ...settings, tamaraInstallmentsCount: Number(e.target.value) as 3 | 4 })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold text-xs"
                    >
                      <option value={4}>{isAr ? '4 دفعات شهرية (الأكثر شيوعاً)' : '4 Monthly Installments (Standard)'}</option>
                      <option value={3}>{isAr ? '3 دفعات شهرية' : '3 Monthly Installments'}</option>
                    </select>
                  </div>
                </div>

                {/* Tamara Webhook / Notification Token */}
                <div className="pt-2 border-t border-white/5 font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zinc-400 block font-sans text-xs">
                      {isAr ? 'رمز إشعارات الويب هوك (Tamara Notification Token / Webhook Secret):' : 'Tamara Notification Token / Webhook Secret:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('tamara_wh')}
                      className="text-zinc-500 hover:text-white"
                    >
                      {showKeys.tamara_wh ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showKeys.tamara_wh ? 'text' : 'password'}
                    value={settings.tamaraNotificationToken || ''}
                    onChange={(e) => setSettings({ ...settings, tamaraNotificationToken: e.target.value })}
                    placeholder="tamara_whsec_... (Notification token for cryptographic event verification)"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#FF7A5C] font-bold text-xs"
                  />
                  <span className="text-[10px] text-zinc-500 block font-sans mt-0.5">
                    {isAr ? 'يتم التحقق من هذا الرمز عند استلام تحديثات حالة طلبات تمارا لمنع تزوير العمليات' : 'Used to authenticate Tamara webhook event notifications and block fraudulent order status updates.'}
                  </span>
                </div>
              </div>

              {/* Tabby Sub-Box */}
              <div className="p-4 rounded-2xl bg-[#141721] border border-[#3EFEBA]/30 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#3EFEBA]/20 text-[#3EFEBA] font-black font-mono text-[10px]">TABBY</span>
                    <span className="text-white font-bold">{isAr ? 'إعدادات تابي' : 'Tabby Settings'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-zinc-300 text-[11px]">
                      <input
                        type="checkbox"
                        checked={settings.enableTabby}
                        onChange={(e) => setSettings({ ...settings, enableTabby: e.target.checked })}
                        className="rounded text-[#3EFEBA]"
                      />
                      <span>{isAr ? 'تفعيل تابي' : 'Enable'}</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer text-amber-400 text-[11px] font-mono">
                      <input
                        type="checkbox"
                        checked={settings.tabbyTestMode}
                        onChange={(e) => setSettings({ ...settings, tabbyTestMode: e.target.checked })}
                        className="rounded text-amber-400"
                      />
                      <span>{isAr ? 'وضع الاختبار (Sandbox)' : 'Sandbox'}</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  <div>
                    <span className="text-zinc-400 block font-sans mb-1">{isAr ? 'المفتاح العام (Public Key):' : 'Tabby Public Key:'}</span>
                    <input
                      type="text"
                      value={settings.tabbyPublicKey || ''}
                      onChange={(e) => setSettings({ ...settings, tabbyPublicKey: e.target.value })}
                      placeholder="pk_test_... / pk_live_..."
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold text-xs"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-zinc-400 block font-sans">{isAr ? 'المفتاح السري (Secret Key):' : 'Tabby Secret Key:'}</span>
                      <button
                        type="button"
                        onClick={() => toggleKeyVisibility('tabby_sec')}
                        className="text-zinc-500 hover:text-white"
                      >
                        {showKeys.tabby_sec ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <input
                      type={showKeys.tabby_sec ? 'text' : 'password'}
                      value={settings.tabbySecretKey || ''}
                      onChange={(e) => setSettings({ ...settings, tabbySecretKey: e.target.value })}
                      placeholder="sk_test_... / sk_live_..."
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#3EFEBA] font-bold text-xs"
                    />
                  </div>
                </div>

                {/* Tabby Webhook Secret */}
                <div className="pt-2 border-t border-white/5 font-mono">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zinc-400 block font-sans text-xs">
                      {isAr ? 'رمز التوقيع الرقمي للويب هوك (Tabby Webhook Secret):' : 'Tabby Webhook HMAC Secret:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('tabby_wh')}
                      className="text-zinc-500 hover:text-white"
                    >
                      {showKeys.tabby_wh ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showKeys.tabby_wh ? 'text' : 'password'}
                    value={settings.tabbyWebhookSecret || ''}
                    onChange={(e) => setSettings({ ...settings, tabbyWebhookSecret: e.target.value })}
                    placeholder="tabby_whsec_... (Tabby Webhook Secret for HMAC validation)"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#3EFEBA] font-bold text-xs"
                  />
                  <span className="text-[10px] text-zinc-500 block font-sans mt-0.5">
                    {isAr ? 'يتم التحقق من ترويسة X-Tabby-Signature لمنع التزوير وتأكيد عمليات الدفع الموثوقة' : 'Validates cryptographic X-Tabby-Signature headers on incoming payment events.'}
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 3. ZATCA Phase-2 Tax Invoicing & B2B Quotations */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('zatca')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono text-xs font-bold shrink-0">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'الفوترة الإلكترونية (ZATCA Phase-2) وعروض الأسعار الرسمية' : 'ZATCA PHASE-2 E-INVOICING & B2B QUOTATIONS'}
                  </h4>
                  <span className="text-[10px] font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full hidden sm:inline">
                    {isAr ? 'فاتورة معتمدة' : 'ZATCA COMPLIANT'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'إدارة السجل التجاري (CR)، الرقم الضريبي (TRN)، تشفير رمز الـ QR، وعروض الأسعار' : 'Manage corporate CR, TRN, cryptographic QR generation, and official PDF quotation exports'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.zatca ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الفوترة' : 'Expand')}
              </span>
              {openSections.zatca ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.zatca && (
            <div className="space-y-4 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 text-xs">
              
              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.vatEnabled}
                    onChange={(e) => setSettings({ ...settings, vatEnabled: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تفعيل حساب ضريبة 15%' : 'Enable 15% VAT'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableZatcaQr}
                    onChange={(e) => setSettings({ ...settings, enableZatcaQr: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'توليد باركود QR المشفر زاتكا' : 'Generate ZATCA TLV QR'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enablePdfQuotation}
                    onChange={(e) => setSettings({ ...settings, enablePdfQuotation: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تصدير عرض سعر رسمي (PDF)' : 'Enable PDF Quotations'}</span>
                </label>
              </div>

              {/* Tax & CR Identifiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'الرقم الضريبي للمنشأة (VAT TRN):' : 'VAT Registration Number (TRN):'}</span>
                  <input
                    type="text"
                    value={settings.taxNumber}
                    onChange={(e) => setSettings({ ...settings, taxNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#C9A86A] font-bold"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'رقم السجل التجاري (CR):' : 'Commercial Registration (CR):'}</span>
                  <input
                    type="text"
                    value={settings.crNumber}
                    onChange={(e) => setSettings({ ...settings, crNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                  />
                </div>
              </div>

              {/* Entity Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-bold">{isAr ? 'اسم المنشأة الرسمي بالفاتورة (عربي):' : 'Seller Legal Name (Arabic):'}</span>
                  <input
                    type="text"
                    value={settings.companyNameAr}
                    onChange={(e) => setSettings({ ...settings, companyNameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-bold">{isAr ? 'اسم المنشأة الرسمي بالفاتورة (إنجليزي):' : 'Seller Legal Name (English):'}</span>
                  <input
                    type="text"
                    value={settings.companyNameEn}
                    onChange={(e) => setSettings({ ...settings, companyNameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  />
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 4. Saudi SMS Gateway (Taqnyat & Unifonic) */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('sms')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-xs font-bold shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'بوابة الرسائل النصية السعودية (SMS Gateway · Taqnyat / Unifonic)' : 'SAUDI SMS GATEWAY (TAQNYAT & UNIFONIC)'}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full hidden sm:inline ${
                    settings.enableSms ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-zinc-400'
                  }`}>
                    {settings.enableSms ? `ACTIVE: ${settings.smsProvider.toUpperCase()}` : 'DISABLED'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'إرسال رسائل تأكيد الشراء اللحظية وتنبيهات خروج سيارة التوصيل للعميل' : 'Automated SMS triggers on order placement and delivery vehicle dispatch'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.sms ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الرسائل' : 'Expand')}
              </span>
              {openSections.sms ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.sms && (
            <div className="space-y-4 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 text-xs">
              
              {/* Main SMS Toggle & Provider */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableSms}
                    onChange={(e) => setSettings({ ...settings, enableSms: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تفعيل إرسال رسائل الجوال' : 'Enable SMS Gateway'}</span>
                </label>

                <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between gap-2 sm:col-span-2">
                  <span className="text-zinc-300 font-bold">{isAr ? 'مزود خدمة الرسائل:' : 'SMS Provider:'}</span>
                  <select
                    value={settings.smsProvider}
                    onChange={(e) => setSettings({ ...settings, smsProvider: e.target.value as any })}
                    className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono font-bold"
                  >
                    <option value="taqnyat">{isAr ? 'تقنيات (Taqnyat.sa - الخيار الموصى به)' : 'Taqnyat (taqnyat.sa - Recommended)'}</option>
                    <option value="unifonic">{isAr ? 'يونيفونك (Unifonic)' : 'Unifonic'}</option>
                    <option value="simulator">{isAr ? 'محاكي المطورين (Sandbox Simulator)' : 'Simulator Mode'}</option>
                  </select>
                </div>
              </div>

              {/* API Key & Sender ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'رمز التفويض (Bearer Token / API Key):' : 'SMS API Key / Bearer Token:'}</span>
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('sms_key')}
                      className="text-zinc-500 hover:text-white"
                    >
                      {showKeys.sms_key ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showKeys.sms_key ? 'text' : 'password'}
                    value={settings.smsApiKey || ''}
                    onChange={(e) => setSettings({ ...settings, smsApiKey: e.target.value })}
                    placeholder={settings.smsProvider === 'taqnyat' ? 'Bearer token from taqnyat.sa...' : 'AppSid...'}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'اسم المرسل المعتمد من هيئة الاتصالات (Sender ID):' : 'Official Sender ID (CITC Registered):'}</span>
                  <input
                    type="text"
                    value={settings.smsSenderName}
                    onChange={(e) => setSettings({ ...settings, smsSenderName: e.target.value })}
                    placeholder="WD GROUP"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-emerald-400 font-bold"
                  />
                </div>
              </div>

              {/* Trigger Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifySmsOrderConfirmation}
                    onChange={(e) => setSettings({ ...settings, notifySmsOrderConfirmation: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'إرسال رسالة نصية فورية بتأكيد الطلب ورابط التتبع' : 'Send instant order confirmation SMS with tracking link'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifySmsDispatch}
                    onChange={(e) => setSettings({ ...settings, notifySmsDispatch: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'إرسال رسالة نصية عند خروج شاحنة التوصيل والتركيب' : 'Send out-for-delivery SMS with engineer details'}</span>
                </label>
              </div>

            </div>
          )}
        </div>

        {/* 5. Transactional Emails & Brevo */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('email')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 font-mono text-xs font-bold shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'البريد الإلكتروني للطلبات (Brevo Transactional Emails)' : 'TRANSACTIONAL ORDER EMAILS (BREVO)'}
                  </h4>
                  <span className="text-[10px] font-mono bg-white/10 text-zinc-300 px-2 py-0.5 rounded-full hidden sm:inline">
                    {settings.enableOrderEmails ? 'EMAIL ENGINE ON' : 'DISABLED'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'إرسال الفاتورة الضريبية ZATCA المعتمدة تلقائياً لبريد العميل وتنبيه الإدارة' : 'Automated Brevo order receipts, attached ZATCA QR tax invoices, and high-ticket alerts'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.email ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل البريد' : 'Expand')}
              </span>
              {openSections.email ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.email && (
            <div className="space-y-4 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableOrderEmails}
                    onChange={(e) => setSettings({ ...settings, enableOrderEmails: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تفعيل إرسال إيميلات الطلبات عبر Brevo' : 'Enable Brevo Order Emails'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.attachZatcaInvoice}
                    onChange={(e) => setSettings({ ...settings, attachZatcaInvoice: e.target.checked })}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200 font-semibold">{isAr ? 'تضمين الفاتورة الضريبية ZATCA كاملة بالإيميل' : 'Embed Full ZATCA QR Invoice in Email'}</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'مفتاح Brevo API:' : 'Brevo API Key:'}</span>
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility('brevo_key')}
                      className="text-zinc-500 hover:text-white"
                    >
                      {showKeys.brevo_key ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <input
                    type={showKeys.brevo_key ? 'text' : 'password'}
                    value={settings.brevoApiKey || ''}
                    onChange={(e) => setSettings({ ...settings, brevoApiKey: e.target.value })}
                    placeholder="xkeysib-..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'بريد المرسل الرسمي (Sender Email):' : 'Sender Email:'}</span>
                  <input
                    type="email"
                    value={settings.brevoSenderEmail}
                    onChange={(e) => setSettings({ ...settings, brevoSenderEmail: e.target.value })}
                    placeholder="ceo@wdgroup.online"
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'إيميل تنبيه الإدارة بالطلبات الكبرى:' : 'Admin Alert Email:'}</span>
                  <input
                    type="email"
                    value={settings.adminAlertEmail}
                    onChange={(e) => setSettings({ ...settings, adminAlertEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'حد تنبيه الطلبات الكبرى (ر.س):' : 'High-Ticket Alert Threshold (SAR):'}</span>
                  <input
                    type="number"
                    value={settings.highTicketThreshold}
                    onChange={(e) => setSettings({ ...settings, highTicketThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#C9A86A] font-bold"
                  />
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 6. Storefront, Logistics & VIP Customer Portal */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('storefront')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-xs font-bold shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'بوابة العملاء والمشاريع والخدمات اللوجستية' : 'VIP CUSTOMER PORTAL & LOGISTICS POLICIES'}
                  </h4>
                  <span className="text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full hidden sm:inline">
                    {settings.enableCustomerPortal ? 'PORTAL ACTIVE' : 'HIDDEN'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'رابط حساب العميل بالهيدر، مهندس الجودة الافتراضي، وحد التوصيل المجاني' : 'Customer account links, lead QC engineer assignment, and free delivery thresholds'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.storefront ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الواجهة' : 'Expand')}
              </span>
              {openSections.storefront ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.storefront && (
            <div className="space-y-4 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 text-xs">
              
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                <div>
                  <span className="text-zinc-200 font-bold block">{isAr ? 'إظهار رابط "حسابي وبوابة العملاء" في شريط التنقل العلوي' : 'Display "My Account & Orders" in Navigation'}</span>
                  <span className="text-zinc-400 text-[11px]">{isAr ? 'يتيح للعميل تتبع طلباته وإدارة العنوان الوطني مباشرة' : 'Direct link to /furniture/account for order history and National Address management'}</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableCustomerPortal}
                  onChange={(e) => setSettings({ ...settings, enableCustomerPortal: e.target.checked })}
                  className="rounded text-[#C9A86A]"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-bold">{isAr ? 'كبير مهندسي الجودة الافتراضي:' : 'Default Lead QC Engineer:'}</span>
                  <input
                    type="text"
                    value={settings.leadTechnicianDefault}
                    onChange={(e) => setSettings({ ...settings, leadTechnicianDefault: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-bold font-mono">{isAr ? 'رقم واتساب المساعد التنفيذي:' : 'Executive WhatsApp Desk:'}</span>
                  <input
                    type="text"
                    value={settings.supportWhatsappNumber}
                    onChange={(e) => setSettings({ ...settings, supportWhatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-emerald-400 font-mono font-bold"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5 font-mono">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'حد التوصيل والتركيب المجاني:' : 'Free Shipping Threshold:'}</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#C9A86A] font-bold"
                    />
                    <span className="text-zinc-400 text-xs">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Sticky Bottom Save Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#08090C]/95 backdrop-blur-xl border border-[#C9A86A]/40 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-[#C9A86A]" />
          <span>{isAr ? 'يتم تطبيق كافة التغييرات لحظياً في المتجر الإلكتروني بمجرد الضغط على الحفظ.' : 'All configuration changes take effect live across the store immediately upon saving.'}</span>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(201,168,106,0.4)] transition-all cursor-pointer font-mono shrink-0 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? (isAr ? 'جاري الحفظ...' : 'Saving...') : (isAr ? 'حفظ وتفعيل كافة الإعدادات' : 'Save All Settings')}</span>
        </button>
      </div>

    </form>
  );
}
