'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  Sparkles, 
  ExternalLink, 
  ShoppingCart, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  Cpu,
  Palette
} from 'lucide-react';
import VisualStudio from '@/components/admin/ecommerce/ai-hub/VisualStudio';
import ContentStudio from '@/components/admin/ecommerce/ai-hub/ContentStudio';
import type { AiStudioMode } from '@/components/admin/ecommerce/ai-hub/types';
import { FurnitureItem } from '@/lib/furnitureData';

function AiStudioContent() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Mode state from URL query or default to 'visual'
  const modeQuery = searchParams.get('mode') as AiStudioMode | null;
  const [currentMode, setCurrentMode] = useState<AiStudioMode>(
    modeQuery === 'content' ? 'content' : 'visual'
  );

  // Bridged image from Visual Studio to Content Studio
  const [bridgedImage, setBridgedImage] = useState<{ url: string; prompt?: string } | null>(null);

  // Sync mode changes with URL query string
  const handleModeChange = (newMode: AiStudioMode) => {
    setCurrentMode(newMode);
    router.replace(`/admin/ai-studio?mode=${newMode}`, { scroll: false });
  };

  // Sync when searchParams change externally
  useEffect(() => {
    if (modeQuery === 'content' || modeQuery === 'visual') {
      setCurrentMode(modeQuery);
    }
  }, [modeQuery]);

  const handleSendToContent = (imageUrl: string, suggestedPrompt?: string) => {
    setBridgedImage({ url: imageUrl, prompt: suggestedPrompt });
    handleModeChange('content');
    showToast(
      isAr 
        ? 'تم نقل الصورة المعدلة بنجاح إلى استوديو المحتوى والكتالوج ✓' 
        : 'Remastered photo successfully sent to Content Studio ✓', 
      'info'
    );
  };

  const handleAddProduct = (product: FurnitureItem) => {
    try {
      if (typeof window !== 'undefined') {
        const existing = localStorage.getItem('wd_custom_products');
        const list: FurnitureItem[] = existing ? JSON.parse(existing) : [];
        const updated = [product, ...list.filter((p) => p.id !== product.id)];
        localStorage.setItem('wd_custom_products', JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Failed to cache custom product in localStorage:', e);
    }
  };

  const ArrowIcon = isAr ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Breadcrumbs & Top Quick Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2 font-mono">
          <Link href="/admin" className="hover:text-white transition-colors">
            {isAr ? 'لوحة التحكم' : 'Admin'}
          </Link>
          <ArrowIcon className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/admin/ecommerce" className="hover:text-white transition-colors">
            {isAr ? 'المتجر والعمليات' : 'Commercial & Sales'}
          </Link>
          <ArrowIcon className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-amber-400 font-bold">
            {isAr ? 'استوديو الذكاء الاصطناعي' : 'AI Creative Studio'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/ecommerce?tab=products"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>{isAr ? 'عرض كتالوج المنتجات' : 'View Catalog Products'}</span>
          </Link>
          <Link
            href="/admin/system/settings#secrets"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-all"
            title={isAr ? 'إدارة مفاتيح API' : 'Manage API Keys'}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isAr ? 'مفاتيح الربط' : 'API Secrets'}</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#121420] via-[#0E1017] to-[#0A0B10] border border-[#C9A86A]/30 shadow-2xl space-y-4">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-transparent border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>{isAr ? 'مركز الذكاء الاصطناعي المزدوج' : 'WD ENTERPRISE AI CREATIVE HUB'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isAr
                ? 'استوديو المعالجة البصرية والمحتوى الذكي'
                : 'Dual-Engine AI Creative Studio & Catalog Merchandising'}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              {isAr
                ? 'بيئة عمل متكاملة لتعديل صور الأثاث بنماذج NanoBanana Pro التوليدية من Google Flow، وتوليد المواصفات والكتالوجات الاحترافية بضغطة زر واحدة.'
                : 'High-performance workspace for generative furniture photo editing via Google NanoBanana Pro models and autonomous catalog specification generation.'}
            </p>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{isAr ? 'Google Gemini (NanoBanana Pro) متصل' : 'Google Gemini (NanoBanana Pro) Active'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>{isAr ? 'OpenAI GPT-4o Vision متصل' : 'OpenAI Vision Active'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isAr ? 'إدراج الكتالوج المباشر مفعل' : 'Catalog Publishing Ready'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 3. Studio Mode Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#0D0F18] border border-white/10 shadow-lg">
        
        {/* Tab 1: Visual Studio */}
        <button
          type="button"
          onClick={() => handleModeChange('visual')}
          className={`p-4 rounded-xl text-left rtl:text-right transition-all cursor-pointer flex items-center justify-between gap-3 ${
            currentMode === 'visual'
              ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-transparent border border-amber-500/40 text-white shadow-xl ring-1 ring-amber-500/30'
              : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-transform ${
              currentMode === 'visual' 
                ? 'bg-amber-500 text-black shadow-lg scale-105' 
                : 'bg-white/5 text-zinc-400'
            }`}>
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">
                  {isAr ? '1. استوديو المعالجة البصرية' : '1. Visual Studio'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                  NanoBanana
                </span>
              </div>
              <span className="text-xs text-zinc-400 block pt-0.5">
                {isAr
                  ? 'تحسين وتعديل خلفيات وإضاءة صور الأثاث التوليدية بنموذج NanoBanana Pro'
                  : 'Generative photo remastering, background replacement, and architectural lighting'}
              </span>
            </div>
          </div>

          {currentMode === 'visual' && (
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse shrink-0" />
          )}
        </button>

        {/* Tab 2: Content Studio */}
        <button
          type="button"
          onClick={() => handleModeChange('content')}
          className={`p-4 rounded-xl text-left rtl:text-right transition-all cursor-pointer flex items-center justify-between gap-3 ${
            currentMode === 'content'
              ? 'bg-gradient-to-r from-purple-500/20 via-purple-500/15 to-transparent border border-purple-500/40 text-white shadow-xl ring-1 ring-purple-500/30'
              : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-transform ${
              currentMode === 'content' 
                ? 'bg-purple-600 text-white shadow-lg scale-105' 
                : 'bg-white/5 text-zinc-400'
            }`}>
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">
                  {isAr ? '2. استوديو المحتوى والكتالوج' : '2. Content Studio'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                  GPT-4o Vision
                </span>
              </div>
              <span className="text-xs text-zinc-400 block pt-0.5">
                {isAr
                  ? 'استخراج المواصفات، كتابة المحتوى الفاخر بالعربية والإنجليزية، والإدراج المباشر'
                  : 'Automated technical spec extraction, bilingual luxury copywriting, and live catalog publishing'}
              </span>
            </div>
          </div>

          {currentMode === 'content' && (
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse shrink-0" />
          )}
        </button>

      </div>

      {/* 4. Active Studio Canvas (Full-Width, Zero Popup Constraints) */}
      <div className="rounded-3xl bg-[#090A10]/80 border border-white/10 p-5 sm:p-8 shadow-2xl backdrop-blur-md">
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
            onAddProduct={handleAddProduct}
            showToast={showToast}
          />
        )}
      </div>

    </div>
  );
}

export default function AiStudioAdminPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400 font-mono">Loading AI Creative Studio...</div>}>
      <AiStudioContent />
    </Suspense>
  );
}
