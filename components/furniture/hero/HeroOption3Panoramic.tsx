'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Factory, 
  Truck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { HeroSlide, HERO_SLIDES } from './heroTypes';

interface HeroOption3Props {
  slide: HeroSlide;
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  isAr: boolean;
}

export default function HeroOption3Panoramic({
  slide,
  currentSlide,
  setCurrentSlide,
  isAr
}: HeroOption3Props) {
  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? HERO_SLIDES.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative w-full flex-grow flex flex-col justify-between items-center min-h-[82vh] sm:min-h-[88vh] overflow-hidden">
      
      {/* 100vw Panoramic Cinematic Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`opt3-bg-${slide.id}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={isAr ? slide.titleAr : slide.titleEn}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.65] contrast-[1.05]"
          />
          
          {/* Top subtle vignette for navbar legibility */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#08090C] via-[#08090C]/60 to-transparent" />
          
          {/* Bottom vignette for console contrast */}
          <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-[#08090C] via-[#08090C]/80 to-transparent" />
          
          {/* Center ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C9A86A]/5 rounded-full blur-[160px] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Panoramic Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-8 sm:pt-14 space-y-6">
        
        {/* Eyebrow Tag */}
        <motion.div
          key={`opt3-tag-${slide.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#08090C]/80 border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-mono font-bold backdrop-blur-xl shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>{isAr ? slide.tagAr : slide.tagEn}</span>
        </motion.div>

        {/* Panoramic 2-Line Bold Headline */}
        <motion.h1
          key={`opt3-title-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14] drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center gap-1 sm:gap-2"
        >
          <span className="block text-white">
            {isAr
              ? (slide.titleLine1Ar || slide.titleAr)
              : (slide.titleLine1En || slide.titleEn)}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5CD] via-[#C9A86A] to-[#DFBA73] drop-shadow-[0_0_35px_rgba(201,168,106,0.35)]">
            {isAr
              ? (slide.titleLine2Ar || '')
              : (slide.titleLine2En || '')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`opt3-sub-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base lg:text-lg text-zinc-200 font-normal max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          {isAr ? slide.subtitleAr : slide.subtitleEn}
        </motion.p>

      </div>

      {/* Floating Glassmorphic Command Console Island (Bottom-Center) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full pb-6 pt-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl p-4 sm:p-5 bg-[#0F121C]/85 backdrop-blur-2xl border border-[#C9A86A]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-4"
        >
          
          {/* Top Bar of Console: Collection Category Quick-Tabs */}
          <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border ${
                  currentSlide === idx
                    ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.3)]'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-left rtl:text-right truncate">
                  <span className="text-[10px] font-mono block opacity-70">
                    {`0${idx + 1}`}
                  </span>
                  <span className="text-xs font-bold block truncate">
                    {isAr ? s.tagAr.split(' ')[0] + ' ' + (s.tagAr.split(' ')[1] || '') : s.tagEn.split(' ')[0]}
                  </span>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  currentSlide === idx ? 'bg-[#C9A86A] animate-pulse' : 'bg-white/20'
                }`} />
              </button>
            ))}
          </div>

          {/* Bottom Bar of Console: Actions + Materials Specs + Arrows */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            
            {/* Live Materials Callout */}
            <div className="text-xs text-zinc-300 text-center sm:text-left rtl:sm:text-right">
              <span className="text-[#C9A86A] font-bold block text-[11px]">
                {isAr ? slide.pieceNameAr : slide.pieceNameEn}
              </span>
              <span className="text-[11px] text-zinc-400">
                {isAr ? slide.materialsAr : slide.materialsEn}
              </span>
            </div>

            {/* CTAs & Navigation Controls */}
            <div className="flex items-center gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
              >
                <span>{isAr ? slide.ctaCatalogAr : slide.ctaCatalogEn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="#bespoke-b2b"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? slide.ctaQuoteAr : slide.ctaQuoteEn}</span>
              </a>

              {/* Prev / Next mini buttons */}
              <div className="flex items-center gap-1.5 pl-2 rtl:pl-0 rtl:pr-2 border-l rtl:border-l-0 rtl:border-r border-white/10">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}
