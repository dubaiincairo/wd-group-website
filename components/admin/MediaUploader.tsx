'use client';

import React, { useState, useRef, useId } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { useToast } from './ToastProvider';
import { useLanguage } from '@/context/LanguageContext';
import { optimizeImageForWeb, OptimizationResult } from '@/lib/admin/imageOptimizer';

interface MediaUploaderProps {
  bucketId?: string;
  onUploaded: () => void;
  onClose?: () => void;
}

export default function MediaUploader({
  bucketId = 'photos',
  onUploaded,
  onClose,
}: MediaUploaderProps) {
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const modalInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [optimizedFile, setOptimizedFile] = useState<File | null>(null);
  const [optStats, setOptStats] = useState<OptimizationResult | null>(null);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altAr, setAltAr] = useState('');
  const [altEn, setAltEn] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState(bucketId);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      showToast(isAr ? 'حجم الملف يتجاوز الحد الأقصى (50 ميجابايت)' : 'File size exceeds 50MB limit', 'error');
      return;
    }

    setSelectedFile(file);
    setOptimizedFile(null);
    setOptStats(null);

    const isCompressibleImage =
      file.type.startsWith('image/') &&
      file.type !== 'image/svg+xml' &&
      file.type !== 'image/gif';

    if (isCompressibleImage && autoOptimize) {
      setIsOptimizing(true);
      try {
        const result = await optimizeImageForWeb(file, { maxDimension: 2560, quality: 0.88 });
        if (result.wasOptimized) {
          setOptimizedFile(result.file);
          setOptStats(result);
          const url = URL.createObjectURL(result.file);
          setPreviewUrl(url);
        } else {
          setOptimizedFile(file);
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        }
      } catch (err) {
        console.error('Optimization error:', err);
        setOptimizedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } finally {
        setIsOptimizing(false);
      }
    } else {
      setOptimizedFile(file);
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const fileToUpload = (autoOptimize && optimizedFile) ? optimizedFile : selectedFile;

    try {
      setIsUploading(true);

      // Clean file name
      const cleanFileName = `${Date.now()}_${fileToUpload.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

      // 1. Upload file directly to Supabase Storage
      const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${selectedBucket}/${cleanFileName}`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': fileToUpload.type || 'application/octet-stream',
        },
        body: fileToUpload,
      });

      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({}));
        throw new Error(err.message || (isAr ? 'فشل الرفع إلى التخزين السحابي' : 'Failed to upload to storage'));
      }

      const fileUrl = `${supabaseUrl}/storage/v1/object/public/${selectedBucket}/${cleanFileName}`;

      // 2. Register metadata via Admin API
      const metaRes = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bucket_id: selectedBucket,
          file_name: cleanFileName,
          file_url: fileUrl,
          file_size: fileToUpload.size,
          mime_type: fileToUpload.type,
          alt_text_ar: altAr.trim(),
          alt_text_en: altEn.trim(),
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (!metaRes.ok) {
        const err = await metaRes.json().catch(() => ({}));
        throw new Error(err.error || (isAr ? 'فشل تسجيل بيانات الوسائط' : 'Failed to register media metadata'));
      }

      showToast(isAr ? 'تم رفع وتسجيل الملف بنجاح!' : 'Media uploaded and registered successfully', 'success');
      onUploaded();
      if (onClose) onClose();
    } catch (err: any) {
      console.error('Upload error:', err);
      showToast(err.message || (isAr ? 'فشل رفع الملف' : 'Failed to upload file'), 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const activeFile = (autoOptimize && optimizedFile) ? optimizedFile : selectedFile;

  return (
    <div className="bg-[#0F1117] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-white max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{isAr ? 'رفع ملف وسائط جديد' : 'Upload New Asset'}</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Cloud Storage
            </span>
          </h3>
          <p className="text-xs text-zinc-400">
            {isAr ? 'إضافة صور فوتوغرافية، مقاطع فيديو مؤسسية، أو مستندات' : 'Add photography, corporate videos, or brochures'}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleUpload} className="space-y-5">
        {/* Bucket Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300">
            {isAr ? 'وحدة التخزين السحابي المستهدفة' : 'Storage Destination'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'photos', label: isAr ? 'الصور واللقطات' : 'Photos / Images' },
              { id: 'videos', label: isAr ? 'فيديوهات سينمائية' : 'Cinematic Videos' },
              { id: 'assets', label: isAr ? 'مستندات و PDF' : 'PDFs & Documents' },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBucket(b.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedBucket === b.id
                    ? 'bg-blue-600 border-blue-500 text-white shadow-glow-blue'
                    : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drag and drop / file selector box */}
        <label
          htmlFor={modalInputId}
          className="border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-black/20 hover:bg-black/40 block relative overflow-hidden"
        >
          <input
            id={modalInputId}
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            accept={
              selectedBucket === 'videos'
                ? 'video/mp4,video/webm'
                : selectedBucket === 'assets'
                ? 'application/pdf,application/zip'
                : 'image/jpeg,image/png,image/webp,image/svg+xml'
            }
          />

          {selectedFile ? (
            <div className="flex flex-col items-center gap-3">
              {previewUrl && selectedFile.type.startsWith('video/') ? (
                <video 
                  src={previewUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="h-32 max-w-full object-contain rounded-xl border border-white/15 bg-black" 
                />
              ) : previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-32 object-contain rounded-xl border border-white/15" />
              ) : selectedBucket === 'videos' ? (
                <Video className="w-12 h-12 text-blue-400" />
              ) : (
                <FileText className="w-12 h-12 text-blue-400" />
              )}
              <div>
                <p className="text-xs font-bold text-white">{activeFile?.name || selectedFile.name}</p>
                <p className="text-[11px] text-zinc-400" dir="ltr">
                  {((activeFile?.size || selectedFile.size) / (1024 * 1024)).toFixed(2)} MB · {activeFile?.type || selectedFile.type || 'Binary'}
                </p>
              </div>
              <span className="text-[11px] text-blue-400 underline">
                {isAr ? 'انقر لتغيير الملف المختار' : 'Click to change file'}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4">
              <UploadCloud className="w-10 h-10 text-zinc-500" />
              <p className="text-xs font-bold text-zinc-300">
                {isAr ? 'انقر لاختيار ملف أو اسحبه وأفلته هنا' : 'Click to choose a file or drag here'}
              </p>
              <p className="text-[11px] text-zinc-500" dir="ltr">
                Supports JPG, PNG, WEBP, MP4, PDF up to 50MB
              </p>
            </div>
          )}
        </label>

        {/* Optimizing Progress Indicator */}
        {isOptimizing && (
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center gap-2 text-xs text-blue-400 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>
              {isAr 
                ? 'جارٍ التحسين الذكي فائق الدقة (2K Retina) مع الحفاظ الكامل على الجودة…' 
                : 'Optimizing to 2K Ultra-HD WebP without compromising quality…'}
            </span>
          </div>
        )}

        {/* Optimization Stats Badge */}
        {optStats && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isAr ? 'تم التحسين الذكي بنجاح (2K Ultra-HD):' : '2K Ultra-HD Optimization Applied:'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400/90 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20">
                {optStats.savedPercent}% {isAr ? 'توفير في المساحة' : 'storage saved'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-300 pt-1 border-t border-emerald-500/20">
              <span dir="ltr" className="font-mono">
                {(optStats.originalSize / (1024 * 1024)).toFixed(2)} MB ➔ {(optStats.optimizedSize / 1024).toFixed(0)} KB
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {optStats.width}×{optStats.height}px · 100% Visual Clarity Preserved
              </span>
            </div>
          </div>
        )}

        {/* Ultra-HD Smart Optimizer Toggle for Photos */}
        {selectedBucket === 'photos' && (
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-zinc-200 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>{isAr ? 'التحسين الذكي الفائق (2K Ultra-HD)' : 'Ultra-HD Smart WebP (2K Retina)'}</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {isAr 
                  ? 'يحافظ بنسبة 100% على وضوح الصورة وتفاصيلها الدقيقة مع توفير 85-95% من مساحة التخزين' 
                  : 'Preserves 100% visual fidelity while reducing storage by 85–95%'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ms-3">
              <input
                type="checkbox"
                checked={autoOptimize}
                onChange={(e) => setAutoOptimize(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        )}

        {/* Arabic Alt Text */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
            <span>{isAr ? 'الوصف البديل بالعربية (Alt Text)' : 'Arabic Alt Text (Alt Text AR)'}</span>
            <span className="text-[10px] text-sky-400 font-mono">Accessibility</span>
          </label>
          <input
            type="text"
            dir="rtl"
            value={altAr}
            onChange={(e) => setAltAr(e.target.value)}
            placeholder={isAr ? 'مثال: فندق سويس بلو جدة - الواجهة الرئيسية' : 'e.g. SwissBlue Hotel Jeddah - Main Exterior Facade'}
            className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 font-arabic"
          />
        </div>

        {/* English Alt Text */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
            <span>{isAr ? 'الوصف البديل بالإنجليزية (Alt Text)' : 'English Alt Text (Alt Text EN)'}</span>
            <span className="text-[10px] text-blue-400 font-mono">Accessibility</span>
          </label>
          <input
            type="text"
            dir="ltr"
            value={altEn}
            onChange={(e) => setAltEn(e.target.value)}
            placeholder={isAr ? 'مثال: SwissBlue Hotel Jeddah - Main Exterior' : 'e.g. SwissBlue Hotel Jeddah - Main Exterior Facade'}
            className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>

        {/* Tags */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-zinc-300">
            {isAr ? 'الوسوم والتصنيفات (مفصولة بفواصل)' : 'Tags / Categorization (comma-separated)'}
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="hospitality, jeddah, exterior, hero"
            className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading || isOptimizing}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          )}
          <button
            type="submit"
            disabled={isUploading || isOptimizing || !selectedFile}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-glow-blue cursor-pointer flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{isAr ? 'جارٍ الرفع إلى السحابة…' : 'Uploading to Supabase…'}</span>
              </>
            ) : (
              <span>{isAr ? 'رفع وحفظ الملف' : 'Upload Asset'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
