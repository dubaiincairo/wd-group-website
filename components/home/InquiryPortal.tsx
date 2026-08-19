'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Send, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Building2, 
  Factory, 
  HardHat,
  MessageSquare
} from 'lucide-react';

export default function InquiryPortal() {
  const { lang, dict } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    sector: 'general',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-accent/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/15 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: HQ Contact Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-slate text-brand-accentLight mb-4 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
              <span>{dict.contact.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {dict.contact.title}
            </h2>

            <p className="text-base text-zinc-300 mb-10 leading-relaxed">
              {dict.contact.subtitle}
            </p>

            {/* HQ Details Card */}
            <div className="p-6 rounded-3xl bg-brand-surface/90 border border-brand-slate space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-brand-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {dict.contact.hq_title}
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {dict.footer.location_riyadh}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {dict.footer.location_jeddah}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-brand-slate pt-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-brand-accent flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Direct Email'}
                  </div>
                  <a href="mailto:info@wdgroup.sa" className="text-sm font-semibold text-white hover:text-brand-accent transition-colors mt-0.5 inline-block">
                    {dict.contact.hq_email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-brand-slate pt-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 text-brand-accent flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {lang === 'ar' ? 'ساعات العمل الرسمية' : 'Official Working Hours'}
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {dict.contact.hq_hours}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Multi-Department Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-surface border border-brand-slate shadow-2xl relative">
              
              {submitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {lang === 'ar' ? 'تم استلام استفساركم بنجاح' : 'Inquiry Submitted Successfully'}
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto mb-8">
                    {dict.contact.form_success}
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs hover:bg-brand-accentHover transition-all"
                  >
                    {lang === 'ar' ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Department / Sector Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      {dict.contact.form_sector}
                    </label>
                    <select 
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-brand-slate text-white text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                    >
                      <option value="general">{dict.contact.opt_general}</option>
                      <option value="hospitality">{dict.contact.opt_hosp}</option>
                      <option value="manufacturing">{dict.contact.opt_mfg}</option>
                      <option value="contracting">{dict.contact.opt_contr}</option>
                      <option value="investor">{dict.contact.opt_investor}</option>
                      <option value="careers">{dict.contact.opt_careers}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        {dict.contact.form_name}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-brand-slate text-white text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        {dict.contact.form_email}
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-brand-slate text-white text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        {dict.contact.form_phone}
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+966 50 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-brand-slate text-white text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        {dict.contact.form_company}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Company / Institution"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-brand-slate text-white text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      {dict.contact.form_message}
                    </label>
                    <textarea 
                      rows={4}
                      required
                      placeholder={lang === 'ar' ? 'تفاصيل الطلب أو المشروع...' : 'Please describe your request, RFP scope, or project details...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-brand-slate text-white text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-sm text-white bg-brand-accent hover:bg-brand-accentHover transition-all shadow-lg hover:shadow-hover-sapphire flex items-center justify-center gap-2"
                  >
                    <span>{dict.contact.form_submit}</span>
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
