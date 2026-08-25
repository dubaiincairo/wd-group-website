import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin UI routes
  if (pathname.startsWith('/admin')) {
    // Allow public login and password recovery pages
    if (
      pathname === '/admin/login' ||
      pathname.startsWith('/admin/login/') ||
      pathname === '/admin/reset-password' ||
      pathname.startsWith('/admin/reset-password/')
    ) {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('wdgroup_admin_session');

    // If no cookie is present, redirect to /admin/login
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle protected API routes
  if (pathname.startsWith('/api/admin')) {
    // All auth routes under /api/admin/auth/ are public
    if (pathname.startsWith('/api/admin/auth')) {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('wdgroup_admin_session');
    const authHeader = request.headers.get('authorization');

    if ((!sessionCookie || !sessionCookie.value) && (!authHeader || !authHeader.startsWith('Bearer '))) {
      return NextResponse.json({ error: 'Unauthorized: Session missing' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
