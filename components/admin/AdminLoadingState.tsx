'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles } from 'lucide-react';

interface AdminLoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  minHeight?: string;
}

export default function AdminLoadingState({
  message,
  fullScreen = false,
  minHeight = 'min-h-[420px]',
}: AdminLoadingStateProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const logoSrc = isAr ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';
  const logoAlt = isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group';
  const defaultMsg = isAr ? 'جارٍ تحميل البيانات وإعداد المنظومة…' : 'LOADING HOLDING CONSOLE DATA…';

  const content = (
    <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center select-none animate-in fade-in duration-300">
      {/* Ambient Luxury Lighting Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-radial from-[#C9A86A]/15 via-blue-600/10 to-transparent blur-[90px] pointer-events-none" />

      {/* Real Brand Logo with Luxury Pulse */}
      <div className="relative mb-5 flex items-center justify-center">
        <div className={`relative h-12 sm:h-14 ${isAr ? 'w-52 sm:w-60' : 'w-44 sm:w-52'}`}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            className="object-contain drop-shadow-[0_0_24px_rgba(201,168,106,0.35)]"
            priority
          />
        </div>
        <div className="absolute -inset-4 rounded-3xl bg-[#C9A86A]/10 blur-xl -z-10 animate-pulse" />
      </div>

      {/* Corporate Brand Identity */}
      <div className="space-y-1 mb-6">
        <h3 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
          <span>{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP HOLDING'}</span>
          <Sparkles className="w-3 h-3 text-[#C9A86A]" />
        </h3>
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#C9A86A]/85 uppercase">
          {isAr ? 'الضيافة · التصنيع · المقاولات' : 'Hospitality · Manufacturing · Contracting'}
        </p>
      </div>

      {/* Luxury Shimmer Progress Track */}
      <div className="w-full max-w-xs space-y-2">
        <p className="text-[11px] font-mono text-zinc-400 font-medium">
          {message || defaultMsg}
        </p>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[0.5px]">
          <div className="h-full bg-gradient-to-r from-[#C9A86A] via-blue-500 to-[#C9A86A] rounded-full animate-pulse shadow-[0_0_12px_rgba(201,168,106,0.6)] w-full" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        lang={lang}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090C] text-white"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      lang={lang}
      className={`w-full ${minHeight} flex flex-col items-center justify-center relative overflow-hidden rounded-3xl bg-[#08090C]/40 border border-white/5`}
    >
      {content}
    </div>
  );
}
