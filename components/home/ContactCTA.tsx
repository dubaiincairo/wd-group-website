'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ArrowRight, X, ChevronDown } from 'lucide-react';

export default function ContactCTA() {
  const { lang, dict } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
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
      console.error('ContactCTA form error:', err);
      setErrorMessage(err.message || (lang === 'ar' ? 'فشل الإرسال، يرجى المحاولة لاحقاً' : 'Submission failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-brand-dark text-white relative overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#C9A86A]/30 shadow-2xl relative overflow-hidden bg-[#0F1117]/90">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-mono">{dict.home.partnership.label}</span>
            </div>

            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight ${lang === 'en' ? 'font-serif' : ''}`}>
              {dict.home.partnership.heading}
            </h2>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal">
              {dict.home.partnership.body}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#0E1A24] bg-[#C9A86A] hover:bg-[#E3C58A] shadow-glow-camel hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{dict.home.partnership.primaryCta}</span>
              </button>

              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{dict.home.partnership.secondaryCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>

          </div>

          {/* Quick Coordinates Footer */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-400 text-center sm:text-left rtl:sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span>{dict.footer.location_text}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <a href="mailto:ceo@wdgroup.online" className="hover:text-white" dir="ltr">ceo@wdgroup.online</a>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <a href="tel:+966505725070" className="hover:text-white" dir="ltr">+966 50 572 5070</a>
            </div>
          </div>

        </div>

      </div>

      {/* Inquiry Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0F1117] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => { setModalOpen(false); setSubmitted(false); }}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'ar' ? 'تم استلام استفسارك بنجاح' : 'Inquiry Submitted'}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  {dict.forms.messages.success}
                </p>
                <button
                  onClick={() => { setModalOpen(false); setSubmitted(false); }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {dict.contact.form.heading}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {dict.contact.form.body}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      {dict.forms.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={dict.forms.placeholders.name}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      {dict.forms.sector} *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full appearance-none px-3.5 pr-10 rtl:pr-3.5 rtl:pl-10 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="general">{dict.forms.options.general}</option>
                        <option value="hospitality">{dict.forms.options.hospitality}</option>
                        <option value="manufacturing">{dict.forms.options.manufacturing}</option>
                        <option value="contracting">{dict.forms.options.contracting}</option>
                        <option value="partnership">{dict.forms.options.partnership}</option>
                        <option value="tender">{dict.forms.options.tender}</option>
                        <option value="careers">{dict.forms.options.careers}</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      {dict.forms.message} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={dict.forms.placeholders.message}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-glow-blue transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : null}
                      <span>{loading ? (lang === 'ar' ? 'جارٍ الإرسال…' : 'Submitting…') : (dict.forms.placeholders.name ? dict.common.submitInquiry : 'Submit')}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
