export type AiStudioMode = 'visual' | 'content';

export interface VisualStudioItem {
  id: string;
  originalUrl: string;
  enhancedUrl?: string;
  prompt?: string;
  engineLabel?: string;
  isEnhancing?: boolean;
  latencyMs?: number;
  enhancements?: string[];
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
