'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Lock, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft,
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Globe,
  Sparkles
} from 'lucide-react';

function SiteAccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAr = lang === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage(
        isAr 
          ? 'يرجى إدخال كلمة المرور للمتابعة.' 
          : 'Please enter the access password.'
      );
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/site-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error || (isAr ? 'كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.' : 'Incorrect access password. Please try again.')
        );
      }

      // Valid password - navigate to intended destination or refresh
      // Using window.location.href ensures a clean full-page load with the new cookie
      window.location.href = returnUrl;
    } catch (err: any) {
      setErrorMessage(err.message || (isAr ? 'تعذر التحقق من كلمة المرور.' : 'Failed to verify password.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`w-full max-w-[440px] space-y-5 relative z-10 my-auto ${isAr ? 'text-right' : 'text-left'}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Language Toggle & Security Badge */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-[11px] text-[#C9A86A] bg-[#C9A86A]/10 border border-[#C9A86A]/20 px-3 py-1 rounded-full font-mono uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAr ? 'وصول خاص محمي' : 'Restricted Access'}</span>
        </div>

        <button
          type="button"
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="relative h-14 w-52 mx-auto mb-2 transition-transform hover:scale-105">
          <Image 
            src="/brand/wd-group-logo-white.png" 
            alt="WD Group" 
            fill 
            className="object-contain drop-shadow-[0_0_30px_rgba(201,168,106,0.35)]"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {isAr ? 'بوابة المعاينة الحصرية' : 'Executive Portal Access'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium px-4">
          {isAr 
            ? 'هذا الموقع في وضع المعاينة المسبقة والمشروطة. يرجى إدخال كلمة المرور المعتمدة للمتابعة.'
            : 'This site is currently in restricted executive preview mode. Please enter the authorized password to continue.'}
        </p>
      </div>

      {/* Main Glassmorphic Card */}
      <div className="bg-[#0D0F15]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 block">
              {isAr ? 'كلمة المرور الخاصة' : 'Security Password'}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-zinc-500`}>
                <KeyRound className="w-4 h-4 text-[#C9A86A]" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isAr ? 'أدخل كلمة المرور...' : 'Enter access password...'}
                className={`w-full bg-[#06080B] border border-white/15 focus:border-[#C9A86A] rounded-xl ${isAr ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-3 text-sm sm:text-base text-white placeholder:text-zinc-600 focus:outline-none transition-all shadow-inner`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isAr ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center text-zinc-500 hover:text-zinc-300 transition-colors`}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#B39355] hover:from-[#D4B57A] hover:to-[#C1A062] disabled:opacity-50 text-black text-sm font-black transition-all shadow-[0_0_25px_rgba(201,168,106,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>{isAr ? 'جارٍ التحقق...' : 'Authenticating...'}</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>{isAr ? 'دخول الموقع' : 'Unlock Executive Access'}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                )}
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C9A86A]" />
            <span>{isAr ? 'جلسة مشفرة لمدة 30 يوماً' : '30-Day Encrypted Session'}</span>
          </span>
          <span className="font-mono">TLS 1.3</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-zinc-500 pt-2 space-y-1">
        <p>WD Group for Business © 2026 · All Rights Reserved</p>
        <p className="text-zinc-600 text-[10px]">Confidential & Proprietary Infrastructure</p>
      </div>
    </div>
  );
}

export default function SiteAccessPage() {
  return (
    <div className="min-h-screen bg-[#040507] text-white flex flex-col justify-center items-center py-8 px-4 relative overflow-hidden">
      
      {/* Background Video Backdrop */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster=""
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-40"
        >
          <source src="/videos/hospitality.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#040507]/95 via-[#040507]/85 to-[#040507]/95 backdrop-blur-[4px]" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A86A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense fallback={
        <div className="p-8 text-center bg-[#0D0F15]/90 rounded-3xl border border-white/15 relative z-10">
          <RefreshCw className="w-6 h-6 animate-spin text-[#C9A86A] mx-auto" />
        </div>
      }>
        <SiteAccessForm />
      </Suspense>

    </div>
  );
}
