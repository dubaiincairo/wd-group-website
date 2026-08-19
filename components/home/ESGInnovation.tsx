'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Leaf, 
  Users, 
  ShieldAlert, 
  CheckCircle,
  Globe2,
  Cpu
} from 'lucide-react';

export default function ESGInnovation() {
  const { lang, dict } = useLanguage();

  return (
    <section id="governance" className="py-20 sm:py-28 bg-white text-brand-dark border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 border border-emerald-200 text-emerald-800 mb-4 shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>{dict.esg.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-5 leading-tight">
            {dict.esg.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            {dict.esg.subtitle}
          </p>
        </div>

        {/* 3 ESG Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-brand-pearl border border-brand-border/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                {dict.esg.item1_title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {dict.esg.item1_desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-border/60 text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{lang === 'ar' ? 'أولوية استراتيجية وطنية' : 'Strategic National Priority'}</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-brand-pearl border border-brand-border/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                {dict.esg.item2_title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {dict.esg.item2_desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-border/60 text-xs font-bold text-sky-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{lang === 'ar' ? 'معايير الاستدامة المتقدمة' : 'Advanced Green Standards'}</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-brand-pearl border border-brand-border/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                {dict.esg.item3_title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {dict.esg.item3_desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-border/60 text-xs font-bold text-amber-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{lang === 'ar' ? 'سجل سلامة خالٍ من الإصابات' : 'Zero-LTI Safety Record'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
