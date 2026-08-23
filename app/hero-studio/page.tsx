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
  Check, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Globe,
  Sliders,
  ShieldCheck,
  ArrowUpRight,
  Workflow,
  Cpu,
  Boxes,
  Hammer,
  BedDouble
} from 'lucide-react';
import AnimatedCounter from '@/components/home/AnimatedCounter';

export default function HeroStudioPage() {
  const { lang, toggleLanguage, dict } = useLanguage();
  const [activeConcept, setActiveConcept] = useState<'ecosystem' | 'portfolio' | 'turnkey'>('ecosystem');
  const [activeChainStep, setActiveChainStep] = useState<number>(0);

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
                  HOLDING ECOSYSTEM STUDIO
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full font-mono">
                  3 NEW CONCEPTS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">
                {lang === 'ar' 
                  ? 'تصاميم تعكس التكامل بين: تصنيع الأثاث ← مقاولات وتنفيذ الديكور ← تشغيل الفنادق' 
                  : 'Holding synergy: Furniture Manufacturing → Fit-out Contracting → Hospitality Operations'}
              </p>
            </div>
          </div>

          {/* 3 Concept Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-surface border border-white/10">
            <button
              onClick={() => setActiveConcept('ecosystem')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeConcept === 'ecosystem'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>A. {lang === 'ar' ? 'سلسلة القيمة المتكاملة' : 'Integrated Value-Chain'}</span>
            </button>

            <button
              onClick={() => setActiveConcept('portfolio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeConcept === 'portfolio'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>B. {lang === 'ar' ? 'أعمدة المحفظة القابضة' : 'Holding Portfolio Grid'}</span>
            </button>

            <button
              onClick={() => setActiveConcept('turnkey')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeConcept === 'turnkey'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>C. {lang === 'ar' ? 'مخطط التنفيذ الشامل' : 'Turnkey Masterplan'}</span>
            </button>
          </div>

          {/* Right Action: Language Toggle & Back to Main */}
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
              {lang === 'ar' ? 'الموقع الحالي' : 'Live Website'}
            </Link>
          </div>

        </div>
      </div>

      {/* ─── STUDIO CANVAS ─── */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          
          {/* ══════════════════════════════════════════════════════════════════
              CONCEPT A: THE INTEGRATED VALUE-CHAIN ECOSYSTEM
              (Highlighting Manufacturing -> Fit-out Contracting -> Hospitality)
             ══════════════════════════════════════════════════════════════════ */}
          {activeConcept === 'ecosystem' && (
            <motion.div
              key="ecosystem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-16 sm:py-24 overflow-hidden bg-brand-dark"
            >
              {/* Multi-layered Ambient Glows */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-600/15 via-blue-600/20 to-amber-600/15 blur-[140px] rounded-full animate-aurora"></div>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                
                {/* Holding Badge */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface border border-white/10 text-zinc-300 shadow-glow-card shimmer-badge">
                    <Workflow className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-bold text-white">{dict.hero.badge}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400 font-normal">
                      {lang === 'ar' ? 'منظومة قابضة متكاملة القيمة' : 'An End-to-End Integrated Value Chain'}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <div className="text-center max-w-4xl mx-auto mb-6">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
                    <span className="block">{dict.hero.title_line1}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-300 to-amber-300">
                      {dict.hero.title_line2}
                    </span>
                    <span className="block text-white">{dict.hero.title_line3}</span>
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
                    {lang === 'ar'
                      ? 'مجموعة سعودية قابضة تمتلك سلسلة القيمة الكاملة: تصنيع الأثاث الراقي، تنفيذ مشروعات الديكور والمقاولات، وتشغيل محفظة فندقية بمعايير دولية.'
                      : 'A diversified Saudi holding group controlling the entire lifecycle: high-volume furniture manufacturing, turnkey interior fit-outs & contracting, and premier hospitality operations.'}
                  </p>
                </div>

                {/* The 3-Stage Value Chain Interactive Cards */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
                  
                  {/* Step 1: Manufacturing (GreenWood) */}
                  <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-400 shadow-glow-emerald transition-all relative group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30 font-bold">
                        <Factory className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {lang === 'ar' ? 'المرحلة ٠١: التصنيع' : 'STAGE 01: MANUFACTURE'}
                      </span>
                    </div>
                    <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider mb-1">
                      {dict.sectors.mfg.subtitle} (GreenWood)
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{dict.sectors.mfg.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{dict.sectors.mfg.desc}</p>
                    <div className="text-xs font-mono text-emerald-300 font-bold flex items-center gap-1.5 pt-3 border-t border-white/10">
                      <Boxes className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? '٣ مصانع أخشاب وألومنيوم وديكور' : '3 Wood, Aluminum & Decor Factories'}</span>
                    </div>
                  </div>

                  {/* Step 2: Contracting & Fit-out (Engineering Excellence) */}
                  <div className="glass-card rounded-2xl p-6 border border-amber-500/30 hover:border-amber-400 shadow-glow-gold transition-all relative group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 font-bold">
                        <HardHat className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {lang === 'ar' ? 'المرحلة ٠٢: التنفيذ' : 'STAGE 02: FIT-OUT'}
                      </span>
                    </div>
                    <div className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-1">
                      {dict.sectors.contr.subtitle}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{dict.sectors.contr.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{dict.sectors.contr.desc}</p>
                    <div className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5 pt-3 border-t border-white/10">
                      <Hammer className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'مقاولات وتنفيذ الديكور الشامل' : 'Turnkey Fit-out & Project Execution'}</span>
                    </div>
                  </div>

                  {/* Step 3: Hospitality Operations (SwissBlue) */}
                  <div className="glass-card rounded-2xl p-6 border border-sky-500/30 hover:border-sky-400 shadow-glow-blue transition-all relative group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30 font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {lang === 'ar' ? 'المرحلة ٠٣: التشغيل' : 'STAGE 03: OPERATE'}
                      </span>
                    </div>
                    <div className="text-xs font-bold uppercase text-sky-400 tracking-wider mb-1">
                      {dict.sectors.hosp.subtitle} (SwissBlue)
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{dict.sectors.hosp.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{dict.sectors.hosp.desc}</p>
                    <div className="text-xs font-mono text-sky-300 font-bold flex items-center gap-1.5 pt-3 border-t border-white/10">
                      <BedDouble className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? '٦ منشآت فندقية بالمملكة وتونس' : '6 Hotel Properties in KSA & Tunisia'}</span>
                    </div>
                  </div>

                </div>

                {/* CTAs & Stats Strip */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link 
                    href="#about" 
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{dict.hero.cta_primary}</span>
                  </Link>

                  <Link 
                    href="#sectors" 
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs text-zinc-300 bg-brand-surface hover:bg-brand-card border border-white/10 transition-all"
                  >
                    <span>{dict.hero.cta_secondary}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-zinc-400" />
                  </Link>
                </div>

              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              CONCEPT B: THE SOVEREIGN PORTFOLIO GRID
              (Architectural Holding Monolith with Integrated Stats & Pillars)
             ══════════════════════════════════════════════════════════════════ */}
          {activeConcept === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-16 sm:py-24 overflow-hidden bg-brand-darker"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-emerald-600/10 blur-[130px] rounded-full"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
                  
                  {/* Left (7 Cols): Holding Vision & Figures */}
                  <div className="lg:col-span-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-6">
                      <span>HOLDING CAPITAL & SECTORS MATRIX</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
                      <span>{dict.hero.title_line1} </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                        {dict.hero.title_line2}
                      </span>
                      <span> {dict.hero.title_line3}</span>
                    </h1>

                    <p className="text-base text-zinc-300 max-w-xl mb-8 leading-relaxed">
                      {lang === 'ar'
                        ? 'مجموعة استثمارية رائدة تُوظّف طاقاتها عبر ٣ ركائز استراتيجية مترابطة لبناء وإدارة منشآت راقية تُلبي تطلعات السوق الوطني.'
                        : 'A premier holding group investing across 3 interlinked sectors to construct, furnish, and manage prestigious hospitality assets in Saudi Arabia.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <Link 
                        href="#about" 
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
                      >
                        <Compass className="w-4 h-4" />
                        <span>{dict.hero.cta_primary}</span>
                      </Link>

                      <Link 
                        href="#contact" 
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs text-zinc-300 bg-brand-surface hover:bg-brand-card border border-white/10 transition-all"
                      >
                        <span>{dict.nav.rfp_btn}</span>
                        <ArrowUpRight className="w-4 h-4 rtl:rotate-270 text-zinc-400" />
                      </Link>
                    </div>
                  </div>

                  {/* Right (5 Cols): 4 Holding Key Metrics in 2x2 Glass Grid */}
                  <div className="lg:col-span-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass-card rounded-2xl p-6 border border-sky-500/20 hover:border-sky-400 transition-all">
                        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-sky-400 mb-1">
                          <AnimatedCounter value={dict.stats.stat1_num} />
                        </div>
                        <div className="text-xs font-bold text-white">{lang === 'ar' ? 'فنادق مشغلة' : 'Operated Hotels'}</div>
                        <div className="text-[11px] text-zinc-400 mt-1">{dict.stats.stat1_text}</div>
                      </div>

                      <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400 transition-all">
                        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-1">
                          <AnimatedCounter value={dict.stats.stat2_num} />
                        </div>
                        <div className="text-xs font-bold text-white">{lang === 'ar' ? 'مصانع متخصصة' : 'Active Factories'}</div>
                        <div className="text-[11px] text-zinc-400 mt-1">{dict.stats.stat2_text}</div>
                      </div>

                      <div className="glass-card rounded-2xl p-6 border border-amber-500/20 hover:border-amber-400 transition-all">
                        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 mb-1">
                          <AnimatedCounter value={dict.stats.stat3_num} />
                        </div>
                        <div className="text-xs font-bold text-white">{lang === 'ar' ? 'كادر هندسي وفني' : 'Specialized Talent'}</div>
                        <div className="text-[11px] text-zinc-400 mt-1">{dict.stats.stat3_text}</div>
                      </div>

                      <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-100 mb-1">
                          <AnimatedCounter value={dict.stats.stat4_num} />
                        </div>
                        <div className="text-xs font-bold text-white">{lang === 'ar' ? 'معدل الإشغال' : 'Avg. Occupancy'}</div>
                        <div className="text-[11px] text-zinc-400 mt-1">{dict.stats.stat4_text}</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              CONCEPT C: THE TURNKEY MASTERPLAN & INTERACTIVE JOURNEY
              (Raw Craft -> Interior Fit-out -> 5-Star Hospitality Experience)
             ══════════════════════════════════════════════════════════════════ */}
          {activeConcept === 'turnkey' && (
            <motion.div
              key="turnkey"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative min-h-[92vh] flex flex-col justify-center py-16 sm:py-24 overflow-hidden bg-brand-dark"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-emerald-600/15 blur-[140px] rounded-full"></div>
              </div>

              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative w-full">
                
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-6">
                  <span>TURNKEY EXECUTION & HOSPITALITY ASSET PORTFOLIO</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 max-w-4xl mx-auto">
                  <span>{dict.hero.title_line1} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    {dict.hero.title_line2}
                  </span>
                  <span> {dict.hero.title_line3}</span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  {lang === 'ar'
                    ? 'نجمع بين قدرات التصنيع المتقدمة، وخبرات مقاولات تنفيذ الديكور، لنقدم في النهاية تجارب ضيافة فاخرة تفخر بها المملكة.'
                    : 'Uniting precision manufacturing, interior fit-out contracting, and luxury hotel management into one seamless holding powerhouse.'}
                </p>

                {/* 3 Interlocking Synergy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-start mb-12">
                  
                  {/* Card 1: We Manufacture */}
                  <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400 shadow-glow-emerald transition-all">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{lang === 'ar' ? 'نُصنّع الأثاث والديكور' : '1. WE MANUFACTURE'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{dict.sectors.mfg.subtitle}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{dict.sectors.mfg.desc}</p>
                  </div>

                  {/* Card 2: We Execute & Fit-out */}
                  <div className="glass-card rounded-2xl p-6 border border-amber-500/20 hover:border-amber-400 shadow-glow-gold transition-all">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{lang === 'ar' ? 'نُنفّذ مقاولات الديكور' : '2. WE EXECUTE & FIT-OUT'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{dict.sectors.contr.subtitle}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{dict.sectors.contr.desc}</p>
                  </div>

                  {/* Card 3: We Operate Hotels */}
                  <div className="glass-card rounded-2xl p-6 border border-sky-500/20 hover:border-sky-400 shadow-glow-blue transition-all">
                    <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      <span>{lang === 'ar' ? 'نُدير ونُشغّل الضيافة' : '3. WE OPERATE HOTELS'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{dict.sectors.hosp.subtitle}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{dict.sectors.hosp.desc}</p>
                  </div>

                </div>

                {/* Bottom Bar */}
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
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs text-zinc-300 bg-brand-surface hover:bg-brand-card border border-white/10 transition-all"
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
