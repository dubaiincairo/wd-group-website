'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/admin/ToastProvider';
import { FurnitureItem } from '@/lib/furnitureData';
import MediaFieldUploader from '@/components/admin/MediaFieldUploader';
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
  ChevronDown,
  UploadCloud,
  Wand2,
  RefreshCw,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface ProductsTabProps {
  products: FurnitureItem[];
  currency: 'SAR' | 'USD';
  onAddProduct: (product: FurnitureItem) => void;
  onUpdateProduct: (product: FurnitureItem) => void;
  onDeleteProduct: (productId: string) => void;
  initialOpenAiStudio?: boolean;
  onResetAiStudio?: () => void;
}

export default function ProductsTab({
  products,
  currency,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  initialOpenAiStudio,
  onResetAiStudio,
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

  // AI Bulk Product Studio State
  interface AiStudioItem {
    id: string;
    imageUrl: string;
    enhancedUrl?: string;
    isGenerating?: boolean;
    isEnhancing?: boolean;
    generatedData?: any;
    committed?: boolean;
  }
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [aiItems, setAiItems] = useState<AiStudioItem[]>([]);
  const [aiHints, setAiHints] = useState('');
  const [isProcessingAi, setIsProcessingAi] = useState(false);

  useEffect(() => {
    if (initialOpenAiStudio) {
      setIsAiStudioOpen(true);
      if (onResetAiStudio) onResetAiStudio();
    }
  }, [initialOpenAiStudio, onResetAiStudio]);

  // Handle Multi-file Upload for AI Studio
  const handleBulkFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: AiStudioItem[] = [];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const cleanFileName = `ai_prod_${Date.now()}_${i}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      try {
        const res = await fetch(`${supabaseUrl}/storage/v1/object/photos/${cleanFileName}`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': file.type || 'image/jpeg',
          },
          body: file,
        });

        if (res.ok) {
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/photos/${cleanFileName}`;
          newItems.push({
            id: `ai_${Date.now()}_${i}`,
            imageUrl: publicUrl,
          });
        } else {
          // Fallback to local object URL for preview
          newItems.push({
            id: `ai_${Date.now()}_${i}`,
            imageUrl: URL.createObjectURL(file),
          });
        }
      } catch (err) {
        newItems.push({
          id: `ai_${Date.now()}_${i}`,
          imageUrl: URL.createObjectURL(file),
        });
      }
    }

    setAiItems((prev) => [...prev, ...newItems]);
    showToast(isAr ? `تمت إضافة ${newItems.length} صورة للاستوديو` : `Loaded ${newItems.length} images into AI Studio`, 'success');
  };

  // AI Single Item Specification Generator (OpenAI)
  const handleAiGenerateSingle = async (itemId: string) => {
    const target = aiItems.find((it) => it.id === itemId);
    if (!target) return;

    setAiItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, isGenerating: true } : it))
    );

    try {
      const res = await fetch('/api/admin/ecommerce/ai-generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: target.enhancedUrl || target.imageUrl,
          hints: aiHints,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAiItems((prev) =>
          prev.map((it) => (it.id === itemId ? { ...it, isGenerating: false, generatedData: json.data } : it))
        );
        showToast(isAr ? 'تم توليد المواصفات بالذكاء الاصطناعي بنجاح' : 'Product details generated with AI', 'success');
      } else {
        throw new Error(json.error || 'Failed');
      }
    } catch (err: any) {
      setAiItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, isGenerating: false } : it))
      );
      showToast(isAr ? 'تعذر توليد المواصفات' : 'AI generation error', 'error');
    }
  };

  // AI Single Photo Enhancer (NanoBanana Pro / Google Cloud)
  const handleAiEnhanceSingle = async (itemId: string) => {
    const target = aiItems.find((it) => it.id === itemId);
    if (!target) return;

    setAiItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, isEnhancing: true } : it))
    );

    try {
      const res = await fetch('/api/admin/ecommerce/ai-enhance-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: target.imageUrl,
        }),
      });

      const json = await res.json();
      if (json.success && json.enhancedUrl) {
        setAiItems((prev) =>
          prev.map((it) => (it.id === itemId ? { ...it, isEnhancing: false, enhancedUrl: json.enhancedUrl } : it))
        );
        showToast(isAr ? 'تم تحسين دقة وإضاءة الصورة بـ NanoBanana Pro' : 'Photo enhanced with NanoBanana Pro AI', 'success');
      } else {
        throw new Error(json.error || 'Failed');
      }
    } catch (err: any) {
      setAiItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, isEnhancing: false } : it))
      );
      showToast(isAr ? 'تعذر تحسين الصورة' : 'Photo enhancement error', 'error');
    }
  };

  // Commit AI-Generated Item directly to Live Catalog
  const handleCommitAiProduct = (itemId: string) => {
    const target = aiItems.find((it) => it.id === itemId);
    if (!target || !target.generatedData) return;

    const d = target.generatedData;
    const finalProduct: FurnitureItem = {
      id: `gw-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sku: d.sku || `GW-${Math.floor(100 + Math.random() * 900)}`,
      nameEn: d.nameEn || 'The Luxury Artisan Piece',
      nameAr: d.nameAr || 'قطعة أثاث فاخرة مصنوعة بحرفية',
      category: 'living',
      categoryEn: d.categoryEn || 'Living & Lounge',
      categoryAr: d.categoryAr || 'الصالونات وغرف المعيشة',
      price: Number(d.price) || 16000,
      originalPrice: Number(d.originalPrice) || 19000,
      rating: 4.9,
      reviewsCount: 8,
      shortDescEn: d.shortDescEn || 'Handcrafted bespoke piece.',
      shortDescAr: d.shortDescAr || 'قطعة أثاث فاخرة مصنعة بحرفية.',
      fullDescEn: d.fullDescEn || d.shortDescEn || '',
      fullDescAr: d.fullDescAr || d.shortDescAr || '',
      materialsEn: d.materialsEn || 'Solid Walnut & Premium Finishes',
      materialsAr: d.materialsAr || 'خشب جوز أمريكي مصمت وتشطيبات فاخرة',
      materialKey: 'walnut',
      leadTimeEn: d.leadTimeEn || '10–14 Business Days',
      leadTimeAr: d.leadTimeAr || '10 – 14 يوم عمل',
      inStock: true,
      isHospitalityGrade: true,
      dimensions: d.dimensions || { width: 220, depth: 100, height: 80, unit: 'cm' },
      finishes: [
        { id: 'f1', nameEn: 'Natural Walnut', nameAr: 'جوز طبيعي', colorCode: '#5C4033' },
        { id: 'f2', nameEn: 'Ivory Bouclé', nameAr: 'بوكليه عاجي', colorCode: '#F5F5DC' }
      ],
      featuresEn: d.featuresEn || ['5-Axis CNC Precision', 'Non-Yellowing Lacquer', '5-Year Warranty'],
      featuresAr: d.featuresAr || ['دقة متناهية بـ CNC', 'دهان مقاوم للاصفرار', 'ضمان 5 سنوات'],
      images: [target.enhancedUrl || target.imageUrl],
      factoryLocationEn: 'Factory 1 & 3 — Riyadh Hub',
      factoryLocationAr: 'مصنع 1 و 3 — الرياض',
    };

    onAddProduct(finalProduct);
    setAiItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, committed: true } : it))
    );
    showToast(isAr ? `تم إدراج (${finalProduct.nameAr}) في الكتالوج بنجاح!` : `(${finalProduct.nameEn}) added to catalog!`, 'success');
  };

  // Bulk generate for all items in studio
  const handleBulkGenerateAll = async () => {
    setIsProcessingAi(true);
    for (const item of aiItems) {
      if (!item.generatedData && !item.committed) {
        await handleAiGenerateSingle(item.id);
      }
    }
    setIsProcessingAi(false);
  };

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
            onClick={() => setIsAiStudioOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:shadow-purple-500/25 transition-all cursor-pointer font-mono"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{isAr ? 'استوديو الذكاء الاصطناعي (OpenAI & NanoBanana)' : 'AI Product Studio (OpenAI & NanoBanana)'}</span>
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

              {/* Primary Image Upload & Direct URL Option (Feature 5) */}
              <div>
                <MediaFieldUploader
                  label={isAr ? 'صورة القطعة الرئيسية (رفع ملف مباشر أو رابط)' : 'Primary Product Photo (Upload File or URL)'}
                  description={isAr ? 'ارفع صورة مباشرة من جهازك للتخزين السحابي أو الصق رابط صورة خارجي' : 'Upload photo file directly to cloud storage or paste direct HTTPS image URL'}
                  value={formImageUrl}
                  onChange={setFormImageUrl}
                  accept="image"
                  bucket="photos"
                  aspectRatio="16:9"
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

      {/* 5. AI Multi-Photo Product Studio Modal (Feature 4) */}
      {isAiStudioOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setIsAiStudioOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          <div className="relative w-full max-w-5xl bg-[#0F1117] border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 z-10 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Studio Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold mb-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isAr ? 'استوديو الذكاء الاصطناعي للمنتجات' : 'AI MULTI-PHOTO PRODUCT STUDIO'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>
                    {isAr
                      ? 'الرفع المتعدد وكتابة المواصفات بـ OpenAI وتحسين الصور بـ NanoBanana Pro'
                      : 'Bulk Photo Upload, OpenAI Vision Cataloging & NanoBanana AI Enhancement'}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isAr 
                    ? 'ارفع عدة صور لقطع الأثاث دفعة واحدة، وسيقوم نموذج OpenAI Vision بكتابة الأسماء والوصف والأبعاد والأسعار تلقائياً، مع خيار تحسين جودة الصور وإضاءتها فندقياً.'
                    : 'Upload multiple piece photos at once. OpenAI Vision generates titles, descriptions, dimensions, and prices, while NanoBanana Pro enhances photo studio lighting.'}
                </p>
              </div>

              <button
                onClick={() => setIsAiStudioOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Controls & Multi-File Dropzone */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* File Dropzone */}
              <div className="lg:col-span-2">
                <label className="border-2 border-dashed border-purple-500/30 hover:border-purple-400/60 bg-purple-500/5 hover:bg-purple-500/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all space-y-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleBulkFilesUpload}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      {isAr ? 'انقر لاختيار عدة صور لقطع الأثاث أو اسحبها هنا' : 'Click to select multiple furniture photos or drag & drop'}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {isAr ? 'يدعم صور JPG, PNG, WEBP بدقة عالية للرفع المباشر' : 'Supports high-res JPG, PNG, WEBP files'}
                    </span>
                  </div>
                </label>
              </div>

              {/* Context Hints & Batch Processing */}
              <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-3 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 font-mono">
                    {isAr ? 'توجيهات إضافية للذكاء الاصطناعي (اختياري)' : 'AI Style Hints (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={aiHints}
                    onChange={(e) => setAiHints(e.target.value)}
                    placeholder={isAr ? 'مثال: أطقم قصور ملكية من خشب السنديان' : 'e.g. Royal palace suites with solid oak'}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBulkGenerateAll}
                    disabled={aiItems.length === 0 || isProcessingAi}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:shadow-lg disabled:opacity-50 text-white font-extrabold text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isProcessingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                    <span>{isProcessingAi ? (isAr ? 'جارٍ التحليل…' : 'Generating…') : (isAr ? 'توليد الكل بـ OpenAI' : 'Generate All Specs')}</span>
                  </button>

                  {aiItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setAiItems([])}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-600/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title={isAr ? 'تفريغ القائمة' : 'Clear items'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Gallery of Uploaded / Processing Pieces */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>
                  {isAr 
                    ? `القطع المرفوعة في الاستوديو (${aiItems.length})` 
                    : `Pieces Loaded in Studio (${aiItems.length})`}
                </span>
                <span>
                  {isAr 
                    ? `المكتمل إدراجه: ${aiItems.filter(i => i.committed).length}` 
                    : `Added to Catalog: ${aiItems.filter(i => i.committed).length}`}
                </span>
              </div>

              {aiItems.length === 0 ? (
                <div className="p-10 text-center border border-dashed border-white/10 rounded-2xl space-y-2">
                  <Sparkles className="w-8 h-8 text-purple-400/50 mx-auto" />
                  <p className="text-xs text-zinc-400">
                    {isAr 
                      ? 'قم برفع صورة أو عدة صور للبدء في توليد كتالوج الأثاث آلياً بالذكاء الاصطناعي.' 
                      : 'Upload one or more photos to initiate autonomous AI catalog generation.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiItems.map((item, idx) => {
                    const d = item.generatedData;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all duration-300 space-y-3 ${
                          item.committed
                            ? 'bg-emerald-500/5 border-emerald-500/30'
                            : d
                            ? 'bg-[#141721] border-purple-500/30'
                            : 'bg-[#08090C] border-white/10'
                        }`}
                      >
                        {/* Image Preview & Enhancement Status */}
                        <div className="flex gap-3 items-start">
                          <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 group">
                            <img
                              src={item.enhancedUrl || item.imageUrl}
                              alt="Piece Preview"
                              className="w-full h-full object-cover"
                            />
                            {item.enhancedUrl && (
                              <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-mono font-bold">
                                NanoBanana HD
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-mono text-[#C9A86A] font-bold">
                                {d?.sku || `#${idx + 1} Pending Spec`}
                              </span>
                              <button
                                type="button"
                                onClick={() => setAiItems((prev) => prev.filter((i) => i.id !== item.id))}
                                className="text-zinc-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <h4 className="text-xs font-bold text-white line-clamp-1">
                              {d ? (isAr ? d.nameAr : d.nameEn) : (isAr ? 'بانتظار التحليل بـ OpenAI…' : 'Awaiting OpenAI analysis…')}
                            </h4>

                            {d ? (
                              <div className="space-y-1 text-[11px] font-mono">
                                <div className="text-[#E3C58A] font-bold">
                                  {d.price?.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                                  {d.originalPrice && <span className="text-zinc-500 line-through text-[10px] ml-1.5 rtl:mr-1.5 rtl:ml-0">{d.originalPrice?.toLocaleString('en-US')}</span>}
                                </div>
                                <div className="text-zinc-400 text-[10px] truncate">
                                  {d.dimensions?.width}×{d.dimensions?.depth}×{d.dimensions?.height} cm · {isAr ? d.materialsAr : d.materialsEn}
                                </div>
                              </div>
                            ) : (
                              <p className="text-[10px] text-zinc-500 line-clamp-2 font-sans">
                                {isAr ? 'اضغط على زر التوليد لتحليل الخشب والمقاسات والوصف تلقائياً.' : 'Click Generate to automatically extract wood species, dimensions and descriptions.'}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* AI Actions Row */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => handleAiGenerateSingle(item.id)}
                            disabled={item.isGenerating || item.committed}
                            className="px-2.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                          >
                            {item.isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                            <span>{item.isGenerating ? (isAr ? 'جارٍ التحليل…' : 'Analyzing…') : (isAr ? 'توليد المواصفات بـ OpenAI' : 'OpenAI Specs')}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAiEnhanceSingle(item.id)}
                            disabled={item.isEnhancing || item.committed}
                            className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                          >
                            {item.isEnhancing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                            <span>{item.isEnhancing ? (isAr ? 'جارٍ التحسين…' : 'Enhancing…') : (isAr ? 'تحسين NanoBanana Pro' : 'Enhance Photo')}</span>
                          </button>
                        </div>

                        {/* Commit to Catalog Button */}
                        {d && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={() => handleCommitAiProduct(item.id)}
                              disabled={item.committed}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                item.committed
                                  ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                                  : 'bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] text-[#08090C] hover:shadow-lg'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{item.committed ? (isAr ? 'تم الإدراج في الكتالوج بنجاح ✓' : 'Added to Catalog ✓') : (isAr ? 'اعتماد وإدراج القطعة في المتجر' : 'Commit Piece to Store Catalog')}</span>
                            </button>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
