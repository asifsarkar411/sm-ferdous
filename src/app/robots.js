export default function robots() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://sm-ferdous.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
