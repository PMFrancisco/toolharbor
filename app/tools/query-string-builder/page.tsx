import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { QueryStringBuilderTool } from './QueryStringBuilderTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Query String Builder',
  description:
    'Build URL query strings from key-value pairs visually. Parse existing URLs into editable parameters. Free online query string builder.',
  slug: 'query-string-builder',
  keywords: [
    'query string builder',
    'url builder',
    'query parameters',
    'build url',
    'url query string',
    'api url builder',
    'url generator',
  ],
});

export default function QueryStringBuilderPage() {
  return <QueryStringBuilderTool />;
}
