'use client';

import React, { useState } from 'react';
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
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Untitled UI Card CTA Block */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-xs">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 border border-brand-200 text-brand-700 mb-6 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{dict.contact_cta.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            {dict.contact_cta.title}
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {dict.contact_cta.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => { setModalOpen(true); setSubmitted(false); }}
              className="u-btn-primary !px-6 !py-3 !text-base"
            >
              <Mail className="w-4 h-4" />
              <span>{dict.contact_cta.button}</span>
            </button>

            <a
              href="mailto:info@wdgroup.com.sa"
              className="u-btn-secondary !px-6 !py-3 !text-base"
            >
              <span>info@wdgroup.com.sa</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>

          {/* Contact Direct Details */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span className="font-mono">+966 12 345 6789</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>info@wdgroup.sa</span>
            </span>
          </div>

        </div>

      </div>

      {/* Untitled UI Clean Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 shadow-xl relative">
            
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {lang === 'ar' ? 'تم استلام استفساركم بنجاح' : 'Inquiry Submitted'}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {dict.contact_cta.form_success}
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="u-btn-secondary !px-5 !py-2"
                >
                  {dict.contact_cta.close}
                </button>
              </div>
            ) : (
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 flex items-center justify-center mb-4 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {dict.contact_cta.form_title}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {dict.contact_cta.subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-start">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {dict.contact_cta.form_sector}
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm shadow-xs focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 transition-all"
                    >
                      <option value="hospitality">{dict.contact_cta.opt_hosp}</option>
                      <option value="manufacturing">{dict.contact_cta.opt_mfg}</option>
                      <option value="contracting">{dict.contact_cta.opt_contr}</option>
                      <option value="careers">{dict.contact_cta.opt_careers}</option>
                      <option value="general">{dict.contact_cta.opt_general}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {dict.contact_cta.form_name}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm shadow-xs focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {dict.contact_cta.form_email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm shadow-xs focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {dict.contact_cta.form_phone}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+966 50 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm shadow-xs focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {dict.contact_cta.form_message}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={lang === 'ar' ? 'اكتب تفاصيل طلبكم...' : 'Please write your message or project details...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-900 text-sm shadow-xs focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-300 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="u-btn-primary w-full !py-3"
                  >
                    <span>{dict.contact_cta.form_submit}</span>
                    <Send className="w-4 h-4 rtl:rotate-180" />
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
