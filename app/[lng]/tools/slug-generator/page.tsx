import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { SlugGeneratorTool } from './SlugGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Slug Generator',
  description:
    'Generate clean, URL-friendly slugs from any text. Free online slug generator with custom separators and accent transliteration.',
  slug: 'slug-generator',
  keywords: [
    'slug generator',
    'url slug',
    'slugify',
    'url friendly',
    'seo slug',
    'permalink generator',
    'url generator',
  ],
});

export default function SlugGeneratorPage() {
  return <SlugGeneratorTool />;
}
