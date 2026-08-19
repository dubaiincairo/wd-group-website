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
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLanguage, dict } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
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
                <span className={`font-extrabold tracking-tight text-lg sm:text-xl transition-colors ${
                  lang === 'ar' ? 'font-arabic' : 'font-mono'
                } ${
                  scrolled ? 'text-brand-dark' : 'text-white'
                }`}>
                  {dict.nav.brand}
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-accentLight text-brand-accent border border-brand-accentBorder">
                  HOLDING
                </span>
              </div>
              <p className={`text-[11px] font-medium -mt-0.5 transition-colors ${
                scrolled ? 'text-brand-muted' : 'text-zinc-400'
              }`}>
                {dict.nav.holding}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links matching approved doc */}
          <nav className={`hidden lg:flex items-center gap-1.5 backdrop-blur-md px-4 py-1.5 rounded-full border shadow-xs transition-all ${
            scrolled 
              ? 'bg-white/80 border-brand-border text-brand-surface' 
              : 'bg-brand-surface/80 border-brand-slate/80 text-zinc-200'
          }`}>
            <Link 
              href="#about" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              {dict.nav.about}
            </Link>

            <Link 
              href="#hospitality" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-[#1A476A] hover:bg-blue-50' 
                  : 'hover:text-sky-300 hover:bg-zinc-800'
              }`}
            >
              {dict.nav.hospitality}
            </Link>

            <Link 
              href="#manufacturing" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-[#0B5C3D] hover:bg-emerald-50' 
                  : 'hover:text-emerald-300 hover:bg-zinc-800'
              }`}
            >
              {dict.nav.manufacturing}
            </Link>

            <Link 
              href="#contracting" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-[#8A7340] hover:bg-amber-50' 
                  : 'hover:text-amber-300 hover:bg-zinc-800'
              }`}
            >
              {dict.nav.contracting}
            </Link>

            <Link 
              href="#careers" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'hover:text-white hover:bg-zinc-800'
              }`}
            >
              {dict.nav.careers}
            </Link>

            <Link 
              href="#contact" 
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                scrolled 
                  ? 'hover:text-brand-accent hover:bg-brand-pearl' 
                  : 'hover:text-white hover:bg-zinc-800'
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

            {/* Contact Us CTA */}
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
              className="p-2 rounded-lg bg-white border border-brand-border text-xs font-bold text-brand-dark"
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
          <div className="flex flex-col gap-3">
            <Link 
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-dark py-2 border-b border-gray-100"
            >
              {dict.nav.about}
            </Link>

            <Link 
              href="#hospitality"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#1A476A] py-2 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{dict.nav.hospitality}</span>
              <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full">SwissBlue</span>
            </Link>

            <Link 
              href="#manufacturing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#0B5C3D] py-2 border-b border-gray-100 flex items-center justify-between"
            >
              <span>{dict.nav.manufacturing}</span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">GreenWood</span>
            </Link>

            <Link 
              href="#contracting"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#8A7340] py-2 border-b border-gray-100"
            >
              {dict.nav.contracting}
            </Link>

            <Link 
              href="#careers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-brand-dark py-2 border-b border-gray-100"
            >
              {dict.nav.careers}
            </Link>

            <Link 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-brand-accent text-white font-bold text-sm shadow-md mt-3"
            >
              {dict.nav.rfp_btn}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
