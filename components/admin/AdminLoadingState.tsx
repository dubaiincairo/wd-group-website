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

  const defaultMsg = isAr ? 'جارٍ التحميل…' : 'Loading workspace…';

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-6 select-none animate-in fade-in duration-150">
      <div className="w-8 h-8 rounded-full border-2 border-[#C9A86A] border-t-transparent animate-spin" />
      <p className="text-xs font-mono text-zinc-400">
        {message || defaultMsg}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        lang={lang}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#08090C] text-white"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      lang={lang}
      className={`w-full ${minHeight} flex-1 flex items-center justify-center`}
    >
      {content}
    </div>
  );
}
