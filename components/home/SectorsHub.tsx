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

const SECTOR_CARD_PHOTOS = {
  hospitality: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  manufacturing: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
  contracting: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
};

export default function SectorsHub() {
  const { lang, dict } = useLanguage();

  return (
    <section id="sectors" className="py-24 sm:py-32 bg-brand-surface relative overflow-hidden border-t border-brand-border">
      
      {/* Background Glows */}
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

        {/* 3 Core Sector Cards with Photographic Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTOR 1: HOSPITALITY (SwissBlue) */}
          <motion.div 
            id="hospitality" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-glow-blue border border-white/10 hover:border-sky-500/50"
          >
            <div>
              {/* Photo Header */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={SECTOR_CARD_PHOTOS.hospitality} 
                  alt="SwissBlue Hospitality"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/30 text-sky-200 border border-sky-400/40 backdrop-blur-md">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{dict.sectors.hosp.badge}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 text-xs font-bold uppercase tracking-wider text-sky-400">
                  {dict.sectors.hosp.subtitle}
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                  {dict.sectors.hosp.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {dict.sectors.hosp.desc}
                </p>

                {/* Key Features List */}
                <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                  <ul className="space-y-2.5">
                    {dict.sectors.hosp.details.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Direct Link to SwissBlue */}
            <div className="p-7 pt-0">
              <a 
                href="https://swissblue.sa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#1A476A] hover:bg-[#133550] text-white shadow-sm transition-all group/btn border border-sky-500/30 hover:border-sky-400"
              >
                <span>{dict.sectors.hosp.link_text}</span>
                <ExternalLink className="w-4 h-4 text-white/90 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* SECTOR 2: MANUFACTURING & FURNITURE (GreenWood) */}
          <motion.div 
            id="manufacturing" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-glow-emerald border border-white/10 hover:border-emerald-500/50"
          >
            <div>
              {/* Photo Header */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={SECTOR_CARD_PHOTOS.manufacturing} 
                  alt="GreenWood Manufacturing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 backdrop-blur-md">
                    <Factory className="w-3.5 h-3.5" />
                    <span>{dict.sectors.mfg.badge}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {dict.sectors.mfg.subtitle}
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                  {dict.sectors.mfg.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {dict.sectors.mfg.desc}
                </p>

                {/* Key Features List */}
                <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
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
            </div>

            {/* Direct Link to GreenWood */}
            <div className="p-7 pt-0">
              <Link 
                href="#contact"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#0B5C3D] hover:bg-[#08452e] text-white shadow-sm transition-all group/btn border border-emerald-500/30 hover:border-emerald-400"
              >
                <span>{dict.sectors.mfg.link_text}</span>
                <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* SECTOR 3: CONTRACTING (Engineering Excellence) */}
          <motion.div 
            id="contracting" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-glow-gold border border-white/10 hover:border-amber-500/50"
          >
            <div>
              {/* Photo Header */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={SECTOR_CARD_PHOTOS.contracting} 
                  alt="Contracting and Fit-outs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 text-amber-200 border border-amber-400/40 backdrop-blur-md">
                    <HardHat className="w-3.5 h-3.5" />
                    <span>{dict.sectors.contr.badge}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 text-xs font-bold uppercase tracking-wider text-amber-400">
                  {dict.sectors.contr.subtitle}
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                  {dict.sectors.contr.title}
                </h3>
                
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {dict.sectors.contr.desc}
                </p>

                {/* Key Features List */}
                <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
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
            </div>

            {/* Direct Link to Projects */}
            <div className="p-7 pt-0">
              <Link 
                href="#contact"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-bold text-xs bg-[#8A7340] hover:bg-[#6e5c33] text-white shadow-sm transition-all group/btn border border-amber-500/30 hover:border-amber-400"
              >
                <span>{dict.sectors.contr.link_text}</span>
                <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
