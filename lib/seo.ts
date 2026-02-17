import type { Metadata } from 'next';

export const siteConfig = {
  name: 'ToolHarbor',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://toolharbor.dev',
  description:
    'Free online developer tools. JSON formatter, Base64 encoder, regex tester, and more. Fast, simple, no login required.',
  author: 'ToolHarbor',
  locale: 'en_US',
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * Generate metadata for a page with Open Graph and Twitter Card support
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

interface ToolMetadataOptions {
  name: string;
  description: string;
  slug: string;
  keywords?: string[];
}

/**
 * Generate metadata specifically for tool pages
 */
export function generateToolMetadata({
  name,
  description,
  slug,
  keywords = [],
}: ToolMetadataOptions): Metadata {
  const defaultKeywords = ['developer tools', 'online tools', 'free tools', name.toLowerCase()];

  return generatePageMetadata({
    title: name,
    description,
    path: `/tools/${slug}`,
    keywords: [...defaultKeywords, ...keywords],
  });
}

/**
 * Generate JSON-LD for the website (use on homepage)
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD WebApplication schema (use on homepage alongside WebSite)
 */
export function generateWebApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/**
 * Generate JSON-LD for a software tool
 */
export function generateToolJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${siteConfig.url}/tools/${slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

/**
 * Generate JSON-LD BreadcrumbList
 */
export function generateBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
