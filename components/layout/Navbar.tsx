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
  ArrowUpRight,
  ShoppingBag,
  Sparkles
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

  if (pathname?.startsWith('/admin') || pathname === '/maintenance' || pathname?.startsWith('/furniture')) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-dark/90 backdrop-blur-xl py-3 shadow-2xl' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Dynamic Language-Aware Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className={`relative h-10 sm:h-12 ${lang === 'ar' ? 'w-36 sm:w-44' : 'w-32 sm:w-38'} transition-all duration-300 group-hover:scale-105`}>
              <Image 
                src={logoSrc} 
                alt={lang === 'ar' ? 'مجموعة دبليو دي للأعمال' : 'WD Group'} 
                fill
                sizes="(max-width: 640px) 176px, 176px"
                className="object-contain drop-shadow-[0_0_16px_rgba(201,168,106,0.25)]"
                priority
              />
            </div>
            <div className="hidden sm:block border-l rtl:border-l-0 rtl:border-r border-white/15 pl-3.5 rtl:pl-0 rtl:pr-3.5 py-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A86A] block font-mono">
                {lang === 'ar' ? 'قابضة' : 'HOLDING'}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium block -mt-0.5">
                {dict.nav.holding}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#0F1117]/85 border border-white/10 backdrop-blur-xl shadow-lg">
            <Link 
              href="/" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                pathname === '/' 
                  ? 'text-white bg-white/15 shadow-sm font-bold' 
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.nav.home}
            </Link>

            <Link 
              href="/about" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                pathname === '/about' 
                  ? 'text-white bg-white/15 shadow-sm font-bold' 
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  pathname.startsWith('/sectors') 
                    ? 'text-white bg-white/15 shadow-sm font-bold' 
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setSectorsOpen(!sectorsOpen)}
              >
                <span>{dict.nav.sectors}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sectorsOpen ? 'rotate-180 text-[#C9A86A]' : ''}`} />
              </button>

              {sectorsOpen && (
                <div className="absolute top-full -left-10 rtl:-left-auto rtl:-right-10 mt-2 w-80 bg-[#0F1117]/95 rounded-2xl p-2.5 shadow-2xl border border-white/15 backdrop-blur-2xl animate-in fade-in duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C9A86A] font-mono">
                    {lang === 'ar' ? 'القطاعات الاستراتيجية' : 'STRATEGIC SECTORS'}
                  </div>

                    <div className="space-y-1">
                    <Link 
                      href="/sectors/hospitality" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all group/item ${
                        pathname === '/sectors/hospitality' ? 'bg-sky-500/10 border border-sky-500/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover/item:scale-110 transition-transform">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-zinc-200 group-hover/item:text-white block">
                            {dict.nav.hospitality}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {lang === 'ar' ? 'فنادق ومنتجعات سويس بلو' : 'SwissBlue Hotels & Suites'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 font-mono">
                        {lang === 'ar' ? '6 منشآت' : '6 Props'}
                      </span>
                    </Link>

                    <Link 
                      href="/sectors/manufacturing" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all group/item ${
                        pathname === '/sectors/manufacturing' ? 'bg-emerald-500/10 border border-emerald-500/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover/item:scale-110 transition-transform">
                          <Factory className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-zinc-200 group-hover/item:text-white block">
                            {dict.nav.manufacturing}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {lang === 'ar' ? 'مصانع جرين وود الوطنية' : 'GreenWood & Factories'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                        {lang === 'ar' ? '3 مصانع' : '3 Factories'}
                      </span>
                    </Link>

                    <Link 
                      href="/sectors/contracting" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-all group/item ${
                        pathname === '/sectors/contracting' ? 'bg-amber-500/10 border border-amber-500/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover/item:scale-110 transition-transform">
                          <HardHat className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-zinc-200 group-hover/item:text-white block">
                            {dict.nav.contracting}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {lang === 'ar' ? 'المقاولات والتنفيذ الشامل' : 'Engineering & Turnkey'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-mono">
                        {lang === 'ar' ? 'تنفيذ شامل' : 'Turnkey'}
                      </span>
                    </Link>

                    <div className="pt-1 my-1 border-t border-white/10" />

                    <Link 
                      href="/furniture" 
                      onClick={() => setSectorsOpen(false)}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-[#C9A86A]/10 border border-[#C9A86A]/25 transition-all group/item ${
                        pathname === '/furniture' ? 'bg-[#C9A86A]/20' : 'bg-[#C9A86A]/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A] group-hover/item:scale-110 transition-transform">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white group-hover/item:text-[#C9A86A] block">
                            {lang === 'ar' ? 'متجر أثاث جرين وود' : 'GreenWood Furniture Store'}
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            {lang === 'ar' ? 'تسوق وطلب تسعير مشروعات' : 'Retail & Hospitality FF&E'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold text-[#08090C] bg-[#C9A86A] px-2 py-0.5 rounded-full font-mono shadow-sm">
                        {lang === 'ar' ? 'جديد' : 'NEW'}
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/careers" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                pathname === '/careers' 
                  ? 'text-white bg-white/15 shadow-sm font-bold' 
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.nav.careers}
            </Link>

            <Link 
              href="/contact" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                pathname === '/contact' 
                  ? 'text-white bg-white/15 shadow-sm font-bold' 
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Right Action: Language & Contact CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="h-9 px-3.5 rounded-xl text-xs font-bold text-zinc-300 hover:text-white bg-[#0F1117]/85 border border-white/10 hover:border-white/25 transition-all inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
              <span className="font-mono text-[11px] leading-none">{dict.nav.lang_toggle}</span>
            </button>

            <Link 
              href="/contact"
              className="h-10 px-5 sm:px-6 rounded-xl text-xs sm:text-[13px] font-extrabold text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] border border-[#E3C58A]/60 hover:border-[#E3C58A] shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:shadow-[0_0_28px_rgba(201,168,106,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span className="leading-none">{dict.nav.contactCta}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-270 shrink-0 text-[#08090C]" />
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
              <span className="text-xs bg-sky-500/10 px-2 py-0.5 rounded-full">
                {lang === 'ar' ? 'سويس بلو' : 'SwissBlue'}
              </span>
            </Link>
            <Link 
              href="/sectors/manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-emerald-400 hover:bg-white/5 flex items-center justify-between"
            >
              <span>{dict.nav.manufacturing}</span>
              <span className="text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {lang === 'ar' ? 'جرين وود' : 'GreenWood'}
              </span>
            </Link>
            <Link 
              href="/sectors/contracting"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-amber-400 hover:bg-white/5 flex items-center justify-between"
            >
              <span>{dict.nav.contracting}</span>
              <span className="text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">
                {lang === 'ar' ? 'مشاريع متكاملة' : 'Projects'}
              </span>
            </Link>
            <Link 
              href="/furniture"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-bold text-[#C9A86A] bg-[#C9A86A]/10 border border-[#C9A86A]/30 hover:bg-[#C9A86A]/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C9A86A]" />
                <span>{lang === 'ar' ? 'متجر أثاث جرين وود' : 'GreenWood Furniture Store'}</span>
              </div>
              <span className="text-xs bg-[#C9A86A] text-[#08090C] font-extrabold px-2 py-0.5 rounded-full font-mono">
                {lang === 'ar' ? 'جديد' : 'NEW'}
              </span>
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
              className="w-full py-3 px-5 rounded-xl text-xs font-bold text-center text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] border border-[#E3C58A]/60 shadow-[0_0_20px_rgba(201,168,106,0.35)] mt-3 block"
            >
              {dict.nav.contactCta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
