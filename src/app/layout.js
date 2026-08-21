import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

const googleSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const siteUrl = process.env.NEXTAUTH_URL || 'https://sm-ferdous.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SM FERDOUS AHMMED | Full Stack Developer & IoT Engineer',
    template: '%s | SM FERDOUS AHMMED',
  },
  description: 'Full Stack Web Developer and IoT Solutions Engineer specializing in React, Next.js, Node.js, PostgreSQL, and embedded microcontroller automation.',
  keywords: [
    'SM FERDOUS AHMMED',
    'SM Ferdous',
    'Full Stack Developer',
    'IoT Engineer',
    'Web Developer Bangladesh',
    'Next.js Developer',
    'React Developer',
    'Node.js',
    'PostgreSQL',
    'Embedded C/C++',
    'Software Engineer Portfolio',
  ],
  authors: [{ name: 'SM FERDOUS AHMMED', url: siteUrl }],
  creator: 'SM FERDOUS AHMMED',
  publisher: 'SM FERDOUS AHMMED',
  applicationName: 'SM FERDOUS AHMMED Portfolio',
  category: 'technology',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'SM FERDOUS AHMMED | Full Stack Developer & IoT Engineer',
    description: 'Full Stack Web Developer and IoT Solutions Engineer specializing in React, Next.js, Node.js, PostgreSQL, and embedded microcontroller automation.',
    siteName: 'SM FERDOUS AHMMED Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SM FERDOUS AHMMED | Full Stack Developer & IoT Engineer',
    description: 'Full Stack Web Developer and IoT Solutions Engineer specializing in React, Next.js, Node.js, PostgreSQL, and embedded microcontroller automation.',
    creator: '@asifsarkar411',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'SM FERDOUS AHMMED',
  url: siteUrl,
  jobTitle: 'Full Stack Developer & IoT Engineer',
  description: 'Full Stack Web Developer and IoT Solutions Engineer specializing in React, Next.js, Node.js, PostgreSQL, and embedded microcontroller automation.',
  sameAs: [
    'https://github.com/asifsarkar411',
    'https://www.facebook.com/sarkarasif59/',
  ],
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'Embedded C',
    'IoT Prototyping',
    'Full Stack Web Development',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Bangladesh University of Business and Technology (BUBT)',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={googleSans.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={googleSans.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
