'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Eye, 
  Check, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Globe,
  Sliders,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import AnimatedCounter from '@/components/home/AnimatedCounter';

export default function HeroStudioPage() {
  const { lang, toggleLanguage, dict } = useLanguage();
  const [activeOption, setActiveOption] = useState<'option1' | 'option2' | 'option3'>('option1');
  const [activePortalTab, setActivePortalTab] = useState<'hospitality' | 'manufacturing' | 'contracting'>('hospitality');

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ─── STUDIO CONTROL BAR (Sticky Top) ─── */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Studio Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                WD
              </div>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
                  HERO SECTION STUDIO
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-zinc-300 font-mono">
                  3 OPTIONS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">
                {lang === 'ar' ? 'قارن بين ٣ تصاميم مختلفة لقسم البداية واعتمد الأنسب' : 'Compare 3 distinct hero designs & choose the best'}
              </p>
            </div>
          </div>

          {/* Option Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-surface border border-white/10">
            <button
              onClick={() => setActiveOption('option1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeOption === 'option1'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>1. {lang === 'ar' ? 'الهيكلي المقسم' : 'Architectural Split'}</span>
            </button>

            <button
              onClick={() => setActiveOption('option2')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeOption === 'option2'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>2. {lang === 'ar' ? 'الأفق السينمائي' : 'Cinematic Horizon'}</span>
            </button>

            <button
              onClick={() => setActiveOption('option3')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeOption === 'option3'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>3. {lang === 'ar' ? 'بوابة القطاعات' : 'Interactive Tri-Portal'}</span>
            </button>
          </div>

          {/* Right Action: Language Toggle & Back to Live Site */}
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
              {lang === 'ar' ? 'الموقع الرئيسي' : 'Main Website'}
            </Link>
          </div>

        </div>
      </div>

      {/* ─── HERO STUDIO CANVAS (Renders Selected Option) ─── */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          
          {/* ══════════════════════════════════════════════════════════════════
              OPTION 1: THE ARCHITECTURAL SPLIT & FLOATING SECTOR STACK
              (Asymmetric, Sovereign Investment Holding Aesthetic)
             ══════════════════════════════════════════════════════════════════ */}
          {activeOption === 'option1' && (
            <motion.div
              key="option1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[90vh] flex items-center py-16 sm:py-24 overflow-hidden bg-brand-dark"
            >
              {/* Background Aurora Mesh */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[140px] animate-aurora"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-emerald-600/10 blur-[140px] animate-aurora-reverse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                
                {/* Concept Banner */}
                <div className="mb-10 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <span>CONCEPT 01 // ARCHITECTURAL SPLIT & FLOATING SECTOR STACK</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  
                  {/* Left Column (7 Cols): Typography & CTAs */}
                  <div className="lg:col-span-7">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-white/10 text-zinc-300 mb-6 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span>{dict.hero.badge}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400 font-normal">{lang === 'ar' ? 'القيمة · الرؤية · المستقبل' : 'Value · Vision · Future'}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
                      <span className="block">{dict.hero.title_line1}</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                        {dict.hero.title_line2}
                      </span>
                      <span className="block text-white">{dict.hero.title_line3}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-brand-muted max-w-xl mb-8 leading-relaxed font-normal">
                      {dict.hero.description}
                    </p>

                    {/* Dual Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3.5 mb-12">
                      <Link 
                        href="#about" 
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
                      >
                        <Compass className="w-4 h-4" />
                        <span>{dict.hero.cta_primary}</span>
                      </Link>

                      <Link 
                        href="#sectors" 
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-zinc-300 bg-brand-surface hover:bg-brand-card border border-white/10 transition-all"
                      >
                        <span>{dict.hero.cta_secondary}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
                      </Link>
                    </div>

                    {/* Integrated 4-Stat Ticker Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-blue-400">
                          <AnimatedCounter value={dict.stats.stat1_num} />
                        </div>
                        <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{dict.stats.stat1_text}</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400">
                          <AnimatedCounter value={dict.stats.stat2_num} />
                        </div>
                        <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{dict.stats.stat2_text}</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">
                          <AnimatedCounter value={dict.stats.stat3_num} />
                        </div>
                        <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{dict.stats.stat3_text}</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-mono font-extrabold text-zinc-200">
                          <AnimatedCounter value={dict.stats.stat4_num} />
                        </div>
                        <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{dict.stats.stat4_text}</div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column (5 Cols): Floating Glass Sector Stack */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    {/* Stack Card 1: Hospitality (SwissBlue) */}
                    <div className="glass-card rounded-2xl p-5 border border-white/10 hover:border-sky-500/50 hover:shadow-glow-blue transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">{dict.sectors.hosp.subtitle}</div>
                            <h3 className="text-sm font-bold text-white">{dict.sectors.hosp.title}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                          {dict.sectors.hosp.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{dict.sectors.hosp.desc}</p>
                    </div>

                    {/* Stack Card 2: Manufacturing (GreenWood) */}
                    <div className="glass-card rounded-2xl p-5 border border-white/10 hover:border-emerald-500/50 hover:shadow-glow-emerald transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                            <Factory className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{dict.sectors.mfg.subtitle}</div>
                            <h3 className="text-sm font-bold text-white">{dict.sectors.mfg.title}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                          {dict.sectors.mfg.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{dict.sectors.mfg.desc}</p>
                    </div>

                    {/* Stack Card 3: Contracting (Engineering Excellence) */}
                    <div className="glass-card rounded-2xl p-5 border border-white/10 hover:border-amber-500/50 hover:shadow-glow-gold transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                            <HardHat className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{dict.sectors.contr.subtitle}</div>
                            <h3 className="text-sm font-bold text-white">{dict.sectors.contr.title}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                          {dict.sectors.contr.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{dict.sectors.contr.desc}</p>
                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              OPTION 2: THE CINEMATIC HORIZON & GRAND EDITORIAL
              (Grand Center Editorial, Curved Horizon Glow, Floating Glass Bar)
             ══════════════════════════════════════════════════════════════════ */}
          {activeOption === 'option2' && (
            <motion.div
              key="option2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-20 sm:py-28 overflow-hidden bg-brand-darker"
            >
              {/* Grand Curved Horizon Glow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-indigo-600/20 blur-[130px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-dark to-transparent"></div>
              </div>

              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative w-full">
                
                {/* Concept Banner */}
                <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <span>CONCEPT 02 // CINEMATIC HORIZON & GRAND EDITORIAL</span>
                </div>

                {/* Shimmer Announcement Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-white/15 text-zinc-300 hover:border-blue-500/50 mb-8 shadow-glow-card shimmer-badge cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-white font-bold">{dict.hero.badge}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-300 font-normal">{lang === 'ar' ? 'رؤية راسخة وفق أهداف ٢٠٣٠' : 'Solid Vision Aligned with 2030'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-blue-400" />
                </div>

                {/* Monumental Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
                  <span className="block">{dict.hero.title_line1}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    {dict.hero.title_line2}
                  </span>
                  <span className="block text-white">{dict.hero.title_line3}</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                  {dict.hero.description}
                </p>

                {/* Glowing Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                  <Link 
                    href="#about" 
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:opacity-95 shadow-glow-blue transition-all transform hover:-translate-y-0.5"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{dict.hero.cta_primary}</span>
                  </Link>

                  <Link 
                    href="#sectors" 
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs text-zinc-200 bg-brand-surface/80 hover:bg-brand-card border border-white/10 hover:border-zinc-500 transition-all"
                  >
                    <span>{dict.hero.cta_secondary}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
                  </Link>
                </div>

                {/* Floating 4-Column Metric Bar with Glowing Accents */}
                <div className="glass-card rounded-3xl p-8 shadow-glow-card divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0">
                  <div className="flex flex-col items-center text-center sm:px-4">
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-sky-400 mb-1 font-mono">
                      <AnimatedCounter value={dict.stats.stat1_num} />
                    </div>
                    <div className="text-xs font-medium text-zinc-400">{dict.stats.stat1_text}</div>
                  </div>

                  <div className="flex flex-col items-center text-center sm:px-4 pt-4 sm:pt-0">
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 mb-1 font-mono">
                      <AnimatedCounter value={dict.stats.stat2_num} />
                    </div>
                    <div className="text-xs font-medium text-zinc-400">{dict.stats.stat2_text}</div>
                  </div>

                  <div className="flex flex-col items-center text-center sm:px-4 pt-4 sm:pt-0">
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400 mb-1 font-mono">
                      <AnimatedCounter value={dict.stats.stat3_num} />
                    </div>
                    <div className="text-xs font-medium text-zinc-400">{dict.stats.stat3_text}</div>
                  </div>

                  <div className="flex flex-col items-center text-center sm:px-4 pt-4 sm:pt-0">
                    <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-200 mb-1 font-mono">
                      <AnimatedCounter value={dict.stats.stat4_num} />
                    </div>
                    <div className="text-xs font-medium text-zinc-400">{dict.stats.stat4_text}</div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              OPTION 3: THE INTERACTIVE TRI-PORTAL MATRIX
              (Dynamic Tabs in Hero, Shifts Ambient Mood & Live Asset Details)
             ══════════════════════════════════════════════════════════════════ */}
          {activeOption === 'option3' && (
            <motion.div
              key="option3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-20 sm:py-28 overflow-hidden bg-brand-dark"
            >
              {/* Dynamic Aura that changes color based on selected portal tab */}
              <div className="absolute inset-0 pointer-events-none transition-all duration-700">
                {activePortalTab === 'hospitality' && (
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-600/20 blur-[150px] rounded-full"></div>
                )}
                {activePortalTab === 'manufacturing' && (
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-600/20 blur-[150px] rounded-full"></div>
                )}
                {activePortalTab === 'contracting' && (
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-600/20 blur-[150px] rounded-full"></div>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]"></div>
              </div>

              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative w-full">
                
                {/* Concept Banner */}
                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <span>CONCEPT 03 // INTERACTIVE TRI-PORTAL MATRIX (TECH-HOLDING)</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl mx-auto">
                  <span>{dict.hero.title_line1} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    {dict.hero.title_line2}
                  </span>
                  <span> {dict.hero.title_line3}</span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
                  {dict.hero.description}
                </p>

                {/* 3 Interactive Portal Selector Tabs */}
                <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-brand-surface/90 border border-white/10 mb-8 shadow-2xl">
                  <button
                    onClick={() => setActivePortalTab('hospitality')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activePortalTab === 'hospitality'
                        ? 'bg-[#1A476A] text-white shadow-glow-blue border border-sky-400/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span>{dict.nav.hospitality} (SwissBlue)</span>
                  </button>

                  <button
                    onClick={() => setActivePortalTab('manufacturing')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activePortalTab === 'manufacturing'
                        ? 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Factory className="w-4 h-4 text-emerald-400" />
                    <span>{dict.nav.manufacturing} (GreenWood)</span>
                  </button>

                  <button
                    onClick={() => setActivePortalTab('contracting')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activePortalTab === 'contracting'
                        ? 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <HardHat className="w-4 h-4 text-amber-400" />
                    <span>{dict.nav.contracting} (Projects)</span>
                  </button>
                </div>

                {/* Active Portal Showcase Card */}
                <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto text-start border border-white/15 relative overflow-hidden shadow-2xl">
                  {activePortalTab === 'hospitality' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-sky-400 uppercase tracking-widest">{dict.sectors.hosp.subtitle}</div>
                            <h3 className="text-xl font-extrabold text-white">{dict.sectors.hosp.title}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 px-3 py-1 rounded-full">
                          {dict.sectors.hosp.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{dict.sectors.hosp.desc}</p>
                      
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                          <span>Jeddah · Riyadh · Jazan · Tunisia</span>
                        </div>
                        <a 
                          href="https://swissblue.sa" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
                        >
                          <span>{dict.sectors.hosp.link_text}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activePortalTab === 'manufacturing' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                            <Factory className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">{dict.sectors.mfg.subtitle}</div>
                            <h3 className="text-xl font-extrabold text-white">{dict.sectors.mfg.title}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full">
                          {dict.sectors.mfg.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{dict.sectors.mfg.desc}</p>
                      
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>Wood · Aluminum · Turnkey Interior Fitouts</span>
                        </div>
                        <Link 
                          href="#contact" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                        >
                          <span>{dict.sectors.mfg.link_text}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activePortalTab === 'contracting' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                            <HardHat className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">{dict.sectors.contr.subtitle}</div>
                            <h3 className="text-xl font-extrabold text-white">{dict.sectors.contr.title}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
                          {dict.sectors.contr.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{dict.sectors.contr.desc}</p>
                      
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span>Commercial · Residential Turnkey · Civil Engineering</span>
                        </div>
                        <Link 
                          href="#contact" 
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                        >
                          <span>{dict.sectors.contr.link_text}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
