'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FurnitureItem } from '@/lib/furnitureData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building2, 
  Truck, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export interface CartItem {
  product: FurnitureItem;
  selectedFinishId: string;
  quantity: number;
}

interface CartQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, selectedFinishId: string, delta: number) => void;
  onRemoveItem: (productId: string, selectedFinishId: string) => void;
  onClearCart: () => void;
}

export default function CartQuoteDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartQuoteDrawerProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<'retail' | 'b2b'>('retail');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Riyadh',
    companyName: '',
    notes: '',
  });

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const vatAmount = subtotal * 0.15;
  const grandTotal = subtotal + vatAmount;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const itemsSummary = items
        .map(
          (i, idx) =>
            `${idx + 1}. ${isAr ? i.product.nameAr : i.product.nameEn} (${i.product.sku}) - Qty: ${i.quantity} - Finish: ${i.selectedFinishId || 'Default'} - ${i.product.price * i.quantity} SAR`
        )
        .join('\n');

      const bodyText = `
--- GREENWOOD FURNITURE ORDER / RFQ ---
Order Type: ${orderType === 'b2b' ? 'Commercial / Hospitality Project' : 'Residential / Private Purchase'}
Client Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}
${orderType === 'b2b' ? `Company / Project: ${formData.companyName}` : ''}

ORDERED PIECES:
${itemsSummary}

FINANCIAL BREAKDOWN:
Subtotal: ${subtotal.toLocaleString('en-US')} SAR
Estimated 15% VAT: ${vatAmount.toLocaleString('en-US')} SAR
Grand Total: ${grandTotal.toLocaleString('en-US')} SAR

ADDITIONAL NOTES:
${formData.notes || 'None'}
      `.trim();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName || 'GreenWood Furniture Store Client',
          sector: 'manufacturing',
          subject: `Furniture Order Request: ${formData.fullName} (${totalItemsCount} items - ${grandTotal.toLocaleString('en-US')} SAR)`,
          message: bodyText,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSubmitted(true);
      onClearCart();
    } catch (err) {
      // Fallback
      setSubmitted(true);
      onClearCart();
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappCheckoutMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود إرسال طلب أثاث من متجر جرين وود:\n${items.map((i) => `• ${i.product.nameAr} (${i.quantity} قطعة - ${i.product.sku})`).join('\n')}\nالمجموع التقديري: ${grandTotal.toLocaleString('en-US')} ر.س\nيرجى تأكيد التوافر وموعد التوصيل.`
      : `Hello WD Group, I would like to place an order from GreenWood Furniture Store:\n${items.map((i) => `• ${i.product.nameEn} (${i.quantity} pcs - ${i.product.sku})`).join('\n')}\nEstimated Total: ${grandTotal.toLocaleString('en-US')} SAR\nPlease confirm availability and delivery schedule.`
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            />

            {/* Slide-over Drawer Panel */}
            <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
              <motion.div
                initial={{ x: isAr ? '-100%' : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: isAr ? '-100%' : '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="w-screen max-w-md bg-[#0F1117] border-l rtl:border-l-0 rtl:border-r border-[#C9A86A]/25 text-white shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#141721]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/15 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">
                        {dict.furniture.cart.title}
                      </h3>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {totalItemsCount} {totalItemsCount === 1 ? dict.furniture.cart.item_singular : dict.furniture.cart.items_plural}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {items.length > 0 && (
                      <button
                        onClick={onClearCart}
                        className="text-[11px] text-zinc-400 hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
                        title={dict.furniture.cart.clear_all}
                      >
                        {dict.furniture.cart.clear_all}
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Items List Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white">
                          {dict.furniture.cart.empty_title}
                        </h4>
                        <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                          {dict.furniture.cart.empty_desc}
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="mt-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#08090C] bg-[#C9A86A] hover:bg-[#E3C58A] transition-all shadow-md"
                      >
                        {dict.furniture.cart.start_shopping}
                      </button>
                    </div>
                  ) : (
                    items.map((item, idx) => {
                      const finishObj = item.product.finishes.find((f) => f.id === item.selectedFinishId);
                      const itemTotal = item.product.price * item.quantity;
                      return (
                        <motion.div
                          key={`${item.product.id}-${item.selectedFinishId}-${idx}`}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex gap-3.5 items-center group relative hover:border-[#C9A86A]/30 transition-all"
                        >
                          {/* Image */}
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
                            <Image
                              src={item.product.images[0]}
                              alt={isAr ? item.product.nameAr : item.product.nameEn}
                              fill
                              sizes="80px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#C9A86A] transition-colors">
                                {isAr ? item.product.nameAr : item.product.nameEn}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.product.id, item.selectedFinishId)}
                                className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                              {finishObj && (
                                <span className="inline-flex items-center gap-1">
                                  <span 
                                    className="w-2 h-2 rounded-full border border-white/20" 
                                    style={{ backgroundColor: finishObj.colorCode }}
                                  />
                                  <span>{isAr ? finishObj.nameAr : finishObj.nameEn}</span>
                                </span>
                              )}
                              <span className="font-mono text-zinc-600">·</span>
                              <span className="font-mono text-zinc-500">{item.product.sku}</span>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedFinishId, -1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 text-xs"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center text-xs font-mono font-bold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.selectedFinishId, 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 text-xs"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="text-right rtl:text-left">
                                <span className="text-xs font-extrabold text-[#C9A86A] font-mono">
                                  {itemTotal.toLocaleString('en-US')}
                                </span>
                                <span className="text-[10px] text-zinc-400 ml-1 rtl:ml-0 rtl:mr-1">
                                  {dict.furniture.card.sar}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {/* Footer / Summary & Actions */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-[#141721] space-y-4">
                    {/* Financial Calculations */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>{dict.furniture.cart.subtotal}</span>
                        <span className="font-mono text-zinc-200">{subtotal.toLocaleString('en-US')} {dict.furniture.card.sar}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>{dict.furniture.cart.vat}</span>
                        <span className="font-mono text-zinc-200">{vatAmount.toLocaleString('en-US')} {dict.furniture.card.sar}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                        <Truck className="w-3.5 h-3.5 shrink-0" />
                        <span>{dict.furniture.cart.delivery_note}</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                        <span className="font-extrabold text-sm text-white">
                          {isAr ? 'الإجمالي التقديري' : 'Estimated Total'}
                        </span>
                        <div className="text-right rtl:text-left">
                          <span className="text-xl font-extrabold text-[#C9A86A] font-mono">
                            {grandTotal.toLocaleString('en-US')}
                          </span>
                          <span className="text-xs font-bold text-[#E3C58A] ml-1 rtl:ml-0 rtl:mr-1 uppercase">
                            {dict.furniture.card.sar}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 pt-1">
                      <button
                        onClick={() => setCheckoutModalOpen(true)}
                        className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.45)] transition-all flex items-center justify-center gap-2"
                      >
                        <span>{dict.furniture.cart.direct_checkout}</span>
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </button>

                      <a
                        href={`https://wa.me/966505725070?text=${whatsappCheckoutMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{isAr ? 'إرسال الطلب عبر واتساب' : 'Instant WhatsApp Order'}</span>
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout / RFP Submission Modal */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0F1117] border border-[#C9A86A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white space-y-6 my-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {dict.furniture.checkout_modal.title}
                </h3>
                <button
                  onClick={() => setCheckoutModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {dict.furniture.checkout_modal.success_title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-sm mx-auto">
                    {dict.furniture.checkout_modal.success_desc}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCheckoutModalOpen(false);
                      onClose();
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#C9A86A] text-[#08090C] font-bold text-xs"
                  >
                    {isAr ? 'تم، العودة للمتجر' : 'Done & Return to Store'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                  {/* Order Type Toggle */}
                  <div className="space-y-1">
                    <label className="block text-zinc-300 font-semibold">
                      {dict.furniture.checkout_modal.order_type}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('retail')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          orderType === 'retail'
                            ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}
                      >
                        {dict.furniture.checkout_modal.type_retail}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('b2b')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          orderType === 'b2b'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm'
                            : 'bg-white/5 border-white/10 text-zinc-400'
                        }`}
                      >
                        {dict.furniture.checkout_modal.type_b2b}
                      </button>
                    </div>
                  </div>

                  {/* Client Full Name */}
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      {dict.furniture.checkout_modal.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={isAr ? 'الاسم الثلاثي' : 'Full Name'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                    />
                  </div>

                  {/* Contact Info (Email & Phone) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">
                        {dict.furniture.checkout_modal.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">
                        {dict.furniture.checkout_modal.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                      />
                    </div>
                  </div>

                  {/* City & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">
                        {dict.furniture.checkout_modal.city} *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1D27] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                      >
                        <option value="Riyadh">{isAr ? 'الرياض' : 'Riyadh'}</option>
                        <option value="Jeddah">{isAr ? 'جدة' : 'Jeddah'}</option>
                        <option value="Najran">{isAr ? 'نجران' : 'Najran'}</option>
                        <option value="Khobar/Dammam">{isAr ? 'الخبر والدمام' : 'Khobar / Dammam'}</option>
                        <option value="Makkah/Madinah">{isAr ? 'مكة والمدينة' : 'Makkah / Madinah'}</option>
                        <option value="Jazan/Asir">{isAr ? 'جازان وعسير' : 'Jazan / Asir'}</option>
                      </select>
                    </div>

                    {orderType === 'b2b' && (
                      <div>
                        <label className="block text-zinc-300 font-semibold mb-1">
                          {isAr ? 'اسم المشروع / الجهة' : 'Project / Entity Name'} *
                        </label>
                        <input
                          type="text"
                          required={orderType === 'b2b'}
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder={isAr ? 'فندق، مطور، مكتب تصميم' : 'Hotel, Developer, Studio'}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">
                      {dict.furniture.checkout_modal.notes}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={isAr ? 'مقاسات خاصة، كود القماش المطلوب، أو تاريخ التسليم المستهدف…' : 'Special dimensions, fabric codes, or target delivery date…'}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#C9A86A] resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] hover:shadow-[0_0_20px_rgba(201,168,106,0.35)] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {submitting ? dict.furniture.checkout_modal.submitting : dict.furniture.checkout_modal.submit_btn}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
