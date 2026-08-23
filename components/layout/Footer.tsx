'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ExternalLink, 
  Globe, 
  Mail, 
  Phone
} from 'lucide-react';

export default function Footer() {
  const { lang, dict, toggleLanguage } = useLanguage();

  return (
    <footer className="bg-brand-darker text-white border-t border-brand-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-border">
          
          {/* Col 1 & 2: Holding Brand Info & Tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3.5 group mb-4 inline-flex">
              <div className="relative h-11 w-40">
                <Image 
                  src="/brand/wd-group-logo.png" 
                  alt="WD Group" 
                  fill
                  className="object-contain drop-shadow-[0_0_12px_rgba(37,99,235,0.3)]"
                />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 font-mono">
                HOLDING
              </span>
            </Link>

            {/* Approved Tagline */}
            <div className="text-xs font-extrabold text-blue-400 tracking-widest uppercase mb-3">
              {dict.footer.tagline}
            </div>

            {/* Approved Description */}
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              {dict.footer.description}
            </p>

            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-zinc-300 px-3 py-1 rounded-full bg-brand-surface border border-brand-border shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{lang === 'ar' ? 'مواكبة لرؤية المملكة ٢٠٣٠' : 'Aligned with Saudi Vision 2030'}</span>
            </div>
          </div>

          {/* Col 3: Company (الشركة) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
              {dict.footer.col1_title}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  {dict.footer.about_us}
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-white transition-colors">
                  {dict.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  {dict.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sectors (القطاعات) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
              {dict.footer.col2_title}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="#hospitality" className="hover:text-sky-300 transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{dict.footer.hosp_title}</span>
                </Link>
              </li>
              <li>
                <Link href="#manufacturing" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dict.footer.mfg_title}</span>
                </Link>
              </li>
              <li>
                <Link href="#contracting" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dict.footer.contr_title}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Connect (تواصل) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
              {dict.footer.col3_title}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a 
                  href="https://swissblue.sa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sky-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{dict.footer.swissblue}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link 
                  href="#manufacturing" 
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{dict.footer.greenwood}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li className="pt-2 border-t border-brand-border flex items-center gap-1.5 text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${dict.footer.email}`} className="hover:underline">
                  {dict.footer.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300 font-mono">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${dict.footer.phone.replace(/\\s/g, '')}`} className="hover:underline">
                  {dict.footer.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Language */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="text-zinc-400">{dict.footer.location_sa}</span>
            <button 
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 text-zinc-300 hover:text-white font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
