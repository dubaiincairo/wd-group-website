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
  const [config, setConfig] = useState<any>(null);

  // Fetch public chatbot config
  useEffect(() => {
    fetch('/api/chatkit/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setConfig(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Suppress completely on admin routes or maintenance screen, or if master switch is disabled
  if (pathname?.startsWith('/admin') || pathname === '/maintenance' || (config && config.enabled === false)) {
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

  const avatarUrl = config?.avatar_url || '/brand/sultan-avatar.jpg';
  const agentName = isAr ? (config?.agent_name_ar || 'سلطان') : (config?.agent_name_en || 'Sultan');
  const hintText = isAr
    ? (config?.hint_bubble_ar || `تحدث مع ${agentName} (خدمة العملاء)`)
    : (config?.hint_bubble_en || `Chat with ${agentName} (Support)`);
  const showHint = config ? config.hint_bubble_enabled !== false : true;
  const isPositionLeft = config?.position === 'bottom-left';

  const positionClassesModal = isPositionLeft
    ? 'bottom-24 left-4 sm:left-6 rtl:left-auto rtl:right-4 rtl:sm:right-6'
    : 'bottom-24 right-4 sm:right-6 rtl:right-auto rtl:left-4 rtl:sm:left-6';

  const positionClassesLauncher = isPositionLeft
    ? 'bottom-6 left-4 sm:left-6 rtl:left-auto rtl:right-4 rtl:sm:right-6'
    : 'bottom-6 right-4 sm:right-6 rtl:right-auto rtl:left-4 rtl:sm:left-6';

  return (
    <>
      {/* 1. Floating ChatKit Modal Container (Fixed & strictly inside viewport) */}
      {isOpen && (
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          lang={lang}
          className={`fixed z-50 ${positionClassesModal} w-[calc(100vw-2rem)] sm:w-[420px] max-w-[calc(100vw-2rem)] sm:max-w-[420px] h-[600px] max-h-[calc(100vh-8rem)] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] pointer-events-auto select-none animate-in fade-in slide-in-from-bottom-5 duration-200`}
        >
          <ChatKitWidget onClose={() => setIsOpen(false)} initialConfig={config} />
        </div>
      )}

      {/* 2. Floating Launcher Button Container */}
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        lang={lang}
        className={`fixed ${positionClassesLauncher} z-40 pointer-events-auto select-none flex items-center gap-3`}
      >
        {/* Helper Hint Bubble (shown until first opened) */}
        {!isOpen && !hasInteracted && showHint && (
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0B0D14]/95 border border-[#C9A86A]/40 text-[#C9A86A] text-xs font-semibold shadow-2xl backdrop-blur-xl animate-bounce">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#C9A86A]/60 shrink-0">
              <img
                src={avatarUrl}
                alt={agentName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span>{hintText}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasInteracted(true);
          }}
          className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${
            isOpen
              ? 'bg-[#0B0D14] border-2 border-[#C9A86A]/60 text-white'
              : 'border-2 border-[#C9A86A] shadow-[0_0_25px_rgba(201,168,106,0.4)] ring-2 ring-black/50'
          }`}
          title={
            isOpen
              ? (isAr ? 'إغلاق المحادثة' : 'Close Chat')
              : (isAr ? `تحدث مع ${agentName} - خدمة العملاء` : `Chat with ${agentName} - Client Support`)
          }
        >
          {/* Animated Glow Halo */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C9A86A]/40 via-amber-400/20 to-[#C9A86A]/40 blur-sm opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
          )}

          {/* Inner Image Mask Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full overflow-hidden">
            {isOpen ? (
              <X className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
            ) : (
              <img
                src={avatarUrl}
                alt={agentName}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* Animated Live Status Dot — Floating Over & Outside the Outer Rim */}
          {!isOpen && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 z-30 pointer-events-none">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-[2.5px] border-[#08090C] shadow-[0_0_12px_#10B981]" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
