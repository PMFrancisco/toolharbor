import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TextSorterTool } from './TextSorterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Text Sorter Online – Sort Lines Alphabetically, by Length & More',
  description:
    'Sort lines of text alphabetically (A-Z, Z-A), by length, or randomly. Free online text sorter with case-sensitive and trim options.',
  slug: 'text-sorter',
  keywords: [
    'text sorter',
    'sort lines online',
    'alphabetical sort',
    'sort text by length',
    'random shuffle lines',
    'line sorter',
    'sort list online',
  ],
});

export default function TextSorterPage() {
  return <TextSorterTool />;
}
