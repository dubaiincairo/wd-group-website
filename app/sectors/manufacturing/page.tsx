'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Factory, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Sparkles,
  Layers,
  Cpu,
  Boxes,
  ShieldCheck
} from 'lucide-react';

export default function ManufacturingPage() {
  const { lang, dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    projectCity: '',
    productCategory: 'woodwork',
    estimatedQuantity: '',
    specifications: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone,
          company: formData.projectName,
          sector: 'manufacturing',
          subject: `B2B Manufacturing Quote: ${formData.projectName} (${formData.productCategory})`,
          message: `Project: ${formData.projectName}\nCity: ${formData.projectCity}\nCategory: ${formData.productCategory}\nEstimated Quantity: ${formData.estimatedQuantity || 'N/A'}\nSpecs: ${formData.specifications || 'N/A'}`,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Failed to submit quote request');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. Sector Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Factory className="w-3.5 h-3.5" />
            <span>{dict.manufacturing.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.manufacturing.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {dict.manufacturing.hero.body}
          </p>

          <div className="text-xs sm:text-sm font-mono text-emerald-300 bg-emerald-500/10 inline-block px-4 py-2 rounded-xl border border-emerald-500/20">
            &ldquo;{dict.manufacturing.hero.slogan}&rdquo;
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all"
            >
              <span>{dict.manufacturing.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-200 bg-[#0B5C3D]/60 hover:bg-[#0B5C3D] border border-emerald-400/30 transition-all"
            >
              <span>{dict.manufacturing.hero.secondaryCta}</span>
            </a>
          </div>
        </section>

        {/* 2. 3 Specialized Production Centers */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'المراكز الصناعية' : 'PRODUCTION HUBS'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.manufacturing.factories.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.manufacturing.factories.list.map((fact, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-7 border border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(52,211,153,0.2)] transition-all flex flex-col justify-between group bg-brand-surface/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      FACTORY // 0{idx + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Factory className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {fact.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {fact.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Riyadh & Najran</span>
                  <span className="text-emerald-400 font-semibold">GreenWood</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Modern Production Capabilities (7 Capabilities) */}
        <section id="capabilities" className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 bg-brand-surface/80">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'القدرات والتقنيات' : 'AUTOMATION & WORKFLOW'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.manufacturing.capabilities.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dict.manufacturing.capabilities.list.map((cap, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{cap.title}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. B2B Sectors Served */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 bg-brand-surface/80">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'القطاعات المستفيدة' : 'CLIENTS & SECTORS'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.manufacturing.sectorsServed.heading}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {dict.manufacturing.sectorsServed.sectors.map((sec, idx) => (
              <span key={idx} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-200">
                {sec}
              </span>
            ))}
          </div>
        </section>

        {/* 5. Manufacturing RFP / Quote Form */}
        <section id="quote" className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 bg-brand-surface/90">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.manufacturing.rfp.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              {dict.manufacturing.rfp.body}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'تم استلام طلب تسعير التصنيع' : 'Manufacturing Quote Request Received'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {dict.forms.messages.success}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'اسم المشروع / الجهة *' : 'Project / Organization Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'اسم المشروع' : 'Project name'}
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'المدينة *' : 'Project City *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'الرياض، نجران، جدة…' : 'Riyadh, Najran, Jeddah…'}
                    value={formData.projectCity}
                    onChange={(e) => setFormData({ ...formData, projectCity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'فئة المنتجات المطلوبة *' : 'Product Category *'}
                  </label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="woodwork">{lang === 'ar' ? 'نجارة وأثاث خشبي مخصص' : 'Custom Woodwork & Joinery'}</option>
                    <option value="aluminum">{lang === 'ar' ? 'ألومنيوم ومعادن معمارية' : 'Architectural Aluminum & Metal'}</option>
                    <option value="contract_furniture">{lang === 'ar' ? 'أثاث فنادق ومشاريع وتنجيد' : 'Hotel FF&E & Contract Furniture'}</option>
                    <option value="turnkey_package">{lang === 'ar' ? 'حزمة توريد وتصنيع متكاملة' : 'Turnkey Manufacturing Package'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'الكمية التقديرية (اختياري)' : 'Estimated Quantity (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 100 hotel rooms / 500 panels"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  {lang === 'ar' ? 'المتطلبات والمواصفات *' : 'Requirements & Specifications *'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={lang === 'ar' ? 'صف متطلبات التصنيع والمواد وجداول التسليم…' : 'Describe material specifications, dimensions, and schedule…'}
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {dict.forms.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={dict.forms.placeholders.name}
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {dict.forms.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={dict.forms.placeholders.email}
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {dict.forms.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={dict.forms.placeholders.phone}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? (lang === 'ar' ? 'جارٍ الإرسال…' : 'Submitting…') : dict.manufacturing.rfp.cta}</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
