'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  X, 
  Building2, 
  Factory, 
  HardHat, 
  Briefcase,
  Mail,
  Phone
} from 'lucide-react';

export default function ContactCTA() {
  const { lang, dict } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: 'hospitality',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white text-brand-dark border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-pearl border border-brand-border text-brand-accent mb-6 shadow-2xs">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{dict.contact_cta.tag}</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-5 leading-tight">
          {dict.contact_cta.title}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          {dict.contact_cta.subtitle}
        </p>

        {/* Action Button */}
        <button
          onClick={() => { setModalOpen(true); setSubmitted(false); }}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-brand-dark hover:bg-brand-surface border border-brand-slate shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
        >
          <Mail className="w-4 h-4 text-brand-accent" />
          <span>{dict.contact_cta.button}</span>
        </button>

        {/* Contact Info Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
          <a href="mailto:info@wdgroup.com.sa" className="flex items-center gap-1.5 hover:text-brand-accent transition-colors">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>info@wdgroup.com.sa</span>
          </a>
          <span className="text-zinc-300">•</span>
          <a href="tel:+966123456789" className="flex items-center gap-1.5 hover:text-brand-accent transition-colors font-mono">
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>+966 12 345 6789</span>
          </a>
        </div>

      </div>

      {/* Interactive Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-brand-slate shadow-2xl relative">
            
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-brand-surface hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {lang === 'ar' ? 'تم الإرسال بنجاح' : 'Inquiry Received'}
                </h3>
                <p className="text-xs text-zinc-300 mb-6">
                  {dict.contact_cta.form_success}
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs"
                >
                  {dict.contact_cta.close}
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {dict.contact_cta.form_title}
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  {dict.contact_cta.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-start">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      {dict.contact_cta.form_sector}
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-brand-slate text-white text-xs focus:outline-none focus:border-brand-accent"
                    >
                      <option value="hospitality">{dict.contact_cta.opt_hosp}</option>
                      <option value="manufacturing">{dict.contact_cta.opt_mfg}</option>
                      <option value="contracting">{dict.contact_cta.opt_contr}</option>
                      <option value="careers">{dict.contact_cta.opt_careers}</option>
                      <option value="general">{dict.contact_cta.opt_general}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        {dict.contact_cta.form_name}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-brand-slate text-white text-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        {dict.contact_cta.form_email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-brand-slate text-white text-xs focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      {dict.contact_cta.form_phone}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+966 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-brand-slate text-white text-xs focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      {dict.contact_cta.form_message}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-brand-slate text-white text-xs focus:outline-none focus:border-brand-accent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-brand-accent hover:bg-brand-accentHover transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>{dict.contact_cta.form_submit}</span>
                    <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
