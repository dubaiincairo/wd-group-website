'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, Sparkles, ShieldCheck } from 'lucide-react';

export default function CEOQuote() {
  const { dict } = useLanguage();

  return (
    <section className="py-24 bg-[#08090C] text-white relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden bg-brand-surface/90">
          
          {/* Blueprint Crosshairs */}
          <div className="absolute top-3 left-3 text-zinc-700 font-mono text-[10px] select-none">+</div>
          <div className="absolute top-3 right-3 text-zinc-700 font-mono text-[10px] select-none">+</div>
          <div className="absolute bottom-3 left-3 text-zinc-700 font-mono text-[10px] select-none">+</div>
          <div className="absolute bottom-3 right-3 text-zinc-700 font-mono text-[10px] select-none">+</div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* CEO Avatar / Monogram */}
            <div className="shrink-0 relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-blue-600/30 via-brand-surface to-brand-border p-1 shadow-glow-blue border border-blue-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-brand-surface flex flex-col items-center justify-center text-center p-3">
                  <span className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono">WD</span>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">LEADERSHIP</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-600 border-2 border-brand-surface flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Quote Body */}
            <div className="space-y-6 text-center md:text-left rtl:md:text-right">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20">
                <Quote className="w-3.5 h-3.5" />
                <span>{dict.home.ceo.label}</span>
              </div>

              <blockquote className="text-lg sm:text-xl md:text-2xl text-zinc-100 font-medium leading-relaxed">
                {dict.home.ceo.quote}
              </blockquote>

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-base font-bold text-white">
                    {dict.home.ceo.name}
                  </div>
                  <div className="text-xs text-blue-400 font-semibold mt-0.5">
                    {dict.home.ceo.title}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-zinc-500">
                  {lang === 'ar' ? 'مجموعة دبليو دي للأعمال' : 'WD Group for Business'}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
