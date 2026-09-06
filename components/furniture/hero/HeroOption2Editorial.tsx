'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Info, 
  MessageCircle, 
  Ruler, 
  Wrench,
  Building,
  Clock
} from 'lucide-react';
import { HeroSlide, HERO_SLIDES, HotspotPoint } from './heroTypes';

interface HeroOption2Props {
  slide: HeroSlide;
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  isAr: boolean;
}

export default function HeroOption2Editorial({
  slide,
  currentSlide,
  setCurrentSlide,
  isAr
}: HeroOption2Props) {
  const [activeHotspot, setActiveHotspot] = useState<HotspotPoint | null>(null);

  return (
    <div className="relative w-full flex-grow flex flex-col justify-center min-h-[80vh] sm:min-h-[85vh]">
      
      {/* 50 / 50 Desktop Split Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch rounded-3xl overflow-hidden border border-white/10 bg-[#0B0D14]/90 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
          
          {/* Editorial Content Half (Right Column in Arabic RTL / Left in LTR) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            
            <div className="space-y-5">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A86A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-bold tracking-wider uppercase">
                    {isAr ? slide.tagAr : slide.tagEn}
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {`COLLECTION ${currentSlide + 1} OF ${HERO_SLIDES.length}`}
                </span>
              </div>

              {/* Architectural Title */}
              <motion.h1 
                key={`opt2-title-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
              >
                {isAr ? slide.titleAr : slide.titleEn}
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                key={`opt2-sub-${slide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm lg:text-base text-zinc-300 leading-relaxed font-normal"
              >
                {isAr ? slide.subtitleAr : slide.subtitleEn}
              </motion.p>
            </div>

            {/* Architectural Engineering Matrix Table */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 space-y-2.5 text-xs">
              <div className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5" />
                <span>{isAr ? 'مواصفات التصنيع الهندسي للمشروع' : 'Architectural Engineering Specs'}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-emerald-400" />
                    {isAr ? 'الهيكل والنجارة:' : 'Wood & Joinery:'}
                  </span>
                  <span className="text-white font-bold block truncate">
                    {isAr ? slide.specs.woodAr : slide.specs.woodEn}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#C9A86A]" />
                    {isAr ? 'التنجيد والأقمشة:' : 'Upholstery:'}
                  </span>
                  <span className="text-white font-bold block truncate">
                    {isAr ? slide.specs.upholsteryAr : slide.specs.upholsteryEn}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Building className="w-3 h-3 text-blue-400" />
                    {isAr ? 'موقع التصنيع:' : 'Industrial Facility:'}
                  </span>
                  <span className="text-white font-bold block truncate">
                    {isAr ? slide.specs.factoryAr : slide.specs.factoryEn}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-400 block font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {isAr ? 'الجدول الزمني للتسليم:' : 'Turnkey Lead Time:'}
                  </span>
                  <span className="text-white font-bold block truncate">
                    {isAr ? slide.specs.leadTimeAr : slide.specs.leadTimeEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions & WhatsApp RFQ */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_30px_rgba(201,168,106,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
              >
                <span>{isAr ? slide.ctaCatalogAr : slide.ctaCatalogEn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'محادثة استشاري المشاريع' : 'Architectural WhatsApp'}</span>
              </a>
            </div>

            {/* Slide Navigation Pagination */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 py-2 px-3 rounded-lg text-left rtl:text-right transition-all cursor-pointer border ${
                    currentSlide === idx
                      ? 'bg-[#C9A86A]/15 border-[#C9A86A] text-[#C9A86A]'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold block">
                    {`0${idx + 1}`}
                  </span>
                  <span className="text-[11px] font-bold block truncate">
                    {isAr ? s.tagAr.split(' ')[0] + ' ' + (s.tagAr.split(' ')[1] || '') : s.tagEn.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Visual Showcase Half (Left Column in Arabic RTL / Right in LTR) with Hotspots */}
          <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[500px] lg:min-h-[640px] order-1 lg:order-2 overflow-hidden group">
            
            {/* Edge-to-Edge True Color Photography */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`opt2-img-${slide.id}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={isAr ? slide.titleAr : slide.titleEn}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                
                {/* Soft Edge Gradient only at very edge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Top Collection Banner */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-[#08090C]/80 backdrop-blur-md border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-bold shadow-lg">
                <span>{isAr ? slide.pieceNameAr : slide.pieceNameEn}</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                {isAr ? 'انقر على النقاط لاستعراض التفاصيل' : 'Tap hotspots to inspect craft'}
              </div>
            </div>

            {/* Interactive Hotspot Pins */}
            {slide.hotspots.map((hs) => {
              const isActive = activeHotspot?.id === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ top: hs.top, left: hs.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : hs)}
                    className="relative group/pin cursor-pointer flex items-center justify-center"
                    aria-label={isAr ? hs.titleAr : hs.titleEn}
                  >
                    {/* Pulsing Radar Ring */}
                    <span className="absolute w-8 h-8 rounded-full bg-[#C9A86A]/40 animate-ping" />
                    
                    {/* Pin Core */}
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shadow-lg border ${
                      isActive 
                        ? 'bg-[#C9A86A] text-[#08090C] border-white scale-110' 
                        : 'bg-[#08090C]/90 text-[#C9A86A] border-[#C9A86A] hover:scale-110'
                    }`}>
                      <Info className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {/* Hotspot Tooltip Modal */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 rounded-2xl bg-[#08090C]/95 backdrop-blur-xl border border-[#C9A86A]/40 shadow-2xl text-white z-30 pointer-events-auto"
                      >
                        <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/10">
                          <span className="text-xs font-bold text-[#C9A86A]">
                            {isAr ? hs.titleAr : hs.titleEn}
                          </span>
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="text-zinc-400 hover:text-white text-xs cursor-pointer px-1"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-relaxed">
                          {isAr ? hs.descAr : hs.descEn}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Bottom Materials Strip */}
            <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#08090C]/80 backdrop-blur-md border border-white/10 text-xs text-zinc-200 flex items-center justify-between">
              <span className="text-[11px] text-[#C9A86A] font-bold">
                {isAr ? 'الخامات الأساسية:' : 'Primary Materials:'}
              </span>
              <span className="text-[11px] font-medium text-white truncate max-w-[280px]">
                {isAr ? slide.materialsAr : slide.materialsEn}
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
