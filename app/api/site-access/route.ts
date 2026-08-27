import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_ACCESS_COOKIE_NAME, getSiteAccessToken } from '@/lib/site-access';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const sitePassword = process.env.SITE_PASSWORD?.trim();

    // If no password is set on the server, grant access immediately
    if (!sitePassword) {
      return NextResponse.json({
        success: true,
        message: 'No site password is required.',
      });
    }

    const body = await req.json().catch(() => ({}));
    const candidatePassword = (body.password || '').trim();

    if (!candidatePassword) {
      return NextResponse.json(
        { success: false, error: 'Please enter the access password.' },
        { status: 400 }
      );
    }

    if (candidatePassword !== sitePassword) {
      return NextResponse.json(
        { success: false, error: 'Incorrect access password. Please verify and try again.' },
        { status: 401 }
      );
    }

    // Correct password - generate token and set secure session cookie
    const token = await getSiteAccessToken(sitePassword);

    const response = NextResponse.json({
      success: true,
      message: 'Access granted successfully.',
    });

    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set(SITE_ACCESS_COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Error verifying site access password:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing access request.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Site access session cleared.',
    });

    response.cookies.set(SITE_ACCESS_COOKIE_NAME, '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to clear session.' },
      { status: 500 }
    );
  }
}
