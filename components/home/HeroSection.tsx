'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass,
  Layers,
  Users,
  Percent,
  Sparkles
} from 'lucide-react';

export default function HeroSection() {
  const { lang, dict } = useLanguage();

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-brand-dark text-white">
      
      {/* Background Subtle Tech-Grid & Radial Lighting */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-accent/20 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Executive Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface/90 border border-brand-slate text-brand-accentLight mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span>{dict.hero.badge}</span>
          </div>

          {/* Approved Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-white">
            <span className="block">{dict.hero.title_line1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200">
              {dict.hero.title_line2}
            </span>
            <span className="block text-zinc-100">{dict.hero.title_line3}</span>
          </h1>

          {/* Approved Description */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {dict.hero.description}
          </p>

          {/* Approved CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link 
              href="#about" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-accent hover:bg-brand-accentHover transition-all shadow-lg hover:shadow-hover-sapphire transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>{dict.hero.cta_primary}</span>
            </Link>

            <Link 
              href="#sectors" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-zinc-200 bg-brand-surface hover:bg-zinc-800 border border-brand-slate transition-all"
            >
              <span>{dict.hero.cta_secondary}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

        </div>

        {/* Section 2: Approved Statistics Bar */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-brand-surface/90 border border-brand-slate shadow-2xl backdrop-blur-lg">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center p-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#38bdf8] font-mono mb-2">
                {dict.stats.stat1_num}
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                {dict.stats.stat1_text}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center p-3 border-t sm:border-t-0 sm:border-l border-brand-slate/60 rtl:sm:border-l-0 rtl:sm:border-r">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#34d399] font-mono mb-2">
                {dict.stats.stat2_num}
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                {dict.stats.stat2_text}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center p-3 border-t lg:border-t-0 lg:border-l border-brand-slate/60 rtl:lg:border-l-0 rtl:lg:border-r">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fbbf24] font-mono mb-2">
                {dict.stats.stat3_num}
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                {dict.stats.stat3_text}
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center p-3 border-t lg:border-t-0 sm:border-l border-brand-slate/60 rtl:sm:border-l-0 rtl:sm:border-r">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono mb-2">
                {dict.stats.stat4_num}
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                {dict.stats.stat4_text}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
