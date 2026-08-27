'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const SECTORS_HERO_VIDEOS = [
  {
    id: 'hospitality',
    video: '/videos/hospitality.mp4',
    poster: undefined,
    glowColor: 'bg-sky-500/25',
    activeBtn: 'bg-[#1A476A] text-white shadow-glow-sky border border-sky-400/80 ring-1 ring-sky-400/40',
  },
  {
    id: 'manufacturing',
    video: '/videos/manufacturing.mp4',
    poster: undefined,
    glowColor: 'bg-emerald-500/25',
    activeBtn: 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/80 ring-1 ring-emerald-400/40',
  },
  {
    id: 'contracting',
    video: '/videos/contracting.mp4',
    poster: undefined,
    glowColor: 'bg-amber-500/25',
    activeBtn: 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/80 ring-1 ring-amber-400/40',
  },
];

export default function HeroSection() {
  const { lang, dict } = useLanguage();
  const [selectedSector, setSelectedSector] = useState<'hospitality' | 'manufacturing' | 'contracting'>('hospitality');
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Auto-cycle through the 3 sectors every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedSector((current) => {
        if (current === 'hospitality') return 'manufacturing';
        if (current === 'manufacturing') return 'contracting';
        return 'hospitality';
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Ensure active video is playing
  useEffect(() => {
    const activeVideo = videoRefs.current[selectedSector];
    if (activeVideo) {
      activeVideo.muted = true;
      activeVideo.play().catch(() => {});
    }
  }, [selectedSector]);

  const mediaConfig = (dict.home as any)?.media || {};

  const dynamicHeroVideos = [
    {
      id: 'hospitality',
      video: mediaConfig.hero_video_hospitality || '/videos/hospitality.mp4',
      poster: mediaConfig.hero_poster_hospitality || undefined,
      glowColor: 'bg-sky-500/25',
      activeBtn: 'bg-[#1A476A] text-white shadow-glow-sky border border-sky-400/80 ring-1 ring-sky-400/40',
    },
    {
      id: 'manufacturing',
      video: mediaConfig.hero_video_manufacturing || '/videos/manufacturing.mp4',
      poster: mediaConfig.hero_poster_manufacturing || undefined,
      glowColor: 'bg-emerald-500/25',
      activeBtn: 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/80 ring-1 ring-emerald-400/40',
    },
    {
      id: 'contracting',
      video: mediaConfig.hero_video_contracting || '/videos/contracting.mp4',
      poster: mediaConfig.hero_poster_contracting || undefined,
      glowColor: 'bg-amber-500/25',
      activeBtn: 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/80 ring-1 ring-amber-400/40',
    },
  ];

  const activeSectorConfig = dynamicHeroVideos.find(s => s.id === selectedSector) || dynamicHeroVideos[0];

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center items-center pt-32 pb-16 overflow-hidden bg-[#08090C] text-center">
      
      {/* 1. Cinematic Ambient Dynamic Video Backdrop Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {dynamicHeroVideos.map((item) => {
          const isActive = item.id === selectedSector;
          return (
            <div 
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-55' : 'opacity-0 pointer-events-none'
              }`}
            >
              <video
                ref={(el) => { videoRefs.current[item.id] = el; }}
                src={item.video}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105"
              />
            </div>
          );
        })}

        {/* Cinematic Vignette and readability protection */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/60 to-[#08090C]/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,9,12,0.85)_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"></div>

        {/* Dynamic color glow based on selected sector */}
        <div 
          className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 ${
            activeSectorConfig.glowColor
          }`}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#0F1117]/90 border border-[#C9A86A]/30 text-zinc-300 mb-8 backdrop-blur-md shadow-glow-camel">
          <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse"></span>
          <span className="font-bold text-white tracking-wide">{dict.home.hero.eyebrow}</span>
          <span className="text-[#C9A86A]/60">•</span>
          <span className="text-zinc-300 font-normal">
            {dict.home.hero.kicker}
          </span>
        </div>

        {/* Monumental 3-Line Headline */}
        <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] mb-6 max-w-5xl mx-auto drop-shadow-2xl text-center flex flex-col items-center ${lang === 'en' ? 'font-serif' : ''}`}>
          <span className="block text-white">
            {dict.home.hero.title_line1}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E3C58A] via-[#C9A86A] to-[#A4884F] py-1 drop-shadow-[0_0_35px_rgba(201,168,106,0.35)]">
            {dict.home.hero.title_line2}
          </span>
          <span className="block text-white">
            {dict.home.hero.title_line3}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal drop-shadow-md text-center">
          {dict.home.hero.body}
        </p>

        {/* Interactive Sector Switcher Dock */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl bg-[#0F1117]/90 border border-white/15 backdrop-blur-2xl mb-8 shadow-2xl max-w-full">
          {/* SwissBlue Button */}
          <button
            onClick={() => setSelectedSector('hospitality')}
            className={`relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedSector === 'hospitality'
                ? 'bg-[#1A476A] text-white shadow-glow-sky border border-sky-400/80 ring-1 ring-sky-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{(dict.home.hero as any).dock?.hospitality_label || (lang === 'ar' ? 'الضيافة (سويس بلو)' : `${dict.nav.hospitality} (SwissBlue)`)}</span>
            <span className="text-[10px] bg-sky-500/25 px-2 py-0.5 rounded-full text-sky-200 font-mono">
              {(dict.home.hero as any).dock?.hospitality_badge || (lang === 'ar' ? '6 منشآت' : '6 Properties')}
            </span>
          </button>

          {/* GreenWood Button */}
          <button
            onClick={() => setSelectedSector('manufacturing')}
            className={`relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedSector === 'manufacturing'
                ? 'bg-[#0B5C3D] text-white shadow-glow-emerald border border-emerald-400/80 ring-1 ring-emerald-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Factory className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{(dict.home.hero as any).dock?.manufacturing_label || (lang === 'ar' ? 'التصنيع والأثاث (جرين وود)' : `${dict.nav.manufacturing} (GreenWood)`)}</span>
            <span className="text-[10px] bg-emerald-500/25 px-2 py-0.5 rounded-full text-emerald-200 font-mono">
              {(dict.home.hero as any).dock?.manufacturing_badge || (lang === 'ar' ? '3 مصانع' : '3 Factories')}
            </span>
          </button>

          {/* Contracting Button */}
          <button
            onClick={() => setSelectedSector('contracting')}
            className={`relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedSector === 'contracting'
                ? 'bg-[#8A7340] text-white shadow-glow-gold border border-amber-400/80 ring-1 ring-amber-400/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{(dict.home.hero as any).dock?.contracting_label || (lang === 'ar' ? 'المقاولات والتميز الهندسي' : `${dict.nav.contracting} (Projects)`)}</span>
            <span className="text-[10px] bg-amber-500/25 px-2 py-0.5 rounded-full text-amber-200 font-mono">
              {(dict.home.hero as any).dock?.contracting_badge || (lang === 'ar' ? 'تنفيذ شامل' : 'Turnkey')}
            </span>
          </button>
        </div>

        {/* Hero Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
          <Link
            href="/about"
            className="h-11 px-6 rounded-xl text-xs sm:text-sm font-bold text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] border border-[#E3C58A]/60 hover:border-[#E3C58A] shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{dict.home.hero.primaryCta}</span>
            <ArrowUpRight className="w-4 h-4 rtl:rotate-270 shrink-0 text-[#08090C]" />
          </Link>

          <Link
            href="#sectors"
            className="h-11 px-6 rounded-xl text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{dict.home.hero.secondaryCta}</span>
            <ChevronDown className="w-4 h-4 text-[#C9A86A] shrink-0" />
          </Link>
        </div>

        {/* 4-Column Statistics Bar — Clean Custom Separators */}
        <div className="max-w-5xl mx-auto mb-6 w-full">
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-glow-card relative overflow-hidden border border-[#C9A86A]/20 bg-[#0F1117]/90 backdrop-blur-xl">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A86A]/5 via-transparent to-blue-500/5 pointer-events-none"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-0 relative">
              
              {/* Metric 1: Hospitality */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-sky-400 mb-1 font-mono">
                  <AnimatedCounter target={6} />
                </div>
                <div className="text-xs font-medium text-zinc-300 leading-snug">
                  {dict.home.metrics.stat1_text}
                </div>
              </div>

              {/* Metric 2: Factories */}
              <div className="flex flex-col items-center text-center px-4 border-s border-white/10">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-emerald-400 mb-1 font-mono">
                  <AnimatedCounter target={3} />
                </div>
                <div className="text-xs font-medium text-zinc-300 leading-snug">
                  {dict.home.metrics.stat2_text}
                </div>
              </div>

              {/* Metric 3: Employees */}
              <div className="flex flex-col items-center text-center px-4 md:border-s border-white/10">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#C9A86A] mb-1 font-mono">
                  <AnimatedCounter target={80} suffix="+" />
                </div>
                <div className="text-xs font-medium text-zinc-300 leading-snug">
                  {dict.home.metrics.stat3_text}
                </div>
              </div>

              {/* Metric 4: Sectors */}
              <div className="flex flex-col items-center text-center px-4 border-s border-white/10">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-1 font-mono">
                  <AnimatedCounter target={3} />
                </div>
                <div className="text-xs font-medium text-zinc-300 leading-snug">
                  {dict.home.metrics.stat4_text}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Scroll Cue Indicator */}
        <div className="inline-flex flex-col items-center gap-1 text-[11px] text-zinc-400 opacity-70 hover:opacity-100 transition-opacity">
          <span>{(dict.home.hero as any).scroll_cue || (lang === 'ar' ? 'استكشف المنظومة القابضة' : 'Scroll to explore')}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C9A86A]" />
        </div>

      </div>
    </section>
  );
}
