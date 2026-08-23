'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  X, 
  Mail, 
  Phone,
  ArrowRight
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
    <section id="contact" className="py-24 sm:py-32 bg-brand-dark text-white border-t border-brand-border relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 mb-6 shadow-glow-card"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{dict.contact_cta.tag}</span>
        </motion.div>

        {/* Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight"
        >
          {dict.contact_cta.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {dict.contact_cta.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => { setModalOpen(true); setSubmitted(false); }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>{dict.contact_cta.button}</span>
          </button>

          <a
            href="mailto:info@wdgroup.com.sa"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-zinc-300 bg-brand-surface/90 hover:bg-brand-card border border-brand-border hover:border-zinc-500 transition-all"
          >
            <span>info@wdgroup.com.sa</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
          </a>
        </motion.div>

        {/* Contact Info Pills */}
        <div className="mt-14 pt-8 border-t border-brand-border/60 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
          <a href="mailto:info@wdgroup.sa" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            <span>info@wdgroup.sa</span>
          </a>
          <span className="text-zinc-600">•</span>
          <a href="tel:+966123456789" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors font-mono">
            <Phone className="w-3.5 h-3.5 text-zinc-500" />
            <span>+966 12 345 6789</span>
          </a>
        </div>

      </div>

      {/* Interactive Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-brand-surface text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-brand-slate shadow-2xl relative">
            
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-xl bg-brand-card hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
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
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-card border border-brand-slate text-white text-xs focus:outline-none focus:border-blue-500"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-card border border-brand-slate text-white text-xs focus:outline-none focus:border-blue-500"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-card border border-brand-slate text-white text-xs focus:outline-none focus:border-blue-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-card border border-brand-slate text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                      {dict.contact_cta.form_message}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={lang === 'ar' ? 'اكتب تفاصيل طلبكم...' : 'Type your inquiry here...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-card border border-brand-slate text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-glow-blue"
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
