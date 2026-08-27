'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Compass, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Lightbulb, 
  Scale, 
  Users,
  Globe,
  Cpu,
  Handshake,
  TrendingUp,
  Layers,
  Quote
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'values'>('vision');

  const VALUE_ICONS = [Award, Lightbulb, Users];

  return (
    <section className="py-20 sm:py-24 bg-brand-dark text-white relative overflow-hidden border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#0F1117]/90 border border-[#C9A86A]/30 text-[#C9A86A] shadow-glow-camel">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono">{dict.home.identity.label}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight ${lang === 'en' ? 'font-serif' : ''}`}>
            {dict.home.identity.label}
          </h2>
        </div>

        {/* Tab Navigation (Vision -> Mission -> Values) */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0F1117]/90 border border-white/10 backdrop-blur-md shadow-lg">
            
            {/* 1. Vision Tab Button (Default & First) */}
            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-[#C9A86A] text-[#0E1A24] shadow-glow-camel font-extrabold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{dict.home.identity.vision_title}</span>
            </button>

            {/* 2. Mission Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'mission'
                  ? 'bg-[#C9A86A] text-[#0E1A24] shadow-glow-camel font-extrabold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{dict.home.identity.mission_title}</span>
            </button>

            {/* 3. Values Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('values')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'values'
                  ? 'bg-[#C9A86A] text-[#0E1A24] shadow-glow-camel font-extrabold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{dict.home.identity.values_title || (lang === 'ar' ? 'القيم' : 'Values')}</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display with Framer Motion Animation */}
        <div className="max-w-5xl mx-auto min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* ══════════ TAB 1: VISION (DEFAULT) ══════════ */}
            {activeTab === 'vision' && (
              <motion.div 
                key="vision"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5"
              >
                {/* Main Bento Hero Tile */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-blue-500/30 flex flex-col justify-between space-y-6 hover:border-blue-400/60 hover:bg-[#121622] transition-all duration-300 shadow-lg group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                        {lang === 'ar' ? 'التوجه الاستراتيجي للرؤية' : 'VISION STRATEGIC DIRECTION'}
                      </span>
                      <Quote className="w-5 h-5 text-blue-400/40 group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    
                    <p className={`text-base sm:text-lg md:text-xl text-zinc-100 font-medium leading-relaxed sm:leading-8 ${lang === 'en' ? 'font-serif' : 'font-sans'}`}>
                      {dict.home.identity.vision_desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono flex-wrap pt-4 border-t border-white/10">
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                      {lang === 'ar' ? 'رؤية المملكة 2030' : 'Saudi Vision 2030'}
                    </span>
                    <span>• {lang === 'ar' ? 'نمو اقتصادي مستدام' : 'Sustainable Growth'}</span>
                  </div>
                </div>

                {/* Side Stacked 3 Balanced Focus Badges */}
                <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
                  {/* 1. National Alignment */}
                  <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-emerald-400/50 hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(52,211,153,0.12)]">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-all duration-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-emerald-300 transition-colors duration-300">
                        {lang === 'ar' ? 'مواكبة الرؤية الوطنية' : 'National Alignment'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {lang === 'ar' ? 'تنويع الاقتصاد والمحتوى المحلي' : 'Diversification & Local Content'}
                      </span>
                    </div>
                  </div>

                  {/* 2. Sustainable Economic Growth */}
                  <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-[#C9A86A]/50 hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(201,168,106,0.12)]">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/25 text-[#C9A86A] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#C9A86A] group-hover:text-[#0E1A24] transition-all duration-300">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-[#E3C58A] transition-colors duration-300">
                        {lang === 'ar' ? 'الاستدامة الاقتصادية' : 'Sustainable Growth'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {lang === 'ar' ? 'خلق قيمة تشغيلية واستثمارية مستمرة' : 'Long-term value creation & asset growth'}
                      </span>
                    </div>
                  </div>

                  {/* 3. Regional Expansion */}
                  <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-cyan-400/50 hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-cyan-950 transition-all duration-300">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-cyan-300 transition-colors duration-300">
                        {lang === 'ar' ? 'التوسع الإقليمي' : 'Regional Expansion'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {lang === 'ar' ? 'حضور رائد في السوق الخليجي' : 'GCC & International Footprint'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════ TAB 2: MISSION ══════════ */}
            {activeTab === 'mission' && (
              <motion.div 
                key="mission"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5"
              >
                {/* Main Bento Hero Tile */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-indigo-500/30 flex flex-col justify-between space-y-6 hover:border-indigo-400/60 hover:bg-[#121622] transition-all duration-300 shadow-lg group hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                        {lang === 'ar' ? 'المنطلقات التشغيلية للرسالة' : 'MISSION OPERATIONAL MANDATE'}
                      </span>
                      <Quote className="w-5 h-5 text-indigo-400/40 group-hover:text-indigo-400 transition-colors duration-300" />
                    </div>
                    
                    <p className={`text-base sm:text-lg md:text-xl text-zinc-100 font-medium leading-relaxed sm:leading-8 ${lang === 'en' ? 'font-serif' : 'font-sans'}`}>
                      {dict.home.identity.mission_desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono flex-wrap pt-4 border-t border-white/10">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                      {lang === 'ar' ? 'تنفيذ متكامل ودقيق' : 'Turnkey Precision'}
                    </span>
                    <span>• {lang === 'ar' ? 'قيمة مضافة لشركائنا' : 'Client & Partner Value'}</span>
                  </div>
                </div>

                {/* Side Stacked 3 Balanced Focus Badges */}
                <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
                  {/* 1. Industrial Modernity */}
                  <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-purple-400/50 hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(192,132,252,0.12)]">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-purple-950 transition-all duration-300">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-purple-300 transition-colors duration-300">
                        {lang === 'ar' ? 'تقنيات صناعية متقدمة' : 'Industrial Modernity'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {lang === 'ar' ? 'مصانع متطورة وأتمتة رقمية' : 'Advanced Facilities & Automation'}
                      </span>
                    </div>
                  </div>

                  {/* 2. Execution & Handover Precision */}
                  <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-amber-400/50 hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(251,191,36,0.12)]">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-amber-950 transition-all duration-300">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-amber-300 transition-colors duration-300">
                        {lang === 'ar' ? 'جودة وتكامل التنفيذ' : 'Execution Precision'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {lang === 'ar' ? 'تسليم شامل وفق أدق المواصفات' : 'Turnkey handover to strict specifications'}
                      </span>
                    </div>
                  </div>

                  {/* 3. Institutional Trust */}
                  <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-pink-400/50 hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(244,114,182,0.12)]">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/25 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-pink-950 transition-all duration-300">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-pink-300 transition-colors duration-300">
                        {lang === 'ar' ? 'موثوقية وشراكة مؤسسية' : 'Institutional Trust'}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        {lang === 'ar' ? 'التزام تام بأعلى معايير التسليم' : 'Reliable Client Handover'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════ TAB 3: VALUES ══════════ */}
            {activeTab === 'values' && (
              <motion.div 
                key="values"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5"
              >
                {/* Main Bento Hero Tile */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-[#C9A86A]/30 flex flex-col justify-between space-y-6 hover:border-[#C9A86A]/60 hover:bg-[#121622] transition-all duration-300 shadow-lg group hover:shadow-[0_0_30px_rgba(201,168,106,0.15)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#C9A86A] font-bold uppercase tracking-wider">
                        {lang === 'ar' ? 'منظومة المبادئ والقيم المؤسسية' : 'CORE VALUES & FOUNDATIONAL ETHOS'}
                      </span>
                      <Quote className="w-5 h-5 text-[#C9A86A]/40 group-hover:text-[#C9A86A] transition-colors duration-300" />
                    </div>
                    
                    <p className={`text-base sm:text-lg md:text-xl text-zinc-100 font-medium leading-relaxed sm:leading-8 ${lang === 'en' ? 'font-serif' : 'font-sans'}`}>
                      {lang === 'ar' 
                        ? 'نلتزم في كافة قطاعاتنا ومصانعنا بأعلى معايير الحوكمة والنزاهة والتميز التشغيلي، واضعين الجودة والمسؤولية الوطنية في صميم كل مشروع واستثمار نقوده.' 
                        : 'Across all our sectors and manufacturing facilities, we are committed to the highest standards of governance, integrity, and operational excellence—placing quality and national responsibility at the core of every project and investment.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono flex-wrap pt-4 border-t border-white/10">
                    <span className="px-2.5 py-1 rounded-md bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/20 font-bold">
                      {lang === 'ar' ? 'الجودة والتميز' : 'Quality & Excellence'}
                    </span>
                    <span>• {lang === 'ar' ? 'مسؤولية وتنمية وطنية مستدامة' : 'National Responsibility & Impact'}</span>
                  </div>
                </div>

                {/* Side Stacked 3 Balanced Value Focus Cards */}
                <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
                  {dict.home.identity.values.slice(0, 3).map((val, idx) => {
                    const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                    const styles = [
                      { border: 'hover:border-amber-400/50', iconBg: 'bg-amber-500/10 border-amber-500/25 text-amber-400 group-hover:bg-amber-500 group-hover:text-amber-950', text: 'group-hover:text-amber-300' },
                      { border: 'hover:border-emerald-400/50', iconBg: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-emerald-950', text: 'group-hover:text-emerald-300' },
                      { border: 'hover:border-purple-400/50', iconBg: 'bg-purple-500/10 border-purple-500/25 text-purple-400 group-hover:bg-purple-500 group-hover:text-purple-950', text: 'group-hover:text-purple-300' },
                    ];
                    const s = styles[idx % styles.length];

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 ${s.border} hover:bg-[#161B28] transition-all duration-300 flex-1 group cursor-default shadow-xs hover:shadow-[0_0_20px_rgba(201,168,106,0.12)]`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${s.iconBg} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-xs sm:text-sm font-bold text-white block ${s.text} transition-colors duration-300`}>
                            {val.title}
                          </span>
                          <span className="text-[11px] text-zinc-400">
                            {val.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

