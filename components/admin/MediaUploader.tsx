import React, { useState, useRef, useId } from 'react';
import { UploadCloud, Image as ImageIcon, Video, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useToast } from './ToastProvider';
import { useLanguage } from '@/context/LanguageContext';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altAr, setAltAr] = useState('');
  const [altEn, setAltEn] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState(bucketId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      showToast(isAr ? 'حجم الملف يتجاوز الحد الأقصى (50 ميجابايت)' : 'File size exceeds 50MB limit', 'error');
      return;
    }

    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setIsUploading(true);

      // Clean file name
      const cleanFileName = `${Date.now()}_${selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

      // 1. Upload file directly to Supabase Storage
      const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${selectedBucket}/${cleanFileName}`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': selectedFile.type || 'application/octet-stream',
        },
        body: selectedFile,
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
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
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

  return (
    <div className="bg-[#0F1117] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-white max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            {isAr ? 'رفع ملف وسائط جديد' : 'Upload New Asset'}
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
          className="border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-black/20 hover:bg-black/40 block"
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
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-32 object-contain rounded-xl border border-white/15" />
              ) : selectedBucket === 'videos' ? (
                <Video className="w-12 h-12 text-blue-400" />
              ) : (
                <FileText className="w-12 h-12 text-blue-400" />
              )}
              <div>
                <p className="text-xs font-bold text-white">{selectedFile.name}</p>
                <p className="text-[11px] text-zinc-400" dir="ltr">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · {selectedFile.type || 'Binary'}
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
              disabled={isUploading}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          )}
          <button
            type="submit"
            disabled={isUploading || !selectedFile}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-glow-blue cursor-pointer"
          >
            {isUploading ? (isAr ? 'جارٍ الرفع إلى السحابة…' : 'Uploading to Supabase…') : (isAr ? 'رفع وحفظ الملف' : 'Upload Asset')}
          </button>
        </div>
      </form>
    </div>
  );
}
