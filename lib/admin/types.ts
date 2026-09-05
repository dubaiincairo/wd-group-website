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

export interface BankAccountRecord {
  id: string;
  bank_name_ar: string;
  bank_name_en: string;
  account_name_ar: string;
  account_name_en: string;
  iban: string;
  account_number: string;
  swift_code?: string;
  currency?: string;
  is_active?: boolean;
}

export interface SiteContentPayload {
  home: {
    hero: {
      eyebrow_en: string;
      eyebrow_ar: string;
      kicker_en?: string;
      kicker_ar?: string;
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
      dock_hospitality_label_en?: string;
      dock_hospitality_label_ar?: string;
      dock_hospitality_badge_en?: string;
      dock_hospitality_badge_ar?: string;
      dock_manufacturing_label_en?: string;
      dock_manufacturing_label_ar?: string;
      dock_manufacturing_badge_en?: string;
      dock_manufacturing_badge_ar?: string;
      dock_contracting_label_en?: string;
      dock_contracting_label_ar?: string;
      dock_contracting_badge_en?: string;
      dock_contracting_badge_ar?: string;
      scroll_cue_en?: string;
      scroll_cue_ar?: string;
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
      ceo_photo?: string;
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
      label_en?: string;
      label_ar?: string;
      heading_en: string;
      heading_ar: string;
      intro_en: string;
      intro_ar: string;
      step1_title_en?: string;
      step1_title_ar?: string;
      step1_text_en?: string;
      step1_text_ar?: string;
      step2_title_en?: string;
      step2_title_ar?: string;
      step2_text_en?: string;
      step2_text_ar?: string;
      step3_title_en?: string;
      step3_title_ar?: string;
      step3_text_en?: string;
      step3_text_ar?: string;
    };
    identity: {
      label_en?: string;
      label_ar?: string;
      vision_title_en: string;
      vision_title_ar: string;
      vision_desc_en: string;
      vision_desc_ar: string;
      mission_title_en: string;
      mission_title_ar: string;
      mission_desc_en: string;
      mission_desc_ar: string;
      values_title_en?: string;
      values_title_ar?: string;
      val1_title_en?: string;
      val1_title_ar?: string;
      val1_desc_en?: string;
      val1_desc_ar?: string;
      val2_title_en?: string;
      val2_title_ar?: string;
      val2_desc_en?: string;
      val2_desc_ar?: string;
      val3_title_en?: string;
      val3_title_ar?: string;
      val3_desc_en?: string;
      val3_desc_ar?: string;
      val4_title_en?: string;
      val4_title_ar?: string;
      val4_desc_en?: string;
      val4_desc_ar?: string;
    };
    ceo: {
      label_en?: string;
      label_ar?: string;
      quote_en: string;
      quote_ar: string;
      name_en: string;
      name_ar: string;
      title_en: string;
      title_ar: string;
      photo_url?: string;
      photo_url_ar?: string;
      photo_url_en?: string;
    };
    partnership?: {
      label_en?: string;
      label_ar?: string;
      heading_en?: string;
      heading_ar?: string;
      body_en?: string;
      body_ar?: string;
      primary_cta_en?: string;
      primary_cta_ar?: string;
      secondary_cta_en?: string;
      secondary_cta_ar?: string;
    };
  };
  about: {
    hero_image?: string;
    story_image?: string;
    story_heading_en: string;
    story_heading_ar: string;
    story_body_en: string;
    story_body_ar: string;
    governance_statement_en: string;
    governance_statement_ar: string;
    corporate_profile_pdf?: string;
    corporate_profile_pdf_ar?: string;
    corporate_profile_pdf_en?: string;
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
    favicon_url?: string;
    nav_cta_en?: string;
    nav_cta_ar?: string;
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
    bank_access_code?: string;
    bank_accounts?: BankAccountRecord[];
    odoo?: {
      url?: string;
      db?: string;
      username?: string;
      apiKey?: string;
    };
  };
  seo: {
    global_title_en: string;
    global_title_ar: string;
    global_description_en: string;
    global_description_ar: string;
    keywords_en?: string;
    keywords_ar?: string;
    canonical_base: string;
    og_image_url: string;
    favicon_url?: string;
    twitter_card?: string;
    twitter_handle?: string;
    google_site_verification?: string;
    bing_site_verification?: string;
    google_analytics_id?: string;
    google_tag_manager_id?: string;
    robots_index?: boolean;
    sitemap_url?: string;
    schema_org_type?: string;
    schema_legal_name_ar?: string;
    schema_legal_name_en?: string;
    schema_phone?: string;
    schema_email?: string;
  };
  version: number;
}

export type SiteSettings = SiteContentPayload['settings'];

// -------------------------------------------------------------
// E-COMMERCE & FURNITURE ORDERS
// -------------------------------------------------------------
export type EcommerceOrderStatus = 
  | 'pending_payment'
  | 'confirmed'
  | 'in_production'
  | 'ready_for_dispatch'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface EcommerceOrderItem {
  productId: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  finishId: string;
  finishNameEn: string;
  finishNameAr: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface EcommerceOrderRecord {
  id: string;
  orderRef: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  district?: string;
  address?: string;
  villaBuilding?: string;
  deliveryNotes?: string;
  orderType: 'retail' | 'b2b';
  companyName?: string;
  crNumber?: string;
  vatNumber?: string;
  deliveryDate: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  whiteGloveAssembly: boolean;
  wallAnchoring: boolean;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'authorized' | 'cod_pending';
  subtotal: number;
  discountAmount: number;
  promoCode?: string;
  vatAmount: number;
  totalAmount: number;
  status: EcommerceOrderStatus;
  factory: string;
  leadTechnician?: string;
  items: EcommerceOrderItem[];
  internalNotes: InternalNote[];
  createdAt: string;
  updatedAt?: string;
}
