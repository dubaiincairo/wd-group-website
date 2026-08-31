'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  TrendingUp, 
  CreditCard, 
  MapPin, 
  Layers, 
  FileSpreadsheet, 
  Calendar, 
  ArrowUpRight, 
  Percent, 
  DollarSign, 
  Users, 
  Truck
} from 'lucide-react';

export default function AnalyticsTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [period, setPeriod] = useState<'this_month' | 'last_month' | 'q3_2026' | 'ytd'>('this_month');

  const handleExportReport = () => {
    const content = `Period: ${period}\nGross Revenue: 584,200 SAR\nAOV: 21,500 SAR\nConversion Rate: 3.42%\nTop Region: Riyadh (52%)\nTop Gateway: Mada/Cards (38%)\nExport Date: ${new Date().toISOString()}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${period}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(isAr ? 'تم تصدير التقرير التحليلي' : 'Exported analytics summary report', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Period Comparison Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'التحليلات المالية والتقارير المقارنة' : 'Financial Analytics & Period Comparison'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'مقارنة فترات المبيعات، بوابات الدفع، والتوزيع الجغرافي للشحن بالمملكة.' : 'In-depth performance by channel, category, gateway, and Saudi regions.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="px-3.5 py-2 rounded-xl bg-[#141721] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#C9A86A]"
          >
            <option value="this_month">{isAr ? 'هذا الشهر (أغسطس 2026)' : 'This Month (Aug 2026)'}</option>
            <option value="last_month">{isAr ? 'الشهر السابق (يوليو 2026)' : 'Last Month (Jul 2026)'}</option>
            <option value="q3_2026">{isAr ? 'الربع الثالث (Q3 2026)' : 'Q3 2026'}</option>
            <option value="ytd">{isAr ? 'من بداية العام حتى تاريخه (YTD)' : 'Year-to-Date (YTD)'}</option>
          </select>

          <button
            onClick={handleExportReport}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>{isAr ? 'تصدير التقرير' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Comparison Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">Gross Sales (SAR)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">584,200</span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              +28.4% vs last
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">42 verified customer orders</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">Average Order Value (AOV)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">21,500</span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              +14.2% vs last
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">Driven by SwissBlue Suites & Tuwaiq sets</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">Cart Abandonment Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">18.6%</span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              -4.1% vs avg
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">Low due to seamless Tabby / Tamara checkout</p>
        </div>
      </div>

      {/* 3. Category & Gateway Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Share */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C9A86A]" />
            <span>Revenue Share by Furniture Category</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Living Room & Salons (Al-Diriyah, Al-Ula)</span>
                <span className="text-[#C9A86A] font-bold">42% (245,364 SAR)</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#C9A86A] h-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Hospitality & Hotel Suites (SwissBlue Bed)</span>
                <span className="text-blue-400 font-bold">35% (204,470 SAR)</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '35%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Executive Offices & Boardrooms (Tuwaiq Table)</span>
                <span className="text-purple-400 font-bold">15% (87,630 SAR)</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Dining & Architectural Joinery (Rawdah, Riyadh)</span>
                <span className="text-emerald-400 font-bold">8% (46,736 SAR)</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Saudi Payment Gateways Volume Share</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
              <span>💳 Mada & Credit Cards</span>
              <span className="text-[#C9A86A] font-bold">38% (222,000 SAR)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
              <span>🍎 Apple Pay Direct</span>
              <span className="text-[#C9A86A] font-bold">25% (146,050 SAR)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
              <span>🏢 B2B PO Corporate Terms</span>
              <span className="text-blue-400 font-bold">21% (122,500 SAR)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
              <span>🟢 Tabby 4-Month Installments</span>
              <span className="text-emerald-400 font-bold">11% (64,250 SAR)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141721] flex justify-between items-center">
              <span>🏦 Corporate Bank Wire (Al Rajhi / SNB)</span>
              <span className="text-purple-400 font-bold">5% (29,400 SAR)</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Regional Coverage Map / Distribution */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#C9A86A]" />
          <span>Regional Saudi White-Glove Installation Coverage</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#141721] border border-white/5 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">Central Province</span>
            <span className="text-white font-bold text-sm block">Riyadh Region</span>
            <span className="text-emerald-400 font-bold">52% (303,784 SAR)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#141721] border border-white/5 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">Western Province</span>
            <span className="text-white font-bold text-sm block">Jeddah & Mecca</span>
            <span className="text-emerald-400 font-bold">26% (151,892 SAR)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#141721] border border-white/5 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">Eastern Province</span>
            <span className="text-white font-bold text-sm block">Khobar & Dammam</span>
            <span className="text-emerald-400 font-bold">14% (81,788 SAR)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#141721] border border-white/5 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">Southern & Northern</span>
            <span className="text-white font-bold text-sm block">Najran, Abha & Tabuk</span>
            <span className="text-emerald-400 font-bold">8% (46,736 SAR)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
