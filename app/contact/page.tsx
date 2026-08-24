'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  UploadCloud 
} from 'lucide-react';

export default function ContactPage() {
  const { lang, dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    sector: 'general',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (lang === 'ar' ? 'حدث خطأ أثناء إرسال الرسالة' : 'Failed to submit inquiry'));
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err.message || (lang === 'ar' ? 'فشل الإرسال، يرجى المحاولة لاحقاً' : 'Submission failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* 1. Contact Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{dict.contact.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {dict.contact.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {dict.contact.hero.body}
          </p>
        </section>

        {/* 2. Official Contact Cards (Najran HQ, Emails, Phones) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Headquarters */}
          <div className="glass-card rounded-3xl p-7 border border-white/10 space-y-3 bg-brand-surface/80">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {dict.contact.cards.hq_title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {dict.contact.cards.hq_address}
            </p>
          </div>

          {/* Card 2: Email Channels */}
          <div className="glass-card rounded-3xl p-7 border border-white/10 space-y-3 bg-brand-surface/80">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {dict.contact.cards.general_title}
            </h3>
            <div className="space-y-1 text-xs text-zinc-400 font-mono" dir="ltr">
              <div>
                <a href={`mailto:${dict.contact.cards.general_email}`} className="text-blue-400 hover:underline">
                  {dict.contact.cards.general_email}
                </a>
              </div>
              <div>
                <a href={`mailto:${dict.contact.cards.secondary_email}`} className="hover:text-white">
                  {dict.contact.cards.secondary_email}
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Phones */}
          <div className="glass-card rounded-3xl p-7 border border-white/10 space-y-3 bg-brand-surface/80">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {dict.contact.cards.phone_title}
            </h3>
            <div className="space-y-1 text-xs text-zinc-400 font-mono" dir="ltr">
              <div>
                <a href="tel:+966505725070" className="text-blue-400 hover:underline">
                  {dict.contact.cards.primary_phone}
                </a>
              </div>
              <div>
                <a href="tel:+966533979797" className="hover:text-white">
                  {dict.contact.cards.secondary_phone}
                </a>
              </div>
            </div>
          </div>

        </section>

        {/* 3. Integrated Multi-Sector Inquiry Form */}
        <section className="glass-card rounded-3xl p-8 sm:p-12 border border-blue-500/30 bg-brand-surface/90">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {dict.contact.form.heading}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300">
              {dict.contact.form.body}
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'ar' ? 'تم استلام استفسارك بنجاح' : 'Inquiry Submitted'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {dict.forms.messages.success}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    company: '',
                    email: '',
                    phone: '',
                    sector: 'general',
                    subject: '',
                    message: '',
                  });
                }}
                className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                {lang === 'ar' ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>{errorMessage}</span>
                </div>
              )}
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
                    {dict.forms.company} ({lang === 'ar' ? 'اختياري' : 'Optional'})
                  </label>
                  <input
                    type="text"
                    placeholder={dict.forms.placeholders.company}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                    {dict.forms.sector} *
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="general">{dict.forms.options.general}</option>
                    <option value="hospitality">{dict.forms.options.hospitality}</option>
                    <option value="manufacturing">{dict.forms.options.manufacturing}</option>
                    <option value="contracting">{dict.forms.options.contracting}</option>
                    <option value="partnership">{dict.forms.options.partnership}</option>
                    <option value="tender">{dict.forms.options.tender}</option>
                    <option value="careers">{dict.forms.options.careers}</option>
                    <option value="media">{dict.forms.options.media}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">
                    {dict.forms.subject} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={dict.forms.placeholders.subject}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  {dict.forms.message} *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={dict.forms.placeholders.message}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-dashed border-zinc-700 text-center">
                <UploadCloud className="w-6 h-6 text-zinc-400 mx-auto mb-1" />
                <span className="text-xs text-zinc-300 font-semibold block">
                  {dict.forms.attachment}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {lang === 'ar' ? 'الحد الأقصى للملف: 10 ميجابايت (PDF, DOCX, XLSX, ZIP)' : 'Max file size: 10 MB (PDF, DOCX, XLSX, ZIP)'}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  required
                  id="consent"
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-blue-600 focus:ring-0"
                />
                <label htmlFor="consent" className="text-xs text-zinc-400 cursor-pointer">
                  {dict.forms.consent}
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-glow-blue transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{loading ? (lang === 'ar' ? 'جارٍ الإرسال…' : 'Submitting…') : dict.contact.form.submit}</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* 4. Legal Identity & Headquarters Verification Panel */}
        <section className="glass-card rounded-3xl p-8 border border-white/10 bg-brand-surface/80">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ar' ? '// البيانات الرسمية والنظامية' : '// OFFICIAL CORPORATE IDENTITY'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-zinc-300">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-zinc-500 block">{lang === 'ar' ? 'الكيان القانوني' : 'Legal Entity'}</span>
              <span className="font-bold text-white block">{dict.contact.legal.entity}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-zinc-500 block">{lang === 'ar' ? 'السجل التجاري' : 'Commercial Registration'}</span>
              <span className="font-bold text-white block" dir="ltr">{dict.contact.legal.cr}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="text-zinc-500 block">{lang === 'ar' ? 'الرقم الضريبي' : 'VAT / Tax ID'}</span>
              <span className="font-bold text-white block" dir="ltr">{dict.contact.legal.vat}</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
