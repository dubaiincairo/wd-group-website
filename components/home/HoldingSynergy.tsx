'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Factory, HardHat, Building2, Workflow, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function HoldingSynergy() {
  const { lang, dict } = useLanguage();

  const STEPS = [
    {
      step: '01',
      title: dict.home.synergy.step1_title,
      text: dict.home.synergy.step1_text,
      icon: Factory,
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      cardBorder: 'hover:border-emerald-500/40',
    },
    {
      step: '02',
      title: dict.home.synergy.step2_title,
      text: dict.home.synergy.step2_text,
      icon: HardHat,
      color: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      cardBorder: 'hover:border-amber-500/40',
    },
    {
      step: '03',
      title: dict.home.synergy.step3_title,
      text: dict.home.synergy.step3_text,
      icon: Building2,
      color: 'text-sky-400',
      badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      cardBorder: 'hover:border-sky-500/40',
    },
  ];

  return (
    <section className="py-24 bg-[#08090C] text-white relative overflow-hidden">
      
      {/* Subtle blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface border border-brand-border text-blue-400 shadow-glow-card">
            <Workflow className="w-3.5 h-3.5" />
            <span>{dict.home.synergy.label}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.home.synergy.heading}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {dict.home.synergy.intro}
          </p>
        </div>

        {/* 3 Steps Pipeline Grid with Visual Flow Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`glass-card rounded-3xl p-7 border border-white/10 ${item.cardBorder} transition-all group relative overflow-hidden flex flex-col justify-between`}
              >
                {/* Blueprint Crosshairs */}
                <div className="absolute top-2 left-2 text-zinc-700 font-mono text-[9px] select-none">+</div>
                <div className="absolute top-2 right-2 text-zinc-700 font-mono text-[9px] select-none">+</div>

                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${item.badgeBg}`}>
                      STEP // {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* Footer Blueprint Line */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>INTEGRATED SYNERGY</span>
                  </div>
                  <span className="text-zinc-500">0{idx + 1} / 03</span>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
