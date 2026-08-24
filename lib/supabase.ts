import type { ContactSubmission, JobApplication, JobListing } from './types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

const headers = {
  'apikey': supabaseAnonKey,
  'Authorization': `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
};

/**
 * Submit a general or sector-specific contact inquiry to Supabase
 */
export async function submitContactInquiry(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  sector?: string | null;
  subject?: string | null;
  message: string;
}): Promise<ContactSubmission> {
  const payload: ContactSubmission = {
    name: data.fullName.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || null,
    company: data.company?.trim() || null,
    sector: data.sector || 'general',
    subject: data.subject?.trim() || null,
    message: data.message.trim(),
  };

  const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: {
      ...headers,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Database error: ${res.statusText}`);
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Submit a talent pool CV / job application to Supabase
 */
export async function submitJobApplication(data: {
  fullName: string;
  email: string;
  phone: string;
  city?: string | null;
  sector?: string | null;
  linkedin?: string | null;
  coverNote?: string | null;
  resumeUrl?: string | null;
  jobId?: string | null;
  jobTitle?: string | null;
}): Promise<JobApplication> {
  const nameParts = data.fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const payload: JobApplication = {
    full_name: data.fullName.trim(),
    first_name: firstName,
    last_name: lastName,
    email: data.email.trim(),
    mobile: data.phone.trim(),
    city: data.city?.trim() || null,
    sector: data.sector || null,
    linkedin_url: data.linkedin?.trim() || null,
    cover_note: data.coverNote?.trim() || null,
    resume_url: data.resumeUrl || null,
    job_id: data.jobId || null,
    job_title: data.jobTitle || null,
  };

  const res = await fetch(`${supabaseUrl}/rest/v1/job_applications`, {
    method: 'POST',
    headers: {
      ...headers,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Database error: ${res.statusText}`);
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Fetch published job openings from Supabase
 */
export async function fetchPublishedJobs(): Promise<JobListing[]> {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/job_listings?published=eq.true&order=sort_order.asc,created_at.desc`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch job listings from Supabase:', res.statusText);
      return [];
    }

    const data: JobListing[] = await res.json();
    return data || [];
  } catch (error) {
    console.error('Failed to connect to Supabase job_listings:', error);
    return [];
  }
}
