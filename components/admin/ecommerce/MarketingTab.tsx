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
  Clock,
  DollarSign,
  Gift,
  Truck,
  Layers,
  Users,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface PromoCode {
  id: string;
  code: string;
  titleEn: string;
  titleAr: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  minSpend: number;
  maxDiscountCap?: number;
  applicableScope: 'all' | 'living' | 'bedroom' | 'dining' | 'joinery' | 'decor' | 'b2b';
  customerEligibility: 'all' | 'vip_only' | 'new_clients' | 'hospitality_partners';
  perCustomerLimit: number;
  usageCount: number;
  usageLimit: number;
  revenueGeneratedSAR: number;
  expiresAt: string;
  autoApply: boolean;
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
    titleEn: 'VIP Royal Majlis 10% Privileged Savings',
    titleAr: 'خصم كبار الشخصيات الملكي 10%',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 25000,
    maxDiscountCap: 10000,
    applicableScope: 'all',
    customerEligibility: 'vip_only',
    perCustomerLimit: 1,
    usageCount: 14,
    usageLimit: 100,
    revenueGeneratedSAR: 324000,
    expiresAt: '2026-12-31',
    autoApply: false,
    isActive: true,
  },
  {
    id: 'pr-2',
    code: 'GREENWOOD5',
    titleEn: 'GreenWood Signature Welcome 5% Discount',
    titleAr: 'خصم الترحيب للعملاء الجدد 5%',
    discountType: 'percentage',
    discountValue: 5,
    minSpend: 10000,
    applicableScope: 'all',
    customerEligibility: 'new_clients',
    perCustomerLimit: 1,
    usageCount: 29,
    usageLimit: 250,
    revenueGeneratedSAR: 186500,
    expiresAt: '2026-11-30',
    autoApply: true,
    isActive: true,
  },
  {
    id: 'pr-3',
    code: 'TRADE-SWISSBLUE',
    titleEn: 'SwissBlue Hospitality Partner 15% FF&E Privilege',
    titleAr: 'خصم شركاء الفنادق والضيافة 15%',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 100000,
    applicableScope: 'bedroom',
    customerEligibility: 'hospitality_partners',
    perCustomerLimit: 5,
    usageCount: 4,
    usageLimit: 20,
    revenueGeneratedSAR: 490000,
    expiresAt: '2026-12-31',
    autoApply: false,
    isActive: true,
  },
  {
    id: 'pr-4',
    code: 'CORP10',
    titleEn: 'Corporate HQ Boardroom Furniture 10% Discount',
    titleAr: 'خصم المقرات التنفيذية والشركات 10%',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 50000,
    applicableScope: 'joinery',
    customerEligibility: 'all',
    perCustomerLimit: 2,
    usageCount: 8,
    usageLimit: 50,
    revenueGeneratedSAR: 304000,
    expiresAt: '2026-10-31',
    autoApply: false,
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

  // Advanced Promo Form State
  const [newCode, setNewCode] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newDiscountType, setNewDiscountType] = useState<'percentage' | 'fixed' | 'free_shipping'>('percentage');
  const [newValue, setNewValue] = useState(10);
  const [newMinSpend, setNewMinSpend] = useState(20000);
  const [newMaxCap, setNewMaxCap] = useState(5000);
  const [newScope, setNewScope] = useState<'all' | 'living' | 'bedroom' | 'dining' | 'joinery' | 'decor' | 'b2b'>('all');
  const [newEligibility, setNewEligibility] = useState<'all' | 'vip_only' | 'new_clients' | 'hospitality_partners'>('all');
  const [newPerCustomer, setNewPerCustomer] = useState(1);
  const [newLimit, setNewLimit] = useState(50);
  const [newExpiry, setNewExpiry] = useState('2026-12-31');
  const [newAutoApply, setNewAutoApply] = useState(false);

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) {
      showToast(isAr ? 'يرجى إدخال كود الخصم' : 'Please enter coupon code', 'error');
      return;
    }

    const newPromo: PromoCode = {
      id: `pr-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      titleEn: newTitleEn.trim() || `${newCode} Campaign Promotion`,
      titleAr: newTitleAr.trim() || `حملة الخصم ${newCode}`,
      discountType: newDiscountType,
      discountValue: newDiscountType === 'free_shipping' ? 0 : Number(newValue),
      minSpend: Number(newMinSpend),
      maxDiscountCap: Number(newMaxCap),
      applicableScope: newScope,
      customerEligibility: newEligibility,
      perCustomerLimit: Number(newPerCustomer),
      usageCount: 0,
      usageLimit: Number(newLimit),
      revenueGeneratedSAR: 0,
      expiresAt: newExpiry,
      autoApply: newAutoApply,
      isActive: true,
    };

    setPromos([newPromo, ...promos]);
    setIsPromoModalOpen(false);
    setNewCode('');
    setNewTitleEn('');
    setNewTitleAr('');
    showToast(isAr ? 'تم إنشاء كود الخصم بنجاح' : 'Promo code created successfully', 'success');
  };

  const handleTogglePromo = (id: string) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    showToast(isAr ? 'تم تحديث حالة الكود' : 'Coupon status updated', 'success');
  };

  const handleDeletePromo = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    showToast(isAr ? 'تم حذف الكود' : 'Coupon deleted', 'success');
  };

  const handleSendRecovery = (id: string, name: string, phone: string, cartValue: number) => {
    setAbandonedCarts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, recoverySent: true } : c))
    );

    const message = `مرحباً ${name}، لاحظنا اهتمامك بقطع أثاث جرين وود الفاخرة بقيمة (${cartValue.toLocaleString('en-US')} ر.س). يسعدنا تقديم كود خصم حصري (WDVIP10) مع أولوية في جدولة التركيب الميداني. تفضل باستكمال طلبك: https://test.wdgroup.online/furniture/checkout`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    showToast(isAr ? 'تم إرسال رسالة الاستعادة عبر واتساب' : 'Recovery prompt sent via WhatsApp', 'success');
  };

  const totalPromoRevenue = promos.reduce((sum, p) => sum + p.revenueGeneratedSAR, 0);

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Summary Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#C9A86A]" />
            <span>{isAr ? 'إدارة الحملات الترويجية وأكواد الخصم' : 'Promotional Campaigns & Coupon Manager'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'تخصيص الخصومات حسب فئات العملاء والمنتجات واستعادة السلات المتروكة.' : 'Configure tiered discounts, VIP partner codes, and automated cart recoveries.'}
          </p>
        </div>

        <button
          onClick={() => setIsPromoModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer font-mono shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إنشاء كود خصم جديد' : 'Create Promo Code'}</span>
        </button>
      </div>

      {/* Campaign KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-white/10 bg-[#0F1117]/90 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-mono block">{isAr ? 'الأكواد النشطة' : 'Active Coupons'}</span>
          <span className="text-xl font-mono font-extrabold text-white">{promos.filter(p => p.isActive).length} / {promos.length}</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-white/10 bg-[#0F1117]/90 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-mono block">{isAr ? 'مرات الاستخدام الإجمالية' : 'Total Redemptions'}</span>
          <span className="text-xl font-mono font-extrabold text-emerald-400">{promos.reduce((sum, p) => sum + p.usageCount, 0)} {isAr ? 'استخدام' : 'orders'}</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-white/10 bg-[#0F1117]/90 space-y-1">
          <span className="text-zinc-400 text-[11px] uppercase font-mono block">{isAr ? 'الإيرادات المحققة من الخصومات' : 'Attributed Promo Revenue'}</span>
          <span className="text-xl font-mono font-extrabold text-[#C9A86A]">{totalPromoRevenue.toLocaleString('en-US')} SAR</span>
        </div>
      </div>

      {/* 2. Active Promo Codes Table */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'أكواد الخصم المفعلة حالياً' : 'Active Promo Codes'}</span>
          </h4>
          <span className="text-xs font-mono text-zinc-400">{promos.length} {isAr ? 'كود' : 'coupons'}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">{isAr ? 'الكود والحملة' : 'Code & Campaign'}</th>
                <th className="py-3 px-4">{isAr ? 'نوع وقيمة الخصم' : 'Discount'}</th>
                <th className="py-3 px-4">{isAr ? 'النطاق والمستفيدين' : 'Scope & Eligibility'}</th>
                <th className="py-3 px-4">{isAr ? 'الحد الأدنى' : 'Min Spend'}</th>
                <th className="py-3 px-4">{isAr ? 'الاستخدام' : 'Usage'}</th>
                <th className="py-3 px-4">{isAr ? 'الإيرادات المحققة' : 'Revenue Attributed'}</th>
                <th className="py-3 px-4">{isAr ? 'تاريخ الانتهاء' : 'Expiry'}</th>
                <th className="py-3 px-4 text-center">{isAr ? 'الحالة والإجراء' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {promos.map((promo) => (
                <tr key={promo.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#C9A86A] bg-[#C9A86A]/10 border border-[#C9A86A]/30 px-2 py-0.5 rounded-lg text-xs">
                        {promo.code}
                      </span>
                      {promo.autoApply && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                          Auto
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-sans block mt-1">
                      {isAr ? promo.titleAr : promo.titleEn}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    {promo.discountType === 'percentage' && `${promo.discountValue}%`}
                    {promo.discountType === 'fixed' && `${promo.discountValue.toLocaleString()} SAR`}
                    {promo.discountType === 'free_shipping' && (isAr ? 'تركيب مجاني' : 'Free Assembly')}
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-zinc-300 font-sans">
                    <span className="block capitalize font-bold text-zinc-200">{promo.applicableScope}</span>
                    <span className="text-[10px] text-zinc-400 capitalize">{promo.customerEligibility.replace('_', ' ')}</span>
                  </td>

                  <td className="py-3.5 px-4 text-zinc-300">
                    {promo.minSpend.toLocaleString('en-US')} SAR
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(100, (promo.usageCount / promo.usageLimit) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {promo.usageCount}/{promo.usageLimit}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#C9A86A]">
                    {promo.revenueGeneratedSAR.toLocaleString('en-US')} SAR
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-zinc-400">
                    {promo.expiresAt}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleTogglePromo(promo.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                          promo.isActive
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                            : 'bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30'
                        }`}
                      >
                        {promo.isActive ? (isAr ? 'مفعل' : 'Active') : (isAr ? 'معطل' : 'Paused')}
                      </button>
                      <button
                        onClick={() => handleDeletePromo(promo.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Abandoned Cart Recovery */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/90 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'استعادة السلات المتروكة (تنبيهات فورية)' : 'Abandoned Cart Recovery & VIP Outreaches'}</span>
            </h4>
            <p className="text-xs text-zinc-400">
              {isAr ? 'عملاء توقفوا عند صفحة الدفع دون إتمام الطلب، مع خيار المراسلة المباشرة بخصم إضافي.' : 'Clients who exited checkout. Send 1-click VIP WhatsApp prompts with coupon incentive.'}
            </p>
          </div>

          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full shrink-0">
            {abandonedCarts.length} {isAr ? 'سلات معلقة' : 'Pending Carts'}
          </span>
        </div>

        <div className="space-y-3">
          {abandonedCarts.map((cart) => (
            <div
              key={cart.id}
              className="p-4 rounded-2xl bg-[#141721] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-white">{cart.customerName}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{cart.abandonedAt}</span>
                  {cart.recoverySent && (
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.2 rounded-full">
                      ✓ {isAr ? 'تم الإرسال' : 'Prompt Sent'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-300">{cart.items}</p>
                <span className="text-[11px] font-mono text-[#C9A86A] font-bold">
                  {isAr ? 'قيمة السلة:' : 'Cart Valuation:'} {cart.cartValue.toLocaleString('en-US')} SAR
                </span>
              </div>

              <button
                onClick={() => handleSendRecovery(cart.id, cart.customerName, cart.phone, cart.cartValue)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-mono shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'إرسال عرض واتساب' : '1-Click WhatsApp'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Advanced Promo Code Creator Modal */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setIsPromoModalOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="relative w-full max-w-xl bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-5 z-10 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#C9A86A]" />
                <span>{isAr ? 'إنشاء كود خصم وحملة ترويجية جديدة' : 'Create Advanced Promo Campaign'}</span>
              </h3>
              <button onClick={() => setIsPromoModalOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-4 text-xs">
              
              {/* Row 1: Code & Campaign Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Coupon Code *</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                    required
                    placeholder="E.G. RIYADH2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white font-mono uppercase focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Campaign Title EN</label>
                  <input
                    type="text"
                    value={newTitleEn}
                    onChange={(e) => setNewTitleEn(e.target.value)}
                    placeholder="Spring Villa Furnishing Promotion"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* Row 2: Discount Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <label className="block text-zinc-400 mb-1">Discount Type</label>
                  <select
                    value={newDiscountType}
                    onChange={(e) => setNewDiscountType(e.target.value as any)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (SAR)</option>
                    <option value="free_shipping">Free White-Glove Shipping</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-8 pointer-events-none" />
                </div>

                {newDiscountType !== 'free_shipping' && (
                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">
                      {newDiscountType === 'percentage' ? 'Discount Rate (%) *' : 'Discount SAR *'}
                    </label>
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(Number(e.target.value))}
                      required
                      min={1}
                      max={newDiscountType === 'percentage' ? 100 : 100000}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white font-mono focus:border-[#C9A86A]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Min Spend (SAR)</label>
                  <input
                    type="number"
                    value={newMinSpend}
                    onChange={(e) => setNewMinSpend(Number(e.target.value))}
                    min={0}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white font-mono focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* Row 3: Applicable Scope & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-zinc-400 mb-1">Applicable Product Category</label>
                  <select
                    value={newScope}
                    onChange={(e) => setNewScope(e.target.value as any)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  >
                    <option value="all">Entire Store (All Categories)</option>
                    <option value="living">Living & Lounge Only</option>
                    <option value="bedroom">Hospitality & Bedroom Only</option>
                    <option value="dining">Dining & Banquet Only</option>
                    <option value="joinery">Architectural Joinery Only</option>
                    <option value="decor">Decor & Partitions Only</option>
                    <option value="b2b">Commercial & Hotel B2B Orders</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-8 pointer-events-none" />
                </div>

                <div className="relative">
                  <label className="block text-zinc-400 mb-1">Target Customer Eligibility</label>
                  <select
                    value={newEligibility}
                    onChange={(e) => setNewEligibility(e.target.value as any)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  >
                    <option value="all">All Registered Customers</option>
                    <option value="vip_only">VIP Royal & High-Net-Worth Only</option>
                    <option value="new_clients">First-Time Buyers Only</option>
                    <option value="hospitality_partners">Hotel & Commercial Partners</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-8 pointer-events-none" />
                </div>
              </div>

              {/* Row 4: Usage Limits & Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div>
                  <label className="block text-zinc-400 mb-1">Total Usage Limit</label>
                  <input
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(Number(e.target.value))}
                    min={1}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Limit Per Client</label>
                  <input
                    type="number"
                    value={newPerCustomer}
                    onChange={(e) => setNewPerCustomer(Number(e.target.value))}
                    min={1}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* Auto Apply Toggle */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#141721] border border-white/5">
                <input
                  type="checkbox"
                  id="autoApply"
                  checked={newAutoApply}
                  onChange={(e) => setNewAutoApply(e.target.checked)}
                  className="rounded text-[#C9A86A]"
                />
                <label htmlFor="autoApply" className="text-zinc-300 cursor-pointer">
                  {isAr ? 'تطبيق الخصم تلقائياً عند الدفع (Auto-apply banner at checkout)' : 'Auto-apply discount banner at checkout'}
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-extrabold font-mono shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {isAr ? 'حفظ وتفعيل الكود' : 'Save & Publish Code'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
