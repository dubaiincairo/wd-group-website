'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';
import { 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Building2, 
  Clock, 
  Lock, 
  Copy, 
  Check, 
  Tag, 
  Printer, 
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertCircle,
  Calendar,
  Wrench,
  Info,
  KeyRound,
  ExternalLink,
  X,
  Smartphone,
  Fingerprint
} from 'lucide-react';

interface CartItemState {
  product: FurnitureItem;
  selectedFinishId: string;
  quantity: number;
}

export default function FurnitureCheckoutPage() {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  // 1. Cart Items State (persisted via localStorage or default to catalog signatures)
  const [cartItems, setCartItems] = useState<CartItemState[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wd_furniture_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
          setLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    // Fallback: Default to signature piece for instant checkout experience
    const defaultItem = FURNITURE_CATALOG[0];
    setCartItems([
      {
        product: defaultItem,
        selectedFinishId: defaultItem.finishes[0].id,
        quantity: 1,
      },
    ]);
    setLoaded(true);
  }, []);

  // Save cart changes to localStorage
  useEffect(() => {
    if (loaded && cartItems.length > 0) {
      try {
        localStorage.setItem('wd_furniture_cart', JSON.stringify(cartItems));
      } catch (e) {
        console.error(e);
      }
    }
  }, [cartItems, loaded]);

  // 2. Checkout Step & Form State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  // Delivery Form Details
  const [deliveryForm, setDeliveryForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: 'Riyadh',
    district: '',
    address: '',
    villaBuilding: '',
    deliveryNotes: '',
    orderType: 'retail' as 'retail' | 'b2b',
    companyName: '',
    crNumber: '',
    vatNumber: '',
  });

  // Delivery Scheduling State
  const defaultDeliveryDate = new Date();
  defaultDeliveryDate.setDate(defaultDeliveryDate.getDate() + 8);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>(
    defaultDeliveryDate.toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [whiteGloveAssembly, setWhiteGloveAssembly] = useState(true);
  const [wallAnchoring, setWallAnchoring] = useState(false);

  // Generate upcoming available delivery dates (8 to 16 days out)
  const upcomingDeliveryDates = React.useMemo(() => {
    const dates = [];
    for (let i = 8; i <= 15; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        iso: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        monthName: d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short' }),
        isEarliest: i === 8,
      });
    }
    return dates;
  }, [isAr]);

  // Payment Method Selection
  type PaymentMethod = 'mada_cards' | 'apple_pay' | 'tabby' | 'tamara' | 'bank_transfer' | 'cod' | 'b2b_po';
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('mada_cards');

  // Card Input Details
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Bank Account Copy Indicator
  const [copiedIban, setCopiedIban] = useState<string | null>(null);

  // Bank Transfer OTP Gate State
  const [bankChannel, setBankChannel] = useState<'email' | 'whatsapp'>('email');
  const [bankTarget, setBankTarget] = useState('');
  const [bankOtpCode, setBankOtpCode] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');
  const [verifiedBankAccounts, setVerifiedBankAccounts] = useState<any[]>([]);

  // Payment Modals State
  const [showTabbyModal, setShowTabbyModal] = useState(false);
  const [showTamaraModal, setShowTamaraModal] = useState(false);
  const [showApplePaySheet, setShowApplePaySheet] = useState(false);
  const [applePayProcessing, setApplePayProcessing] = useState(false);
  const [applePayDone, setApplePayDone] = useState(false);
  const [tamaraInstallmentsCount, setTamaraInstallmentsCount] = useState<3 | 4>(4);

  // Sync bankTarget with delivery form inputs
  useEffect(() => {
    if (!bankTarget) {
      if (bankChannel === 'email' && deliveryForm.email) {
        setBankTarget(deliveryForm.email);
      } else if (bankChannel === 'whatsapp' && deliveryForm.phone) {
        setBankTarget(deliveryForm.phone);
      }
    }
  }, [bankChannel, deliveryForm.email, deliveryForm.phone, bankTarget]);

  // Cart Totals Calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = Math.round(discountedSubtotal * 0.15);
  const finalTotal = discountedSubtotal + vatAmount;

  // Tabby & Tamara Installment calculations
  const tabbyInstallment = Math.round(finalTotal / 4);
  const tamaraInstallment = Math.round(finalTotal / tamaraInstallmentsCount);

  // Handle Quantity Change
  const handleUpdateQty = (productId: string, finishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedFinishId === finishId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItemState[]
    );
  };

  // Handle Item Removal
  const handleRemoveItem = (productId: string, finishId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedFinishId === finishId)
      )
    );
  };

  // Handle Promo Code Apply
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'WDVIP10' || code === 'WD10') {
      setDiscountPercent(10);
      setPromoSuccess(isAr ? 'تم تطبيق خصم 10% لكبار العملاء بنجاح!' : '10% VIP Discount Applied Successfully!');
    } else if (code === 'GREENWOOD5' || code === 'SAUDI2030') {
      setDiscountPercent(5);
      setPromoSuccess(isAr ? 'تم تطبيق خصم 5% الخاص بالمصنع!' : '5% Factory Discount Applied Successfully!');
    } else {
      setPromoError(isAr ? 'كود الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired promo code');
    }
  };

  // Handle Bank IBAN Copy
  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedIban(iban);
    setTimeout(() => setCopiedIban(null), 2500);
  };

  // Handle Bank OTP Send
  const handleSendBankOtp = async () => {
    setOtpError('');
    setOtpSuccessMsg('');
    const target = bankTarget.trim() || (bankChannel === 'email' ? deliveryForm.email : deliveryForm.phone);
    if (!target) {
      setOtpError(isAr ? 'يرجى إدخال البريد الإلكتروني أو رقم الواتساب' : 'Please enter your email or WhatsApp number');
      return;
    }

    try {
      setIsSendingOtp(true);
      const res = await fetch('/api/banking/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: bankChannel,
          target,
          customerName: `${deliveryForm.firstName} ${deliveryForm.lastName}`.trim() || 'Valued Client',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setOtpSuccessMsg(
          data.message ||
            (isAr
              ? `تم إرسال رمز التحقق بنجاح إلى ${target}`
              : `Verification code sent successfully to ${target}`)
        );
      } else {
        setOtpError(data.error || (isAr ? 'فشل إرسال رمز التحقق، يرجى المحاولة ثانية' : 'Failed to send verification code'));
      }
    } catch (err: any) {
      setOtpError(err.message || 'Error communicating with verification service');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle Bank OTP Verify
  const handleVerifyBankOtp = async () => {
    setOtpError('');
    setOtpSuccessMsg('');
    if (!bankOtpCode.trim()) {
      setOtpError(isAr ? 'يرجى إدخال رمز التحقق (OTP) المكون من 6 أرقام' : 'Please enter the 6-digit OTP code');
      return;
    }

    const target = bankTarget.trim() || (bankChannel === 'email' ? deliveryForm.email : deliveryForm.phone);

    try {
      setIsVerifyingOtp(true);
      const res = await fetch('/api/banking/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target,
          code: bankOtpCode.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerified(true);
        setVerifiedBankAccounts(data.bankAccounts || []);
        setOtpSuccessMsg(
          isAr
            ? '✓ تم التحقق الأمني بنجاح! تم كشف تفاصيل الحسابات البنكية الرسمية.'
            : '✓ Security verified! Official corporate bank details unlocked.'
        );
      } else {
        setOtpError(data.error || (isAr ? 'رمز التحقق غير صحيح أو منتهي الصلاحية' : 'Invalid or expired OTP code'));
      }
    } catch (err: any) {
      setOtpError(err.message || 'Error verifying OTP');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Handle Apple Pay Sheet
  const handleApplePayAuthorize = () => {
    setApplePayProcessing(true);
    setTimeout(() => {
      setApplePayProcessing(false);
      setApplePayDone(true);
      setTimeout(() => {
        setShowApplePaySheet(false);
        setCurrentStep(3);
      }, 1000);
    }, 1400);
  };

  // Card Number Formatting (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardForm({ ...cardForm, cardNumber: formatted.slice(0, 19) });
  };

  // Card Expiry Formatting (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length >= 2) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2, 4);
    }
    setCardForm({ ...cardForm, expiry: raw.slice(0, 5) });
  };

  // Handle Final Order Placement
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const generatedRef = `WD-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderReference(generatedRef);

    // Simulated API call payload to /api/contact or CRM
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'furniture_checkout',
          orderRef: generatedRef,
          customer: deliveryForm,
          paymentMethod: selectedPayment,
          items: cartItems.map((i) => ({
            id: i.product.id,
            sku: i.product.sku,
            name: isAr ? i.product.nameAr : i.product.nameEn,
            finish: i.selectedFinishId,
            qty: i.quantity,
            unitPrice: i.product.price,
          })),
          subtotal,
          discount: discountAmount,
          vat: vatAmount,
          total: finalTotal,
        }),
      });
    } catch (e) {
      console.warn('Silent fallback for demo', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrderComplete(true);
      // Clear localStorage cart
      try {
        localStorage.removeItem('wd_furniture_cart');
      } catch (e) {}
    }, 1200);
  };

  // Construct WhatsApp Order Confirmation Text
  const whatsappUrl = `https://wa.me/966505725070?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، تم إتمام طلب أثاث جديد عبر الموقع:\n\n*رقم الطلب:* ${orderReference}\n*العميل:* ${deliveryForm.firstName} ${deliveryForm.lastName}\n*الجوال:* ${deliveryForm.phone}\n*المدينة:* ${deliveryForm.city}\n*وسيلة الدفع:* ${selectedPayment}\n*الإجمالي:* ${finalTotal.toLocaleString('en-US')} ريال سعودي\n\nيرجى تأكيد جدول التوصيل والتركيب.`
      : `Hello, a new GreenWood furniture order has been completed online:\n\n*Order Ref:* ${orderReference}\n*Customer:* ${deliveryForm.firstName} ${deliveryForm.lastName}\n*Phone:* ${deliveryForm.phone}\n*City:* ${deliveryForm.city}\n*Payment Method:* ${selectedPayment}\n*Total Due:* SAR ${finalTotal.toLocaleString('en-US')}\n\nPlease confirm installation schedule.`
  )}`;

  // Saudi Cities
  const saudiCities = isAr
    ? ['الرياض', 'جدة', 'الدمام', 'الخبر', 'مكة المكرمة', 'المدينة المنورة', 'نجران', 'أبها', 'تبوك', 'القصيم / بريدة', 'الجبيل', 'حائل', 'الطائف']
    : ['Riyadh', 'Jeddah', 'Dammam', 'Al Khobar', 'Mecca', 'Medina', 'Najran', 'Abha', 'Tabuk', 'Qassim / Buraidah', 'Jubail', 'Hail', 'Taif'];

  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative selection:bg-[#C9A86A] selection:text-[#08090C]">
      
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-[#C9A86A]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/furniture"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 hover:text-[#C9A86A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            <span>{isAr ? 'العودة لمعرض الأثاث' : 'Back to Furniture Showroom'}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'دفع مشفر وآمن 100%' : '256-Bit SSL Encrypted'}</span>
          </div>
        </div>

        {/* Page Header */}
        {!isOrderComplete && (
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {dict.furniture.checkout.page_title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              {dict.furniture.checkout.page_subtitle}
            </p>
          </div>
        )}

        {/* ORDER COMPLETE SUCCESS SCREEN */}
        {isOrderComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-[#C9A86A]/40 bg-[#0F1117]/95 space-y-8 text-center shadow-[0_0_50px_rgba(201,168,106,0.15)]"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#C9A86A]">
                {isAr ? 'تم استلام طلبك بنجاح' : 'Order Received'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {dict.furniture.checkout.success.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
                {dict.furniture.checkout.success.subtitle}
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4 rounded-2xl bg-[#141721] border border-white/10 text-left rtl:text-right font-mono text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">{dict.furniture.checkout.success.order_ref}</span>
                <span className="text-[#C9A86A] font-bold">{orderReference}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">{dict.furniture.checkout.success.date}</span>
                <span className="text-white font-bold">{new Date().toLocaleDateString('en-GB')}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">{dict.furniture.checkout.success.payment_method}</span>
                <span className="text-emerald-400 font-bold uppercase">{selectedPayment.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">{dict.furniture.checkout.order_summary.total}</span>
                <span className="text-[#E3C58A] font-bold">{finalTotal.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
              </div>
            </div>

            {/* Delivery Timeline Guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-left rtl:text-right flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-white block">
                  {isAr ? 'التركيب الفندقي والتسليم المتوقع' : 'White-Glove Delivery & Installation'}
                </span>
                <p className="text-zinc-400">
                  {isAr 
                    ? `سيقوم فريق التركيبات بمصانع جرين وود بالاتصال بك على ${deliveryForm.phone || '+966'} لتأكيد موعد التوصيل الدقيق إلى ${deliveryForm.city}.`
                    : `Our GreenWood installation engineers will contact you at ${deliveryForm.phone || 'your phone'} to confirm the site delivery date in ${deliveryForm.city}.`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                href={`/furniture/track?ref=${orderReference}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-[0_0_25px_rgba(201,168,106,0.5)] transition-all cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{isAr ? 'تتبع مراحل التصنيع والشحن المباشر' : 'Track Live Factory Production'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{dict.furniture.checkout.success.whatsapp_btn}</span>
              </a>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#141721] hover:bg-[#1A1E2C] text-zinc-200 border border-white/10 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#C9A86A]" />
                <span>{dict.furniture.checkout.success.print_btn}</span>
              </button>

              <Link
                href="/furniture"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold text-xs sm:text-sm transition-all"
              >
                <span>{dict.furniture.checkout.success.back_btn}</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* MAIN 3-STEP CHECKOUT LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT / CENTER: Steps Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Steps Progress Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#0F1117] border border-white/10 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    currentStep === 1
                      ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{dict.furniture.checkout.steps.step1}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    currentStep === 2
                      ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{dict.furniture.checkout.steps.step2}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    currentStep === 3
                      ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{dict.furniture.checkout.steps.step3}</span>
                </button>
              </div>

              {/* STEP 1: DELIVERY & INSTALLATION DETAILS */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0F1117]/90 space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="space-y-1">
                      <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#C9A86A]" />
                        <span>{dict.furniture.checkout.delivery_form.heading}</span>
                      </h2>
                      <p className="text-xs text-zinc-400">
                        {dict.furniture.checkout.delivery_form.white_glove_included}
                      </p>
                    </div>
                  </div>

                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-[#141721] border border-white/5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setDeliveryForm({ ...deliveryForm, orderType: 'retail' })}
                      className={`py-2.5 rounded-lg transition-all ${
                        deliveryForm.orderType === 'retail'
                          ? 'bg-[#C9A86A] text-[#08090C] font-bold shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {dict.furniture.checkout_modal.type_retail}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryForm({ ...deliveryForm, orderType: 'b2b' })}
                      className={`py-2.5 rounded-lg transition-all ${
                        deliveryForm.orderType === 'b2b'
                          ? 'bg-[#C9A86A] text-[#08090C] font-bold shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {dict.furniture.checkout_modal.type_b2b}
                    </button>
                  </div>

                  {/* B2B Extra Fields */}
                  {deliveryForm.orderType === 'b2b' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs">
                      <div>
                        <label className="block text-zinc-300 font-semibold mb-1.5">
                          {isAr ? 'اسم الشركة / الفندق' : 'Company / Hotel Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryForm.companyName}
                          onChange={(e) => setDeliveryForm({ ...deliveryForm, companyName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                          placeholder={isAr ? 'شركة التطوير الفندقي' : 'Hospitality Development Corp'}
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-300 font-semibold mb-1.5">
                          {isAr ? 'رقم السجل التجاري / الرقم الضريبي' : 'CR Number / VAT ID'} *
                        </label>
                        <input
                          type="text"
                          value={deliveryForm.crNumber}
                          onChange={(e) => setDeliveryForm({ ...deliveryForm, crNumber: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                          placeholder="700XXXXXXXX / 300XXXXX"
                        />
                      </div>
                    </div>
                  )}

                  {/* Customer Personal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.first_name} *
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="given-name"
                        value={deliveryForm.firstName}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                        placeholder={isAr ? 'عبدالله' : 'Abdullah'}
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.last_name} *
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="family-name"
                        value={deliveryForm.lastName}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                        placeholder={isAr ? 'الشهري' : 'Al-Shehri'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        value={deliveryForm.phone}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A] font-mono"
                        placeholder="+966 5X XXX XXXX"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.email} *
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={deliveryForm.email}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                        placeholder="client@domain.sa"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.city} *
                      </label>
                      <select
                        value={deliveryForm.city}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                      >
                        {saudiCities.map((city) => (
                          <option key={city} value={city} className="bg-[#141721] text-white">
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.district}
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.district}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, district: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                        placeholder={isAr ? 'حي النرجس / حي الشاطئ' : 'Al Narjis / Al Shati'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.address}
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.address}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                        placeholder={isAr ? 'العنوان الوطني المختصر (مثال: RRRD2938)' : 'National Address (e.g. RRRD2938)'}
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1.5">
                        {dict.furniture.checkout.delivery_form.villa_building}
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.villaBuilding}
                        onChange={(e) => setDeliveryForm({ ...deliveryForm, villaBuilding: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                        placeholder={isAr ? 'فيلا 14 / الدور الثاني' : 'Villa 14 / 2nd Floor'}
                      />
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div className="text-xs">
                    <label className="block text-zinc-300 font-semibold mb-1.5">
                      {dict.furniture.checkout.delivery_form.delivery_notes}
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryForm.deliveryNotes}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryNotes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white focus:outline-none focus:border-[#C9A86A]"
                      placeholder={isAr ? 'مثال: يرجى التنسيق مع حارس الفيلا أو توفير رافعة للأدوار العليا' : 'e.g., Gate access code or high-floor crane requirements'}
                    />
                  </div>

                  {/* INTERACTIVE DELIVERY DATE & TIME SLOT SCHEDULER */}
                  <div className="p-5 rounded-2xl bg-[#141721] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-white">
                            {isAr ? 'جدول موعد التوصيل والتركيب الفندقي' : 'Preferred Delivery & Assembly Date'}
                          </h3>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {isAr ? 'مواعيد التجهيز المباشر بالمصنع (توصيل مجاني شامل)' : 'Factory lead-time synchronized (White-Glove Included)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 1. Date Selector Strip */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-zinc-400 font-semibold">
                        {isAr ? 'اختر اليوم المناسب لاستلام وتركيب الأثاث:' : 'Select preferred installation day:'}
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {upcomingDeliveryDates.map((item) => {
                          const isSelected = selectedDeliveryDate === item.iso;
                          return (
                            <button
                              key={item.iso}
                              type="button"
                              onClick={() => setSelectedDeliveryDate(item.iso)}
                              className={`p-3 rounded-xl border shrink-0 text-center min-w-[76px] transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#C9A86A] text-[#08090C] border-[#E3C58A] shadow-md scale-105'
                                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                              }`}
                            >
                              <span className={`block text-[10px] font-mono uppercase ${isSelected ? 'text-[#08090C] font-bold' : 'text-zinc-400'}`}>
                                {item.dayName}
                              </span>
                              <span className="block text-lg font-extrabold font-mono my-0.5">
                                {item.dayNumber}
                              </span>
                              <span className={`block text-[10px] font-medium ${isSelected ? 'text-[#08090C]' : 'text-zinc-400'}`}>
                                {item.monthName}
                              </span>
                              {item.isEarliest && (
                                <span className={`block text-[8px] mt-1 px-1 py-0.5 rounded font-extrabold ${
                                  isSelected ? 'bg-[#08090C] text-[#C9A86A]' : 'bg-emerald-500/20 text-emerald-300'
                                }`}>
                                  {isAr ? 'الأقرب' : 'Earliest'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Time Slot Windows */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <label className="block text-[11px] text-zinc-400 font-semibold">
                        {isAr ? 'الفترة الزمنية المفضلة لوصول فريق التركيب:' : 'Preferred arrival window:'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTimeSlot('morning')}
                          className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                            selectedTimeSlot === 'morning'
                              ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-bold text-white">
                              {isAr ? 'الفترة الصباحية' : 'Morning Slot'}
                            </span>
                            <span className="block text-[10px] text-zinc-400 font-mono">09:00 AM – 01:00 PM</span>
                          </div>
                          {selectedTimeSlot === 'morning' && <Check className="w-3.5 h-3.5 text-[#C9A86A]" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedTimeSlot('afternoon')}
                          className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                            selectedTimeSlot === 'afternoon'
                              ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-bold text-white">
                              {isAr ? 'فترة بعد الظهر' : 'Afternoon Slot'}
                            </span>
                            <span className="block text-[10px] text-zinc-400 font-mono">02:00 PM – 06:00 PM</span>
                          </div>
                          {selectedTimeSlot === 'afternoon' && <Check className="w-3.5 h-3.5 text-[#C9A86A]" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedTimeSlot('evening')}
                          className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center justify-between ${
                            selectedTimeSlot === 'evening'
                              ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white'
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-bold text-white">
                              {isAr ? 'الفترة المسائية' : 'Evening Slot'}
                            </span>
                            <span className="block text-[10px] text-zinc-400 font-mono">06:00 PM – 10:00 PM</span>
                          </div>
                          {selectedTimeSlot === 'evening' && <Check className="w-3.5 h-3.5 text-[#C9A86A]" />}
                        </button>
                      </div>
                    </div>

                    {/* 3. White-Glove Assembly Services Checklist */}
                    <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                      <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                        <input
                          type="checkbox"
                          checked={whiteGloveAssembly}
                          onChange={(e) => setWhiteGloveAssembly(e.target.checked)}
                          className="w-4 h-4 rounded text-[#C9A86A] focus:ring-[#C9A86A] border-zinc-700 bg-zinc-800"
                        />
                        <span>
                          {isAr ? 'خدمة التركيب الفندقي الشامل، ضبط الاتزان، وإزالة كافة مخلفات التغليف (مجانًا)' : 'Complimentary White-Glove Room Assembly & Packaging Removal'}
                        </span>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                        <input
                          type="checkbox"
                          checked={wallAnchoring}
                          onChange={(e) => setWallAnchoring(e.target.checked)}
                          className="w-4 h-4 rounded text-[#C9A86A] focus:ring-[#C9A86A] border-zinc-700 bg-zinc-800"
                        />
                        <span>
                          {isAr ? 'تثبيت جداري آمن للتجاليد والكونسول (موصى به لسلامة الأطفال والأبراج)' : 'Wall Anchoring & Seismic Mounting for High Units / Wall Claddings'}
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-extrabold text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>{isAr ? 'متابعة إلى وسائل الدفع' : 'Proceed to Payment Options'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: PAYMENT METHODS */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0F1117]/90 space-y-6"
                >
                  <div className="pb-4 border-b border-white/10">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#C9A86A]" />
                      <span>{dict.furniture.checkout.payment.heading}</span>
                    </h2>
                  </div>

                  {/* Payment Method Cards */}
                  <div className="space-y-3">
                    
                    {/* 1. Mada & Credit Cards */}
                    <div
                      onClick={() => setSelectedPayment('mada_cards')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'mada_cards'
                          ? 'bg-[#C9A86A]/10 border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'mada_cards'}
                            onChange={() => setSelectedPayment('mada_cards')}
                            className="text-[#C9A86A] focus:ring-[#C9A86A]"
                          />
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {dict.furniture.checkout.payment.mada_cards}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                            mada
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono font-bold text-sky-400 border border-sky-500/30">
                            VISA
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono font-bold text-amber-400 border border-amber-500/30">
                            MC
                          </span>
                        </div>
                      </div>

                      {/* Interactive Credit Card Form */}
                      {selectedPayment === 'mada_cards' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4 mt-4 border-t border-white/10 space-y-4"
                        >
                          <div className="text-xs space-y-3">
                            <div>
                              <label className="block text-zinc-300 font-semibold mb-1">
                                {dict.furniture.checkout.payment.card_number}
                              </label>
                              <input
                                type="text"
                                maxLength={19}
                                value={cardForm.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="4000 1234 5678 9010"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                                dir="ltr"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="sm:col-span-2">
                                <label className="block text-zinc-300 font-semibold mb-1">
                                  {dict.furniture.checkout.payment.card_holder}
                                </label>
                                <input
                                  type="text"
                                  value={cardForm.cardHolder}
                                  onChange={(e) => setCardForm({ ...cardForm, cardHolder: e.target.value })}
                                  placeholder="MOHAMMED AL-SAUD"
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white uppercase focus:outline-none focus:border-[#C9A86A]"
                                />
                              </div>
                              <div>
                                <label className="block text-zinc-300 font-semibold mb-1">
                                  {dict.furniture.checkout.payment.expiry}
                                </label>
                                <input
                                  type="text"
                                  maxLength={5}
                                  value={cardForm.expiry}
                                  onChange={handleExpiryChange}
                                  placeholder="08/28"
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                                  dir="ltr"
                                />
                              </div>
                            </div>

                            <div className="w-1/2 sm:w-1/3">
                              <label className="block text-zinc-300 font-semibold mb-1">
                                {dict.furniture.checkout.payment.cvv}
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cardForm.cvv}
                                onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '') })}
                                placeholder="•••"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-white/15 text-white font-mono focus:outline-none focus:border-[#C9A86A]"
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 2. Apple Pay (Mirrored Apple HIG Experience) */}
                    <div
                      onClick={() => setSelectedPayment('apple_pay')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'apple_pay'
                          ? 'bg-[#C9A86A]/10 border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'apple_pay'}
                            onChange={() => setSelectedPayment('apple_pay')}
                            className="text-[#C9A86A]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                              <span>{dict.furniture.checkout.payment.apple_pay}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-normal">
                                Touch ID / Face ID
                              </span>
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {dict.furniture.checkout.payment.apple_pay_desc}
                            </span>
                          </div>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-xl bg-black border border-white/25 text-white font-bold text-sm font-mono flex items-center gap-1 shadow-md">
                          <span></span>
                          <span>Pay</span>
                        </div>
                      </div>

                      {selectedPayment === 'apple_pay' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs"
                        >
                          <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-zinc-400 text-xs">{isAr ? 'الدفع السريع المعتمد' : 'Express Checkout'}</span>
                              <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Apple Secure Enclave</span>
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowApplePaySheet(true);
                              }}
                              className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                            >
                              <span className="text-lg leading-none"></span>
                              <span>{isAr ? 'الدفع بواسطة Apple Pay' : 'Pay with Apple Pay'}</span>
                            </button>

                            <p className="text-[11px] text-center text-zinc-400">
                              {isAr
                                ? 'سيتم فتح نافذة Apple Pay الرسمية لإتمام الدفع الآمن برقم البطاقة المشفرة'
                                : 'Official Apple Pay sheet will open for encrypted instant authorization'}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 3. Tabby (Mirrored Official GCC UI/UX) */}
                    <div
                      onClick={() => setSelectedPayment('tabby')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'tabby'
                          ? 'bg-[#3EEDBF]/10 border-[#3EEDBF]/60 shadow-[0_0_20px_rgba(62,237,191,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'tabby'}
                            onChange={() => setSelectedPayment('tabby')}
                            className="text-[#3EEDBF]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                              <span>{dict.furniture.checkout.payment.tabby}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3EEDBF]/20 text-[#3EEDBF] font-semibold">
                                {isAr ? 'بدون فوائد 0%' : '0% Interest'}
                              </span>
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {dict.furniture.checkout.payment.tabby_desc}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-[#3EEDBF] text-[#08090C] font-black text-xs font-mono tracking-tight shadow">
                          tabby
                        </div>
                      </div>

                      {selectedPayment === 'tabby' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-white/10 space-y-3"
                        >
                          {/* Tabby Sharia & Guarantee Badge */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-[#3EEDBF]/10 p-2.5 rounded-xl border border-[#3EEDBF]/20">
                            <span className="flex items-center gap-1.5 text-[#3EEDBF] font-bold">
                              <ShieldCheck className="w-4 h-4" />
                              <span>{isAr ? 'متوافق مع أحكام الشريعة الإسلامية' : 'Shariah-Compliant · No Late Fees'}</span>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTabbyModal(true);
                              }}
                              className="text-xs text-white underline hover:text-[#3EEDBF] flex items-center gap-1 transition-colors"
                            >
                              <span>{isAr ? 'كيف يعمل تابي؟' : 'How it works'}</span>
                              <Info className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Mirrored 4-Installment Timeline Schedule */}
                          <div className="grid grid-cols-4 gap-2 pt-1 text-center font-mono">
                            {/* Step 1: Today */}
                            <div className="p-2.5 rounded-xl bg-black/40 border border-[#3EEDBF]/40 space-y-1">
                              <span className="text-[10px] text-[#3EEDBF] font-bold uppercase block">
                                {isAr ? 'اليوم' : 'Today'}
                              </span>
                              <span className="text-xs sm:text-sm font-extrabold text-white block">
                                {tabbyInstallment.toLocaleString('en-US')}
                              </span>
                              <span className="text-[9px] text-zinc-400 block">{isAr ? 'ر.س (25%)' : 'SAR (25%)'}</span>
                            </div>

                            {/* Step 2: 1 Month */}
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                              <span className="text-[10px] text-zinc-400 uppercase block">
                                {isAr ? 'بعد شهر' : 'In 1 Mo'}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-zinc-300 block">
                                {tabbyInstallment.toLocaleString('en-US')}
                              </span>
                              <span className="text-[9px] text-zinc-500 block">{isAr ? 'ر.س (25%)' : 'SAR (25%)'}</span>
                            </div>

                            {/* Step 3: 2 Months */}
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                              <span className="text-[10px] text-zinc-400 uppercase block">
                                {isAr ? 'بعد شهرين' : 'In 2 Mo'}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-zinc-300 block">
                                {tabbyInstallment.toLocaleString('en-US')}
                              </span>
                              <span className="text-[9px] text-zinc-500 block">{isAr ? 'ر.س (25%)' : 'SAR (25%)'}</span>
                            </div>

                            {/* Step 4: 3 Months */}
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                              <span className="text-[10px] text-zinc-400 uppercase block">
                                {isAr ? 'بعد 3 أشهر' : 'In 3 Mo'}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-zinc-300 block">
                                {tabbyInstallment.toLocaleString('en-US')}
                              </span>
                              <span className="text-[9px] text-zinc-500 block">{isAr ? 'ر.س (25%)' : 'SAR (25%)'}</span>
                            </div>
                          </div>

                          <div className="text-[11px] text-zinc-400 pt-1 flex items-center justify-between">
                            <span>{isAr ? 'لا توجد فوائد، ولا توجد أي رسوم تسجيل.' : 'No interest, no sign-up fees.'}</span>
                            <span className="text-[#3EEDBF] font-mono font-bold">
                              {isAr ? 'الموافقة فورية برقم الجوال' : 'Instant mobile approval'}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 4. Tamara (Mirrored Official GCC UI/UX) */}
                    <div
                      onClick={() => setSelectedPayment('tamara')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'tamara'
                          ? 'bg-[#FF7A59]/10 border-[#FF7A59]/60 shadow-[0_0_20px_rgba(255,122,89,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'tamara'}
                            onChange={() => setSelectedPayment('tamara')}
                            className="text-[#FF7A59]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                              <span>{dict.furniture.checkout.payment.tamara}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF7A59]/20 text-[#FF7A59] font-semibold">
                                {isAr ? 'مرخص من ساما SAMA' : 'SAMA Licensed'}
                              </span>
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {dict.furniture.checkout.payment.tamara_desc}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-[#FF7A59] text-white font-black text-xs font-mono tracking-tight shadow">
                          tamara
                        </div>
                      </div>

                      {selectedPayment === 'tamara' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-white/10 space-y-3"
                        >
                          {/* SAMA & Shariah Header */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-[#FF7A59]/10 p-2.5 rounded-xl border border-[#FF7A59]/20">
                            <span className="flex items-center gap-1.5 text-[#FF7A59] font-bold">
                              <ShieldCheck className="w-4 h-4" />
                              <span>{isAr ? 'مرخص رسمياً من البنك المركزي السعودي (ساما)' : 'Licensed by Saudi Central Bank (SAMA)'}</span>
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTamaraModal(true);
                              }}
                              className="text-xs text-white underline hover:text-[#FF7A59] flex items-center gap-1 transition-colors"
                            >
                              <span>{isAr ? 'تفاصيل تمارا' : 'Details'}</span>
                              <Info className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Installments Option Selector: 4 vs 3 */}
                          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTamaraInstallmentsCount(4);
                              }}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                tamaraInstallmentsCount === 4
                                  ? 'bg-[#FF7A59] text-white shadow'
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              {isAr ? '4 دفعات (موصى به)' : 'Split in 4 (Recommended)'}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTamaraInstallmentsCount(3);
                              }}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                tamaraInstallmentsCount === 3
                                  ? 'bg-[#FF7A59] text-white shadow'
                                  : 'text-zinc-400 hover:text-white'
                              }`}
                            >
                              {isAr ? '3 دفعات' : 'Split in 3'}
                            </button>
                          </div>

                          {/* Timeline display */}
                          <div className={`grid gap-2 pt-1 text-center font-mono ${tamaraInstallmentsCount === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                            <div className="p-2.5 rounded-xl bg-black/40 border border-[#FF7A59]/40 space-y-1">
                              <span className="text-[10px] text-[#FF7A59] font-bold uppercase block">{isAr ? 'الدفعة 1' : 'Payment 1'}</span>
                              <span className="text-xs sm:text-sm font-extrabold text-white block">{tamaraInstallment.toLocaleString('en-US')}</span>
                              <span className="text-[9px] text-zinc-400 block">{isAr ? 'اليوم' : 'Today'}</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                              <span className="text-[10px] text-zinc-400 uppercase block">{isAr ? 'الدفعة 2' : 'Payment 2'}</span>
                              <span className="text-xs sm:text-sm font-bold text-zinc-300 block">{tamaraInstallment.toLocaleString('en-US')}</span>
                              <span className="text-[9px] text-zinc-500 block">{isAr ? 'بعد شهر' : '+1 Month'}</span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                              <span className="text-[10px] text-zinc-400 uppercase block">{isAr ? 'الدفعة 3' : 'Payment 3'}</span>
                              <span className="text-xs sm:text-sm font-bold text-zinc-300 block">{tamaraInstallment.toLocaleString('en-US')}</span>
                              <span className="text-[9px] text-zinc-500 block">{isAr ? 'بعد شهرين' : '+2 Months'}</span>
                            </div>
                            {tamaraInstallmentsCount === 4 && (
                              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                                <span className="text-[10px] text-zinc-400 uppercase block">{isAr ? 'الدفعة 4' : 'Payment 4'}</span>
                                <span className="text-xs sm:text-sm font-bold text-zinc-300 block">{tamaraInstallment.toLocaleString('en-US')}</span>
                                <span className="text-[9px] text-zinc-500 block">{isAr ? 'بعد 3 أشهر' : '+3 Months'}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 5. Direct Official Corporate Bank Transfer (With OTP Verification Gate) */}
                    <div
                      onClick={() => setSelectedPayment('bank_transfer')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'bank_transfer'
                          ? 'bg-[#C9A86A]/10 border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'bank_transfer'}
                            onChange={() => setSelectedPayment('bank_transfer')}
                            className="text-[#C9A86A]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                              <span>{dict.furniture.checkout.payment.bank_transfer}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C9A86A]/20 text-[#C9A86A] font-semibold flex items-center gap-1">
                                <KeyRound className="w-3 h-3" />
                                <span>{isAr ? 'محمي برمز OTP' : 'OTP Guarded'}</span>
                              </span>
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {dict.furniture.checkout.payment.bank_transfer_desc}
                            </span>
                          </div>
                        </div>
                        <Building2 className="w-5 h-5 text-[#C9A86A]" />
                      </div>

                      {selectedPayment === 'bank_transfer' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-white/10 space-y-4 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* OTP GATE STATUS */}
                          {!otpVerified ? (
                            <div className="p-4 rounded-2xl bg-[#0B0D13] border border-[#C9A86A]/40 space-y-4 shadow-xl">
                              <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-[#C9A86A]/15 text-[#C9A86A] shrink-0 border border-[#C9A86A]/30">
                                  <KeyRound className="w-5 h-5 animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span>{isAr ? 'التحقق الأمني لعرض الحسابات البنكية' : 'Security OTP Gate for Bank Details'}</span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                      {isAr ? 'مطلوب للمتابعة' : 'Required'}
                                    </span>
                                  </h4>
                                  <p className="text-xs text-zinc-400 leading-relaxed">
                                    {isAr
                                      ? 'لحماية الحسابات البنكية الرسمية لشركة مجموعة دبليو دي للأعمال ومنع الاحتيال، يُرجى تأكيد هويتك باستلام رمز تحقق سريع (OTP) عبر البريد الإلكتروني أو الواتساب لعرض الآيبان البنكي المعتمد.'
                                      : 'To prevent fraudulent impersonation and secure WD Group corporate bank accounts, please verify your contact via Email or WhatsApp OTP before revealing IBAN details.'}
                                  </p>
                                </div>
                              </div>

                              {/* Channel Selector */}
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setBankChannel('email');
                                    setBankTarget(deliveryForm.email || '');
                                    setOtpSent(false);
                                    setOtpError('');
                                    setOtpSuccessMsg('');
                                  }}
                                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                                    bankChannel === 'email'
                                      ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white shadow'
                                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                                  }`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>{isAr ? 'عبر البريد الإلكتروني' : 'Via Email'}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setBankChannel('whatsapp');
                                    setBankTarget(deliveryForm.phone || '');
                                    setOtpSent(false);
                                    setOtpError('');
                                    setOtpSuccessMsg('');
                                  }}
                                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                                    bankChannel === 'whatsapp'
                                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow'
                                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                                  }`}
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>{isAr ? 'عبر الواتساب' : 'Via WhatsApp'}</span>
                                </button>
                              </div>

                              {/* Target Input & Send OTP Button */}
                              <div className="space-y-2">
                                <label className="text-[11px] text-zinc-400 font-mono block">
                                  {bankChannel === 'email'
                                    ? (isAr ? 'البريد الإلكتروني لاستلام رمز التحقق:' : 'Email address for OTP:')
                                    : (isAr ? 'رقم الواتساب لاستلام رمز التحقق:' : 'WhatsApp number for OTP:')}
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type={bankChannel === 'email' ? 'email' : 'tel'}
                                    value={bankTarget}
                                    onChange={(e) => setBankTarget(e.target.value)}
                                    placeholder={bankChannel === 'email' ? 'client@domain.com' : '+966 50 123 4567'}
                                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white font-mono focus:outline-none focus:border-[#C9A86A] text-xs"
                                    dir="ltr"
                                  />
                                  <button
                                    type="button"
                                    disabled={isSendingOtp}
                                    onClick={handleSendBankOtp}
                                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-bold text-xs font-mono hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
                                  >
                                    {isSendingOtp
                                      ? (isAr ? 'جارٍ الإرسال…' : 'Sending…')
                                      : otpSent
                                      ? (isAr ? 'إعادة الإرسال' : 'Resend')
                                      : (isAr ? 'إرسال الرمز' : 'Send Code')}
                                  </button>
                                </div>
                              </div>

                              {/* OTP Verification Input Form (When Code Sent) */}
                              {otpSent && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="pt-3 border-t border-white/10 space-y-2"
                                >
                                  <label className="text-[11px] text-zinc-300 font-mono font-bold block flex items-center justify-between">
                                    <span>{isAr ? 'أدخل رمز التحقق (OTP) المكون من 6 أرقام:' : 'Enter 6-digit OTP code:'}</span>
                                    <span className="text-[#C9A86A] text-[10px]">{isAr ? 'صالح لمدة 10 دقائق' : 'Valid 10 mins'}</span>
                                  </label>

                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      maxLength={6}
                                      value={bankOtpCode}
                                      onChange={(e) => setBankOtpCode(e.target.value.replace(/\D/g, ''))}
                                      placeholder="••••••"
                                      className="w-36 text-center tracking-[0.4em] px-3.5 py-2.5 rounded-xl bg-black border border-[#C9A86A] text-[#C9A86A] font-mono text-base font-bold focus:outline-none"
                                      dir="ltr"
                                    />
                                    <button
                                      type="button"
                                      disabled={isVerifyingOtp}
                                      onClick={handleVerifyBankOtp}
                                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg"
                                    >
                                      {isVerifyingOtp ? (
                                        <span>{isAr ? 'جارٍ التحقق…' : 'Verifying…'}</span>
                                      ) : (
                                        <>
                                          <CheckCircle2 className="w-4 h-4" />
                                          <span>{isAr ? 'تأكيد الرمز وعرض الحسابات' : 'Verify & Reveal Bank Details'}</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              )}

                              {/* Feedback Alerts */}
                              {otpSuccessMsg && (
                                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                                  <span>{otpSuccessMsg}</span>
                                </div>
                              )}

                              {otpError && (
                                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 shrink-0" />
                                  <span>{otpError}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            /* UNLOCKED & VERIFIED CORPORATE BANK ACCOUNTS */
                            <motion.div
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-3"
                            >
                              {/* Security Clearance Header */}
                              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <span className="flex items-center gap-2">
                                  <ShieldCheck className="w-4 h-4" />
                                  <span>{isAr ? 'تم التحقق الأمني بنجاح — الحسابات المصرفية المعتمدة' : 'Security Clearance Granted — Official Corporate Accounts'}</span>
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                                  {isAr ? 'موثق' : 'Verified'}
                                </span>
                              </div>

                              {/* Al Rajhi Bank */}
                              <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-bold">{isAr ? 'مصرف الراجحي' : 'Al Rajhi Bank'}</span>
                                  <span className="text-[10px] text-[#C9A86A] font-mono">{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group for Business'}</span>
                                </div>
                                <div className="flex items-center justify-between bg-[#141721] p-2 rounded-lg font-mono text-[11px]">
                                  <span className="text-zinc-300 select-all" dir="ltr">SA4380000595608010001105</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyIban('SA4380000595608010001105')}
                                    className="text-[#C9A86A] hover:text-white p-1 rounded transition-colors flex items-center gap-1 font-mono text-[10px]"
                                  >
                                    {copiedIban === 'SA4380000595608010001105' ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-emerald-400">{isAr ? 'تم النسخ' : 'Copied'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>{isAr ? 'نسخ الآيبان' : 'Copy IBAN'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Saudi National Bank (SNB) */}
                              <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-bold">{isAr ? 'البنك الأهلي السعودي (SNB)' : 'Saudi National Bank (SNB)'}</span>
                                  <span className="text-[10px] text-[#C9A86A] font-mono">{isAr ? 'مجموعة دبليو دي للأعمال' : 'WD Group for Business'}</span>
                                </div>
                                <div className="flex items-center justify-between bg-[#141721] p-2 rounded-lg font-mono text-[11px]">
                                  <span className="text-zinc-300 select-all" dir="ltr">SA0910000059500110570001</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyIban('SA0910000059500110570001')}
                                    className="text-[#C9A86A] hover:text-white p-1 rounded transition-colors flex items-center gap-1 font-mono text-[10px]"
                                  >
                                    {copiedIban === 'SA0910000059500110570001' ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-emerald-400">{isAr ? 'تم النسخ' : 'Copied'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>{isAr ? 'نسخ الآيبان' : 'Copy IBAN'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-zinc-400 text-[11px] leading-relaxed">
                                {isAr
                                  ? 'يرجى تدوين رقم الطلب في خانة الملاحظات / الغرض من الحوالة وسنقوم بمطابقة الحوالة وإصدار سند القبض الرسمي خلال 30 دقيقة.'
                                  : 'Please include your Order Reference in the bank transfer remarks. Our finance desk will match and issue your official tax receipt within 30 minutes.'}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* 6. Pay on Delivery / POS */}
                    <div
                      onClick={() => setSelectedPayment('cod')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'cod'
                          ? 'bg-[#C9A86A]/10 border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'cod'}
                            onChange={() => setSelectedPayment('cod')}
                            className="text-[#C9A86A]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white block">
                              {dict.furniture.checkout.payment.cod}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {dict.furniture.checkout.payment.cod_desc}
                            </span>
                          </div>
                        </div>
                        <Truck className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>

                    {/* 7. Commercial B2B / Hotel PO */}
                    <div
                      onClick={() => setSelectedPayment('b2b_po')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedPayment === 'b2b_po'
                          ? 'bg-[#C9A86A]/10 border-[#C9A86A] shadow-[0_0_20px_rgba(201,168,106,0.15)]'
                          : 'bg-[#141721] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_choice"
                            checked={selectedPayment === 'b2b_po'}
                            onChange={() => setSelectedPayment('b2b_po')}
                            className="text-[#C9A86A]"
                          />
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-white block">
                              {dict.furniture.checkout.payment.b2b_po}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {dict.furniture.checkout.payment.b2b_po_desc}
                            </span>
                          </div>
                        </div>
                        <FileText className="w-5 h-5 text-amber-400" />
                      </div>
                    </div>

                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-3 rounded-xl text-xs font-bold text-zinc-300 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      {isAr ? 'رجوع' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 py-4 rounded-xl text-xs sm:text-sm font-extrabold text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>{isAr ? 'مراجعة وتأكيد الطلب' : 'Review & Confirm Order'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: ORDER REVIEW */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0F1117]/90 space-y-6"
                >
                  <div className="pb-4 border-b border-white/10">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A86A]" />
                      <span>{dict.furniture.checkout.steps.step3}</span>
                    </h2>
                  </div>

                  {/* Delivery & Payment Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
                          {dict.furniture.checkout.delivery_form.heading}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[#C9A86A] hover:underline text-[11px]"
                        >
                          {isAr ? 'تعديل' : 'Edit'}
                        </button>
                      </div>
                      <p className="text-zinc-200 font-semibold">
                        {deliveryForm.firstName || 'Client'} {deliveryForm.lastName}
                      </p>
                      <p className="text-zinc-400">
                        {deliveryForm.city}, {deliveryForm.district || 'KSA'}
                      </p>
                      <p className="text-zinc-500 font-mono text-[11px]" dir="ltr">
                        {deliveryForm.phone || '+966 50 000 0000'}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                          {dict.furniture.checkout.payment.heading}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-[#C9A86A] hover:underline text-[11px]"
                        >
                          {isAr ? 'تعديل' : 'Edit'}
                        </button>
                      </div>
                      <p className="text-emerald-400 font-bold uppercase font-mono">
                        {selectedPayment.replace('_', ' ')}
                      </p>
                      <p className="text-zinc-400 text-[11px]">
                        {selectedPayment === 'tabby'
                          ? `4 × ${tabbyInstallment.toLocaleString('en-US')} ${isAr ? 'ر.س' : 'SAR'}/${isAr ? 'شهر' : 'mo'}`
                          : selectedPayment === 'tamara'
                          ? `3 × ${tamaraInstallment.toLocaleString('en-US')} ${isAr ? 'ر.س' : 'SAR'}/${isAr ? 'شهر' : 'mo'}`
                          : isAr ? 'دفع مباشر مشفر ومعتمد' : 'Direct Authorized Checkout'}
                      </p>
                    </div>
                  </div>

                  {/* Final Place Order Button */}
                  <button
                    type="button"
                    disabled={isSubmitting || cartItems.length === 0}
                    onClick={handlePlaceOrder}
                    className="w-full py-4 rounded-2xl text-sm sm:text-base font-extrabold text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_35px_rgba(201,168,106,0.6)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#08090C] border-t-transparent rounded-full animate-spin" />
                        <span>{dict.furniture.checkout.order_summary.processing}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        <span>{dict.furniture.checkout.order_summary.place_order} ({finalTotal.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'})</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-zinc-500 font-mono flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>{dict.furniture.checkout.order_summary.security_badge}</span>
                  </p>
                </motion.div>
              )}

            </div>

            {/* RIGHT: Order Summary & Item Review (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <div className="glass-card rounded-3xl p-6 border border-white/10 bg-[#0F1117]/95 space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C9A86A]" />
                    <span>{dict.furniture.checkout.order_summary.heading}</span>
                  </h3>
                  <span className="text-xs font-mono text-[#C9A86A] bg-[#C9A86A]/10 px-2 py-0.5 rounded-full border border-[#C9A86A]/30">
                    {cartItems.reduce((s, i) => s + i.quantity, 0)} {isAr ? 'قطع' : 'Items'}
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-6 text-xs text-zinc-400">
                      {dict.furniture.cart.empty_title}
                    </div>
                  ) : (
                    cartItems.map((item, idx) => {
                      const finish = item.product.finishes.find((f) => f.id === item.selectedFinishId);
                      return (
                        <div
                          key={`${item.product.id}-${item.selectedFinishId}-${idx}`}
                          className="p-3 rounded-2xl bg-[#141721] border border-white/5 flex gap-3 items-center justify-between"
                        >
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
                            <Image
                              src={item.product.images[0]}
                              alt={isAr ? item.product.nameAr : item.product.nameEn}
                              fill
                              sizes="64px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-0.5">
                            <h4 className="text-xs font-bold text-white truncate">
                              {isAr ? item.product.nameAr : item.product.nameEn}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                              <span
                                className="w-2 h-2 rounded-full inline-block border border-white/20"
                                style={{ backgroundColor: finish?.colorCode || '#C9A86A' }}
                              />
                              <span>{isAr ? finish?.nameAr : finish?.nameEn}</span>
                            </div>
                            <div className="text-[11px] font-mono text-[#C9A86A]">
                              {item.product.price.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/10 font-mono text-xs">
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item.product.id, item.selectedFinishId, -1)}
                              className="text-zinc-400 hover:text-white px-1"
                            >
                              -
                            </button>
                            <span className="text-white font-bold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item.product.id, item.selectedFinishId, 1)}
                              className="text-zinc-400 hover:text-white px-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute top-3 left-3 rtl:left-auto rtl:right-3 text-zinc-400" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={dict.furniture.checkout.order_summary.promo_placeholder}
                        className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-[#C9A86A] font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#C9A86A] hover:bg-[#DFBA73] text-[#08090C] text-xs font-bold font-mono transition-all cursor-pointer"
                    >
                      {dict.furniture.checkout.order_summary.apply}
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{promoSuccess}</span>
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{promoError}</span>
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-3 border-t border-white/10 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{dict.furniture.checkout.order_summary.subtotal}</span>
                    <span className="text-zinc-200">{subtotal.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>{dict.furniture.checkout.order_summary.discount} ({discountPercent}%)</span>
                      <span>-{discountAmount.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{dict.furniture.checkout.order_summary.vat}</span>
                    <span className="text-zinc-200">{vatAmount.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{dict.furniture.checkout.order_summary.delivery}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {dict.furniture.checkout.order_summary.free}
                    </span>
                  </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm sm:text-base font-bold text-white">
                    <span>{dict.furniture.checkout.order_summary.total}</span>
                    <span className="text-[#C9A86A] text-lg sm:text-xl font-extrabold">
                      {finalTotal.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TABBY INFO MODAL (Mirrored GCC Specification) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showTabbyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-lg rounded-3xl bg-[#0F1117] border border-[#3EEDBF]/40 p-6 sm:p-8 shadow-2xl space-y-6 text-white"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#3EEDBF] text-[#08090C] font-black font-mono text-sm tracking-tight">
                      tabby
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {isAr ? 'الدفع الآجل الميسر' : 'Split in 4 Payments'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTabbyModal(false)}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">
                    {isAr ? 'قسّم مشترياتك على 4 دفعات بدون فوائد' : 'Split your purchase into 4 interest-free payments'}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {isAr
                      ? 'اختر تابي عند الدفع وقسّم فاتورتك على 4 دفعات شهرية متساوية. بدون أي فوائد ربوية أو رسوم تأخير أو فوائد مخفية.'
                      : 'Choose Tabby at checkout and split your purchase into 4 equal monthly installments. No interest, no late fees, no hidden charges.'}
                  </p>
                </div>

                {/* 4 Steps timeline */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-[#141724] border border-[#3EEDBF]/30 space-y-1">
                    <span className="text-[#3EEDBF] font-bold text-[10px] block uppercase">{isAr ? 'الدفعة 1' : '1st Payment'}</span>
                    <span className="font-extrabold text-white block">{tabbyInstallment.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                    <span className="text-[9px] text-zinc-400 block">{isAr ? 'اليوم عند الطلب' : 'Today'}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#141724] border border-white/10 space-y-1">
                    <span className="text-zinc-400 font-bold text-[10px] block uppercase">{isAr ? 'الدفعة 2' : '2nd Payment'}</span>
                    <span className="font-bold text-zinc-300 block">{tabbyInstallment.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                    <span className="text-[9px] text-zinc-500 block">{isAr ? 'بعد شهر' : 'In 1 Month'}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#141724] border border-white/10 space-y-1">
                    <span className="text-zinc-400 font-bold text-[10px] block uppercase">{isAr ? 'الدفعة 3' : '3rd Payment'}</span>
                    <span className="font-bold text-zinc-300 block">{tabbyInstallment.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                    <span className="text-[9px] text-zinc-500 block">{isAr ? 'بعد شهرين' : 'In 2 Months'}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#141724] border border-white/10 space-y-1">
                    <span className="text-zinc-400 font-bold text-[10px] block uppercase">{isAr ? 'الدفعة 4' : '4th Payment'}</span>
                    <span className="font-bold text-zinc-300 block">{tabbyInstallment.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}</span>
                    <span className="text-[9px] text-zinc-500 block">{isAr ? 'بعد 3 أشهر' : 'In 3 Months'}</span>
                  </div>
                </div>

                {/* How it works features */}
                <div className="space-y-2.5 text-xs text-zinc-300 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3EEDBF] shrink-0" />
                    <span>{isAr ? 'متوافق بالكامل مع أحكام الشريعة الإسلامية ومصرح رسمياً في المملكة' : 'Fully Shariah-compliant and licensed in KSA'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3EEDBF] shrink-0" />
                    <span>{isAr ? 'موافقة فورية برقم الجوال والهوية الوطنية دون معاملات ورقية' : 'Instant approval via phone & national ID without paperwork'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3EEDBF] shrink-0" />
                    <span>{isAr ? 'سداد ميسر عبر بطاقة مدى، فيزا، أو ماستركارد' : 'Easy recurring payments via Mada, Visa, or Mastercard'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTabbyModal(false)}
                  className="w-full py-3.5 rounded-xl bg-[#3EEDBF] text-[#08090C] font-extrabold text-xs font-mono hover:opacity-90 transition-all cursor-pointer shadow-lg"
                >
                  {isAr ? 'فهمت ذلك، المتابعة للشراء' : 'Got it, Continue Shopping'}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* TAMARA INFO MODAL (Mirrored GCC Specification) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showTamaraModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-lg rounded-3xl bg-[#0F1117] border border-[#FF7A59]/40 p-6 sm:p-8 shadow-2xl space-y-6 text-white"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-[#FF7A59] text-white font-black font-mono text-sm tracking-tight">
                      tamara
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {isAr ? 'ساما SAMA معتمد' : 'SAMA Certified'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowTamaraModal(false)}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">
                    {isAr ? 'الدفع الآجل الذكي مع تمارا' : 'Smart Installment Solutions with Tamara'}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {isAr
                      ? 'قسّم فاتورتك بكل سهولة وأمان. اختر إما 4 دفعات أو 3 دفعات بدون أي رسوم إضافية عند السداد في الموعد.'
                      : 'Split your payment flexibly. Choose 4 or 3 installments with zero extra fees when paid on time.'}
                  </p>
                </div>

                {/* SAMA license badge */}
                <div className="p-3.5 rounded-2xl bg-[#FF7A59]/10 border border-[#FF7A59]/30 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#FF7A59] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      {isAr ? 'مرخص من البنك المركزي السعودي (ساما)' : 'Licensed by the Saudi Central Bank (SAMA)'}
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      {isAr ? 'متوافق 100% مع معايير الشريعة الإسلامية المصرفية' : '100% compliant with Islamic banking regulations'}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 text-xs text-zinc-300 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF7A59] shrink-0" />
                    <span>{isAr ? 'لا توجد فوائد ربوية أو رسوم تسجيل' : 'Zero interest, zero setup fees'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF7A59] shrink-0" />
                    <span>{isAr ? 'إمكانية السداد المبكر في أي وقت بدون غرامات' : 'Early repayment at any time with no penalties'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF7A59] shrink-0" />
                    <span>{isAr ? 'إشعارات تذكيرية لطيفة قبل موعد كل دفعة' : 'Gentle SMS reminders prior to each scheduled installment'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTamaraModal(false)}
                  className="w-full py-3.5 rounded-xl bg-[#FF7A59] text-white font-extrabold text-xs font-mono hover:opacity-90 transition-all cursor-pointer shadow-lg"
                >
                  {isAr ? 'فهمت ذلك، المتابعة للشراء' : 'Got it, Continue Shopping'}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* APPLE PAY SHEET MODAL (Mirrored Apple HIG Experience) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showApplePaySheet && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#1C1C1E] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 text-white font-sans"
              >
                {/* Sheet Handle for Mobile */}
                <div className="w-12 h-1 rounded-full bg-white/20 mx-auto -mt-2 sm:hidden" />

                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight flex items-center gap-1">
                      <span></span>
                      <span>Pay</span>
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">WD Group Saudi Arabia</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!applePayProcessing) setShowApplePaySheet(false);
                    }}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Artwork & Selector */}
                <div className="p-4 rounded-2xl bg-[#2C2C2E] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded-lg bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 border border-white/20 flex items-center justify-center text-[10px] font-mono font-bold tracking-wider text-white shadow">
                      mada
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {isAr ? 'بطاقة مدى الرقمية · مصرف الراجحي' : 'Mada Digital Card · Al Rajhi'}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono" dir="ltr">
                        •••• 4210
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    {isAr ? 'جاهزة للدفع' : 'Ready'}
                  </span>
                </div>

                {/* Shipping & Delivery Row */}
                <div className="space-y-2 text-xs border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{isAr ? 'عنوان التوصيل والتركيب:' : 'White-Glove Site:'}</span>
                    <span className="text-white font-medium">
                      {deliveryForm.city}, {deliveryForm.district || 'KSA'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{isAr ? 'موعد التسليم المعتمد:' : 'Installation Window:'}</span>
                    <span className="text-[#C9A86A] font-mono">
                      {selectedDeliveryDate} ({selectedTimeSlot === 'morning' ? (isAr ? 'صباحي' : 'Morning') : (isAr ? 'مسائي' : 'Afternoon')})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{isAr ? 'العميل للتواصل:' : 'Contact:'}</span>
                    <span className="text-white font-mono" dir="ltr">
                      {deliveryForm.phone || '+966 50 572 5070'}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span>{discountedSubtotal.toLocaleString('en-US')} SAR</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{isAr ? 'ضريبة القيمة المضافة (15%):' : 'VAT (15%):'}</span>
                    <span>{vatAmount.toLocaleString('en-US')} SAR</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>{isAr ? 'الشحن والتوصيل الفندقي:' : 'White-Glove Delivery:'}</span>
                    <span className="text-emerald-400 font-bold">{isAr ? 'مجاني' : 'FREE'}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-base font-bold text-white">
                    <span>{isAr ? 'الإجمالي النهائي المطلوب:' : 'PAY TOTAL:'}</span>
                    <span className="text-white font-mono text-lg font-black">
                      {finalTotal.toLocaleString('en-US')} SAR
                    </span>
                  </div>
                </div>

                {/* Biometric Confirmation Button */}
                <div className="pt-2 space-y-3">
                  {!applePayDone ? (
                    <button
                      type="button"
                      disabled={applePayProcessing}
                      onClick={handleApplePayAuthorize}
                      className="w-full py-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xl disabled:opacity-75"
                    >
                      {applePayProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>{isAr ? 'جارٍ التفويض الآمن مع البنك…' : 'Processing with Bank…'}</span>
                        </>
                      ) : (
                        <>
                          <Fingerprint className="w-5 h-5" />
                          <span>{isAr ? 'تأكيد ودفع بواسطة Apple Pay' : 'Double Click Side Button or Pay'}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl animate-pulse">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{isAr ? 'تم تأكيد الدفع بنجاح!' : 'Payment Approved!'}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-center text-zinc-400">
                    {isAr
                      ? 'الدفع محمي بواسطة Apple Pay Secure Element وتشفير البنك المركزي السعودي'
                      : 'Protected by Apple Pay Secure Element & Saudi Central Bank encryption'}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
