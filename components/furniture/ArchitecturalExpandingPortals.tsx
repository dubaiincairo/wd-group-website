'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Factory,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { HERO_SLIDES } from './hero/heroTypes';

export default function ArchitecturalExpandingPortals() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section className="relative w-full py-6 sm:py-10">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#C9A86A]/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/35 text-[#C9A86A] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'ثلاثة قطاعات تصنيع متخصصة' : 'Three Specialized Industrial Sectors'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isAr ? 'الهندسة المعمارية للأثاث الفاخر بالمملكة' : 'Architectural Excellence Across Three Disciplines'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal">
              {isAr 
                ? 'تصنيع سعودي مباشر يجمع بين فخامة الصالونات السكنية، أجنحة الضيافة الفندقية، وهيبة القاعات والمكاتب التنفيذية.'
                : 'Turnkey Saudi manufacturing spanning bespoke luxury residences, presidential hospitality suites, and corporate executive boardrooms.'}
            </p>
          </div>

          {/* Quick Sector Hallmarks */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? '3 مصانع وطنية (الرياض ونجران)' : '3 Industrial Plants (KSA)'}</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'ضمان 10 سنوات' : '10-Yr Guarantee'}</span>
            </span>
          </div>
        </div>

        {/* Triple Expanding Portal Cards */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[520px] w-full">
          {HERO_SLIDES.map((s, idx) => {
            const isSelected = activeIdx === idx;

            return (
              <motion.div
                key={s.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                layout
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 group ${
                  isSelected
                    ? 'lg:flex-[2.5] border-[#C9A86A] shadow-[0_20px_50px_rgba(201,168,106,0.25)] h-[440px] lg:h-full'
                    : 'lg:flex-1 border-white/10 hover:border-white/30 h-64 lg:h-full'
                }`}
              >
                {/* Edge-to-Edge Portal Imagery */}
                <Image
                  src={s.image}
                  alt={isAr ? s.titleAr : s.titleEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={`object-cover object-center transition-transform duration-700 ${
                    isSelected ? 'scale-105 filter brightness-[0.8]' : 'scale-100 filter brightness-[0.52] group-hover:brightness-[0.7]'
                  }`}
                />

                {/* Dark atmospheric gradient protection */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent" />

                {/* Top Portal Badge */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isSelected ? 'bg-[#C9A86A] text-[#08090C]' : 'bg-black/60 text-white border border-white/20'
                    }`}>
                      {`0${idx + 1}`}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white uppercase tracking-wider">
                      {isAr ? s.tagAr.split(' ')[0] + ' ' + (s.tagAr.split(' ')[1] || '') : s.tagEn.split(' ')[0]}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/40 text-[#C9A86A] text-[11px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-ping" />
                      <span>{isAr ? 'القطاع المعروض' : 'Active Sector'}</span>
                    </span>
                  )}
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10 space-y-3">
                  
                  {/* Title & Tag */}
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug">
                      {isAr ? s.titleAr : s.titleEn}
                    </h3>
                    
                    {/* Collapsed view subtitle or expanded details */}
                    <AnimatePresence>
                      {isSelected ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 pt-2"
                        >
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                            {isAr ? s.subtitleAr : s.subtitleEn}
                          </p>

                          {/* Material Hallmark Chip */}
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white font-medium">
                              {isAr ? s.materialsAr : s.materialsEn}
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#C9A86A] font-bold">
                              {isAr ? 'تفصيل مقاسات مخصص' : 'Bespoke Sizing'}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 pt-2">
                            <a
                              href="#catalog"
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.6)] transition-all cursor-pointer shadow-lg"
                            >
                              <span>{isAr ? s.ctaCatalogAr : s.ctaCatalogEn}</span>
                              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                            </a>
                            <a
                              href="#bespoke-b2b"
                              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all cursor-pointer"
                            >
                              <Layers className="w-4 h-4 text-[#C9A86A]" />
                              <span>{isAr ? s.ctaQuoteAr : s.ctaQuoteEn}</span>
                            </a>
                          </div>
                        </motion.div>
                      ) : (
                        <p className="text-xs text-zinc-400 truncate max-w-xs mt-1">
                          {isAr ? s.materialsAr : s.materialsEn}
                        </p>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
