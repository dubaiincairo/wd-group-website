'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Building2, Factory, HardHat, FileText, Shield } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { lang, dict } = useLanguage();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const logoSrc = lang === 'ar' ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';

  return (
    <footer className="bg-[#050608] text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          {/* Col 1: Brand & Statement */}
          <div className="space-y-3">
            <Link href="/" className="inline-block group">
              <div className={`relative h-10 ${lang === 'ar' ? 'w-44' : 'w-36'} transition-transform group-hover:scale-105`}>
                <Image 
                  src={logoSrc} 
                  alt={lang === 'ar' ? 'مجموعة دبليو دي للأعمال' : 'WD Group'} 
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="text-xs font-mono font-bold text-[#C9A86A] tracking-wider uppercase">
              {dict.footer.tagline}
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs font-normal">
              {dict.footer.statement}
            </p>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {dict.footer.col1_title}
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {dict.footer.about_us}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  {dict.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {dict.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/about#profile" className="hover:text-white transition-colors">
                  {dict.footer.profile}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {dict.footer.col2_title}
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <Link href="/sectors/hospitality" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{dict.footer.hosp_title}</span>
                </Link>
              </li>
              <li>
                <Link href="/sectors/manufacturing" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dict.footer.mfg_title}</span>
                </Link>
              </li>
              <li>
                <Link href="/sectors/contracting" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dict.footer.contr_title}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {dict.footer.col3_title}
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A86A] shrink-0 mt-0.5" />
                <span>{dict.footer.location_text}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                <a href="mailto:ceo@wdgroup.online" className="hover:text-white transition-colors" dir="ltr">
                  ceo@wdgroup.online
                </a>
              </div>
              <div className="flex items-center gap-2" dir="ltr">
                <Phone className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                <a href="tel:+966505725070" className="hover:text-white transition-colors text-[11px]">
                  +966 50 572 5070
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>
            © {currentYear} {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <span>{dict.footer.location_sa}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
