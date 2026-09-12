import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFurnitureItem, getAllFurnitureSlugs, FURNITURE_CATALOG } from '@/lib/furnitureData';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllFurnitureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getFurnitureItem(params.slug);
  if (!product) return { title: 'Product Not Found | WD Group' };

  const title = `${product.nameEn} · ${product.nameAr} | GreenWood by WD Group`;
  const description = `${product.shortDescEn} — ${product.shortDescAr}`;
  const mainImage = product.images[0] || 'https://wdgroup.online/og-image.jpg';

  return {
    title,
    description,
    keywords: [
      product.nameEn,
      product.nameAr,
      product.categoryEn,
      'Saudi luxury furniture',
      'GreenWood Riyadh',
      'Hospitality FF&E',
      'أثاث فاخر بالرياض',
      'تصنيع أثاث فندقي',
    ],
    openGraph: {
      title,
      description,
      url: `https://wdgroup.online/furniture/${product.id}`,
      siteName: 'WD Group (GreenWood)',
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: product.nameEn,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mainImage],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getFurnitureItem(params.slug);
  if (!product) notFound();

  // Curate 3 related items from same category or catalog
  const related = FURNITURE_CATALOG.filter((i) => i.id !== product.id && i.category === product.category).slice(0, 3);
  const fallbackRelated = related.length >= 3 
    ? related 
    : [...related, ...FURNITURE_CATALOG.filter((i) => i.id !== product.id && !related.find((r) => r.id === i.id))].slice(0, 3);

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameEn,
    alternateName: product.nameAr,
    image: product.images,
    description: product.fullDescEn,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'GreenWood — WD Group',
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    material: product.materialsEn,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'WD Group for Contracting & Hospitality LLC',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={fallbackRelated} />
    </>
  );
}
