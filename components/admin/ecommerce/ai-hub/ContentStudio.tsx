'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, 
  UploadCloud, 
  RefreshCw, 
  CheckCircle2, 
  Sparkles, 
  Wand2, 
  Layers, 
  FileText,
  Check
} from 'lucide-react';
import { ContentStudioItem } from './types';
import { FurnitureItem } from '@/lib/furnitureData';

interface ContentStudioProps {
  isAr: boolean;
  incomingImage?: { url: string; prompt?: string } | null;
  onClearIncomingImage?: () => void;
  onAddProduct: (product: FurnitureItem) => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const PRESET_CONTENT_PROMPTS = [
  {
    id: 'hospitality',
    labelEn: '🏨 5-Star Hotel Presidential Suite FF&E',
    labelAr: '🏨 أثاث الأجنحة الرئاسية الفندقية 5 نجوم',
    promptEn: 'Bespoke 5-star hotel presidential suite collection. Focus on commercial hospitality durability, solid American Walnut, fire-rated finishes, and brushed brass. Price bracket: 22,000–38,000 SAR.',
    promptAr: 'مجموعة أجنحة فندقية رئاسية 5 نجوم. التركيز على معايير الضيافة العالمية FF&E، خشب الجوز الأمريكي، أقمشة مقاومة للاشتعال، ونحاس مصقول. نطاق السعر: 22,000 إلى 38,000 ر.س.'
  },
  {
    id: 'diplomatic',
    labelEn: '🏛️ Riyadh Diplomatic Quarter Penthouse',
    labelAr: '🏛️ بنتهاوس الحي الدبلوماسي بالرياض',
    promptEn: 'Modern Saudi minimalist luxury penthouse in Riyadh Diplomatic Quarter. Clean architectural curves, travertine stone accents, premium Italian bouclé, and understated elegance. Price bracket: 16,000–32,000 SAR.',
    promptAr: 'بنتهاوس فاخر بتصميم عصري راقٍ في الحي الدبلوماسي بالرياض. خطوط معمارية منحنية، لمسات رخام الترافرتين، بوكليه إيطالي فاخر. نطاق السعر: 16,000 إلى 32,000 ر.س.'
  },
  {
    id: 'boardroom',
    labelEn: '🏢 Executive Boardroom & C-Suite',
    labelAr: '🏢 قاعات مجالس الإدارة التنفيذية',
    promptEn: 'Executive corporate headquarters suite. Heavy commercial architectural joinery, 5-axis CNC joinery, acoustic wooden paneling, integrated power pass-throughs, and heirloom durability.',
    promptAr: 'قاعات مجالس الإدارة ومكاتب الرؤساء التنفيذيين. نجارة معمارية ثقيلة معالجة بـ CNC خماسي المحاور، حلول تمرير ذكية للكيابل، وتشطيبات راقية تدوم لأجيال.'
  },
  {
    id: 'heritage',
    labelEn: '🇸🇦 Modern Saudi Heritage Collection',
    labelAr: '🇸🇦 تشكيلة التراث المعماري السعودي الحديث',
    promptEn: 'Inspired by traditional Najdi geometric patterns and modern Riyadh architecture. Hand-finished natural oak, authentic stone inserts, and artisan upholstery. Price bracket: 18,000–35,000 SAR.',
    promptAr: 'مستوحاة من الزخارف النجدية الأصيلة والعمارة السعودية الحديثة. خشب بلوط طبيعي، تطعيمات حجرية أصيلة، وحرفية وطنية معتمدة. نطاق السعر: 18,000 إلى 35,000 ر.س.'
  }
];

export default function ContentStudio({
  isAr,
  incomingImage,
  onClearIncomingImage,
  onAddProduct,
  showToast
}: ContentStudioProps) {
  const [items, setItems] = useState<ContentStudioItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [copyPrompt, setCopyPrompt] = useState<string>(PRESET_CONTENT_PROMPTS[0].promptEn);
  const [isBulkProcessing, setIsBulkProcessing] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-import incoming image from Visual Studio
  useEffect(() => {
    if (incomingImage?.url) {
      const exists = items.some((it) => it.imageUrl === incomingImage.url);
      if (!exists) {
        const newItem: ContentStudioItem = {
          id: `cs_${Date.now()}`,
          imageUrl: incomingImage.url,
          isFromVisual: true,
          prompt: copyPrompt,
        };
        setItems((prev) => [newItem, ...prev]);
        setActiveItemId(newItem.id);
        if (incomingImage.prompt) {
          // optionally enrich prompt
        }
      }
      onClearIncomingImage?.();
    }
  }, [incomingImage, items, copyPrompt, onClearIncomingImage]);

  const activeItem = items.find((it) => it.id === activeItemId) || items[0] || null;

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: ContentStudioItem[] = [];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await readFileAsDataUrl(file);
      const cleanFileName = `content_studio_${Date.now()}_${i}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

      let finalUrl = base64;
      try {
        const res = await fetch(`${supabaseUrl}/storage/v1/object/photos/${cleanFileName}`, {
          method: 'POST',
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            'Content-Type': file.type || 'image/jpeg',
          },
          body: file,
        });
        if (res.ok) {
          finalUrl = `${supabaseUrl}/storage/v1/object/public/photos/${cleanFileName}`;
        }
      } catch (err) {}

      newItems.push({
        id: `cs_${Date.now()}_${i}`,
        imageUrl: finalUrl,
        prompt: copyPrompt,
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    if (!activeItemId && newItems.length > 0) {
      setActiveItemId(newItems[0].id);
    }
    showToast(
      isAr ? `تم تحميل ${newItems.length} صورة في استوديو المحتوى` : `Loaded ${newItems.length} photo(s) into Content Studio`,
      'success'
    );
  };

  const handleGenerateSpecs = async (targetId?: string) => {
    const idToGenerate = targetId || activeItem?.id;
    if (!idToGenerate) return;

    const target = items.find((it) => it.id === idToGenerate);
    if (!target) return;

    setItems((prev) =>
      prev.map((it) => (it.id === idToGenerate ? { ...it, isGenerating: true } : it))
    );

    try {
      const res = await fetch('/api/admin/ecommerce/ai-generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: target.imageUrl,
          prompt: copyPrompt,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const source = json.source === 'openai_live'
          ? `OpenAI Vision (${json.modelUsed || 'gpt-4o'})`
          : json.source === 'google_gemini_live'
          ? `Google Gemini (${json.modelUsed || 'gemini-3.1-flash'})`
          : 'Architectural Vision Engine';

        setItems((prev) =>
          prev.map((it) =>
            it.id === idToGenerate
              ? {
                  ...it,
                  isGenerating: false,
                  data: json.data,
                  sourceLabel: source,
                  latencyMs: json.latencyMs,
                }
              : it
          )
        );

        showToast(
          isAr
            ? `تم توليد المواصفات بنجاح عبر ${source} (${json.latencyMs || 0}ms)`
            : `Catalog specs generated via ${source} (${json.latencyMs || 0}ms)`,
          'success'
        );
      } else {
        throw new Error(json.error || 'Generation failed');
      }
    } catch (err: any) {
      setItems((prev) =>
        prev.map((it) => (it.id === idToGenerate ? { ...it, isGenerating: false } : it))
      );
      showToast(err.message || (isAr ? 'فشل توليد المواصفات' : 'Specification generation failed'), 'error');
    }
  };

  const handleBulkGenerate = async () => {
    setIsBulkProcessing(true);
    for (const item of items) {
      if (!item.data && !item.committed) {
        await handleGenerateSpecs(item.id);
      }
    }
    setIsBulkProcessing(false);
  };

  const handleCommitToCatalog = (targetId: string) => {
    const target = items.find((it) => it.id === targetId);
    if (!target || !target.data) return;

    const d = target.data;
    const finalProduct: FurnitureItem = {
      id: `gw-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sku: d.sku || `GW-${Math.floor(100 + Math.random() * 900)}`,
      nameEn: d.nameEn || 'The Luxury Artisan Piece',
      nameAr: d.nameAr || 'قطعة أثاث فاخرة مصنوعة بحرفية',
      category: 'living',
      categoryEn: d.categoryEn || 'Living & Lounge',
      categoryAr: d.categoryAr || 'الصالونات وغرف المعيشة',
      price: Number(d.price) || 24000,
      originalPrice: Number(d.originalPrice) || 28000,
      rating: 4.9,
      reviewsCount: 12,
      shortDescEn: d.shortDescEn || 'Handcrafted bespoke piece engineered for luxury environments.',
      shortDescAr: d.shortDescAr || 'قطعة أثاث فاخرة مصنعة بحرفية معمارية مخصصة للبيئات الفاخرة.',
      fullDescEn: d.fullDescEn || d.shortDescEn || '',
      fullDescAr: d.fullDescAr || d.shortDescAr || '',
      materialsEn: d.materialsEn || 'Solid American Walnut, Travertine & Brass',
      materialsAr: d.materialsAr || 'خشب جوز أمريكي مصمت، رخام ترافرتين، ونحاس مصقول',
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
      featuresEn: d.featuresEn || ['5-Axis CNC Precision', 'Non-Yellowing Polyurethane Finish', '5-Year Structural Warranty'],
      featuresAr: d.featuresAr || ['دقة متناهية بـ CNC', 'دهان إيطالي مقاوم للاصفرار', 'ضمان هيكلي 5 سنوات'],
      images: [target.imageUrl],
      factoryLocationEn: 'Factory 1 & 3 — Riyadh Hub',
      factoryLocationAr: 'مصنع 1 و 3 — الرياض',
    };

