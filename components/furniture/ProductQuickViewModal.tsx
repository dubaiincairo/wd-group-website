'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FurnitureItem } from '@/lib/furnitureData';
import { 
  X, 
  Check, 
  ShoppingBag, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  Clock, 
  Factory, 
  Sparkles, 
  Ruler,
  Layers,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';

interface ProductQuickViewModalProps {
  product: FurnitureItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: FurnitureItem, selectedFinish: string, quantity: number) => void;
}

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewModalProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [downloadingSpecs, setDownloadingSpecs] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIdx(0);
      setSelectedFinish(product.finishes[0]?.id || '');
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [product]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedFinish, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleDownloadSpecs = () => {
    setDownloadingSpecs(true);
    setTimeout(() => {
      setDownloadingSpecs(false);
      // Trigger a clean spec sheet alert
      const msg = isAr 
        ? `تم تنزيل كتالوج المواصفات الفنية لمنتج: ${product.nameAr}`
        : `Downloaded technical specification sheet for: ${product.nameEn}`;
      alert(msg);
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود الاستفسار وطلب تسعير لقطعة أثاث جرين وود: ${product.nameAr} (${product.sku}) - الكمية: ${quantity} - التشطيب: ${selectedFinish || 'افتراضي'}.`
      : `Hello WD Group, I would like to inquire about and request a quote for GreenWood Furniture: ${product.nameEn} (${product.sku}) - Quantity: ${quantity} - Finish: ${selectedFinish || 'Default'}.`
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0F1117] border border-[#C9A86A]/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-white flex flex-col max-h-[92vh]"
        >
          {/* Top Bar / Close Button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141721]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#C9A86A]/15 text-[#C9A86A] text-[11px] font-mono font-bold border border-[#C9A86A]/30">
                {product.sku}
              </span>
              <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
                {isAr ? product.categoryAr : product.categoryEn}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={dict.furniture.modal.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 overflow-y-auto">
            
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 bg-black/50 group">
                <Image
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={isAr ? product.nameAr : product.nameEn}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  unoptimized
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#0B5C3D]/90 text-[#34D399] border border-[#34D399]/40 text-[10px] font-bold shadow-lg backdrop-blur-md">
                    {dict.furniture.card.made_in_saudi}
                  </span>
                  {product.badgeEn && (
                    <span className="px-2.5 py-1 rounded-full bg-[#C9A86A]/90 text-[#08090C] font-extrabold text-[10px] shadow-lg backdrop-blur-md">
                      {isAr ? product.badgeAr : product.badgeEn}
                    </span>
                  )}
                </div>

                {/* Gallery Navigation Arrows */}
                {product.images.length > 1 && (
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white pointer-events-auto backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                      }}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white pointer-events-auto backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative h-16 w-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIdx === idx 
                          ? 'border-[#C9A86A] scale-105 shadow-[0_0_15px_rgba(201,168,106,0.3)]' 
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-[#C9A86A] shrink-0" />
                  <span>{dict.furniture.hero.stats.warranty}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-300">
                  <Factory className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{isAr ? product.factoryLocationAr : product.factoryLocationEn}</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="space-y-5 flex flex-col justify-between">
              <div>
                {/* Title & Rating */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-amber-400">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-bold text-zinc-200">{product.rating}</span>
                    <span className="text-zinc-500">({product.reviewsCount} {isAr ? 'تقييم موثق' : 'reviews'})</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                    {isAr ? product.nameAr : product.nameEn}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {isAr ? product.fullDescAr : product.fullDescEn}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-[#C9A86A]/20 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 block font-mono">
                      {isAr ? 'السعر يشمل الضريبة والتوصيل' : 'Price includes 15% VAT & Delivery'}
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#C9A86A] font-mono">
                        {product.price.toLocaleString('en-US')}
                      </span>
                      <span className="text-xs font-bold text-[#E3C58A] uppercase">
                        {dict.furniture.card.sar}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs font-mono text-zinc-500 line-through ml-2">
                          {product.originalPrice.toLocaleString('en-US')} {dict.furniture.card.sar}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right rtl:text-left text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <Clock className="w-3 h-3 inline mr-1 rtl:mr-0 rtl:ml-1" />
                    {isAr ? product.leadTimeAr : product.leadTimeEn}
                  </div>
                </div>

                {/* Material & Dimension Specs */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-zinc-300">
                    <Layers className="w-3.5 h-3.5 text-[#C9A86A] shrink-0 mt-0.5" />
                    <span className="font-semibold text-zinc-200">{dict.furniture.modal.material}:</span>
                    <span className="text-zinc-400">{isAr ? product.materialsAr : product.materialsEn}</span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-300">
                    <Ruler className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                    <span className="font-semibold text-zinc-200">{dict.furniture.modal.dimensions}:</span>
                    <span className="text-zinc-400 font-mono" dir="ltr">
                      {product.dimensions.width}W × {product.dimensions.depth}D × {product.dimensions.height}H {product.dimensions.unit}
                    </span>
                  </div>
                </div>

                {/* Finish & Swatch Selector */}
                {product.finishes.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider font-mono">
                      {dict.furniture.modal.finishes}
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.finishes.map((finish) => {
                        const isSelected = selectedFinish === finish.id;
                        return (
                          <button
                            key={finish.id}
                            onClick={() => setSelectedFinish(finish.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all border ${
                              isSelected
                                ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white shadow-[0_0_12px_rgba(201,168,106,0.3)]'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                              style={{ backgroundColor: finish.colorCode }}
                            />
                            <span className="font-medium">{isAr ? finish.nameAr : finish.nameEn}</span>
                            {isSelected && <Check className="w-3 h-3 text-[#C9A86A]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Key Features List */}
                <div className="mt-5 space-y-1.5">
                  {(isAr ? product.featuresAr : product.featuresEn).slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1 shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-bold text-base"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-bold text-base"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart / RFQ Primary CTA */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] hover:shadow-[0_0_25px_rgba(201,168,106,0.45)] hover:scale-[1.01]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{dict.furniture.card.in_cart}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{dict.furniture.modal.request_quote}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Secondary Actions (WhatsApp Direct Order + Spec Sheet) */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`https://wa.me/966505725070?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{dict.furniture.modal.whatsapp_order}</span>
                  </a>

                  <button
                    onClick={handleDownloadSpecs}
                    disabled={downloadingSpecs}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>{downloadingSpecs ? (isAr ? 'جارٍ التنزيل…' : 'Downloading…') : dict.furniture.modal.specs_sheet}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
