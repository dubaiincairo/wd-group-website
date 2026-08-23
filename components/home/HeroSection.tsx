'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection() {
  const { lang, dict } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden bg-brand-dark">
      
      {/* 1. Ambient Breathing Aurora Mesh Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sapphire Glow (Top Center/Left) */}
        <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-blue-600/20 blur-[130px] animate-aurora"></div>
        {/* Emerald Glow (Right) */}
        <div className="absolute top-[20%] right-[10%] w-[480px] h-[480px] rounded-full bg-emerald-600/15 blur-[140px] animate-aurora-reverse"></div>
        {/* Sovereign Gold Glow (Bottom Center) */}
        <div className="absolute bottom-[5%] left-[35%] w-[500px] h-[350px] rounded-full bg-amber-600/10 blur-[120px] animate-aurora-slow"></div>
        {/* Tech Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Shimmer Announcement Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-brand-border text-brand-muted hover:border-brand-accent/50 hover:text-white transition-all cursor-pointer mb-8 shadow-glow-card shimmer-badge"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">{dict.hero.badge}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400 font-normal">
              {lang === 'ar' ? 'استكشف قطاعاتنا الاستراتيجية' : 'Explore our 3 sectors'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400 rtl:rotate-180" />
          </motion.div>

          {/* High-Impact Executive Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6"
          >
            <span className="block">{dict.hero.title_line1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 drop-shadow-sm">
              {dict.hero.title_line2}
            </span>
            <span className="block text-white">{dict.hero.title_line3}</span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            {dict.hero.description}
          </motion.p>

          {/* Dual Action CTA Buttons with Glow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <Link 
              href="#about" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-glow-blue hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-4 h-4" />
              <span>{dict.hero.cta_primary}</span>
            </Link>

            <Link 
              href="#sectors" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-zinc-200 bg-brand-surface/90 hover:bg-brand-card border border-brand-border hover:border-zinc-500 shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <span>{dict.hero.cta_secondary}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
            </Link>
          </motion.div>

        </div>

        {/* Section 2: Animated Statistics Bar with Glowing Glass Elevation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-glow-card divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 relative overflow-hidden">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>

            {/* Metric 1: Hospitality */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-4 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-400 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat1_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-400 leading-snug">
                {dict.stats.stat1_text}
              </div>
            </div>

            {/* Metric 2: Factories */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat2_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-400 leading-snug">
                {dict.stats.stat2_text}
              </div>
            </div>

            {/* Metric 3: Employees */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat3_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-400 leading-snug">
                {dict.stats.stat3_text}
              </div>
            </div>

            {/* Metric 4: Occupancy */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat4_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-400 leading-snug">
                {dict.stats.stat4_text}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
