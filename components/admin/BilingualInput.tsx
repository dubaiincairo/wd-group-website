'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface BilingualInputProps {
  label: string;
  description?: string;
  valueEn: string;
  valueAr: string;
  onChangeEn: (val: string) => void;
  onChangeAr: (val: string) => void;
  isTextarea?: boolean;
  rows?: number;
  placeholderEn?: string;
  placeholderAr?: string;
  required?: boolean;
}

export default function BilingualInput({
  label,
  description,
  valueEn,
  valueAr,
  onChangeEn,
  onChangeAr,
  isTextarea = false,
  rows = 3,
  placeholderEn = 'English text…',
  placeholderAr = 'أدخل النص العربي…',
  required = false,
}: BilingualInputProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'both' | 'en' | 'ar'>(isAr ? 'ar' : 'en');

  // Keep default active tab synchronized with the admin console language
  useEffect(() => {
    setActiveTab(isAr ? 'ar' : 'en');
  }, [isAr]);

  const isEnComplete = Boolean(valueEn?.trim());
  const isArComplete = Boolean(valueAr?.trim());

  return (
    <div className="space-y-2 bg-[#12151F] border border-white/10 rounded-2xl p-4 sm:p-5 transition-colors focus-within:border-blue-500/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <span>{label}</span>
            {required && <span className="text-rose-400 text-xs">*</span>}
          </label>
          {description && (
            <p className="text-[11px] text-zinc-400 mt-0.5">{description}</p>
          )}
        </div>

        {/* Locale tabs (Arabic is default in Arabic mode, English is default in English mode) */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-0.5" dir={isAr ? 'rtl' : 'ltr'}>
          {isAr ? (
            <>
              <button
                type="button"
                onClick={() => setActiveTab('ar')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'ar'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>العربية</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isArComplete ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>الإنجليزية</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isEnComplete ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('both')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeTab === 'both'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                عرض مزدوج
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>English</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isEnComplete ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ar')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'ar'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>Arabic</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isArComplete ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('both')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeTab === 'both'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
            </>
          )}
        </div>
      </div>

      <div className={`grid gap-3 pt-1 ${activeTab === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Arabic Field */}
        {(activeTab === 'both' || activeTab === 'ar') && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="font-bold text-sky-400">{isAr ? 'الحقل العربي (RTL)' : 'Arabic (RTL)'}</span>
              <span>{valueAr?.length || 0} {isAr ? 'حرف' : 'chars'}</span>
            </div>
            {isTextarea ? (
              <textarea
                dir="rtl"
                rows={rows}
                value={valueAr || ''}
                onChange={(e) => onChangeAr(e.target.value)}
                placeholder={placeholderAr}
                className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors font-arabic leading-relaxed resize-y"
              />
            ) : (
              <input
                type="text"
                dir="rtl"
                value={valueAr || ''}
                onChange={(e) => onChangeAr(e.target.value)}
                placeholder={placeholderAr}
                className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors font-arabic"
              />
            )}
          </div>
        )}

        {/* English Field */}
        {(activeTab === 'both' || activeTab === 'en') && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="font-bold text-blue-400">{isAr ? 'الحقل الإنجليزي (LTR)' : 'English (LTR)'}</span>
              <span>{valueEn?.length || 0} {isAr ? 'حرف' : 'chars'}</span>
            </div>
            {isTextarea ? (
              <textarea
                dir="ltr"
                rows={rows}
                value={valueEn || ''}
                onChange={(e) => onChangeEn(e.target.value)}
                placeholder={placeholderEn}
                className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors font-sans leading-relaxed resize-y"
              />
            ) : (
              <input
                type="text"
                dir="ltr"
                value={valueEn || ''}
                onChange={(e) => onChangeEn(e.target.value)}
                placeholder={placeholderEn}
                className="w-full bg-[#08090C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors font-sans"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
