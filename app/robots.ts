import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wdgroup.online';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/furniture/checkout',
          '/hero-studio',
          '/site-access',
          '/maintenance',
          '/wireframes',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
