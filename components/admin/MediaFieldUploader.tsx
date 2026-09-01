'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import Image from 'next/image';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  FileText,
  FileCode,
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  FolderOpen,
  Eye,
  AlertCircle,
  Download
} from 'lucide-react';
import { useToast } from './ToastProvider';
import { useLanguage } from '@/context/LanguageContext';

interface MediaFieldUploaderProps {
  label: string;
  description?: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: 'image' | 'video' | 'pdf' | 'document' | 'any';
  bucket?: 'photos' | 'videos' | 'documents' | 'assets';
  aspectRatio?: '1:1' | '16:9' | 'auto';
}

export default function MediaFieldUploader({
  label,
  description,
  value = '',
  onChange,
  accept = 'image',
  bucket = 'photos',
  aspectRatio = 'auto',
}: MediaFieldUploaderProps) {
  const inputId = useId();
  const { showToast } = useToast();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [value]);

  const isPdf = accept === 'pdf' || accept === 'document' || (typeof value === 'string' && value.toLowerCase().endsWith('.pdf'));
  const isVideo = !isPdf && (accept === 'video' || (typeof value === 'string' && (value.endsWith('.mp4') || value.endsWith('.webm') || value.includes('/videos/'))));

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // File type validation for PDF mode
    if (isPdf) {
      const isFilePdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isFilePdf) {
        showToast(
          isAr 
            ? 'يرجى اختيار ملف بصيغة PDF فقط (.pdf)' 
            : 'Please select a valid PDF file only (.pdf)', 
          'error'
        );
        return;
      }
    }

    // File size limits (50MB)
    if (file.size > 50 * 1024 * 1024) {
      showToast(isAr ? 'حجم الملف يتجاوز الحد الأقصى (50 ميجابايت)' : 'File exceeds 50MB limit', 'error');
      return;
    }

    try {
      setUploading(true);
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

      const primaryBucket = isPdf ? (bucket === 'photos' || bucket === 'documents' ? 'assets' : bucket) : (accept === 'video' ? 'videos' : (bucket === 'documents' ? 'assets' : bucket));
      let effectiveBucket = primaryBucket;

      // 1. Upload to Supabase Storage
      let res = await fetch(`${supabaseUrl}/storage/v1/object/${effectiveBucket}/${cleanFileName}`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': file.type || (isPdf ? 'application/pdf' : accept === 'video' ? 'video/mp4' : 'image/jpeg'),
        },
        body: file,
      });

      // Fallback if bucket does not exist
      if (!res.ok && (effectiveBucket !== 'assets' && effectiveBucket !== 'photos')) {
        effectiveBucket = isPdf ? 'assets' : 'photos';
        res = await fetch(`${supabaseUrl}/storage/v1/object/${effectiveBucket}/${cleanFileName}`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': file.type || (isPdf ? 'application/pdf' : accept === 'video' ? 'video/mp4' : 'image/jpeg'),
          },
          body: file,
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || (isAr ? 'فشل رفع الملف إلى السحابة' : 'Storage upload failed'));
      }

      const fileUrl = `${supabaseUrl}/storage/v1/object/public/${effectiveBucket}/${cleanFileName}`;

      // 2. Register media in database
      try {
        await fetch('/api/admin/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bucket_id: effectiveBucket,
            file_name: cleanFileName,
            file_url: fileUrl,
            file_size: file.size,
            mime_type: file.type || (isPdf ? 'application/pdf' : 'application/octet-stream'),
            alt_text_en: label,
            tags: [isPdf ? 'pdf' : accept, effectiveBucket],
          }),
        });
      } catch (e) {
        // Silently continue if audit/metadata logging fails
      }

      onChange(fileUrl);
      showToast(
        isAr 
          ? (isPdf ? 'تم رفع ملف الـ PDF بنجاح!' : accept === 'video' ? 'تم رفع مقطع الفيديو بنجاح!' : 'تم رفع الصورة بنجاح!')
          : (isPdf ? 'PDF file uploaded successfully!' : accept === 'video' ? 'Video uploaded successfully!' : 'Photo uploaded successfully!'), 
        'success'
      );
    } catch (err: any) {
      console.error('Upload error:', err);
      showToast(err.message || (isAr ? 'فشل الرفع' : 'Upload failed'), 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Get Clean File Name for PDF Display
  const getPdfFileName = (url: string) => {
    if (!url) return '';
    try {
      const parts = url.split('/');
      const last = parts[parts.length - 1];
      // remove timestamp prefix if any (e.g. 17882538_profile.pdf -> profile.pdf)
      return decodeURIComponent(last.replace(/^\d+_/, ''));
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-2 p-3.5 rounded-2xl bg-[#08090C] border border-white/10 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-white flex items-center gap-1.5">
            {isPdf ? (
              <FileText className="w-3.5 h-3.5 text-rose-400" />
            ) : accept === 'video' ? (
              <VideoIcon className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>{label}</span>
          </label>
          {description && <p className="text-[10px] text-zinc-400 mt-0.5">{description}</p>}
        </div>

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>{isAr ? 'إزالة' : 'Remove'}</span>
          </button>
        )}
      </div>

      {/* Media Preview & Dropzone */}
      <div className={`grid grid-cols-1 ${aspectRatio === '1:1' ? 'sm:grid-cols-12' : 'sm:grid-cols-12'} gap-3 items-center`}>
        
        {/* Preview Box */}
        <div className={`${aspectRatio === '1:1' ? 'sm:col-span-3 w-28 h-28 aspect-square' : 'sm:col-span-4 h-28'} rounded-xl bg-zinc-900 border border-white/10 overflow-hidden relative flex items-center justify-center group shrink-0 mx-auto sm:mx-0`}>
          {value && !hasError ? (
            isPdf ? (
              // Dedicated High-End PDF Document Preview Card
              <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full bg-gradient-to-br from-rose-950/40 via-[#0E1017] to-black relative select-none border border-rose-500/20">
                <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-1.5 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-400 px-1.5 py-0.5 bg-rose-500/10 rounded border border-rose-500/20 mb-1">
                  PDF DOC
                </span>
                <span className="text-[10px] text-zinc-300 font-mono truncate max-w-[120px] block px-1" title={getPdfFileName(value)}>
                  {getPdfFileName(value)}
                </span>
              </div>
            ) : isVideo ? (
              <video
                src={value}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
                onError={() => setHasError(true)}
              />
            ) : (
              <img
                src={value}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={() => setHasError(true)}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center p-3 text-center w-full h-full bg-[#0B0D14] select-none">
              {isPdf ? (
                <div className="flex flex-col items-center justify-center text-zinc-600 gap-1">
                  <FileText className="w-7 h-7 text-zinc-600" />
                  <span className="text-[10px] font-mono text-zinc-500">
                    {isAr ? 'لا يوجد ملف PDF' : 'No PDF attached'}
                  </span>
                </div>
              ) : (
                <div className={`relative ${aspectRatio === '1:1' ? 'h-7 w-20' : 'h-8 w-28'} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  <Image
                    src="/brand/wd-group-logo-white.png"
                    alt="WD Group"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          )}

          {/* Quick Overlay Link */}
          {value && !hasError && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs gap-1.5 transition-opacity backdrop-blur-xs font-semibold"
            >
              {isPdf ? <ExternalLink className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isPdf ? (isAr ? 'عرض الـ PDF' : 'Open PDF') : (isAr ? 'معاينة' : 'Preview')}</span>
            </a>
          )}
        </div>

        {/* Upload Controls */}
        <div className={`${aspectRatio === '1:1' ? 'sm:col-span-9' : 'sm:col-span-8'} space-y-2`}>
          
          {/* Drag & Drop Upload Zone (Native Label + File Input) */}
          <label
            htmlFor={inputId}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`cursor-pointer border border-dashed rounded-xl px-4 py-2.5 block text-center transition-all ${
              dragOver
                ? isPdf 
                  ? 'border-rose-400 bg-rose-500/10' 
                  : 'border-blue-400 bg-blue-500/10'
                : isPdf
                  ? 'border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-500/40'
                  : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <input
              id={inputId}
              ref={fileInputRef}
              type="file"
              accept={isPdf ? 'application/pdf,.pdf' : accept === 'video' ? 'video/mp4,video/webm' : 'image/*'}
              className="sr-only"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
            />

            {uploading ? (
              <div className={`flex items-center justify-center gap-2 text-xs ${isPdf ? 'text-rose-400' : 'text-blue-400'} font-mono`}>
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span>
                  {isAr 
                    ? (isPdf ? 'جارٍ رفع ملف الـ PDF إلى التخزين السحابي…' : 'جارٍ الرفع إلى التخزين السحابي…')
                    : (isPdf ? 'Uploading PDF Document to Cloud…' : 'Uploading to Cloud Storage…')}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-300 whitespace-nowrap overflow-hidden">
                {isPdf ? (
                  <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <UploadCloud className="w-4 h-4 text-blue-400 shrink-0" />
                )}
                <span className="font-semibold text-white">
                  {isAr 
                    ? (isPdf ? 'رفع ملف PDF' : accept === 'video' ? 'رفع مقطع فيديو' : 'رفع صورة جديدة')
                    : (isPdf ? 'Upload PDF File' : accept === 'video' ? 'Upload Video' : 'Upload Photo')}
                </span>
                <span className="text-[11px] text-zinc-500 font-normal">
                  {isAr 
                    ? (isPdf ? '(أو اسحب ملف الـ PDF هنا)' : '(أو اسحب الملف هنا)')
                    : (isPdf ? '(or drag & drop PDF)' : '(or drag & drop)')}
                </span>
              </div>
            )}
          </label>

          {/* Direct URL Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              dir="ltr"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={
                isPdf
                  ? (isAr ? 'أو الصق رابط ملف الـ PDF المباشر (مثل: https://.../profile.pdf)…' : 'Or paste direct PDF URL (e.g. https://.../profile.pdf)…')
                  : (isAr ? 'أو الصق رابط الصورة / الفيديو المباشر…' : 'Or paste image/video URL…')
              }
              className={`w-full px-3 py-1.5 rounded-lg bg-black/50 border ${isPdf ? 'border-rose-500/20 focus:border-rose-400' : 'border-white/10 focus:border-blue-500'} text-white text-xs font-mono placeholder:text-zinc-600 focus:outline-none`}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
