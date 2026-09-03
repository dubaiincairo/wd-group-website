'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { FURNITURE_CATALOG, FurnitureItem } from '@/lib/furnitureData';
import { 
  Factory, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRightLeft, 
  History, 
  Plus, 
  Search, 
  Warehouse, 
  Truck,
  Box,
  X
} from 'lucide-react';

interface StockTransferRecord {
  id: string;
  sku: string;
  productNameEn: string;
  productNameAr: string;
  fromLocationEn: string;
  fromLocationAr: string;
  toLocationEn: string;
  toLocationAr: string;
  quantity: number;
  date: string;
  operatorEn: string;
  operatorAr: string;
  status: 'completed' | 'in_transit';
}

const INITIAL_TRANSFERS: StockTransferRecord[] = [
  {
    id: 'tr-01',
    sku: 'GW-LV-801',
    productNameEn: 'The Al-Diriyah Modular Curved Sofa',
    productNameAr: 'أريكة الدرعية المنحنية الفاخرة',
    fromLocationEn: 'Factory 1 — Riyadh Wood & Joinery',
    fromLocationAr: 'مصنع 1 — أخشاب ونجارة الرياض',
    toLocationEn: 'Jeddah Hospitality Hub (Western)',
    toLocationAr: 'مركز جدة للضيافة (المنطقة الغربية)',
    quantity: 3,
    date: '30/08/2026',
    operatorEn: 'Eng. Fahad Al-Ghamdi',
    operatorAr: 'م. فهد الغامدي',
    status: 'in_transit',
  },
  {
    id: 'tr-02',
    sku: 'GW-BD-702',
    productNameEn: 'SwissBlue Suite Bed & Fluted Joinery',
    productNameAr: 'سرير الجناح الرئاسي سويس بلو والتجاليد',
    fromLocationEn: 'Factory 1 — Riyadh Wood & Joinery',
    fromLocationAr: 'مصنع 1 — أخشاب ونجارة الرياض',
    toLocationEn: 'SwissBlue Jeddah Hotel Site',
    toLocationAr: 'موقع فندق سويس بلو جدة',
    quantity: 5,
    date: '28/08/2026',
    operatorEn: 'Eng. Yasser Al-Qahtani',
    operatorAr: 'م. ياسر القحطاني',
    status: 'completed',
  },
  {
    id: 'tr-03',
    sku: 'GW-TB-405',
    productNameEn: 'The Najran Travertine Coffee Table',
    productNameAr: 'طاولة قهوة نجران من الترافرتين',
    fromLocationEn: 'Najran Stone Quarry Depot',
    fromLocationAr: 'مستودع محجر رخام نجران',
    toLocationEn: 'Factory 1 Assembly Yard',
    toLocationAr: 'ساحة التجميع بمصنع 1',
    quantity: 8,
    date: '26/08/2026',
    operatorEn: 'Logistics Team',
    operatorAr: 'فريق العمليات اللوجستية',
    status: 'completed',
  },
];

