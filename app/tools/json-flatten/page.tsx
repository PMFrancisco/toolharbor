import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonFlattenTool } from './JsonFlattenTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON Flatten/Unflatten',
  description:
    'Flatten nested JSON to dot-notation keys or unflatten back to nested structure. Free online tool for developers.',
  slug: 'json-flatten',
  keywords: [
    'json flatten',
    'json unflatten',
    'flatten json',
    'dot notation json',
    'json to flat',
    'nested to flat json',
  ],
});

export default function JsonFlattenPage() {
  return <JsonFlattenTool />;
}
