import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Header, Footer, GoogleAnalytics } from '@/components';
import { siteConfig } from '@/lib/seo';
import './globals.css';

const isProduction = process.env.NODE_ENV === 'production';
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
const gaId = isProduction ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID : undefined;

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} – Fast Browser Tools for Developers`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'developer tools',
    'browser tools',
    'json formatter',
    'jwt decoder',
    'base64 encoder',
    'regex tester',
    'api debugging tools',
    'data inspection',
    'online developer utilities',
  ],
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} – Fast Browser Tools for Developers`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} – Fast Browser Tools for Developers`,
    description: siteConfig.description,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {(adsenseId || gaId) && (
        <head>
          {adsenseId && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          )}
          {gaId && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `}
              </Script>
            </>
          )}
        </head>
      )}
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col bg-zinc-50 font-sans antialiased dark:bg-zinc-950`}
      >
        {gaId && (
          <Suspense fallback={null}>
            <GoogleAnalytics gaId={gaId} />
          </Suspense>
        )}
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