export default function InventoryTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [stockItems, setStockItems] = useState([
    { 
      sku: 'GW-LV-801', 
      nameEn: 'The Al-Diriyah Modular Sofa', 
      nameAr: 'أريكة الدرعية المنحنية الفاخرة',
      locationEn: 'Factory 1 & 3 (Riyadh)', 
      locationAr: 'مصنع 1 و 3 (الرياض)',
      stock: 2, 
      minThreshold: 4, 
      leadTimeEn: '10-14 days', 
      leadTimeAr: '10-14 يوماً',
      isLow: true 
    },
    { 
      sku: 'GW-TB-405', 
      nameEn: 'Najran Travertine Table', 
      nameAr: 'طاولة قهوة نجران من الترافرتين',
      locationEn: 'Najran Stone Yard', 
      locationAr: 'محجر أحجار نجران',
      stock: 6, 
      minThreshold: 3, 
      leadTimeEn: '8-12 days', 
      leadTimeAr: '8-12 يوماً',
      isLow: false 
    },
    { 
      sku: 'GW-BD-702', 
      nameEn: 'SwissBlue Suite Bed', 
      nameAr: 'سرير الجناح الرئاسي سويس بلو',
      locationEn: 'Factory 1 (Riyadh)', 
      locationAr: 'مصنع 1 (الرياض)',
      stock: 1, 
      minThreshold: 3, 
      leadTimeEn: '14-18 days', 
      leadTimeAr: '14-18 يوماً',
      isLow: true 
    },
    { 
      sku: 'GW-CH-304', 
      nameEn: 'Al-Ula Lounge Armchair', 
      nameAr: 'كرسي الاسترخاء النحتي العلا',
      locationEn: 'Factory 3 Upholstery', 
      locationAr: 'مصنع 3 للتنجيد والجلود',
      stock: 5, 
      minThreshold: 2, 
      leadTimeEn: '7-10 days', 
      leadTimeAr: '7-10 أيام',
      isLow: false 
    },
    { 
      sku: 'GW-JN-550', 
      nameEn: 'Rawdah Fluted Credenza', 
      nameAr: 'خزانة الروضة المضلعة الفاخرة',
      locationEn: 'Factory 1 (Riyadh)', 
      locationAr: 'مصنع 1 (الرياض)',
      stock: 4, 
      minThreshold: 2, 
      leadTimeEn: '12-16 days', 
      leadTimeAr: '12-16 يوماً',
      isLow: false 
    },
    { 
      sku: 'GW-EX-990', 
      nameEn: 'Tuwaiq Boardroom Table', 
      nameAr: 'طاولة اجتماعات طويق التنفيذية',
      locationEn: 'Factory 1 & 2 (Riyadh)', 
      locationAr: 'مصنع 1 و 2 (الرياض)',
      stock: 3, 
      minThreshold: 2, 
      leadTimeEn: '16-22 days', 
      leadTimeAr: '16-22 يوماً',
      isLow: false 
    },
  ]);

  const [transfers, setTransfers] = useState<StockTransferRecord[]>(INITIAL_TRANSFERS);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Transfer Form State
  const [transferSku, setTransferSku] = useState('GW-LV-801');
  const [transferFrom, setTransferFrom] = useState('Factory 1 — Riyadh Wood & Joinery');
  const [transferTo, setTransferTo] = useState('Jeddah Hospitality Hub (Western)');
  const [transferQty, setTransferQty] = useState(2);

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const item = stockItems.find(s => s.sku === transferSku);
    const newTr: StockTransferRecord = {
      id: `tr-${Date.now()}`,
      sku: transferSku,
      productNameEn: item?.nameEn || 'Custom Piece',
      productNameAr: item?.nameAr || 'قطعة مخصصة',
      fromLocationEn: transferFrom,
      fromLocationAr: transferFrom,
      toLocationEn: transferTo,
      toLocationAr: transferTo,
      quantity: Number(transferQty),
      date: new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-GB'),
      operatorEn: 'Admin Dispatcher',
      operatorAr: 'مسؤول الترحيل اللوجستي',
      status: 'in_transit',
    };
    setTransfers([newTr, ...transfers]);
    setIsTransferModalOpen(false);
    showToast(isAr ? 'تم إنشاء أمر النقل اللوجستي بين المستودعات والمصانع' : 'Warehouse transfer dispatched successfully', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Top Plants Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Plant 1 */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'مركز مستودعات الرياض الرئيسي' : 'Riyadh Central Hub'}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
              {isAr ? 'مصنع 1 و 2' : 'Factory 1 & 2'}
            </span>
          </div>
          <p className="text-xl font-extrabold text-white font-mono">
            18 {isAr ? 'قطعة جاهزة' : 'Finished Units'}
          </p>
          <span className="text-[10px] text-zinc-400 font-mono block">
            {isAr ? 'أعمال خشبية، ماكينات CNC ومعادن معمارية' : 'Wood Joinery, CNC & Architectural Metal'}
          </span>
        </div>

        {/* Plant 2 */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'مركز تنجيد الرياض الفاخر' : 'Riyadh Upholstery Center'}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
              {isAr ? 'مصنع 3' : 'Factory 3'}
            </span>
          </div>
          <p className="text-xl font-extrabold text-white font-mono">
            11 {isAr ? 'قطعة جاهزة' : 'Finished Units'}
          </p>
          <span className="text-[10px] text-zinc-400 font-mono block">
            {isAr ? 'خط أقمشة البوكليه، المخمل والجلود الإيطالية' : 'Bouclé, Velvet & Italian Hides line'}
          </span>
        </div>

        {/* Plant 3 */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-sky-400" />
              <span>{isAr ? 'مستودع جدة الفندقي الغربي' : 'Jeddah Hospitality Depot'}</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
              {isAr ? 'المركز الغربي' : 'Western Hub'}
            </span>
          </div>
          <p className="text-xl font-extrabold text-white font-mono">
            8 {isAr ? 'قطع جاهزة' : 'Finished Units'}
          </p>
          <span className="text-[10px] text-zinc-400 font-mono block">
            {isAr ? 'تجهيز سريع لمنشآت البحر الأحمر وسويس بلو' : 'White-Glove fast dispatch for Red Sea & SwissBlue'}
          </span>
        </div>
      </div>

      {/* 2. Stock Health Table */}
      <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'مستويات المخزون اللحظية وحدود إعادة الطلب' : 'Real-Time Stock Levels & Reorder Thresholds'}</span>
            </h3>
            <p className="text-xs text-zinc-400">
              {isAr ? 'مراقبة كميات القطع الجاهزة بالمستودعات والمصانع' : 'Instant visibility across ready stock vs custom manufacturing'}
            </p>
          </div>

          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>{isAr ? 'أمر نقل مخزني جديد' : 'New Stock Transfer'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">{isAr ? 'اسم القطعة' : 'Furniture Piece'}</th>
                <th className="py-3 px-4">{isAr ? 'موقع المستودع' : 'Warehouse Location'}</th>
                <th className="py-3 px-4">{isAr ? 'المخزون المتوفر' : 'Available Stock'}</th>
                <th className="py-3 px-4">{isAr ? 'حد الأمان' : 'Safety Min'}</th>
                <th className="py-3 px-4">{isAr ? 'المدة التقديرية' : 'Lead Time'}</th>
                <th className="py-3 px-4">{isAr ? 'حالة المخزون' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {stockItems.map((item) => (
                <tr key={item.sku} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-[#C9A86A] font-bold">{item.sku}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-white">
                    {isAr ? item.nameAr : item.nameEn}
                  </td>
                  <td className="py-3 px-4 text-zinc-400">
                    {isAr ? item.locationAr : item.locationEn}
                  </td>
                  <td className="py-3 px-4 text-white font-bold text-sm">
                    {item.stock} {isAr ? 'قطع' : 'units'}
                  </td>
                  <td className="py-3 px-4 text-zinc-500">
                    {item.minThreshold} {isAr ? 'قطع' : 'units'}
                  </td>
                  <td className="py-3 px-4 text-emerald-400">
                    {isAr ? item.leadTimeAr : item.leadTimeEn}
                  </td>
                  <td className="py-3 px-4">
                    {item.isLow ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{isAr ? 'مخزون منخفض' : 'Low Stock'}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isAr ? 'مخزون ممتاز' : 'Optimal'}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Stock Transfer Audit Log */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-blue-400" />
          <span>{isAr ? 'سجل حركات ونقل المخزون بين المصانع والمشاريع' : 'Inter-Warehouse & Site Transfers Log'}</span>
        </h3>

        <div className="divide-y divide-white/5">
          {transfers.map((tr) => (
            <div key={tr.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#C9A86A]">{tr.sku}</span>
                  <span className="text-white font-semibold font-sans">
                    {isAr ? tr.productNameAr : tr.productNameEn}
                  </span>
                  <span className="text-emerald-400 font-bold">×{tr.quantity}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span>{isAr ? tr.fromLocationAr : tr.fromLocationEn}</span>
                  <span>→</span>
                  <span className="text-white">{isAr ? tr.toLocationAr : tr.toLocationEn}</span>
                </div>
              </div>

              <div className="text-left sm:text-right rtl:sm:text-left space-y-0.5 text-[11px]">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tr.status === 'completed' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-sky-500/15 text-sky-300'
                }`}>
                  {isAr 
                    ? (tr.status === 'completed' ? 'مكتمل ومستلم' : 'في طريق النقل') 
                    : tr.status.toUpperCase()}
                </span>
                <span className="text-zinc-500 block">{tr.date} · {isAr ? tr.operatorAr : tr.operatorEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TRANSFER MODAL */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F1117] border border-white/15 rounded-3xl p-6 space-y-5 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-[#C9A86A]" />
                <span>{isAr ? 'إنشاء أمر تحويل بين المستودعات' : 'Create Inter-Warehouse Transfer'}</span>
              </h3>
              <button onClick={() => setIsTransferModalOpen(false)} className="p-1.5 rounded-lg text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransfer} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-400">{isAr ? 'رمز القطعة (SKU)' : 'Product SKU'}</label>
                <select
                  value={transferSku}
                  onChange={(e) => setTransferSku(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                >
                  {stockItems.map(s => (
                    <option key={s.sku} value={s.sku}>{s.sku} — {isAr ? s.nameAr : s.nameEn}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">{isAr ? 'المستودع / المصنع المصدر' : 'Origin Warehouse / Plant'}</label>
                <select
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                >
                  <option value="Factory 1 — Riyadh Wood & Joinery">{isAr ? 'مصنع 1 — أخشاب ونجارة الرياض' : 'Factory 1 — Riyadh Wood & Joinery'}</option>
                  <option value="Factory 2 — Riyadh Metal & Brass">{isAr ? 'مصنع 2 — نحاس ومعادن معمارية' : 'Factory 2 — Riyadh Metal & Brass'}</option>
                  <option value="Factory 3 — Upholstery Center">{isAr ? 'مصنع 3 — مركز التنجيد والجلود' : 'Factory 3 — Upholstery Center'}</option>
                  <option value="Najran Stone Quarry Depot">{isAr ? 'مستودع محجر ترافرتين نجران' : 'Najran Stone Quarry Depot'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">{isAr ? 'المستودع / الموقع المستلم' : 'Destination Hub / Site'}</label>
                <select
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                >
                  <option value="Jeddah Hospitality Hub (Western)">{isAr ? 'مركز جدة للضيافة (المنطقة الغربية)' : 'Jeddah Hospitality Hub (Western)'}</option>
                  <option value="Khobar Logistics Depot (Eastern)">{isAr ? 'مستودع الخبر اللوجستي (المنطقة الشرقية)' : 'Khobar Logistics Depot (Eastern)'}</option>
                  <option value="SwissBlue Hotel Project Site">{isAr ? 'موقع مشروع فندق سويس بلو' : 'SwissBlue Hotel Project Site'}</option>
                  <option value="Riyadh VIP Installation Fleet">{isAr ? 'أسطول التركيبات الفاخرة بالرياض' : 'Riyadh VIP Installation Fleet'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">{isAr ? 'الكمية (بالقطع)' : 'Quantity (Units)'}</label>
                <input
                  type="number"
                  min="1"
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold cursor-pointer"
                >
                  {isAr ? 'إصدار أمر النقل' : 'Dispatch Transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
