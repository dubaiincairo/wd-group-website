'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';
  const { showToast } = useToast();

  const [email, setEmail] = useState('admin@swissblue.sa');
  const [password, setPassword] = useState('WDGroup@2026!Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot Password State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await res.text();
      let data: { error?: string } = {};
      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          if (res.ok) {
            throw new Error('Authentication service returned an invalid response.');
          }
        }
      }

      if (!res.ok) {
        throw new Error(data.error || `Authentication failed (${res.status}). Please check your credentials.`);
      }

      showToast('Welcome back. Authenticated successfully.', 'success');
      router.push(redirectPath);
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      setForgotLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/admin/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      setForgotSent(true);
      setForgotMessage(data.message || 'If an account exists, a reset link has been dispatched.');
      showToast('Password reset instructions dispatched via email.', 'success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to dispatch reset link');
    } finally {
      setForgotLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="bg-[#0F1117]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            ACCOUNT RECOVERY
          </span>
          <div className="flex items-center gap-1.5 text-[11px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
            <Mail className="w-3.5 h-3.5" />
            <span>Brevo Secure Mail</span>
          </div>
        </div>

        {forgotSent ? (
          <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center space-y-3">
            <Mail className="w-8 h-8 text-blue-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Reset Link Dispatched</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {forgotMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false);
                setForgotSent(false);
              }}
              className="mt-3 text-xs text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
            >
              Return to Admin Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enter your official administrator email below to receive a secure password reset link.
            </p>

            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 block">
                Administrator Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@wdgroup.sa"
                  className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue flex items-center justify-center gap-2 group cursor-pointer"
            >
              {forgotLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Reset Link…</span>
                </>
              ) : (
                <span>Dispatch Password Reset Link</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Back to sign in
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#0F1117]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
          STAFF ACCESS
        </span>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TLS 1.3 Encrypted</span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300 block">
            Official Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wdgroup.sa"
              className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-zinc-300 block">
              Security Password
            </label>
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(true);
                setForgotEmail(email);
                setErrorMessage(null);
              }}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-11 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-glow-blue flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>{loading ? 'Authenticating…' : 'Sign In to Admin Console'}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#040507] text-white flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Background Video Backdrop with Hero Section Overlay Style */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://cdn.sanity.io/images/uoj8zwj3/production/00b20cc6cb3d8c613964965da5556e8396305950-2400x1792.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/videos/hospitality.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/80 to-[#08090C]/95 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-dot-matrix opacity-25" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Brand & Portal Header */}
        <div className="text-center space-y-3">
          <div className="relative h-14 w-52 mx-auto mb-2 transition-transform hover:scale-105">
            <Image 
              src="/brand/wd-group-logo-white.png" 
              alt="WD Group" 
              fill 
              className="object-contain drop-shadow-[0_0_25px_rgba(37,99,235,0.45)]"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            WD Group Executive & Operations Management
          </p>
        </div>

        <Suspense fallback={
          <div className="p-8 text-center bg-[#0F1117]/90 rounded-3xl border border-white/15">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500 mx-auto" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Footer info */}
        <div className="text-center text-[11px] text-zinc-600">
          <p>WD Group for Business © 2026 · Confidential & Proprietary</p>
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 underline mt-1 inline-block">
            Return to Public Website
          </Link>
        </div>

      </div>

    </div>
  );
}
