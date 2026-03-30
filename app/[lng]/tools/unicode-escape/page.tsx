import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { UnicodeEscapeTool } from './UnicodeEscapeTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Unicode Escape/Unescape',
  description:
    'Escape text to \\uXXXX Unicode sequences or unescape them back to readable text. Convert non-ASCII characters to escape codes online.',
  slug: 'unicode-escape',
  keywords: [
    'unicode escape',
    'unicode unescape',
    'unicode converter',
    'text to unicode',
    'uXXXX',
    'ascii escape',
    'non-ascii characters',
    'escape sequences',
  ],
});

export default function UnicodeEscapePage() {
  return <UnicodeEscapeTool />;
}
