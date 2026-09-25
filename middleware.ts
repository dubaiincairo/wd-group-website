import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_ACCESS_COOKIE_NAME, getSiteAccessToken } from '@/lib/site-access';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ---------------------------------------------------------------------------
  // 1. SITE-WIDE PASSWORD GATE (Configured via SITE_PASSWORD environment var)
  // ---------------------------------------------------------------------------
  const sitePassword = process.env.SITE_PASSWORD?.trim();

  if (sitePassword) {
    // Exempt public static assets and auth endpoints
    const isExempt =
      pathname.startsWith('/_next') ||
      pathname.startsWith('/brand') ||
      pathname.startsWith('/videos') ||
      pathname.startsWith('/docs') ||
      pathname.startsWith('/api/site-access') ||
      pathname === '/site-access' ||
      pathname === '/favicon.ico' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|woff|woff2|ttf|eot|css|js|html)$/i);

    if (!isExempt) {
      const siteAccessCookie = request.cookies.get(SITE_ACCESS_COOKIE_NAME);
      const expectedToken = await getSiteAccessToken(sitePassword);

      if (!siteAccessCookie || siteAccessCookie.value !== expectedToken) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Site access password required' },
            { status: 401 }
          );
        }

        const accessUrl = new URL('/site-access', request.url);
        const returnDestination = pathname + (search || '');
        if (returnDestination !== '/' && returnDestination !== '') {
          accessUrl.searchParams.set('returnUrl', returnDestination);
        }
        return NextResponse.redirect(accessUrl);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 2. ADMIN PORTAL PROTECTION (/admin routes)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // 3. ADMIN API ROUTES PROTECTION (/api/admin routes)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // 4. EXEMPT PUBLIC ASSETS & SPECIAL ROUTES FROM BILINGUAL ROUTING
  // ---------------------------------------------------------------------------
  const isStaticOrInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/brand') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/site-access') ||
    pathname.startsWith('/icon') ||
    pathname === '/favicon.ico' ||
    pathname === '/favicon.png' ||
    pathname === '/favicon.svg' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    Boolean(pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|woff|woff2|ttf|eot|css|js|txt|xml|html)$/i));

  if (isStaticOrInternal) {
    return NextResponse.next();
  }

  // ---------------------------------------------------------------------------
  // 5. DETERMINISTIC BILINGUAL ROUTE HANDLING (/ar and /en)
  // ---------------------------------------------------------------------------
  const isArabicRoute = pathname === '/ar' || pathname.startsWith('/ar/');
  const isEnglishRoute = pathname === '/en' || pathname.startsWith('/en/');

  if (isArabicRoute || isEnglishRoute) {
    const locale = isArabicRoute ? 'ar' : 'en';
    let internalPath = pathname.replace(/^\/(ar|en)/, '');
    if (!internalPath || internalPath === '') {
      internalPath = '/';
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);
    requestHeaders.set('x-pathname', pathname);
    requestHeaders.set('x-internal-path', internalPath);

    const rewriteUrl = new URL(internalPath + search, request.url);
    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set('wd_lang', locale, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });

    return response;
  }

  // ---------------------------------------------------------------------------
  // 6. UNPREFIXED PUBLIC ROUTES (e.g. /, /about, /sectors/hospitality)
  // Symmetrically redirect to preferred locale or default to Arabic (Saudi Arabia canonical)
  // ---------------------------------------------------------------------------
  const savedLang = request.cookies.get('wd_lang')?.value;
  const targetLocale = savedLang === 'en' ? 'en' : 'ar';
  const redirectTarget = `/${targetLocale}${pathname === '/' ? '' : pathname}${search}`;
  return NextResponse.redirect(new URL(redirectTarget, request.url));
}

export const config = {
  // Run on all paths except static Next.js chunks and image optimization
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
