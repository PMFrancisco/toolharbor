import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { LoremIpsumTool } from './LoremIpsumTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Lorem Ipsum Generator – Placeholder Text for Designers & Developers',
  description:
    'Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free online generator for mockups, wireframes, and prototypes.',
  slug: 'lorem-ipsum-generator',
  keywords: [
    'lorem ipsum generator',
    'placeholder text',
    'dummy text generator',
    'lorem ipsum',
    'filler text',
    'lipsum generator',
    'sample text generator',
  ],
});

export default function LoremIpsumPage() {
  return <LoremIpsumTool />;
}
