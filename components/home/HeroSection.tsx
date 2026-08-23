'use client';

import React, { useState } from 'react';
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
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const SECTOR_PHOTOS = {
  hospitality: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85', // Luxury Hotel Suite / SwissBlue
  manufacturing: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=85', // Master Woodcraft & Furniture / GreenWood
  contracting: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', // Turnkey Architectural Interior Fit-out
};

export default function HeroSection() {
  const { lang, dict } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<'hospitality' | 'manufacturing' | 'contracting'>('hospitality');

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden bg-brand-dark">
      
      {/* 1. Full-Bleed Dynamic Atmospheric Photography Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img
          key={selectedSector}
          src={SECTOR_PHOTOS[selectedSector]}
          alt="WD Group Sector Horizon"
          initial={{ scale: 1.08, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover"
        />
        {/* Dark Luxury Vignette & Radial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        
        {/* Shimmer Announcement Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-white/20 text-zinc-300 backdrop-blur-xl mb-8 shadow-glow-card shimmer-badge"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="font-bold text-white">{dict.hero.badge}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 font-normal">
            {lang === 'ar' ? 'منظومة متكاملة للتصنيع والمقاولات والضيافة' : 'Integrated Manufacturing, Contracting & Hospitality'}
          </span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-5xl mx-auto"
        >
          <span className="block">{dict.hero.title_line1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 drop-shadow-sm">
            {dict.hero.title_line2}
          </span>
          <span className="block text-white">{dict.hero.title_line3}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {dict.hero.description}
        </motion.p>

        {/* 2. Floating Interactive Sector Dock */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-2xl mb-12 shadow-2xl"
        >
          {/* SwissBlue Button */}
          <button
            onClick={() => setSelectedSector('hospitality')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'hospitality'
                ? 'bg-[#1A476A] text-white shadow-glow-blue border border-sky-400/60 scale-105'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>{dict.nav.hospitality} (SwissBlue)</span>
            <span className="text-[10px] bg-sky-500/20 px-2 py-0.5 rounded-full text-sky-300 font-mono">
              6 {lang === 'ar' ? 'فنادق' : 'Hotels'}
            </span>
          </button>

          {/* GreenWood Button */}
          <button
            onClick={() => setSelectedSector('manufacturing')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'manufacturing'
                ? 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/60 scale-105'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Factory className="w-4 h-4 text-emerald-400" />
            <span>{dict.nav.manufacturing} (GreenWood)</span>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-300 font-mono">
              3 {lang === 'ar' ? 'مصانع' : 'Factories'}
            </span>
          </button>

          {/* Contracting Button */}
          <button
            onClick={() => setSelectedSector('contracting')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              selectedSector === 'contracting'
                ? 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/60 scale-105'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <HardHat className="w-4 h-4 text-amber-400" />
            <span>{dict.nav.contracting} (Projects)</span>
            <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full text-amber-300 font-mono">
              {lang === 'ar' ? 'تشطيب شامل' : 'Fit-out'}
            </span>
          </button>
        </motion.div>

        {/* Dual Action CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link 
            href="#about" 
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:opacity-95 shadow-glow-blue transition-all transform hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            <span>{dict.hero.cta_primary}</span>
          </Link>

          <Link 
            href="#contact" 
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs text-zinc-200 bg-brand-surface/90 hover:bg-brand-card border border-white/20 transition-all"
          >
            <span>{dict.nav.rfp_btn}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
          </Link>
        </motion.div>

        {/* 3. Section 2: Animated Statistics Bar with Glowing Glass Elevation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-glow-card divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 relative overflow-hidden border border-white/15">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>

            {/* Metric 1: Hospitality */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-4 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-sky-400 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat1_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.stats.stat1_text}
              </div>
            </div>

            {/* Metric 2: Factories */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat2_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.stats.stat2_text}
              </div>
            </div>

            {/* Metric 3: Employees */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat3_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.stats.stat3_text}
              </div>
            </div>

            {/* Metric 4: Occupancy */}
            <div className="flex flex-col items-center text-center sm:px-6 pt-6 sm:pt-0 relative group">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mb-2 drop-shadow-sm font-mono group-hover:scale-105 transition-transform">
                <AnimatedCounter value={dict.stats.stat4_num} />
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-300 leading-snug">
                {dict.stats.stat4_text}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
