'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  ExternalLink
} from 'lucide-react';
import { AiStudioMode } from './types';
import VisualStudio from './VisualStudio';
import ContentStudio from './ContentStudio';
import { FurnitureItem } from '@/lib/furnitureData';

interface AiHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AiStudioMode;
  isAr: boolean;
  onAddProduct: (product: FurnitureItem) => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export default function AiHubModal({
  isOpen,
  onClose,
  initialMode = 'visual',
  isAr,
  onAddProduct,
  showToast
}: AiHubModalProps) {
  const [currentMode, setCurrentMode] = useState<AiStudioMode>(initialMode);
  const [bridgedImage, setBridgedImage] = useState<{ url: string; prompt?: string } | null>(null);

  // Sync mode if initialMode prop changes
  useEffect(() => {
    if (initialMode) {
      setCurrentMode(initialMode);
    }
  }, [initialMode]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendToContent = (imageUrl: string, suggestedPrompt?: string) => {
    setBridgedImage({ url: imageUrl, prompt: suggestedPrompt });
    setCurrentMode('content');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Darkened Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Hub Modal Frame */}
      <div className="relative w-full max-w-6xl bg-[#0B0D14] border border-[#C9A86A]/30 rounded-3xl p-5 sm:p-8 text-white shadow-2xl space-y-6 z-10 my-4 max-h-[92vh] overflow-y-auto">
        
        {/* Hub Header & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-white/10 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{isAr ? 'مركز الذكاء الاصطناعي للمتجر' : 'WD GROUP AI HUB'}</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isAr
                ? 'استوديو المعالجة البصرية والمحتوى الذكي'
                : 'Dual-Engine AI Studio Suite & Catalog Hub'}
            </h2>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isAr ? 'OpenAI Vision متصل مباشر' : 'OpenAI Vision Direct Live'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>{isAr ? 'NanoBanana Pro متصل مباشر' : 'NanoBanana Pro Direct Live'}</span>
              </div>
              <a
                href="/admin/system/settings#secrets"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#C9A86A] underline underline-offset-4 text-[10px]"
              >
                <span>{isAr ? 'إدارة وفحص المفاتيح' : 'Manage Keys'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer self-start md:self-center"
            title={isAr ? 'إغلاق (Esc)' : 'Close (Esc)'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Segmented Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#141721] border border-white/10">
          
          {/* Mode 1: Visual Studio */}
          <button
            type="button"
            onClick={() => setCurrentMode('visual')}
            className={`p-3.5 rounded-xl text-left rtl:text-right transition-all cursor-pointer flex items-center justify-between gap-3 ${
              currentMode === 'visual'
                ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-transparent border border-amber-500/40 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                currentMode === 'visual' ? 'bg-amber-500 text-black shadow-md' : 'bg-white/5 text-zinc-400'
              }`}>
                🎨
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold block">
                  {isAr ? '1. استوديو المعالجة البصرية' : '1. Visual Studio'}
                </span>
                <span className="text-[10px] text-zinc-400 block font-mono">
                  {isAr ? 'تحسين إضاءة الصور بـ NanoBanana Pro' : 'NanoBanana Pro Photo Remaster'}
                </span>
              </div>
            </div>

            {currentMode === 'visual' && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            )}
          </button>

          {/* Mode 2: Content Studio */}
          <button
            type="button"
            onClick={() => setCurrentMode('content')}
            className={`p-3.5 rounded-xl text-left rtl:text-right transition-all cursor-pointer flex items-center justify-between gap-3 ${
              currentMode === 'content'
                ? 'bg-gradient-to-r from-purple-500/20 via-purple-500/15 to-transparent border border-purple-500/40 text-white shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                currentMode === 'content' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-zinc-400'
              }`}>
                ✍️
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold block">
                  {isAr ? '2. استوديو المحتوى والكتالوج' : '2. Content Studio'}
                </span>
                <span className="text-[10px] text-zinc-400 block font-mono">
                  {isAr ? 'توليد المواصفات والإدراج المباشر' : 'Autonomous Spec Extraction & Cataloging'}
                </span>
              </div>
            </div>

            {currentMode === 'content' && (
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping shrink-0" />
            )}
          </button>

        </div>

        {/* Active Studio Viewport */}
        <div className="pt-2">
          {currentMode === 'visual' ? (
            <VisualStudio
              isAr={isAr}
              onSendToContentStudio={handleSendToContent}
              showToast={showToast}
            />
          ) : (
            <ContentStudio
              isAr={isAr}
              incomingImage={bridgedImage}
              onClearIncomingImage={() => setBridgedImage(null)}
              onAddProduct={onAddProduct}
              showToast={showToast}
            />
          )}
        </div>

      </div>

    </div>
  );
}