    onAddProduct(finalProduct);

    setItems((prev) =>
      prev.map((it) => (it.id === targetId ? { ...it, committed: true } : it))
    );

    showToast(
      isAr 
        ? `تم إدراج (${finalProduct.nameAr}) في متجر الكتالوج الحي بنجاح ✓` 
        : `(${finalProduct.nameEn}) successfully published to live catalog ✓`, 
      'success'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Content Studio Intro Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-[#141726]/80 to-[#0F1117] border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>{isAr ? 'استوديو المحتوى والكتالوج (Content Studio)' : 'Content Studio — Spec & Copy AI'}</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                OpenAI Vision + Gemini
              </span>
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isAr
                ? 'تحليل صور قطع الأثاث واستخراج الأبعاد والمواد والأسعار وكتابة الوصف المعماري الفاخر باللغتين وإضافتها للكتالوج بضغطة زر.'
                : 'Analyze furniture photos to auto-extract dimensions, materials, and pricing, write editorial copy, and publish to catalog in 1 click.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 1 && (
            <button
              type="button"
              onClick={handleBulkGenerate}
              disabled={isBulkProcessing}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isBulkProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
              <span>{isAr ? 'توليد الكل' : 'Generate All'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isAr ? 'رفع صور أثاث' : 'Upload Photos'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Photo & Prompt Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Piece Preview Card */}
          <div className="p-4 rounded-3xl bg-[#141721] border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-300" />
                <span>{isAr ? 'القطعة المحددة للتحليل' : 'Active Piece for Analysis'}</span>
              </span>
              {activeItem?.isFromVisual && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-500/30">
                  {isAr ? 'منقولة من الاستوديو البصري' : 'From Visual Studio'}
                </span>
              )}
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 aspect-[4/3] flex items-center justify-center">
              {activeItem ? (
                <>
                  <img
                    src={activeItem.imageUrl}
                    alt="Piece to analyze"
                    className="w-full h-full object-contain"
                  />
                  {activeItem.isGenerating && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 z-20 animate-in fade-in">
                      <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
                      <span className="text-xs font-mono font-bold text-purple-300">
                        {isAr ? 'جارٍ قراءة أبعاد وهندسة القطعة…' : 'Analyzing geometry & materials…'}
                      </span>
                    </div>
                  )}
                  {activeItem.committed && (
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-black text-[10px] font-mono font-extrabold shadow-lg flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{isAr ? 'مدرجة في المتجر' : 'Committed to Catalog'}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <UploadCloud className="w-8 h-8 text-zinc-600 mx-auto" />
                  <p className="text-xs text-zinc-400">
                    {isAr ? 'ارفع صورة أو انقلها من الاستوديو البصري' : 'Upload photo or import from Visual Studio'}
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Selection Strip */}
            {items.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                      (activeItemId || items[0].id) === item.id
                        ? 'border-purple-400 scale-105 shadow-md'
                        : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    {item.committed && (
                      <span className="absolute bottom-0 inset-x-0 bg-emerald-500 text-black text-[7px] font-mono font-bold text-center">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dedicated Copywriting & Spec Prompt Box */}
          <div className="p-4 rounded-3xl bg-[#141721] border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-purple-300" />
                <span>{isAr ? 'توجيهات صياغة المواصفات (Prompt Box)' : 'AI Spec & Copywriting Directives'}</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Vision Copywriter</span>
            </div>

            <textarea
              rows={3}
              value={copyPrompt}
              onChange={(e) => setCopyPrompt(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب توجيهات الصياغة (مثال: أثاث فنادق 5 نجوم، خشب جوز أمريكي، نطاق السعر 20,000 إلى 35,000 ر.س)…'
                  : 'Enter directives (e.g. 5-star hotel presidential suite, American walnut, pricing between 20k-35k SAR)...'
              }
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-purple-400 focus:ring-1 focus:ring-purple-400 leading-relaxed outline-none transition-all resize-none"
            />

            {/* Quick Inspiration Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                {isAr ? 'أنماط المشاريع السريعة:' : 'Project Style Presets:'}
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {PRESET_CONTENT_PROMPTS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setCopyPrompt(isAr ? preset.promptAr : preset.promptEn)}
                    className="text-left rtl:text-right p-2 rounded-xl bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 border border-white/5 text-[11px] text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="font-semibold">{isAr ? preset.labelAr : preset.labelEn}</span>
                    <span className="text-[9px] font-mono text-zinc-500 group-hover:text-purple-300">
                      {isAr ? 'تطبيق' : 'Apply'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => handleGenerateSpecs()}
              disabled={!activeItem || activeItem.isGenerating}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
            >
              {activeItem?.isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-300" />
              )}
              <span>
                {activeItem?.isGenerating
                  ? (isAr ? 'جارٍ قراءة وتوليد المواصفات…' : 'Generating Architectural Specs…')
                  : (isAr ? 'توليد المواصفات بالذكاء الاصطناعي' : 'Generate Specs with AI')}
              </span>
            </button>
          </div>

        </div>

        {/* Right Column: Generated Specification Card & Commit (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {activeItem?.data ? (
            <div className="p-6 rounded-3xl bg-[#141721] border border-purple-500/30 space-y-5 shadow-2xl">
              
              {/* Card Header & SKU */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C9A86A]/15 text-[#C9A86A] text-xs font-mono font-bold border border-[#C9A86A]/30">
                      {activeItem.data.sku}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 text-xs font-mono">
                      {isAr ? activeItem.data.categoryAr : activeItem.data.categoryEn}
                    </span>
                    {activeItem.sourceLabel && (
                      <span className="text-[10px] text-zinc-500 font-mono">
                        via {activeItem.sourceLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {isAr ? activeItem.data.nameAr : activeItem.data.nameEn}
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono">
                    {isAr ? activeItem.data.nameEn : activeItem.data.nameAr}
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right rtl:text-left shrink-0">
                  <div className="text-lg font-mono font-extrabold text-[#E3C58A]">
                    {activeItem.data.price?.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                  </div>
                  {activeItem.data.originalPrice && (
                    <div className="text-xs font-mono text-zinc-500 line-through">
                      {activeItem.data.originalPrice?.toLocaleString('en-US')} {isAr ? 'ر.س' : 'SAR'}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-[#08090C] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'الأبعاد' : 'Dimensions'}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-200 block">
                    {activeItem.data.dimensions?.width} × {activeItem.data.dimensions?.depth} × {activeItem.data.dimensions?.height} cm
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#08090C] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'الخامات والتشطيب' : 'Materials'}
                  </span>
                  <span className="text-xs font-sans font-bold text-zinc-200 block line-clamp-1">
                    {isAr ? activeItem.data.materialsAr : activeItem.data.materialsEn}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#08090C] border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                    {isAr ? 'مدة التجهيز' : 'Lead Time'}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#C9A86A] block">
                    {isAr ? activeItem.data.leadTimeAr : activeItem.data.leadTimeEn}
                  </span>
                </div>
              </div>

              {/* Editorial Description */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-zinc-400 block uppercase">
                  {isAr ? 'الوصف المعماري والقصة الحرفية' : 'Architectural & Craft Story'}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed bg-[#08090C] p-3.5 rounded-2xl border border-white/5">
                  {isAr ? activeItem.data.fullDescAr : activeItem.data.fullDescEn}
                </p>
              </div>

              {/* Craftsmanship Highlights */}
              {activeItem.data.featuresEn && activeItem.data.featuresEn.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 block uppercase">
                    {isAr ? 'الميزات الهندسية والتنفيذية:' : 'Key Engineering Features:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(isAr ? activeItem.data.featuresAr : activeItem.data.featuresEn)?.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-sans"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Commit Action Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleGenerateSpecs(activeItem.id)}
                  disabled={activeItem.isGenerating}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إعادة التوليد' : 'Regenerate'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCommitToCatalog(activeItem.id)}
                  disabled={activeItem.committed}
                  className={`px-6 py-3 rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                    activeItem.committed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                      : 'bg-gradient-to-r from-[#C9A86A] via-[#DFBA73] to-[#C9A86A] hover:shadow-[0_0_20px_rgba(201,168,106,0.3)] text-[#08090C]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {activeItem.committed
                      ? (isAr ? 'تم إدراج القطعة في المتجر بنجاح ✓' : 'Piece Published in Catalog ✓')
                      : (isAr ? 'إدراج القطعة في كتالوج المتجر الآن' : 'Commit Piece to Store Catalog')}
                  </span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-[#141721] border border-dashed border-white/10 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 flex items-center justify-center mx-auto">
                <FileText className="w-7 h-7" />
              </div>
              <h5 className="text-sm font-bold text-white">
                {isAr ? 'بانتظار التحليل وتوليد المواصفات' : 'Awaiting Specification Generation'}
              </h5>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                {isAr
                  ? 'اختر صورة من القائمة واضغط على "توليد المواصفات بالذكاء الاصطناعي" لقراءة أبعاد القطعة واستخراج المواد وتحديد الأسعار وتنسيق بطاقة العرض.'
                  : 'Select a photo and click "Generate Specs with AI" to extract dimensions, materials, prices, and complete bilingual catalog copy.'}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
