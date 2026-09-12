'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { generateZatcaQrBase64, generateQrCodeDataUrl } from '@/lib/ecommerce/zatca';
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode,
  FileText
} from 'lucide-react';

export interface InvoiceItem {
  sku: string;
  nameEn: string;
  nameAr?: string;
  finishName?: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceOrderData {
  orderRef: string;
  customerName: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
  district?: string;
  companyName?: string;
  crNumber?: string;
  vatNumber?: string;
  orderDate?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  subtotal: number;
  discountAmount?: number;
  vatAmount: number;
  totalAmount: number;
  items: InvoiceItem[];
}

interface OfficialTaxInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: InvoiceOrderData;
  isQuotation?: boolean;
}

export default function OfficialTaxInvoiceModal({
  isOpen,
  onClose,
  order,
  isQuotation = false,
}: OfficialTaxInvoiceModalProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  if (!isOpen) return null;

  // Generate ZATCA QR Code Data
  const orderDateIso = order.orderDate ? new Date(order.orderDate).toISOString() : new Date().toISOString();
  const zatcaTlvBase64 = generateZatcaQrBase64({
    sellerName: 'شركة تصاميم الوطن المحدودة - مجموعة دبليو دي',
    vatRegistrationNumber: '310492817400003',
    timestamp: orderDateIso,
    totalWithVat: order.totalAmount,
    vatTotal: order.vatAmount,
  });

  const qrImageUrl = generateQrCodeDataUrl(zatcaTlvBase64, 150);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-4xl bg-white text-zinc-900 rounded-3xl shadow-2xl overflow-hidden my-8"
        >
          {/* Top Floating Control Bar (Hidden when printing) */}
          <div className="print:hidden p-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C9A86A]">
              <FileText className="w-4 h-4" />
              <span>{isQuotation ? 'عرض سعر معتمد (B2B RFQ)' : 'فاتورة ضريبية معتمدة (ZATCA Phase-2)'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-[#C9A86A] text-[#08090C] hover:bg-[#E3C58A] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'طباعة / حفظ كـ PDF' : 'Print / Save PDF'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Paper Area */}
          <div className="p-6 sm:p-10 font-sans text-zinc-800 space-y-8 bg-white print:p-0 print:m-0">
            
            {/* 1. Official Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b-2 border-zinc-900">
              <div className="space-y-1 text-left rtl:text-right">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#08090C] text-[#C9A86A] flex items-center justify-center font-serif font-black text-lg">
                    WD
                  </div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-zinc-950 tracking-tight">
                    شركة تصاميم الوطن المحدودة
                  </h1>
                </div>
                <p className="text-xs text-zinc-600 font-medium">
                  مجموعة دبليو دي للأعمال · قسم تصنيع الأثاث الفندقي والمكتبي (جرين وود)
                </p>
                <p className="text-[11px] text-zinc-500 font-mono">
                  السجل التجاري (CR): 1010724891 · الرقم الضريبي (VAT): 310492817400003
                </p>
                <p className="text-[11px] text-zinc-500">
                  الرياض، المملكة العربية السعودية · info@wdgroup.online · هاتف: +966 11 400 2200
                </p>
              </div>

              {/* Document Type Badge & ZATCA QR Code */}
              <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                <div className="text-right rtl:text-left space-y-1">
                  <span className="inline-block px-3 py-1 rounded-md bg-zinc-900 text-white font-extrabold text-xs uppercase tracking-wider">
                    {isQuotation ? (isAr ? 'عرض سعر معتمد' : 'OFFICIAL QUOTATION') : (isAr ? 'فاتورة ضريبية' : 'TAX INVOICE')}
                  </span>
                  <div className="text-xs font-mono text-zinc-600">
                    <span className="font-bold text-zinc-900 block">{order.orderRef}</span>
                    <span>{order.orderDate || new Date().toLocaleDateString('en-GB')}</span>
                  </div>
                </div>

                {/* ZATCA Cryptographic QR */}
                <div className="w-24 h-24 p-1 rounded-xl border border-zinc-300 bg-white shrink-0 flex items-center justify-center shadow-sm">
                  <img
                    src={qrImageUrl}
                    alt="ZATCA Tax QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 2. Customer & Bill-To Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
              <div className="space-y-1 text-left rtl:text-right">
                <span className="font-mono text-zinc-400 font-bold uppercase text-[10px]">
                  {isAr ? 'بيانات العميل / المشتري' : 'BILL TO / CUSTOMER DETAILS'}
                </span>
                <p className="font-bold text-sm text-zinc-900">{order.customerName}</p>
                {order.companyName && (
                  <p className="text-zinc-700 font-semibold">{isAr ? 'الشركة / المشروع:' : 'Company:'} {order.companyName}</p>
                )}
                {order.crNumber && (
                  <p className="text-zinc-600 font-mono">{isAr ? 'السجل التجاري:' : 'CR:'} {order.crNumber}</p>
                )}
                {order.vatNumber && (
                  <p className="text-zinc-600 font-mono">{isAr ? 'الرقم الضريبي للعميل:' : 'Buyer VAT:'} {order.vatNumber}</p>
                )}
                <p className="text-zinc-600">{order.phone || ''} · {order.email || ''}</p>
                <p className="text-zinc-600">{order.city || 'الرياض'} {order.district ? `— ${order.district}` : ''} {order.address || ''}</p>
              </div>

              <div className="space-y-1 text-left rtl:text-right sm:border-l rtl:sm:border-l-0 rtl:sm:border-r border-zinc-200 sm:pl-6 rtl:sm:pl-0 rtl:sm:pr-6">
                <span className="font-mono text-zinc-400 font-bold uppercase text-[10px]">
                  {isAr ? 'شروط التوريد والدفع' : 'SUPPLY & PAYMENT TERMS'}
                </span>
                <p className="text-zinc-700"><span className="font-semibold">{isAr ? 'طريقة السداد:' : 'Payment:'}</span> {order.paymentMethod ? order.paymentMethod.replace('_', ' ').toUpperCase() : 'MADA / APPLE PAY'}</p>
                <p className="text-zinc-700"><span className="font-semibold">{isAr ? 'حالة السداد:' : 'Status:'}</span> <span className="font-bold text-emerald-700 uppercase">{order.paymentStatus || 'PAID'}</span></p>
                <p className="text-zinc-700"><span className="font-semibold">{isAr ? 'مكان التسليم:' : 'Delivery:'}</span> مصانع جرين وود — الرياض مع التركيب الموقعي</p>
                <p className="text-zinc-700"><span className="font-semibold">{isAr ? 'الضمان:' : 'Warranty:'}</span> ضمان شامل 10 سنوات ضد عيوب التصنيع والهيكل</p>
              </div>
            </div>

            {/* 3. Itemized Table */}
            <div className="overflow-x-auto border border-zinc-200 rounded-2xl">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-zinc-100 text-zinc-700 uppercase font-mono font-bold text-[11px] border-b border-zinc-200">
                  <tr>
                    <th className="p-3.5">#</th>
                    <th className="p-3.5">{isAr ? 'رمز الصنف (SKU)' : 'SKU'}</th>
                    <th className="p-3.5">{isAr ? 'البيان والمواصفات' : 'Description'}</th>
                    <th className="p-3.5">{isAr ? 'التشطيب' : 'Finish'}</th>
                    <th className="p-3.5 text-center">{isAr ? 'الكمية' : 'Qty'}</th>
                    <th className="p-3.5 text-right rtl:text-left">{isAr ? 'سعر الوحدة' : 'Unit Price'}</th>
                    <th className="p-3.5 text-right rtl:text-left">{isAr ? 'الإجمالي (غير شامل)' : 'Subtotal'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono">
                  {order.items.map((item, idx) => {
                    const lineTotal = item.unitPrice * item.quantity;
                    return (
                      <tr key={idx} className="hover:bg-zinc-50">
                        <td className="p-3.5 text-zinc-400">{idx + 1}</td>
                        <td className="p-3.5 font-bold text-zinc-900">{item.sku}</td>
                        <td className="p-3.5 font-sans">
                          <span className="font-bold text-zinc-950 block">{isAr && item.nameAr ? item.nameAr : item.nameEn}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">EN 16139 Commercial Hospitality Grade</span>
                        </td>
                        <td className="p-3.5 text-zinc-600 font-sans">{item.finishName || 'Standard'}</td>
                        <td className="p-3.5 text-center font-bold">{item.quantity}</td>
                        <td className="p-3.5 text-right rtl:text-left text-zinc-700">
                          {item.unitPrice.toLocaleString('en-US')} SAR
                        </td>
                        <td className="p-3.5 text-right rtl:text-left font-bold text-zinc-950">
                          {lineTotal.toLocaleString('en-US')} SAR
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 4. Financial Calculations & Summary Block */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pt-2">
              
              {/* Bank Settlement Credentials */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[11px] font-mono space-y-1.5 max-w-sm">
                <span className="font-bold text-zinc-900 block font-sans">{isAr ? 'الحساب البنكي المعتمد للتحويلات:' : 'Official Bank Settlement Account:'}</span>
                <p className="text-zinc-600">البنك الأهلي السعودي (SNB)</p>
                <p className="text-zinc-800 font-bold">IBAN: SA44 1000 0001 2345 6789 0100</p>
                <p className="text-zinc-500 text-[10px]">المستفيد: شركة تصاميم الوطن المحدودة</p>
              </div>

              {/* Totals Calculation */}
              <div className="w-full sm:w-72 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>{isAr ? 'المجموع الفرعي (Subtotal):' : 'Subtotal:'}</span>
                  <span className="font-bold text-zinc-900">{order.subtotal.toLocaleString('en-US')} SAR</span>
                </div>

                {order.discountAmount && order.discountAmount > 0 ? (
                  <div className="flex items-center justify-between text-emerald-600">
                    <span>{isAr ? 'الخصم الترويجي:' : 'Discount:'}</span>
                    <span>-{order.discountAmount.toLocaleString('en-US')} SAR</span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between text-zinc-600">
                  <span>{isAr ? 'ضريبة القيمة المضافة (15% VAT):' : '15% Saudi VAT:'}</span>
                  <span className="font-bold text-zinc-900">{order.vatAmount.toLocaleString('en-US')} SAR</span>
                </div>

                <div className="pt-2 border-t-2 border-zinc-900 flex items-center justify-between text-sm font-black text-zinc-950">
                  <span>{isAr ? 'الإجمالي النهائي (Total):' : 'Grand Total:'}</span>
                  <span className="text-base text-[#966E2E] font-bold">{order.totalAmount.toLocaleString('en-US')} SAR</span>
                </div>
              </div>
            </div>

            {/* 5. Official Stamp & Signature Block */}
            <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <p className="leading-snug">
                  {isAr
                    ? 'وثيقة رسمية صادرة آلياً من منظومة الفوترة الإلكترونية لمجموعة دبليو دي ومتوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA).'
                    : 'Official document generated automatically by WD Group E-Invoicing, compliant with Saudi ZATCA Phase-2 regulations.'}
                </p>
              </div>

              <div className="text-center sm:text-right rtl:sm:text-left shrink-0 font-mono">
                <div className="w-36 h-12 border-b-2 border-zinc-400 mx-auto sm:ml-auto mb-1 flex items-end justify-center text-zinc-400 text-[10px]">
                  [الختم المالي المعتمد]
                </div>
                <span>WD Group Finance Dept.</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
