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
  Truck,
  FileText,
  Download,
  Printer,
  Factory,
  Package,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function AnalyticsTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [period, setPeriod] = useState<'this_month' | 'last_month' | 'q3_2026' | 'ytd'>('this_month');
  const [activeReportTab, setActiveReportTab] = useState<'sales' | 'factory' | 'customers' | 'inventory' | 'zatca'>('sales');

  const handleExportCSV = (reportType: string) => {
    let headers = '';
    let rows: string[] = [];
    let filename = '';

    if (reportType === 'sales') {
      headers = 'Date,Order Ref,Customer,Category,Payment Gateway,Gross SAR,VAT 15% SAR,Net SAR';
      rows = [
        '"2026-08-28","WD-ORD-2026-8812","سلطان بن عبدالعزيز آل سعود","Living & Lounge","Apple Pay",47662,6217,41445',
        '"2026-08-26","WD-ORD-2026-8805","فندق سويس بلو","Hospitality Suites","B2B PO",126787,16537,110250',
        '"2026-08-25","WD-ORD-2026-8798","م. خالد المنصور","Living & Lounge","Tabby",21735,2835,18900',
        '"2026-08-24","WD-ORD-2026-8782","شركة طويق للاستثمار","Architectural Joinery","Bank Transfer",78660,10260,68400',
      ];
      filename = `greenwood-financial-report-${period}.csv`;
    } else if (reportType === 'factory') {
      headers = 'Plant ID,Plant Name,Active Jobs,Capacity Load %,Avg Lead Time Days,Scrap Rate %,On-Time Delivery %';
      rows = [
        '"PL-01","Plant 1: 5-Axis Wood & Joinery",14,78%,11.2,1.2%,98.4%',
        '"PL-02","Plant 2: Architectural Metals & Brass",6,45%,8.5,0.8%,99.1%',
        '"PL-03","Plant 3: Italian Leather & Upholstery",18,85%,13.4,1.9%,96.8%',
      ];
      filename = `greenwood-manufacturing-telemetry-${period}.csv`;
    } else if (reportType === 'customers') {
      headers = 'Client Ref,Client Name,Segment,Total Orders,Lifetime Spend SAR,Last Order Date';
      rows = [
        '"VIP-001","سلطان بن عبدالعزيز آل سعود","Royal & VIP",4,218000,"2026-08-28"',
        '"B2B-019","فندق سويس بلو","Hospitality Contract",3,380000,"2026-08-26"',
        '"VIP-042","شركة طويق للاستثمار","Corporate HQ",2,154000,"2026-08-24"',
        '"RET-109","م. خالد المنصور","Architect / Residential",1,21735,"2026-08-25"',
      ];
      filename = `greenwood-customer-ltv-cohorts.csv`;
    } else if (reportType === 'zatca') {
      headers = 'Tax Period,Taxable Sales 15% SAR,Output VAT Collected SAR,Zero-Rated Sales SAR,Total Tax Due SAR';
      rows = [
        '"Q3 2026 (Jul-Aug)","1285000","192750","0","192750"',
        '"Q2 2026 (Apr-Jun)","1420000","213000","0","213000"',
      ];
      filename = `zatca-vat-audit-summary.csv`;
    } else {
      headers = 'SKU,Item Name,Category,Factory Stock Units,Safety Threshold,Turnover Days,Status';
      rows = [
        '"GW-LV-801","The Al-Diriyah Modular Sofa","Living",2,3,14,"Low Stock"',
        '"GW-BD-702","SwissBlue Suite Bed & Joinery","Hospitality",4,2,21,"Healthy"',
        '"GW-TB-405","The Najran Travertine Table","Living",1,2,10,"Reorder Urgently"',
      ];
      filename = `greenwood-inventory-velocity.csv`;
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(isAr ? 'تم تصدير التقرير بصيغة CSV' : `Exported ${reportType} report as CSV`, 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C9A86A]" />
            <span>{isAr ? 'مركز التقارير والذكاء التجاري والتشغيلي' : 'Enterprise Reports & Business Intelligence Hub'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'تقارير مالية تفصيلية، إنتاجية المصانع، كبار العملاء (LTV)، وإقرارات الزكاة والضريبة.' : 'Generate multi-factor sales analytics, CNC telemetry, VIP customer cohorts, and ZATCA audit reports.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as any)}
              className="appearance-none px-3.5 py-2.5 pr-8 rtl:pr-3.5 rtl:pl-8 rounded-xl bg-[#141721] border border-white/10 text-white text-xs font-mono focus:border-[#C9A86A] cursor-pointer"
            >
              <option value="this_month">{isAr ? 'هذا الشهر (أغسطس 2026)' : 'This Month (Aug 2026)'}</option>
              <option value="last_month">{isAr ? 'الشهر السابق (يوليو 2026)' : 'Last Month (Jul 2026)'}</option>
              <option value="q3_2026">{isAr ? 'الربع الثالث (Q3 2026)' : 'Q3 2026'}</option>
              <option value="ytd">{isAr ? 'من بداية العام حتى تاريخه (YTD)' : 'Year-to-Date (YTD)'}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 rtl:right-auto rtl:left-2.5 top-3 pointer-events-none" />
          </div>

          <button
            onClick={() => handleExportCSV(activeReportTab)}
            className="px-4 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#DFBA73] text-[#08090C] text-xs font-mono font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isAr ? 'تصدير التقرير الحالي' : 'Export Current Report'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">{isAr ? 'إجمالي المبيعات المحققة' : 'Gross Sales (SAR)'}</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">584,200</span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              +28.4%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">{isAr ? '42 طلباً معتمداً بالمملكة' : '42 verified completed orders'}</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">{isAr ? 'متوسط قيمة الطلب (AOV)' : 'Average Order (AOV)'}</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">21,500</span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              +14.2%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">{isAr ? 'أجنحة الفنادق وصوالين القصور' : 'High-ticket hospitality suites'}</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">{isAr ? 'صافي الإيراد بعد الضريبة' : 'Net Revenue (Excl. VAT)'}</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#C9A86A] font-mono">508,000</span>
            <span className="text-xs font-mono text-zinc-400 font-bold">
              15% VAT Out
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">76,200 SAR {isAr ? 'ضريبة مستحقة للزكاة' : 'VAT collected for ZATCA'}</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <span className="text-xs text-zinc-400 font-mono uppercase block">{isAr ? 'معدل التسليم الميداني بالموعد' : 'On-Time Assembly Rate'}</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">98.2%</span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              Top 1%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">{isAr ? 'بواسطة فريق White-Glove' : 'By internal White-Glove crews'}</p>
        </div>
      </div>

      {/* 3. Specialized Multi-Factor Reports Selector */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <button
            onClick={() => setActiveReportTab('sales')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeReportTab === 'sales'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{isAr ? '1. تقرير الإيرادات وقنوات الدفع' : '1. Sales & Gateway Report'}</span>
          </button>

          <button
            onClick={() => setActiveReportTab('factory')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeReportTab === 'factory'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>{isAr ? '2. تقرير إنتاجية المصانع وCNC' : '2. Factory Production Report'}</span>
          </button>

          <button
            onClick={() => setActiveReportTab('customers')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeReportTab === 'customers'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isAr ? '3. تقرير كبار العملاء والفنادق (LTV)' : '3. VIP & Hospitality LTV'}</span>
          </button>

          <button
            onClick={() => setActiveReportTab('inventory')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeReportTab === 'inventory'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{isAr ? '4. تقرير دوران المخزون ونقاط الطلب' : '4. Inventory Velocity Report'}</span>
          </button>

          <button
            onClick={() => setActiveReportTab('zatca')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeReportTab === 'zatca'
                ? 'bg-[#C9A86A] text-[#08090C] shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAr ? '5. تقرير إقرار الزكاة والضريبة (ZATCA)' : '5. ZATCA Tax Audit Report'}</span>
          </button>
        </div>

        {/* Report Container */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
          
          {/* Report 1: Sales & Gateway */}
          {activeReportTab === 'sales' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#C9A86A]" />
                  <span>{isAr ? 'تفاصيل المبيعات حسب بوابات الدفع والمناطق' : 'Sales Breakdown by Gateway & Geographic Region'}</span>
                </h4>
                <button
                  onClick={() => handleExportCSV('sales')}
                  className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تصدير جدول الإيرادات CSV' : 'Export CSV'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Gateway Share */}
                <div className="space-y-3 font-mono text-xs">
                  <span className="text-zinc-400 block font-bold uppercase">{isAr ? 'حصة بوابات الدفع' : 'Payment Gateways'}</span>
                  {[
                    { label: 'مدى والبطاقات (Mada / Credit)', share: '38%', sar: '221,996 SAR', color: 'bg-emerald-500' },
                    { label: 'Apple Pay المباشر', share: '24%', sar: '140,208 SAR', color: 'bg-blue-500' },
                    { label: 'تابي وتقسيط 4 دفعات (Tabby)', share: '18%', sar: '105,156 SAR', color: 'bg-purple-500' },
                    { label: 'تحويل بنكي وأوامر شراء (B2B PO)', share: '20%', sar: '116,840 SAR', color: 'bg-[#C9A86A]' },
                  ].map((g, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-zinc-300">
                        <span>{g.label}</span>
                        <span className="font-bold text-white">{g.share} ({g.sar})</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${g.color}`} style={{ width: g.share }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Region Share */}
                <div className="space-y-3 font-mono text-xs">
                  <span className="text-zinc-400 block font-bold uppercase">{isAr ? 'التوزيع الجغرافي للشحن بالمملكة' : 'Geographic Distribution'}</span>
                  {[
                    { label: 'منطقة الرياض (Riyadh Hub)', share: '52%', sar: '303,784 SAR', color: 'bg-[#C9A86A]' },
                    { label: 'المنطقة الغربية (Jeddah, Makkah)', share: '28%', sar: '163,576 SAR', color: 'bg-sky-500' },
                    { label: 'المنطقة الشرقية (Khobar, Dammam)', share: '14%', sar: '81,788 SAR', color: 'bg-amber-500' },
                    { label: 'الجنوب والشمال (Tabuk, Al-Ula, Asir)', share: '6%', sar: '35,052 SAR', color: 'bg-purple-500' },
                  ].map((r, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-zinc-300">
                        <span>{r.label}</span>
                        <span className="font-bold text-white">{r.share} ({r.sar})</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${r.color}`} style={{ width: r.share }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Report 2: Factory Telemetry */}
          {activeReportTab === 'factory' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
                  <Factory className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'مؤشرات أداء خطوط الإنتاج وماكينات CNC' : 'GreenWood Plants Telemetry & Scrap Metrics'}</span>
                </h4>
                <button
                  onClick={() => handleExportCSV('factory')}
                  className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Factory Telemetry CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[10px]">
                      <th className="py-3 px-4">Plant Workcenter</th>
                      <th className="py-3 px-4">Active Jobs</th>
                      <th className="py-3 px-4">Capacity Load</th>
                      <th className="py-3 px-4">Avg Lead Time</th>
                      <th className="py-3 px-4">Scrap Rate</th>
                      <th className="py-3 px-4">On-Time Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">Plant 1: 5-Axis Wood & Joinery</td>
                      <td className="py-3 px-4 text-zinc-300">14 Orders</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">78% Load</td>
                      <td className="py-3 px-4 text-zinc-300">11.2 Days</td>
                      <td className="py-3 px-4 text-emerald-400">1.2%</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">98.4%</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">Plant 2: Architectural Metals & Brass</td>
                      <td className="py-3 px-4 text-zinc-300">6 Orders</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">45% Load</td>
                      <td className="py-3 px-4 text-zinc-300">8.5 Days</td>
                      <td className="py-3 px-4 text-emerald-400">0.8%</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">99.1%</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">Plant 3: Italian Leather & Upholstery</td>
                      <td className="py-3 px-4 text-zinc-300">18 Orders</td>
                      <td className="py-3 px-4 text-rose-400 font-bold">85% Load</td>
                      <td className="py-3 px-4 text-zinc-300">13.4 Days</td>
                      <td className="py-3 px-4 text-emerald-400">1.9%</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">96.8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report 3: VIP Customers & LTV */}
          {activeReportTab === 'customers' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? 'تصنيف كبار العملاء والفنادق حسب القيمة الدائمة (LTV)' : 'Top VIP & Hospitality Procurement Accounts'}</span>
                </h4>
                <button
                  onClick={() => handleExportCSV('customers')}
                  className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Client LTV CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[10px]">
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Segment</th>
                      <th className="py-3 px-4">Orders Completed</th>
                      <th className="py-3 px-4">Lifetime Spend (SAR)</th>
                      <th className="py-3 px-4">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">سلطان بن عبدالعزيز آل سعود</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">Royal VIP</td>
                      <td className="py-3 px-4 text-zinc-300">4 Contracts</td>
                      <td className="py-3 px-4 text-[#C9A86A] font-extrabold">218,000 SAR</td>
                      <td className="py-3 px-4 text-zinc-400">2026-08-28</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">فندق سويس بلو (SwissBlue Hotels)</td>
                      <td className="py-3 px-4 text-blue-400 font-bold">Hospitality Partner</td>
                      <td className="py-3 px-4 text-zinc-300">3 Turnkey Suites</td>
                      <td className="py-3 px-4 text-[#C9A86A] font-extrabold">380,000 SAR</td>
                      <td className="py-3 px-4 text-zinc-400">2026-08-26</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white">شركة طويق للاستثمار والتطوير</td>
                      <td className="py-3 px-4 text-purple-400 font-bold">Corporate Commercial</td>
                      <td className="py-3 px-4 text-zinc-300">2 Boardrooms</td>
                      <td className="py-3 px-4 text-[#C9A86A] font-extrabold">154,000 SAR</td>
                      <td className="py-3 px-4 text-zinc-400">2026-08-24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report 4: Inventory Velocity */}
          {activeReportTab === 'inventory' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'معدل دوران المخزون والتنبؤ بإعادة الطلب' : 'Inventory Turnover & Replenishment Velocity'}</span>
                </h4>
                <button
                  onClick={() => handleExportCSV('inventory')}
                  className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Inventory CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[10px]">
                      <th className="py-3 px-4">SKU Code</th>
                      <th className="py-3 px-4">Furniture Piece</th>
                      <th className="py-3 px-4">Plant Stock</th>
                      <th className="py-3 px-4">Safety Limit</th>
                      <th className="py-3 px-4">Turnover Rate</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-[#C9A86A] font-bold">GW-LV-801</td>
                      <td className="py-3 px-4 text-white">The Al-Diriyah Modular Curved Sofa</td>
                      <td className="py-3 px-4 text-rose-400 font-bold">2 units</td>
                      <td className="py-3 px-4 text-zinc-400">3 units</td>
                      <td className="py-3 px-4 text-zinc-300">14 Days</td>
                      <td className="py-3 px-4 text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">Low Stock Alert</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-[#C9A86A] font-bold">GW-BD-702</td>
                      <td className="py-3 px-4 text-white">SwissBlue Presidential Suite Bed</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">4 units</td>
                      <td className="py-3 px-4 text-zinc-400">2 units</td>
                      <td className="py-3 px-4 text-zinc-300">21 Days</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-[#C9A86A] font-bold">GW-TB-405</td>
                      <td className="py-3 px-4 text-white">The Najran Travertine Coffee Table</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">1 unit</td>
                      <td className="py-3 px-4 text-zinc-400">2 units</td>
                      <td className="py-3 px-4 text-zinc-300">10 Days</td>
                      <td className="py-3 px-4 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">Reorder Triggered</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report 5: ZATCA Tax Audit */}
          {activeReportTab === 'zatca' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>{isAr ? 'ملخص الإقرار الضريبي لهيئة الزكاة والضريبة والجمارك (ZATCA)' : 'ZATCA Quarterly Tax Filing & VAT Reconciliation'}</span>
                </h4>
                <button
                  onClick={() => handleExportCSV('zatca')}
                  className="text-xs font-mono text-[#C9A86A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export ZATCA CSV</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-400 text-[10px] uppercase block">Taxable Supplies (15%)</span>
                  <span className="text-lg font-bold text-white">1,285,000 SAR</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-400 text-[10px] uppercase block">Total Output VAT Collected</span>
                  <span className="text-lg font-bold text-emerald-400">192,750 SAR</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-1">
                  <span className="text-zinc-400 text-[10px] uppercase block">Zero-Rated / Export Sales</span>
                  <span className="text-lg font-bold text-zinc-400">0.00 SAR</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
