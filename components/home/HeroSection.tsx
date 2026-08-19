'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Award,
  Sparkles
} from 'lucide-react';

export default function HeroSection() {
  const { lang, dict } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-brand-dark text-white">
      
      {/* Background Subtle Tech-Grid & Radial Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-accent/20 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-cyan-600/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Executive Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface/90 border border-brand-slate text-brand-accentLight mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span>{dict.hero.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            {dict.hero.title_lead}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              {dict.hero.title_highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {dict.hero.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link 
              href="#sectors" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-accent hover:bg-brand-accentHover transition-all shadow-lg hover:shadow-hover-sapphire transform hover:-translate-y-0.5"
            >
              <span>{dict.hero.cta_primary}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <Link 
              href="#about" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-zinc-200 bg-brand-surface hover:bg-zinc-800 border border-brand-slate transition-all"
            >
              <span>{dict.hero.cta_secondary}</span>
            </Link>
          </div>

        </div>

        {/* 4-Stat Holding Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-brand-surface/90 border border-brand-slate/80 shadow-2xl backdrop-blur-lg">
          
          <div className="flex flex-col items-center text-center p-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">
              {dict.hero.stat_years}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 font-medium">
              {dict.hero.stat_years_label}
            </div>
          </div>

          <div className="flex flex-col items-center text-center p-2 border-l border-brand-slate/60 rtl:border-l-0 rtl:border-r">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono mb-1">
              {dict.hero.stat_sectors}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 font-medium">
              {dict.hero.stat_sectors_label}
            </div>
          </div>

          <div className="flex flex-col items-center text-center p-2 border-t lg:border-t-0 lg:border-l border-brand-slate/60 rtl:lg:border-l-0 rtl:lg:border-r">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">
              {dict.hero.stat_workforce}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 font-medium">
              {dict.hero.stat_workforce_label}
            </div>
          </div>

          <div className="flex flex-col items-center text-center p-2 border-t lg:border-t-0 border-l border-brand-slate/60 rtl:border-l-0 rtl:border-r">
            <div className="text-3xl sm:text-4xl font-extrabold text-sky-400 font-mono mb-1">
              {dict.hero.stat_projects}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 font-medium">
              {dict.hero.stat_projects_label}
            </div>
          </div>

        </div>

        {/* Quick Jump Sector Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-zinc-400 font-medium">
            {dict.hero.jump_to}
          </span>

          <Link 
            href="#hospitality" 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 hover:bg-zinc-700 text-sector-hospitality border border-sector-hospitality/30 transition-all hover:scale-105"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{dict.nav.hospitality}</span>
          </Link>

          <Link 
            href="#manufacturing" 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 hover:bg-zinc-700 text-sector-manufacturing border border-sector-manufacturing/30 transition-all hover:scale-105"
          >
            <Factory className="w-3.5 h-3.5" />
            <span>{dict.nav.manufacturing}</span>
          </Link>

          <Link 
            href="#contracting" 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/80 hover:bg-zinc-700 text-sector-contracting border border-sector-contracting/30 transition-all hover:scale-105"
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>{dict.nav.contracting}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
