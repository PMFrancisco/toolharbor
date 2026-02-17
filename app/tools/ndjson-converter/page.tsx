import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { NdjsonConverterTool } from './NdjsonConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'NDJSON Converter',
  description:
    'Convert between JSON arrays and NDJSON (Newline Delimited JSON) format. Free online JSON Lines converter.',
  slug: 'ndjson-converter',
  keywords: [
    'ndjson converter',
    'json lines',
    'ndjson',
    'jsonl',
    'newline delimited json',
    'json to ndjson',
  ],
});

export default function NdjsonConverterPage() {
  return <NdjsonConverterTool />;
}
