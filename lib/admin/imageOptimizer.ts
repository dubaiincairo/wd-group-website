/**
 * Client-Side Ultra-HD Image Optimizer for WD Group
 *
 * Compresses camera and stock photos into high-definition WebP format
 * with zero visible degradation in image quality:
 * - Full 2K / Ultra-HD resolution cap (max 2560px on longest edge)
 * - High-quality bicubic canvas smoothing (imageSmoothingQuality = 'high')
 * - Visual transparency preservation (WebP lossless alpha support)
 * - 88% visual fidelity WebP encoding (virtually indistinguishable from uncompressed raw)
 * - Automatic safety check: never returns a larger file than the original
 * - Bypasses SVGs, animated GIFs, videos, and PDFs
 */

export interface OptimizeOptions {
  maxDimension?: number; // default 2560 (2K Ultra-HD)
  quality?: number;      // default 0.88 (virtually lossless visually)
}

export interface OptimizationResult {
  file: File;
  wasOptimized: boolean;
  originalSize: number;
  optimizedSize: number;
  savedPercent: number;
  width: number;
  height: number;
}

export async function optimizeImageForWeb(
  file: File,
  options: OptimizeOptions = {}
): Promise<OptimizationResult> {
  const { maxDimension = 2560, quality = 0.88 } = options;

  // 1. Guard against non-images or formats that shouldn't be rasterized/compressed
  if (
    typeof window === 'undefined' ||
    !file.type.startsWith('image/') ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/gif'
  ) {
    return {
      file,
      wasOptimized: false,
      originalSize: file.size,
      optimizedSize: file.size,
      savedPercent: 0,
      width: 0,
      height: 0,
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        try {
          const origW = img.naturalWidth || img.width;
          const origH = img.naturalHeight || img.height;

          // If image is already smaller than maxDimension and under 300KB, leave untouched if already webp
          if (origW <= maxDimension && origH <= maxDimension && file.size < 300 * 1024 && file.type === 'image/webp') {
            resolve({
              file,
              wasOptimized: false,
              originalSize: file.size,
              optimizedSize: file.size,
              savedPercent: 0,
              width: origW,
              height: origH,
            });
            return;
          }

          // Compute target dimensions preserving strict aspect ratio
          let targetW = origW;
          let targetH = origH;

          if (origW > maxDimension || origH > maxDimension) {
            if (origW >= origH) {
              targetW = maxDimension;
              targetH = Math.round((origH * maxDimension) / origW);
            } else {
              targetH = maxDimension;
              targetW = Math.round((origW * maxDimension) / origH);
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({
              file,
              wasOptimized: false,
              originalSize: file.size,
              optimizedSize: file.size,
              savedPercent: 0,
              width: origW,
              height: origH,
            });
            return;
          }

          // Enable high-fidelity smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw the image
          ctx.drawImage(img, 0, 0, targetW, targetH);

          // Convert to WebP
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve({
                  file,
                  wasOptimized: false,
                  originalSize: file.size,
                  optimizedSize: file.size,
                  savedPercent: 0,
                  width: origW,
                  height: origH,
                });
                return;
              }

              // Strict safety: if compressed blob is larger than original, keep original
              if (blob.size >= file.size) {
                resolve({
                  file,
                  wasOptimized: false,
                  originalSize: file.size,
                  optimizedSize: file.size,
                  savedPercent: 0,
                  width: origW,
                  height: origH,
                });
                return;
              }

              // Generate new file name with .webp extension
              const baseName = file.name.replace(/\.[^/.]+$/, '');
              const newFileName = `${baseName}.webp`;

              const optimizedFile = new File([blob], newFileName, {
                type: 'image/webp',
                lastModified: Date.now(),
              });

              const savedBytes = file.size - optimizedFile.size;
              const savedPercent = Math.round((savedBytes / file.size) * 100);

              resolve({
                file: optimizedFile,
                wasOptimized: true,
                originalSize: file.size,
                optimizedSize: optimizedFile.size,
                savedPercent,
                width: targetW,
                height: targetH,
              });
            },
            'image/webp',
            quality
          );
        } catch (err) {
          console.error('Image optimization error, falling back to original:', err);
          resolve({
            file,
            wasOptimized: false,
            originalSize: file.size,
            optimizedSize: file.size,
            savedPercent: 0,
            width: 0,
            height: 0,
          });
        }
      };

      img.onerror = () => {
        resolve({
          file,
          wasOptimized: false,
          originalSize: file.size,
          optimizedSize: file.size,
          savedPercent: 0,
          width: 0,
          height: 0,
        });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      resolve({
        file,
        wasOptimized: false,
        originalSize: file.size,
        optimizedSize: file.size,
        savedPercent: 0,
        width: 0,
        height: 0,
      });
    };

    reader.readAsDataURL(file);
  });
}
