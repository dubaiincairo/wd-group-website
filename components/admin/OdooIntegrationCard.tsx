'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  ExternalLink, 
  Activity, 
  Send, 
  Database,
  ShieldCheck,
  Zap,
  HelpCircle,
  Key,
  Eye,
  EyeOff,
  Cloud,
  Save,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface OdooStatus {
  connected: boolean;
  message: string;
  uid?: number;
  latencyMs?: number;
}

export default function OdooIntegrationCard() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  // Form State
  const [url, setUrl] = useState('https://wdgroup.odoo.com');
  const [db, setDb] = useState('wdgroup');
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [syncToVercel, setSyncToVercel] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Status & Telemetry
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<OdooStatus | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [vercelConfigured, setVercelConfigured] = useState(false);
  const [lastVercelSync, setLastVercelSync] = useState<string | null>(null);

  // Load existing config on mount
  const loadConfig = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/odoo/config');
      const json = await res.json();

      if (json.success) {
        if (json.config) {
          setUrl(json.config.url || 'https://wdgroup.odoo.com');
          setDb(json.config.db || 'wdgroup');
          setUsername(json.config.username || '');
          setHasApiKey(Boolean(json.config.hasApiKey));
          if (json.config.hasApiKey) {
            setApiKey(json.config.maskedApiKey || '••••••••••••••••');
          }
        }
        setVercelConfigured(Boolean(json.vercelConfigured));
        if (json.connectionStatus) {
          setStatus(json.connectionStatus);
        }
      }
    } catch (err) {
      console.warn('Failed to load Odoo config:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  // Save Credentials & Sync to Vercel
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !db.trim() || !username.trim()) {
      showToast(isAr ? 'يرجى إدخال الرابط، اسم القاعدة، واسم المستخدم' : 'Please fill URL, DB name, and Username', 'error');
      return;
    }

    try {
      setSaving(true);
      const res = await fetch('/api/admin/odoo/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          db,
          username,
          apiKey: apiKey.includes('••••') ? '' : apiKey,
          syncToVercel,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setStatus(json.connectionStatus);
        setHasApiKey(Boolean(json.config?.hasApiKey));
        if (json.config?.hasApiKey && !apiKey.includes('••••')) {
          setApiKey('••••••••••••••••');
        }

        if (json.vercelSync?.success) {
          setLastVercelSync(new Date().toLocaleTimeString());
          showToast(
            isAr
              ? `تم حفظ الإعدادات ومزامنة المتغيرات مع Vercel بنجاح (${json.vercelSync.syncedKeys.length} متغيرات)`
              : `Credentials saved and synchronized to Vercel (${json.vercelSync.syncedKeys.length} variables)`,
            'success'
          );
        } else if (syncToVercel && json.vercelSync && !json.vercelSync.success) {
          showToast(
            isAr
              ? `تم الحفظ في المنظومة، ولكن تعذرت مزامنة Vercel: ${json.vercelSync.message}`
              : `Saved locally, but Vercel sync notice: ${json.vercelSync.message}`,
            'info'
          );
        } else {
          showToast(
            isAr ? 'تم حفظ إعدادات Odoo وتفعيلها فورياً' : 'Odoo configuration saved successfully',
            'success'
          );
        }
      } else {
        showToast(json.error || 'Failed to save Odoo credentials', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving credentials', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Test Connection
  const handleTestConnection = async () => {
    try {
      setTesting(true);
      const res = await fetch('/api/odoo/lead');
      const json = await res.json();

      if (json.success && json.data) {
        setStatus(json.data);
        if (json.data.connected) {
          showToast(
            isAr
              ? `الاتصال بـ Odoo سليم ونشط (${json.data.latencyMs ?? 0}ms)`
              : `Connected to Odoo ERP successfully (${json.data.latencyMs ?? 0}ms)`,
            'success'
          );
        } else {
          showToast(
            isAr ? `تنبيه الاتصال: ${json.data.message}` : `Connection notice: ${json.data.message}`,
            'error'
          );
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Error connecting to Odoo API', 'error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-[#0F1117]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'الربط المباشر مع Odoo ERP' : 'ODOO ERP INTEGRATION & SECRETS MANAGER'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>{isAr ? 'منظومة إدارة الموارد والتصنيع Odoo' : 'Odoo Enterprise Resource Planning'}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold">
              JSON-RPC 2.0
            </span>
          </h2>
          <p className="text-xs text-zinc-400">
            {isAr
              ? 'إدارة المتغيرات والمفاتيح السرية مباشرة من لوحة التحكم، مع مزامنة فورية في قاعدة البيانات وتحديث آلي لـ Vercel.'
              : 'Manage credentials & secrets directly from this panel with instant database persistence and automated Vercel cloud synchronization.'}
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing || saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? (isAr ? 'جارٍ الفحص…' : 'Testing…') : (isAr ? 'اختبار الاتصال' : 'Test Live Connection')}</span>
          </button>
        </div>
      </div>

      {/* Live Status Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Status Card */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
            {isAr ? 'حالة الربط الفعلي' : 'Connection Status'}
          </span>
          <div className="flex items-center gap-2">
            {status?.connected ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {isAr ? 'متصل بنجاح (Live Online)' : 'Live Online'}
                </span>
              </>
            ) : hasApiKey ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-400">
                  {isAr ? 'تحقق من صحة المفتاح' : 'Check Credentials'}
                </span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-sky-400">
                  {isAr ? 'وضع المحاكاة الذكي (Fallback)' : 'Smart Fallback Mode'}
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 line-clamp-1">
            {status?.message || (isAr ? 'جاهز للاستعلام…' : 'Ready for queries…')}
          </p>
        </div>

        {/* Latency & Server */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
            {isAr ? 'سرعة الاستجابة والمصادقة' : 'Response Latency & UID'}
          </span>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-white">
              {status?.latencyMs !== undefined ? `${status.latencyMs} ms` : '—'}
            </span>
            {status?.uid && (
              <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                UID: {status.uid}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 font-mono truncate">
            {url || 'https://wdgroup.odoo.com'}
          </p>
        </div>

        {/* Vercel Cloud Sync Status */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
            {isAr ? 'حالة مزامنة Vercel السحابية' : 'Vercel Cloud Sync'}
          </span>
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-bold text-white">
              {vercelConfigured ? (isAr ? 'مزامنة Vercel مفعلة' : 'Vercel API Connected') : (isAr ? 'تحديث يدوي' : 'Manual API Mode')}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono">
            {lastVercelSync 
              ? (isAr ? `آخر مزامنة: ${lastVercelSync}` : `Last synced: ${lastVercelSync}`)
              : (isAr ? 'جاهز للمزامنة الآلية' : 'Ready for auto-sync')}
          </p>
        </div>
      </div>

      {/* Interactive Credentials Form */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#141721]/90 border border-purple-500/20 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
            <Key className="w-4 h-4 text-purple-400" />
            <span>{isAr ? 'بيانات الاعتماد والمفاتيح السرية (Odoo Credentials)' : 'Odoo ERP Credentials & Secrets'}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
          >
            <span>{isExpanded ? (isAr ? 'إخفاء الحقول' : 'Hide Fields') : (isAr ? 'تعديل الحقول' : 'Edit Fields')}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isExpanded && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Odoo URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>{isAr ? 'رابط خادم Odoo (ODOO_URL)' : 'Odoo Instance URL (ODOO_URL)'}</span>
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://wdgroup.odoo.com"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-500"
                  dir="ltr"
                />
              </div>

              {/* Odoo DB */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  <span>{isAr ? 'اسم قاعدة البيانات (ODOO_DB)' : 'Database Name (ODOO_DB)'}</span>
                </label>
                <input
                  type="text"
                  value={db}
                  onChange={(e) => setDb(e.target.value)}
                  placeholder="wdgroup"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-500"
                  dir="ltr"
                />
              </div>

              {/* Odoo Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  <span>{isAr ? 'اسم المستخدم / البريد (ODOO_USERNAME)' : 'Admin Email / Login (ODOO_USERNAME)'}</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@wdgroup.online"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-500"
                  dir="ltr"
                />
              </div>

              {/* Odoo API Key */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>{isAr ? 'مفتاح API السري (ODOO_API_KEY)' : 'Odoo User API Key (ODOO_API_KEY)'}</span>
                  {hasApiKey && (
                    <span className="text-[10px] font-mono text-emerald-400">
                      {isAr ? 'المفتاح محفوظ ومفعل' : 'Saved in System'}
                    </span>
                  )}
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="e.g. a8d29f0e1c3b4a..."
                    className="w-full bg-[#08090C] border border-white/15 rounded-xl px-4 py-2.5 pr-10 rtl:pr-4 rtl:pl-10 text-xs font-mono font-bold text-purple-300 focus:outline-none focus:border-purple-500"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 rtl:right-auto rtl:left-3 text-zinc-400 hover:text-white"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Vercel Auto-Sync Option */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300 select-none">
                <input
                  type="checkbox"
                  checked={syncToVercel}
                  onChange={(e) => setSyncToVercel(e.target.checked)}
                  className="rounded border-white/20 bg-black/40 text-purple-600 focus:ring-purple-500"
                />
                <span className="font-medium">
                  {isAr
                    ? 'مزامنة المتغيرات آلياً مع Vercel (Production & Preview)'
                    : 'Automatically push and sync variables to Vercel (Production & Preview)'}
                </span>
              </label>
              <span className="text-[10px] font-mono text-purple-400 hidden sm:inline">
                REST API /v10/env
              </span>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{isAr ? 'جارٍ الحفظ والمزامنة مع Vercel…' : 'Saving & Syncing to Vercel…'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حفظ وتحديث Vercel' : 'Save & Sync to Vercel'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two Integration Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Channel 1: Inbound Manufacturing Tracking */}
        <div className="p-5 rounded-2xl bg-[#141721]/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C9A86A]">
              <Zap className="w-4 h-4" />
              <span>{isAr ? 'القناة 1: مزامنة مراحل التصنيع والشحن' : 'Channel 1: Order & Manufacturing Sync'}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Odoo ➔ Web
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {isAr
              ? 'يقوم الموقع بالاستعلام المباشر من Odoo عن أوامر التصنيع (mrp.production) وأوامر المبيعات (sale.order) والشحنات (stock.picking) لعرض الـ 6 مراحل للعميل بدقة.'
              : 'Direct JSON-RPC query for production orders (mrp.production), sales orders (sale.order), and shipments (stock.picking) mapped directly to the 6 client tracking stages.'}
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-[11px] font-mono text-zinc-400">
              Endpoint: <code className="text-purple-300">GET /api/odoo/track?ref=...</code>
            </span>
            <Link
              href="/furniture/track"
              target="_blank"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C9A86A] hover:underline"
            >
              <span>{isAr ? 'معاينة شاشة التتبع' : 'Preview Tracker'}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Channel 2: Outbound Lead & Order Capture */}
        <div className="p-5 rounded-2xl bg-[#141721]/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
              <Send className="w-4 h-4" />
              <span>{isAr ? 'القناة 2: التقاط العملاء والطلبات آلياً' : 'Channel 2: Automatic Lead Capture'}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Web ➔ Odoo
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {isAr
              ? 'إنشاء فرصة بيع (crm.lead) فورية في Odoo عند تقديم أي استفسار، طلب تسعير فندقي، أو طلب شراء من المتجر الإلكتروني مع تفاصيل المنتجات والمبالغ.'
              : 'Automatically generates a CRM Opportunity (crm.lead) whenever a client submits a general inquiry, bespoke RFP, swatch request, or checkout order.'}
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <span className="text-[11px] font-mono text-zinc-400">
              Endpoint: <code className="text-purple-300">POST /api/odoo/lead</code>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{isAr ? 'مربوط مع نماذج التواصل والمتجر' : 'Active on all Web Forms'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
