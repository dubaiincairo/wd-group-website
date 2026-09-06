'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Check, 
  Maximize2,
  FileSpreadsheet
} from 'lucide-react';
import { HeroSlide, HERO_SLIDES, MATERIAL_SWATCHES, MaterialSwatch } from './heroTypes';

interface HeroOption4Props {
  slide: HeroSlide;
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  isAr: boolean;
}

export default function HeroOption4Asymmetric({
  slide,
  currentSlide,
  setCurrentSlide,
  isAr
}: HeroOption4Props) {
  const [selectedSwatch, setSelectedSwatch] = useState<MaterialSwatch>(MATERIAL_SWATCHES[0]);

  return (
    <div className="relative w-full flex-grow flex items-center min-h-[82vh] sm:min-h-[88vh] py-8 sm:py-12">
      
      {/* Dynamic Background Texture & Directional Wash */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter blur-md opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/90 to-[#08090C]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Editorial Column (Right in Arabic RTL / Left in LTR) - 6 Cols */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Numbered Category Header Stamp */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black font-mono text-[#C9A86A]/40">
                {`0${currentSlide + 1}`}
              </span>
              <div className="h-4 w-[1px] bg-white/20" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? slide.tagAr : slide.tagEn}</span>
              </div>
            </div>

            {/* Asymmetric Headline */}
            <motion.h1
              key={`opt4-title-${slide.id}`}
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.14]"
            >
              {isAr ? slide.titleAr : slide.titleEn}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`opt4-sub-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm lg:text-base text-zinc-300 leading-relaxed font-normal max-w-xl"
            >
              {isAr ? slide.subtitleAr : slide.subtitleEn}
            </motion.p>

            {/* Interactive Material Swatch Explorer */}
            <div className="p-4 rounded-2xl bg-[#0F121C]/80 border border-white/10 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#C9A86A] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  {isAr ? 'مستكشف الخامات الطبيعية المعتمدة:' : 'Natural Material Swatches:'}
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {isAr ? selectedSwatch.typeAr : selectedSwatch.typeEn}
                </span>
              </div>

              {/* Swatch Selectors */}
              <div className="grid grid-cols-4 gap-2">
                {MATERIAL_SWATCHES.map((swatch) => {
                  const isSelected = selectedSwatch.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`relative rounded-xl p-2 text-center transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#C9A86A]/20 border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.3)]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div 
                        className="w-full h-8 rounded-lg mb-1.5 border border-white/20 flex items-center justify-center"
                        style={{ backgroundColor: swatch.colorHex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                      </div>
                      <span className="text-[10px] font-bold text-zinc-200 block truncate">
                        {isAr ? swatch.nameAr.split(' ')[0] : swatch.nameEn.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Swatch Details Strip */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-300">
                <span>{isAr ? `الخامة المختارة: ${selectedSwatch.nameAr}` : `Selected: ${selectedSwatch.nameEn}`}</span>
                <span className="text-emerald-400 font-mono font-bold">100% Guaranteed</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_30px_rgba(201,168,106,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
              >
                <span>{isAr ? slide.ctaCatalogAr : slide.ctaCatalogEn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="#bespoke-b2b"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? 'طلب كتالوج المواصفات الهندسية' : 'Request CAD / Spec Sheet'}</span>
              </a>
            </div>

          </div>

          {/* Asymmetric Visual Collage (Opposite Side) - 6 Cols */}
          <div className="lg:col-span-6 relative">
            
            {/* Primary Main Framed Image */}
            <motion.div
              key={`opt4-main-${slide.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative h-[360px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group"
            >
              <Image
                src={slide.image}
                alt={isAr ? slide.titleAr : slide.titleEn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-black/20" />

              {/* Main Badge */}
              <div className="absolute top-4 start-4 px-3.5 py-1.5 rounded-full bg-[#08090C]/80 backdrop-blur-md border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-bold shadow-lg">
                <span>{isAr ? slide.pieceNameAr : slide.pieceNameEn}</span>
              </div>

              {/* Materials Label */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#08090C]/80 backdrop-blur-md border border-white/10 text-xs text-white">
                <span className="text-[#C9A86A] font-bold block text-[11px] mb-0.5">
                  {isAr ? 'المواد والتصنيع:' : 'Craft & Joinery:'}
                </span>
                <span className="text-zinc-200 block truncate">
                  {isAr ? slide.materialsAr : slide.materialsEn}
                </span>
              </div>
            </motion.div>

            {/* Overlapping Macro Swatch Texture Card (Asymmetric Layer) */}
            <motion.div
              key={`opt4-macro-${selectedSwatch.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute -bottom-6 ${
                isAr ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'
              } w-44 sm:w-56 p-3 rounded-2xl bg-[#0F121C]/95 backdrop-blur-2xl border border-[#C9A86A]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-20 hidden sm:block`}
            >
              <div className="relative h-24 sm:h-28 rounded-xl overflow-hidden mb-2 border border-white/10">
                <Image
                  src={selectedSwatch.image}
                  alt={isAr ? selectedSwatch.nameAr : selectedSwatch.nameEn}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-1.5 start-2 text-[10px] font-mono text-white font-bold">
                  MACRO DETAIL
                </span>
              </div>
              <span className="text-[11px] font-bold text-white block truncate">
                {isAr ? selectedSwatch.nameAr : selectedSwatch.nameEn}
              </span>
              <span className="text-[10px] text-[#C9A86A] block">
                {isAr ? 'عينة طبيعية معتمدة' : 'Certified Natural Swatch'}
              </span>
            </motion.div>

          </div>

        </div>
      </div>

    </div>
  );
}
