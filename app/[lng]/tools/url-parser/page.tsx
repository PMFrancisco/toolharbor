import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { UrlParserTool } from './UrlParserTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'URL Parser',
  description:
    'Parse any URL into its components: protocol, host, path, query parameters, and hash. Free online URL parser for developers.',
  slug: 'url-parser',
  keywords: [
    'url parser',
    'parse url',
    'url components',
    'query parameters',
    'url breakdown',
    'url inspector',
    'url analyzer',
  ],
});

export default function UrlParserPage() {
  return <UrlParserTool />;
}
