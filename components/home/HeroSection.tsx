'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass, 
  ChevronDown
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const SECTORS_LIST: ('hospitality' | 'manufacturing' | 'contracting')[] = ['hospitality', 'manufacturing', 'contracting'];

export default function HeroSection() {
  const { lang, dict } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<'hospitality' | 'manufacturing' | 'contracting'>('hospitality');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through sectors every 6 seconds unless manually interacted
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setSelectedSector((prev) => {
        const nextIdx = (SECTORS_LIST.indexOf(prev) + 1) % SECTORS_LIST.length;
        return SECTORS_LIST[nextIdx];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSelectSector = (sec: 'hospitality' | 'manufacturing' | 'contracting') => {
    setSelectedSector(sec);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-brand-dark">
      
      {/* 1. Pre-rendered GPU-Accelerated Dynamic Backdrops (Sub-16ms INP - Zero React Re-render Lag) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Hospitality Image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            selectedSector === 'hospitality' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85')` }}
        />
        {/* Manufacturing Image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            selectedSector === 'manufacturing' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=85')` }}
        />
        {/* Contracting Image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            selectedSector === 'contracting' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85')` }}
        />

        {/* Luxury Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        
        {/* Shimmer Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-white/20 text-zinc-300 backdrop-blur-xl mb-8 shadow-glow-card shimmer-badge">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="font-bold text-white">{dict.hero.badge}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 font-normal">
            {lang === 'ar' ? 'منظومة متكاملة للتصنيع والمقاولات والضيافة' : 'Integrated Manufacturing, Contracting & Hospitality'}
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-5xl mx-auto">
          <span className="block">{dict.hero.title_line1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 drop-shadow-sm">
            {dict.hero.title_line2}
          </span>
          <span className="block text-white">{dict.hero.title_line3}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {dict.hero.description}
        </p>

        {/* 2. Responsive Interactive Sector Dock */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl bg-black/85 border border-white/20 backdrop-blur-2xl mb-12 shadow-2xl max-w-full">
          {/* SwissBlue Button */}
          <button
            onClick={() => handleSelectSector('hospitality')}
            className={`relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedSector === 'hospitality'
                ? 'bg-[#1A476A] text-white shadow-glow-blue border border-sky-400/80 ring-1 ring-sky-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{dict.nav.hospitality} (SwissBlue)</span>
            <span className="text-[10px] bg-sky-500/25 px-2 py-0.5 rounded-full text-sky-200 font-mono">
              6 {lang === 'ar' ? 'فنادق' : 'Hotels'}
            </span>
          </button>

          {/* GreenWood Button */}
          <button
            onClick={() => handleSelectSector('manufacturing')}
            className={`relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedSector === 'manufacturing'
                ? 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/80 ring-1 ring-emerald-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Factory className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{dict.nav.manufacturing} (GreenWood)</span>
            <span className="text-[10px] bg-emerald-500/25 px-2 py-0.5 rounded-full text-emerald-200 font-mono">
              3 {lang === 'ar' ? 'مصانع' : 'Factories'}
            </span>
          </button>

          {/* Contracting Button */}
          <button
            onClick={() => handleSelectSector('contracting')}
            className={`relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedSector === 'contracting'
                ? 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/80 ring-1 ring-amber-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{dict.nav.contracting} (Projects)</span>
            <span className="text-[10px] bg-amber-500/25 px-2 py-0.5 rounded-full text-amber-200 font-mono">
              {lang === 'ar' ? 'تشطيب شامل' : 'Fit-out'}
            </span>
          </button>
        </div>

        {/* Dual Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link 
            href="#about" 
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:opacity-95 shadow-glow-blue transition-all transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>{dict.hero.cta_primary}</span>
          </Link>

          <Link 
            href="#contact" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs text-zinc-200 bg-brand-surface/90 hover:bg-brand-card border border-white/20 transition-all"
          >
            <span>{dict.nav.rfp_btn}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
          </Link>
        </div>

        {/* 3. Section 2: Animated 4-Column Statistics Bar (Fluid Responsive Grid - No Cutoffs) */}
        <div className="max-w-5xl mx-auto mb-10 w-full">
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-glow-card divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 relative overflow-hidden border border-white/15">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>

            {/* Metric 1: Hospitality */}
            <div className="flex flex-col items-center text-center px-3 pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sky-400 mb-1 font-mono">
                <AnimatedCounter value={dict.stats.stat1_num} />
              </div>
              <div className="text-xs font-medium text-zinc-300 leading-snug">
                {dict.stats.stat1_text}
              </div>
            </div>

            {/* Metric 2: Factories */}
            <div className="flex flex-col items-center text-center px-3 pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-400 mb-1 font-mono">
                <AnimatedCounter value={dict.stats.stat2_num} />
              </div>
              <div className="text-xs font-medium text-zinc-300 leading-snug">
                {dict.stats.stat2_text}
              </div>
            </div>

            {/* Metric 3: Employees */}
            <div className="flex flex-col items-center text-center px-3 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-amber-400 mb-1 font-mono">
                <AnimatedCounter value={dict.stats.stat3_num} />
              </div>
              <div className="text-xs font-medium text-zinc-300 leading-snug">
                {dict.stats.stat3_text}
              </div>
            </div>

            {/* Metric 4: Occupancy */}
            <div className="flex flex-col items-center text-center px-3 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-1 font-mono">
                <AnimatedCounter value={dict.stats.stat4_num} />
              </div>
              <div className="text-xs font-medium text-zinc-300 leading-snug">
                {dict.stats.stat4_text}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="inline-flex flex-col items-center gap-1 text-[11px] text-zinc-400 opacity-70 hover:opacity-100 transition-opacity">
          <span>{lang === 'ar' ? 'استكشف المنظومة القابضة' : 'Scroll to explore'}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
        </div>

      </div>
    </section>
  );
}
