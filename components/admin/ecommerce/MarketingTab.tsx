'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { 
  Tag, 
  Plus, 
  Sparkles, 
  Trash2, 
  Check, 
  X, 
  Calendar, 
  Percent, 
  ShoppingBag, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  usageCount: number;
  usageLimit: number;
  expiresAt: string;
  isActive: boolean;
}

interface AbandonedCartRecord {
  id: string;
  customerName: string;
  phone: string;
  items: string;
  cartValue: number;
  abandonedAt: string;
  recoverySent: boolean;
}

const INITIAL_PROMOS: PromoCode[] = [
  {
    id: 'pr-1',
    code: 'WDVIP10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 25000,
    usageCount: 14,
    usageLimit: 100,
    expiresAt: '2026-12-31',
    isActive: true,
  },
  {
    id: 'pr-2',
    code: 'GREENWOOD5',
    discountType: 'percentage',
    discountValue: 5,
    minSpend: 10000,
    usageCount: 29,
    usageLimit: 250,
    expiresAt: '2026-11-30',
    isActive: true,
  },
  {
    id: 'pr-3',
    code: 'TRADE-SWISSBLUE',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 100000,
    usageCount: 4,
    usageLimit: 20,
    expiresAt: '2026-12-31',
    isActive: true,
  },
  {
    id: 'pr-4',
    code: 'CORP10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 50000,
    usageCount: 8,
    usageLimit: 50,
    expiresAt: '2026-10-31',
    isActive: true,
  },
];

const INITIAL_ABANDONED: AbandonedCartRecord[] = [
  {
    id: 'ab-1',
    customerName: 'الأستاذ فيصل الراجحي',
    phone: '+966 50 889 1122',
    items: 'The Al-Diriyah Modular Curved Sofa (Cream Bouclé)',
    cartValue: 18900,
    abandonedAt: 'منذ 3 ساعات',
    recoverySent: false,
  },
  {
    id: 'ab-2',
    customerName: 'م. ريم العتيبي',
    phone: '+966 54 332 9988',
    items: 'The Najran Travertine Table + 2× Al-Ula Armchairs',
    cartValue: 27150,
    abandonedAt: 'منذ 6 ساعات',
    recoverySent: true,
  },
  {
    id: 'ab-3',
    customerName: 'المهندس طارق الدوسري',
    phone: '+966 55 771 4433',
    items: 'The Tuwaiq Executive Boardroom Table',
    cartValue: 38000,
    abandonedAt: 'منذ يوم أمس',
    recoverySent: false,
  },
];

