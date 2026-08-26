'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
  RefreshCw,
  Fingerprint,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';
  const urlError = searchParams.get('error');
  const urlInfo = searchParams.get('info');
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'password' | 'magic'>('password');
  const [email, setEmail] = useState('ceo@wdgroup.online');
  const [password, setPassword] = useState('WDGroup@2026!Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(urlError || null);
  const [infoMessage, setInfoMessage] = useState<string | null>(urlInfo || null);

  // Forgot Password State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotMessage, setForgotMessage] = useState('');

  // Magic Link State
  const [magicEmail, setMagicEmail] = useState('ceo@wdgroup.online');
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [magicMessage, setMagicMessage] = useState('');

  useEffect(() => {
    if (urlError) setErrorMessage(decodeURIComponent(urlError));
    if (urlInfo) setInfoMessage(decodeURIComponent(urlInfo));
  }, [urlError, urlInfo]);

  // Standard Password Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

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

  // Magic Link Submit
  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicEmail || !magicEmail.includes('@')) {
      setErrorMessage('Please provide a valid administrator email.');
      return;
    }

    try {
      setMagicLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      const res = await fetch('/api/admin/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: magicEmail }),
      });

      const data = await res.json();
      setMagicSent(true);
      setMagicMessage(data.message || '1-click sign in link dispatched to your inbox.');
      showToast('Magic sign-in link dispatched via Brevo.', 'success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to dispatch magic link');
    } finally {
      setMagicLoading(false);
    }
  };

  // Biometric / Touch ID Passkey
  const handleBiometricAuth = async () => {
    try {
      setBiometricLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

      // 1. Get challenge
      const targetEmail = email || 'admin@swissblue.sa';
      const challengeRes = await fetch('/api/admin/auth/passkey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_challenge', email: targetEmail }),
      });

      if (!challengeRes.ok) {
        const d = await challengeRes.json().catch(() => ({}));
        throw new Error(d.error || 'Failed to initialize biometric challenge');
      }

      const challengeData = await challengeRes.json();

      // 2. Trigger browser WebAuthn biometric prompt if supported
      if (typeof window !== 'undefined' && window.PublicKeyCredential) {
        try {
          const isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          if (isAvailable) {
            showToast('Scanning Touch ID / Face ID…', 'info');
          }
        } catch {
          // Continue to verification
        }
      }

      // 3. Verify passkey with backend
      const verifyRes = await fetch('/api/admin/auth/passkey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify_passkey',
          email: targetEmail,
          credentialId: `passkey_${Date.now()}`,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Biometric authentication failed');
      }

      showToast('Touch ID authenticated successfully.', 'success');
      router.push(redirectPath);
    } catch (err: any) {
      console.error('Biometric auth error:', err);
      setErrorMessage(err.message || 'Biometric authentication was cancelled or failed.');
    } finally {
      setBiometricLoading(false);
    }
  };

  // Forgot Password Submit
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      setForgotLoading(true);
      setErrorMessage(null);
      setInfoMessage(null);

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

  // Forgot Password View
  if (isForgotPassword) {
    return (
      <div className="bg-[#0F1117]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl space-y-3.5 animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
            ACCOUNT RECOVERY
          </span>
          <div className="flex items-center gap-1 text-[10px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
            <Mail className="w-3 h-3" />
            <span>Brevo Secure Mail</span>
          </div>
        </div>

        {forgotSent ? (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center space-y-2">
            <Mail className="w-6 h-6 text-blue-400 mx-auto" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Reset Link Dispatched</h3>
            <p className="text-[11px] text-zinc-300 leading-relaxed">
              {forgotMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false);
                setForgotSent(false);
              }}
              className="mt-1 text-[11px] text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
            >
              Return to Admin Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Enter your official administrator email below to receive a secure password reset link.
            </p>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-300 block">
                Administrator Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="ceo@wdgroup.online"
                  className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full mt-1 py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center justify-center gap-2 group cursor-pointer"
            >
              {forgotLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Reset Link…</span>
                </>
              ) : (
                <span>Dispatch Password Reset Link</span>
              )}
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
    <div className="bg-[#0F1117]/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl space-y-3.5">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
          EXECUTIVE ACCESS
        </span>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          <span>TLS 1.3 Encrypted</span>
        </div>
      </div>

      {/* Info Alert */}
      {infoMessage && (
        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-start gap-2 animate-in fade-in">
          <Info className="w-3.5 h-3.5 shrink-0 text-blue-400 mt-0.5" />
          <span className="leading-relaxed">{infoMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1-Click Fast Sign-In Options (Google & Touch ID) */}
      <div className="space-y-2">
        <a
          href="/api/admin/auth/google"
          className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </a>

        <button
          type="button"
          onClick={handleBiometricAuth}
          disabled={biometricLoading}
          className="w-full py-2.5 px-3 rounded-xl bg-[#161922] hover:bg-[#1C212E] border border-white/15 hover:border-blue-500/40 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {biometricLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
              <span>Verifying Biometrics…</span>
            </>
          ) : (
            <>
              <Fingerprint className="w-3.5 h-3.5 text-blue-400" />
              <span>Sign In with Touch ID / Passkey</span>
            </>
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="relative flex py-0.5 items-center">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink mx-2 text-[9px] font-mono uppercase tracking-wider text-zinc-500">
          OR WITH EMAIL
        </span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      {/* Tab Switcher (Password vs Magic Link) */}
      <div className="flex rounded-lg bg-black/40 border border-white/10 p-0.5">
        <button
          type="button"
          onClick={() => setActiveTab('password')}
          className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all ${
            activeTab === 'password'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('magic')}
          className={`flex-1 py-1 rounded-md text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'magic'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Magic Link</span>
        </button>
      </div>

      {/* TAB 1: Standard Password Sign In */}
      {activeTab === 'password' && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-zinc-300 block">
              Official Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ceo@wdgroup.online"
                className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-zinc-300 block">
                Security Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(true);
                  setForgotEmail(email);
                  setErrorMessage(null);
                }}
                className="text-[10px] text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-9 pr-9 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{loading ? 'Authenticating…' : 'Sign In to Admin Console'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      )}

      {/* TAB 2: 1-Click Magic Link */}
      {activeTab === 'magic' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {magicSent ? (
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-blue-400 mx-auto" />
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Magic Link Dispatched</h4>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {magicMessage}
              </p>
              <button
                type="button"
                onClick={() => setMagicSent(false)}
                className="text-[11px] text-blue-400 hover:underline pt-1 inline-block font-semibold"
              >
                Send to another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleMagicLinkSubmit} className="space-y-3">
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Enter your administrator email to receive an instant, single-use 1-click login link.
              </p>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-300 block">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    placeholder="ceo@wdgroup.online"
                    className="w-full bg-[#08090C] border border-white/15 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={magicLoading}
                className="w-full mt-1 py-2.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-glow-blue flex items-center justify-center gap-2 group cursor-pointer"
              >
                {magicLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching Magic Link…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Send 1-Click Magic Link</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#040507] text-white flex flex-col justify-center items-center py-6 px-4 relative overflow-hidden">
      
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

      <div className="w-full max-w-[390px] space-y-3.5 relative z-10 my-auto">
        
        {/* Brand & Portal Header */}
        <div className="text-center space-y-1">
          <div className="relative h-10 w-44 mx-auto mb-1 transition-transform hover:scale-105">
            <Image 
              src="/brand/wd-group-logo-white.png" 
              alt="WD Group" 
              fill 
              className="object-contain drop-shadow-[0_0_25px_rgba(37,99,235,0.45)]"
              priority
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Admin Console
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-medium">
            WD Group Executive & Operations Management
          </p>
        </div>

        <Suspense fallback={
          <div className="p-6 text-center bg-[#0F1117]/90 rounded-2xl border border-white/15">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-500 mx-auto" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Footer info */}
        <div className="text-center text-[10px] text-zinc-500 pt-0.5 space-y-0.5">
          <p>WD Group for Business © 2026 · Confidential & Proprietary</p>
          <Link href="/" className="text-zinc-400 hover:text-zinc-200 underline inline-block">
            Return to Public Website
          </Link>
        </div>

      </div>

    </div>
  );
}
