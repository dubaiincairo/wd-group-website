'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Sparkles,
  Briefcase,
  GraduationCap,
  TrendingUp,
  FileText,
  UploadCloud
} from 'lucide-react';

export default function CareersPage() {
  const { lang, dict } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    sector: 'hospitality',
    linkedin: '',
    coverNote: '',
  });

  const PILLAR_ICONS = [GraduationCap, TrendingUp, Users, CheckCircle2];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* 1. Careers Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Users className="w-3.5 h-3.5" />
            <span>{dict.careers.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.careers.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {dict.careers.hero.body}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface border border-white/10 text-xs font-mono text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>{dict.careers.hero.proof}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#talent-pool"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
            >
              <span>{dict.careers.hero.secondaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            <a
              href="#positions"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
            >
              <span>{dict.careers.hero.primaryCta}</span>
            </a>
          </div>
        </section>

        {/* 2. Employee Value Proposition (4 Pillars) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'بيئة العمل والتطوير' : 'VALUE PROPOSITION'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.careers.pillars.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.careers.pillars.list.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between bg-brand-surface/80"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Open Positions Directory (Filterable with compliant empty state) */}
        <section id="positions" className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 bg-brand-surface/80">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              // {lang === 'ar' ? 'الوظائف' : 'OPPORTUNITIES'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.careers.jobs.heading}
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {dict.careers.jobs.filters.map((fil, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeFilter === idx
                    ? 'bg-blue-600 text-white shadow-glow-blue'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {fil}
              </button>
            ))}
          </div>

          {/* Structured Empty State (Honest, No Invented Jobs) */}
          <div className="p-8 rounded-2xl bg-black/40 border border-dashed border-zinc-700 text-center space-y-3">
            <Briefcase className="w-8 h-8 text-zinc-500 mx-auto" />
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              {dict.careers.jobs.empty}
            </p>
            <a
              href="#talent-pool"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
            >
              <span>{dict.careers.talentPool.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </a>
          </div>
        </section>

        {/* 4. Talent Pool CV Submission Form */}
        <section id="talent-pool" className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 bg-brand-surface/90">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.careers.talentPool.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              {dict.careers.talentPool.body}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'تم استلام سيرتك الذاتية بنجاح' : 'CV Received Successfully'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {dict.forms.messages.successApp}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {dict.forms.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={dict.forms.placeholders.name}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'مدينة الإقامة *' : 'Current City *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'الرياض، نجران، جدة…' : 'Riyadh, Najran, Jeddah…'}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {dict.forms.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={dict.forms.placeholders.email}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'القطاع المفضل *' : 'Preferred Sector *'}
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="hospitality">{dict.forms.options.hospitality}</option>
                    <option value="manufacturing">{dict.forms.options.manufacturing}</option>
                    <option value="contracting">{dict.forms.options.contracting}</option>
                    <option value="corporate">{lang === 'ar' ? 'الإدارة المؤسسية والمالية' : 'Corporate & Finance'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'رابط حساب LinkedIn (اختياري)' : 'LinkedIn Profile (Optional)'}
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  {lang === 'ar' ? 'نبذة مختصرة عن خبراتك (اختياري)' : 'Short Introduction (Optional)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'ar' ? 'أبرز المهارات والخبرات العملية…' : 'Key skills and relevant experience…'}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-dashed border-zinc-700 text-center">
                <UploadCloud className="w-6 h-6 text-zinc-400 mx-auto mb-1" />
                <span className="text-xs text-zinc-300 font-semibold block">
                  {lang === 'ar' ? 'إرفاق السيرة الذاتية (PDF حتى 10 ميجابايت)' : 'Upload Resume / CV (PDF up to 10 MB)'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {lang === 'ar' ? 'سيتم حفظ البيانات بسرية تامة ومراجعتها من قبل إدارة الموارد البشرية' : 'Stored securely and reviewed by WD Group HR'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-glow-blue transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{dict.careers.talentPool.cta}</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
