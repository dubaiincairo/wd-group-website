export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  sector?: string | null;
  subject?: string | null;
  message: string;
  created_at?: string;
}

export interface JobApplication {
  id?: string;
  job_id?: string | null;
  job_title?: string | null;
  full_name?: string | null;
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
  created_at?: string;
}

export interface JobListing {
  id: string;
  title: string;
  role_overview?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  notes?: string | null;
  experience?: string | null;
  sort_order?: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface WdgroupContent {
  id: string;
  data: Record<string, any>;
  updated_at?: string;
}
