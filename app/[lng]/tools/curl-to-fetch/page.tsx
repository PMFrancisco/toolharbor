import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CurlToFetchTool } from './CurlToFetchTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'cURL to Fetch Converter',
  description:
    'Convert curl commands to JavaScript fetch code instantly. Free online tool for developers.',
  slug: 'curl-to-fetch',
  keywords: [
    'curl to fetch',
    'curl to javascript',
    'curl converter',
    'curl to js',
    'convert curl',
    'fetch api',
  ],
});

export default function CurlToFetchPage() {
  return <CurlToFetchTool />;
}
