'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SectionDividerProps {
  label?: string;
  badge?: string;
}

export default function SectionDivider({ label, badge }: SectionDividerProps) {
  const { lang } = useLanguage();

  return (
    <div className="relative w-full py-8 overflow-hidden bg-transparent select-none pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative flex items-center justify-between">
          
          {/* Left Blueprint Crosshair */}
          <div className="text-zinc-600 font-mono text-[10px] hidden sm:block">
            + 21.5433° N
          </div>

          {/* Central Hairline Rule with Monogram / Badge Pill */}
          <div className="flex-1 mx-4 sm:mx-8 relative flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            
            {/* Center Monogram / Coordinate Pill */}
            <div className="absolute px-3 py-1 rounded-full bg-brand-surface/90 border border-white/10 text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-2 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse"></span>
              <span>{badge || (lang === 'ar' ? 'مجموعة دبليو دي القابضة' : 'WD GROUP HOLDING')}</span>
              {label && (
                <>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400">{label}</span>
                </>
              )}
            </div>
          </div>

          {/* Right Blueprint Crosshair */}
          <div className="text-zinc-600 font-mono text-[10px] hidden sm:block">
            + 39.1728° E
          </div>

        </div>

      </div>
    </div>
  );
}
