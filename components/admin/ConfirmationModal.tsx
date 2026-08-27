import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const defaultConfirmLabel = confirmLabel || (isAr ? 'تأكيد' : 'Confirm');
  const defaultCancelLabel = cancelLabel || (isAr ? 'إلغاء' : 'Cancel');

  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => confirmButtonRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-md bg-[#0F1117] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isDestructive 
              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400' 
              : 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h3 id="modal-title" className="text-lg font-bold text-white">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {defaultCancelLabel}
          </button>

          <button
            ref={confirmButtonRef}
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-lg disabled:opacity-50 cursor-pointer ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/30'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/30'
            }`}
          >
            {isLoading ? (isAr ? 'جارٍ المعالجة…' : 'Processing…') : defaultConfirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
