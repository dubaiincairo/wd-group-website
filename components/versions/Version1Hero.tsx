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
  Sparkles
} from 'lucide-react';
import AnimatedCounter from '@/components/home/AnimatedCounter';

export default function Version1Hero() {
  const { lang, dict } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden bg-[#08090C]">
      
      {/* 1. Ambient Breathing Aurora Mesh Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-blue-600/20 blur-[130px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[480px] h-[480px] rounded-full bg-emerald-600/15 blur-[140px]"></div>
        <div className="absolute bottom-[5%] left-[35%] w-[500px] h-[350px] rounded-full bg-amber-600/10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Shimmer Announcement Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-white/10 text-zinc-300 mb-8 shadow-glow-card backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">{dict.home.hero.eyebrow}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 font-normal">
              {dict.home.hero.kicker}
            </span>
          </div>

          {/* High-Impact Executive Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 max-w-4xl mx-auto drop-shadow-xl">
            <span className="block">{dict.home.hero.title_line1 || 'Solid Vision.'}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 rtl:bg-gradient-to-l drop-shadow-sm py-0.5">
              {dict.home.hero.title_line2 || 'Diverse Sectors.'}
            </span>
            <span className="block text-white">{dict.home.hero.title_line3 || 'Promising Future.'}</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {dict.home.hero.body}
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>{dict.home.hero.primaryCta}</span>
            </Link>

            <a 
              href="#sectors" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-zinc-200 bg-brand-surface/90 hover:bg-brand-surface border border-white/10 transition-all transform hover:-translate-y-0.5"
            >
              <span>{dict.home.hero.secondaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
            </a>
          </div>

        </div>

        {/* Section 2: Animated Statistics Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-glow-card divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 relative overflow-hidden border border-white/15 bg-brand-surface/80">
            
            <div className="flex flex-col items-center text-center sm:px-6 pt-4 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-400 mb-2 font-mono">
                <AnimatedCounter target={6} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.home.metrics.stat1_text}
              </div>
            </div>

            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 mb-2 font-mono">
                <AnimatedCounter target={3} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.home.metrics.stat2_text}
              </div>
            </div>

            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400 mb-2 font-mono">
                <AnimatedCounter target={80} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.home.metrics.stat3_text}
              </div>
            </div>

            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mb-2 font-mono">
                <AnimatedCounter target={3} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.home.metrics.stat4_text}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
