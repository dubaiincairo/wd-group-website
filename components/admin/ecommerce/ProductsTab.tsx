'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { FurnitureItem } from '@/lib/furnitureData';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Tag, 
  Sparkles, 
  Layers, 
  FileSpreadsheet, 
  X, 
  Check, 
  Globe, 
  DollarSign, 
  Maximize2,
  ChevronDown
} from 'lucide-react';

interface ProductsTabProps {
  products: FurnitureItem[];
  currency: 'SAR' | 'USD';
  onAddProduct: (product: FurnitureItem) => void;
  onUpdateProduct: (product: FurnitureItem) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function ProductsTab({
  products,
  currency,
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
  const [formCategoryEn, setFormCategoryEn] = useState('Living & Lounge');
  const [formCategoryAr, setFormCategoryAr] = useState('الصالونات وغرف المعيشة');
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

  const formatPrice = (valSAR: number) => {
    if (currency === 'USD') {
      const valUSD = Math.round(valSAR / 3.75);
      return `${valUSD.toLocaleString('en-US')} USD`;
    }
    return `${valSAR.toLocaleString('en-US')} ${isAr ? 'ر.س' : 'SAR'}`;
  };

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
    setFormCategoryEn('Living & Lounge');
    setFormCategoryAr('الصالونات وغرف المعيشة');
    setFormPrice(16500);
    setFormOriginalPrice(19000);
    setFormLeadTimeEn('10–14 Business Days');
    setFormLeadTimeAr('10 – 14 يوم عمل');
    setFormInStock(true);
    setFormHospitalityGrade(true);
    setFormImageUrl('');
    setFormWidth(240);
    setFormDepth(110);
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
      showToast(isAr ? 'تم تعديل بيانات القطعة بنجاح' : 'Product updated successfully', 'success');
    } else {
      onAddProduct(payload);
      showToast(isAr ? 'تمت إضافة القطعة إلى الكتالوج' : 'New piece added to catalog', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف (${name})؟` : `Delete (${name})?`)) {
      onDeleteProduct(id);
      showToast(isAr ? 'تم حذف القطعة' : 'Product deleted', 'success');
    }
  };

  const handleExportCSV = () => {
    const headers = ['SKU,Name En,Name Ar,Category,Price SAR,In Stock,Hospitality Grade,Lead Time'];
    const rows = products.map((p) =>
      `"${p.sku}","${p.nameEn}","${p.nameAr}","${p.categoryEn}",${p.price},"${p.inStock ? 'Yes' : 'No'}","${p.isHospitalityGrade ? 'Yes' : 'No'}","${p.leadTimeEn}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `greenwood-catalog-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(isAr ? 'تم تصدير الكتالوج بصيغة CSV' : 'Exported catalog as CSV', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C9A86A]" />
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
            placeholder={isAr ? 'بحث باسم القطعة أو كود SKU' : 'Search by name or SKU'}
            className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2.5 rounded-xl bg-[#141721] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#C9A86A]"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 rtl:left-auto rtl:right-3 top-3 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 pr-9 rtl:pr-3.5 rtl:pl-9 rounded-xl bg-[#141721] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
          >
            <option value="all">{isAr ? 'كافة الأقسام والتصنيفات' : 'All Categories'}</option>
            <option value="Living & Lounge">{isAr ? 'الصالونات وغرف المعيشة' : 'Living & Lounge'}</option>
            <option value="Hospitality & Suites">{isAr ? 'الأجنحة والضيافة الفندقية' : 'Hospitality & Suites'}</option>
            <option value="Dining & Banquet">{isAr ? 'غرف الطعام والولائم' : 'Dining & Banquet'}</option>
            <option value="Architectural Joinery">{isAr ? 'التجاليد والكونسول والمكاتب' : 'Architectural Joinery'}</option>
            <option value="Decor & Partitions">{isAr ? 'القواطع والإكسسوارات الفاخرة' : 'Decor & Partitions'}</option>
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 rtl:right-auto rtl:left-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* 3. Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-3xl p-5 border border-white/10 bg-[#0F1117]/90 space-y-4 hover:border-[#C9A86A]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Image & Badges */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                <Image
                  src={item.images[0]}
                  alt={item.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[#C9A86A] text-[10px] font-mono font-bold border border-white/10">
                    {item.sku}
                  </span>
                  {item.isHospitalityGrade && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/80 backdrop-blur-md text-white text-[9px] font-mono font-bold">
                      {isAr ? 'معتمد فندقياً' : 'Hospitality FF&E'}
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                    item.inStock ? 'bg-emerald-500 text-[#08090C]' : 'bg-rose-500 text-white'
                  }`}>
                    {item.inStock ? (isAr ? 'متوفر' : 'In Stock') : (isAr ? 'حسب الطلب' : 'Custom')}
                  </span>
                </div>
              </div>

              {/* Title & Category */}
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  {isAr ? item.categoryAr : item.categoryEn}
                </span>
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
                  <span className="text-zinc-500 block uppercase">{isAr ? 'الأبعاد:' : 'Dimensions:'}</span>
                  <span className="text-white font-bold">{item.dimensions.width}×{item.dimensions.depth}×{item.dimensions.height} {isAr ? 'سم' : 'cm'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase">{isAr ? 'مدة التنفيذ:' : 'Lead Time:'}</span>
                  <span className="text-emerald-400 font-bold">{isAr ? item.leadTimeAr : item.leadTimeEn}</span>
                </div>
              </div>
            </div>

            {/* Price & CRUD Action Buttons */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-sm font-extrabold text-[#C9A86A] font-mono block">
                  {formatPrice(item.price)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-[10px] text-zinc-500 line-through font-mono">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-[#C9A86A] text-zinc-300 hover:text-[#08090C] transition-colors cursor-pointer"
                  title={isAr ? 'تعديل القطعة' : 'Edit Product'}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, isAr ? item.nameAr : item.nameEn)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title={isAr ? 'حذف القطعة' : 'Delete Product'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 4. Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-2xl bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 z-10 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#C9A86A]" />
                <span>
                  {editingItem
                    ? (isAr ? 'تعديل بيانات قطعة الأثاث' : 'Edit Furniture Piece')
                    : (isAr ? 'إضافة قطعة أثاث جديدة للكتالوج' : 'Add New Furniture Piece')}
                </span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              {/* Row 1: SKU & Names */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{isAr ? 'رمز القطعة SKU *' : 'SKU Code *'}</label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{isAr ? 'الاسم بالإنجليزية *' : 'Name (English) *'}</label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    required
                    placeholder="The Diriyah Sofa"
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{isAr ? 'الاسم بالعربية *' : 'Name (Arabic) *'}</label>
                  <input
                    type="text"
                    value={formNameAr}
                    onChange={(e) => setFormNameAr(e.target.value)}
                    required
                    dir="rtl"
                    placeholder="أريكة الدرعية"
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* Row 2: Category & Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <label className="block text-zinc-400 mb-1">{isAr ? 'القسم / الفئة' : 'Category'}</label>
                  <select
                    value={formCategoryEn}
                    onChange={(e) => {
                      setFormCategoryEn(e.target.value);
                      if (e.target.value === 'Living & Lounge') setFormCategoryAr('الصالونات وغرف المعيشة');
                      if (e.target.value === 'Hospitality & Suites') setFormCategoryAr('الأجنحة والضيافة الفندقية');
                      if (e.target.value === 'Dining & Banquet') setFormCategoryAr('غرف الطعام والولائم');
                      if (e.target.value === 'Architectural Joinery') setFormCategoryAr('التجاليد والكونسول والمكاتب');
                      if (e.target.value === 'Decor & Partitions') setFormCategoryAr('القواطع والإكسسوارات الفاخرة');
                    }}
                    className="w-full appearance-none px-3 py-2 pr-8 rtl:pr-3 rtl:pl-8 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  >
                    <option value="Living & Lounge">{isAr ? 'الصالونات وغرف المعيشة' : 'Living & Lounge'}</option>
                    <option value="Hospitality & Suites">{isAr ? 'الأجنحة والضيافة الفندقية' : 'Hospitality & Suites'}</option>
                    <option value="Dining & Banquet">{isAr ? 'غرف الطعام والولائم' : 'Dining & Banquet'}</option>
                    <option value="Architectural Joinery">{isAr ? 'التجاليد والكونسول والمكاتب' : 'Architectural Joinery'}</option>
                    <option value="Decor & Partitions">{isAr ? 'القواطع والإكسسوارات الفاخرة' : 'Decor & Partitions'}</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 rtl:right-auto rtl:left-3 top-7 pointer-events-none" />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{isAr ? 'سعر البيع (ر.س) *' : 'Retail Price (SAR) *'}</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{isAr ? 'السعر المقارن (ر.س)' : 'Compare Price (SAR)'}</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* Row 3: Dimensions & Lead Time */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div>
                  <label className="block text-zinc-400 mb-1">{isAr ? 'العرض (سم)' : 'Width (cm)'}</label>
                  <input
                    type="number"
                    value={formWidth}
                    onChange={(e) => setFormWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{isAr ? 'العمق (سم)' : 'Depth (cm)'}</label>
                  <input
                    type="number"
                    value={formDepth}
                    onChange={(e) => setFormDepth(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{isAr ? 'الارتفاع (سم)' : 'Height (cm)'}</label>
                  <input
                    type="number"
                    value={formHeight}
                    onChange={(e) => setFormHeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">{isAr ? 'مدة التنفيذ' : 'Lead Time'}</label>
                  <input
                    type="text"
                    value={isAr ? formLeadTimeAr : formLeadTimeEn}
                    onChange={(e) => {
                      if (isAr) {
                        setFormLeadTimeAr(e.target.value);
                      } else {
                        setFormLeadTimeEn(e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-zinc-400 mb-1 font-mono">{isAr ? 'رابط الصورة الرئيسية (HTTPS)' : 'Primary Image URL (HTTPS)'}</label>
                <input
                  type="url"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl bg-[#141721] border border-white/10 text-white font-mono text-xs focus:border-[#C9A86A]"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 p-3 rounded-xl bg-[#141721] border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span>{isAr ? 'متوفر بالمخزون وجاهز للشحن' : 'In Stock & Ready'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHospitalityGrade}
                    onChange={(e) => setFormHospitalityGrade(e.target.checked)}
                    className="rounded text-[#C9A86A]"
                  />
                  <span>{isAr ? 'معتمد للمشاريع الفندقية (FF&E)' : 'Hospitality FF&E Certified'}</span>
                </label>
              </div>

              {/* SEO Meta Fields */}
              <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/10 space-y-3">
                <span className="text-[11px] font-bold text-[#C9A86A] flex items-center gap-1.5 font-mono">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{isAr ? 'بيانات محركات البحث والـ SEO' : 'SEO & Search Engine Metadata'}</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">{isAr ? 'عنوان الصفحة (Title Tag)' : 'SEO Title Tag'}</label>
                    <input
                      type="text"
                      value={formSeoTitle}
                      onChange={(e) => setFormSeoTitle(e.target.value)}
                      placeholder="Product Name | WD Group GreenWood"
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-[#C9A86A]"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">{isAr ? 'الكلمة المفتاحية الرئيسية' : 'Focus Keyword'}</label>
                    <input
                      type="text"
                      value={formFocusKeyword}
                      onChange={(e) => setFormFocusKeyword(e.target.value)}
                      placeholder="luxury sofa riyadh"
                      className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-[#C9A86A]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] font-extrabold cursor-pointer"
                >
                  {editingItem 
                    ? (isAr ? 'حفظ التعديلات' : 'Save Changes') 
                    : (isAr ? 'إضافة القطعة' : 'Add Piece')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
