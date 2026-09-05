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
  HelpCircle
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

interface OdooDetails {
  url: string | null;
  db: string | null;
  username: string | null;
  hasApiKey: boolean;
}

export default function OdooIntegrationCard() {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<OdooStatus | null>(null);
  const [details, setDetails] = useState<OdooDetails | null>(null);
  const [configured, setConfigured] = useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const testConnection = async (silent = false) => {
    try {
      setTesting(true);
      const res = await fetch('/api/odoo/lead');
      const json = await res.json();

      if (json.success && json.data) {
        setStatus(json.data);
        setConfigured(Boolean(json.configured));
        if (json.details) {
          setDetails(json.details);
        }

        if (!silent) {
          if (json.data.connected) {
            showToast(
              isAr
                ? `تم الاتصال بنجاح بـ Odoo ERP (${json.data.latencyMs ?? 0}ms)`
                : `Successfully connected to Odoo ERP (${json.data.latencyMs ?? 0}ms)`,
              'success'
            );
          } else {
            showToast(
              isAr
                ? `تنبيه الاتصال بـ Odoo: ${json.data.message}`
                : `Odoo connection notice: ${json.data.message}`,
              'error'
            );
          }
        }
      } else {
        if (!silent) {
          showToast(json.error || 'Failed to check Odoo connection', 'error');
        }
      }
    } catch (err: any) {
      if (!silent) {
        showToast(err.message || 'Error connecting to Odoo API', 'error');
      }
    } finally {
      setTesting(false);
      setInitialLoaded(true);
    }
  };

  useEffect(() => {
    testConnection(true);
  }, []);

  return (
    <div className="bg-[#0F1117]/90 border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? 'الربط المباشر مع Odoo ERP' : 'ODOO ERP INTEGRATION'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>{isAr ? 'منظومة إدارة الموارد والتصنيع Odoo' : 'Odoo Enterprise Resource Planning'}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold">
              JSON-RPC
            </span>
          </h2>
          <p className="text-xs text-zinc-400">
            {isAr
              ? 'مزامنة ثنائية الاتجاه: جلب مراحل التصنيع والشحن للموقع، ودفع العملاء المحتملين لـ Odoo CRM تلقائياً.'
              : 'Bidirectional sync: Pull live manufacturing & dispatch stages to website tracker, and push inquiries directly to Odoo CRM.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => testConnection(false)}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? (isAr ? 'جارٍ الفحص…' : 'Testing…') : (isAr ? 'اختبار الاتصال' : 'Test Live Connection')}</span>
          </button>
        </div>
      </div>

      {/* Live Status Indicators */}
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
            ) : configured ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-400">
                  {isAr ? 'غير متصل (تحقق من المفتاح)' : 'Check Credentials'}
                </span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-sky-400">
                  {isAr ? 'وضع المحاكاة الذكي (Fallback Demo)' : 'Smart Fallback Mode'}
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 line-clamp-1">
            {status?.message || (isAr ? 'جارٍ الفحص الأولي للاتصال…' : 'Checking connection status…')}
          </p>
        </div>

        {/* Latency & Server */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
            {isAr ? 'سرعة الاستجابة' : 'Response Latency'}
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
            {details?.url || 'https://wdgroup.odoo.com'}
          </p>
        </div>

        {/* Database & Security */}
        <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
            {isAr ? 'قاعدة البيانات والمصادقة' : 'Database & Auth'}
          </span>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#C9A86A]" />
            <span className="text-xs font-mono font-bold text-white">
              {details?.db || 'wdgroup'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{details?.hasApiKey ? (isAr ? 'مفتاح API مفعل' : 'API Key Configured') : (isAr ? 'المفتاح غير ممرر' : 'API Key Missing')}</span>
          </div>
        </div>
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

      {/* Setup Guide / Environment Reference */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>
            {isAr
              ? 'لتفعيل الربط الحي الكامل، قم بتعيين المتغيرات: ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY في Vercel.'
              : 'To enable full live sync, set environment variables: ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY in Vercel.'}
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 shrink-0">
          Zero External Dependencies · Safe Server-Side JSON-RPC
        </span>
      </div>
    </div>
  );
}
