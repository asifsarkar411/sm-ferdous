import { Outfit } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'SM FERDOUS AHMMED | Portfolio',
  description: 'Professional portfolio, full stack development, and IoT solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
