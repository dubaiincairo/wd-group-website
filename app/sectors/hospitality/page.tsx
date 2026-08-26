'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  ExternalLink, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  FileUp,
  ChevronDown
} from 'lucide-react';

export default function HospitalityPage() {
  const { lang, dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyCity: '',
    propertyType: 'hotel',
    roomCount: '',
    projectStage: 'operating',
    serviceRequired: 'full_management',
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
          company: formData.propertyName,
          sector: 'hospitality',
          subject: `Hospitality Partnership RFP: ${formData.propertyName} (${formData.propertyCity})`,
          message: `Property: ${formData.propertyName}\nCity: ${formData.propertyCity}\nType: ${formData.propertyType}\nRooms: ${formData.roomCount || 'N/A'}\nStage: ${formData.projectStage}\nRequired Service: ${formData.serviceRequired}`,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Failed to submit RFP');
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>{dict.hospitality.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.hospitality.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {dict.hospitality.hero.body}
          </p>

          <div className="text-xs sm:text-sm font-mono text-sky-300 bg-sky-500/10 inline-block px-4 py-2 rounded-xl border border-sky-500/20">
            &ldquo;{dict.hospitality.hero.slogan}&rdquo;
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
            >
              <span>{dict.hospitality.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            <a
              href="https://swissblue.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-sky-200 bg-[#1A476A]/60 hover:bg-[#1A476A] border border-sky-400/30 transition-all"
            >
              <span>{dict.hospitality.hero.secondaryCta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 2. Properties Portfolio Grid (6 Named Properties) */}
        <section id="portfolio" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {dict.hospitality.portfolio.label}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.hospitality.portfolio.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              {dict.hospitality.portfolio.body}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.hospitality.portfolio.properties.map((prop, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 border border-white/10 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all flex flex-col justify-between group bg-brand-surface/80"
              >
                <div>
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-gradient-to-br from-[#0c1a2e] via-[#091220] to-[#060a12] flex items-center justify-center">
                    {(prop as any).image_url ? (
                      <>
                        <Image
                          src={(prop as any).image_url}
                          alt={prop.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/30" />
                      </>
                    ) : (
                      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] [background-opacity:0.15]">
                        <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-glow-sky group-hover:scale-110 transition-transform">
                          <Building2 className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/60 text-sky-300 border border-sky-400/30 backdrop-blur-md">
                      0{idx + 1}
                    </span>
                    <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-950/80 text-sky-200 border border-sky-500/30 flex items-center gap-1 backdrop-blur-md">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>{prop.city}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {prop.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {prop.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-sky-400 font-semibold">
                  <span>SwissBlue Portfolio</span>
                  <Building2 className="w-4 h-4 opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Hospitality Management Services */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8 bg-brand-surface/80">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {lang === 'ar' ? 'خدمات إدارة الأصول' : 'OPERATOR SERVICES'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.hospitality.services.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {dict.hospitality.services.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dict.hospitality.services.list.map((serv, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{serv.title}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {serv.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Hotel Partnership RFP Form */}
        <section id="rfp" className="glass-card rounded-3xl p-8 sm:p-12 border border-sky-500/30 bg-brand-surface/90">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.hospitality.rfp.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              {dict.hospitality.rfp.body}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'تم استلام طلب الشراكة الفندقية' : 'Partnership Inquiry Received'}
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
                    {lang === 'ar' ? 'اسم المنشأة / المشروع *' : 'Property / Project Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'أدخل اسم المنشأة' : 'Enter property name'}
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'المدينة *' : 'City *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'ar' ? 'الرياض، جدة، نجران…' : 'Riyadh, Jeddah, Najran…'}
                    value={formData.propertyCity}
                    onChange={(e) => setFormData({ ...formData, propertyCity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'نوع المنشأة *' : 'Property Type *'}
                  </label>
                  <div className="relative">
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full appearance-none px-3.5 pr-10 rtl:pr-3.5 rtl:pl-10 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="hotel">{lang === 'ar' ? 'فندق كامل الخدمات' : 'Full-Service Hotel'}</option>
                      <option value="apartments">{lang === 'ar' ? 'شقق فندقية مخدومة' : 'Serviced Apartments'}</option>
                      <option value="boutique">{lang === 'ar' ? 'فندق بوتيك' : 'Boutique Hotel'}</option>
                      <option value="development">{lang === 'ar' ? 'مشروع قيد التطوير' : 'New Development'}</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {lang === 'ar' ? 'عدد الغرف / الوحدات (اختياري)' : 'Number of Rooms / Units (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 60 units"
                    value={formData.roomCount}
                    onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500"
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
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? (lang === 'ar' ? 'جارٍ الإرسال…' : 'Submitting…') : dict.hospitality.rfp.cta}</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
