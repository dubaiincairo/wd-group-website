'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { FURNITURE_CATALOG, FurnitureItem } from '@/lib/furnitureData';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Layers, 
  Sparkles, 
  Check, 
  X, 
  ExternalLink, 
  FileSpreadsheet, 
  Globe, 
  Factory, 
  ShieldCheck,
  Eye
} from 'lucide-react';

interface ProductsTabProps {
  products: FurnitureItem[];
  onAddProduct: (item: FurnitureItem) => void;
  onUpdateProduct: (item: FurnitureItem) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsTab({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductsTabProps) {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FurnitureItem | null>(null);

  // Form State
  const [formSku, setFormSku] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formNameAr, setFormNameAr] = useState('');
  const [formCategoryEn, setFormCategoryEn] = useState('Living Room');
  const [formCategoryAr, setFormCategoryAr] = useState('غرف المعيشة');
  const [formPrice, setFormPrice] = useState(15000);
  const [formOriginalPrice, setFormOriginalPrice] = useState(18000);
  const [formLeadTimeEn, setFormLeadTimeEn] = useState('10-14 days');
  const [formLeadTimeAr, setFormLeadTimeAr] = useState('10-14 يوم');
  const [formInStock, setFormInStock] = useState(true);
  const [formHospitalityGrade, setFormHospitalityGrade] = useState(true);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formWidth, setFormWidth] = useState(240);
  const [formDepth, setFormDepth] = useState(105);
  const [formHeight, setFormHeight] = useState(82);

