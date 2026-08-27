'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function WebsitePreloader({ forced = false }: { forced?: boolean }) {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeLang, setActiveLang] = useState<'ar' | 'en'>('ar');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Resolve language with absolute priority from localStorage or active context
    let resolved: 'ar' | 'en' = 'ar';
    try {
      const saved = localStorage.getItem('wd_lang');
      if (saved === 'ar' || saved === 'en') {
        resolved = saved;
      } else if (lang === 'en' || lang === 'ar') {
        resolved = lang;
      }
    } catch (e) {
      resolved = lang === 'en' ? 'en' : 'ar';
    }
    setActiveLang(resolved);
    setMounted(true);

    // Run swift smooth preloader timer
    const hasSeen = sessionStorage.getItem('wd_preloader_seen');
    const targetDuration = (hasSeen && !forced) ? 280 : 550;
    const intervalTime = 16;
    const totalSteps = Math.max(1, Math.round(targetDuration / intervalTime));
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setFadingOut(true);
        sessionStorage.setItem('wd_preloader_seen', 'true');
        setTimeout(() => {
          setLoading(false);
        }, 300); // quick fade
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [forced, lang]);

  if (!loading || !mounted) return null;

  const isAr = activeLang === 'ar';

  return (
    <div
      key={`preloader-${activeLang}`}
      dir={isAr ? 'rtl' : 'ltr'}
      lang={activeLang}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090C] text-white transition-all duration-300 ease-out select-none ${
        fadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Luxury Lighting Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-[#C9A86A]/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#C9A86A]/10 blur-[90px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Real Brand Logo (Strictly Single Language Asset) */}
        <div className="relative mb-6 flex items-center justify-center">
          {isAr ? (
            <div className="relative h-14 sm:h-16 w-56 sm:w-64">
              <Image
                src="/brand/wd-group-logo-ar-white.png"
                alt="مجموعة دبليو دي للأعمال"
                fill
                className="object-contain drop-shadow-[0_0_24px_rgba(201,168,106,0.35)]"
                priority
              />
            </div>
          ) : (
            <div className="relative h-14 sm:h-16 w-48 sm:w-56">
              <Image
                src="/brand/wd-group-logo-white.png"
                alt="WD Group"
                fill
                className="object-contain drop-shadow-[0_0_24px_rgba(201,168,106,0.35)]"
                priority
              />
            </div>
          )}
          <div className="absolute -inset-4 rounded-3xl bg-[#C9A86A]/10 blur-xl -z-10 animate-pulse" />
        </div>

        {/* Corporate Brand Identity Subtitle */}
        <div className="space-y-1 mb-8">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP HOLDING'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
          </h2>
          <p className="text-[11px] sm:text-xs font-mono tracking-widest text-[#C9A86A]/85 uppercase">
            {isAr ? 'الضيافة · التصنيع · المقاولات' : 'Hospitality · Manufacturing · Contracting'}
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="w-full max-w-xs space-y-2.5 mb-6">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 font-medium">
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

      </div>

      {/* Luxury Footer Tag */}
      <div className="absolute bottom-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
        {isAr ? 'رؤية المملكة 2030 · التميز المؤسسي' : 'Kingdom Vision 2030 · Corporate Excellence'}
      </div>
    </div>
  );
}
