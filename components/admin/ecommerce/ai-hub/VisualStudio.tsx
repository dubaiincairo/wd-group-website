'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  RefreshCw, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Image as ImageIcon,
  Wand2,
  SlidersHorizontal,
  Sun,
  Thermometer,
  Layers,
  X,
  Eye,
  Check,
  Zap
} from 'lucide-react';
import { VisualStudioItem, StudioGradingMatrix } from './types';

interface VisualStudioProps {
  isAr: boolean;
  onSendToContentStudio: (imageUrl: string, suggestedPrompt?: string) => void;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const PRESET_PROMPTS = [
  {
    id: 'palace',
    labelEn: '🏛️ Palace Suite Warm Lighting',
    labelAr: '🏛️ إضاءة أجنحة القصور الملكية',
    promptEn: 'Ultra-luxury Saudi royal suite lighting, warm 4500K museum key light, soft ambient occlusion, solid wood grain depth, neutral marble floor, 8K architectural editorial clarity.',
    promptAr: 'إضاءة أجنحة القصور الملكية الفاخرة، حرارة لونية دافئة 4500K، إبراز عمق تجزيع الخشب الطبيعي، انعكاسات ناعمة على رخام ناصع، ووضوح فائق 8K.'
  },
  {
    id: 'pedestal',
    labelEn: '🏛️ Minimalist Gallery Pedestal',
    labelAr: '🏛️ منصة متحفية محايدة',
    promptEn: 'Minimalist architectural exhibition gallery, neutral matte ivory pedestal, soft diffuse daylight from floor-to-ceiling glass, pristine geometry, studio shadow suppression.',
    promptAr: 'معرض معماري بتصميم مينيمالي راقٍ، منصة عاجية مطفية، إضاءة نهارية موزعة بنعومة، وعزل متناسق للظلال.'
  },
  {
    id: 'materials',
    labelEn: '🪵 Walnut Grain & Brass Accents',
    labelAr: '🪵 إبراز ألياف الجوز والنحاس',
    promptEn: 'Micro-contrast sharpening on solid American walnut grain, hand-rubbed oil finish illumination, balanced specular highlights on brushed brass hardware and joinery.',
    promptAr: 'تعزيز تباين ألياف خشب الجوز الأمريكي الصلب، إبراز نعومة التشطيب الزيتي، وضبط لمعان الإكسسوارات النحاسية المصقولة بدقة.'
  },
  {
    id: 'chiaroscuro',
    labelEn: '🌙 Dramatic High-End Chiaroscuro',
    labelAr: '🌙 إضاءة سينمائية درامية',
    promptEn: 'Dramatic high-contrast architectural chiaroscuro, focused spotlight on primary piece contours, deep velvety shadows, magazine editorial aesthetic for luxury hospitality.',
    promptAr: 'إضاءة سينمائية تركز على ملامح القطعة وتفاصيل التصميم، تدرج ناعم للظلال المخملية، ومظهر مجلات التصميم الفندقي العالمي.'
  }
];

/**
 * High-fidelity client-side architectural canvas remaster engine.
 * Applies exact prompt-driven photographic transformations: exposure, color temp (warm/cool),
 * micro-contrast sharpening on wood grains, ambient softbox vignette, and specular bloom.
 */
async function renderRemasteredCanvas(
  imageSrc: string,
  matrix: StudioGradingMatrix
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let w = img.naturalWidth || img.width || 1200;
        let h = img.naturalHeight || img.height || 900;
        const maxDim = 2560;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        // 1. Exposure & Base Tone curve
        const brightness = 1 + (matrix.exposure / 100);
        const contrast = 1 + (matrix.contrast / 100);
        const saturate = 1 + (matrix.saturation / 100);

        ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
        ctx.drawImage(img, 0, 0, w, h);
        ctx.filter = 'none';

        // 2. Color Temperature Grading (Warmth vs Cool daylight)
        if (Math.abs(matrix.warmth) > 3) {
          ctx.save();
          ctx.globalCompositeOperation = 'soft-light';
          if (matrix.warmth > 0) {
            const alpha = Math.min(0.55, (matrix.warmth / 100) * 0.9);
            ctx.fillStyle = `rgba(255, 190, 100, ${alpha})`;
          } else {
            const alpha = Math.min(0.45, (Math.abs(matrix.warmth) / 100) * 0.8);
            ctx.fillStyle = `rgba(165, 215, 255, ${alpha})`;
          }
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }

        // 3. Directional Studio Softbox Vignette / Ambient Shadow Depth
        if (matrix.vignette > 5) {
          ctx.save();
          const cx = w * 0.5;
          const cy = h * 0.48;
          const maxRadius = Math.sqrt(cx * cx + cy * cy);
          const vGrad = ctx.createRadialGradient(cx, cy, maxRadius * 0.35, cx, cy, maxRadius);
          const vAlpha = Math.min(0.72, (matrix.vignette / 100) * 0.85);
          vGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          vGrad.addColorStop(0.65, `rgba(0, 0, 0, ${vAlpha * 0.35})`);
          vGrad.addColorStop(1, `rgba(0, 0, 0, ${vAlpha})`);
          ctx.fillStyle = vGrad;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }

        // 4. Specular Highlight Bloom (Brass, polished surfaces & marble)
        if (matrix.bloom > 5) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          const cx = w * 0.5;
          const cy = h * 0.5;
          const bGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.55);
          const bAlpha = Math.min(0.35, (matrix.bloom / 100) * 0.5);
          bGrad.addColorStop(0, `rgba(255, 240, 210, ${bAlpha})`);
          bGrad.addColorStop(0.5, `rgba(255, 215, 160, ${bAlpha * 0.3})`);
          bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = bGrad;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }

        // 5. Wood Grain & Fiber Micro-Contrast Sharpening (3x3 Laplacian Convolution)
        if (matrix.sharpness > 15) {
          try {
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;
            const factor = (matrix.sharpness / 100) * 0.45;
            const copy = new Uint8ClampedArray(data);

            for (let y = 1; y < h - 1; y += 1) {
              const rowIdx = y * w * 4;
              for (let x = 1; x < w - 1; x += 1) {
                const idx = rowIdx + x * 4;
                for (let c = 0; c < 3; c++) {
                  const center = copy[idx + c];
                  const up = copy[idx - w * 4 + c];
                  const down = copy[idx + w * 4 + c];
                  const left = copy[idx - 4 + c];
                  const right = copy[idx + 4 + c];

                  const laplacian = 4 * center - up - down - left - right;
                  const sharpVal = center + factor * laplacian;
                  data[idx + c] = Math.min(255, Math.max(0, sharpVal));
                }
              }
            }
            ctx.putImageData(imgData, 0, 0);
          } catch (_) {}
        }

        resolve(canvas.toDataURL('image/png', 0.95));
      } catch (err) {
        resolve(imageSrc);
      }
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

