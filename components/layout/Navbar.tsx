'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ChevronDown, 
  Globe, 
  Menu, 
  X, 
  ArrowUpRight, 
  ExternalLink,
  Briefcase,
  Layers
} from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLanguage, dict } = useLanguage();
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo (Untitled UI Style) */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-extrabold text-sm tracking-wider shadow-xs group-hover:bg-brand-600 transition-colors">
                <span className="font-mono">WD</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={`font-bold tracking-tight text-gray-900 text-base sm:text-lg ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {dict.nav.brand}
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    Holding
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium -mt-0.5">
                  {dict.nav.holding}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Untitled UI Style) */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                href="#about" 
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {dict.nav.about}
              </Link>

              {/* Sectors Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setSectorsOpen(true)}
                onMouseLeave={() => setSectorsOpen(false)}
              >
                <button 
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                  onClick={() => setSectorsOpen(!sectorsOpen)}
                >
                  <span>{dict.nav.sectors}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${sectorsOpen ? 'rotate-180 text-brand-600' : ''}`} />
                </button>

                {/* Untitled UI Flyout Dropdown */}
                {sectorsOpen && (
                  <div className="absolute top-full -left-10 rtl:-left-auto rtl:-right-10 mt-1 w-96 bg-white rounded-2xl p-3 shadow-lg border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {lang === 'ar' ? 'قطاعات المجموعة' : 'Group Divisions'}
                    </div>

                    <div className="space-y-1">
                      {/* Hospitality */}
                      <Link 
                        href="#hospitality" 
                        onClick={() => setSectorsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1A476A] flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-brand-600">
                              {dict.nav.hospitality}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-[#1A476A] border border-blue-200">
                              SwissBlue
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {dict.sectors.hosp.subtitle}
                          </p>
                        </div>
                      </Link>

                      {/* Manufacturing */}
                      <Link 
                        href="#manufacturing" 
                        onClick={() => setSectorsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0B5C3D] flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                          <Factory className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-emerald-700">
                              {dict.nav.manufacturing}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-[#0B5C3D] border border-emerald-200">
                              GreenWood
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {dict.sectors.mfg.subtitle}
                          </p>
                        </div>
                      </Link>

                      {/* Contracting */}
                      <Link 
                        href="#contracting" 
                        onClick={() => setSectorsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#8A7340] flex items-center justify-center shrink-0 border border-amber-100 mt-0.5">
                          <HardHat className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-amber-800">
                              {dict.nav.contracting}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-[#8A7340] border border-amber-200">
                              Projects
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {dict.sectors.contr.subtitle}
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Bottom Sister Brand Link */}
                    <div className="mt-2 pt-2 border-t border-gray-100 px-3 py-1 flex items-center justify-between text-xs">
                      <span className="text-gray-500">{lang === 'ar' ? 'الموقع الفندقي الشقيق:' : 'Sister hospitality brand:'}</span>
                      <a 
                        href="https://swissblue.sa" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                      >
                        <span>swissblue.sa</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="#careers" 
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {dict.nav.careers}
              </Link>

              <Link 
                href="#contact" 
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {dict.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Right Actions: Language Switcher & Contact Button (Untitled UI Style) */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Language Switcher Button (Untitled UI Secondary Gray) */}
            <button 
              onClick={toggleLanguage}
              className="u-btn-secondary !px-3 !py-2 text-xs"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              <span>{dict.nav.lang_toggle}</span>
            </button>

            {/* Contact Us CTA (Untitled UI Primary) */}
            <Link 
              href="#contact"
              className="u-btn-primary !px-4 !py-2 text-xs"
            >
              <span>{dict.nav.rfp_btn}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-270" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="u-btn-secondary !px-2.5 !py-1.5 text-xs font-bold"
            >
              {dict.nav.lang_toggle}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 border border-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            <Link 
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              {dict.nav.about}
            </Link>

            <Link 
              href="#hospitality"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#1A476A] hover:bg-blue-50 flex items-center justify-between"
            >
              <span>{dict.nav.hospitality}</span>
              <span className="text-[10px] font-semibold bg-blue-100 text-[#1A476A] px-2 py-0.5 rounded-full">SwissBlue</span>
            </Link>

            <Link 
              href="#manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#0B5C3D] hover:bg-emerald-50 flex items-center justify-between"
            >
              <span>{dict.nav.manufacturing}</span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-[#0B5C3D] px-2 py-0.5 rounded-full">GreenWood</span>
            </Link>

            <Link 
              href="#contracting"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-[#8A7340] hover:bg-amber-50"
            >
              {dict.nav.contracting}
            </Link>

            <Link 
              href="#careers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              {dict.nav.careers}
            </Link>

            <Link 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="u-btn-primary w-full mt-2"
            >
              {dict.nav.rfp_btn}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
