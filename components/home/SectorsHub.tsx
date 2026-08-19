'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SectorsHub() {
  const { lang, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'hospitality' | 'manufacturing' | 'contracting'>('all');

  return (
    <section id="sectors" className="py-20 sm:py-28 bg-brand-pearl text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white border border-brand-border text-brand-accent mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{dict.sectors.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-5 leading-tight">
            {dict.sectors.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            {dict.sectors.subtitle}
          </p>
        </div>

        {/* 3 Core Sector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTOR 1: HOSPITALITY */}
          <div 
            id="hospitality" 
            className="card-hover rounded-3xl bg-white border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-ambient group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-2 bg-sector-hospitality"></div>

            <div>
              {/* Header Badge & Identifier */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-sector-hospitality-light text-sector-hospitality border border-sector-hospitality-border">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{dict.sectors.hosp.badge}</span>
                </span>
                <span className="text-2xl font-mono font-extrabold text-zinc-300 group-hover:text-sector-hospitality transition-colors">
                  01
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-extrabold text-brand-dark mb-3 tracking-tight">
                {dict.sectors.hosp.title}
              </h3>
              
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {dict.sectors.hosp.desc}
              </p>

              {/* Sister Brand Banner Link */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-sector-hospitality-border/80 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-extrabold text-sector-hospitality-dark uppercase tracking-wider">
                    {lang === 'ar' ? 'العلامة الفندقية التابعة' : 'Flagship Hotel Brand'}
                  </div>
                  <div className="text-xs font-bold text-brand-dark">
                    SwissBlue Hotels & Suites
                  </div>
                </div>
                <a 
                  href="https://swissblue.sa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-white text-sector-hospitality hover:bg-sector-hospitality hover:text-white border border-sector-hospitality-border transition-all shadow-xs"
                  title="Visit SwissBlue Hotels"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Key Numbers Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-brand-pearl border border-brand-border/60 mb-6 text-center">
                <div>
                  <div className="text-base font-extrabold text-brand-dark font-mono">{dict.sectors.hosp.stat1}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.hosp.stat1_label}</div>
                </div>
                <div className="border-x border-brand-border/80">
                  <div className="text-base font-extrabold text-sector-hospitality font-mono">{dict.sectors.hosp.stat2}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.hosp.stat2_label}</div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-brand-dark font-mono">{dict.sectors.hosp.stat3}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.hosp.stat3_label}</div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
                  {dict.sectors.key_capabilities}
                </div>
                <ul className="space-y-2">
                  {dict.sectors.hosp.caps.map((cap, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sector-hospitality shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA Button */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-brand-pearl hover:bg-sector-hospitality-light text-brand-dark hover:text-sector-hospitality-dark border border-brand-border hover:border-sector-hospitality-border transition-all group/btn"
            >
              <span>{dict.sectors.explore_btn}</span>
              <ArrowRight className="w-4 h-4 text-brand-muted group-hover/btn:text-sector-hospitality group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
            </Link>
          </div>

          {/* SECTOR 2: MANUFACTURING */}
          <div 
            id="manufacturing" 
            className="card-hover rounded-3xl bg-white border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-ambient group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-2 bg-sector-manufacturing"></div>

            <div>
              {/* Header Badge & Identifier */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-sector-manufacturing-light text-sector-manufacturing border border-sector-manufacturing-border">
                  <Factory className="w-3.5 h-3.5" />
                  <span>{dict.sectors.mfg.badge}</span>
                </span>
                <span className="text-2xl font-mono font-extrabold text-zinc-300 group-hover:text-sector-manufacturing transition-colors">
                  02
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-extrabold text-brand-dark mb-3 tracking-tight">
                {dict.sectors.mfg.title}
              </h3>
              
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {dict.sectors.mfg.desc}
              </p>

              {/* Certification & Complex Banner */}
              <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-sector-manufacturing-border/80 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-extrabold text-sector-manufacturing-dark uppercase tracking-wider">
                    {lang === 'ar' ? 'مواصفات الإنتاج الصناعي' : 'Industrial Standards'}
                  </div>
                  <div className="text-xs font-bold text-brand-dark">
                    ISO 9001 / ISO 14001 Quality
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white text-sector-manufacturing border border-sector-manufacturing-border text-xs font-bold font-mono">
                  50K m²
                </div>
              </div>

              {/* Key Numbers Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-brand-pearl border border-brand-border/60 mb-6 text-center">
                <div>
                  <div className="text-base font-extrabold text-brand-dark font-mono">{dict.sectors.mfg.stat1}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.mfg.stat1_label}</div>
                </div>
                <div className="border-x border-brand-border/80">
                  <div className="text-base font-extrabold text-sector-manufacturing font-mono">{dict.sectors.mfg.stat2}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.mfg.stat2_label}</div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-brand-dark font-mono">{dict.sectors.mfg.stat3}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.mfg.stat3_label}</div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
                  {dict.sectors.key_capabilities}
                </div>
                <ul className="space-y-2">
                  {dict.sectors.mfg.caps.map((cap, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sector-manufacturing shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA Button */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-brand-pearl hover:bg-sector-manufacturing-light text-brand-dark hover:text-sector-manufacturing-dark border border-brand-border hover:border-sector-manufacturing-border transition-all group/btn"
            >
              <span>{dict.sectors.explore_btn}</span>
              <ArrowRight className="w-4 h-4 text-brand-muted group-hover/btn:text-sector-manufacturing group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
            </Link>
          </div>

          {/* SECTOR 3: CONTRACTING */}
          <div 
            id="contracting" 
            className="card-hover rounded-3xl bg-white border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-ambient group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-2 bg-sector-contracting"></div>

            <div>
              {/* Header Badge & Identifier */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-sector-contracting-light text-sector-contracting border border-sector-contracting-border">
                  <HardHat className="w-3.5 h-3.5" />
                  <span>{dict.sectors.contr.badge}</span>
                </span>
                <span className="text-2xl font-mono font-extrabold text-zinc-300 group-hover:text-sector-contracting transition-colors">
                  03
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-extrabold text-brand-dark mb-3 tracking-tight">
                {dict.sectors.contr.title}
              </h3>
              
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {dict.sectors.contr.desc}
              </p>

              {/* Grade A Classification Banner */}
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-sector-contracting-border/80 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-extrabold text-sector-contracting-dark uppercase tracking-wider">
                    {lang === 'ar' ? 'تصنيف المقاولين المعتمد' : 'Contractor Classification'}
                  </div>
                  <div className="text-xs font-bold text-brand-dark">
                    Grade A General Contractor
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white text-sector-contracting border border-sector-contracting-border text-xs font-bold font-mono">
                  Grade 1
                </div>
              </div>

              {/* Key Numbers Grid */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-brand-pearl border border-brand-border/60 mb-6 text-center">
                <div>
                  <div className="text-base font-extrabold text-brand-dark font-mono">{dict.sectors.contr.stat1}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.contr.stat1_label}</div>
                </div>
                <div className="border-x border-brand-border/80">
                  <div className="text-base font-extrabold text-sector-contracting font-mono">{dict.sectors.contr.stat2}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.contr.stat2_label}</div>
                </div>
                <div>
                  <div className="text-base font-extrabold text-brand-dark font-mono">{dict.sectors.contr.stat3}</div>
                  <div className="text-[10px] text-brand-muted">{dict.sectors.contr.stat3_label}</div>
                </div>
              </div>

              {/* Capabilities List */}
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
                  {dict.sectors.key_capabilities}
                </div>
                <ul className="space-y-2">
                  {dict.sectors.contr.caps.map((cap, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sector-contracting shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA Button */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-brand-pearl hover:bg-sector-contracting-light text-brand-dark hover:text-sector-contracting-dark border border-brand-border hover:border-sector-contracting-border transition-all group/btn"
            >
              <span>{dict.sectors.explore_btn}</span>
              <ArrowRight className="w-4 h-4 text-brand-muted group-hover/btn:text-sector-contracting group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-all" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
