'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export default function BespokeConsultationBanner() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const [rfpOpen, setRfpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    scope: 'hotel_rooms',
    details: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          company: formData.projectName,
          sector: 'manufacturing',
          subject: `Commercial FF&E RFP: ${formData.projectName} (${formData.scope})`,
          message: `Project: ${formData.projectName}\nScope: ${formData.scope}\nDetails: ${formData.details}`,
        }),
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#C9A86A]/30 bg-gradient-to-br from-[#0F1117] via-[#141721] to-[#0B5C3D]/30 p-8 sm:p-12 shadow-2xl">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#C9A86A]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading & Content */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider uppercase bg-[#C9A86A]/15 border border-[#C9A86A]/35 text-[#C9A86A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.furniture.bespoke_banner.tag}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {dict.furniture.bespoke_banner.heading}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
            {dict.furniture.bespoke_banner.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{dict.furniture.bespoke_banner.feature1_title}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {dict.furniture.bespoke_banner.feature1_desc}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-[#C9A86A] font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{dict.furniture.bespoke_banner.feature2_title}</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {dict.furniture.bespoke_banner.feature2_desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Instant RFP Trigger or Quick Form */}
        <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                {isAr ? 'تم استلام طلب التسعير التجاري' : 'FF&E RFP Received'}
              </h4>
              <p className="text-xs text-zinc-400">
                {isAr
                  ? 'سيتواصل معك مهندس التسعير والمواصفات من مصانع جرين وود خلال 24 ساعة.'
                  : 'A GreenWood contract engineering specialist will contact you within 24 hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white block">
                  {isAr ? 'طلب تسعير مشروعات وفنادق (B2B RFP)' : 'Submit Project RFP / FF&E Specification'}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {isAr ? 'لمطوري الفنادق، المصممين، والمقاولين' : 'For hotel developers, designers & contractors'}
                </span>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'اسم المشروع / الجهة *' : 'Project / Organization Name *'}
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'الاسم *' : 'Contact Name *'}
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="tel"
                  required
                  placeholder={isAr ? 'الجوال *' : 'Phone *'}
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder={isAr ? 'البريد الإلكتروني للعمل *' : 'Work Email *'}
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="hotel_rooms">{isAr ? 'تأثيث غرف وأجنحة فندقية (FF&E)' : 'Hotel Rooms & Suites FF&E'}</option>
                  <option value="corporate_offices">{isAr ? 'مكاتب ومقرات تنفيذية' : 'Executive Offices & HQ'}</option>
                  <option value="luxury_villa">{isAr ? 'قصر أو فيلا سكنية فاخرة' : 'Luxury Villa / Private Estate'}</option>
                  <option value="joinery_cladding">{isAr ? 'أعمال تجاليد وأبواب خشبية مخصصة' : 'Custom Wood Joinery & Cladding'}</option>
                </select>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder={isAr ? 'الكميات التقديرية، المخططات، والملاحظات…' : 'Estimated quantities, drawing links, and notes…'}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? (isAr ? 'جارٍ الإرسال…' : 'Sending…') : dict.furniture.bespoke_banner.cta}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
