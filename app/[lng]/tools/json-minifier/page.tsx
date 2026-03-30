import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonMinifierTool } from './JsonMinifierTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON Minifier',
  description:
    'Minify and compress JSON data online. Remove whitespace and reduce file size instantly with this free JSON minifier.',
  slug: 'json-minifier',
  keywords: [
    'json minifier',
    'json compressor',
    'minify json',
    'compress json',
    'json reduce size',
  ],
});

export default function JsonMinifierPage() {
  return <JsonMinifierTool />;
}
