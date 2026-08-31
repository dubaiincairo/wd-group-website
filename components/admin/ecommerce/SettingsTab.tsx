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
  Lock
} from 'lucide-react';

export default function SettingsTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [freeShippingThreshold, setFreeShippingThreshold] = useState(15000);
  const [vatRate, setVatRate] = useState(15);
  const [vatEnabled, setVatEnabled] = useState(true);

  // Notification Toggles
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyFactoryDelay, setNotifyFactoryDelay] = useState(true);

  // Shipping Rates
  const [riyadhRate, setRiyadhRate] = useState(0); // Free white-glove in Riyadh
  const [westernRate, setWesternRate] = useState(450);
  const [easternRate, setEasternRate] = useState(400);
  const [southernRate, setSouthernRate] = useState(650);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isAr ? 'تم حفظ إعدادات المتجر وعمليات الشحن' : 'E-Commerce store settings saved successfully', 'success');
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'إعدادات المتجر وقواعد الشحن والضرائب' : 'Store Configuration, Shipping & Tax Rules'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'ضبط مصفوفة رسوم التركيب الفندقي لمناطق المملكة وضريبة القيمة المضافة.' : 'Configure Saudi white-glove shipping rates, VAT calculation, and notification alerts.'}
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs flex items-center gap-1.5 shadow-md cursor-pointer font-mono"
        >
          <Save className="w-4 h-4" />
          <span>{isAr ? 'حفظ الإعدادات' : 'Save Changes'}</span>
        </button>
      </div>

      {/* 2. Regional Shipping & Assembly Matrix */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-5 shadow-xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#C9A86A]" />
          <span>Saudi Regional White-Glove Installation Fees</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#141721] space-y-1">
            <label className="text-zinc-400 block">Riyadh Province (Central Hub)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={riyadhRate}
                onChange={(e) => setRiyadhRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold"
              />
              <span className="text-emerald-400">SAR (0 = Free)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141721] space-y-1">
            <label className="text-zinc-400 block">Western Province (Jeddah, Mecca, Medina)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={westernRate}
                onChange={(e) => setWesternRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold"
              />
              <span className="text-zinc-400">SAR</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141721] space-y-1">
            <label className="text-zinc-400 block">Eastern Province (Khobar, Dammam, Jubail)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={easternRate}
                onChange={(e) => setEasternRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold"
              />
              <span className="text-zinc-400">SAR</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141721] space-y-1">
            <label className="text-zinc-400 block">Southern & Northern (Najran, Abha, Tabuk)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={southernRate}
                onChange={(e) => setSouthernRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold"
              />
              <span className="text-zinc-400">SAR</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141721] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-white font-bold block">Complimentary White-Glove Assembly Threshold</span>
            <span className="text-zinc-400 text-[11px]">Free delivery and assembly applied when cart exceeds:</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              className="w-32 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-emerald-400 font-bold text-sm"
            />
            <span className="text-zinc-400">SAR</span>
          </div>
        </div>
      </div>

      {/* 3. Tax & VAT Rules */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Percent className="w-4 h-4 text-emerald-400" />
          <span>ZATCA & Saudi VAT Configuration</span>
        </h4>

        <div className="flex items-center justify-between p-4 rounded-xl bg-[#141721] text-xs">
          <div>
            <span className="text-white font-bold block">Apply 15% Saudi Value Added Tax (VAT)</span>
            <span className="text-zinc-400 text-[11px]">Standard ZATCA electronic invoicing compliance</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={vatEnabled}
              onChange={(e) => setVatEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A86A]"></div>
          </label>
        </div>
      </div>

      {/* 4. Automated Operations Notifications */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <span>Operational Notifications & Client SMS</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141721]">
            <div>
              <span className="text-white font-bold block">Instant WhatsApp Client Dispatch Alerts</span>
              <span className="text-zinc-400 text-[11px]">Send tracking updates automatically upon stage progression</span>
            </div>
            <input
              type="checkbox"
              checked={notifyWhatsapp}
              onChange={(e) => setNotifyWhatsapp(e.target.checked)}
              className="w-4 h-4 rounded text-[#C9A86A]"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#141721]">
            <div>
              <span className="text-white font-bold block">Admin Email On High-Ticket Orders ({'>'} 50,000 SAR)</span>
              <span className="text-zinc-400 text-[11px]">Notify operations lead for priority CAD verification</span>
            </div>
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.checked)}
              className="w-4 h-4 rounded text-[#C9A86A]"
            />
          </div>
        </div>
      </div>

    </form>
  );
}
