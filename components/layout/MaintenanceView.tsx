'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Building2, 
  Factory, 
  HardHat, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  Clock,
  Briefcase
} from 'lucide-react';
import type { SiteSettings } from '@/lib/admin/types';

interface MaintenanceViewProps {
  settings?: Partial<SiteSettings> | null;
}

export default function MaintenanceView({ settings }: MaintenanceViewProps) {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const isAr = lang === 'ar';

  const headline = isAr
    ? (settings?.maintenance_headline_ar || 'منظومة الأعمال الرائدة في الضيافة والتصنيع والمقاولات')
    : (settings?.maintenance_headline_en || 'Sculpting Next-Generation Hospitality, Manufacturing & Contracting');

  const message = isAr
    ? (settings?.maintenance_message_ar || 'نعمل حالياً على ترقية وتجهيز المنصة الرقمية الرسمية لمجموعة دبليو دي للأعمال لتوفير تجربة استثنائية تعكس معاييرنا الرفيعة ومشاريعنا المتكاملة في المملكة العربية السعودية. سنطلق المنصة بحلتها الكاملة قريباً.')
    : (settings?.maintenance_message_en || 'We are currently refining the official digital platform of WD Group for Business to deliver an elevated experience aligned with Saudi Vision 2030 and our growing footprint across the Kingdom. We look forward to welcoming you soon.');

  const estimated = settings?.maintenance_estimated_date || (isAr ? 'قريباً 2026' : 'Upcoming 2026');
  const email = settings?.general_email || settings?.secondary_email || 'ceo@wdgroup.online';
  const phone = settings?.primary_phone || settings?.secondary_phone || '+966 50 572 5070';
  const headquarters = isAr
    ? (settings?.headquarters_ar || 'طريق الملك عبدالعزيز، حي الخالدية، نجران، المملكة العربية السعودية')
    : (settings?.headquarters_en || 'King Abdulaziz Road, Al Khalidiya, Najran, Kingdom of Saudi Arabia');

  const logoSrc = isAr ? '/brand/wd-group-logo-ar-white.png' : '/brand/wd-group-logo-white.png';
  const logoAlt = isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group for Business';

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          company: inquiryData.company,
          sector: 'maintenance_inquiry',
          subject: 'Direct Maintenance Page Executive Inquiry',
          message: inquiryData.message
        }),
      });
      setInquirySent(true);
    } catch {
      setInquirySent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#06080C] text-white flex flex-col justify-between relative overflow-x-hidden selection:bg-[#C9A86A]/30 selection:text-[#EAD6B3]"
      dir={isAr ? 'rtl' : 'ltr'}
      lang={lang}
    >
      
      {/* 1. Cinematic Background Backdrop */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
          style={{ transform: 'translateZ(0)' }}
        >
          <source src="/videos/hospitality.mp4" type="video/mp4" />
        </video>
        
        {/* Deep Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080C]/95 via-[#06080C]/85 to-[#06080C]/98" />
        
        {/* Subtle Architectural Blueprint Matrix */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-25" />

        {/* Ambient Radial Lights */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#C9A86A]/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[160px] pointer-events-none" />
      </div>

      {/* 2. Top Executive Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative z-20">
        <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#0F1117]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C9A86A]"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#C9A86A]">
              {isAr ? 'الترقية والتطوير الرقمي نشط' : 'DIGITAL UPGRADE IN PROGRESS'}
            </span>
          </div>

          {/* Action Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white transition-all cursor-pointer shadow-sm"
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            {/* Staff Admin Portal */}
            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C9A86A]/10 hover:bg-[#C9A86A]/20 border border-[#C9A86A]/30 text-xs font-bold text-[#EAD6B3] hover:text-white transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>{isAr ? 'بوابة الإدارة' : 'Admin Portal'}</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 3. Main Central Hero Holding Stage */}
      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 text-center flex flex-col items-center">
        
        {/* Subtle Monogram Crosshairs */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-zinc-500 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase mb-6 flex items-center gap-2"
        >
          <span>{isAr ? '+ مجموعة دبليو دي القابضة للأعمال' : '+ WD HOLDING GROUP FOR BUSINESS'}</span>
          <span className="text-zinc-700">//</span>
          <span className="text-[#C9A86A]">{isAr ? 'المملكة العربية السعودية' : 'KINGDOM OF SAUDI ARABIA'}</span>
        </motion.div>

        {/* Real Brand Logo with Halo Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="absolute inset-0 bg-[#C9A86A]/20 blur-3xl rounded-full scale-125 pointer-events-none" />
          <div className={`relative h-16 sm:h-20 ${isAr ? 'w-64 sm:w-80' : 'w-56 sm:w-72'} mx-auto`}>
            <Image 
              src={logoSrc} 
              alt={logoAlt} 
              fill 
              className="object-contain drop-shadow-[0_0_35px_rgba(201,168,106,0.45)]"
              priority
            />
          </div>
        </motion.div>

        {/* Dual Sovereign Status Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1117]/90 border border-[#C9A86A]/30 text-xs font-mono font-bold text-[#EAD6B3] shadow-glow-camel mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>{isAr ? 'الموقع الرسمي قيد التجهيز والإطلاق المطور' : 'Official Portal Under Evolution'}</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline font-normal">{isAr ? 'رؤية 2030' : 'Vision 2030'}</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto mb-5 ${!isAr ? 'font-serif' : ''}`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5CD] to-[#C9A86A]">
            {headline}
          </span>
        </motion.h1>

        {/* Narrative Message */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal mb-10"
        >
          {message}
        </motion.p>

        {/* 4. Strategic 3 Pillars Snapshot Bento */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left rtl:text-right"
        >
          
          {/* Pillar 1: Hospitality */}
          <div className="p-5 rounded-2xl bg-[#0F1117]/85 border border-sky-500/20 hover:border-sky-400/50 transition-all group relative overflow-hidden backdrop-blur-md shadow-lg">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-60" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-300 border border-sky-500/30">
                {isAr ? '6 منشآت فندقية' : '6 Hotel Assets'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
              {isAr ? 'قطاع الضيافة والفنادق' : 'Hospitality & Hotels'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isAr ? 'سويس بلو، فيناس، وأجنحة توليب الفندقية بأرقى المعايير' : 'SwissBlue, Vinas & Tulip Luxury Hotel Suites across Saudi Arabia.'}
            </p>
          </div>

          {/* Pillar 2: Manufacturing */}
          <div className="p-5 rounded-2xl bg-[#0F1117]/85 border border-emerald-500/20 hover:border-emerald-400/50 transition-all group relative overflow-hidden backdrop-blur-md shadow-lg">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Factory className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {isAr ? '3 مصانع متخصصة' : '3 Factories'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
              {isAr ? 'التصنيع والأثاث (جرين وود)' : 'Manufacturing (GreenWood)'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isAr ? 'مصانع الأخشاب، الألمنيوم، والمفروشات الفندقية المتطورة' : 'Specialized industrial plants for joinery, aluminum & contract furniture.'}
            </p>
          </div>

          {/* Pillar 3: Contracting */}
          <div className="p-5 rounded-2xl bg-[#0F1117]/85 border border-amber-500/20 hover:border-amber-400/50 transition-all group relative overflow-hidden backdrop-blur-md shadow-lg">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <HardHat className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {isAr ? 'تنفيذ وتسليم شامل' : 'Turnkey Fit-Out'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
              {isAr ? 'المقاولات والتجهيز (تصاميم الوطن)' : 'Contracting (WatanDesign)'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {isAr ? 'التشطيبات المعمارية، الأعمال الكهروميكانيكية، وإدارة المشروعات' : 'Turnkey architectural fit-out, MEP engineering & commercial projects.'}
            </p>
          </div>

        </motion.div>

        {/* 5. Executive Inquiry & Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#0F1117]/95 border border-[#C9A86A]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left rtl:text-right relative overflow-hidden backdrop-blur-xl"
        >
          {/* Ambient Glow Corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A86A]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Bar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A86A] flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{isAr ? 'قنوات التواصل والشراكات التنفيذية' : 'EXECUTIVE & PARTNERSHIP CHANNELS'}</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {isAr ? 'نرحب باستفسارات المستثمرين والجهات الحكومية والشركاء التجاريين' : 'Welcoming direct inquiries from corporate partners and investors.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>{isAr ? `الموعد المتوقع: ${estimated}` : `Target: ${estimated}`}</span>
              </span>

              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#C9A86A] hover:bg-[#D8B97B] text-[#0E1A24] text-xs font-bold transition-all shadow-glow-camel cursor-pointer"
              >
                {isAr ? 'إرسال استفسار فوري' : 'Submit Inquiry'}
              </button>
            </div>
          </div>

          {/* Coordinates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Email Coordinate */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3.5 hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/25 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#C9A86A]" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                  {isAr ? 'البريد الإلكتروني للرئيس التنفيذي' : 'EXECUTIVE EMAIL'}
                </p>
                <a href={`mailto:${email}`} className="text-zinc-100 hover:text-[#C9A86A] font-bold text-xs sm:text-sm transition-colors" dir="ltr">
                  {email}
                </a>
              </div>
            </div>

            {/* Phone Coordinate */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3.5 hover:border-white/15 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                  {isAr ? 'الهاتف المباشر والتواصل' : 'DIRECT TELEPHONE'}
                </p>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-zinc-100 hover:text-emerald-400 font-bold text-xs sm:text-sm transition-colors" dir="ltr">
                  {phone}
                </a>
              </div>
            </div>

          </div>

          {/* Headquarters Location Bar */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-2 text-xs text-zinc-400 border-t border-white/5">
            <MapPin className="w-4 h-4 text-[#C9A86A] shrink-0" />
            <span className="leading-relaxed">{headquarters}</span>
          </div>

        </motion.div>

      </main>

      {/* 6. Executive Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-20 border-t border-white/10 text-xs text-zinc-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A86A]" />
            <span>
              {isAr 
                ? 'مجموعة دبليو دي للأعمال © 2026 · سجل تجاري معتمد · المملكة العربية السعودية'
                : 'WD Group for Business © 2026 · Official Commercial Entity · Kingdom of Saudi Arabia'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-zinc-600">Riyadh · Jeddah · Najran</span>
            <Link
              href="/admin/login"
              className="text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              {isAr ? 'دخول المشرفين' : 'Staff Login'}
            </Link>
          </div>

        </div>
      </footer>

      {/* 7. Interactive Inquiry Modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0F1117] border border-[#C9A86A]/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
              dir={isAr ? 'rtl' : 'ltr'}
            >
              <button
                type="button"
                onClick={() => { setInquiryOpen(false); setInquirySent(false); }}
                className="absolute top-5 right-5 rtl:right-auto rtl:left-5 text-zinc-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {inquirySent ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? 'تم استلام استفسارك بنجاح' : 'Inquiry Received'}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    {isAr 
                      ? 'شكراً لتواصلك مع مجموعة دبليو دي للأعمال. سيقوم فريق الإدارة التنفيذية بالرد عليك في أقرب وقت.'
                      : 'Thank you for contacting WD Group. Our executive team will reach out promptly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setInquiryOpen(false); setInquirySent(false); }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C9A86A] text-[#0E1A24] cursor-pointer"
                  >
                    {isAr ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-6 space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C9A86A] font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAr ? 'طلب تواصل وشراكة مباشر' : 'Executive Direct Inquiry'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {isAr ? 'تواصل مع إدارة المجموعة' : 'Connect with Leadership'}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {isAr ? 'يرجى تزويدنا ببياناتك وسيتواصل معك المستشار المختص' : 'Provide your details and our representative will get in touch.'}
                    </p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1 font-semibold">{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
                      <input
                        type="text"
                        required
                        value={inquiryData.name}
                        onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#C9A86A] outline-none"
                        placeholder={isAr ? 'محمد العبدالله' : 'John Doe'}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 mb-1 font-semibold">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                        <input
                          type="email"
                          required
                          value={inquiryData.email}
                          onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#C9A86A] outline-none"
                          placeholder="name@company.com"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-semibold">{isAr ? 'رقم الهاتف' : 'Phone Number'}</label>
                        <input
                          type="tel"
                          value={inquiryData.phone}
                          onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#C9A86A] outline-none"
                          placeholder="+966 50 000 0000"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1 font-semibold">{isAr ? 'الجهة / الشركة' : 'Company / Organization'}</label>
                      <input
                        type="text"
                        value={inquiryData.company}
                        onChange={(e) => setInquiryData({ ...inquiryData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#C9A86A] outline-none"
                        placeholder={isAr ? 'اسم الشركة أو الجهة' : 'Company Ltd.'}
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1 font-semibold">{isAr ? 'نص الاستفسار أو تفاصيل المشروع *' : 'Inquiry / Project Details *'}</label>
                      <textarea
                        required
                        rows={3}
                        value={inquiryData.message}
                        onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#C9A86A] outline-none resize-none"
                        placeholder={isAr ? 'اكتب تفاصيل الاستفسار أو الشراكة هنا...' : 'Provide details regarding your inquiry or partnership opportunity...'}
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setInquiryOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#C9A86A] hover:bg-[#D8B97B] text-[#0E1A24] transition-all disabled:opacity-50 cursor-pointer shadow-glow-camel"
                      >
                        {submitting ? (
                          <div className="w-3.5 h-3.5 border-2 border-[#0E1A24] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                        )}
                        <span>{submitting ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...') : (isAr ? 'إرسال الاستفسار' : 'Send Inquiry')}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
