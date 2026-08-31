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
  Box
} from 'lucide-react';

interface StockTransferRecord {
  id: string;
  sku: string;
  productName: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
  date: string;
  operator: string;
  status: 'completed' | 'in_transit';
}

const INITIAL_TRANSFERS: StockTransferRecord[] = [
  {
    id: 'tr-01',
    sku: 'GW-LV-801',
    productName: 'The Al-Diriyah Modular Curved Sofa',
    fromLocation: 'Factory 1 — Riyadh Wood & Joinery',
    toLocation: 'Jeddah Hospitality Hub (Western)',
    quantity: 3,
    date: '30/08/2026',
    operator: 'Eng. Fahad Al-Ghamdi',
    status: 'in_transit',
  },
  {
    id: 'tr-02',
    sku: 'GW-BD-702',
    productName: 'SwissBlue Suite Bed & Fluted Joinery',
    fromLocation: 'Factory 1 — Riyadh Wood & Joinery',
    toLocation: 'SwissBlue Jeddah Hotel Site',
    quantity: 5,
    date: '28/08/2026',
    operator: 'Eng. Yasser Al-Qahtani',
    status: 'completed',
  },
  {
    id: 'tr-03',
    sku: 'GW-TB-405',
    productName: 'The Najran Travertine Coffee Table',
    fromLocation: 'Najran Stone Quarry Depot',
    toLocation: 'Factory 1 Assembly Yard',
    quantity: 8,
    date: '26/08/2026',
    operator: 'Logistics Team',
    status: 'completed',
  },
];

