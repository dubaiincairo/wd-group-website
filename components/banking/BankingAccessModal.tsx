'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  CreditCard, 
  Copy, 
  Check, 
  X, 
  AlertCircle, 
  Building2, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface BankingAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BankingAccessModal({ isOpen, onClose }: BankingAccessModalProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const bDict = (dict.contact as any)?.banking || {};

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setErrorMessage(null);
      setVerifiedData(null);
      setCopiedKey(null);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/banking/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(isAr ? (json.error_ar || bDict.invalidCode) : (json.error || bDict.invalidCode));
      }

      setVerifiedData(json.data);
    } catch (err: any) {
      setErrorMessage(err.message || (isAr ? 'الرمز المدخل غير مسجل أو غير صالح' : 'The code is not registered.'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0B0D13] border border-[#C9A86A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden my-8 z-10"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#C9A86A]/15 blur-[90px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 blur-[90px] pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors z-20 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ── STAGE 1: Access Code Prompt ── */}
            {!verifiedData ? (
              <div className="relative z-10 space-y-6 pt-2">
                
                {/* Header Icon & Badges */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E3C58A] via-[#C9A86A] to-[#8A7340] p-0.5 shadow-glow-camel flex items-center justify-center">
                    <div className="w-full h-full bg-[#0B0D13] rounded-[14px] flex items-center justify-center text-[#C9A86A]">
                      <KeyRound className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#C9A86A] uppercase tracking-wider block">
                      {isAr ? '// بوابة المعاملات المالية المعتمدة' : '// PROTECTED FINANCIAL ACCESS'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {bDict.modalTitle || (isAr ? 'الحسابات البنكية الرسمية المعتمدة' : 'Official Corporate Bank Accounts')}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {bDict.modalSubtitle || (isAr 
                    ? 'أدخل رمز التحقق المالي الصادر والمعتمد من مجموعة دبليو دي للأعمال لاستعراض الحسابات البنكية والآيبان.' 
                    : 'Enter the official authorization code issued by WD Group to access verified corporate banking details.')}
                </p>

                {/* Verification Form */}
                <form onSubmit={handleVerify} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-[#C9A86A]" />
                      <span>{bDict.codeLabel || (isAr ? 'رمز التحقق المالي الصادر من المجموعة' : 'WD Group Verification Code')}</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        autoFocus
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value.toUpperCase());
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder={bDict.codePlaceholder || (isAr ? 'مثال: WD-2026' : 'e.g. WD-2026')}
                        className="w-full bg-black/60 border border-white/20 focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] rounded-2xl px-4 py-3.5 text-sm sm:text-base font-mono font-bold tracking-widest text-[#E3C58A] placeholder:text-zinc-600 focus:outline-none uppercase transition-all"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="font-bold block mb-0.5">
                          {isAr ? 'تعذر التحقق من الرمز:' : 'Access Denied:'}
                        </strong>
                        <span>{errorMessage}</span>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || !code.trim()}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C9A86A] to-[#8A7340] hover:from-[#E3C58A] hover:to-[#C9A86A] text-[#0E1A24] text-xs sm:text-sm font-extrabold shadow-glow-camel transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-[#0E1A24] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShieldCheck className="w-4 h-4" />
                      )}
                      <span>{loading ? (bDict.verifying || (isAr ? 'جارٍ التحقق…' : 'Verifying…')) : (bDict.verifyButton || (isAr ? 'التحقق واستعراض الحسابات' : 'Verify & Unlock Accounts'))}</span>
                      {!loading && <ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                    </button>
                  </div>
                </form>

                {/* Security Footer Notice */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isAr ? 'اتصال مشفر ومحمي' : 'Encrypted Financial Gateway'}</span>
                  </span>
                  <span>WD Group · Watan Designs</span>
                </div>

              </div>
            ) : (
              /* ── STAGE 2: Verified Bank Accounts Display ── */
              <div className="relative z-10 space-y-6 pt-2 animate-in fade-in duration-300">
                
                {/* Verified Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          {isAr ? 'تم التحقق بنجاح' : 'CODE VERIFIED'}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                        {isAr ? verifiedData.legalEntityAr : verifiedData.legalEntityEn}
                      </h3>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto" dir="ltr">
                    CR: {verifiedData.crNumber} · VAT: {verifiedData.vatNumber}
                  </div>
                </div>

                {/* Accounts Cards List */}
                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {verifiedData.accounts?.map((acc: any, idx: number) => {
                    const ibanKey = `iban_${idx}`;
                    const accKey = `acc_${idx}`;
                    const isIbanCopied = copiedKey === ibanKey;
                    const isAccCopied = copiedKey === accKey;

                    return (
                      <div 
                        key={idx}
                        className="bg-black/50 border border-white/10 hover:border-[#C9A86A]/40 rounded-2xl p-5 space-y-3.5 transition-all"
                      >
                        {/* Bank Card Title */}
                        <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/15 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
                              <CreditCard className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-white">
                              {isAr ? (acc.bankNameAr || acc.bankNameEn) : (acc.bankNameEn || acc.bankNameAr)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {acc.swiftCode && (
                              <span className="text-[10px] font-mono bg-white/5 text-zinc-400 px-2 py-0.5 rounded border border-white/5" dir="ltr">
                                SWIFT: {acc.swiftCode}
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-[#C9A86A] bg-[#C9A86A]/10 px-2 py-0.5 rounded">
                              {acc.currency || 'SAR'}
                            </span>
                          </div>
                        </div>

                        {/* Beneficiary Name */}
                        <div className="space-y-1 text-xs">
                          <span className="text-[11px] font-mono text-zinc-400">
                            {bDict.beneficiary || (isAr ? 'اسم المستفيد المعتمد:' : 'Beneficiary Name:')}
                          </span>
                          <div className="font-bold text-zinc-100 bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                            {isAr ? (acc.accountNameAr || acc.accountNameEn) : (acc.accountNameEn || acc.accountNameAr)}
                          </div>
                        </div>

                        {/* IBAN */}
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono text-zinc-400">
                              {bDict.ibanLabel || 'IBAN'}:
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(acc.iban, ibanKey)}
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#C9A86A] hover:text-[#E3C58A] transition-colors"
                            >
                              {isIbanCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">{bDict.copied || 'Copied!'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>{bDict.copyIban || (isAr ? 'نسخ الآيبان' : 'Copy IBAN')}</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="text-xs sm:text-sm font-mono font-bold text-[#E3C58A] bg-[#C9A86A]/10 border border-[#C9A86A]/30 px-3.5 py-2.5 rounded-xl tracking-wider select-all" dir="ltr">
                            {acc.iban}
                          </div>
                        </div>

                        {/* Account Number */}
                        {acc.accountNumber && (
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-zinc-400">
                                {bDict.accountNumber || (isAr ? 'رقم الحساب:' : 'Account Number:')}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(acc.accountNumber, accKey)}
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                              >
                                {isAccCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400 text-[10px]">{bDict.copied || 'Copied!'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span className="text-[10px]">{bDict.copyAccount || (isAr ? 'نسخ رقم الحساب' : 'Copy #')}</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="text-xs font-mono text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5" dir="ltr">
                              {acc.accountNumber}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{bDict.verifiedBadge || (isAr ? 'حسابات رسمية معتمدة وموثقة' : 'Verified Official Corporate Entity')}</span>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{bDict.closeButton || (isAr ? 'إغلاق وتأمين الجلسة' : 'Lock & Close')}</span>
                  </button>
                </div>

              </div>
            )}

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
