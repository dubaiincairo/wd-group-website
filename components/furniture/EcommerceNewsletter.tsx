'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, CheckCircle2, Box, ArrowRight } from 'lucide-react';

export default function EcommerceNewsletter() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const newsDict = (dict.furniture as any)?.newsletter || {
    eyebrow: isAr ? 'مزايا نادي الأتيليه' : 'ATELIER PRIVILEGES',
    heading: isAr ? 'استلم عينات المواد الطبيعية في موقعك' : 'Experience Our Materials in Your Space',
    subheading: isAr
      ? 'اطلب صندوق عينات المواد المجاني الذي يحتوي على عينات خشب الجوز، وحجر الترافرتين، وأقمشة البوكليه والجلود الإيطالية الطبيعية.'
      : 'Request our complimentary physical Material Swatch Box containing hand-finished walnut, travertine stone samples, and imported Italian fabric swatches.',
    name_placeholder: isAr ? 'الاسم الكريم' : 'Your Name',
    contact_placeholder: isAr ? 'رقم الجوال (+966) أو البريد الإلكتروني' : 'Mobile (+966) or Email',
    city_placeholder: isAr ? 'مدينة التوصيل (مثل: الرياض)' : 'Delivery City (e.g. Riyadh)',
    submit_btn: isAr ? 'طلب صندوق العينات المجاني' : 'Request Complimentary Swatch Box',
    submitting: isAr ? 'جارٍ إرسال الطلب...' : 'Submitting Request...',
    success_title: isAr ? 'تم استلام طلب صندوق العينات بنجاح!' : 'Swatch Box Request Received!',
    success_desc: isAr
      ? 'سيقوم فريق الاستشارات والتصميم بتجهيز عيناتك وشحنها مباشرة إلى باب منزلك أو مكتبك.'
      : 'Our design atelier team will prepare and courier your curated material samples directly to your doorstep.',
    note: isAr
      ? 'خدمة مجانية لأصحاب المنازل الفاخرة ومهندسي الديكور والمصممين في جميع أنحاء المملكة.'
      : 'Complimentary for homeowners, interior designers, and architects across Saudi Arabia.',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="newsletter" className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#11141E] via-[#161B27] to-[#11141E] border border-white/10 shadow-2xl overflow-hidden scroll-mt-24">
      
      {/* Subtle Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#C9A86A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
          <Box className="w-3.5 h-3.5" />
          <span>{newsDict.eyebrow}</span>
        </div>

        {/* Heading & Subheading */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {newsDict.heading}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {newsDict.subheading}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-lg mx-auto space-y-2 animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {newsDict.success_title}
            </h4>
            <p className="text-xs text-zinc-300">
              {newsDict.success_desc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={newsDict.name_placeholder}
                className="h-12 px-4 rounded-xl bg-[#08090C]/80 border border-white/15 text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
              />
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={newsDict.contact_placeholder}
                className="h-12 px-4 rounded-xl bg-[#08090C]/80 border border-white/15 text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={newsDict.city_placeholder}
                className="h-12 px-4 rounded-xl bg-[#08090C]/80 border border-white/15 text-white text-xs placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs sm:text-sm hover:shadow-[0_0_30px_rgba(201,168,106,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>{loading ? newsDict.submitting : newsDict.submit_btn}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-zinc-400 font-mono">
          {newsDict.note}
        </p>

      </div>

    </section>
  );
}
