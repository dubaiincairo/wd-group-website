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
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export default function Navbar() {
  const { lang, t, toggleLanguage, dict } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-header border-b border-brand-border/80 shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-brand-surface border border-brand-slate text-white flex items-center justify-center font-extrabold text-lg tracking-wider shadow-sm group-hover:border-brand-accent transition-colors">
              <span className="text-white font-mono">WD</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold tracking-tight text-lg sm:text-xl font-mono transition-colors ${
                  scrolled ? 'text-brand-dark' : 'text-white'
                }`}>
                  WD GROUP
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-accentLight text-brand-accent border border-brand-accentBorder">
                  HOLDING
                </span>
              </div>
              <p className={`text-[11px] font-medium -mt-0.5 transition-colors ${
                scrolled ? 'text-brand-muted' : 'text-zinc-400'
              }`}>
                {lang === 'ar' ? 'مجموعة قابضة متكاملة' : 'Integrated Industrial & Services'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-xs transition-all ${
            scrolled 
              ? 'bg-white/80 border-brand-border text-brand-surface' 
              : 'bg-brand-surface/80 border-brand-slate/80 text-zinc-200'
          }`}>
            <Link 
              href="#about" 
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'hover:text-white hover:bg-zinc-800'
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
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  scrolled 
                    ? 'hover:text-brand-accent hover:bg-brand-pearl' 
                    : 'hover:text-white hover:bg-zinc-800'
                }`}
                onClick={() => setSectorsOpen(!sectorsOpen)}
              >
                <span>{dict.nav.sectors}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sectorsOpen ? 'rotate-180 text-brand-accent' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {sectorsOpen && (
                <div className="absolute top-full -left-20 rtl:-left-auto rtl:-right-20 mt-2 w-[480px] bg-white rounded-2xl p-4 shadow-xl border border-brand-border animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-muted px-2 mb-2">
                    {lang === 'ar' ? 'القطاعات الاستراتيجية للمجموعة' : 'Core Operating Divisions'}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    
                    {/* Hospitality Item */}
                    <Link 
                      href="#hospitality"
                      onClick={() => setSectorsOpen(false)}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-sector-hospitality-light border border-transparent hover:border-sector-hospitality-border transition-all group/item"
                    >
                      <div className="w-10 h-10 rounded-lg bg-sector-hospitality-light text-sector-hospitality flex items-center justify-center shrink-0 border border-sector-hospitality-border group-hover/item:scale-105 transition-transform">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-dark group-hover/item:text-sector-hospitality-dark">
                            {dict.nav.hospitality}
                          </span>
                          <span className="text-[10px] font-semibold text-sector-hospitality bg-white px-2 py-0.5 rounded-full border border-sector-hospitality-border">
                            SwissBlue
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-muted line-clamp-1 mt-0.5">
                          {dict.sectors.hosp.desc}
                        </p>
                      </div>
                    </Link>

                    {/* Manufacturing Item */}
                    <Link 
                      href="#manufacturing"
                      onClick={() => setSectorsOpen(false)}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-sector-manufacturing-light border border-transparent hover:border-sector-manufacturing-border transition-all group/item"
                    >
                      <div className="w-10 h-10 rounded-lg bg-sector-manufacturing-light text-sector-manufacturing flex items-center justify-center shrink-0 border border-sector-manufacturing-border group-hover/item:scale-105 transition-transform">
                        <Factory className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-dark group-hover/item:text-sector-manufacturing-dark">
                            {dict.nav.manufacturing}
                          </span>
                          <span className="text-[10px] font-semibold text-sector-manufacturing bg-white px-2 py-0.5 rounded-full border border-sector-manufacturing-border">
                            ISO 9001
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-muted line-clamp-1 mt-0.5">
                          {dict.sectors.mfg.desc}
                        </p>
                      </div>
                    </Link>

                    {/* Contracting Item */}
                    <Link 
                      href="#contracting"
                      onClick={() => setSectorsOpen(false)}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-sector-contracting-light border border-transparent hover:border-sector-contracting-border transition-all group/item"
                    >
                      <div className="w-10 h-10 rounded-lg bg-sector-contracting-light text-sector-contracting flex items-center justify-center shrink-0 border border-sector-contracting-border group-hover/item:scale-105 transition-transform">
                        <HardHat className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-dark group-hover/item:text-sector-contracting-dark">
                            {dict.nav.contracting}
                          </span>
                          <span className="text-[10px] font-semibold text-sector-contracting bg-white px-2 py-0.5 rounded-full border border-sector-contracting-border">
                            Grade A
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-muted line-clamp-1 mt-0.5">
                          {dict.sectors.contr.desc}
                        </p>
                      </div>
                    </Link>

                  </div>

                  {/* Sister Brand Banner */}
                  <div className="mt-3 pt-3 border-t border-brand-border flex items-center justify-between px-2 text-xs">
                    <span className="text-brand-muted text-[11px]">
                      {lang === 'ar' ? 'استكشف علامة الضيافة الشقيقة:' : 'Explore sister hotel brand:'}
                    </span>
                    <a 
                      href="https://swissblue.sa" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-bold text-brand-accent hover:underline inline-flex items-center gap-1 text-[11px]"
                    >
                      swissblue.sa
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              )}
            </div>

            <Link 
              href="#projects" 
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'text-brand-surface hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'text-zinc-200 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {dict.nav.projects}
            </Link>

            <Link 
              href="#governance" 
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'text-brand-surface hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'text-zinc-200 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {dict.nav.governance}
            </Link>

            <Link 
              href="#contact" 
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'text-brand-surface hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'text-zinc-200 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                scrolled 
                  ? 'text-brand-surface bg-white/80 hover:bg-white border border-brand-border hover:border-brand-accent' 
                  : 'text-zinc-200 bg-brand-surface/90 hover:bg-zinc-800 border border-brand-slate hover:border-brand-accent'
              }`}
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>{dict.nav.lang_toggle}</span>
            </button>

            {/* Inquire / RFP CTA */}
            <Link 
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-surface hover:bg-brand-dark border border-brand-slate shadow-sm hover:shadow-hover-sapphire transition-all"
            >
              <span>{dict.nav.rfp_btn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-270" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-white border border-brand-border text-xs font-bold"
            >
              {dict.nav.lang_toggle}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-brand-border text-brand-dark"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-white border-b border-brand-border shadow-2xl p-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <Link 
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-dark py-2 border-b border-gray-100"
            >
              {dict.nav.about}
            </Link>

            <div className="py-2 border-b border-gray-100">
              <div className="text-xs font-extrabold text-brand-muted uppercase mb-2">
                {dict.nav.sectors}
              </div>
              <div className="flex flex-col gap-2 pl-2 rtl:pl-0 rtl:pr-2">
                <Link 
                  href="#hospitality"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-surface py-1 text-sector-hospitality"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{dict.nav.hospitality}</span>
                </Link>
                <Link 
                  href="#manufacturing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-surface py-1 text-sector-manufacturing"
                >
                  <Factory className="w-4 h-4" />
                  <span>{dict.nav.manufacturing}</span>
                </Link>
                <Link 
                  href="#contracting"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-surface py-1 text-sector-contracting"
                >
                  <HardHat className="w-4 h-4" />
                  <span>{dict.nav.contracting}</span>
                </Link>
              </div>
            </div>

            <Link 
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-dark py-2 border-b border-gray-100"
            >
              {dict.nav.projects}
            </Link>

            <Link 
              href="#governance"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-dark py-2 border-b border-gray-100"
            >
              {dict.nav.governance}
            </Link>

            <Link 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-brand-accent text-white font-bold text-sm shadow-md mt-2"
            >
              {dict.nav.rfp_btn}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
