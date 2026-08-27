'use client';

import React, { useState, useEffect } from 'react';
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
  minHeight = 'min-h-[70vh]',
}: AdminLoadingStateProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1400; // 1.4s elegant duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(1, elapsed / duration);
      
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const currentProgress = Math.min(100, Math.round(eased * 100));
      setProgress(currentProgress);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setProgress(100);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const logoSrc = isAr ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';
  const logoAlt = isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group';
  const defaultMsg = isAr ? 'جارٍ تحميل البيانات وإعداد المنظومة…' : 'LOADING HOLDING CONSOLE DATA…';

  const content = (
    <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center select-none animate-in fade-in duration-300">
      {/* Ambient Luxury Lighting Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-radial from-[#C9A86A]/10 via-blue-600/5 to-transparent blur-[100px] pointer-events-none" />

      {/* Expanding 1px Laser Horizon Line */}
      <div className="relative w-full max-w-xs flex items-center justify-center mb-6">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A]/60 to-transparent" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C9A86A] shadow-[0_0_12px_#C9A86A] animate-ping" />
      </div>

      {/* Real Brand Logo with Shimmer Overlay */}
      <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-2xl p-2">
        <div className={`relative h-12 sm:h-14 ${isAr ? 'w-52 sm:w-60' : 'w-44 sm:w-52'}`}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            sizes="(max-width: 640px) 208px, 240px"
            className="object-contain drop-shadow-[0_0_20px_rgba(201,168,106,0.3)]"
            priority
          />
        </div>
        {/* Angled metallic light sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A86A]/30 to-transparent -skew-x-12 animate-[shimmer_2.5s_infinite] pointer-events-none" />
      </div>

      {/* Corporate Brand Identity */}
      <div className="space-y-1 mb-6">
        <h3 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
          <span>{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP HOLDING'}</span>
          <Sparkles className="w-3 h-3 text-[#C9A86A]" />
        </h3>
        <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
          {isAr ? 'شركة قابضة · المملكة العربية السعودية' : 'HOLDING COMPANY · SAUDI ARABIA'}
        </p>
      </div>

      {/* Minimal Precision Digital Progress Counter & Hairline Bar */}
      <div className="w-full max-w-xs space-y-3 mb-2">
        <div className="text-center font-mono text-2xl sm:text-3xl font-extrabold text-[#C9A86A] tracking-tighter">
          {String(progress).padStart(2, '0')}
          <span className="text-xs text-zinc-500 ml-1 rtl:mr-1 rtl:ml-0 font-normal">%</span>
        </div>

        {/* Precision 2px Hairline Track */}
        <div className="w-48 sm:w-56 mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C9A86A] via-[#E3C58A] to-[#C9A86A] shadow-[0_0_10px_#C9A86A]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
          {message || defaultMsg}
        </p>
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
      className={`w-full ${minHeight} flex-1 flex flex-col items-center justify-center relative overflow-hidden py-12`}
    >
      {content}
    </div>
  );
}