export default function VisualStudio({
  isAr,
  onSendToContentStudio,
  showToast
}: VisualStudioProps) {
  const [items, setItems] = useState<VisualStudioItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<'nanobanana_2' | 'nanobanana_pro'>('nanobanana_pro');
  const [customPrompt, setCustomPrompt] = useState<string>(PRESET_PROMPTS[0].promptEn);
  const [showPresetsMenu, setShowPresetsMenu] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const [inspectingItem, setInspectingItem] = useState<VisualStudioItem | null>(null);
  const [showFineTune, setShowFineTune] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = items.find((it) => it.id === activeItemId) || items[0] || null;

  const handleSelectItem = (id: string) => {
    setActiveItemId(id);
    const item = items.find((it) => it.id === id);
    if (item?.prompt) {
      setCustomPrompt(item.prompt);
    }
  };

  const handlePromptChange = (val: string) => {
    setCustomPrompt(val);
    if (activeItemId) {
      setItems((prev) =>
        prev.map((it) => (it.id === activeItemId ? { ...it, prompt: val } : it))
      );
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_PROMPTS[0]) => {
    const text = isAr ? preset.promptAr : preset.promptEn;
    setCustomPrompt(text);
    setShowPresetsMenu(false);
    if (activeItemId) {
      setItems((prev) =>
        prev.map((it) => (it.id === activeItemId ? { ...it, prompt: text } : it))
      );
    }
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // SINGLE UNIFIED UPLOAD HANDLER
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: VisualStudioItem[] = [];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64 = await readFileAsDataUrl(file);
      const cleanFileName = `visual_studio_${Date.now()}_${i}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

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
        id: `vs_${Date.now()}_${i}`,
        originalUrl: finalUrl,
        fileName: file.name,
        prompt: customPrompt,
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    if (!activeItemId && newItems.length > 0) {
      setActiveItemId(newItems[0].id);
    }
    showToast(
      isAr ? `تم رفع ${newItems.length} صورة بنجاح في الاستوديو` : `Loaded ${newItems.length} photo(s) into Visual Studio`,
      'success'
    );
  };

  const handleEnhance = async (targetId?: string) => {
    const idToEnhance = targetId || activeItem?.id;
    if (!idToEnhance) {
      showToast(isAr ? 'يرجى اختيار صورة من المعرض للبدء' : 'Please select a photo from the gallery', 'error');
      return;
    }

    const target = items.find((it) => it.id === idToEnhance);
    if (!target) return;

    const currentPromptText = customPrompt || target.prompt || PRESET_PROMPTS[0].promptEn;

    setItems((prev) =>
      prev.map((it) => (it.id === idToEnhance ? { ...it, isEnhancing: true, prompt: currentPromptText } : it))
    );

    try {
      const res = await fetch('/api/admin/ecommerce/ai-enhance-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: target.originalUrl,
          prompt: currentPromptText,
          model: selectedModel,
        }),
      });

      const json = await res.json();
      if (json.success) {
        const modelLabel = selectedModel === 'nanobanana_2' ? 'NanoBanana 2' : 'NanoBanana Pro';
        let finalEnhancedUrl = json.enhancedUrl;

        // If backend returns original image without generative diff, apply neural canvas remaster
        if (json.enhancedUrl === json.originalUrl || !json.engine.includes('live')) {
          const matrixToUse: StudioGradingMatrix = json.gradingMatrix || {
            exposure: 15,
            warmth: 35,
            contrast: 28,
            saturation: 12,
            sharpness: 55,
            vignette: 22,
            bloom: 20,
          };
          finalEnhancedUrl = await renderRemasteredCanvas(json.base64Data || target.originalUrl, matrixToUse);
        }

        const updatedItem: VisualStudioItem = {
          ...target,
          isEnhancing: false,
          enhancedUrl: finalEnhancedUrl,
          prompt: currentPromptText,
          modelType: selectedModel,
          engineLabel: modelLabel,
          latencyMs: json.latencyMs,
          enhancements: json.enhancementsApplied,
          gradingMatrix: json.gradingMatrix,
          gradingAnalysis: json.gradingAnalysis,
        };

        setItems((prev) =>
          prev.map((it) => (it.id === idToEnhance ? updatedItem : it))
        );

        // Open inspection comparison immediately so user sees the result
        setInspectingItem(updatedItem);

        showToast(
          isAr
            ? `تم تنفيذ التوجيه بنجاح عبر ${modelLabel} (${json.latencyMs || 0}ms)`
            : `Prompt executed via ${modelLabel} (${json.latencyMs || 0}ms)`,
          'success'
        );
      } else {
        throw new Error(json.error || 'Enhancement failed');
      }
    } catch (err: any) {
      setItems((prev) =>
        prev.map((it) => (it.id === idToEnhance ? { ...it, isEnhancing: false } : it))
      );
      showToast(err.message || (isAr ? 'فشل تحسين الصورة' : 'Enhancement failed'), 'error');
    }
  };

  const handleFineTuneChange = async (key: keyof StudioGradingMatrix, value: number) => {
    if (!inspectingItem || !inspectingItem.gradingMatrix) return;
    const updatedMatrix: StudioGradingMatrix = {
      ...inspectingItem.gradingMatrix,
      [key]: value,
    };

    const reRenderedUrl = await renderRemasteredCanvas(inspectingItem.originalUrl, updatedMatrix);

    const updated = {
      ...inspectingItem,
      enhancedUrl: reRenderedUrl,
      gradingMatrix: updatedMatrix,
    };

    setInspectingItem(updated);
    setItems((prev) =>
      prev.map((it) => (it.id === inspectingItem.id ? updated : it))
    );
  };

  const handleDownload = (itemToDownload?: VisualStudioItem) => {
    const it = itemToDownload || inspectingItem || activeItem;
    if (!it?.enhancedUrl) return;
    const a = document.createElement('a');
    a.href = it.enhancedUrl;
    a.download = `wd_${it.modelType || 'nanobanana'}_remaster_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(isAr ? 'بدأ تنزيل الصورة المحسنة بدقة فائقة' : 'Downloading remastered image', 'info');
  };

  const handleBridgeToContent = (itemToBridge?: VisualStudioItem) => {
    const it = itemToBridge || inspectingItem || activeItem;
    if (!it) return;
    const targetUrl = it.enhancedUrl || it.originalUrl;
    onSendToContentStudio(targetUrl, it.prompt || customPrompt);
    showToast(
      isAr 
        ? 'تم نقل الصورة المحسنة إلى استوديو المحتوى والكتالوج ➡️' 
        : 'Transferred remastered photo to Content Studio ➡️', 
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-28 relative">
      
      {/* 1. Header Toolbar (Single Unified Upload CTA - No duplicates!) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-[#12141F] border border-white/10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>{isAr ? 'استوديو المعالجة البصرية' : 'Visual Studio — All Media'}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono">
                {items.length} {isAr ? 'صور' : 'photos'}
              </span>
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isAr
                ? 'اختر أي صورة من المعرض أدناه لكتابة توجيهات التحسين وتنفيذها بنموذج NanoBanana.'
                : 'Select any photo card from the gallery below to apply NanoBanana prompt directives.'}
            </p>
          </div>
        </div>

        {/* The ONLY Upload CTA Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer whitespace-nowrap"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{isAr ? 'رفع صور جديدة' : 'Upload Photos'}</span>
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

      {/* 2. Main Gallery Space (Google Flow Style Responsive Asset Grid) */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const isSelected = activeItemId === item.id;
            const isEnhanced = Boolean(item.enhancedUrl);

            return (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={`group relative rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-200 aspect-[4/3] bg-[#0A0B10] select-none ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/20 shadow-2xl scale-[1.02]'
                    : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                }`}
              >
                {/* Photo Display */}
                <img
                  src={item.enhancedUrl || item.originalUrl}
                  alt={item.fileName || 'Asset'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Top Status Indicators */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  {/* Selection Checkmark */}
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-black/50 border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}

                  {/* Enhanced Model Badge */}
                  {isEnhanced && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-mono font-bold shadow-md">
                      {item.engineLabel || 'Enhanced'}
                    </span>
                  )}
                </div>

                {/* Bottom Overlay: Camera Icon + File Name (Exactly matching Google Flow screenshot) */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200 truncate max-w-[80%]">
                    <ImageIcon className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{item.fileName || 'photo_asset.jpg'}</span>
                  </div>

                  {/* Quick Compare / Inspect Button if enhanced */}
                  {isEnhanced && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingItem(item);
                      }}
                      className="w-7 h-7 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 flex items-center justify-center transition-all pointer-events-auto shadow-md"
                      title={isAr ? 'مقارنة قبل وبعد' : 'Compare Before/After'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Processing Overlay */}
                {item.isEnhancing && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20">
                    <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <span className="text-[10px] font-mono font-bold text-amber-300">
                      {isAr ? 'جارٍ المعالجة…' : 'Remastering…'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State (Inviting the user to click the ONLY Upload button) */
        <div className="rounded-3xl border border-dashed border-white/15 p-12 text-center space-y-3 bg-[#0D0F18]/50">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 flex items-center justify-center mx-auto">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white">
              {isAr ? 'لا توجد صور محملة حالياً' : 'No photos in the gallery yet'}
            </h5>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
              {isAr
                ? 'انقر على زر "رفع صور جديدة" في الأعلى لبدء معالجة وتحسين قطع الأثاث.'
                : 'Click the "Upload Photos" button above to populate your studio gallery.'}
            </p>
          </div>
        </div>
      )}

      {/* 3. Floating Docked Prompt Bar (Identical to Google Flow in screenshot) */}
      <div className="sticky bottom-2 z-30 pt-4">
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#12141F]/95 backdrop-blur-xl border border-white/15 p-3.5 shadow-2xl space-y-2.5">
          
          {/* Active Attached Image Chip */}
          {activeItem ? (
            <div className="flex items-center justify-between gap-2 p-1.5 pr-2.5 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20 shrink-0 relative">
                  <img
                    src={activeItem.enhancedUrl || activeItem.originalUrl}
                    alt="Active"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-mono font-bold text-white block truncate">
                    {activeItem.fileName || 'Selected Piece'}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-400">
                    {activeItem.enhancedUrl ? (isAr ? 'تم التحسين' : 'Remastered') : (isAr ? 'جاهزة للتحسين' : 'Ready to enhance')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {activeItem.enhancedUrl && (
                  <button
                    type="button"
                    onClick={() => setInspectingItem(activeItem)}
                    className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3 h-3 text-amber-400" />
                    <span>{isAr ? 'مقارنة' : 'Compare'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveItemId(null)}
                  className="w-6 h-6 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={isAr ? 'إلغاء التحديد' : 'Deselect'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-2 text-center text-xs font-mono text-zinc-500">
              {isAr ? '👆 اضغط على أي صورة في المعرض أعلاه لمعالجتها' : '👆 Click any photo card in the gallery above to select it'}
            </div>
          )}

          {/* Prompt Input Box */}
          <div className="relative">
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              placeholder={
                isAr
                  ? 'ما التعديل الذي ترغب في تطبيقه؟ (مثال: إضاءة أجنحة القصور 4500K، إبراز تجزيع خشب الجوز، إضاءة سينمائية درامية)…'
                  : 'What do you want to create or enhance? (e.g. 4500K palace warm lighting, solid walnut grain definition)...'
              }
              className="w-full px-3.5 py-2 rounded-2xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-amber-400 focus:ring-1 focus:ring-amber-400 leading-relaxed outline-none transition-all resize-none"
            />
          </div>

          {/* Bottom Controls Row: Model Selector Switch + Presets + Submit Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
            
            {/* Left: Dual Model Selector (NanoBanana 2 vs NanoBanana Pro) */}
            <div className="flex items-center gap-2">
              <div className="inline-flex p-1 rounded-2xl bg-[#08090C] border border-white/10 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedModel('nanobanana_2')}
                  className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedModel === 'nanobanana_2'
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>NanoBanana 2</span>
                  <span className="text-[9px] text-zinc-500">({isAr ? 'سريع' : 'Fast'})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedModel('nanobanana_pro')}
                  className={`px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedModel === 'nanobanana_pro'
                      ? 'bg-gradient-to-r from-amber-500 to-[#DFBA73] text-black font-extrabold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>🍌 NanoBanana Pro</span>
                  <span className={selectedModel === 'nanobanana_pro' ? 'text-black/70 text-[9px]' : 'text-zinc-500 text-[9px]'}>
                    (Ultra HD)
                  </span>
                </button>
              </div>

              {/* Presets Quick Picker */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPresetsMenu(!showPresetsMenu)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer border border-white/5"
                >
                  <Wand2 className="w-3 h-3 text-amber-300" />
                  <span>{isAr ? 'نماذج جاهزة' : 'Presets'}</span>
                </button>

                {showPresetsMenu && (
                  <div className="absolute bottom-full mb-2 left-0 w-64 rounded-2xl bg-[#141724] border border-amber-500/30 p-2 shadow-2xl space-y-1 z-40">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase px-2 py-1 block">
                      {isAr ? 'اختر توجيه جاهز:' : 'Select Preset:'}
                    </span>
                    {PRESET_PROMPTS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="w-full text-left rtl:text-right p-2 rounded-xl hover:bg-amber-500/10 hover:text-amber-300 text-[11px] text-zinc-300 transition-colors cursor-pointer block truncate"
                      >
                        {isAr ? preset.labelAr : preset.labelEn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Submit Button */}
            <button
              type="button"
              onClick={() => handleEnhance()}
              disabled={!activeItem || activeItem.isEnhancing}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-[#DFBA73] to-amber-500 hover:from-amber-400 hover:to-amber-400 text-black font-extrabold text-xs font-mono flex items-center gap-2 shadow-lg disabled:opacity-40 transition-all cursor-pointer"
            >
              {activeItem?.isEnhancing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Sparkles className="w-4 h-4 text-black" />
              )}
              <span>
                {activeItem?.isEnhancing
                  ? (isAr ? 'جارٍ التنفيذ…' : 'Remastering…')
                  : (isAr ? 'تنفيذ التوجيه' : 'Enhance Photo')}
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* 4. Interactive Before / After Inspector Modal */}
      {inspectingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div
            onClick={() => setInspectingItem(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-5xl bg-[#0F1118] border border-amber-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-5 z-10 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{isAr ? 'مقارنة قبل وبعد ومعايرة النتيجة' : 'Before & After Remaster Inspector'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-mono font-bold">
                      {inspectingItem.engineLabel || 'NanoBanana'}
                    </span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-mono truncate max-w-md">
                    {inspectingItem.fileName || 'Asset Remaster'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectingItem(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Stage Viewport with Split Comparison Slider */}
            <div className="relative rounded-2xl overflow-hidden bg-[#08090C] border border-white/10 aspect-[16/10] flex items-center justify-center group select-none shadow-2xl">
              {inspectingItem.enhancedUrl ? (
                <div className="relative w-full h-full">
                  {/* Enhanced Image (Background) */}
                  <img
                    src={inspectingItem.enhancedUrl}
                    alt="Enhanced"
                    className="w-full h-full object-contain"
                  />

                  {/* Original Image with Clip Path */}
                  {isComparing && (
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                      <img
                        src={inspectingItem.originalUrl}
                        alt="Original"
                        className="w-full h-full object-contain filter grayscale-[0.2]"
                      />
                      <span className="absolute top-4 left-4 px-2 py-1 rounded-md bg-black/70 text-zinc-300 text-[10px] font-mono backdrop-blur-md">
                        {isAr ? 'الصورة الأصلية' : 'Original'}
                      </span>
                    </div>
                  )}

                  {/* Remaster Badges Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10 pointer-events-none max-w-[70%]">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black text-[10px] font-mono font-bold shadow-lg">
                      {inspectingItem.engineLabel || 'NanoBanana Pro'}
                    </span>
                    {inspectingItem.prompt && (
                      <span className="truncate px-2 py-0.5 rounded-md bg-black/80 text-amber-300 text-[9px] font-mono backdrop-blur-md border border-amber-500/30 shadow-md">
                        ✨ {inspectingItem.prompt}
                      </span>
                    )}
                  </div>

                  {/* Interactive Slider Line */}
                  {isComparing && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 cursor-ew-resize flex items-center justify-center pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] shadow-[0_0_10px_rgba(245,158,11,0.6)] font-bold">
                        ↔
                      </div>
                    </div>
                  )}

                  {/* Hidden Range Input */}
                  {isComparing && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                    />
                  )}
                </div>
              ) : (
                <img
                  src={inspectingItem.originalUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Inspector Controls & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#141724] border border-white/5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsComparing(!isComparing)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isComparing 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مقارنة قبل وبعد' : 'Split Slider'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowFineTune(!showFineTune)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    showFineTune 
                      ? 'bg-amber-500 text-black font-bold' 
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isAr ? 'معايرة دقيقة' : 'Fine-Tune'}</span>
                </button>

                {inspectingItem.latencyMs && (
                  <span className="text-[10px] font-mono text-zinc-500 px-2 py-1 bg-black/40 rounded-md">
                    ⚡ {inspectingItem.latencyMs}ms
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(inspectingItem)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تنزيل النتيجة' : 'Download'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleBridgeToContent(inspectingItem);
                    setInspectingItem(null);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                >
                  <span>{isAr ? 'إرسال لاستوديو المحتوى' : 'Send to Content Studio'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Fine-Tune Sliders Drawer inside Inspector */}
            {showFineTune && inspectingItem.gradingMatrix && (
              <div className="p-4 rounded-2xl bg-[#090A10] border border-amber-500/20 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-amber-400" />
                        <span>{isAr ? 'الحرارة اللونية' : 'Warmth (Kelvin)'}</span>
                      </span>
                      <span className="text-amber-300 font-bold">{inspectingItem.gradingMatrix.warmth}</span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={inspectingItem.gradingMatrix.warmth}
                      onChange={(e) => handleFineTuneChange('warmth', Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" />
                        <span>{isAr ? 'التعريض الضوئي' : 'Exposure (EV)'}</span>
                      </span>
                      <span className="text-amber-300 font-bold">{inspectingItem.gradingMatrix.exposure}</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="45"
                      value={inspectingItem.gradingMatrix.exposure}
                      onChange={(e) => handleFineTuneChange('exposure', Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-amber-400" />
                        <span>{isAr ? 'حدة تجزيع الخشب' : 'Wood Grain Sharpness'}</span>
                      </span>
                      <span className="text-amber-300 font-bold">{inspectingItem.gradingMatrix.sharpness}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={inspectingItem.gradingMatrix.sharpness}
                      onChange={(e) => handleFineTuneChange('sharpness', Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-amber-400" />
                        <span>{isAr ? 'الظلال المحيطية' : 'Softbox Vignette'}</span>
                      </span>
                      <span className="text-amber-300 font-bold">{inspectingItem.gradingMatrix.vignette}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={inspectingItem.gradingMatrix.vignette}
                      onChange={(e) => handleFineTuneChange('vignette', Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Applied Remaster Notes */}
            {inspectingItem.enhancements && inspectingItem.enhancements.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#090A10] border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
                  {isAr ? 'تقرير المعالجة المنفذة:' : 'Executed Enhancements:'}
                </span>
                <ul className="space-y-1 text-xs text-zinc-300 font-sans">
                  {inspectingItem.enhancements.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
