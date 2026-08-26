export type AdminRole = 'owner' | 'admin' | 'editor' | 'crm' | 'hr' | 'viewer';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
  last_login_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface AdminSessionUser {
  userId: string;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  expiresAt: string;
}

export interface AuditLogEntry {
  id: string;
  actor_id?: string | null;
  actor_email: string;
  action: string;
  resource_type: string;
  resource_id?: string | null;
  details?: Record<string, any> | null;
  ip_address?: string | null;
  created_at: string;
}

export type CRMInquiryStatus = 'new' | 'contacted' | 'in_review' | 'won' | 'closed';

export interface InternalNote {
  id: string;
  text: string;
  author: string;
  authorEmail: string;
  createdAt: string;
}

export interface CRMInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  sector?: string | null;
  subject?: string | null;
  message: string;
  status: CRMInquiryStatus;
  assigned_to?: string | null;
  internal_notes: InternalNote[];
  created_at: string;
  updated_at?: string;
}

export type JobApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'hired' | 'rejected';

export interface JobApplicationRecord {
  id: string;
  job_id?: string | null;
  job_title?: string | null;
  full_name: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  mobile: string;
  city?: string | null;
  country?: string | null;
  sector?: string | null;
  linkedin_url?: string | null;
  cover_note?: string | null;
  resume_url?: string | null;
  status: JobApplicationStatus;
  rating?: number;
  internal_notes: InternalNote[];
  created_at: string;
  updated_at?: string;
}

export interface MediaMetaRecord {
  id: string;
  bucket_id: string;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  alt_text_ar?: string;
  alt_text_en?: string;
  tags?: string[];
  uploaded_by?: string;
  created_at: string;
}

export interface SiteContentPayload {
  home: {
    hero: {
      eyebrow_en: string;
      eyebrow_ar: string;
      title_en: string;
      title_ar: string;
      title_line1_en?: string;
      title_line1_ar?: string;
      title_line2_en?: string;
      title_line2_ar?: string;
      title_line3_en?: string;
      title_line3_ar?: string;
      body_en: string;
      body_ar: string;
      primary_cta_en: string;
      primary_cta_ar: string;
      secondary_cta_en: string;
      secondary_cta_ar: string;
    };
    media?: {
      hero_video_hospitality?: string;
      hero_poster_hospitality?: string;
      hero_video_manufacturing?: string;
      hero_poster_manufacturing?: string;
      hero_video_contracting?: string;
      hero_poster_contracting?: string;
      sector_photo_hospitality?: string;
      sector_photo_manufacturing?: string;
      sector_photo_contracting?: string;
    };
    metrics: {
      stat1_num: string;
      stat1_text_en: string;
      stat1_text_ar: string;
      stat2_num: string;
      stat2_text_en: string;
      stat2_text_ar: string;
      stat3_num: string;
      stat3_text_en: string;
      stat3_text_ar: string;
      stat4_num: string;
      stat4_text_en: string;
      stat4_text_ar: string;
    };
    synergy: {
      heading_en: string;
      heading_ar: string;
      intro_en: string;
      intro_ar: string;
    };
    identity: {
      vision_title_en: string;
      vision_title_ar: string;
      vision_desc_en: string;
      vision_desc_ar: string;
      mission_title_en: string;
      mission_title_ar: string;
      mission_desc_en: string;
      mission_desc_ar: string;
    };
    ceo: {
      quote_en: string;
      quote_ar: string;
      name_en: string;
      name_ar: string;
      title_en: string;
      title_ar: string;
    };
  };
  about: {
    hero_image?: string;
    story_heading_en: string;
    story_heading_ar: string;
    story_body_en: string;
    story_body_ar: string;
    governance_statement_en: string;
    governance_statement_ar: string;
  };
  hospitality: {
    hero_title_en: string;
    hero_title_ar: string;
    hero_body_en: string;
    hero_body_ar: string;
    hero_image?: string;
    hero_video?: string;
    properties: Array<{
      id: string;
      name_en: string;
      name_ar: string;
      city_en: string;
      city_ar: string;
      desc_en: string;
      desc_ar: string;
      review_url?: string;
      website_url?: string;
      image_url?: string;
    }>;
  };
  manufacturing: {
    hero_title_en: string;
    hero_title_ar: string;
    hero_body_en: string;
    hero_body_ar: string;
    hero_image?: string;
    hero_video?: string;
    factories: Array<{
      id: string;
      title_en: string;
      title_ar: string;
      desc_en: string;
      desc_ar: string;
      location_en: string;
      location_ar: string;
      image_url?: string;
    }>;
  };
  contracting: {
    hero_title_en: string;
    hero_title_ar: string;
    hero_body_en: string;
    hero_body_ar: string;
    hero_image?: string;
    hero_video?: string;
    services: Array<{
      id: string;
      title_en: string;
      title_ar: string;
      desc_en: string;
      desc_ar: string;
      image_url?: string;
    }>;
  };
  branding?: {
    logo_dark?: string;
    logo_light?: string;
    favicon?: string;
    corporate_profile_pdf?: string;
  };
  settings: {
    company_name_ar: string;
    company_name_en: string;
    cr_number: string;
    vat_number: string;
    headquarters_ar: string;
    headquarters_en: string;
    general_email: string;
    secondary_email: string;
    primary_phone: string;
    secondary_phone: string;
    whatsapp_phone: string;
    emergency_notice_enabled: boolean;
    emergency_notice_ar?: string;
    emergency_notice_en?: string;
    maintenance_mode_enabled?: boolean;
    maintenance_headline_ar?: string;
    maintenance_headline_en?: string;
    maintenance_message_ar?: string;
    maintenance_message_en?: string;
    maintenance_estimated_date?: string;
  };
  seo: {
    global_title_en: string;
    global_title_ar: string;
    global_description_en: string;
    global_description_ar: string;
    og_image_url: string;
    canonical_base: string;
  };
  version: number;
}

export type SiteSettings = SiteContentPayload['settings'];
