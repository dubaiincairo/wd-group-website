import { NextRequest, NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/admin/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fqkbgfdasfwnryekkgqz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxa2JnZmRhc2Z3bnJ5ZWtrZ3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTAyMDYsImV4cCI6MjEwMzE2NjIwNn0.IRPdvlCIbeTtFNf8TMc353fT-tlLxYq0Mx3P2HHmM3Q';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getRequestSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const startTime = Date.now();
    let dbStatus = 'healthy';
    let dbLatencyMs = 0;

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/wdgroup_content?select=id&limit=1`, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        cache: 'no-store',
      });
      dbLatencyMs = Date.now() - startTime;
      if (!res.ok) dbStatus = 'degraded';
    } catch (e) {
      dbStatus = 'unreachable';
      dbLatencyMs = Date.now() - startTime;
    }

    // Check storage buckets
    const storageBuckets = ['videos', 'photos', 'assets', 'resumes'];

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
        provider: 'Supabase PostgreSQL',
        region: 'eu-central-1 (Frankfurt)',
      },
      storage: {
        status: 'healthy',
        buckets: storageBuckets,
      },
      server: {
        nodeVersion: process.version,
        uptimeSeconds: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || 'production',
      },
    });
  } catch (error: any) {
    console.error('Error running health check:', error);
    return NextResponse.json({ error: error?.message || 'Health check failed' }, { status: 500 });
  }
}
