import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://wdgroup.sa';
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    // If Google Client ID is not yet provided in environment variables, redirect with explanation
    return NextResponse.redirect(
      `${origin}/admin/login?info=${encodeURIComponent('Google Workspace OAuth requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables. You can add them in Vercel settings.')}`
    );
  }

  const redirectUri = `${origin}/api/admin/auth/google/callback`;
  const scope = encodeURIComponent('openid email profile');
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=select_account`;

  return NextResponse.redirect(googleAuthUrl);
}
