import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TextToAsciiTool } from './TextToAsciiTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Text to ASCII Converter',
  description:
    'Convert text to ASCII codes (decimal, hex, binary, octal) or convert ASCII codes back to text. Free online ASCII converter.',
  slug: 'text-to-ascii',
  keywords: [
    'text to ascii',
    'ascii to text',
    'ascii converter',
    'char to ascii',
    'ascii code',
    'decimal to text',
    'hex to text',
    'binary to text',
  ],
});

export default function TextToAsciiPage() {
  return <TextToAsciiTool />;
}
