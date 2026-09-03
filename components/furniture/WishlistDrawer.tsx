'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import { FURNITURE_CATALOG, FurnitureItem } from '@/lib/furnitureData';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  FolderPlus, 
  Folder, 
  Printer, 
  ArrowRight, 
  Sparkles,
  Layers,
  Ruler
} from 'lucide-react';

interface WishlistDrawerProps {
  onAddToCart: (product: FurnitureItem, finishId: string, quantity: number) => void;
}

export default function WishlistDrawer({ onAddToCart }: WishlistDrawerProps) {
  const { lang, dict } = useLanguage();
  const isAr = lang === 'ar';
  const { 
    wishlistIds, 
    projects, 
    toggleWishlist, 
    createProject, 
    deleteProject, 
    isWishlistDrawerOpen, 
    setIsWishlistDrawerOpen,
    clearWishlist 
  } = useWishlist();

  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Filter items based on activeTab
  const savedProducts: FurnitureItem[] = FURNITURE_CATALOG.filter((item) => {
    if (activeTab === 'all') {
      return wishlistIds.includes(item.id);
    } else {
      const activeProj = projects.find((p) => p.id === activeTab);
      return activeProj ? activeProj.itemIds.includes(item.id) : false;
    }
  });

  const totalValue = savedProducts.reduce((sum, item) => sum + item.price, 0);

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const newId = createProject(newProjectName.trim());
    setActiveTab(newId);
    setNewProjectName('');
    setIsCreatingProject(false);
  };

  const handleMoveAllToCart = () => {
    savedProducts.forEach((prod) => {
      onAddToCart(prod, prod.finishes[0].id, 1);
    });
    setIsWishlistDrawerOpen(false);
  };

  return (
    <AnimatePresence>
      {isWishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistDrawerOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
            <motion.div
              initial={{ x: isAr ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#0F1117] border-l rtl:border-l-0 rtl:border-r border-white/10 text-white shadow-2xl flex flex-col justify-between"
            >
              
              {/* 1. Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
                    <Heart className="w-5 h-5 fill-[#C9A86A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {dict.furniture.wishlist.title}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      {savedProducts.length} {isAr ? 'قطع محفوظة' : 'saved items'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsWishlistDrawerOpen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Project Moodboard Tabs */}
              <div className="px-6 pt-4 pb-2 border-b border-white/5 space-y-2">
                <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                      activeTab === 'all'
                        ? 'bg-[#C9A86A] text-[#08090C] font-bold shadow-sm'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {dict.furniture.wishlist.all_saved} ({wishlistIds.length})
                  </button>

                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveTab(proj.id)}
                      className={`px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5 transition-all ${
                        activeTab === proj.id
                          ? 'bg-[#C9A86A] text-[#08090C] font-bold shadow-sm'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Folder className="w-3 h-3" />
                      <span>{proj.name}</span>
                      <span className="text-[10px] opacity-75">({proj.itemIds.length})</span>
                    </button>
                  ))}

                  <button
                    onClick={() => setIsCreatingProject(!isCreatingProject)}
                    className="px-2.5 py-1.5 rounded-lg border border-dashed border-white/20 text-zinc-400 hover:text-[#C9A86A] hover:border-[#C9A86A]/40 shrink-0 flex items-center gap-1"
                  >
                    <FolderPlus className="w-3 h-3" />
                    <span>{dict.furniture.wishlist.create_project}</span>
                  </button>
                </div>

                {/* Inline New Project Form */}
                {isCreatingProject && (
                  <form onSubmit={handleCreateProjectSubmit} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder={dict.furniture.wishlist.project_name_placeholder}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#141721] border border-white/15 text-xs text-white focus:outline-none focus:border-[#C9A86A]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#C9A86A] text-[#08090C] text-xs font-bold font-mono"
                    >
                      {isAr ? 'حفظ' : 'Save'}
                    </button>
                  </form>
                )}
              </div>

              {/* 3. Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {savedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                      <Heart className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">
                        {dict.furniture.wishlist.empty_title}
                      </h4>
                      <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                        {dict.furniture.wishlist.empty_desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  savedProducts.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex gap-3.5 items-center group relative hover:border-[#C9A86A]/30 transition-all"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
                        <Image
                          src={item.images[0]}
                          alt={isAr ? item.nameAr : item.nameEn}
                          fill
                          sizes="80px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#C9A86A]">
                            {item.sku}
                          </span>
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 className="text-xs font-bold text-white truncate">
                          {isAr ? item.nameAr : item.nameEn}
                        </h4>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-extrabold text-[#E3C58A] font-mono">
                            {item.price.toLocaleString('en-US')} {dict.furniture.card.sar}
                          </span>

                          <button
                            onClick={() => onAddToCart(item, item.finishes[0].id, 1)}
                            className="px-2.5 py-1 rounded-lg bg-[#C9A86A]/15 hover:bg-[#C9A86A] text-[#C9A86A] hover:text-[#08090C] border border-[#C9A86A]/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>{isAr ? 'أضف' : 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* 4. Footer & Actions */}
              {savedProducts.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#141721] space-y-4">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-zinc-400">{dict.furniture.wishlist.total_value}</span>
                    <span className="text-lg font-extrabold text-[#C9A86A] font-mono">
                      {totalValue.toLocaleString('en-US')} {dict.furniture.card.sar}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleMoveAllToCart}
                      className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-[#08090C] bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_25px_rgba(201,168,106,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{dict.furniture.wishlist.move_all_to_cart}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#C9A86A]" />
                      <span>{dict.furniture.wishlist.export_pdf}</span>
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
