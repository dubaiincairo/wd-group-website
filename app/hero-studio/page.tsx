'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Layers, 
  Globe, 
  ArrowUpRight
} from 'lucide-react';

// Curated high-resolution editorial photography for the 3 sectors
const SECTOR_PHOTOS = {
  hospitality: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85', // Luxury Hotel Suite / SwissBlue
  manufacturing: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=85', // Master Woodcraft & Furniture / GreenWood
  contracting: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85', // Turnkey Architectural Interior Fit-out
};

export default function HeroStudioPage() {
  const { lang, toggleLanguage, dict } = useLanguage();
  const [activeStyle, setActiveStyle] = useState<'split-showcase' | 'visual-curtain' | 'full-backdrop'>('split-showcase');
  const [selectedSector, setSelectedSector] = useState<'hospitality' | 'manufacturing' | 'contracting'>('hospitality');

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ─── STUDIO CONTROL BAR ─── */}
      <div className="sticky top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Studio Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-glow-blue">
                WD
              </div>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
                  VISUAL HERO STUDIO
                </span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded-full font-mono">
                  3 PHOTO STYLES
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">
                {lang === 'ar' 
                  ? '٣ نماذج بصرية تفاعلية مدعومة بالصور الفوتوغرافية الفاخرة للقطاعات' 
                  : '3 interactive visual styles with rich sector photography'}
              </p>
            </div>
          </div>

          {/* 3 Visual Style Switchers */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-surface border border-white/10">
            <button
              onClick={() => setActiveStyle('split-showcase')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStyle === 'split-showcase'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>1. {lang === 'ar' ? 'المعرض المقسم التفاعلي' : 'Split Visual Showcase'}</span>
            </button>

            <button
              onClick={() => setActiveStyle('visual-curtain')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStyle === 'visual-curtain'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>2. {lang === 'ar' ? 'الستار البصري الممتد' : '3-Pillar Photo Curtain'}</span>
            </button>

            <button
              onClick={() => setActiveStyle('full-backdrop')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStyle === 'full-backdrop'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>3. {lang === 'ar' ? 'الخلفية السينمائية الشاملة' : 'Full Cinematic Stage'}</span>
            </button>
          </div>

          {/* Language Toggle & Main Site Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-300 hover:text-white bg-white/5 border border-white/10 flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 transition-colors"
            >
              {lang === 'ar' ? 'الموقع الحالي' : 'Live Site'}
            </Link>
          </div>

        </div>
      </div>

      {/* ─── STUDIO CANVAS ─── */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          
          {/* ══════════════════════════════════════════════════════════════════
              STYLE 1: THE DYNAMIC SPLIT VISUAL SHOWCASE
              (Interactive Left Tabs + Grand Right Visual Frame with Transition)
             ══════════════════════════════════════════════════════════════════ */}
          {activeStyle === 'split-showcase' && (
            <motion.div
              key="split-showcase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex items-center py-16 sm:py-24 overflow-hidden bg-brand-dark"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[140px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column (6 Cols): Typography, Sector Switcher, and Stats */}
                  <div className="lg:col-span-6">
                    
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-white/10 text-zinc-300 mb-6 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-bold text-white">{dict.hero.badge}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400 font-normal">{lang === 'ar' ? 'مجموعة سعودية قابضة' : 'Diversified Holding Group'}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
                      <span className="block">{dict.hero.title_line1}</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                        {dict.hero.title_line2}
                      </span>
                      <span className="block text-white">{dict.hero.title_line3}</span>
                    </h1>

                    <p className="text-base text-zinc-300 mb-8 leading-relaxed font-normal">
                      {dict.hero.description}
                    </p>

                    {/* Interactive 3-Sector Switcher Tabs */}
                    <div className="space-y-3 mb-8">
                      
                      {/* Hospitality Tab */}
                      <button
                        onClick={() => setSelectedSector('hospitality')}
                        className={`w-full text-start p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                          selectedSector === 'hospitality'
                            ? 'bg-[#1A476A]/40 border-sky-400/80 shadow-glow-blue'
                            : 'bg-brand-surface/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                            selectedSector === 'hospitality' ? 'bg-sky-500 text-white' : 'bg-sky-500/10 text-sky-400'
                          }`}>
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{dict.sectors.hosp.title}</div>
                            <div className="text-[11px] text-sky-400 font-medium">{dict.sectors.hosp.subtitle} (SwissBlue)</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/20 px-2.5 py-1 rounded-full">
                          6 {lang === 'ar' ? 'فنادق' : 'Hotels'}
                        </span>
                      </button>

                      {/* Manufacturing Tab */}
                      <button
                        onClick={() => setSelectedSector('manufacturing')}
                        className={`w-full text-start p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                          selectedSector === 'manufacturing'
                            ? 'bg-[#0B5C3D]/40 border-emerald-400/80 shadow-glow-emerald'
                            : 'bg-brand-surface/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                            selectedSector === 'manufacturing' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            <Factory className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{dict.sectors.mfg.title}</div>
                            <div className="text-[11px] text-emerald-400 font-medium">{dict.sectors.mfg.subtitle} (GreenWood)</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full">
                          3 {lang === 'ar' ? 'مصانع' : 'Factories'}
                        </span>
                      </button>

                      {/* Contracting Tab */}
                      <button
                        onClick={() => setSelectedSector('contracting')}
                        className={`w-full text-start p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                          selectedSector === 'contracting'
                            ? 'bg-[#8A7340]/40 border-amber-400/80 shadow-glow-gold'
                            : 'bg-brand-surface/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                            selectedSector === 'contracting' ? 'bg-amber-500 text-white' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            <HardHat className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{dict.sectors.contr.title}</div>
                            <div className="text-[11px] text-amber-400 font-medium">{dict.sectors.contr.subtitle}</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full">
                          {lang === 'ar' ? 'تنفيذ شامل' : 'Turnkey Fit-out'}
                        </span>
                      </button>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5">
                      <Link 
                        href="#about" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
                      >
                        <Compass className="w-4 h-4" />
                        <span>{dict.hero.cta_primary}</span>
                      </Link>

                      <Link 
                        href="#contact" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-zinc-300 bg-brand-surface hover:bg-brand-card border border-white/10 transition-all"
                      >
                        <span>{dict.nav.rfp_btn}</span>
                        <ArrowUpRight className="w-4 h-4 rtl:rotate-270 text-zinc-400" />
                      </Link>
                    </div>

                  </div>

                  {/* Right Column (6 Cols): Dynamic High-Res Photo Showcase Frame */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                      
                      {/* Image Layer with Smooth Fade */}
                      <motion.img
                        key={selectedSector}
                        src={SECTOR_PHOTOS[selectedSector]}
                        alt={selectedSector}
                        initial={{ scale: 1.08, opacity: 0.7 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient Mask */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                      {/* Floating Info Overlay inside Image */}
                      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
                        {selectedSector === 'hospitality' && (
                          <div className="space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 backdrop-blur-md border border-sky-400/40">
                              <Building2 className="w-3.5 h-3.5" />
                              <span>SwissBlue Hospitality Portfolio</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                              {lang === 'ar' ? '٦ منشآت فندقية بالمملكة وتونس' : '6 Premium Hotel Properties in KSA & Tunisia'}
                            </h3>
                            <p className="text-xs text-zinc-300 line-clamp-2">
                              {dict.sectors.hosp.desc}
                            </p>
                          </div>
                        )}

                        {selectedSector === 'manufacturing' && (
                          <div className="space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 backdrop-blur-md border border-emerald-400/40">
                              <Factory className="w-3.5 h-3.5" />
                              <span>GreenWood Furniture & Manufacturing</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                              {lang === 'ar' ? '٣ مصانع متخصصة في الأخشاب والألومنيوم والديكور' : '3 Specialized Factories in Woodcraft & Architectural Metal'}
                            </h3>
                            <p className="text-xs text-zinc-300 line-clamp-2">
                              {dict.sectors.mfg.desc}
                            </p>
                          </div>
                        )}

                        {selectedSector === 'contracting' && (
                          <div className="space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 text-amber-200 backdrop-blur-md border border-amber-400/40">
                              <HardHat className="w-3.5 h-3.5" />
                              <span>Turnkey Fit-out Contracting</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                              {lang === 'ar' ? 'تنفيذ متكامل لمشروعات الديكور والأثاث والمقاولات' : 'Turnkey Interior Fit-out & Project Implementation'}
                            </h3>
                            <p className="text-xs text-zinc-300 line-clamp-2">
                              {dict.sectors.contr.desc}
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STYLE 2: THE 3-PILLAR PHOTO CURTAIN (EXPANDABLE ACCORDION)
              (3 Full-Bleed Tall Cards that expand on hover/click)
             ══════════════════════════════════════════════════════════════════ */}
          {activeStyle === 'visual-curtain' && (
            <motion.div
              key="visual-curtain"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-16 sm:py-24 overflow-hidden bg-brand-dark"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-brand-surface border border-white/10 text-blue-400 mb-4">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{dict.sectors.tag}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                    <span>{dict.hero.title_line1} </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                      {dict.hero.title_line2}
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
                    {lang === 'ar'
                      ? 'مرر الماوس فوق أي قطاع لاستعراض الصور والأرقام التشغيلية'
                      : 'Hover or tap each sector pillar to reveal its operational photography & metrics'}
                  </p>
                </div>

                {/* 3 Expandable Visual Pillar Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[460px] max-w-6xl mx-auto">
                  
                  {/* Pillar 1: Hospitality (SwissBlue) */}
                  <div 
                    className="relative rounded-3xl overflow-hidden border border-white/15 group cursor-pointer transition-all duration-500 hover:border-sky-400 shadow-glow-blue flex flex-col justify-end p-6 sm:p-8"
                  >
                    <Image
                      src={SECTOR_PHOTOS.hospitality} 
                      alt="SwissBlue Hospitality" 
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>

                    <div className="relative z-10 space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40 backdrop-blur-md">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>SwissBlue</span>
                      </span>
                      <h3 className="text-2xl font-extrabold text-white">{dict.sectors.hosp.title}</h3>
                      <p className="text-xs text-zinc-300 line-clamp-2">{dict.sectors.hosp.desc}</p>
                      <div className="text-xs font-mono font-bold text-sky-300 pt-2 flex items-center justify-between">
                        <span>6 {lang === 'ar' ? 'فنادق بالمملكة وتونس' : 'Hotels in KSA & Tunisia'}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Manufacturing (GreenWood) */}
                  <div 
                    className="relative rounded-3xl overflow-hidden border border-white/15 group cursor-pointer transition-all duration-500 hover:border-emerald-400 shadow-glow-emerald flex flex-col justify-end p-6 sm:p-8"
                  >
                    <Image
                      src={SECTOR_PHOTOS.manufacturing} 
                      alt="GreenWood Manufacturing" 
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>

                    <div className="relative z-10 space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 backdrop-blur-md">
                        <Factory className="w-3.5 h-3.5" />
                        <span>GreenWood</span>
                      </span>
                      <h3 className="text-2xl font-extrabold text-white">{dict.sectors.mfg.title}</h3>
                      <p className="text-xs text-zinc-300 line-clamp-2">{dict.sectors.mfg.desc}</p>
                      <div className="text-xs font-mono font-bold text-emerald-300 pt-2 flex items-center justify-between">
                        <span>3 {lang === 'ar' ? 'مصانع أخشاب وألومنيوم' : 'Specialized Factories'}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Contracting & Fit-out */}
                  <div 
                    className="relative rounded-3xl overflow-hidden border border-white/15 group cursor-pointer transition-all duration-500 hover:border-amber-400 shadow-glow-gold flex flex-col justify-end p-6 sm:p-8"
                  >
                    <Image
                      src={SECTOR_PHOTOS.contracting} 
                      alt="Turnkey Fit-out Contracting" 
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>

                    <div className="relative z-10 space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 text-amber-200 border border-amber-400/40 backdrop-blur-md">
                        <HardHat className="w-3.5 h-3.5" />
                        <span>Contracting & Fit-out</span>
                      </span>
                      <h3 className="text-2xl font-extrabold text-white">{dict.sectors.contr.title}</h3>
                      <p className="text-xs text-zinc-300 line-clamp-2">{dict.sectors.contr.desc}</p>
                      <div className="text-xs font-mono font-bold text-amber-300 pt-2 flex items-center justify-between">
                        <span>{lang === 'ar' ? 'تنفيذ ديكورات وتشطيب شامل' : 'Turnkey Implementation'}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STYLE 3: THE FULL CINEMATIC STAGE & FLOATING GLASS DOCK
              (Full-bleed background photography dynamically reacts to sector dock)
             ══════════════════════════════════════════════════════════════════ */}
          {activeStyle === 'full-backdrop' && (
            <motion.div
              key="full-backdrop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-20 sm:py-28 overflow-hidden"
            >
              {/* Full-Bleed Dynamic Background Photography */}
              <div className="absolute inset-0 z-0">
                <motion.img
                  key={selectedSector}
                  src={SECTOR_PHOTOS[selectedSector]}
                  alt="Sector Background"
                  initial={{ scale: 1.06, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                />
                {/* Heavy Dark Luxury Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/95"></div>
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black"></div>
              </div>

              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-white/20 text-zinc-300 backdrop-blur-xl mb-6 shadow-glow-card">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span className="font-bold text-white">{dict.hero.badge}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-300 font-normal">
                    {lang === 'ar' ? 'منظومة متكاملة للتصنيع والمقاولات والضيافة' : 'Integrated Manufacturing, Contracting & Hospitality'}
                  </span>
                </div>

                {/* Monumental Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
                  <span>{dict.hero.title_line1} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    {dict.hero.title_line2}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                  {dict.hero.description}
                </p>

                {/* Floating Interactive Sector Dock */}
                <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-2xl mb-12 shadow-2xl">
                  <button
                    onClick={() => setSelectedSector('hospitality')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                      selectedSector === 'hospitality'
                        ? 'bg-[#1A476A] text-white shadow-glow-blue border border-sky-400/60'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span>{dict.nav.hospitality} (SwissBlue)</span>
                  </button>

                  <button
                    onClick={() => setSelectedSector('manufacturing')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                      selectedSector === 'manufacturing'
                        ? 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/60'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Factory className="w-4 h-4 text-emerald-400" />
                    <span>{dict.nav.manufacturing} (GreenWood)</span>
                  </button>

                  <button
                    onClick={() => setSelectedSector('contracting')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                      selectedSector === 'contracting'
                        ? 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/60'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <HardHat className="w-4 h-4 text-amber-400" />
                    <span>{dict.nav.contracting} (Fit-out)</span>
                  </button>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link 
                    href="#about" 
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{dict.hero.cta_primary}</span>
                  </Link>

                  <Link 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs text-zinc-200 bg-brand-surface/90 hover:bg-brand-card border border-white/20 transition-all"
                  >
                    <span>{dict.nav.rfp_btn}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
