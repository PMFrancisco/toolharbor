import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HttpStatusLookupTool } from './HttpStatusLookupTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'HTTP Status Code Lookup',
  description:
    'Look up HTTP status codes with descriptions. Search all HTTP response codes from 100 to 511.',
  slug: 'http-status-lookup',
  keywords: [
    'http status codes',
    'http response codes',
    'status code lookup',
    '404',
    '500',
    'http codes',
  ],
});

export default function HttpStatusLookupPage() {
  return <HttpStatusLookupTool />;
}
