import type { MetadataRoute } from 'next';
import { execSync } from 'child_process';
import { siteConfig } from '@/lib/seo';
import { tools } from '@/lib/tools-registry';

function getLastModified(path: string): Date {
  try {
    const timestamp = execSync(`git log -1 --format=%cI -- ${path}`).toString().trim();
    return timestamp ? new Date(timestamp) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: getLastModified('app/page.tsx'),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: getLastModified('app/tools/page.tsx'),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: getLastModified('app/privacy-policy'),
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: getLastModified('app/cookie-policy'),
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: getLastModified(`app/tools/${tool.slug}`),
  }));

  return [...staticPages, ...toolPages];
}
