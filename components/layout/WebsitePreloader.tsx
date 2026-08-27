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

    // Smooth 60fps requestAnimationFrame luxury counter
    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 1600; // 1.6s elegant duration

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
        setTimeout(() => {
          setFadingOut(true);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('website_preloader_done'));
          }
          setTimeout(() => {
            setLoading(false);
          }, 450);
        }, 250); // brief hold on 100%
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-radial from-[#C9A86A]/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Expanding 1px Laser Horizon Line */}
        <div className="relative w-full max-w-xs flex items-center justify-center mb-7">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A]/60 to-transparent" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C9A86A] shadow-[0_0_12px_#C9A86A] animate-ping" />
        </div>

        {/* Real Brand Logo with Shimmer Overlay */}
        <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-2xl p-2">
          {isAr ? (
            <div className="relative h-12 sm:h-14 w-52 sm:w-60">
              <Image
                src="/brand/wd-group-logo-ar-white.png"
                alt="مجموعة دبليو دي للأعمال"
                fill
                sizes="(max-width: 640px) 208px, 240px"
                className="object-contain drop-shadow-[0_0_20px_rgba(201,168,106,0.3)]"
                priority
              />
            </div>
          ) : (
            <div className="relative h-12 sm:h-14 w-44 sm:w-52">
              <Image
                src="/brand/wd-group-logo-white.png"
                alt="WD Group"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain drop-shadow-[0_0_20px_rgba(201,168,106,0.3)]"
                priority
              />
            </div>
          )}
          {/* Angled metallic light sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A86A]/30 to-transparent -skew-x-12 animate-[shimmer_2.5s_infinite] pointer-events-none" />
        </div>

        {/* Corporate Brand Identity Subtitle */}
        <div className="space-y-1 mb-8">
          <h2 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD GROUP HOLDING'}</span>
            <Sparkles className="w-3 h-3 text-[#C9A86A]" />
          </h2>
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
            {isAr ? 'شركة قابضة · المملكة العربية السعودية' : 'HOLDING COMPANY · SAUDI ARABIA'}
          </p>
        </div>

        {/* Minimal Precision Digital Progress Counter & Hairline Bar */}
        <div className="w-full max-w-xs space-y-3 mb-6">
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

          <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            {isAr ? 'جارٍ تهيئة البوابة المؤسسية…' : 'ESTABLISHING SECURE GATEWAY'}
          </div>
        </div>

      </div>

      {/* Luxury Footer Tag */}
      <div className="absolute bottom-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        {isAr ? 'رؤية المملكة 2030 · التميز المؤسسي' : 'Kingdom Vision 2030 · Corporate Excellence'}
      </div>
    </div>
  );
}
