'use client';

import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'values' | 'vision' | 'mission'>('values');

  const VALUE_ICONS = [Award, Lightbulb, Scale, Users];

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

        {/* Tab Navigation (Values First) */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0F1117]/90 border border-white/10 backdrop-blur-md shadow-lg">
            
            {/* 1. Values Tab Button (Default & First) */}
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

            {/* 2. Vision Tab Button */}
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

            {/* 3. Mission Tab Button */}
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

          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-5xl mx-auto min-h-[300px]">
          
          {/* ══════════ TAB 1: VALUES ══════════ */}
          {activeTab === 'values' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {dict.home.identity.values.map((val, idx) => {
                const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-[#C9A86A]/40 hover:bg-[#121622] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/25 flex items-center justify-center text-[#C9A86A] shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-[#C9A86A] group-hover:text-[#0E1A24] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-[#E3C58A] transition-colors">
                        {val.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════════ TAB 2: VISION (3 Balanced Cards on Right) ══════════ */}
          {activeTab === 'vision' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {/* Main Bento Hero Tile */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-blue-500/30 flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-colors shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                      {lang === 'ar' ? 'التوجه الاستراتيجي للرؤية' : 'VISION STRATEGIC DIRECTION'}
                    </span>
                    <Quote className="w-5 h-5 text-blue-400/40" />
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
                <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-emerald-500/30 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'مواكبة الرؤية الوطنية' : 'National Alignment'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {lang === 'ar' ? 'تنويع الاقتصاد والمحتوى المحلي' : 'Diversification & Local Content'}
                    </span>
                  </div>
                </div>

                {/* 2. Sustainable Economic Growth */}
                <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-[#C9A86A]/30 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A86A]/10 text-[#C9A86A] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'الاستدامة الاقتصادية' : 'Sustainable Growth'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {lang === 'ar' ? 'خلق قيمة تشغيلية واستثمارية مستمرة' : 'Long-term value creation & asset growth'}
                    </span>
                  </div>
                </div>

                {/* 3. Regional Expansion */}
                <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-cyan-500/30 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'التوسع الإقليمي' : 'Regional Expansion'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {lang === 'ar' ? 'حضور رائد في السوق الخليجي' : 'GCC & International Footprint'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ TAB 3: MISSION (3 Balanced Cards on Right) ══════════ */}
          {activeTab === 'mission' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {/* Main Bento Hero Tile */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-indigo-500/30 flex flex-col justify-between space-y-6 hover:border-indigo-500/50 transition-colors shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                      {lang === 'ar' ? 'المنطلقات التشغيلية للرسالة' : 'MISSION OPERATIONAL MANDATE'}
                    </span>
                    <Quote className="w-5 h-5 text-indigo-400/40" />
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
                <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-purple-500/30 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'تقنيات صناعية متقدمة' : 'Industrial Modernity'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {lang === 'ar' ? 'مصانع متطورة وأتمتة رقمية' : 'Advanced Facilities & Automation'}
                    </span>
                  </div>
                </div>

                {/* 2. Execution & Handover Precision */}
                <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-amber-500/30 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'جودة وتكامل التنفيذ' : 'Execution Precision'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {lang === 'ar' ? 'تسليم شامل وفق أدق المواصفات' : 'Turnkey handover to strict specifications'}
                    </span>
                  </div>
                </div>

                {/* 3. Institutional Trust */}
                <div className="p-4 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-pink-500/30 transition-colors flex-1">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'موثوقية وشراكة مؤسسية' : 'Institutional Trust'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {lang === 'ar' ? 'التزام تام بأعلى معايير التسليم' : 'Reliable Client Handover'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

