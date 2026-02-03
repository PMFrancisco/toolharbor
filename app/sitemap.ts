import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export const tools = [
  { slug: 'json-formatter', name: 'JSON Formatter' },
  { slug: 'base64', name: 'Base64 Encoder' },
  { slug: 'regex-tester', name: 'Regex Tester' },
  { slug: 'jwt-decoder', name: 'JWT Decoder' },
  { slug: 'hash-generator', name: 'Hash Generator' },
  { slug: 'url-encoder', name: 'URL Encoder' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages];
}
