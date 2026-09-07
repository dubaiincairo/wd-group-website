export type AiStudioMode = 'visual' | 'content';

export interface StudioGradingMatrix {
  exposure: number;
  warmth: number;
  contrast: number;
  saturation: number;
  sharpness: number;
  vignette: number;
  bloom: number;
  colorTemperature?: string;
  exposureAdjustment?: string;
  lightingStyle?: string;
}

export interface VisualStudioItem {
  id: string;
  originalUrl: string;
  enhancedUrl?: string;
  fileName?: string;
  modelType?: 'nanobanana_2' | 'nanobanana_pro';
  prompt?: string;
  engineLabel?: string;
  isEnhancing?: boolean;
  latencyMs?: number;
  enhancements?: string[];
  gradingMatrix?: StudioGradingMatrix;
  gradingAnalysis?: {
    exposureAdjustment?: string;
    colorTemperature?: string;
    shadowFillRatio?: string;
    contrastEnhancement?: string;
    materialGrading?: string;
    enhancementNotes?: string[];
  };
}

export interface ContentStudioItem {
  id: string;
  imageUrl: string;
  isFromVisual?: boolean;
  prompt?: string;
  isGenerating?: boolean;
  committed?: boolean;
  sourceLabel?: string;
  latencyMs?: number;
  data?: {
    sku?: string;
    nameEn?: string;
    nameAr?: string;
    categoryEn?: string;
    categoryAr?: string;
    price?: number;
    originalPrice?: number;
    shortDescEn?: string;
    shortDescAr?: string;
    fullDescEn?: string;
    fullDescAr?: string;
    materialsEn?: string;
    materialsAr?: string;
    leadTimeEn?: string;
    leadTimeAr?: string;
    dimensions?: {
      width: number;
      depth: number;
      height: number;
      unit: string;
    };
    featuresEn?: string[];
    featuresAr?: string[];
    seoTitle?: string;
    seoDescription?: string;
  };
}
