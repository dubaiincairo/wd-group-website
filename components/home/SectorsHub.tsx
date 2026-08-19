'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  Layers
} from 'lucide-react';

export default function SectorsHub() {
  const { lang, dict } = useLanguage();

  return (
    <section id="sectors" className="py-20 sm:py-28 bg-brand-pearl text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white border border-brand-border text-brand-accent mb-4 shadow-2xs">
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

        {/* 3 Core Sector Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTOR 1: HOSPITALITY (SwissBlue) */}
          <div 
            id="hospitality" 
            className="card-hover rounded-3xl bg-white border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-ambient group"
          >
            <div className="absolute top-0 inset-x-0 h-2 bg-[#1A476A]"></div>

            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1A476A]/10 text-[#1A476A] border border-[#1A476A]/20">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{dict.sectors.hosp.badge}</span>
                </span>
                <span className="text-2xl font-mono font-extrabold text-zinc-300 group-hover:text-[#1A476A] transition-colors">
                  01
                </span>
              </div>

              {/* Subtitle / Brand Banner */}
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#1A476A] mb-1">
                {dict.sectors.hosp.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-brand-dark mb-3 tracking-tight">
                {dict.sectors.hosp.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {dict.sectors.hosp.desc}
              </p>

              {/* Key Features List */}
              <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <ul className="space-y-2">
                  {dict.sectors.hosp.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1A476A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link to SwissBlue */}
            <a 
              href="https://swissblue.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#1A476A] hover:bg-[#133550] text-white shadow-sm transition-all group/btn"
            >
              <span>{dict.sectors.hosp.link_text}</span>
              <ExternalLink className="w-4 h-4 text-white/90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* SECTOR 2: MANUFACTURING & FURNITURE (GreenWood) */}
          <div 
            id="manufacturing" 
            className="card-hover rounded-3xl bg-white border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-ambient group"
          >
            <div className="absolute top-0 inset-x-0 h-2 bg-[#0B5C3D]"></div>

            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0B5C3D]/10 text-[#0B5C3D] border border-[#0B5C3D]/20">
                  <Factory className="w-3.5 h-3.5" />
                  <span>{dict.sectors.mfg.badge}</span>
                </span>
                <span className="text-2xl font-mono font-extrabold text-zinc-300 group-hover:text-[#0B5C3D] transition-colors">
                  02
                </span>
              </div>

              {/* Subtitle / Brand Banner */}
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#0B5C3D] mb-1">
                {dict.sectors.mfg.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-brand-dark mb-3 tracking-tight">
                {dict.sectors.mfg.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {dict.sectors.mfg.desc}
              </p>

              {/* Key Features List */}
              <div className="mb-8 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <ul className="space-y-2">
                  {dict.sectors.mfg.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0B5C3D] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link to GreenWood */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#0B5C3D] hover:bg-[#08452e] text-white shadow-sm transition-all group/btn"
            >
              <span>{dict.sectors.mfg.link_text}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>
          </div>

          {/* SECTOR 3: CONTRACTING (Engineering Excellence) */}
          <div 
            id="contracting" 
            className="card-hover rounded-3xl bg-white border border-brand-border p-8 flex flex-col justify-between relative overflow-hidden shadow-ambient group"
          >
            <div className="absolute top-0 inset-x-0 h-2 bg-[#8A7340]"></div>

            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8A7340]/10 text-[#8A7340] border border-[#8A7340]/20">
                  <HardHat className="w-3.5 h-3.5" />
                  <span>{dict.sectors.contr.badge}</span>
                </span>
                <span className="text-2xl font-mono font-extrabold text-zinc-300 group-hover:text-[#8A7340] transition-colors">
                  03
                </span>
              </div>

              {/* Subtitle / Brand Banner */}
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#8A7340] mb-1">
                {dict.sectors.contr.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-brand-dark mb-3 tracking-tight">
                {dict.sectors.contr.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {dict.sectors.contr.desc}
              </p>

              {/* Key Features List */}
              <div className="mb-8 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <ul className="space-y-2">
                  {dict.sectors.contr.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A7340] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Browse Projects Link */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#8A7340] hover:bg-[#6e5c33] text-white shadow-sm transition-all group/btn"
            >
              <span>{dict.sectors.contr.link_text}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
