'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Eye, 
  Target, 
  Award, 
  Sparkles, 
  Check, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Untitled UI Section Header) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 border border-brand-200 text-brand-700 mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>{dict.vmv.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            {dict.vmv.title}
          </h2>
        </div>

        {/* 3 Pillars Grid (Untitled UI 3-Column Card Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* VISION CARD */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-600 border border-blue-200 flex items-center justify-center mb-6 shadow-xs">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {dict.vmv.vision_title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {dict.vmv.vision_desc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-brand-700">
              <Check className="w-4 h-4 text-brand-600" />
              <span>{lang === 'ar' ? 'مواكبة لرؤية المملكة ٢٠٣٠' : 'Aligned with Saudi Vision 2030'}</span>
            </div>
          </div>

          {/* MISSION CARD */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mb-6 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {dict.vmv.mission_title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {dict.vmv.mission_desc}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ar' ? 'كوادر وطنية وتقنيات متقدمة' : 'Qualified Talent & Advanced Tech'}</span>
            </div>
          </div>

          {/* VALUES CARD */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col justify-between shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mb-6 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {dict.vmv.values_title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {dict.vmv.values_desc}
              </p>
            </div>
            <div className="mt-4 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>{lang === 'ar' ? 'التزام بالجودة والشفافية' : 'Institutional Governance & Ethics'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
