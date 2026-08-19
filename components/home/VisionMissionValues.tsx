'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Eye, 
  Target, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-brand-dark border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-pearl border border-brand-border text-brand-accent mb-4 shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>{dict.vmv.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-5 leading-tight">
            {dict.vmv.title}
          </h2>
        </div>

        {/* 3 Pillars Grid (Vision, Mission, Values) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* VISION CARD */}
          <div className="card-hover rounded-3xl bg-brand-pearl border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-dark mb-4">
                {dict.vmv.vision_title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {dict.vmv.vision_desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-border/60 text-xs font-bold text-blue-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مواكبة لرؤية المملكة ٢٠٣٠' : 'Aligned with Saudi Vision 2030'}</span>
            </div>
          </div>

          {/* MISSION CARD */}
          <div className="card-hover rounded-3xl bg-brand-pearl border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-dark mb-4">
                {dict.vmv.mission_title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {dict.vmv.mission_desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-border/60 text-xs font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'كوادر وطنية وتقنيات متقدمة' : 'Qualified Talent & Advanced Tech'}</span>
            </div>
          </div>

          {/* VALUES CARD */}
          <div className="card-hover rounded-3xl bg-brand-pearl border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-dark mb-4">
                {dict.vmv.values_title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {dict.vmv.values_desc}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs font-bold text-amber-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'التزام بالجودة والشفافية' : 'Institutional Governance & Ethics'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
