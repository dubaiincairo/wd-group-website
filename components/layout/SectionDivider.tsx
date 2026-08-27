'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SectionDividerProps {
  label?: string;
  badge?: string;
  className?: string;
}

const LABEL_TRANSLATIONS: Record<string, string> = {
  'STRATEGIC SECTORS': 'القطاعات الاستراتيجية',
  'PORTFOLIO BRANDS': 'العلامات التجارية',
  'HOLDING SYNERGY': 'تكامل المنظومة القابضة',
  'VISION & VALUES': 'الرؤية والرسالة والقيم',
  'EXECUTIVE GOVERNANCE': 'الحوكمة والقيادة',
  'PARTNERSHIP & INQUIRIES': 'الشراكة والتواصل',
};

export default function SectionDivider({ label, badge, className = '' }: SectionDividerProps) {
  const { lang } = useLanguage();
  const displayLabel = lang === 'ar' && label && LABEL_TRANSLATIONS[label] ? LABEL_TRANSLATIONS[label] : label;

  return (
    <div className={`relative w-full py-6 sm:py-8 overflow-hidden bg-transparent select-none pointer-events-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative flex items-center justify-between">
          
          {/* Left Blueprint Crosshair */}
          <div className="text-zinc-500 font-mono text-[10px] hidden sm:block tracking-widest uppercase">
            {lang === 'ar' ? '+ مجموعة دبليو دي // السعودية' : '+ WD // KSA'}
          </div>

          {/* Central Hairline Rule with Monogram / Badge Pill */}
          <div className="flex-1 mx-4 sm:mx-8 relative flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A86A]/30 to-transparent"></div>
            
            {/* Center Monogram / Coordinate Pill */}
            <div className="absolute px-3.5 py-1 rounded-full bg-[#0F1117]/95 border border-[#C9A86A]/30 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#C9A86A] uppercase flex items-center gap-2 backdrop-blur-md shadow-glow-camel">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse"></span>
              <span>{badge || (lang === 'ar' ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP FOR BUSINESS')}</span>
              {displayLabel && (
                <>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-300 font-semibold">{displayLabel}</span>
                </>
              )}
            </div>
          </div>

          {/* Right Blueprint Crosshair */}
          <div className="text-zinc-500 font-mono text-[10px] hidden sm:block tracking-widest uppercase">
            {lang === 'ar' ? '+ رؤية المملكة 2030' : '+ VISION 2030'}
          </div>

        </div>

      </div>
    </div>
  );
}
