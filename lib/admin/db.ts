import type { 
  AdminUser, 
  CRMInquiry, 
  JobApplicationRecord, 
  MediaMetaRecord, 
  AuditLogEntry, 
  SiteContentPayload 
} from './types';
import type { JobListing } from '../types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

const defaultHeaders = {
  'apikey': supabaseAnonKey,
  'Authorization': `Bearer ${supabaseAnonKey}`,
  'Content-Type': 'application/json',
};

/**
 * Call a PostgreSQL RPC function in Supabase
 */
export async function callRpc<T = any>(functionName: string, params: Record<string, any> = {}): Promise<T> {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(params),
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `RPC ${functionName} failed with status ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch centralized site content from Supabase
 */
export async function getSiteContent(): Promise<SiteContentPayload | null> {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/wdgroup_content?id=eq.main&select=*`, {
      headers: defaultHeaders,
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0]?.data || null;
  } catch (err) {
    console.error('Error reading wdgroup_content:', err);
    return null;
  }
}

/**
 * Update centralized site content in Supabase
 */
export async function updateSiteContent(data: Partial<SiteContentPayload>): Promise<boolean> {
  const current = (await getSiteContent()) || {};
  const merged = { ...current, ...data, version: (current.version || 1) + 1 };

  const res = await fetch(`${supabaseUrl}/rest/v1/wdgroup_content?id=eq.main`, {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      data: merged,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    // If not existing, insert
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/wdgroup_content`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        id: 'main',
        data: merged,
        updated_at: new Date().toISOString(),
      }),
    });
    return insertRes.ok;
  }

  return true;
}

/**
 * Fetch CRM Leads / Inquiries
 */
export async function getInquiries(params?: {
  sector?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: CRMInquiry[]; count: number }> {
  let url = `${supabaseUrl}/rest/v1/contact_submissions?select=*`;

  if (params?.sector && params.sector !== 'all') {
    url += `&sector=eq.${encodeURIComponent(params.sector)}`;
  }
  if (params?.status && params.status !== 'all') {
    url += `&status=eq.${encodeURIComponent(params.status)}`;
  }
  if (params?.search) {
    url += `&or=(name.ilike.*${encodeURIComponent(params.search)}*,email.ilike.*${encodeURIComponent(params.search)}*,company.ilike.*${encodeURIComponent(params.search)}*,message.ilike.*${encodeURIComponent(params.search)}*)`;
  }

  url += `&order=created_at.desc`;

  if (params?.limit) {
    url += `&limit=${params.limit}`;
  }
  if (params?.offset) {
    url += `&offset=${params.offset}`;
  }

  const res = await fetch(url, {
    headers: {
      ...defaultHeaders,
      'Prefer': 'count=exact',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return { data: [], count: 0 };
  }

  const contentRange = res.headers.get('content-range');
  const count = contentRange ? parseInt(contentRange.split('/')[1] || '0', 10) : 0;
  const rows = await res.json();

  const formatted: CRMInquiry[] = rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    company: r.company,
    sector: r.sector,
    subject: r.subject,
    message: r.message,
    status: r.status || 'new',
    assigned_to: r.assigned_to,
    internal_notes: Array.isArray(r.internal_notes) ? r.internal_notes : [],
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  return { data: formatted, count: isNaN(count) ? formatted.length : count };
}

/**
 * Update CRM Lead / Inquiry
 */
export async function updateInquiry(id: string, patch: Partial<CRMInquiry>): Promise<CRMInquiry> {
  const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      ...patch,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update inquiry');
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Fetch Job Applications / Talent Pool
 */
export async function getApplications(params?: {
  sector?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: JobApplicationRecord[]; count: number }> {
  let url = `${supabaseUrl}/rest/v1/job_applications?select=*`;

  if (params?.sector && params.sector !== 'all') {
    url += `&sector=eq.${encodeURIComponent(params.sector)}`;
  }
  if (params?.status && params.status !== 'all') {
    url += `&status=eq.${encodeURIComponent(params.status)}`;
  }
  if (params?.search) {
    url += `&or=(full_name.ilike.*${encodeURIComponent(params.search)}*,email.ilike.*${encodeURIComponent(params.search)}*,mobile.ilike.*${encodeURIComponent(params.search)}*,city.ilike.*${encodeURIComponent(params.search)}*)`;
  }

  url += `&order=created_at.desc`;

  if (params?.limit) {
    url += `&limit=${params.limit}`;
  }
  if (params?.offset) {
    url += `&offset=${params.offset}`;
  }

  const res = await fetch(url, {
    headers: {
      ...defaultHeaders,
      'Prefer': 'count=exact',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return { data: [], count: 0 };
  }

  const contentRange = res.headers.get('content-range');
  const count = contentRange ? parseInt(contentRange.split('/')[1] || '0', 10) : 0;
  const rows = await res.json();

  const formatted: JobApplicationRecord[] = rows.map((r: any) => ({
    id: r.id,
    job_id: r.job_id,
    job_title: r.job_title,
    full_name: r.full_name || `${r.first_name || ''} ${r.last_name || ''}`.trim(),
    first_name: r.first_name,
    last_name: r.last_name,
    email: r.email,
    mobile: r.mobile,
    city: r.city,
    country: r.country,
    sector: r.sector,
    linkedin_url: r.linkedin_url,
    cover_note: r.cover_note,
    resume_url: r.resume_url,
    status: r.status || 'new',
    rating: r.rating || 0,
    internal_notes: Array.isArray(r.internal_notes) ? r.internal_notes : [],
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));

  return { data: formatted, count: isNaN(count) ? formatted.length : count };
}

/**
 * Update Job Application Status & Notes
 */
export async function updateApplication(id: string, patch: Partial<JobApplicationRecord>): Promise<JobApplicationRecord> {
  const res = await fetch(`${supabaseUrl}/rest/v1/job_applications?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      ...defaultHeaders,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      ...patch,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update application');
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Fetch all Job Listings (including unpublished)
 */
export async function getAllJobListings(): Promise<JobListing[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/job_listings?select=*&order=sort_order.asc,created_at.desc`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });

  if (!res.ok) return [];
  return res.json();
}

/**
 * Upsert Job Listing
 */
export async function upsertJobListing(job: Partial<JobListing>): Promise<JobListing> {
  if (job.id) {
    const res = await fetch(`${supabaseUrl}/rest/v1/job_listings?id=eq.${job.id}`, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        title: job.title,
        role_overview: job.role_overview,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        experience: job.experience,
        notes: job.notes,
        sort_order: job.sort_order ?? 0,
        published: job.published ?? true,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) throw new Error('Failed to update job');
    const rows = await res.json();
    return rows[0];
  } else {
    const res = await fetch(`${supabaseUrl}/rest/v1/job_listings`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        title: job.title,
        role_overview: job.role_overview,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        experience: job.experience,
        notes: job.notes,
        sort_order: job.sort_order ?? 0,
        published: job.published ?? true,
      }),
    });

    if (!res.ok) throw new Error('Failed to create job');
    const rows = await res.json();
    return rows[0];
  }
}

/**
 * Delete Job Listing
 */
export async function deleteJobListing(id: string): Promise<boolean> {
  const res = await fetch(`${supabaseUrl}/rest/v1/job_listings?id=eq.${id}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });
  return res.ok;
}

/**
 * Fetch Media Metadata
 */
export async function getMediaRecords(bucketId?: string): Promise<MediaMetaRecord[]> {
  let url = `${supabaseUrl}/rest/v1/wdgroup_media_meta?select=*&order=created_at.desc`;
  if (bucketId && bucketId !== 'all') {
    url += `&bucket_id=eq.${encodeURIComponent(bucketId)}`;
  }

  const res = await fetch(url, {
    headers: defaultHeaders,
    cache: 'no-store',
  });

  if (!res.ok) return [];
  return res.json();
}

/**
 * Register uploaded media
 */
export async function registerMediaRecord(meta: Omit<MediaMetaRecord, 'id' | 'created_at'>): Promise<MediaMetaRecord> {
  const res = await fetch(`${supabaseUrl}/rest/v1/wdgroup_media_meta`, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(meta),
  });

  if (!res.ok) {
    throw new Error('Failed to register media record');
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Delete Media Record
 */
export async function deleteMediaRecord(id: string): Promise<boolean> {
  const res = await fetch(`${supabaseUrl}/rest/v1/wdgroup_media_meta?id=eq.${id}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });
  return res.ok;
}

/**
 * Fetch Audit Logs
 */
export async function getAuditLogs(limit: number = 50): Promise<AuditLogEntry[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/wdgroup_audit_logs?select=*&order=created_at.desc&limit=${limit}`, {
    headers: defaultHeaders,
    cache: 'no-store',
  });

  if (!res.ok) return [];
  return res.json();
}
