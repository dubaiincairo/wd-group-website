'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Lock, 
  ExternalLink, 
  FileText, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function EcommerceFooter() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const currentYear = new Date().getFullYear();

  const footerDict = (dict.furniture as any)?.ecom_footer || {
    brand_statement: isAr
      ? 'جرين وود ليفينج هي العلامة التجارية المتخصصة في تصنيع الأثاث الفاخر والتجاليد المعمارية التابعة لمجموعة دبليو دي القابضة، وتتولى تصنيع وتوريد أثاث المشروعات السكنية الراقية والمنشآت الفندقية في المملكة العربية السعودية.'
      : 'GreenWood Living is the specialized luxury furniture and architectural joinery brand of WD Group, manufacturing signature living collections, hotel FF&E, and bespoke millwork in the Kingdom of Saudi Arabia.',
    quick_links_title: isAr ? 'أقسام المتجر' : 'Curated Departments',
    client_care_title: isAr ? 'خدمة العملاء والضمان' : 'Client Experience',
    track_order: isAr ? 'تتبع طلب نشط بالمصنع' : 'Track Live Factory Order',
    shipping_policy: isAr ? 'سياسة التوصيل والتركيب الفندقي' : 'White-Glove Delivery Policy',
    warranty: isAr ? 'الضمان الهيكلي لمدة 10 سنوات' : '10-Year Structural Warranty',
    swatch_request: isAr ? 'طلب صندوق عينات المواد' : 'Material Swatch Box',
    b2b_contract: isAr ? 'توريدات الفنادق والمشروعات (B2B)' : 'Hotel & Contract FF&E (B2B)',
    faq: isAr ? 'الأسئلة الأكثر شيوعاً' : 'Frequently Asked Questions',
    payments_title: isAr ? 'طرق الدفع الآمنة والمعتمدة' : 'Secure Payment Methods',
    corporate_badge: isAr ? 'جرين وود ليفينج هي إحدى الأذرع الصناعية التابعة لمجموعة دبليو دي القابضة.' : 'GreenWood Living is an industrial operating division of WD Group Holding.',
    back_to_wd: isAr ? 'زيارة بوابة مجموعة دبليو دي القابضة' : 'Visit WD Group Corporate Portal',
    cr_vat: isAr ? 'سجل تجاري: 1010000000 · الرقم الضريبي: 300000000000003 · جميع الحقوق محفوظة ©' : 'CR: 1010000000 · Tax ID (VAT): 300000000000003 · All Rights Reserved ©',
  };

  return (
    <footer className="bg-[#050608] text-white border-t border-white/10 relative overflow-hidden">
      
      {/* Background Ambient Accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#C9A86A]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col (Takes 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/furniture" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/15 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white block tracking-tight">
                  {isAr ? 'جرين وود للأثاث الفاخر' : 'GreenWood Living'}
                </span>
                <span className="text-[10px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                  {isAr ? 'تصنيع وطني سعودي بمعايير فندقية' : 'Made in Saudi Arabia · High-End FF&E'}
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md font-normal">
              {footerDict.brand_statement}
            </p>

            {/* Micro Factory Authority Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{isAr ? '3 مصانع وطنية (الرياض ونجران)' : '3 Saudi Industrial Facilities'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
                <ShieldCheck className="w-3 h-3 text-[#C9A86A]" />
                <span>{isAr ? 'ضمان هيكلي 10 سنوات' : '10-Year Structural Guarantee'}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Curated Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
              {footerDict.quick_links_title}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {isAr ? 'الصالونات وغرف المعيشة' : 'Living & Lounge'}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {isAr ? 'الأجنحة وغرف النوم الفندقية' : 'Hospitality Suites & Bedroom'}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {isAr ? 'طاولات الطعام وغرف الاجتماعات' : 'Executive Dining & Tables'}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {isAr ? 'التجاليد المعمارية والخزائن' : 'Architectural Joinery'}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {isAr ? 'الديكورات وطاولات الترافرتين' : 'Travertine Tables & Accents'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Experience & Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
              {footerDict.client_care_title}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/furniture/track" className="hover:text-emerald-400 text-emerald-300 font-medium transition-colors inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{footerDict.track_order}</span>
                </Link>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  {footerDict.shipping_policy}
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors">
                  {footerDict.warranty}
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-white transition-colors">
                  {footerDict.swatch_request}
                </a>
              </li>
              <li>
                <Link href="/furniture/checkout" className="hover:text-white transition-colors">
                  {isAr ? 'إتمام الطلب والدفع المباشر' : 'Direct Checkout'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: B2B & Trade Program */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
              {isAr ? 'قطاع الفنادق والمشروعات' : 'B2B & Trade Division'}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#bespoke-b2b" className="hover:text-[#C9A86A] text-[#C9A86A] font-semibold transition-colors">
                  {footerDict.b2b_contract}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {isAr ? 'تقديم كراسة الشروط والمواصفات (BOQ)' : 'Submit Architectural BOQ'}
                </Link>
              </li>
              <li>
                <Link href="/sectors/hospitality" className="hover:text-white transition-colors">
                  {isAr ? 'مشروعات أجنحة سويس بلو' : 'SwissBlue Hotel Suites Project'}
                </Link>
              </li>
              <li>
                <Link href="/sectors/manufacturing" className="hover:text-white transition-colors">
                  {isAr ? 'قدرات التصنيع وخطوط CNC' : 'Industrial CNC Capabilities'}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Row: Payment Methods & Security */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isAr ? 'دفع آمن ومعتمد بنسبة 100% وفق معايير البنك المركزي السعودي (ساما)' : '100% Secure Checkout via SAMA-Compliant Gateways'}</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
            <span className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/15">mada</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/15">Apple Pay</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/15">Visa</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/15">Mastercard</span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">Tabby</span>
            <span className="px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">Tamara</span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30">Bank Wire</span>
          </div>
        </div>

        {/* Bottom Corporate Pedigree & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          
          {/* Corporate Parent Bridge */}
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
            <span>{footerDict.corporate_badge}</span>
            <Link 
              href="/" 
              className="text-[#C9A86A] hover:underline font-semibold inline-flex items-center gap-1 shrink-0 ml-1"
            >
              <span>{footerDict.back_to_wd}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Legal / CR / VAT */}
          <div className="font-mono text-[11px] text-zinc-400 text-center md:text-right rtl:md:text-left">
            <span>{footerDict.cr_vat} {currentYear}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
