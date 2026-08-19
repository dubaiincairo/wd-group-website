'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Building2, 
  Factory, 
  HardHat, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function Footer() {
  const { lang, dict, toggleLanguage } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-slate pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-slate">
          
          {/* Col 1 & 2: Holding Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3.5 group mb-5 inline-flex">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-slate text-white flex items-center justify-center font-extrabold text-base tracking-wider shadow-sm group-hover:border-brand-accent transition-colors">
                <span className="font-mono">WD</span>
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-white text-lg font-mono">
                  WD GROUP
                </span>
                <span className="ml-2 rtl:ml-0 rtl:mr-2 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/40">
                  HOLDING
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              {dict.footer.desc}
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-zinc-300">
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-brand-slate">Saudi Vision 2030 Partner</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-brand-slate">ISO 9001 Certified</span>
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-brand-slate">Grade A Contractor</span>
            </div>
          </div>

          {/* Col 3: Sectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accentLight mb-4">
              {dict.footer.col1_title}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="#hospitality" className="hover:text-sector-hospitality transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sector-hospitality" />
                  <span>{dict.footer.hosp_title}</span>
                </Link>
              </li>
              <li>
                <Link href="#manufacturing" className="hover:text-sector-manufacturing transition-colors flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-sector-manufacturing" />
                  <span>{dict.footer.mfg_title}</span>
                </Link>
              </li>
              <li>
                <Link href="#contracting" className="hover:text-sector-contracting transition-colors flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-sector-contracting" />
                  <span>{dict.footer.contr_title}</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-brand-slate/60">
                <a 
                  href="https://swissblue.sa" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-accent hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{dict.footer.swissblue_title}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accentLight mb-4">
              {dict.footer.col2_title}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  {dict.footer.about_us}
                </Link>
              </li>
              <li>
                <Link href="#governance" className="hover:text-white transition-colors">
                  {dict.footer.governance}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  {dict.footer.projects}
                </Link>
              </li>
              <li>
                <Link href="#governance" className="hover:text-white transition-colors">
                  {dict.footer.esg}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  {dict.footer.careers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Locations & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accentLight mb-4">
              {dict.footer.col3_title}
            </h4>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{dict.footer.location_riyadh}</div>
                  <div className="text-[11px] text-zinc-500">Saudi Arabia</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{dict.footer.location_jeddah}</div>
                  <div className="text-[11px] text-zinc-500">Saudi Arabia</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-zinc-300 transition-colors">{dict.footer.privacy}</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">{dict.footer.terms}</Link>
            <button 
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-white font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
