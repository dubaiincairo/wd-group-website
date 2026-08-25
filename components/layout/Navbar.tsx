'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  ChevronDown, 
  Globe, 
  Menu, 
  X, 
  ArrowUpRight
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLanguage, dict } = useLanguage();
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc = lang === 'ar' ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-dark/90 backdrop-blur-xl border-b border-brand-border py-3 shadow-2xl' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Dynamic Language-Aware Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className={`relative h-10 sm:h-12 ${lang === 'ar' ? 'w-36 sm:w-44' : 'w-32 sm:w-36'} transition-transform group-hover:scale-105`}>
              <Image 
                src={logoSrc} 
                alt={lang === 'ar' ? 'مجموعة دبليو دي للأعمال' : 'WD Group'} 
                fill
                className="object-contain drop-shadow-[0_0_14px_rgba(37,99,235,0.45)]"
                priority
              />
            </div>
            <div className="hidden sm:block border-l rtl:border-l-0 rtl:border-r border-white/15 pl-3.5 rtl:pl-0 rtl:pr-3.5 py-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block font-mono">
                {lang === 'ar' ? 'قابضة' : 'HOLDING'}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium block -mt-0.5">
                {dict.nav.holding}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-surface/80 border border-white/10 backdrop-blur-md">
            <Link 
              href="/" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/' ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.nav.home}
            </Link>

            <Link 
              href="/about" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/about' ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
                  pathname.startsWith('/sectors') ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setSectorsOpen(!sectorsOpen)}
              >
                <span>{dict.nav.sectors}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sectorsOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {sectorsOpen && (
                <div className="absolute top-full -left-10 rtl:-left-auto rtl:-right-10 mt-2 w-80 bg-brand-surface rounded-2xl p-2.5 shadow-2xl border border-white/10 backdrop-blur-2xl animate-in fade-in duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {lang === 'ar' ? 'قطاعات المجموعة' : 'Group Sectors'}
                  </div>

                  <div className="space-y-1">
                    <Link 
                      href="/sectors/hospitality" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item ${
                        pathname === '/sectors/hospitality' ? 'bg-white/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-semibold text-zinc-200 group-hover/item:text-white">
                          {dict.nav.hospitality}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                        SwissBlue
                      </span>
                    </Link>

                    <Link 
                      href="/sectors/manufacturing" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item ${
                        pathname === '/sectors/manufacturing' ? 'bg-white/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Factory className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-zinc-200 group-hover/item:text-white">
                          {dict.nav.manufacturing}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        GreenWood
                      </span>
                    </Link>

                    <Link 
                      href="/sectors/contracting" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item ${
                        pathname === '/sectors/contracting' ? 'bg-white/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <HardHat className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold text-zinc-200 group-hover/item:text-white">
                          {dict.nav.contracting}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Projects
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/careers" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/careers' ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.nav.careers}
            </Link>

            <Link 
              href="/contact" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                pathname === '/contact' ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Right Action: Language & Contact CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-brand-surface/80 border border-white/10 hover:border-white/20 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{dict.nav.lang_toggle}</span>
            </button>

            <Link 
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-glow-blue transition-all"
            >
              <span>{dict.nav.contactCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-brand-surface border border-white/10"
            >
              {dict.nav.lang_toggle}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white bg-brand-surface border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-surface border-b border-white/10 p-5 mt-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2.5">
            <Link 
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-white/5"
            >
              {dict.nav.home}
            </Link>
            <Link 
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-white/5"
            >
              {dict.nav.about}
            </Link>
            <Link 
              href="/sectors/hospitality"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-sky-400 hover:bg-white/5 flex items-center justify-between"
            >
              <span>{dict.nav.hospitality}</span>
              <span className="text-xs bg-sky-500/10 px-2 py-0.5 rounded-full">SwissBlue</span>
            </Link>
            <Link 
              href="/sectors/manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-emerald-400 hover:bg-white/5 flex items-center justify-between"
            >
              <span>{dict.nav.manufacturing}</span>
              <span className="text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">GreenWood</span>
            </Link>
            <Link 
              href="/sectors/contracting"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-amber-400 hover:bg-white/5 flex items-center justify-between"
            >
              <span>{dict.nav.contracting}</span>
              <span className="text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">Projects</span>
            </Link>
            <Link 
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-white/5"
            >
              {dict.nav.careers}
            </Link>
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-white bg-blue-600 mt-2"
            >
              {dict.nav.contactCta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
