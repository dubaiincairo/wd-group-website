'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Zap,
  Key,
  AlertTriangle,
  ExternalLink
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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  const handleSliderPointerMove = (clientX: number) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(Math.round(pct));
  };

  const handleSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isComparing) return;
    e.preventDefault();
    setIsDraggingSlider(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
    handleSliderPointerMove(e.clientX);
  };

  const handleSliderPointerMoveEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSlider) return;
    handleSliderPointerMove(e.clientX);
  };

  const handleSliderPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingSlider(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  // Gemini API Key & Connection State
  const [apiKey, setApiKey] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [keyInput, setKeyInput] = useState<string>('');
  const [isTestingKey, setIsTestingKey] = useState<boolean>(false);
  const [isSavingKey, setIsSavingKey] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const activeItem = items.find((it) => it.id === activeItemId) || items[0] || null;

  // Check saved key on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wd_gemini_api_key');
      if (stored) {
        setApiKey(stored);
        setKeyInput(stored);
        setHasApiKey(true);
      }
    }

    // Ping test connection to verify server-side key
    fetch('/api/admin/integrations/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service: 'GoogleCloud' }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setHasApiKey(true);
        }
      })
      .catch(() => {});
  }, []);

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

  // Process incoming files (from upload button or drag-and-drop)
  const processFiles = async (fileList: File[]) => {
    if (!fileList || fileList.length === 0) return;
    const imageFiles = fileList.filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      showToast(isAr ? 'يرجى اختيار ملفات صور صالحة (PNG/JPEG)' : 'Please select valid image files', 'error');
      return;
    }

    const newItems: VisualStudioItem[] = [];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processFiles(Array.from(files));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Test Key ping
  const handleTestKey = async () => {
    if (!keyInput.trim()) return;
    setIsTestingKey(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/integrations/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: 'GoogleCloud', key: keyInput.trim() }),
      });
      const json = await res.json();
      setTestResult({
        success: json.success,
        message: json.message || json.error || 'Test completed',
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Failed to connect to Google API',
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  // Save Key to DB and client
  const handleSaveKey = async () => {
    if (!keyInput.trim()) return;
    setIsSavingKey(true);
    try {
      const res = await fetch('/api/admin/integrations/set-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: 'Gemini', key: keyInput.trim() }),
      });
      const json = await res.json();
      if (json.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('wd_gemini_api_key', keyInput.trim());
        }
        setApiKey(keyInput.trim());
        setHasApiKey(true);
        setShowKeyModal(false);
        showToast(
          isAr ? 'تم تفعيل مفتاح Google Gemini بنجاح للاستوديو' : 'Gemini API Key activated for live generative editing!',
          'success'
        );
      } else {
        throw new Error(json.error || 'Failed to save key');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to save key', 'error');
    } finally {
      setIsSavingKey(false);
    }
  };

  // REAL GENERATIVE ENHANCE HANDLER — ZERO FAKE FALLBACKS
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

    const activeLocalKey = apiKey || (typeof window !== 'undefined' ? localStorage.getItem('wd_gemini_api_key') || '' : '');

    try {
      const res = await fetch('/api/admin/ecommerce/ai-enhance-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: target.originalUrl,
          prompt: currentPromptText,
          model: selectedModel,
          apiKey: activeLocalKey || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        if (json.apiKeyMissing) {
          setShowKeyModal(true);
          showToast(
            isAr
              ? 'مطلوب إدخال مفتاح Google Gemini لتنفيذ التعديل وإضافة العناصر. يرجى ربط المفتاح.'
              : 'Google Gemini API Key is required for generative editing. Please connect your key.',
            'error'
          );
        } else {
          showToast(json.error || (isAr ? 'فشل تنفيذ التوجيه' : 'Enhancement failed'), 'error');
        }
        setItems((prev) =>
          prev.map((it) => (it.id === idToEnhance ? { ...it, isEnhancing: false } : it))
        );
        return;
      }

      // GENUINE GENERATIVE SUCCESS: Use the real returned image
      const modelLabel = selectedModel === 'nanobanana_2' ? 'NanoBanana 2' : 'NanoBanana Pro';
      const finalEnhancedUrl = json.enhancedUrl;

      const updatedItem: VisualStudioItem = {
        ...target,
        isEnhancing: false,
        enhancedUrl: finalEnhancedUrl,
        prompt: currentPromptText,
        modelType: selectedModel,
        engineLabel: json.engine || modelLabel,
        latencyMs: json.latencyMs,
        enhancements: json.enhancementsApplied,
      };

      setItems((prev) =>
        prev.map((it) => (it.id === idToEnhance ? updatedItem : it))
      );

      // Open inspection comparison modal
      setInspectingItem(updatedItem);

      showToast(
        isAr
          ? `تم تنفيذ التوجيه وتعديل الصورة بنجاح عبر ${json.engine || modelLabel}`
          : `Successfully generated photo edit via ${json.engine || modelLabel} (${json.latencyMs || 0}ms)`,
        'success'
      );
    } catch (err: any) {
      setItems((prev) =>
        prev.map((it) => (it.id === idToEnhance ? { ...it, isEnhancing: false } : it))
      );
      showToast(err.message || (isAr ? 'فشل تحسين الصورة' : 'Enhancement failed'), 'error');
    }
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
    <div className="space-y-6 relative flex flex-col min-h-[560px]">
      
      {/* 1. Header Toolbar (Single Unified Upload CTA + Live API Key Status) */}
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
                ? 'اختر أي صورة من المعرض أدناه لكتابة توجيهات التحسين والتعديل بنموذج NanoBanana.'
                : 'Select any photo card from the gallery below to apply NanoBanana prompt directives.'}
            </p>
          </div>
        </div>

        {/* Action Controls: API Status Pill & Single Upload CTA */}
        <div className="flex items-center gap-2.5">
          {hasApiKey ? (
            <button
              type="button"
              onClick={() => setShowKeyModal(true)}
              className="px-3 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title={isAr ? 'مفتاح Gemini متصل ونشط' : 'Gemini API Key Connected'}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'NanoBanana متصل' : 'NanoBanana Live'}</span>
              <Sliders className="w-3.5 h-3.5 opacity-60 ml-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowKeyModal(true)}
              className="px-3 py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer animate-pulse"
              title={isAr ? 'مطلوب إدخال مفتاح Gemini API' : 'Google Gemini API Key Required'}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{isAr ? 'ربط مفتاح Gemini' : 'Connect Gemini Key'}</span>
              <Key className="w-3.5 h-3.5 ml-0.5" />
            </button>
          )}

          {/* The ONLY Upload CTA Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isAr ? 'رفع صور جديدة' : 'Upload Photos'}</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* 2. Gallery Area (Clean Grid when items exist, Spatially Isolated Dropzone when empty) */}
      {items.length > 0 ? (
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
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

                  {/* Bottom Overlay: Camera Icon + File Name (Google Flow Structure) */}
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
                        title={isAr ? 'معاينة النتيجة' : 'Inspect Result'}
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
                        {isAr ? 'جارٍ التوليد والمعالجة…' : 'Generating Edit…'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Dock when items exist (Cleanly pinned with gradient background) */}
          <div className="sticky bottom-0 z-30 pt-4 pb-2 bg-gradient-to-t from-[#0B0D14] via-[#0B0D14]/95 to-transparent">
            {renderPromptBar(true)}
          </div>
        </div>
      ) : (
        /* Empty State (ZERO OVERLAP: Dropzone and Standby Dock cleanly stacked in natural flow) */
        <div className="flex-1 flex flex-col justify-between space-y-6">
          
          {/* Interactive Drag & Drop Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed transition-all p-10 sm:p-14 text-center space-y-4 cursor-pointer group select-none ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : 'border-white/15 hover:border-amber-400/40 bg-[#0D0F18]/50 hover:bg-[#121422]/50'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h5 className="text-base font-bold text-white">
                {isAr ? 'اسحب صور الأثاث وأفلتها هنا، أو اضغط للاختيار' : 'Drag & drop photos here, or click to browse'}
              </h5>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                {isAr
                  ? 'ارفع صور الكتالوج لبدء التعديل الذكي وإضافة الخلفيات والعناصر بنموذج NanoBanana.'
                  : 'Upload product photography to apply generative scene editing, background replacement, and architectural lighting.'}
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 group-hover:bg-amber-500 group-hover:text-black border border-white/10 text-zinc-200 text-xs font-mono font-bold transition-all shadow-md">
                <UploadCloud className="w-4 h-4" />
                <span>{isAr ? 'اختيار صور من الجهاز' : 'Browse Local Files'}</span>
              </span>
            </div>
          </div>

          {/* Standby Prompt Dock (IN NORMAL FLOW - NO OVERLAP!) */}
          <div className="relative z-10 pt-2">
            {renderPromptBar(false)}
          </div>
        </div>
      )}

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
                    <span>{isAr ? 'مقارنة قبل وبعد ومعاينة التوليد' : 'Before & After Inspection'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-mono font-bold">
                      {inspectingItem.engineLabel || 'NanoBanana Live'}
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
                className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Comparison Viewport */}
            <div
              ref={viewportRef}
              dir="ltr"
              onPointerDown={handleSliderPointerDown}
              onPointerMove={handleSliderPointerMoveEvent}
              onPointerUp={handleSliderPointerUp}
              onPointerCancel={handleSliderPointerUp}
              className={`relative aspect-[16/10] max-h-[55vh] rounded-2xl overflow-hidden bg-black select-none border border-white/10 shadow-inner ${
                isComparing ? 'cursor-ew-resize touch-none' : ''
              }`}
            >
              
              {/* Layer 1: Enhanced (AI Generated Result) */}
              <img
                src={inspectingItem.enhancedUrl || inspectingItem.originalUrl}
                alt="AI Result"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
              />

              {/* Layer 2: Original Source Image clipped seamlessly by slider position */}
              {isComparing && (
                <div
                  className="absolute inset-0 pointer-events-none select-none"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <img
                    src={inspectingItem.originalUrl}
                    alt="Original Source"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>
              )}

              {/* Badges: Original (Left) and AI Result (Right) */}
              {isComparing && sliderPosition > 12 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 z-20 pointer-events-none shadow-md">
                  {isAr ? 'الأصلية' : 'Original'}
                </div>
              )}

              {sliderPosition < 88 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-black text-[10px] font-mono font-bold shadow-md z-20 pointer-events-none">
                  {isAr ? 'المعدلة بالذكاء الاصطناعي' : 'AI Generated Result'}
                </div>
              )}

              {/* Applied Prompt Pill */}
              {inspectingItem.prompt && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                  <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-mono text-amber-300 truncate max-w-xl shadow-lg">
                    ✨ {inspectingItem.prompt}
                  </div>
                </div>
              )}

              {/* Draggable Divider Line & Thumb */}
              {isComparing && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-20 pointer-events-none shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-black shadow-2xl flex items-center justify-center font-bold text-xs pointer-events-none border-2 border-black/40 select-none">
                    ↔
                  </div>
                </div>
              )}

              {/* Accessible Range Input for Keyboard / Screen Readers */}
              {isComparing && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  dir="ltr"
                  className="sr-only"
                  aria-label="Before and after comparison slider"
                />
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsComparing(!isComparing)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  {isComparing ? (isAr ? 'عرض النتيجة فقط' : 'Hide Split Slider') : (isAr ? 'عرض المقارنة' : 'Show Split Slider')}
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

            {/* Executed Enhancements Report */}
            {inspectingItem.enhancements && inspectingItem.enhancements.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#090A10] border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
                  {isAr ? 'تقرير التوليد المنفذ:' : 'Executed Generation Report:'}
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

      {/* 5. Connect Gemini API Key Modal (Zero Fake Notification Solution) */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            onClick={() => setShowKeyModal(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />
          <div className="relative w-full max-w-lg bg-[#0F1118] border border-amber-500/40 rounded-3xl p-6 text-white shadow-2xl space-y-4 z-10">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? 'ربط مفتاح Google Gemini API' : 'Connect Google Gemini API Key'}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-400">
                    {isAr ? 'محرك NanoBanana 2 & NanoBanana Pro' : 'NanoBanana 2 & NanoBanana Pro Engine'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanatory Context */}
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isAr
                ? 'لتنفيذ التعديلات التوليدية المباشرة (مثل: إضافة خلفية سوداء، إضافة شجرة بجانب الكرسي، وتغيير الإضاءة الحقيقية)، يتطلب محرك NanoBanana مفتاح Gemini API من Google.'
                : 'To perform live generative image editing (such as adding black backdrops, trees, scene elements, and neural lighting), the NanoBanana engine requires a Google Gemini API Key.'}
            </p>

            {/* Input Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">
                GOOGLE_CLOUD_API_KEY / GEMINI_API_KEY
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#141721] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:border-amber-400 outline-none"
                dir="ltr"
              />
            </div>

            {/* Test Ping Result */}
            {testResult && (
              <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                testResult.success 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}>
                {testResult.success ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="truncate">{testResult.message}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1 font-mono underline"
              >
                <span>{isAr ? 'الحصول على مفتاح مجاني (Google AI Studio)' : 'Get Free Key (Google AI Studio)'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleTestKey}
                  disabled={isTestingKey || !keyInput.trim()}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-mono disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isTestingKey && <RefreshCw className="w-3 h-3 animate-spin" />}
                  <span>{isAr ? 'فحص المفتاح' : 'Test Ping'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveKey}
                  disabled={isSavingKey || !keyInput.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#DFBA73] hover:from-amber-400 hover:to-amber-400 text-black font-bold text-xs font-mono disabled:opacity-40 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {isSavingKey && <RefreshCw className="w-3 h-3 animate-spin text-black" />}
                  <span>{isAr ? 'حفظ وتفعيل' : 'Save & Activate'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );

  // Helper renderer for prompt bar (used in docked or standby mode)
  function renderPromptBar(hasItems: boolean) {
    return (
      <div className="w-full rounded-3xl bg-[#12141F]/95 backdrop-blur-xl border border-white/15 p-3.5 shadow-2xl space-y-2.5">
        
        {/* Active Attached Image Chip / Standby Notice */}
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
                  {activeItem.enhancedUrl ? (isAr ? 'تم التعديل والتوليد' : 'Generated Edit Ready') : (isAr ? 'جاهزة للتحسين' : 'Ready to enhance')}
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
            {hasItems 
              ? (isAr ? '👆 اضغط على أي صورة في المعرض أعلاه لمعالجتها' : '👆 Click any photo card in the gallery above to select it')
              : (isAr ? '✨ قم برفع الصور في الأعلى لتفعيل أوامر التعديل والتوليد' : '✨ Upload photos above to activate generative prompt directives')}
          </div>
        )}

        {/* Prompt Input Box */}
        <div className="relative">
          <textarea
            rows={2}
            value={customPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            disabled={!hasItems && !activeItem}
            placeholder={
              isAr
                ? 'اكتب توجيه التعديل المطلوب (مثال: أضف خلفية سوداء وشجرة خضراء بجانب الكرسي، إضاءة أجنحة القصور 4500K)…'
                : 'What do you want to create or enhance? (e.g. add a black backdrop and add a green tree beside the chair)...'
            }
            className="w-full px-3.5 py-2 rounded-2xl bg-[#08090C] border border-white/10 text-white text-xs focus:border-amber-400 focus:ring-1 focus:ring-amber-400 leading-relaxed outline-none transition-all resize-none disabled:opacity-50"
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
                ? (isAr ? 'جارٍ التوليد…' : 'Generating…')
                : (isAr ? 'تنفيذ التوجيه' : 'Enhance Photo')}
            </span>
          </button>

        </div>

      </div>
    );
  }
}
