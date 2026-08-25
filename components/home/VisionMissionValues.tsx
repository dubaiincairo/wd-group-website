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
  Handshake
} from 'lucide-react';

export default function VisionMissionValues() {
  const { lang, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'values' | 'vision' | 'mission'>('values');

  const VALUE_ICONS = [Award, Lightbulb, Scale, Users];

  return (
    <section className="py-20 sm:py-24 bg-brand-dark text-white relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 shadow-glow-card">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.home.identity.label}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.home.identity.label}
          </h2>
        </div>

        {/* Tab Navigation (Core Values First) */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-brand-surface border border-white/10 backdrop-blur-md">
            
            {/* 1. Core Values Tab Button (Default & First) */}
            <button
              type="button"
              onClick={() => setActiveTab('values')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'values'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{dict.home.identity.values_title}</span>
            </button>

            {/* 2. Vision Tab Button */}
            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
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
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>{dict.home.identity.mission_title}</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto min-h-[300px]">
          
          {/* ══════════ TAB 1: CORE VALUES (Current Style Preserved) ══════════ */}
          {activeTab === 'values' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {dict.home.identity.values.map((val, idx) => {
                const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#0F1117]/90 border border-white/10 hover:border-blue-500/40 hover:bg-[#121622] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
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

          {/* ══════════ TAB 2: VISION (Option 3: The Modular Bento) ══════════ */}
          {activeTab === 'vision' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {/* Main Bento Hero Tile */}
              <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-blue-500/30 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-colors shadow-lg">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  {lang === 'ar' ? 'التوجه الاستراتيجي للرؤية' : 'VISION STRATEGIC DIRECTION'}
                </span>
                
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  &ldquo;{dict.home.identity.vision_desc}&rdquo;
                </p>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono flex-wrap pt-2 border-t border-white/5">
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                    {lang === 'ar' ? 'رؤية المملكة 2030' : 'Saudi Vision 2030'}
                  </span>
                  <span>• {lang === 'ar' ? 'نمو اقتصادي مستدام' : 'Sustainable Growth'}</span>
                </div>
              </div>

              {/* Side Stacked Metric & Focus Badges */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-4 sm:p-5 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
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

                <div className="p-4 sm:p-5 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-cyan-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
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

          {/* ══════════ TAB 3: MISSION (Option 3: The Modular Bento) ══════════ */}
          {activeTab === 'mission' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 animate-in fade-in duration-200">
              {/* Main Bento Hero Tile */}
              <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#0F1117]/90 border border-indigo-500/30 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-colors shadow-lg">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  {lang === 'ar' ? 'المنطلقات التشغيلية للرسالة' : 'MISSION OPERATIONAL MANDATE'}
                </span>
                
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  &ldquo;{dict.home.identity.mission_desc}&rdquo;
                </p>

                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono flex-wrap pt-2 border-t border-white/5">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                    {lang === 'ar' ? 'تنفيذ متكامل ودقيق' : 'Turnkey Precision'}
                  </span>
                  <span>• {lang === 'ar' ? 'قيمة مضافة لشركائنا' : 'Client & Partner Value'}</span>
                </div>
              </div>

              {/* Side Stacked Metric & Focus Badges */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-4 sm:p-5 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-purple-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
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

                <div className="p-4 sm:p-5 rounded-xl bg-[#141721] border border-white/10 flex items-center gap-3.5 hover:border-pink-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {lang === 'ar' ? 'موثوقية مؤسسية' : 'Institutional Trust'}
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

