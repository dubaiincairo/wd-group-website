'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ShieldCheck, 
  Target, 
  GitBranch, 
  Award, 
  CheckCircle,
  Building,
  TrendingUp
} from 'lucide-react';

export default function AboutGovernance() {
  const { lang, dict } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-brand-dark border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-pearl border border-brand-border text-brand-accent mb-4 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{dict.about.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-6 leading-tight">
              {dict.about.title}
            </h2>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed mb-6">
              {dict.about.subtitle}
            </p>

            <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
              <p>{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
            </div>
          </div>

          {/* Right Visual Card: Institutional DNA */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-brand-dark text-white border border-brand-slate shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 blur-[90px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8 pb-6 border-b border-brand-slate">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                    {lang === 'ar' ? 'نموذج الحوكمة' : 'Governance Framework'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    WD Holding Architecture
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-slate flex items-center justify-center font-mono font-bold text-brand-accent">
                  WD
                </div>
              </div>

              {/* 3 Strategic Pillars */}
              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-slate text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {dict.about.pillar1_title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {dict.about.pillar1_desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-slate text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {dict.about.pillar2_title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {dict.about.pillar2_desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-slate text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {dict.about.pillar3_title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {dict.about.pillar3_desc}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
