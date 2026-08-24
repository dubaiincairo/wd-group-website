'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ArrowRight, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const SECTORS_VIDEO_DATA = [
  {
    id: 'hospitality',
    nameEn: 'Hospitality',
    nameAr: 'الضيافة',
    subEn: 'SwissBlue',
    subAr: 'SwissBlue',
    video: '/videos/hospitality.mp4',
    poster: '/images/hospitality-hero.jpg',
    color: 'from-sky-600 to-blue-800',
    tagColor: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
    activeBtn: 'border-sky-400 bg-sky-500/20 text-white shadow-[0_0_20px_rgba(56,189,248,0.35)]',
    gradientOverlay: 'from-[#08090C]/90 via-[#08090C]/65 to-[#08090C]/90',
  },
  {
    id: 'manufacturing',
    nameEn: 'Manufacturing & Furniture',
    nameAr: 'التصنيع والأثاث',
    subEn: 'GreenWood',
    subAr: 'GreenWood',
    video: '/videos/manufacturing.mp4',
    poster: '/images/manufacturing-hero.jpg',
    color: 'from-emerald-600 to-teal-800',
    tagColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    activeBtn: 'border-emerald-400 bg-emerald-500/20 text-white shadow-[0_0_20px_rgba(52,211,153,0.35)]',
    gradientOverlay: 'from-[#08090C]/90 via-[#08090C]/65 to-[#08090C]/90',
  },
  {
    id: 'contracting',
    nameEn: 'Contracting & Fit-Out',
    nameAr: 'المقاولات والتجهيز الداخلي',
    subEn: 'Projects',
    subAr: 'Projects',
    video: '/videos/contracting.mp4',
    poster: '/images/contracting-hero.jpg',
    color: 'from-amber-600 to-yellow-800',
    tagColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    activeBtn: 'border-amber-400 bg-amber-500/20 text-white shadow-[0_0_20px_rgba(251,191,36,0.35)]',
    gradientOverlay: 'from-[#08090C]/90 via-[#08090C]/65 to-[#08090C]/90',
  }
];

export default function HeroSection() {
  const { lang, dict } = useLanguage();
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Rotate background video every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSectorIndex((prev) => (prev + 1) % SECTORS_VIDEO_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Ensure active video is playing smoothly
  useEffect(() => {
    const activeVideo = videoRefs.current[activeSectorIndex];
    if (activeVideo) {
      activeVideo.muted = true;
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  }, [activeSectorIndex]);

  const activeSector = SECTORS_VIDEO_DATA[activeSectorIndex];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#08090C]">
      
      {/* Dynamic Sector Video Backdrops with Opacity Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {SECTORS_VIDEO_DATA.map((sector, index) => {
          const isActive = index === activeSectorIndex;
          return (
            <div
              key={sector.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={sector.poster}
                className="absolute inset-0 w-full h-full object-cover scale-105"
              >
                <source src={sector.video} type="video/mp4" />
              </video>
              <div className={`absolute inset-0 bg-gradient-to-b ${sector.gradientOverlay}`} />
            </div>
          );
        })}
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-dot-matrix opacity-25" />
      </div>

      {/* Blueprint Location Tag */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-wider">
          <span className="hidden sm:inline-block">
            {lang === 'ar' ? 'المقر الرئيسي · نجران، المملكة العربية السعودية' : 'HEADQUARTERS · NAJRAN, SAUDI ARABIA'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-blue-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            {dict.home.hero.kicker}
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-surface/90 border border-white/15 text-blue-300 shadow-glow-card backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>{dict.home.hero.eyebrow}</span>
          </div>

          {/* H1 Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
            {dict.home.hero.title}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal text-balance">
            {dict.home.hero.body}
          </p>

          {/* Interactive Sector Switcher Pills */}
          <div className="pt-3 pb-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {SECTORS_VIDEO_DATA.map((sec, idx) => {
              const isCurrent = idx === activeSectorIndex;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectorIndex(idx)}
                  className={`group relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 flex items-center gap-2 backdrop-blur-md ${
                    isCurrent 
                      ? sec.activeBtn 
                      : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {sec.id === 'hospitality' && <Building2 className="w-3.5 h-3.5 text-sky-400" />}
                  {sec.id === 'manufacturing' && <Factory className="w-3.5 h-3.5 text-emerald-400" />}
                  {sec.id === 'contracting' && <HardHat className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{lang === 'ar' ? sec.nameAr : sec.nameEn}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isCurrent ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-500'
                  }`}>
                    {sec.subEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{dict.home.hero.primaryCta}</span>
            </Link>

            <a
              href="#sectors"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-zinc-200 hover:text-white bg-brand-surface/80 hover:bg-brand-surface border border-white/15 hover:border-white/25 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{dict.home.hero.secondaryCta}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>

        </div>
      </div>

      {/* 4-Metric Statistics Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="glass-card rounded-3xl p-5 sm:p-6 border border-white/15 shadow-2xl backdrop-blur-xl bg-brand-surface/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10">
            
            {/* Stat 1: 6 Hospitality Properties */}
            <div className="text-center px-2 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-glow">
                <AnimatedCounter target={6} />
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                {dict.home.metrics.stat1_text}
              </p>
            </div>

            {/* Stat 2: 3 Specialized Factories */}
            <div className="text-center px-2 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                <AnimatedCounter target={3} />
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                {dict.home.metrics.stat2_text}
              </p>
            </div>

            {/* Stat 3: 80+ Specialized Team */}
            <div className="text-center px-2 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight">
                <AnimatedCounter target={80} suffix="+" />
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                {dict.home.metrics.stat3_text}
              </p>
            </div>

            {/* Stat 4: 3 Strategic Business Sectors */}
            <div className="text-center px-2 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-4xl font-extrabold text-sky-400 font-mono tracking-tight">
                <AnimatedCounter target={3} />
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">
                {dict.home.metrics.stat4_text}
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
