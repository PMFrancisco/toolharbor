import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { ToonFormatterTool } from './ToonFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'TOON Formatter & Validator',
  description:
    'Validate TOON (Token-Oriented Object Notation) data and convert it back to JSON. Check syntax and preview parsed output.',
  slug: 'toon-formatter',
  keywords: [
    'toon formatter',
    'toon validator',
    'toon to json',
    'token oriented object notation',
    'toon parser',
    'validate toon',
  ],
});

export default function ToonFormatterPage() {
  return <ToonFormatterTool />;
}
