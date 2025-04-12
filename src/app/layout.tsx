import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gapless',
  description: 'AI-Powered Text Explanation Service',
  openGraph: {
    title: 'Gapless',
    description: 'AI-Powered Text Explanation Service',
    type: 'website',
    // locale: 'en_US',
    url: 'https://gapless.vercel.app',
    siteName: 'Gapless',
    images: [
      {
        url: 'https://gapless.vercel.app/logo.png',
        alt: 'Gapless',
        width: 500,
        height: 500,
      },
    ],
  },
  twitter: {
    title: 'Gapless',
    description: 'AI-Powered Text Explanation Service',
    site: 'https://gapless.vercel.app',
    // siteId: '', // string;
    // creatorId: '',
    images: [
      {
        url: 'https://gapless.vercel.app/logo.png',
        alt: 'Gapless',
        width: 500,
        height: 500,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
