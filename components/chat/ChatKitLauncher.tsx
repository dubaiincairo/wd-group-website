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
    <>
      {/* 1. Floating ChatKit Modal Container (Fixed & strictly inside viewport) */}
      {isOpen && (
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          lang={lang}
          className="fixed z-50 bottom-24 right-4 sm:right-6 rtl:right-auto rtl:left-4 rtl:sm:left-6 w-[calc(100vw-2rem)] sm:w-[420px] max-w-[calc(100vw-2rem)] sm:max-w-[420px] h-[600px] max-h-[calc(100vh-8rem)] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] pointer-events-auto select-none animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <ChatKitWidget onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* 2. Floating Launcher Button Container */}
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        lang={lang}
        className="fixed bottom-6 right-4 sm:right-6 rtl:right-auto rtl:left-4 rtl:sm:left-6 z-40 pointer-events-auto select-none flex items-center gap-3"
      >
        {/* Helper Hint Bubble (shown until first opened) */}
        {!isOpen && !hasInteracted && (
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B0D14]/95 border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-semibold shadow-2xl backdrop-blur-xl animate-bounce">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C9A86A]/60 shrink-0">
              <img
                src="/brand/sultan-avatar.jpg"
                alt="Sultan"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span>{isAr ? 'تحدث مع سلطان (خدمة العملاء)' : 'Chat with Sultan (Support)'}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border overflow-hidden ${
            isOpen
              ? 'bg-[#151926] border-white/20 text-white'
              : 'border-[#C9A86A]/60 hover:border-[#C9A86A] shadow-[0_0_35px_rgba(201,168,106,0.35)]'
          }`}
          title={
            isOpen
              ? (isAr ? 'إغلاق المحادثة' : 'Close Chat')
              : (isAr ? 'تحدث مع سلطان - خدمة العملاء' : 'Chat with Sultan - Customer Care')
          }
        >
          {/* Animated Glow Ring */}
          {!isOpen && (
            <>
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C9A86A]/30 to-blue-600/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 flex h-3 w-3 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 ring-2 ring-[#0B0D14]"></span>
              </span>
            </>
          )}

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
            ) : (
              <img
                src="/brand/sultan-avatar.jpg"
                alt="Sultan"
                className="w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </button>
      </div>
    </>
  );
}
