'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Building2, Factory, HardHat, Sparkles } from 'lucide-react';

export default function WebsitePreloader() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  // Strictly skip rendering on admin routes
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/api');

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      return;
    }

    // Check if user already saw the full preloader in this tab session
    const hasSeen = sessionStorage.getItem('wd_preloader_seen');
    const targetDuration = hasSeen ? 600 : 1300; // swift smooth load if seen before, full luxury entrance on first load
    const intervalTime = 25;
    const totalSteps = targetDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress > 25 && currentProgress <= 60) {
        setActiveStep(1);
      } else if (currentProgress > 60 && currentProgress <= 90) {
        setActiveStep(2);
      } else if (currentProgress > 90) {
        setActiveStep(3);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setFadingOut(true);
        sessionStorage.setItem('wd_preloader_seen', 'true');
        setTimeout(() => {
          setLoading(false);
        }, 400); // fade duration
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAdminRoute]);

  if (isAdminRoute || !loading) return null;

  const sectors = [
    {
      id: 1,
      nameEn: 'SwissBlue Hospitality',
      nameAr: 'الضيافة الفندقية',
      icon: Building2,
      color: 'text-sky-400 border-sky-500/40 bg-sky-500/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]',
      inactiveColor: 'text-zinc-600 border-white/5 bg-white/[0.02]',
    },
    {
      id: 2,
      nameEn: 'GreenWood Manufacturing',
      nameAr: 'التصنيع والإنتاج',
      icon: Factory,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
      inactiveColor: 'text-zinc-600 border-white/5 bg-white/[0.02]',
    },
    {
      id: 3,
      nameEn: 'WatanDesign Contracting',
      nameAr: 'المقاولات والتجهيز',
      icon: HardHat,
      color: 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]',
      inactiveColor: 'text-zinc-600 border-white/5 bg-white/[0.02]',
    },
  ];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090C] text-white transition-all duration-500 ease-out select-none ${
        fadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Luxury Lighting Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-radial from-[#C9A86A]/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/10 blur-[90px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* WD Luxury Emblem with Shimmer Animation */}
        <div className="relative mb-8 group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#1A1C24] via-[#0F1117] to-[#08090C] border border-[#C9A86A]/40 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,106,0.2)] relative overflow-hidden">
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            
            {/* Gold WD Monogram */}
            <span className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wider bg-gradient-to-b from-[#FFF0D0] via-[#C9A86A] to-[#8C6D37] bg-clip-text text-transparent drop-shadow-md">
              WD
            </span>
          </div>

          {/* Pulsing Aura Ring */}
          <div className="absolute -inset-2 rounded-[28px] border border-[#C9A86A]/20 animate-pulse pointer-events-none" />
        </div>

        {/* Corporate Brand Identity Text */}
        <div className="space-y-1.5 mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            <span>{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP HOLDING'}</span>
            <Sparkles className="w-4 h-4 text-[#C9A86A] animate-spin-slow" />
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#C9A86A]/80 uppercase">
            {isAr ? 'الضيافة · التصنيع · المقاولات' : 'Hospitality · Manufacturing · Contracting'}
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="w-full max-w-xs space-y-3 mb-8">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">
              {isAr ? 'جارٍ تهيئة المنظومة…' : 'INITIALIZING HOLDING ECOSYSTEM'}
            </span>
            <span className="text-[#C9A86A] font-bold">
              {progress}%
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-[#C9A86A] via-blue-500 to-[#C9A86A] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(201,168,106,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Three Holding Ecosystem Sector Indicators */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            const isSectorActive = activeStep >= sec.id;

            return (
              <div
                key={sec.id}
                className={`p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-1.5 ${
                  isSectorActive ? sec.color : sec.inactiveColor
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-300 ${isSectorActive ? 'scale-110' : 'opacity-40'}`} />
                <span className={`text-[10px] font-bold leading-tight line-clamp-1 ${isSectorActive ? 'text-white' : 'text-zinc-600'}`}>
                  {isAr ? sec.nameAr : sec.nameEn.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Luxury Footer Tag */}
      <div className="absolute bottom-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        {isAr ? 'رؤية المملكة 2030 · التميز المؤسسي' : 'Kingdom Vision 2030 · Corporate Excellence'}
      </div>
    </div>
  );
}
