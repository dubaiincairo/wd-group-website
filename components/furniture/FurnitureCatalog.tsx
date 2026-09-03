'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import { FurnitureItem, FURNITURE_CATALOG } from '@/lib/furnitureData';
import { 
  Search, 
  SlidersHorizontal, 
  Eye, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Check, 
  X, 
  LayoutGrid, 
  List, 
  ShieldCheck, 
  Layers, 
  Clock,
  RotateCcw,
  Building2,
  ChevronDown,
  Heart
} from 'lucide-react';

interface FurnitureCatalogProps {
  onQuickView: (product: FurnitureItem) => void;
  onAddToCart: (product: FurnitureItem, selectedFinish: string, quantity: number) => void;
}

export default function FurnitureCatalog({ onQuickView, onAddToCart }: FurnitureCatalogProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});

  const categories = useMemo(() => [
    { id: 'all', label: dict.furniture.filters.categories.all, count: FURNITURE_CATALOG.length },
    { id: 'living', label: dict.furniture.filters.categories.living, count: FURNITURE_CATALOG.filter(i => i.category === 'living').length },
    { id: 'bedroom', label: dict.furniture.filters.categories.bedroom, count: FURNITURE_CATALOG.filter(i => i.category === 'bedroom').length },
    { id: 'dining', label: dict.furniture.filters.categories.dining, count: FURNITURE_CATALOG.filter(i => i.category === 'dining').length },
    { id: 'joinery', label: dict.furniture.filters.categories.joinery, count: FURNITURE_CATALOG.filter(i => i.category === 'joinery').length },
    { id: 'decor', label: dict.furniture.filters.categories.decor, count: FURNITURE_CATALOG.filter(i => i.category === 'decor').length },
  ], [dict]);

  const materials = useMemo(() => [
    { id: 'all', label: dict.furniture.filters.materials.all },
    { id: 'walnut', label: dict.furniture.filters.materials.walnut },
    { id: 'leather', label: dict.furniture.filters.materials.leather },
    { id: 'brass', label: dict.furniture.filters.materials.brass },
    { id: 'boucle', label: dict.furniture.filters.materials.boucle },
    { id: 'marble', label: dict.furniture.filters.materials.marble },
  ], [dict]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return FURNITURE_CATALOG.filter((item) => {
      // Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Material Filter
      if (selectedMaterial !== 'all' && item.materialKey !== selectedMaterial) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.nameEn.toLowerCase().includes(q) || item.nameAr.toLowerCase().includes(q);
        const matchSku = item.sku.toLowerCase().includes(q);
        const matchDesc = item.shortDescEn.toLowerCase().includes(q) || item.shortDescAr.toLowerCase().includes(q);
        const matchMat = item.materialsEn.toLowerCase().includes(q) || item.materialsAr.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchDesc && !matchMat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price_asc') return a.price - b.price;
      if (selectedSort === 'price_desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return b.reviewsCount - a.reviewsCount;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, selectedMaterial, selectedSort]);

  const handleItemAddToCart = (item: FurnitureItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, item.finishes[0]?.id || '', 1);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedMaterial !== 'all' || selectedSort !== 'featured';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedSort('featured');
  };

  return (
    <div className="space-y-8" id="catalog">
      
      {/* 1. Filter & Search Controls Header Bar */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5 bg-[#0F1117]/85 backdrop-blur-xl shadow-xl">
        
        {/* Search Bar + Sort Dropdown + View Mode */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.furniture.filters.search_placeholder}
              className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C9A86A] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Tools (Sort & View Toggle) */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Sort Select */}
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-3.5 pr-8 rtl:pl-8 rtl:pr-3.5 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-zinc-300 text-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer font-medium"
              >
                <option value="featured">{dict.furniture.filters.sort.featured}</option>
                <option value="price_asc">{dict.furniture.filters.sort.price_asc}</option>
                <option value="price_desc">{dict.furniture.filters.sort.price_desc}</option>
                <option value="rating">{dict.furniture.filters.sort.rating}</option>
                <option value="newest">{dict.furniture.filters.sort.newest}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none absolute right-2.5 rtl:right-auto rtl:left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* View Mode Toggle (Grid / List) */}
            <div className="flex items-center rounded-2xl bg-black/40 border border-white/10 p-1 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-[#C9A86A]/20 text-[#C9A86A] border border-[#C9A86A]/30' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'list' 
                    ? 'bg-[#C9A86A]/20 text-[#C9A86A] border border-[#C9A86A]/30' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Categories Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] border-[#E3C58A] shadow-[0_0_15px_rgba(201,168,106,0.3)] font-bold'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-[#08090C]/20 text-[#08090C]' : 'bg-white/10 text-zinc-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Material Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 text-xs">
          <span className="text-zinc-500 font-mono text-[11px] uppercase mr-1 rtl:mr-0 rtl:ml-1">
            {isAr ? 'المادة:' : 'Material:'}
          </span>
          {materials.map((mat) => {
            const isSelected = selectedMaterial === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterial(mat.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-zinc-200 border border-transparent'
                }`}
              >
                {mat.label}
              </button>
            );
          })}

          {/* Reset Filters Quick Button */}
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="ml-auto rtl:ml-0 rtl:mr-auto text-[11px] text-[#C9A86A] hover:underline flex items-center gap-1 font-mono"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{dict.furniture.filters.clear_filters}</span>
            </button>
          )}
        </div>

      </div>

      {/* 2. Results Header Status */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-2 font-mono">
        <div>
          <span className="text-white font-bold">{filteredProducts.length}</span> {dict.furniture.filters.results_found}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400">{isAr ? 'مصانع الرياض ونجران جاهزة للتنفيذ' : 'Riyadh & Najran Lines Active'}</span>
        </div>
      </div>

      {/* 3. Products Grid / List */}
      {filteredProducts.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-white/10 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            {isAr ? 'لا توجد قطع مطابقة' : 'No Pieces Found'}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {dict.furniture.filters.no_results}
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 py-2.5 rounded-xl bg-[#C9A86A] text-[#08090C] text-xs font-bold shadow-md hover:bg-[#E3C58A] transition-all"
          >
            {dict.furniture.filters.clear_filters}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item, idx) => {
            const isAdded = addedItemIds[item.id];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                onClick={() => onQuickView(item)}
                className="luxury-card rounded-3xl p-5 border border-white/10 hover:border-[#C9A86A]/50 bg-[#0F1117]/90 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Image Container with Hover Zoom */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-4 bg-black/50 border border-white/10">
                    <Image
                      src={item.images[0]}
                      alt={isAr ? item.nameAr : item.nameEn}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117]/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col gap-1.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0B5C3D]/90 text-[#34D399] border border-[#34D399]/40 text-[10px] font-bold backdrop-blur-md">
                        {dict.furniture.card.made_in_saudi}
                      </span>
                      {item.badgeEn && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C9A86A]/95 text-[#08090C] font-extrabold text-[9px] backdrop-blur-md">
                          {isAr ? item.badgeAr : item.badgeEn}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      className={`absolute top-3 right-3 rtl:right-auto rtl:left-3 p-2 rounded-full backdrop-blur-md border transition-all z-20 cursor-pointer ${
                        isInWishlist(item.id)
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 scale-105 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                          : 'bg-black/60 text-zinc-300 hover:text-rose-400 border-white/15 hover:scale-105'
                      }`}
                      aria-label={dict.furniture.wishlist.add_to_wishlist}
                    >
                      <Heart className={`w-4 h-4 transition-transform ${isInWishlist(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Quick View Hover Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(item);
                      }}
                      className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-[11px] font-semibold border border-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C9A86A]" />
                      <span>{dict.furniture.card.quick_view}</span>
                    </button>
                  </div>

                  {/* SKU & Category */}
                  <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-zinc-400">
                    <span className="text-[#C9A86A]">{item.sku}</span>
                    <span>{isAr ? item.categoryAr : item.categoryEn}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-[#C9A86A] transition-colors leading-snug mb-2 line-clamp-1">
                    {isAr ? item.nameAr : item.nameEn}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {isAr ? item.shortDescAr : item.shortDescEn}
                  </p>

                  {/* Finishes Swatch Previews */}
                  {item.finishes.length > 0 && (
                    <div className="flex items-center gap-1.5 mb-4">
                      {item.finishes.map((f) => (
                        <span
                          key={f.id}
                          className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: f.colorCode }}
                          title={isAr ? f.nameAr : f.nameEn}
                        />
                      ))}
                      <span className="text-[10px] text-zinc-500 ml-1 rtl:ml-0 rtl:mr-1">
                        {item.finishes.length} {isAr ? 'خيارات' : 'finishes'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Price & Add to Cart Button */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      {isAr ? 'شامل الضريبة' : 'Inc. 15% VAT'}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-extrabold text-[#C9A86A] font-mono">
                        {item.price.toLocaleString('en-US')}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-400 uppercase">
                        {dict.furniture.card.sar}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleItemAddToCart(item, e)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-[#C9A86A] text-white hover:text-[#08090C] border border-white/10 hover:border-[#C9A86A]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{dict.furniture.card.in_cart}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{dict.furniture.card.add_to_quote}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Detailed List View */
        <div className="space-y-4">
          {filteredProducts.map((item, idx) => {
            const isAdded = addedItemIds[item.id];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                onClick={() => onQuickView(item)}
                className="luxury-card rounded-3xl p-5 border border-white/10 hover:border-[#C9A86A]/50 bg-[#0F1117]/90 flex flex-col sm:flex-row gap-5 items-center justify-between group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                  <div className="relative w-full sm:w-44 h-44 sm:h-36 rounded-2xl overflow-hidden shrink-0 bg-black/40 border border-white/10">
                    <Image
                      src={item.images[0]}
                      alt={isAr ? item.nameAr : item.nameEn}
                      fill
                      sizes="176px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-mono text-zinc-400">
                      <span className="text-[#C9A86A]">{item.sku}</span>
                      <span>·</span>
                      <span>{isAr ? item.categoryAr : item.categoryEn}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#C9A86A] transition-colors">
                      {isAr ? item.nameAr : item.nameEn}
                    </h3>

                    <p className="text-xs text-zinc-400 max-w-lg line-clamp-1">
                      {isAr ? item.shortDescAr : item.shortDescEn}
                    </p>

                    <div className="text-[11px] text-zinc-500 flex items-center justify-center sm:justify-start gap-3 pt-1">
                      <span>{item.dimensions.width}W × {item.dimensions.depth}D × {item.dimensions.height}H cm</span>
                      <span>·</span>
                      <span className="text-emerald-400 whitespace-nowrap">{isAr ? item.leadTimeAr : item.leadTimeEn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  <div className="text-left sm:text-right rtl:sm:text-left">
                    <span className="text-lg font-extrabold text-[#C9A86A] font-mono">
                      {item.price.toLocaleString('en-US')}
                    </span>
                    <span className="text-xs font-bold text-zinc-400 ml-1 rtl:ml-0 rtl:mr-1 uppercase">
                      {dict.furniture.card.sar}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isInWishlist(item.id)
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-400 border-white/10'
                      }`}
                      aria-label={dict.furniture.wishlist.add_to_wishlist}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => handleItemAddToCart(item, e)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 hover:bg-[#C9A86A] text-white hover:text-[#08090C] border border-white/10 hover:border-[#C9A86A]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{dict.furniture.card.in_cart}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{dict.furniture.card.add_to_quote}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
}
