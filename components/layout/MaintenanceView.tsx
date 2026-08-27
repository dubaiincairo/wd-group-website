'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Wrench, Globe, Lock, ShieldCheck } from 'lucide-react';
import type { SiteSettings } from '@/lib/admin/types';

interface MaintenanceViewProps {
  settings?: Partial<SiteSettings> | null;
}

export default function MaintenanceView({ settings }: MaintenanceViewProps) {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isAr = lang === 'ar';

  const headline = isAr
    ? (settings?.maintenance_headline_ar || 'المنصة تحت الصيانة والتطوير')
    : (settings?.maintenance_headline_en || 'Platform Under Scheduled Maintenance');

  const message = isAr
    ? (settings?.maintenance_message_ar || 'نعمل حالياً على تطوير وتجهيز المنصة الرقمية الرسمية لمجموعة دبليو دي للأعمال. سنكون معكم قريباً بحلتنا الجديدة.')
    : (settings?.maintenance_message_en || 'We are currently preparing and upgrading the official digital platform for WD Group. We look forward to welcoming you soon.');

  const estimated = settings?.maintenance_estimated_date || '2026';
  const email = settings?.general_email || settings?.secondary_email || 'ceo@wdgroup.online';
  const phone = settings?.primary_phone || settings?.secondary_phone || '+966 50 572 5070';
  const headquarters = isAr
    ? (settings?.headquarters_ar || 'طريق الملك عبدالعزيز، حي الخالدية، نجران، المملكة العربية السعودية')
    : (settings?.headquarters_en || 'King Abdulaziz Road, Al Khalidiya, Najran, Saudi Arabia');

  const logoSrc = isAr ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';
  const logoAlt = isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group';

  return (
    <div className="min-h-screen bg-[#040507] text-white flex flex-col justify-between items-center p-4 sm:p-8 relative overflow-hidden font-sans">
      
      {/* Background Video Backdrop */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ transform: 'translateZ(0)' }}
        >
          <source src="/videos/hospitality.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/95 via-[#08090C]/90 to-[#08090C]/98" />
        <div className="absolute inset-0 bg-dot-matrix opacity-20" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-amber-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Language Switcher & Maintenance Indicator */}
      <header className="w-full max-w-4xl flex items-center justify-between relative z-10 pt-2">
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping inline-block" />
          <span className="text-amber-400 font-bold uppercase tracking-wider">
            {isAr ? 'وضع الصيانة نشط' : 'Maintenance Mode Active'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-zinc-200 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Center Main Card */}
      <main className="w-full max-w-2xl my-auto py-12 relative z-10 text-center space-y-8 animate-in fade-in zoom-in-95 duration-300" dir={isAr ? 'rtl' : 'ltr'}>
        
        {/* Real Brand Logo */}
        <div className="relative mb-2 flex items-center justify-center">
          <div className={`relative h-14 sm:h-16 ${isAr ? 'w-60 sm:w-72' : 'w-52 sm:w-64'}`}>
            <Image 
              src={logoSrc} 
              alt={logoAlt} 
              fill 
              className="object-contain drop-shadow-[0_0_30px_rgba(201,168,106,0.4)]"
              priority
            />
          </div>
        </div>

        {/* Maintenance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-bold tracking-wide shadow-sm">
          <Wrench className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'تحديث وتجهيز المنظومة الرقمية' : 'Digital Platform Upgrade In Progress'}</span>
        </div>

        {/* Main Headings */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {headline}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto font-normal">
            {message}
          </p>
        </div>

        {/* Contact Coordinates Box */}
        <div className="bg-[#0F1117]/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-left rtl:text-right">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              {isAr ? 'قنوات التواصل المباشرة' : 'EXECUTIVE INQUIRIES'}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {isAr ? `الموعد المتوقع: ${estimated}` : `Expected: ${estimated}`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase">{isAr ? 'البريد الإلكتروني' : 'Executive Email'}</p>
                <a href={`mailto:${email}`} className="text-zinc-200 hover:text-white font-bold transition-colors" dir="ltr">
                  {email}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase">{isAr ? 'الهاتف المباشر' : 'Direct Phone'}</p>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-zinc-200 hover:text-white font-bold transition-colors" dir="ltr">
                  {phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{headquarters}</span>
          </div>
        </div>

      </main>

      {/* Footer & Staff Portal Link */}
      <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 relative z-10 pt-4 border-t border-white/10">
        <p>WD Group for Business © 2026 · {isAr ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
        
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full cursor-pointer"
        >
          <Lock className="w-3 h-3 text-blue-400" />
          <span>{isAr ? 'بوابة الإدارة للموظفين' : 'Staff Admin Console'}</span>
        </Link>
      </footer>

    </div>
  );
}
