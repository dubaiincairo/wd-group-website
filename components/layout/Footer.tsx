'use client';

import React from 'react';
import Link from 'next/link';
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
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Multi-Column Grid (Untitled UI Footer Pattern) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200">
          
          {/* Col 1 & 2: Holding Brand Info & Tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-extrabold text-sm tracking-wider shadow-xs">
                <span className="font-mono">WD</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={`font-bold tracking-tight text-gray-900 text-base sm:text-lg ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {dict.nav.brand}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    Holding
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium -mt-0.5">
                  {dict.nav.holding}
                </span>
              </div>
            </Link>

            {/* Approved Tagline */}
            <div className="text-xs font-semibold text-brand-700 tracking-wider uppercase mb-3">
              {dict.footer.tagline}
            </div>

            {/* Approved Description */}
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm mb-6 font-normal">
              {dict.footer.description}
            </p>

            {/* Untitled UI Status Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{lang === 'ar' ? 'مواكبة لرؤية المملكة ٢٠٣٠' : 'Aligned with Saudi Vision 2030'}</span>
            </div>
          </div>

          {/* Col 3: Company (الشركة) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">
              {dict.footer.col1_title}
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#about" className="hover:text-gray-900 font-medium transition-colors">
                  {dict.footer.about_us}
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-gray-900 font-medium transition-colors">
                  {dict.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gray-900 font-medium transition-colors">
                  {dict.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sectors (القطاعات) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">
              {dict.footer.col2_title}
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#hospitality" className="hover:text-[#1A476A] font-medium transition-colors flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#1A476A]" />
                  <span>{dict.footer.hosp_title}</span>
                </Link>
              </li>
              <li>
                <Link href="#manufacturing" className="hover:text-[#0B5C3D] font-medium transition-colors flex items-center gap-2">
                  <Factory className="w-4 h-4 text-[#0B5C3D]" />
                  <span>{dict.footer.mfg_title}</span>
                </Link>
              </li>
              <li>
                <Link href="#contracting" className="hover:text-[#8A7340] font-medium transition-colors flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-[#8A7340]" />
                  <span>{dict.footer.contr_title}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Connect (تواصل) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">
              {dict.footer.col3_title}
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a 
                  href="https://swissblue.sa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1.5"
                >
                  <span>{dict.footer.swissblue}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link 
                  href="#manufacturing" 
                  className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1.5"
                >
                  <span>{dict.footer.greenwood}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-100 flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`mailto:${dict.footer.email}`} className="hover:text-brand-600 transition-colors font-medium">
                  {dict.footer.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-700 font-mono">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`tel:${dict.footer.phone.replace(/\\s/g, '')}`} className="hover:text-brand-600 transition-colors">
                  {dict.footer.phone}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Language Switcher (Untitled UI Style) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="text-gray-500">{dict.footer.location_sa}</span>
            <button 
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 text-gray-700 hover:text-brand-600 font-semibold transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
