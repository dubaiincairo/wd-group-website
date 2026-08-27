'use client';

import React from 'react';
import Script from 'next/script';
import { useLanguage } from '@/context/LanguageContext';

export default function DynamicHeadSEO() {
  const { lang, dynamicContent } = useLanguage();
  const seo = dynamicContent?.seo;
  const isAr = lang === 'ar';

  if (!seo) return null;

  const title = isAr ? (seo.global_title_ar || seo.global_title_en) : (seo.global_title_en || seo.global_title_ar);
  const description = isAr ? (seo.global_description_ar || seo.global_description_en) : (seo.global_description_en || seo.global_description_ar);
  const keywords = isAr ? (seo.keywords_ar || seo.keywords_en) : (seo.keywords_en || seo.keywords_ar);
  const canonical = seo.canonical_base || 'https://wdgroup.online';
  const ogImage = seo.og_image_url || 'https://fqkbgfdasfwnryekkgqz.supabase.co/storage/v1/object/public/photos/og-preview.jpg';

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': seo.schema_org_type || 'Corporation',
    name: isAr ? (seo.schema_legal_name_ar || 'مجموعة دبليو دي للأعمال') : (seo.schema_legal_name_en || 'WD Group for Business'),
    alternateName: 'WD Group',
    url: canonical,
    logo: `${canonical}/brand/wd-group-logo-white.png`,
    description: description,
    telephone: seo.schema_phone || '+966505725070',
    email: seo.schema_email || 'ceo@wdgroup.online',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressRegion: 'Makkah Province',
      addressLocality: 'Jeddah',
    },
    sameAs: [
      'https://twitter.com/wdgroup',
      'https://linkedin.com/company/wd-group',
    ],
  };

  const dynamicFavicon = dynamicContent?.branding?.favicon || dynamicContent?.settings?.favicon_url || seo.favicon_url;

  return (
    <>
      {/* Dynamic Admin-Managed Favicon */}
      {dynamicFavicon && (
        <>
          <link rel="icon" href={dynamicFavicon} sizes="any" />
          <link rel="shortcut icon" href={dynamicFavicon} />
          <link rel="apple-touch-icon" href={dynamicFavicon} />
        </>
      )}

      {/* 1. Google Site Verification */}
      {seo.google_site_verification && (
        <meta name="google-site-verification" content={seo.google_site_verification} />
      )}

      {/* 2. Bing Webmaster Verification */}
      {seo.bing_site_verification && (
        <meta name="msvalidate.01" content={seo.bing_site_verification} />
      )}

      {/* 3. Robots Directives */}
      <meta name="robots" content={seo.robots_index === false ? 'noindex, nofollow' : 'index, follow'} />

      {/* 4. Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* 5. Open Graph Meta */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={isAr ? 'ar_SA' : 'en_US'} />

      {/* 6. Twitter Card */}
      <meta name="twitter:card" content={seo.twitter_card || 'summary_large_image'} />
      {seo.twitter_handle && <meta name="twitter:site" content={seo.twitter_handle} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 7. Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* 8. Google Analytics 4 (GA4) */}
      {seo.google_analytics_id && seo.google_analytics_id !== 'G-FVBW70B8H5' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${seo.google_analytics_id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-dynamic" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${seo.google_analytics_id}');
            `}
          </Script>
        </>
      )}

      {/* 9. Google Tag Manager (GTM) */}
      {seo.google_tag_manager_id && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${seo.google_tag_manager_id}');
          `}
        </Script>
      )}
    </>
  );
}
