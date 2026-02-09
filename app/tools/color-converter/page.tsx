import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { ColorConverterTool } from './ColorConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Color Converter',
  description:
    'Convert colors between HEX, RGB, and HSL formats instantly. Free online color converter with live preview for developers and designers.',
  slug: 'color-converter',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hsl to hex',
    'color picker',
    'hex to hsl',
    'color format converter',
  ],
});

export default function ColorConverterPage() {
  return <ColorConverterTool />;
}
