import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonFormatterTool } from './JsonFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON Formatter',
  description:
    'Format, validate, and beautify JSON data online. Free JSON formatter with syntax highlighting and error detection.',
  slug: 'json-formatter',
  keywords: ['json', 'formatter', 'validator', 'beautify', 'prettify', 'minify'],
});

export default function JsonFormatterPage() {
  return <JsonFormatterTool />;
}
