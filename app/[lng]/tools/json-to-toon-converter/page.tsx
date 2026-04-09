import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonToToonConverterTool } from './JsonToToonConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON to TOON Converter',
  description:
    'Convert JSON to TOON (Token-Oriented Object Notation) and see token savings. Compact, LLM-friendly format.',
  slug: 'json-to-toon-converter',
  keywords: [
    'json to toon',
    'toon format',
    'token oriented object notation',
    'reduce llm tokens',
    'compact json',
    'llm data format',
  ],
});

export default function JsonToToonConverterPage() {
  return <JsonToToonConverterTool />;
}
