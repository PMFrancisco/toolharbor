import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { NumberBaseConverterTool } from './NumberBaseConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Number Base Converter',
  description:
    'Convert numbers between binary, decimal, hexadecimal, and octal online. Free number base converter with instant results.',
  slug: 'number-base-converter',
  keywords: [
    'binary',
    'decimal',
    'hexadecimal',
    'octal',
    'number base converter',
    'radix converter',
    'base 2',
    'base 16',
  ],
});

export default function NumberBaseConverterPage() {
  return <NumberBaseConverterTool />;
}
