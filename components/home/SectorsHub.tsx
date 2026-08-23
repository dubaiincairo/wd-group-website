'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ExternalLink, 
  Check, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SectorsHub() {
  const { lang, dict } = useLanguage();

  return (
    <section id="sectors" className="py-24 sm:py-32 bg-brand-surface relative overflow-hidden border-t border-brand-border">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-dark border border-brand-border text-blue-400 mb-4 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{dict.sectors.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            {dict.sectors.title}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            {dict.sectors.subtitle}
          </p>
        </div>

        {/* 3 Core Sector Cards with Glowing Radiant Hovers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTOR 1: HOSPITALITY (SwissBlue) */}
          <motion.div 
            id="hospitality" 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-glow-blue border border-white/10 hover:border-blue-500/50"
          >
            {/* Top Accent Line with Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#1A476A] to-[#38BDF8] group-hover:h-1.5 transition-all"></div>

            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1A476A]/20 text-sky-400 border border-[#1A476A]/50">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{dict.sectors.hosp.badge}</span>
                </span>
                <span className="text-3xl font-mono font-extrabold text-zinc-600 group-hover:text-sky-400 transition-colors">
                  01
                </span>
              </div>

              {/* Subtitle / Brand */}
              <div className="text-xs font-extrabold uppercase tracking-wider text-sky-400 mb-1">
                {dict.sectors.hosp.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                {dict.sectors.hosp.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {dict.sectors.hosp.desc}
              </p>

              {/* Key Features List */}
              <div className="mb-8 p-4 rounded-2xl bg-black/40 border border-white/5">
                <ul className="space-y-2.5">
                  {dict.sectors.hosp.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
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
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#1A476A] hover:bg-[#133550] text-white shadow-sm transition-all group/btn border border-sky-500/30 hover:border-sky-400"
            >
              <span>{dict.sectors.hosp.link_text}</span>
              <ExternalLink className="w-4 h-4 text-white/90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* SECTOR 2: MANUFACTURING & FURNITURE (GreenWood) */}
          <motion.div 
            id="manufacturing" 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-glow-emerald border border-white/10 hover:border-emerald-500/50"
          >
            {/* Top Accent Line with Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0B5C3D] to-[#34D399] group-hover:h-1.5 transition-all"></div>

            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0B5C3D]/20 text-emerald-400 border border-[#0B5C3D]/50">
                  <Factory className="w-3.5 h-3.5" />
                  <span>{dict.sectors.mfg.badge}</span>
                </span>
                <span className="text-3xl font-mono font-extrabold text-zinc-600 group-hover:text-emerald-400 transition-colors">
                  02
                </span>
              </div>

              {/* Subtitle / Brand */}
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                {dict.sectors.mfg.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                {dict.sectors.mfg.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {dict.sectors.mfg.desc}
              </p>

              {/* Key Features List */}
              <div className="mb-8 p-4 rounded-2xl bg-black/40 border border-white/5">
                <ul className="space-y-2.5">
                  {dict.sectors.mfg.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link to GreenWood */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#0B5C3D] hover:bg-[#08452e] text-white shadow-sm transition-all group/btn border border-emerald-500/30 hover:border-emerald-400"
            >
              <span>{dict.sectors.mfg.link_text}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>
          </motion.div>

          {/* SECTOR 3: CONTRACTING (Engineering Excellence) */}
          <motion.div 
            id="contracting" 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-glow-gold border border-white/10 hover:border-amber-500/50"
          >
            {/* Top Accent Line with Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#8A7340] to-[#FBBF24] group-hover:h-1.5 transition-all"></div>

            <div>
              {/* Badge & Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8A7340]/20 text-amber-400 border border-[#8A7340]/50">
                  <HardHat className="w-3.5 h-3.5" />
                  <span>{dict.sectors.contr.badge}</span>
                </span>
                <span className="text-3xl font-mono font-extrabold text-zinc-600 group-hover:text-amber-400 transition-colors">
                  03
                </span>
              </div>

              {/* Subtitle / Brand */}
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-1">
                {dict.sectors.contr.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                {dict.sectors.contr.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {dict.sectors.contr.desc}
              </p>

              {/* Key Features List */}
              <div className="mb-8 p-4 rounded-2xl bg-black/40 border border-white/5">
                <ul className="space-y-2.5">
                  {dict.sectors.contr.details.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Link to Projects */}
            <Link 
              href="#contact"
              className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#8A7340] hover:bg-[#6e5c33] text-white shadow-sm transition-all group/btn border border-amber-500/30 hover:border-amber-400"
            >
              <span>{dict.sectors.contr.link_text}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
