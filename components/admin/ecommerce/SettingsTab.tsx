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
  FileText
} from 'lucide-react';

export default function SettingsTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

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

  // 5. Manufacturing & Warranty Governance
  const [warrantyYears, setWarrantyYears] = useState(5);
  const [requireShopDrawingSignoff, setRequireShopDrawingSignoff] = useState(true);
  const [cadModelDownloadable, setCadModelDownloadable] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isAr ? 'تم حفظ كافة إعدادات المتجر ومنظومة العمليات' : 'All store settings and operational policies saved successfully', 'success');
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-8 max-w-5xl">
      
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

      {/* 2. Saudi Regional White-Glove Installation Matrix */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 bg-[#0F1117]/90 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'مصفوفة رسوم الشحن والتركيب الفندقي لمناطق المملكة' : 'Saudi Regional White-Glove Installation Rates'}</span>
          </h4>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            {isAr ? '5 مناطق مغطاة بالكامل' : '5 Saudi Zones Active'}
          </span>
        </div>

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

      {/* 3. ZATCA Phase 2 E-Invoicing & VAT Compliance */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 bg-[#0F1117]/90 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'الامتثال للفوترة الإلكترونية وضريبة القيمة المضافة (ZATCA Phase 2)' : 'ZATCA Phase-2 E-Invoicing & VAT Rules'}</span>
          </h4>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'متوافق مع هيئة الزكاة' : 'ZATCA Certified'}</span>
          </span>
        </div>

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

      {/* 4. Payment Gateways & Merchant Infrastructure */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 bg-[#0F1117]/90 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'بوابات الدفع الإلكتروني والتحويل البنكي' : 'Payment Gateways & Saudi Settlement Infrastructure'}</span>
          </h4>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className={paymentTestMode ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {paymentTestMode ? 'TEST MODE' : 'LIVE PRODUCTION'}
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

      {/* 5. Automated Operational & WhatsApp Notifications */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 bg-[#0F1117]/90 space-y-5 shadow-xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <span>{isAr ? 'التنبيهات التلقائية ومراسلات الواتساب' : 'Automated Telemetry & WhatsApp Alerts'}</span>
        </h4>

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

      {/* 6. Integrations & Dynamic Secrets Gateway Link */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-purple-500/30 bg-[#0F1117]/90 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{isAr ? 'إدارة مفاتيح الربط البرمجي والمتغيرات السرية' : 'Integrations & Dynamic Secrets Hub'}</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-mono px-2 py-0.5 rounded-full font-bold">
                  {isAr ? 'مُفعّل سحابياً' : 'CLOUD MANAGED'}
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isAr 
                  ? 'يمكنك تعديل مفاتيح Brevo, WhatsApp, Resend, OpenAI, NanoBanana Pro والمتغيرات المخصصة عبر بوابة الإعدادات العامة.'
                  : 'Manage credentials for Brevo, WhatsApp, Resend, OpenAI, NanoBanana Pro, and custom variables in Global Settings.'}
              </p>
            </div>
          </div>

          <a
            href="/admin/system/settings"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <span>{isAr ? 'فتح بوابة المفاتيح والتكاملات' : 'Open Secrets Hub'}</span>
            <span className="rtl:rotate-180">&rarr;</span>
          </a>
        </div>
      </div>

    </form>
  );
}
