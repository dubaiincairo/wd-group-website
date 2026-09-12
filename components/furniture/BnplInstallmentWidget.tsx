'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Info, X, CheckCircle2, Sparkles, CreditCard, ChevronRight } from 'lucide-react';

interface BnplInstallmentWidgetProps {
  price: number;
  className?: string;
  compact?: boolean;
}

export default function BnplInstallmentWidget({
  price,
  className = '',
  compact = false,
}: BnplInstallmentWidgetProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState<'tamara' | 'tabby'>('tamara');

  const installmentAmount = Math.round(price / 4);

  return (
    <>
      {/* Widget Strip */}
      <div
        onClick={() => setModalOpen(true)}
        className={`group rounded-2xl bg-gradient-to-r from-[#121622] via-[#171C2B] to-[#121622] border border-[#C9A86A]/30 p-3 sm:p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:border-[#C9A86A]/60 hover:shadow-[0_0_20px_rgba(201,168,106,0.15)] transition-all ${className}`}
      >
        <div className="flex items-center gap-2.5">
          {/* Brand Badges */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2 py-0.5 rounded-md bg-[#FF5C39]/15 border border-[#FF5C39]/30 text-[#FF7A5C] text-[10px] font-black font-mono uppercase tracking-wider">
              TAMARA
            </span>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="px-2 py-0.5 rounded-md bg-[#3EFEBA]/15 border border-[#3EFEBA]/30 text-[#3EFEBA] text-[10px] font-black font-mono uppercase tracking-wider">
              TABBY
            </span>
          </div>

          <p className="text-xs text-zinc-300 font-medium leading-tight">
            {isAr ? (
              <>
                قسّمها على <strong className="text-white font-bold">4 دفعات</strong> بقيمة{' '}
                <span className="text-[#C9A86A] font-extrabold font-mono">
                  {installmentAmount.toLocaleString('en-US')} ر.س
                </span>{' '}
                <span className="text-emerald-400 text-[11px] font-semibold">(0% فوائد)</span>
              </>
            ) : (
              <>
                Or split into <strong className="text-white font-bold">4 payments</strong> of{' '}
                <span className="text-[#C9A86A] font-extrabold font-mono">
                  {installmentAmount.toLocaleString('en-US')} SAR
                </span>{' '}
                <span className="text-emerald-400 text-[11px] font-semibold">(0% interest)</span>
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-1 text-[#C9A86A] text-[11px] font-semibold shrink-0 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
          <span className="hidden sm:inline">{isAr ? 'اعرف المزيد' : 'Learn more'}</span>
          <Info className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Explainer Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#0F121A] border border-[#C9A86A]/40 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="space-y-1 text-left rtl:text-right">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C9A86A]" />
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {isAr ? 'الدفع الآجل الذكي (0% فوائد ورسوم)' : 'Smart Buy Now, Pay Later (0% Interest)'}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    {isAr ? 'حلول تقسيط متوافقة 100% مع الشريعة الإسلامية' : '100% Sharia-compliant installment solutions'}
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Provider Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveProvider('tamara')}
                  className={`py-2 px-3 rounded-xl border text-xs font-black font-mono transition-all flex items-center justify-center gap-2 ${
                    activeProvider === 'tamara'
                      ? 'bg-[#FF5C39]/20 border-[#FF5C39] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                >
                  <span>TAMARA · تمارا</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveProvider('tabby')}
                  className={`py-2 px-3 rounded-xl border text-xs font-black font-mono transition-all flex items-center justify-center gap-2 ${
                    activeProvider === 'tabby'
                      ? 'bg-[#3EFEBA]/20 border-[#3EFEBA] text-[#3EFEBA] shadow-lg'
                      : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                >
                  <span>TABBY · تابي</span>
                </button>
              </div>

              {/* Installment Breakdown Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 font-semibold block text-left rtl:text-right">
                  {isAr ? 'جدول الدفعات الشهرية المستحقة:' : 'Monthly Payment Schedule:'}
                </span>

                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400 font-bold block mb-1">
                      {isAr ? 'اليوم' : 'Today (25%)'}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-white block">
                      {installmentAmount.toLocaleString('en-US')}
                    </span>
                    <span className="text-[9px] text-zinc-400">SAR</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-1">
                      {isAr ? 'بعد شهر' : 'Month 1'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 block">
                      {installmentAmount.toLocaleString('en-US')}
                    </span>
                    <span className="text-[9px] text-zinc-500">SAR</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-1">
                      {isAr ? 'بعد شهرين' : 'Month 2'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 block">
                      {installmentAmount.toLocaleString('en-US')}
                    </span>
                    <span className="text-[9px] text-zinc-500">SAR</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-zinc-400 block mb-1">
                      {isAr ? 'بعد 3 أشهر' : 'Month 3'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-zinc-200 block">
                      {installmentAmount.toLocaleString('en-US')}
                    </span>
                    <span className="text-[9px] text-zinc-500">SAR</span>
                  </div>
                </div>
              </div>

              {/* 3 Steps Explainer */}
              <div className="space-y-3 pt-2 text-xs text-left rtl:text-right">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] flex items-center justify-center font-bold font-mono shrink-0 text-[10px] mt-0.5">
                    1
                  </div>
                  <p className="text-zinc-300">
                    {isAr
                      ? `اختر الدفع عبر ${activeProvider === 'tamara' ? 'تمارا' : 'تابي'} عند الوصول لصفحة إتمام الطلب.`
                      : `Select ${activeProvider === 'tamara' ? 'Tamara' : 'Tabby'} at the checkout payment stage.`}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] flex items-center justify-center font-bold font-mono shrink-0 text-[10px] mt-0.5">
                    2
                  </div>
                  <p className="text-zinc-300">
                    {isAr
                      ? 'أدخل رقم جوالك المسجل وسيصلك رمز تحقق فوري (OTP) للموافقة دون أي أوراق أو معاملات بنكية معقدة.'
                      : 'Enter your Saudi mobile number and verify via instant SMS OTP with no paperwork.'}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] flex items-center justify-center font-bold font-mono shrink-0 text-[10px] mt-0.5">
                    3
                  </div>
                  <p className="text-zinc-300">
                    {isAr
                      ? 'ادفع الدفعة الأولى فقط (25%) اليوم، ويتم جدولة باقي الدفعات شهرياً تلقائياً عبر بطاقتك البنكية.'
                      : 'Pay only the first installment (25%) today. The remaining payments are automatically debited monthly.'}
                  </p>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="p-3.5 rounded-2xl bg-[#141724] border border-white/5 flex items-center gap-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">
                  {isAr
                    ? 'بدون أي رسوم خفية أو فوائد إضافية، مرخص من البنك المركزي السعودي (ساما).'
                    : 'No hidden fees or interest, fully regulated by Saudi Central Bank (SAMA).'}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-3 rounded-xl bg-[#C9A86A] hover:bg-[#DFBA73] text-[#08090C] font-extrabold text-xs transition-colors"
              >
                {isAr ? 'فهمت ذلك، العودة للمنتج' : 'Got it, return to product'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
