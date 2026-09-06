'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Ruler, 
  Compass, 
  FileText, 
  CheckCircle2, 
  Download,
  Box,
  Factory
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { HERO_SLIDES } from './hero/heroTypes';

export default function BespokeCadBlueprint() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'elevation' | 'specs'>('elevation');
  const [isCopied, setIsCopied] = useState(false);

  const slide = HERO_SLIDES[currentSlide];

  const handleDownloadSpecs = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="bespoke-cad" className="relative w-full py-8 sm:py-12 scroll-mt-24">
      
      {/* Precision CAD Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[#06080D] rounded-3xl -z-10" />
      <div 
        className="absolute inset-0 opacity-[0.14] pointer-events-none rounded-3xl -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(201, 168, 106, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(201, 168, 106, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="space-y-6">
        
        {/* Technical Blueprint Header Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0F121C]/85 backdrop-blur-xl border border-[#C9A86A]/30 text-xs">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-[#C9A86A] font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{isAr ? 'المواصفات الهندسية ومخططات التنفيذ المعماري' : 'ARCHITECTURAL CAD & MILLWORK DRAFTING'}</span>
            </span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline">{`DWG REF: WD-2025-0${currentSlide + 1}`}</span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-mono hidden md:inline">TOLERANCE: ±2mm</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
            <Factory className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'مصانع الرياض ونجران' : 'Riyadh & Najran Plants'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
        </div>

        {/* Blueprint Main Drafting Layout: Grid 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Visual Blueprint Center with Measurement Lines (7 cols) */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#C9A86A]/30 bg-[#0B0D14]/90 p-5 sm:p-7 flex flex-col justify-between shadow-2xl">
            
            {/* View Mode Switcher Pill */}
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-[#C9A86A] text-[#08090C] shadow-lg'
                      : 'bg-white/5 text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 inline mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{isAr ? 'منظور 3D' : '3D Perspective'}</span>
                </button>

                <button
                  onClick={() => setViewMode('elevation')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === 'elevation'
                      ? 'bg-[#C9A86A] text-[#08090C] shadow-lg'
                      : 'bg-white/5 text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5 inline mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{isAr ? 'المقاسات الهندسية' : 'CAD Dimensions'}</span>
                </button>

                <button
                  onClick={() => setViewMode('specs')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewMode === 'specs'
                      ? 'bg-[#C9A86A] text-[#08090C] shadow-lg'
                      : 'bg-white/5 text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 inline mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{isAr ? 'تحليل الهيكل والنجارة' : 'Joinery DNA'}</span>
                </button>
              </div>

              <span className="text-xs font-mono text-[#C9A86A] font-bold">
                {`SCALE 1:25`}
              </span>
            </div>

            {/* Main Drafting Photo Window with Overlay Dimension Markings */}
            <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden border border-white/10 bg-black/60 group">
              
              <Image
                src={slide.image}
                alt={isAr ? slide.titleAr : slide.titleEn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.8]"
              />

              {/* Laser Dimension Overlay */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                
                {/* Horizontal Dimension Marker Line (Top) */}
                <div className="w-full flex items-center justify-between border-t-2 border-dashed border-[#C9A86A]/80 pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
                  <span className="px-3 py-1 rounded-full bg-[#08090C]/90 text-[#C9A86A] text-[11px] font-mono font-bold border border-[#C9A86A]/40 shadow-lg">
                    {`↔ ${slide.blueprint.lengthCm} cm (طول مخصص قابل للتعديل)`}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
                </div>

                {/* Vertical Dimension Marker Line (Side) */}
                <div className="self-end h-32 flex flex-col items-center justify-between border-r-2 border-dashed border-sky-400/80 pr-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="px-2 py-0.5 rounded bg-[#08090C]/90 text-sky-300 text-[10px] font-mono font-bold border border-sky-400/40">
                    {`↕ ${slide.blueprint.heightCm} cm`}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                </div>

                {/* Plinth & Depth Callout Pill */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-zinc-300">
                    {`عمق المقعد: ${slide.blueprint.depthCm} cm`}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                    {`ارتفاع القاعدة: ${slide.blueprint.plinthRevealCm} cm مصمت`}
                  </span>
                </div>

              </div>

            </div>

            {/* Quick Slide Switcher Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 mt-4">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`py-2 px-2.5 rounded-xl text-left rtl:text-right transition-all cursor-pointer border ${
                    currentSlide === idx
                      ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-[#C9A86A]'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] font-mono block opacity-60">
                    {`DWG #0${idx + 1}`}
                  </span>
                  <span className="text-xs font-bold block truncate">
                    {isAr ? s.pieceNameAr : s.pieceNameEn}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Technical Specifications Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-3xl border border-white/10 bg-[#0F121C]/90 p-6 sm:p-8 backdrop-blur-xl">
            
            <div className="space-y-4">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? slide.tagAr : slide.tagEn}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {isAr ? slide.pieceNameAr : slide.pieceNameEn}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {isAr ? slide.subtitleAr : slide.subtitleEn}
              </p>
            </div>

            {/* Technical Engineering Checklist Matrix */}
            <div className="space-y-2.5 rounded-2xl bg-black/40 border border-white/10 p-4 text-xs font-mono">
              <div className="text-[11px] text-[#C9A86A] font-bold uppercase tracking-wider pb-1 border-b border-white/10 flex items-center justify-between">
                <span>{isAr ? 'عناصر التصنيع المعتمدة' : 'Material DNA & Tolerance'}</span>
                <span className="text-emerald-400 font-bold">APPROVED</span>
              </div>

              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">{isAr ? 'الهيكل الداخلي:' : 'Core Framework:'}</span>
                  <span className="text-[11px] text-zinc-400">{isAr ? slide.specs.woodAr : slide.specs.woodEn}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">{isAr ? 'الأنسجة والتكسيات:' : 'Fabric & Cladding:'}</span>
                  <span className="text-[11px] text-zinc-400">{isAr ? slide.specs.upholsteryAr : slide.specs.upholsteryEn}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">{isAr ? 'تعديل الأبعاد حسب المخطط:' : 'Custom CAD Blueprints:'}</span>
                  <span className="text-[11px] text-zinc-400">{isAr ? 'رفع مقاسات وتعديل 100% مجاناً للمشاريع' : '100% Bespoke shop drawings provided'}</span>
                </div>
              </div>
            </div>

            {/* CTAs & Download CAD Specs Trigger */}
            <div className="space-y-3 pt-2">
              <a
                href="#bespoke-b2b"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-xs sm:text-sm font-black text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_30px_rgba(201,168,106,0.6)] hover:scale-[1.01] transition-all cursor-pointer shadow-xl border border-[#E3C58A]"
              >
                <span>{isAr ? 'طلب تفصيل بمقاسات معمارية خاصة' : 'Request Bespoke Sizing Blueprint'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <button
                onClick={handleDownloadSpecs}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C9A86A]" />
                <span>
                  {isCopied 
                    ? (isAr ? 'تم نسخ رمز القطعة وكراسة المواصفات!' : 'Specs & SKU Copied to Clipboard!')
                    : (isAr ? 'تحميل كراسة المواصفات الهندسية (CAD Sheet)' : 'Download Technical CAD Sheet')}
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
