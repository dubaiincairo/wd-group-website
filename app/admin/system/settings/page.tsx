'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Building, Phone, Mail, AlertTriangle, Wrench, Sparkles, CreditCard, Plus, Trash2, Building2, Lock } from 'lucide-react';
import BilingualInput from '@/components/admin/BilingualInput';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
import { useToast } from '@/components/admin/ToastProvider';
import AdminLoadingState from '@/components/admin/AdminLoadingState';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteContentPayload, BankAccountRecord } from '@/lib/admin/types';

export default function GlobalSettingsAdminPage() {
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
        showToast(isAr ? 'فشل تحميل إعدادات النظام' : 'Failed to load system settings', 'error');
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

      if (!res.ok) throw new Error('Failed to save settings');
      showToast(isAr ? 'تم حفظ وتحديث إعدادات النظام بنجاح' : 'Global settings saved and updated', 'success');
    } catch (err: any) {
      showToast(err.message || (isAr ? 'خطأ في الحفظ' : 'Error saving settings'), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <AdminLoadingState message={isAr ? 'جارٍ تحميل إعدادات المنظومة العامة…' : 'Loading global system settings…'} />;
  }

  const s = content.settings;

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>{isAr ? 'الإعدادات والتهيئة العامة' : 'GLOBAL CONFIGURATION'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'إعدادات الشركة والمنظومة' : 'Company & System Settings'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'السجل التجاري الرسمي، الأرقام الضريبية، قنوات التواصل وإشعارات الصيانة.' : 'Official commercial registration, tax IDs, contact channels, and emergency banners.'}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue cursor-pointer whitespace-nowrap shrink-0 leading-none self-start sm:self-auto"
        >
          <Save className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap leading-none">{saving ? (isAr ? 'جارٍ النشر…' : 'Publishing…') : (isAr ? 'حفظ ونشر الإعدادات' : 'Save & Publish Settings')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Legal Entity & Credentials */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span>{isAr ? 'الهوية القانونية وبيانات التراخيص' : 'LEGAL IDENTITY & CREDENTIALS'}</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              {isAr ? 'رقم السجل التجاري (CR)' : 'Commercial Registration (CR)'}
            </label>
            <input
              type="text"
              value={s.cr_number || ''}
              onChange={(e) => setContent({ ...content, settings: { ...s, cr_number: e.target.value } })}
              placeholder="5950011057"
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              {isAr ? 'الرقم الضريبي للقيمة المضافة (VAT)' : 'VAT / Tax Identification Number'}
            </label>
            <input
              type="text"
              value={s.vat_number || ''}
              onChange={(e) => setContent({ ...content, settings: { ...s, vat_number: e.target.value } })}
              placeholder="300865965100003"
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <BilingualInput
            label={isAr ? 'عنوان المقر الرئيسي' : 'Headquarters Address'}
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
            <span>{isAr ? 'قنوات الاتصال الرسمية' : 'OFFICIAL COMMUNICATION CHANNELS'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">
                {isAr ? 'رقم الهاتف الرئيسي' : 'Primary Phone'}
              </label>
              <input
                type="text"
                value={s.primary_phone || ''}
                onChange={(e) => setContent({ ...content, settings: { ...s, primary_phone: e.target.value } })}
                placeholder="+966 50 572 5070"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">
                {isAr ? 'رقم الهاتف الثانوي' : 'Secondary Phone'}
              </label>
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
              <label className="text-xs font-bold text-zinc-300">
                {isAr ? 'البريد الإلكتروني العام للاستفسارات' : 'General Inquiries Email'}
              </label>
              <input
                type="email"
                value={s.general_email || ''}
                onChange={(e) => setContent({ ...content, settings: { ...s, general_email: e.target.value } })}
                placeholder="ceo@wdgroup.online"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300">
                {isAr ? 'بريد وطن للتصميم والمقاولات' : 'Secondary / Watan Designs Email'}
              </label>
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
            <label className="text-xs font-bold text-zinc-300">
              {isAr ? 'رقم الواتساب الرسمي المعتمد' : 'Official WhatsApp Dispatch Number'}
            </label>
            <input
              type="text"
              value={s.whatsapp_phone || ''}
              onChange={(e) => setContent({ ...content, settings: { ...s, whatsapp_phone: e.target.value } })}
              placeholder="+966505725070"
              className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* 3. Brand Identity & Favicon */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl col-span-1 md:col-span-2">
          <h3 className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider border-b border-white/10 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'أيقونة وهوية الموقع (Favicon & Brand Icon)' : 'FAVICON & BRAND ASSETS'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <MediaFieldUploader
                label={isAr ? 'أيقونة الموقع (Favicon & Touch Icon)' : 'Website Favicon & Touch Icon'}
                description={isAr ? 'ارفع أيقونة مخصصة (SVG, PNG, ICO) لتظهر في لسان المتصفح والإشارات المرجعية.' : 'Upload custom icon (SVG, PNG, ICO) to display in browser tabs and home bookmarks.'}
                value={s.favicon_url || content.branding?.favicon || ''}
                onChange={(url) => setContent({
                  ...content,
                  settings: { ...s, favicon_url: url },
                  branding: { ...content.branding, favicon: url }
                })}
                accept="image"
                bucket="photos"
                aspectRatio="1:1"
              />
            </div>

            <div className="space-y-3 bg-[#08090C] border border-white/10 rounded-2xl p-4 text-xs">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
                <span>{isAr ? 'المواصفات القياسية للأيقونة' : 'Favicon Guidelines & Specs'}</span>
              </div>
              <ul className="space-y-1.5 text-zinc-400 font-mono text-[11px] list-disc list-inside">
                <li>{isAr ? 'المقاس الموصى به: 64x64 أو 192x192 بكسل (مربع 1:1)' : 'Recommended dimension: 64x64 or 192x192 px (Square 1:1)'}</li>
                <li>{isAr ? 'الصيغ المعتمدة: SVG (موصى بها لأعلى دقة), PNG, ICO' : 'Supported formats: SVG (Crisp vector recommended), PNG, ICO'}</li>
                <li>{isAr ? 'الخلفية: داكنة متوافقة مع الهوية (#08090C) أو شفافة' : 'Background: Obsidian (#08090C) or Transparent'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Platform Maintenance Mode Control */}
        <div className={`col-span-1 md:col-span-2 rounded-3xl p-6 space-y-5 border transition-all shadow-xl ${
          s.maintenance_mode_enabled 
            ? 'bg-amber-950/20 border-amber-500/40 shadow-amber-950/30' 
            : 'bg-[#0F1117]/90 border-white/10'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                s.maintenance_mode_enabled ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-zinc-400'
              }`}>
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{isAr ? 'وضع الصيانة وإشعار التدشين القريب' : 'Public Maintenance & Launching Soon Mode'}</span>
                  {s.maintenance_mode_enabled ? (
                    <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono px-2 py-0.5 rounded-full font-bold">
                      {isAr ? 'مفعل · الموقع العام محجوب' : 'ACTIVE · PUBLIC SITE HIDDEN'}
                    </span>
                  ) : (
                    <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono px-2 py-0.5 rounded-full font-bold">
                      {isAr ? 'معطل · الموقع العام منشور' : 'DISABLED · PUBLIC SITE LIVE'}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isAr ? 'عند التفعيل، سيرى زوار الموقع العام شاشة الصيانة الفاخرة. ويبقى بإمكان المشرفين الدخول إلى /admin دائماً.' : 'When active, public visitors to wdgroup.online see the luxury Maintenance screen. Staff can always access /admin.'}
                </p>
              </div>
            </div>

            {/* Main Switch */}
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={s.maintenance_mode_enabled || false}
                onChange={(e) => setContent({ ...content, settings: { ...s, maintenance_mode_enabled: e.target.checked } })}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {s.maintenance_mode_enabled && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <BilingualInput
                label={isAr ? 'عنوان الصيانة الرئيسي' : 'Maintenance Headline'}
                description={isAr ? 'يظهر بخط بارز أعلى الرسالة' : 'Displayed prominently above the message'}
                valueEn={s.maintenance_headline_en || 'Platform Under Scheduled Maintenance'}
                valueAr={s.maintenance_headline_ar || 'المنصة تحت الصيانة والتطوير'}
                onChangeEn={(v) => setContent({ ...content, settings: { ...s, maintenance_headline_en: v } })}
                onChangeAr={(v) => setContent({ ...content, settings: { ...s, maintenance_headline_ar: v } })}
              />

              <BilingualInput
                label={isAr ? 'نص رسالة الصيانة' : 'Maintenance Message / Notice'}
                description={isAr ? 'فقرة توضيحية تشرح أعمال الترقية والتدشين' : 'Paragraph explaining the upgrade'}
                isTextarea
                rows={2}
                valueEn={s.maintenance_message_en || 'We are currently preparing and upgrading the official digital platform for WD Group. We look forward to welcoming you soon.'}
                valueAr={s.maintenance_message_ar || 'نعمل حالياً على تطوير وتجهيز المنصة الرقمية الرسمية لمجموعة دبليو دي للأعمال. سنكون معكم قريباً بحلتنا الجديدة.'}
                onChangeEn={(v) => setContent({ ...content, settings: { ...s, maintenance_message_en: v } })}
                onChangeAr={(v) => setContent({ ...content, settings: { ...s, maintenance_headline_ar: v } })}
              />

              <div className="space-y-1.5 max-w-xs">
                <label className="text-xs font-bold text-zinc-300">
                  {isAr ? 'الموعد المتوقع للتدشين / العودة' : 'Estimated Launch / Return Date'}
                </label>
                <input
                  type="text"
                  value={s.maintenance_estimated_date || 'Q3 2026'}
                  onChange={(e) => setContent({ ...content, settings: { ...s, maintenance_estimated_date: e.target.value } })}
                  placeholder={isAr ? 'مثال: الربع الثالث 2026 أو سبتمبر 2026' : 'e.g. Q3 2026 or September 2026'}
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* 5. Official Corporate Bank Accounts (الحسابات البنكية المعتمدة) */}
        <div className="bg-[#0F1117]/90 border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl col-span-1 md:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>{isAr ? '// الحسابات البنكية الرسمية المعتمدة' : '// OFFICIAL CORPORATE BANK ACCOUNTS'}</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {isAr ? 'إدارة الحسابات البنكية المعتمدة المحمية برمز تحقق للعملاء والشركاء.' : 'Manage approved corporate bank accounts protected by access code for authorized clients.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const currentAccounts = s.bank_accounts || [];
                const newAcc: BankAccountRecord = {
                  id: `bank_${Date.now()}`,
                  bank_name_ar: 'مصرف الراجحي',
                  bank_name_en: 'Al Rajhi Bank',
                  account_name_ar: 'شركة تصاميم الوطن المحدودة',
                  account_name_en: 'Watan Designs Ltd.',
                  iban: 'SA0000000000000000000000',
                  account_number: '000000000000',
                  swift_code: 'RJHISARI',
                  currency: 'SAR',
                  is_active: true,
                };
                setContent({
                  ...content,
                  settings: {
                    ...s,
                    bank_accounts: [...currentAccounts, newAcc],
                  },
                });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-blue-400 text-xs font-bold transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة حساب بنكي' : 'Add Bank Account'}</span>
            </button>
          </div>

          {/* Access Code Protection Configuration */}
          <div className="bg-[#08090C] border border-[#C9A86A]/30 rounded-2xl p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C9A86A]">
                <Lock className="w-4 h-4" />
                <span>{isAr ? 'رمز التحقق المالي المعتمد لفتح الحسابات للعملاء' : 'Active Financial Authorization Code'}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                {isAr ? 'نافذة التذييل المنبثقة' : 'Footer Popup Modal'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              {isAr 
                ? 'الرمز الذي يجب على العميل إدخاله في النافذة المنبثقة عند النقر على رابط الحسابات البنكية بالتذييل. (الافتراضي: WD-2026)' 
                : 'The authorization code clients must enter in the pop-up modal triggered from the footer. (Default: WD-2026)'}
            </p>
            <div className="max-w-xs pt-1">
              <input
                type="text"
                value={s.bank_access_code || 'WD-2026'}
                onChange={(e) => setContent({ ...content, settings: { ...s, bank_access_code: e.target.value.toUpperCase() } })}
                placeholder="WD-2026"
                className="w-full bg-[#0F1117] border border-white/20 focus:border-[#C9A86A] rounded-xl px-3.5 py-2 text-xs font-mono font-bold tracking-widest text-[#E3C58A] focus:outline-none uppercase"
                dir="ltr"
              />
            </div>
          </div>

          {(!s.bank_accounts || s.bank_accounts.length === 0) ? (
            <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl space-y-2">
              <CreditCard className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-xs text-zinc-400">{isAr ? 'لم يتم تخصيص حسابات بنكية بعد. سيتم عرض الحسابات الافتراضية.' : 'No custom bank accounts configured yet. Default corporate accounts will be displayed.'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {s.bank_accounts.map((acc, index) => (
                <div 
                  key={acc.id || index}
                  className="bg-[#08090C] border border-white/10 rounded-2xl p-5 space-y-4 relative"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {isAr ? (acc.bank_name_ar || acc.bank_name_en) : (acc.bank_name_en || acc.bank_name_ar)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acc.is_active !== false}
                          onChange={(e) => {
                            const updated = [...(s.bank_accounts || [])];
                            updated[index] = { ...updated[index], is_active: e.target.checked };
                            setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                          }}
                          className="w-3.5 h-3.5 rounded bg-white/10 border-white/20 text-blue-600 focus:ring-0"
                        />
                        <span>{isAr ? 'مفعّل' : 'Active'}</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = (s.bank_accounts || []).filter((_, i) => i !== index);
                          setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                        }}
                        className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                        title={isAr ? 'حذف الحساب' : 'Remove Account'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BilingualInput
                      label={isAr ? 'اسم البنك' : 'Bank Name'}
                      valueEn={acc.bank_name_en}
                      valueAr={acc.bank_name_ar}
                      onChangeEn={(v) => {
                        const updated = [...(s.bank_accounts || [])];
                        updated[index] = { ...updated[index], bank_name_en: v };
                        setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                      }}
                      onChangeAr={(v) => {
                        const updated = [...(s.bank_accounts || [])];
                        updated[index] = { ...updated[index], bank_name_ar: v };
                        setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                      }}
                    />

                    <BilingualInput
                      label={isAr ? 'اسم المستفيد / الحساب' : 'Beneficiary / Account Name'}
                      valueEn={acc.account_name_en}
                      valueAr={acc.account_name_ar}
                      onChangeEn={(v) => {
                        const updated = [...(s.bank_accounts || [])];
                        updated[index] = { ...updated[index], account_name_en: v };
                        setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                      }}
                      onChangeAr={(v) => {
                        const updated = [...(s.bank_accounts || [])];
                        updated[index] = { ...updated[index], account_name_ar: v };
                        setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-mono text-zinc-400">
                        {isAr ? 'رقم الآيبان (IBAN)' : 'IBAN (International Bank Account Number)'}
                      </label>
                      <input
                        type="text"
                        value={acc.iban || ''}
                        onChange={(e) => {
                          const updated = [...(s.bank_accounts || [])];
                          updated[index] = { ...updated[index], iban: e.target.value };
                          setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                        }}
                        placeholder="SA0000000000000000000000"
                        className="w-full bg-[#0F1117] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-400 focus:outline-none focus:border-blue-500"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-zinc-400">
                        {isAr ? 'رقم الحساب' : 'Account Number'}
                      </label>
                      <input
                        type="text"
                        value={acc.account_number || ''}
                        onChange={(e) => {
                          const updated = [...(s.bank_accounts || [])];
                          updated[index] = { ...updated[index], account_number: e.target.value };
                          setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                        }}
                        placeholder="000000000000"
                        className="w-full bg-[#0F1117] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-zinc-400">
                        {isAr ? 'رمز السويفت (SWIFT)' : 'SWIFT / BIC Code'}
                      </label>
                      <input
                        type="text"
                        value={acc.swift_code || ''}
                        onChange={(e) => {
                          const updated = [...(s.bank_accounts || [])];
                          updated[index] = { ...updated[index], swift_code: e.target.value };
                          setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                        }}
                        placeholder="RJHISARI"
                        className="w-full bg-[#0F1117] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-zinc-400">
                        {isAr ? 'العملة' : 'Currency'}
                      </label>
                      <input
                        type="text"
                        value={acc.currency || ''}
                        onChange={(e) => {
                          const updated = [...(s.bank_accounts || [])];
                          updated[index] = { ...updated[index], currency: e.target.value };
                          setContent({ ...content, settings: { ...s, bank_accounts: updated } });
                        }}
                        placeholder="SAR"
                        className="w-full bg-[#0F1117] border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </form>
  );
}
