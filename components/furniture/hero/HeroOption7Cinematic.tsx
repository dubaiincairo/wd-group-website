'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Play, 
  MessageCircle, 
  Package, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { HERO_SLIDES, HeroSlide } from './heroTypes';

interface HeroOption7Props {
  slide: HeroSlide;
  currentSlide: number;
  setCurrentSlide: (idx: number) => void;
  isAr: boolean;
}

export default function HeroOption7Cinematic({
  slide,
  currentSlide,
  setCurrentSlide,
  isAr
}: HeroOption7Props) {
  const [requestedSample, setRequestedSample] = useState(false);

  return (
    <div className="relative w-full flex-grow flex items-center min-h-[86vh] sm:min-h-[92vh] py-8 sm:py-12 overflow-hidden">
      
      {/* 100vw Immersive High-Fashion Editorial Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`opt7-bg-${slide.id}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={isAr ? slide.titleAr : slide.titleEn}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.68] contrast-[1.08]"
          />
          
          {/* Subtle directional dark veil protecting typography */}
          <div 
            className={`absolute inset-0 ${
              isAr
                ? 'bg-gradient-to-l from-[#08090C] via-[#08090C]/85 to-[#08090C]/40'
                : 'bg-gradient-to-r from-[#08090C] via-[#08090C]/85 to-[#08090C]/40'
            }`} 
          />
          
          {/* Top and Bottom fades */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-[#08090C]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/90 via-transparent to-[#08090C]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Magazine Editorial Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Collection Index Stamp */}
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl font-serif font-black text-[#C9A86A]/40 tracking-widest">
                {`2025 // 0${currentSlide + 1}`}
              </span>
              <div className="h-6 w-[1px] bg-white/20" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/35 text-[#C9A86A] text-xs font-mono font-bold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? slide.tagAr : slide.tagEn}</span>
              </div>
            </div>

            {/* High-Impact Headline */}
            <motion.h1
              key={`opt7-title-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]"
            >
              {isAr ? slide.titleAr : slide.titleEn}
            </motion.h1>

            {/* Subtitle & Curated Craft Narrative */}
            <motion.p
              key={`opt7-sub-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base lg:text-lg text-zinc-200 leading-relaxed font-normal max-w-2xl"
            >
              {isAr ? slide.subtitleAr : slide.subtitleEn}
            </motion.p>

            {/* Active Craft Hallmarks Strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
                <span className="font-bold text-white">{isAr ? slide.pieceNameAr : slide.pieceNameEn}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                <span className="text-zinc-400">{isAr ? 'الخامات:' : 'Craft:'}</span>
                <span className="text-zinc-200">{isAr ? slide.materialsAr : slide.materialsEn}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_35px_rgba(201,168,106,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl border border-[#E3C58A]"
              >
                <span>{isAr ? slide.ctaCatalogAr : slide.ctaCatalogEn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="#bespoke-b2b"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold text-zinc-200 bg-[#141721]/90 hover:bg-[#1C2130] border border-white/15 hover:border-[#C9A86A]/50 backdrop-blur-xl transition-all cursor-pointer shadow-lg"
              >
                <Layers className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? slide.ctaQuoteAr : slide.ctaQuoteEn}</span>
              </a>
            </div>

          </div>

          {/* VIP Order Concierge Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#0F121C]/90 backdrop-blur-2xl border border-[#C9A86A]/30 shadow-[0_25px_65px_rgba(0,0,0,0.85)] space-y-5"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent" />

              {/* Concierge Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {isAr ? 'خدمة كبار العملاء والمشاريع' : 'VIP ATELIER CONCIERGE'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#C9A86A]">24/7 KSA</span>
              </div>

              {/* Turnkey Lead-Time Ticker */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {isAr ? 'الجدول الزمني للتنفيذ والتسليم:' : 'Turnkey Manufacturing Timeline:'}
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">EXPRESS</span>
                </div>
                <p className="text-xs font-bold text-white">
                  {isAr ? slide.specs.leadTimeAr : slide.specs.leadTimeEn}
                </p>
                <span className="text-[10px] text-zinc-400 block font-mono">
                  {isAr ? 'شامل الشحن والتركيب المباشر من مصنع الرياض' : 'Direct factory logistics across Riyadh & all KSA cities'}
                </span>
              </div>

              {/* Free Material Sample Box Callout */}
              <div className="p-3.5 rounded-2xl bg-[#C9A86A]/10 border border-[#C9A86A]/25 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#C9A86A] font-bold">
                  <Package className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'طلب حقيبة عينات الأخشاب والأقمشة' : 'Request Material Swatch Kit'}</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed">
                  {isAr 
                    ? 'نوفر لمصممي الديكور والمشاريع حقيبة عينات من أخشاب الجوز الطبيعي وأقمشة البوكليه والجلود مجاناً.'
                    : 'Complimentary luxury material box delivered to your project site within 48 hours.'}
                </p>
                <button
                  onClick={() => setRequestedSample(true)}
                  className="w-full py-2 px-3 rounded-xl bg-[#C9A86A]/20 hover:bg-[#C9A86A]/30 border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {requestedSample 
                      ? (isAr ? 'تم تسجيل طلب الحقيبة - سيتواصل معك المستشار' : 'Sample Kit Requested!')
                      : (isAr ? 'طلب حقيبة العينات لموقع المشروع' : 'Order Free Swatch Kit')}
                  </span>
                </button>
              </div>

              {/* Direct WhatsApp Consultation */}
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 transition-all cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'محادثة استشاري المفروشات عبر واتساب' : 'Chat with Senior Furniture Architect'}</span>
              </a>

              {/* Slide Switcher Mini Dots */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] font-mono text-zinc-400">
                  {`COLLECTION 0${currentSlide + 1} / 0${HERO_SLIDES.length}`}
                </span>
                <div className="flex items-center gap-1.5">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-6 bg-[#C9A86A]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}
