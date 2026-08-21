/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone is only used for custom Docker/VPS hosting, disabled for Vercel
  ...(process.env.STANDALONE_BUILD === 'true' ? { output: 'standalone' } : {}),
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