  // SEO Fields
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDescription, setFormSeoDescription] = useState('');
  const [formFocusKeyword, setFormFocusKeyword] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameAr.includes(searchQuery) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || p.categoryEn === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormSku(`GW-${Math.floor(100 + Math.random() * 900)}`);
    setFormNameEn('');
    setFormNameAr('');
    setFormCategoryEn('Living Room');
    setFormCategoryAr('غرف المعيشة');
    setFormPrice(16500);
    setFormOriginalPrice(19000);
    setFormLeadTimeEn('10-14 days');
    setFormLeadTimeAr('10-14 يوم');
    setFormInStock(true);
    setFormHospitalityGrade(true);
    setFormImageUrl('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80');
    setFormWidth(220);
    setFormDepth(95);
    setFormHeight(80);
    setFormSeoTitle('');
    setFormSeoDescription('');
    setFormFocusKeyword('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FurnitureItem) => {
    setEditingItem(item);
    setFormSku(item.sku);
    setFormNameEn(item.nameEn);
    setFormNameAr(item.nameAr);
    setFormCategoryEn(item.categoryEn);
    setFormCategoryAr(item.categoryAr);
    setFormPrice(item.price);
    setFormOriginalPrice(item.originalPrice || item.price * 1.15);
    setFormLeadTimeEn(item.leadTimeEn);
    setFormLeadTimeAr(item.leadTimeAr);
    setFormInStock(item.inStock);
    setFormHospitalityGrade(item.isHospitalityGrade);
    setFormImageUrl(item.images[0] || '');
    setFormWidth(item.dimensions.width);
    setFormDepth(item.dimensions.depth);
    setFormHeight(item.dimensions.height);
    setFormSeoTitle(`${item.nameEn} | WD Group GreenWood Luxury Furniture`);
    setFormSeoDescription(item.shortDescEn);
    setFormFocusKeyword(item.categoryEn);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameEn.trim() || !formNameAr.trim()) {
      showToast(isAr ? 'يرجى إدخال اسم القطعة بالعربية والإنجليزية' : 'Please enter product name in EN & AR', 'error');
      return;
    }

    const payload: FurnitureItem = {
      id: editingItem ? editingItem.id : `gw-${Date.now()}`,
      sku: formSku.trim(),
      nameEn: formNameEn.trim(),
      nameAr: formNameAr.trim(),
      category: 'living',
      categoryEn: formCategoryEn,
      categoryAr: formCategoryAr,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      rating: editingItem?.rating || 4.9,
      reviewsCount: editingItem?.reviewsCount || 14,
      shortDescEn: formSeoDescription || 'Handcrafted luxury piece engineered with solid American walnut and premium finishes.',
      shortDescAr: 'قطعة أثاث فاخرة مصنعة بحرفية عالية من خشب الجوز الأمريكي الطبيعي بأعلى المعايير.',
      fullDescEn: formSeoDescription || 'Handcrafted luxury piece engineered with solid American walnut and premium finishes.',
      fullDescAr: 'قطعة أثاث فاخرة مصنعة بحرفية عالية من خشب الجوز الأمريكي الطبيعي بأعلى المعايير.',
      materialsEn: 'Solid American Walnut, Premium Finishes',
      materialsAr: 'خشب جوز أمريكي طبيعي، تشطيبات فاخرة',
      materialKey: 'walnut',
      leadTimeEn: formLeadTimeEn,
      leadTimeAr: formLeadTimeAr,
      inStock: formInStock,
      isHospitalityGrade: formHospitalityGrade,
      dimensions: {
        width: Number(formWidth),
        depth: Number(formDepth),
        height: Number(formHeight),
        unit: 'cm',
      },
      finishes: editingItem?.finishes || [
        { id: 'f1', nameEn: 'Natural Walnut', nameAr: 'جوز طبيعي', colorCode: '#5C4033' },
        { id: 'f2', nameEn: 'Ivory Bouclé', nameAr: 'بوكليه عاجي', colorCode: '#F5F5DC' }
      ],
      featuresEn: editingItem?.featuresEn || ['5-Axis CNC Precision', 'Non-Yellowing Lacquer', '5-Year Warranty'],
      featuresAr: editingItem?.featuresAr || ['دقة متناهية بـ CNC', 'دهان مقاوم للاصفرار', 'ضمان 5 سنوات'],
      images: [formImageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
      factoryLocationEn: 'Factory 1 & 3 — Riyadh Hub',
      factoryLocationAr: 'مصنع 1 و 3 — الرياض',
    };

    if (editingItem) {
      onUpdateProduct(payload);
      showToast(isAr ? 'تم تحديث بيانات المنتج بنجاح' : 'Product updated successfully', 'success');
    } else {
      onAddProduct(payload);
      showToast(isAr ? 'تمت إضافة القطعة الجديدة للكتالوج' : 'New piece added to catalog', 'success');
    }

    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['SKU,Name (EN),Name (AR),Category,Price (SAR),In Stock,Hospitality Grade,Lead Time'];
    const rows = products.map((p) =>
      `"${p.sku}","${p.nameEn}","${p.nameAr}","${p.categoryEn}",${p.price},${p.inStock},${p.isHospitalityGrade},"${p.leadTimeEn}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `greenwood-catalog-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(isAr ? 'تم تصدير كتالوج المنتجات' : 'Exported product catalog as CSV', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C9A86A]" />
            <span>{isAr ? 'كتالوج ومخزون الأثاث الفاخر (CRUD)' : 'Furniture Catalog & Product Management'}</span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'إضافة وتعديل القطع والأسعار والأبعاد وحالة التوفر بالمصنع.' : 'Manage SKUs, retail pricing, finishes, dimensions, and SEO fields.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer font-mono"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>{isAr ? 'تصدير الكتالوج CSV' : 'Export CSV'}</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة قطعة جديدة' : 'Add New Piece'}</span>
          </button>
        </div>
      </div>

      {/* 2. Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث بالاسم أو الكود (SKU)...' : 'Search by name or SKU...'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C9A86A]"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
        >
          <option value="all">{isAr ? 'كافة الأقسام والتصنيفات' : 'All Categories'}</option>
          <option value="Living Room">{isAr ? 'غرف المعيشة والصوالين' : 'Living Room'}</option>
          <option value="Hospitality & Bedroom">{isAr ? 'الأجنحة الفندقية وغرف النوم' : 'Hospitality & Bedroom'}</option>
          <option value="Dining Room">{isAr ? 'غرف الطعام والضيافة' : 'Dining Room'}</option>
          <option value="Architectural Joinery">{isAr ? 'التجاليد والكونسول' : 'Architectural Joinery'}</option>
          <option value="Executive Offices">{isAr ? 'المكاتب التنفيذية وقاعات الاجتماعات' : 'Executive Offices'}</option>
          <option value="Decor & Partitions">{isAr ? 'القواطع والفواصل المعمارية' : 'Decor & Partitions'}</option>
        </select>
      </div>

      {/* 3. Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-4 flex flex-col justify-between group hover:border-[#C9A86A]/40 transition-all shadow-lg"
          >
            <div className="space-y-3">
              {/* Product Thumbnail */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src={item.images[0]}
                  alt={item.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                    item.inStock ? 'bg-emerald-500/90 text-[#08090C]' : 'bg-amber-500/90 text-[#08090C]'
                  }`}>
                    {item.inStock ? 'In Stock' : 'Made to Order'}
                  </span>
                  {item.isHospitalityGrade && (
                    <span className="px-2 py-0.5 rounded bg-blue-600/90 text-white text-[9px] font-mono font-bold">
                      FF&E Certified
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 right-2.5 rtl:right-auto rtl:left-2.5 px-2 py-0.5 rounded bg-[#08090C]/80 backdrop-blur-md text-[10px] font-mono text-[#C9A86A] font-bold">
                  {item.sku}
                </div>
              </div>

              {/* Title & Category */}
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">{item.categoryEn}</span>
                <h4 className="text-sm font-bold text-white group-hover:text-[#C9A86A] transition-colors line-clamp-1">
                  {isAr ? item.nameAr : item.nameEn}
                </h4>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                  {isAr ? item.shortDescAr : item.shortDescEn}
                </p>
              </div>

              {/* Dimensions & Lead Time Meta */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#141721] text-[10px] font-mono border border-white/5">
                <div>
                  <span className="text-zinc-500 block uppercase">Dimensions:</span>
                  <span className="text-white font-bold">{item.dimensions.width}×{item.dimensions.depth}×{item.dimensions.height} cm</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase">Lead Time:</span>
                  <span className="text-emerald-400 font-bold">{item.leadTimeEn}</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-extrabold text-[#E3C58A] block">
                  {item.price.toLocaleString('en-US')} SAR
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-[10px] text-zinc-500 line-through font-mono">
                    {item.originalPrice.toLocaleString('en-US')} SAR
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-[#C9A86A] text-zinc-400 hover:text-[#08090C] transition-colors cursor-pointer"
                  title="Edit Product"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(isAr ? 'هل أنت متأكد من حذف هذه القطعة من الكتالوج؟' : 'Are you sure you want to delete this piece?')) {
                      onDeleteProduct(item.id);
                      showToast(isAr ? 'تم حذف القطعة' : 'Product deleted', 'success');
                    }
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-rose-500 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 4. ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0F1117] border border-[#C9A86A]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  {editingItem 
                    ? (isAr ? `تعديل قطعة الأثاث: ${editingItem.sku}` : `Edit Furniture Piece: ${editingItem.sku}`)
                    : (isAr ? 'إضافة قطعة أثاث جديدة للكتالوج' : 'Add New Furniture Piece to Catalog')}
                </h3>
                <p className="text-xs text-zinc-400">GreenWood Manufacturing & Showroom specifications</p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              {/* Row 1: SKU & Names */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">SKU Code</label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">English Name</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    required
                    placeholder="e.g. Al-Diriyah Curved Sofa"
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">الاسم بالعربية</label>
                  <input
                    type="text"
                    value={formNameAr}
                    onChange={(e) => setFormNameAr(e.target.value)}
                    required
                    placeholder="مثال: أريكة الدرعية المنحنية"
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white rtl:text-right"
                  />
                </div>
              </div>

              {/* Row 2: Category & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Category</label>
                  <select
                    value={formCategoryEn}
                    onChange={(e) => {
                      setFormCategoryEn(e.target.value);
                      if (e.target.value === 'Living Room') setFormCategoryAr('غرف المعيشة');
                      if (e.target.value === 'Hospitality & Bedroom') setFormCategoryAr('الأجنحة الفندقية');
                      if (e.target.value === 'Dining Room') setFormCategoryAr('غرف الطعام');
                      if (e.target.value === 'Architectural Joinery') setFormCategoryAr('التجاليد والكونسول');
                      if (e.target.value === 'Executive Offices') setFormCategoryAr('المكاتب التنفيذية');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white"
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Hospitality & Bedroom">Hospitality & Bedroom</option>
                    <option value="Dining Room">Dining Room</option>
                    <option value="Architectural Joinery">Architectural Joinery</option>
                    <option value="Executive Offices">Executive Offices</option>
                    <option value="Decor & Partitions">Decor & Partitions</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Retail Price (SAR)</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono text-emerald-400 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Compare Price (SAR)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono text-zinc-400"
                  />
                </div>
              </div>

              {/* Row 3: Dimensions & Image */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Width (cm)</label>
                  <input
                    type="number"
                    value={formWidth}
                    onChange={(e) => setFormWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Depth (cm)</label>
                  <input
                    type="number"
                    value={formDepth}
                    onChange={(e) => setFormDepth(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Height (cm)</label>
                  <input
                    type="number"
                    value={formHeight}
                    onChange={(e) => setFormHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-400 font-mono">Lead Time</label>
                  <input
                    type="text"
                    value={formLeadTimeEn}
                    onChange={(e) => setFormLeadTimeEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-zinc-400 font-mono">Photo URL (Unsplash or Supabase Storage)</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono"
                />
              </div>

              {/* SEO Fields Section */}
              <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
                <span className="text-[11px] font-mono text-[#C9A86A] font-bold block flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>SEO & Search Engine Metadata</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formSeoTitle}
                    onChange={(e) => setFormSeoTitle(e.target.value)}
                    placeholder="SEO Page Title"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={formFocusKeyword}
                    onChange={(e) => setFormFocusKeyword(e.target.value)}
                    placeholder="Focus Keyword (e.g. Modern Saudi Sofa)"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-300">In Stock Ready for White-Glove</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHospitalityGrade}
                    onChange={(e) => setFormHospitalityGrade(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C9A86A]"
                  />
                  <span className="text-zinc-300">Hotel FF&E Certified</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBA73] text-[#08090C] font-extrabold text-xs shadow-lg cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