export default function MarketingTab() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [promos, setPromos] = useState<PromoCode[]>(INITIAL_PROMOS);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCartRecord[]>(INITIAL_ABANDONED);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Promo Form State
  const [newCode, setNewCode] = useState('');
  const [newValue, setNewValue] = useState(10);
  const [newMinSpend, setNewMinSpend] = useState(20000);
  const [newLimit, setNewLimit] = useState(50);
  const [newExpiry, setNewExpiry] = useState('2026-12-31');

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const newPromo: PromoCode = {
      id: `pr-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      discountType: 'percentage',
      discountValue: Number(newValue),
      minSpend: Number(newMinSpend),
      usageCount: 0,
      usageLimit: Number(newLimit),
      expiresAt: newExpiry,
      isActive: true,
    };

    setPromos([newPromo, ...promos]);
    setIsPromoModalOpen(false);
    setNewCode('');
    showToast(isAr ? 'تم إنشاء كود الخصم الجديد' : 'Discount promo code created', 'success');
  };

  const handleTogglePromo = (id: string) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    showToast(isAr ? 'تم تعديل حالة كود الخصم' : 'Promo code status updated', 'success');
  };

  const handleDeletePromo = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    showToast(isAr ? 'تم حذف كود الخصم' : 'Promo code deleted', 'success');
  };

  const handleSendRecovery = (id: string) => {
    setAbandonedCarts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, recoverySent: true } : c))
    );
    showToast(isAr ? 'تم إرسال رسالة تذكير السلة المتروكة' : 'Recovery reminder sent via WhatsApp', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Promo Codes Management */}
      <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#C9A86A]" />
              <span>{isAr ? 'أكواد الخصم والعروض الترويجية' : 'Discount Codes & Promotional Campaigns'}</span>
            </h3>
            <p className="text-xs text-zinc-400">
              {isAr ? 'إدارة القسائم الشرائية ونسب الخصم والحد الأدنى للطلب.' : 'Manage promo codes, usage limits, and trade discounts.'}
            </p>
          </div>

          <button
            onClick={() => setIsPromoModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] text-xs font-bold font-mono flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إنشاء كود خصم جديد' : 'New Promo Code'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 uppercase text-[10px]">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">{isAr ? 'قيمة الخصم' : 'Discount'}</th>
                <th className="py-3 px-4">{isAr ? 'الحد الأدنى' : 'Min Spend'}</th>
                <th className="py-3 px-4">{isAr ? 'مرات الاستخدام' : 'Usage'}</th>
                <th className="py-3 px-4">{isAr ? 'تاريخ الانتهاء' : 'Expiry'}</th>
                <th className="py-3 px-4">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {promos.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#C9A86A]">{p.code}</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{p.discountValue}% OFF</td>
                  <td className="py-3 px-4 text-zinc-300">{p.minSpend.toLocaleString('en-US')} SAR</td>
                  <td className="py-3 px-4 text-zinc-300">{p.usageCount} / {p.usageLimit}</td>
                  <td className="py-3 px-4 text-zinc-400">{p.expiresAt}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePromo(p.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                        p.isActive 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
                      }`}
                    >
                      {p.isActive ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeletePromo(p.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Abandoned Cart Recovery */}
      <div className="glass-card rounded-2xl border border-white/10 bg-[#0F1117]/90 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'استرداد السلات المتروكة (Abandoned Carts)' : 'Abandoned Cart Recovery & Re-engagement'}</span>
            </h3>
            <p className="text-xs text-zinc-400">
              {isAr ? 'عملاء توقفوا عند مرحلة الدفع مع إمكانية إرسال تذكير مباشر عبر واتساب.' : 'Potential high-ticket recovery with 1-click VIP WhatsApp prompts.'}
            </p>
          </div>

          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            Total Potential: 84,050 SAR
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {abandonedCarts.map((cart) => (
            <div key={cart.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{cart.customerName}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{cart.phone}</span>
                </div>
                <p className="text-zinc-400">{cart.items}</p>
                <span className="text-[10px] font-mono text-zinc-500 block">{cart.abandonedAt}</span>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono font-extrabold text-[#E3C58A] text-sm">
                  {cart.cartValue.toLocaleString('en-US')} SAR
                </span>

                <a
                  href={`https://wa.me/${cart.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `مرحباً ${cart.customerName}، لاحظنا اهتمامكم بـ (${cart.items}) في مجموعة دبليو دي للأثاث الفاخر. يسعدنا تقديم كود خصم خاص (WDVIP10) لإتمام طلبكم وتأكيد موعد التركيب الفندقي.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSendRecovery(cart.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                    cart.recoverySent
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{cart.recoverySent ? (isAr ? 'تم الإرسال' : 'Reminder Sent') : (isAr ? 'تذكير واتساب' : 'Send WhatsApp')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CREATE PROMO MODAL */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F1117] border border-white/15 rounded-3xl p-6 space-y-5 text-white shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#C9A86A]" />
              <span>Create New Promo Code</span>
            </h3>

            <form onSubmit={handleCreatePromo} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-400">Coupon Code</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  required
                  placeholder="e.g. RIYADH2026"
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400">Discount (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-emerald-400 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400">Min Spend (SAR)</label>
                  <input
                    type="number"
                    value={newMinSpend}
                    onChange={(e) => setNewMinSpend(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400">Usage Limit</label>
                  <input
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400">Expiry Date</label>
                  <input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold cursor-pointer"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
