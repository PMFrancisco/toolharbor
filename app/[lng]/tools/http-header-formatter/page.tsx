import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HttpHeaderFormatterTool } from './HttpHeaderFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'HTTP Header Formatter',
  description:
    'Format and normalize HTTP headers, convert between raw headers and JSON. Free online HTTP header tool.',
  slug: 'http-header-formatter',
  keywords: [
    'http header formatter',
    'http headers',
    'header to json',
    'normalize headers',
    'parse headers',
  ],
});

export default function HttpHeaderFormatterPage() {
  return <HttpHeaderFormatterTool />;
}
