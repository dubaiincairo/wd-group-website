import { NextResponse } from 'next/server';
import { fetchPublishedJobs } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await fetchPublishedJobs();
    return NextResponse.json({
      success: true,
      jobs,
    });
  } catch (error: unknown) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', jobs: [] },
      { status: 500 }
    );
  }
}
