'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Send,
  UserCheck,
  FileText,
  Key,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';

export default function EmailTemplatesPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const templates = [
    {
      id: 'client-inquiry',
      title: isAr ? '1. تأكيد استلام الاستفسار (للعميل)' : '1. Commercial Inquiry Confirmation (Client)',
      badge: isAr ? 'استفسارات العملاء' : 'Client Relations',
      badgeColor: 'bg-[#C9A86A]/20 text-[#E3C58A] border-[#C9A86A]/30',
      icon: Mail,
      desc: isAr ? 'يتم إرسالها للعميل تلقائياً فور تعبئة نموذج التواصل مع رقم مرجعي وتعهد بالرد.' : 'Auto-dispatched to client upon form submission with reference ID and SLA.',
    },
    {
      id: 'admin-lead',
      title: isAr ? '2. إشعار فريق المبيعات بعميل جديد' : '2. Commercial Lead Alert (Admin CRM)',
      badge: isAr ? 'تنبيهات الإدارة' : 'CRM Dispatch',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: Bell,
      desc: isAr ? 'تنبيه عاجل للإدارة وفريق المبيعات بكافة تفاصيل العميل والرسالة للرد الفوري.' : 'Instant alert with client details, contact info, and fast-reply options.',
    },
    {
      id: 'career-candidate',
      title: isAr ? '3. تأكيد استلام طلب التوظيف (للمرشح)' : '3. Job Application Confirmation (Candidate)',
      badge: isAr ? 'رأس المال البشري' : 'Human Capital',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: UserCheck,
      desc: isAr ? 'تأكيد استلام السيرة الذاتية مع شارة "قيد المراجعة" ورقم مرجعي للملف.' : 'Candidate receipt with "Under HR Review" badge and applicant tracking ID.',
    },
    {
      id: 'hr-ats',
      title: isAr ? '4. إشعار فريق الموارد البشرية بمرشح جديد' : '4. Candidate Dossier Alert (HR ATS)',
      badge: isAr ? 'نظام التوظيف ATS' : 'HR ATS System',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: FileText,
      desc: isAr ? 'ملف المرشح المكتمل مع زر مباشر لتحميل الـ CV ورابط حسابه في لينكد إن.' : 'Full candidate dossier with direct resume download button and LinkedIn link.',
    },
    {
      id: 'admin-reset',
      title: isAr ? '5. إعادة تعيين كلمة مرور المسؤول' : '5. Admin Password Reset (Security)',
      badge: isAr ? 'الأمان والحماية' : 'Security & Access',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: ShieldCheck,
      desc: isAr ? 'رسالة أمان موثقة بزر محمي ورابط صالح لمدة 60 دقيقة فقط.' : 'High-security credential reset link valid for single use (60 minutes).',
    },
    {
      id: 'magic-link',
      title: isAr ? '6. الدخول السريع بنقرة واحدة (1-Click)' : '6. 1-Click Instant Sign In (Magic Link)',
      badge: isAr ? 'المصادقة الفورية' : 'Instant Auth',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: Key,
      desc: isAr ? 'تسجيل دخول فوري وآمن للوحة الإدارة التنفيذية برابط صالح لـ 15 دقيقة.' : 'Passwordless 1-click executive authentication token valid for 15 minutes.',
    },
    {
      id: 'furniture-order',
      title: isAr ? '7. تأكيد طلب وفاتورة تصنيع الأثاث' : '7. Furniture Order & Invoice Confirmation',
      badge: isAr ? 'المتجر والفواتير' : 'E-Commerce Invoice',
      badgeColor: 'bg-[#C9A86A]/20 text-[#E3C58A] border-[#C9A86A]/30',
      icon: ShoppingBag,
      desc: isAr ? 'فاتورة إلكترونية مفصلة باللغة العربية والريال السعودي (ر.س) وجدول المنتجات والشحن.' : 'Itemized invoice receipt with SAR pricing, VAT breakdown, and delivery schedule.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/20 text-[#C9A86A] text-xs font-mono font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'نظام رسائل البريد الإلكتروني الفاخر' : 'TRANSACTIONAL EMAIL SYSTEM'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'قوالب ونماذج البريد الإلكتروني' : 'Email Templates & Previews'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {isAr ? 'معاينة وإدارة كافة رسائل البريد الإلكتروني التلقائية بتصميم متوافق مع نظام مجموعة دبليو دي.' : 'Inspect and test all automated transactional email templates rendered in luxury WD Group aesthetics.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/email-preview.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all"
          >
            <ExternalLink className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'فتح المعاينة الشاملة المستقلة' : 'Open Standalone Showcase'}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Template Selector & Interactive Live Preview Frame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Navigation List (5 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold text-[#C9A86A] uppercase tracking-wider px-2">
            {isAr ? 'القوالب المعتمدة (7 قوالب)' : 'SYSTEM TEMPLATES (7 TOTAL)'}
          </div>

          <div className="space-y-2">
            {templates.map((tpl, idx) => {
              const Icon = tpl.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-start p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isActive
                      ? 'bg-[#141722] border-[#C9A86A] shadow-glow-camel'
                      : 'bg-[#0F1117] border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${tpl.badgeColor}`}>
                      {tpl.badge}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A86A]' : 'text-zinc-500'}`} />
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {tpl.title}
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {tpl.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right / Frame Preview Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Frame Top Controls */}
          <div className="flex items-center justify-between bg-[#0F1117] border border-white/10 rounded-2xl p-3 px-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">
                {templates[activeTab].title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/40 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'desktop' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حاسوب' : 'Desktop'}</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'هاتف' : 'Mobile'}</span>
                </button>
              </div>

              <a
                href="/email-preview.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#C9A86A] hover:bg-[#E3C58A] text-[#08090C] text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isAr ? 'معاينة ونسخ HTML' : 'Copy HTML'}</span>
              </a>
            </div>
          </div>

          {/* Embedded Showcase Frame */}
          <div className="bg-[#08090C] border border-white/10 rounded-3xl p-4 sm:p-6 flex justify-center items-center overflow-hidden min-h-[720px]">
            <div className={`w-full transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-[390px] border-4 border-zinc-800 rounded-[36px] overflow-hidden shadow-2xl' : 'max-w-[640px]'}`}>
              <iframe
                src="/email-preview.html"
                className="w-full h-[680px] rounded-2xl border-none bg-[#08090C]"
                title="Email Preview"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
