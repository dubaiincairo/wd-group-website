'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  Settings, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  Save, 
  Percent, 
  MapPin, 
  Lock,
  FileCheck,
  Building2,
  PhoneCall,
  MessageSquare,
  Globe,
  Sliders,
  CheckCircle2,
  Receipt,
  FileText,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function SettingsTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  // Accordion state for 5 sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shipping: true,
    tax: false,
    payments: false,
    notifications: false,
    secrets: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setOpenSections({
      shipping: true,
      tax: true,
      payments: true,
      notifications: true,
      secrets: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      shipping: false,
      tax: false,
      payments: false,
      notifications: false,
      secrets: false,
    });
  };

  // 1. Regional Shipping Matrix
  const [riyadhRate, setRiyadhRate] = useState(0); // Free in Riyadh
  const [westernRate, setWesternRate] = useState(450);
  const [easternRate, setEasternRate] = useState(400);
  const [southernRate, setSouthernRate] = useState(650);
  const [northernRate, setNorthernRate] = useState(750);
  const [craneLiftingSurcharge, setCraneLiftingSurcharge] = useState(1200);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(15000);

  // 2. ZATCA & Tax Rules
  const [vatRate, setVatRate] = useState(15);
  const [vatEnabled, setVatEnabled] = useState(true);
  const [taxNumber, setTaxNumber] = useState('310492817400003');
  const [zatcaQrCode, setZatcaQrCode] = useState(true);
  const [zatcaPhase2Live, setZatcaPhase2Live] = useState(true);
  const [b2bStandardInvoice, setB2bStandardInvoice] = useState(true);

  // 3. Payment Gateways Toggles
  const [enableMada, setEnableMada] = useState(true);
  const [enableApplePay, setEnableApplePay] = useState(true);
  const [enableTabby, setEnableTabby] = useState(true);
  const [enableTamara, setEnableTamara] = useState(true);
  const [enableBankTransfer, setEnableBankTransfer] = useState(true);
  const [enableCodPos, setEnableCodPos] = useState(true);
  const [paymentTestMode, setPaymentTestMode] = useState(false);

  // 4. Notification Alerts
  const [notifyWhatsappClient, setNotifyWhatsappClient] = useState(true);
  const [notifyWhatsappDispatch, setNotifyWhatsappDispatch] = useState(true);
  const [notifyEmailFinance, setNotifyEmailFinance] = useState(true);
  const [highTicketAlertThreshold, setHighTicketAlertThreshold] = useState(35000);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isAr ? 'تم حفظ كافة إعدادات المتجر ومنظومة العمليات' : 'All store settings and operational policies saved successfully', 'success');
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6 max-w-5xl">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#C9A86A]" />
            <span>{isAr ? 'إعدادات المتجر، الضرائب، الشحن والعمليات' : 'Enterprise Store Configuration & Operational Governance'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'إدارة مصفوفة الشحن للمناطق، هيئة الزكاة والضريبة (ZATCA)، بوابات الدفع، والتنبيهات الآلية.' : 'Configure Saudi white-glove logistics, ZATCA Phase-2 e-invoicing, payment gateways, and warranty rules.'}
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer font-mono shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isAr ? 'حفظ كافة الإعدادات' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* Accordion Quick Expand / Collapse Controls */}
      <div className="flex items-center justify-between px-1 py-1">
        <span className="text-xs font-mono text-zinc-400 font-bold">
          {isAr ? 'أقسام إعدادات المتجر (5 أقسام قابلة للطي)' : 'STORE CONFIGURATION SECTIONS (5 FOLDABLE MODULES)'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isAr ? 'فتح الكل' : 'Expand All'}</span>
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <Minimize2 className="w-3 h-3" />
            <span>{isAr ? 'طي الكل' : 'Collapse All'}</span>
          </button>
        </div>
      </div>

      {/* Stacked Foldable Sections */}
      <div className="space-y-4">

        {/* 1. Saudi Regional White-Glove Installation Matrix */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('shipping')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#C9A86A]/15 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A] font-mono text-xs font-bold shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'مصفوفة رسوم الشحن والتركيب الفندقي لمناطق المملكة' : 'SAUDI REGIONAL WHITE-GLOVE INSTALLATION RATES'}
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full hidden sm:inline">
                    {isAr ? '5 مناطق مغطاة' : '5 Saudi Zones Active'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'تسعير التوصيل والتركيب حسب المناطق، حد التوصيل المجاني، ورسوم الرافعات' : 'Rates for Riyadh, Western, Eastern, Southern & Northern regions, plus free shipping threshold'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.shipping ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الرسوم' : 'Expand')}
              </span>
              {openSections.shipping ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.shipping && (
            <div className="space-y-5 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'منطقة الرياض (المركز الرئيسي)' : 'Riyadh Province (Central Hub)'}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={riyadhRate}
                      onChange={(e) => setRiyadhRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                    />
                    <span className="text-emerald-400 shrink-0">{isAr ? 'ر.س (0 = مجاني)' : 'SAR (0 = Free)'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'المنطقة الغربية (جدة، مكة، المدينة)' : 'Western Province (Jeddah, Makkah, Medina)'}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={westernRate}
                      onChange={(e) => setWesternRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                    />
                    <span className="text-zinc-400 shrink-0">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'المنطقة الشرقية (الخبر، الدمام، الجبيل)' : 'Eastern Province (Khobar, Dammam, Jubail)'}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={easternRate}
                      onChange={(e) => setEasternRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                    />
                    <span className="text-zinc-400 shrink-0">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'المنطقة الجنوبية (أبها، نجران، جازان)' : 'Southern Province (Abha, Najran, Jazan)'}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={southernRate}
                      onChange={(e) => setSouthernRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                    />
                    <span className="text-zinc-400 shrink-0">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans font-bold">{isAr ? 'المنطقة الشمالية (تبوك، العلا، حائل)' : 'Northern Province (Tabuk, Al-Ula, Hail)'}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={northernRate}
                      onChange={(e) => setNorthernRate(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                    />
                    <span className="text-zinc-400 shrink-0">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-amber-400 block font-sans font-bold">{isAr ? 'رسوم رفع برافعة خارجية (للأبراج والقصور)' : 'External Crane Lifting Surcharge'}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={craneLiftingSurcharge}
                      onChange={(e) => setCraneLiftingSurcharge(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-amber-400 font-bold"
                    />
                    <span className="text-zinc-400 shrink-0">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Threshold */}
              <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">{isAr ? 'حد التوصيل والتركيب الفندقي المجاني' : 'Complimentary White-Glove Installation Threshold'}</span>
                  <span className="text-zinc-400 text-[11px] font-sans">
                    {isAr ? 'يتم تطبيق الشحن والتركيب المجاني تلقائياً عند تجاوز قيمة السلة:' : 'Free delivery & assembly automatically applied when cart total exceeds:'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                    className="w-32 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-emerald-400 font-bold text-sm text-center"
                  />
                  <span className="text-zinc-400">{isAr ? 'ر.س' : 'SAR'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. ZATCA Phase 2 E-Invoicing & VAT Compliance */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('tax')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'الامتثال للفوترة الإلكترونية وضريبة القيمة المضافة (ZATCA Phase 2)' : 'ZATCA PHASE-2 E-INVOICING & VAT RULES'}
                  </h4>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded-full hidden sm:inline">
                    {isAr ? 'متوافق مع هيئة الزكاة' : 'ZATCA Certified'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'نسبة الضريبة القياسية 15%، الرقم الضريبي للمنشأة، وتوليد رموز QR المشفرة' : '15% VAT rate, corporate TRN identifier, and cryptographic invoice QR compliance'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.tax ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل الضرائب' : 'Expand')}
              </span>
              {openSections.tax ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.tax && (
            <div className="space-y-5 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5">
                  <span className="text-zinc-400 block font-sans">{isAr ? 'نسبة الضريبة القياسية' : 'Standard VAT Rate (%)'}</span>
                  <input
                    type="number"
                    value={vatRate}
                    onChange={(e) => setVatRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#141721] space-y-1.5 border border-white/5 sm:col-span-2">
                  <span className="text-zinc-400 block font-sans">{isAr ? 'الرقم الضريبي للمنشأة (TRN)' : 'Tax Registration Number (TRN)'}</span>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[#C9A86A] font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vatEnabled}
                    onChange={(e) => setVatEnabled(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'تفعيل حساب الضريبة 15%' : 'Enable 15% VAT calculation'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={zatcaQrCode}
                    onChange={(e) => setZatcaQrCode(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'توليد رمز الاستجابة QR لفاتورة زاتكا' : 'Generate ZATCA Cryptographic QR'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={b2bStandardInvoice}
                    onChange={(e) => setB2bStandardInvoice(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'فاتورة ضريبية قياسية للشركات' : 'Standard Tax Invoices for B2B'}</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 3. Payment Gateways & Merchant Infrastructure */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('payments')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'بوابات الدفع الإلكتروني والتحويل البنكي' : 'PAYMENT GATEWAYS & SAUDI SETTLEMENT'}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full hidden sm:inline ${
                    paymentTestMode ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {paymentTestMode ? 'TEST MODE' : 'LIVE PRODUCTION'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'مدى، Apple Pay، تابي، تمارا، التحويل البنكي المؤسسي، والدفع عند الاستلام' : 'Mada, Apple Pay, Tabby, Tamara, B2B Wire Transfer, and POS on delivery'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.payments ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل البوابات' : 'Expand')}
              </span>
              {openSections.payments ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.payments && (
            <div className="space-y-5 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#141721] border border-white/5">
                <span className="text-xs text-zinc-300 font-bold">
                  {isAr ? 'بيئة المعاملات المالية المباشرة:' : 'Financial Settlement Environment:'}
                </span>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className={paymentTestMode ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {paymentTestMode ? 'TEST MODE (SANDBOX)' : 'LIVE PRODUCTION'}
                  </span>
                  <input
                    type="checkbox"
                    checked={paymentTestMode}
                    onChange={(e) => setPaymentTestMode(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                {[
                  { label: 'مدى والبطاقات الائتمانية (Mada / Cards)', state: enableMada, setter: setEnableMada },
                  { label: 'Apple Pay (الدفع السريع المباشر)', state: enableApplePay, setter: setEnableApplePay },
                  { label: 'تابي (تقسيط 4 دفعات بدون فوائد)', state: enableTabby, setter: setEnableTabby },
                  { label: 'تمارا (تقسيط وتمويل فوري)', state: enableTamara, setter: setEnableTamara },
                  { label: 'تحويل بنكي للشركات (الأهلي / الراجحي)', state: enableBankTransfer, setter: setEnableBankTransfer },
                  { label: 'دفع بجهاز نقاط البيع عند الاستلام (POS)', state: enableCodPos, setter: setEnableCodPos },
                ].map((gw, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer hover:border-white/20 transition-all">
                    <input
                      type="checkbox"
                      checked={gw.state}
                      onChange={(e) => gw.setter(e.target.checked)}
                      className="rounded text-[#C9A86A]"
                    />
                    <span className="text-zinc-200 text-[11px] font-semibold">{gw.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Automated Operational & WhatsApp Notifications */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('notifications')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-mono text-xs font-bold shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'التنبيهات التلقائية ومراسلات الواتساب والعمليات' : 'AUTOMATED TELEMETRY & WHATSAPP ALERTS'}
                  </h4>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded-full hidden sm:inline">
                    {isAr ? 'الواتساب نشط' : 'WHATSAPP BOT ON'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr ? 'إشعارات تأكيد الطلب للعميل، تنبيهات سيارات التوصيل، وتنبيه الإدارة المالية' : 'Instant client order confirmations, dispatch vehicle tracking, and finance team threshold alerts'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.notifications ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'تعديل التنبيهات' : 'Expand')}
              </span>
              {openSections.notifications ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.notifications && (
            <div className="space-y-5 pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWhatsappClient}
                    onChange={(e) => setNotifyWhatsappClient(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'إرسال تأكيد الطلب فوراً للعميل عبر واتساب' : 'Instant WhatsApp Order Confirmation to Client'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWhatsappDispatch}
                    onChange={(e) => setNotifyWhatsappDispatch(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'إشعار واتساب بموعد خروج شاحنة التركيب' : 'Driver Dispatch & Live GPS Tracking Notice'}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#141721] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyEmailFinance}
                    onChange={(e) => setNotifyEmailFinance(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-200">{isAr ? 'إشعار فوري للإدارة المالية بالطلبات الكبرى' : 'Instant Email Alert for High-Ticket Orders'}</span>
                </label>

                <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex items-center justify-between gap-2 font-mono">
                  <span className="text-zinc-300 font-sans text-xs">{isAr ? 'حد تنبيه الطلبات الكبرى:' : 'High-Ticket Threshold:'}</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={highTicketAlertThreshold}
                      onChange={(e) => setHighTicketAlertThreshold(Number(e.target.value))}
                      className="w-24 px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-[#C9A86A] text-right font-bold"
                    />
                    <span className="text-zinc-400 text-[10px]">{isAr ? 'ر.س' : 'SAR'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Integrations & Dynamic Secrets Gateway Link */}
        <div className="glass-card rounded-3xl p-6 border border-purple-500/30 bg-[#0F1117]/90 shadow-xl transition-all">
          <div 
            onClick={() => toggleSection('secrets')}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                    {isAr ? 'إدارة مفاتيح الربط البرمجي والمتغيرات السرية' : 'INTEGRATIONS & DYNAMIC SECRETS HUB'}
                  </h4>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 font-mono px-2 py-0.5 rounded-full font-bold hidden sm:inline">
                    {isAr ? 'مُفعّل سحابياً' : 'CLOUD MANAGED'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 block mt-0.5">
                  {isAr 
                    ? 'الربط المباشر مع OpenAI, Google Cloud NanoBanana Pro, WhatsApp, Brevo, Resend'
                    : 'Manage credentials for Brevo, WhatsApp, Resend, OpenAI, NanoBanana Pro in Global Settings'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 hidden sm:inline">
                {openSections.secrets ? (isAr ? 'طي القسم' : 'Collapse') : (isAr ? 'عرض التفاصيل' : 'Expand')}
              </span>
              {openSections.secrets ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </div>
          </div>

          {openSections.secrets && (
            <div className="pt-5 border-t border-white/10 mt-5 animate-in fade-in duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-zinc-300">
                {isAr 
                  ? 'يتم تخزين كافة مفاتيح الربط البرمجي في قاعدة البيانات المركزية المشفرة. يمكنك فحص الاتصال وتحديث المفاتيح عبر لوحة الإعدادات العامة.'
                  : 'All third-party API credentials are securely managed in our encrypted integrations database. You can test live connections in Global Settings.'}
              </p>
              <a
                href="/admin/system/settings#secrets"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <span>{isAr ? 'فتح بوابة المفاتيح والتكاملات' : 'Open Secrets Hub'}</span>
                <span className="rtl:rotate-180">&rarr;</span>
              </a>
            </div>
          )}
        </div>

      </div>

    </form>
  );
}
