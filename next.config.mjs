/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'fqkbgfdasfwnryekkgqz.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/furniture',
        permanent: true,
      },
      {
        source: '/catalog/:path*',
        destination: '/furniture',
        permanent: true,
      },
      {
        source: '/store',
        destination: '/furniture',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/furniture',
        permanent: true,
      },
      {
        source: '/ecommerce',
        destination: '/furniture',
        permanent: true,
      },
      {
        source: '/sectors',
        destination: '/#sectors',
        permanent: true,
      },
      {
        source: '/hospitality',
        destination: '/sectors/hospitality',
        permanent: true,
      },
      {
        source: '/hotels',
        destination: '/sectors/hospitality',
        permanent: true,
      },
      {
        source: '/manufacturing',
        destination: '/sectors/manufacturing',
        permanent: true,
      },
      {
        source: '/greenwood',
        destination: '/sectors/manufacturing',
        permanent: true,
      },
      {
        source: '/contracting',
        destination: '/sectors/contracting',
        permanent: true,
      },
      {
        source: '/career',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/media',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
