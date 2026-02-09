import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { LineNumbersTool } from './LineNumbersTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Line Numbering Tool – Add Line Numbers to Text Online',
  description:
    'Add line numbers to any text online. Choose format, start number, and padding. Free tool for code, lists, and documents.',
  slug: 'line-numbers',
  keywords: [
    'add line numbers',
    'line numbering tool',
    'number lines online',
    'line numbers text',
    'prepend line numbers',
    'numbered list generator',
    'add numbers to lines',
  ],
});

export default function LineNumbersPage() {
  return <LineNumbersTool />;
}
