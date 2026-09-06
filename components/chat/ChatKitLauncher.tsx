'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, MessageSquare, X } from 'lucide-react';
import ChatKitWidget from './ChatKitWidget';

export default function ChatKitLauncher() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Suppress completely on admin routes or maintenance screen
  if (pathname?.startsWith('/admin') || pathname === '/maintenance') {
    return null;
  }

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      lang={lang}
      className="fixed bottom-6 end-6 z-40 pointer-events-auto select-none"
    >
      {/* 1. Floating ChatKit Modal Container */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-0 end-0 inset-x-4 sm:inset-x-auto w-auto sm:w-[440px] h-[640px] max-h-[85vh] mb-16 sm:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-200">
          <ChatKitWidget onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* 2. Floating Launcher Button */}
      <div className="relative flex items-center gap-3">
        {/* Helper Hint Bubble (shown until first opened) */}
        {!isOpen && !hasInteracted && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0D14]/95 border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-semibold shadow-2xl backdrop-blur-xl animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'المساعد الذكي لمجموعة WD' : 'WD Group AI Concierge'}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${
            isOpen
              ? 'bg-[#151926] border-white/20 text-white'
              : 'bg-gradient-to-br from-[#121624] via-[#0B0D14] to-[#1a1f33] border-[#C9A86A]/50 text-[#C9A86A] hover:border-[#C9A86A] shadow-[0_0_35px_rgba(201,168,106,0.3)]'
          }`}
          title={
            isOpen
              ? (isAr ? 'إغلاق المحادثة' : 'Close Chat')
              : (isAr ? 'المساعد الذكي لمجموعة WD' : 'Open WD Group AI Concierge')
          }
        >
          {/* Animated Glow Ring */}
          {!isOpen && (
            <>
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C9A86A]/30 to-blue-600/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-[#0B0D14]"></span>
              </span>
            </>
          )}

          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
            ) : (
              <div className="flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#C9A86A] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
