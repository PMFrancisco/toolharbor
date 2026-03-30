import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { MimeTypeLookupTool } from './MimeTypeLookupTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'MIME Type Lookup',
  description:
    'Look up MIME types by file extension or content type. Complete reference of MIME types for web development.',
  slug: 'mime-type-lookup',
  keywords: [
    'mime types',
    'content type',
    'mime type lookup',
    'file extension',
    'content-type header',
  ],
});

export default function MimeTypeLookupPage() {
  return <MimeTypeLookupTool />;
}
