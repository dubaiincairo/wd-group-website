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
  Wand2
} from 'lucide-react';
import { VisualStudioItem } from './types';

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

export default function VisualStudio({
  isAr,
  onSendToContentStudio,
  showToast
}: VisualStudioProps) {
  const [items, setItems] = useState<VisualStudioItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>(PRESET_PROMPTS[0].promptEn);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      } catch (err) {
        // Fallback to base64
      }

      newItems.push({
        id: `vs_${Date.now()}_${i}`,
        originalUrl: finalUrl,
        prompt: customPrompt,
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    if (!activeItemId && newItems.length > 0) {
      setActiveItemId(newItems[0].id);
    }
    showToast(
      isAr ? `تم تحميل ${newItems.length} صورة بنجاح في الاستوديو البصري` : `Loaded ${newItems.length} photo(s) into Visual Studio`,
      'success'
    );
  };

  const handleEnhance = async (targetId?: string) => {
    const idToEnhance = targetId || activeItem?.id;
    if (!idToEnhance) return;

    const target = items.find((it) => it.id === idToEnhance);
    if (!target) return;

    setItems((prev) =>
      prev.map((it) => (it.id === idToEnhance ? { ...it, isEnhancing: true } : it))
    );

    try {
      const res = await fetch('/api/admin/ecommerce/ai-enhance-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: target.originalUrl,
          prompt: customPrompt,
        }),
      });

      const json = await res.json();
      if (json.success && json.enhancedUrl) {
        const engine = json.engine === 'nanobanana_pro_live'
          ? 'NanoBanana Pro Live'
          : json.engine === 'gemini_multimodal_studio_live'
          ? 'Google Cloud Studio'
          : 'Studio Neural Engine';

        setItems((prev) =>
          prev.map((it) =>
            it.id === idToEnhance
              ? {
                  ...it,
                  isEnhancing: false,
                  enhancedUrl: json.enhancedUrl,
                  engineLabel: engine,
                  latencyMs: json.latencyMs,
                  enhancements: json.enhancementsApplied,
                  gradingAnalysis: json.gradingAnalysis,
                }
              : it
          )
        );

        showToast(
          isAr
            ? `تم تحسين الصورة بنجاح عبر ${engine} (${json.latencyMs || 0}ms)`
            : `Image remastered via ${engine} (${json.latencyMs || 0}ms)`,
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

  const handleDownload = () => {
    if (!activeItem?.enhancedUrl) return;
    const a = document.createElement('a');
    a.href = activeItem.enhancedUrl;
    a.download = `wd_remaster_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(isAr ? 'بدأ تنزيل الصورة المحسنة بدقة فائقة' : 'Downloading remastered image', 'info');
  };

  const handleBridgeToContent = () => {
    if (!activeItem) return;
    const targetUrl = activeItem.enhancedUrl || activeItem.originalUrl;
    onSendToContentStudio(targetUrl, customPrompt);
    showToast(
      isAr 
        ? 'تم نقل الصورة المحسنة إلى استوديو المحتوى والكتالوج ➡️' 
        : 'Transferred remastered photo to Content Studio ➡️', 
      'success'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Studio Intro Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#141726]/80 to-[#0F1117] border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>{isAr ? 'استوديو المعالجة البصرية (Visual Studio)' : 'Visual Studio — Photo Enhancer'}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                NanoBanana Pro
              </span>
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isAr
                ? 'تحسين إضاءة قطع الأثاث، وإبراز تجزيع الأخشاب المصمتة، ومعايرة الظلال وضبط الخلفيات المعمارية بدقة 8K.'
                : 'Remaster lighting, enhance natural wood grains, eliminate harsh shadows, and apply pristine architectural studio backdrops.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
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

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Canvas & Comparison View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Stage Viewport */}
          <div className="relative rounded-3xl overflow-hidden bg-[#08090C] border border-white/10 aspect-[4/3] flex items-center justify-center group select-none shadow-2xl">
            {activeItem ? (
              <>
                {/* When Enhanced exists and comparing */}
                {activeItem.enhancedUrl ? (
                  <div className="relative w-full h-full">
                    {/* Enhanced Image (Background) */}
                    <img
                      src={activeItem.enhancedUrl}
                      alt="Enhanced"
                      className="w-full h-full object-contain"
                    />

                    {/* Original Image with Clip Path according to slider */}
                    {isComparing && (
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <img
                          src={activeItem.originalUrl}
                          alt="Original"
                          className="w-full h-full object-contain filter grayscale-[0.2]"
                        />
                        <span className="absolute top-4 left-4 px-2 py-1 rounded-md bg-black/70 text-zinc-300 text-[10px] font-mono backdrop-blur-md">
                          {isAr ? 'الصورة الأصلية' : 'Original'}
                        </span>
                      </div>
                    )}

                    {/* Enhanced Badge */}
                    <span className="absolute top-4 right-4 px-2 py-1 rounded-md bg-amber-500 text-black text-[10px] font-mono font-bold shadow-md">
                      {activeItem.engineLabel || 'NanoBanana Pro Remaster'}
                    </span>

                    {/* Interactive Slider Bar */}
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

                    {/* Hidden Range Input for smooth slider drag */}
                    {isComparing && (
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                        title={isAr ? 'اسحب لمقارنة قبل وبعد' : 'Drag to compare before & after'}
                      />
                    )}
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={activeItem.originalUrl}
                      alt="Piece"
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute top-4 left-4 px-2 py-1 rounded-md bg-black/70 text-zinc-300 text-[10px] font-mono backdrop-blur-md">
                      {isAr ? 'الصورة الأصلية (بانتظار المعالجة)' : 'Original (Ready for Enhancement)'}
                    </span>
                  </div>
                )}

                {/* Loading Overlay */}
                {activeItem.isEnhancing && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30 animate-in fade-in duration-200">
                    <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {isAr ? 'جارٍ المعالجة البصرية بـ NanoBanana Pro…' : 'Remastering Lighting via NanoBanana Pro…'}
                    </span>
                    <span className="text-[11px] text-zinc-400 max-w-xs text-center">
                      {isAr ? 'إعادة حساب انعكاسات الخشب والظلال المعمارية' : 'Recalculating wood speculars and shadow diffusion'}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-8 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">
                    {isAr ? 'لا توجد صور محملة حالياً' : 'No photos loaded in Visual Studio'}
                  </h5>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                    {isAr
                      ? 'قم برفع صورة أو عدة صور لقطع الأثاث للبدء في تحسينها بنموذج NanoBanana Pro.'
                      : 'Upload one or multiple photos to start enhancing with the NanoBanana Pro engine.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono cursor-pointer transition-colors"
                >
                  {isAr ? 'تصفح الملفات' : 'Browse Files'}
                </button>
              </div>
            )}
          </div>

          {/* Canvas Controls Bar */}
          {activeItem && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#141721] border border-white/5">
              <div className="flex items-center gap-2">
                {activeItem.enhancedUrl && (
                  <button
                    type="button"
                    onClick={() => setIsComparing(!isComparing)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isComparing 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{isAr ? 'مقارنة قبل وبعد' : 'Split Slider'}</span>
                  </button>
                )}
                {activeItem.latencyMs && (
                  <span className="text-[10px] font-mono text-zinc-500 px-2 py-1 bg-black/40 rounded-md">
                    ⚡ {activeItem.latencyMs}ms
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {activeItem.enhancedUrl && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    title={isAr ? 'تنزيل الصورة المحسنة' : 'Download Remaster'}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تنزيل' : 'Download'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleBridgeToContent}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                  title={isAr ? 'إرسال الصورة إلى استوديو المحتوى لتوليد المواصفات' : 'Send to Content Studio to extract specs'}
                >
                  <span>{isAr ? 'إرسال لاستوديو المحتوى' : 'Send to Content Studio'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* Thumbnail Strip (if multiple photos loaded) */}
          {items.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                    (activeItemId || items[0].id) === item.id
                      ? 'border-amber-400 scale-105 shadow-md'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.enhancedUrl || item.originalUrl}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  {item.enhancedUrl && (
                    <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-black text-[8px] font-mono font-bold text-center">
                      HD
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Prompt Engineering & Studio Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Prompt Engine Box */}
          <div className="p-4 rounded-3xl bg-[#141721] border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-amber-300" />
                <span>{isAr ? 'توجيهات نموذج NanoBanana Pro (Prompt)' : 'NanoBanana Pro Prompt Directive'}</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Custom Vision AI</span>
            </div>

            <textarea
              rows={4}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب توجيهات التحسين (مثال: إضاءة متحفية دافئة، إبراز تجزيع خشب الجوز، إزالة الظلال المزعجة)…'
                  : 'Enter photo enhancement directives (e.g. Warm museum lighting, solid walnut grain definition, neutral pedestal)...'
              }
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-amber-400 focus:ring-1 focus:ring-amber-400 leading-relaxed outline-none transition-all resize-none"
            />

            {/* Quick Inspiration Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                {isAr ? 'نماذج توجيهات سريعة جاهزة:' : 'Quick Prompt Presets:'}
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {PRESET_PROMPTS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setCustomPrompt(isAr ? preset.promptAr : preset.promptEn)}
                    className="text-left rtl:text-right p-2 rounded-xl bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 border border-white/5 text-[11px] text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="font-semibold">{isAr ? preset.labelAr : preset.labelEn}</span>
                    <span className="text-[9px] font-mono text-zinc-500 group-hover:text-amber-300">
                      {isAr ? 'تطبيق' : 'Apply'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => handleEnhance()}
              disabled={!activeItem || activeItem.isEnhancing}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-[#DFBA73] to-amber-500 hover:from-amber-400 hover:to-amber-400 text-black font-extrabold text-xs font-mono flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
            >
              {activeItem?.isEnhancing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Sparkles className="w-4 h-4 text-black" />
              )}
              <span>
                {activeItem?.isEnhancing
                  ? (isAr ? 'جارٍ تحسين الصورة بـ NanoBanana Pro…' : 'Remastering with NanoBanana Pro…')
                  : (isAr ? 'تحسين الصورة بـ NanoBanana Pro' : 'Enhance Photo with NanoBanana Pro')}
              </span>
            </button>
          </div>

          {/* Applied Enhancements & Grading Matrix */}
          {activeItem?.enhancements && activeItem.enhancements.length > 0 && (
            <div className="p-4 rounded-3xl bg-[#141721] border border-amber-500/20 space-y-2.5">
              <h5 className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'تقرير المعالجة الهندسية للقطعة' : 'Applied Architectural Remaster Report'}</span>
              </h5>
              <ul className="space-y-1 text-[11px] text-zinc-300 font-sans">
                {activeItem.enhancements.map((note, nIdx) => (
                  <li key={nIdx} className="flex items-start gap-2">
                    <span className="text-amber-400 text-xs mt-0.5">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
