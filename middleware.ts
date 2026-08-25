import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes
  if (pathname.startsWith('/admin')) {
    // Allow login and static assets
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
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
    // Login endpoint is public
    if (pathname === '/api/admin/auth/login') {
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
