'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  HardHat, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Sparkles,
  Layers,
  FileCheck,
  ShieldCheck,
  Compass,
  Building
} from 'lucide-react';

export default function ContractingPage() {
  const { lang, dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    projectCity: '',
    projectType: 'commercial',
    scope: '',
    estimatedArea: '',
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
          sector: 'contracting',
          subject: `Contracting & Fit-Out RFP: ${formData.projectName} (${formData.projectType})`,
          message: `Project: ${formData.projectName}\nCity: ${formData.projectCity}\nType: ${formData.projectType}\nScope: ${formData.scope || 'N/A'}\nEstimated Area: ${formData.estimatedArea || 'N/A'}`,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Failed to submit fit-out RFP');
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <HardHat className="w-3.5 h-3.5" />
            <span>{dict.contracting.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.contracting.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {dict.contracting.hero.body}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#tender"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all"
            >
              <span>{dict.contracting.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            <a
              href="#lifecycle"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-amber-200 bg-[#8A7340]/60 hover:bg-[#8A7340] border border-amber-400/30 transition-all"
            >
              <span>{dict.contracting.hero.secondaryCta}</span>
            </a>
          </div>
        </section>

        {/* 2. Core Services */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'الخدمات الهندسية' : 'CORE SERVICES'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.contracting.services.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dict.contracting.services.list.map((serv, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-7 border border-white/10 hover:border-amber-500/40 transition-all flex items-start gap-4 bg-brand-surface/80"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {serv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {serv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Project Lifecycle (4 Stages) */}
        <section id="lifecycle" className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 bg-brand-surface/80">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'منهجية العمل' : 'PROJECT LIFECYCLE'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.contracting.lifecycle.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.contracting.lifecycle.stages.map((stage, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  STAGE {stage.num}
                </span>
                <h4 className="text-base font-bold text-white">
                  {stage.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Contracting Tender / RFP Form */}
        <section id="tender" className="glass-card rounded-3xl p-8 sm:p-12 border border-amber-500/30 bg-brand-surface/90">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.contracting.rfp.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              {dict.contracting.rfp.body}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'تم استلام طلب المشروع والمناقصة' : 'Project RFP Received'}
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
                    {lang === 'ar' ? 'اسم المشروع *' : 'Project Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'اسم المشروع' : 'Project name'}
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'المدينة *' : 'Project City *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'الرياض، جدة، نجران…' : 'Riyadh, Jeddah, Najran…'}
                    value={formData.projectCity}
                    onChange={(e) => setFormData({ ...formData, projectCity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'نوع المشروع *' : 'Project Type *'}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="commercial">{lang === 'ar' ? 'تجاري ومكاتب' : 'Commercial & Office'}</option>
                    <option value="hospitality">{lang === 'ar' ? 'فندقي وضيافة' : 'Hospitality Fit-Out'}</option>
                    <option value="residential">{lang === 'ar' ? 'سكني ومجمعات' : 'Residential Compound'}</option>
                    <option value="turnkey">{lang === 'ar' ? 'مقاولات متكاملة تسليم مفتاح' : 'Turnkey General Fit-out'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'المساحة التقديرية (اختياري)' : 'Estimated Area (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2,500 sqm"
                    value={formData.estimatedArea}
                    onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  {lang === 'ar' ? 'نطاق العمل المطلوب *' : 'Required Scope *'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={lang === 'ar' ? 'صف نطاق المقاولات، التشطيب، والجداول الزمنية المطلوبة…' : 'Describe scope of works, finishes, and target schedule…'}
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500 resize-none"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-amber-500"
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
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? (lang === 'ar' ? 'جارٍ الإرسال…' : 'Submitting…') : dict.contracting.rfp.cta}</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
