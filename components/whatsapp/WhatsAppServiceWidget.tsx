'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageCircle, 
  X, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  Building2, 
  Factory, 
  Briefcase, 
  ChevronRight,
  ExternalLink 
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER } from '@/lib/whatsapp/businessService';

interface ServiceChannel {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: any;
  defaultMsgAr: string;
  defaultMsgEn: string;
}

const SERVICE_CHANNELS: ServiceChannel[] = [
  {
    id: 'furniture',
    titleAr: 'تصنيع الأثاث والأعمال الخشبية',
    titleEn: 'Custom Furniture & Joinery',
    descAr: 'مصنع الأخشاب الخضراء بالرياض والمصانع الوطنية',
    descEn: 'Green Wood Factory (Riyadh) & specialized plants',
    icon: Factory,
    defaultMsgAr: 'السلام عليكم، أود الاستفسار عن تفصيل وتصنيع الأثاث الفندقي/السكني وتجهيز المشاريع لدى مصانع مجموعة دبليو دي.',
    defaultMsgEn: 'Hello, I would like to inquire about bespoke luxury furniture and hotel fit-out solutions from WD Group factories.',
  },
  {
    id: 'hospitality',
    titleAr: 'الضيافة وفنادق سويس بلو',
    titleEn: 'Hospitality & SwissBlue Hotels',
    descAr: 'الفنادق، الأجنحة، والشراكات الفندقية',
    descEn: 'Hotels, boutique suites, and hospitality management',
    icon: Building2,
    defaultMsgAr: 'السلام عليكم، أود الاستفسار عن قطاع الضيافة وفنادق سويس بلو وعروض الإقامة والشراكات الاستثمارية.',
    defaultMsgEn: 'Hello, I have an inquiry regarding SwissBlue Hotels hospitality portfolio and development partnerships.',
  },
  {
    id: 'contracting',
    titleAr: 'المقاولات العامة والتجهيزات',
    titleEn: 'Turnkey Contracting & Fitouts',
    descAr: 'المشاريع الإنشائية، الكهروميكانيكية، وتجهيز المواقع',
    descEn: 'Commercial construction, MEP, and turnkey solutions',
    icon: Building2,
    defaultMsgAr: 'السلام عليكم، نرغب في تقديم استفسار / مناقصة لمشروع مقاولات وتجهيزات متكاملة لدى مجموعة دبليو دي.',
    defaultMsgEn: 'Hello, we would like to submit an inquiry/tender for general contracting and architectural fitout services with WD Group.',
  },
  {
    id: 'hr',
    titleAr: 'الموارد البشرية والتوظيف',
    titleEn: 'Human Capital & Careers',
    descAr: 'استفسارات المرشحين والفرص المهنية',
    descEn: 'Talent recruitment, career opportunities, and ATS',
    icon: Briefcase,
    defaultMsgAr: 'السلام عليكم، أود الاستفسار والتواصل مع إدارة الموارد البشرية والكفاءات بمجموعة دبليو دي للأعمال.',
    defaultMsgEn: 'Hello, I would like to reach out to the Human Capital & Talent Acquisition team at WD Group.',
  },
];

export default function WhatsAppServiceWidget() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  // Hide on admin routes and maintenance
  if (pathname?.startsWith('/admin') || pathname === '/maintenance') {
    return null;
  }

  const handleLaunchWhatsApp = (text: string) => {
    const cleanNumber = OFFICIAL_WHATSAPP_NUMBER;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. Floating WhatsApp Business Service Drawer */}
      {isOpen && (
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="fixed z-50 bottom-24 right-4 sm:right-6 rtl:right-auto rtl:left-4 rtl:sm:left-6 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl bg-[#0B141A]/95 border border-emerald-500/30 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#128C7E] to-[#075E54] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-sm text-[#F5E4BD] shrink-0">
                WD
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <span>{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group Holding'}</span>
                  <ShieldCheck className="w-4 h-4 text-[#F5E4BD]" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>{isAr ? 'خدمة فورية عبر واتساب الأعمال' : 'Instant WhatsApp Service'}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 space-y-4 max-h-[460px] overflow-y-auto">
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isAr
                ? 'مرحباً بك! اختر القسم المعني لبدء محادثة مباشرة وفورية مع ممثلينا المعتمدين عبر تطبيق واتساب:'
                : 'Welcome! Select your topic of interest to begin an instant WhatsApp chat with our corporate desk:'}
            </p>

            {/* Channels List */}
            <div className="space-y-2">
              {SERVICE_CHANNELS.map((ch) => {
                const IconComponent = ch.icon;
                const defaultMsg = isAr ? ch.defaultMsgAr : ch.defaultMsgEn;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleLaunchWhatsApp(defaultMsg)}
                    className="w-full text-left rtl:text-right p-3 rounded-2xl bg-[#141E24]/80 hover:bg-[#1A262E] border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {isAr ? ch.titleAr : ch.titleEn}
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          {isAr ? ch.descAr : ch.descEn}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 rtl:rotate-180 transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Custom Input Option */}
            <div className="pt-2 border-t border-white/5">
              <label className="text-[11px] font-mono text-zinc-400 block mb-1.5">
                {isAr ? 'أو اكتب استفسارك الخاص مباشرة:' : 'Or type a custom message:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customMsg.trim()) {
                      handleLaunchWhatsApp(customMsg.trim());
                    }
                  }}
                  placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Type your question...'}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#141E24] border border-white/10 focus:border-emerald-400 focus:outline-none text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customMsg.trim()) {
                      handleLaunchWhatsApp(customMsg.trim());
                    }
                  }}
                  disabled={!customMsg.trim()}
                  className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold disabled:opacity-40 transition-all cursor-pointer"
                  title={isAr ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
                >
                  <Send className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-[#091014] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>{isAr ? 'الرقم المعتمد: ' : 'Verified Desk: '}+{OFFICIAL_WHATSAPP_NUMBER}</span>
            <span className="text-emerald-400 font-semibold">{isAr ? 'مجموعة دبليو دي' : 'WD Group'}</span>
          </div>
        </div>
      )}

      {/* 2. Floating Launcher Trigger Button */}
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="fixed bottom-6 right-20 sm:right-24 rtl:right-auto rtl:left-20 rtl:sm:left-24 z-40 pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_10px_35px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border ${
            isOpen
              ? 'bg-[#0B141A] border-2 border-emerald-400 text-white'
              : 'bg-emerald-500 hover:bg-emerald-400 border-2 border-white/20 text-black'
          }`}
          title={isAr ? 'خدمة واتساب الأعمال الرسمية' : 'Official WhatsApp Business Service'}
          aria-label={isAr ? 'خدمة واتساب الأعمال' : 'WhatsApp Business Service'}
        >
          {/* Animated Glow */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-emerald-400/40 blur-sm opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-black drop-shadow-sm" />
          )}

          {/* Status Dot */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#08090C]" />
            </span>
          )}
        </button>
      </div>
    </>
  );
}