export default function InventoryTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [stockItems, setStockItems] = useState([
    { sku: 'GW-LV-801', name: 'Al-Diriyah Curved Sofa', location: 'Factory 1 & 3 (Riyadh)', stock: 2, minThreshold: 4, leadTime: '10-14 days', isLow: true },
    { sku: 'GW-TB-405', name: 'Najran Travertine Table', location: 'Najran Stone Yard', stock: 6, minThreshold: 3, leadTime: '8-12 days', isLow: false },
    { sku: 'GW-BD-702', name: 'SwissBlue Suite Bed', location: 'Factory 1 (Riyadh)', stock: 1, minThreshold: 3, leadTime: '14-18 days', isLow: true },
    { sku: 'GW-CH-304', name: 'Al-Ula Lounge Armchair', location: 'Factory 3 Upholstery', stock: 5, minThreshold: 2, leadTime: '7-10 days', isLow: false },
    { sku: 'GW-JN-550', name: 'Rawdah Fluted Credenza', location: 'Factory 1 (Riyadh)', stock: 4, minThreshold: 2, leadTime: '12-16 days', isLow: false },
    { sku: 'GW-EX-990', name: 'Tuwaiq Boardroom Table', location: 'Factory 1 & 2 (Riyadh)', stock: 3, minThreshold: 2, leadTime: '16-22 days', isLow: false },
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
    const newTr: StockTransferRecord = {
      id: `tr-${Date.now()}`,
      sku: transferSku,
      productName: stockItems.find(s => s.sku === transferSku)?.name || 'Custom Piece',
      fromLocation: transferFrom,
      toLocation: transferTo,
      quantity: Number(transferQty),
      date: new Date().toLocaleDateString('en-GB'),
      operator: 'Admin Dispatcher',
      status: 'in_transit',
    };
    setTransfers([newTr, ...transfers]);
    setIsTransferModalOpen(false);
    showToast(isAr ? 'تم إنشاء أمر النقل اللوجستي بين المستودعات' : 'Warehouse transfer dispatched', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Top Plants Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-[#C9A86A]" />
              <span>Riyadh Central Hub</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
              Factory 1 & 2
            </span>
          </div>
          <p className="text-xl font-extrabold text-white font-mono">18 Finished Units</p>
          <span className="text-[10px] text-zinc-400 font-mono block">Wood Joinery, CNC & Architectural Metal</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-emerald-400" />
              <span>Riyadh Upholstery Center</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
              Factory 3
            </span>
          </div>
          <p className="text-xl font-extrabold text-white font-mono">11 Finished Units</p>
          <span className="text-[10px] text-zinc-400 font-mono block">Bouclé, Velvet & Italian Hides line</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-sky-400" />
              <span>Jeddah Hospitality Depot</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">
              Western Hub
            </span>
          </div>
          <p className="text-xl font-extrabold text-white font-mono">8 Finished Units</p>
          <span className="text-[10px] text-zinc-400 font-mono block">White-Glove fast dispatch for Red Sea & SwissBlue</span>
        </div>
      </div>

      {/* 2. Stock Health Table */}
      <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Box className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'مستويات المخزون وحدود إعادة الطلب' : 'Real-Time Stock Levels & Reorder Thresholds'}</span>
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
            <span>{isAr ? 'تحويل بين المستودعات' : 'New Stock Transfer'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">{isAr ? 'اسم القطعة' : 'Furniture Piece'}</th>
                <th className="py-3 px-4">{isAr ? 'موقع المستودع' : 'Warehouse Location'}</th>
                <th className="py-3 px-4">{isAr ? 'المخزون الحالي' : 'Available Stock'}</th>
                <th className="py-3 px-4">{isAr ? 'حد الأمان' : 'Safety Min'}</th>
                <th className="py-3 px-4">{isAr ? 'المدة التقديرية' : 'Lead Time'}</th>
                <th className="py-3 px-4">{isAr ? 'حالة المخزون' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {stockItems.map((item) => (
                <tr key={item.sku} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-[#C9A86A] font-bold">{item.sku}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-white">{item.name}</td>
                  <td className="py-3 px-4 text-zinc-400">{item.location}</td>
                  <td className="py-3 px-4 text-white font-bold text-sm">{item.stock} units</td>
                  <td className="py-3 px-4 text-zinc-500">{item.minThreshold} units</td>
                  <td className="py-3 px-4 text-emerald-400">{item.leadTime}</td>
                  <td className="py-3 px-4">
                    {item.isLow ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Low Stock</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Optimal</span>
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
                  <span className="text-white font-semibold font-sans">{tr.productName}</span>
                  <span className="text-emerald-400 font-bold">×{tr.quantity}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <span>{tr.fromLocation}</span>
                  <span>→</span>
                  <span className="text-white">{tr.toLocation}</span>
                </div>
              </div>

              <div className="text-left sm:text-right rtl:sm:text-left space-y-0.5 text-[11px]">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tr.status === 'completed' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-sky-500/15 text-sky-300'
                }`}>
                  {tr.status.toUpperCase()}
                </span>
                <span className="text-zinc-500 block">{tr.date} · {tr.operator}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TRANSFER MODAL */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F1117] border border-white/15 rounded-3xl p-6 space-y-5 text-white shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#C9A86A]" />
              <span>Create Inter-Warehouse Transfer</span>
            </h3>

            <form onSubmit={handleCreateTransfer} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-400">Product SKU</label>
                <select
                  value={transferSku}
                  onChange={(e) => setTransferSku(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                >
                  {stockItems.map(s => (
                    <option key={s.sku} value={s.sku}>{s.sku} — {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Origin Warehouse / Plant</label>
                <select
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                >
                  <option value="Factory 1 — Riyadh Wood & Joinery">Factory 1 — Riyadh Wood & Joinery</option>
                  <option value="Factory 2 — Riyadh Metal & Brass">Factory 2 — Riyadh Metal & Brass</option>
                  <option value="Factory 3 — Upholstery Center">Factory 3 — Upholstery Center</option>
                  <option value="Najran Stone Quarry Depot">Najran Stone Quarry Depot</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Destination Hub / Site</label>
                <select
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                >
                  <option value="Jeddah Hospitality Hub (Western)">Jeddah Hospitality Hub (Western)</option>
                  <option value="Khobar Logistics Depot (Eastern)">Khobar Logistics Depot (Eastern)</option>
                  <option value="SwissBlue Hotel Project Site">SwissBlue Hotel Project Site</option>
                  <option value="Riyadh VIP Installation Fleet">Riyadh VIP Installation Fleet</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">Quantity (Units)</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold cursor-pointer"
                >
                  Dispatch Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
