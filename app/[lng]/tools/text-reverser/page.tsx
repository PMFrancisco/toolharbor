import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TextReverserTool } from './TextReverserTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Text Reverser Online – Reverse Characters, Words & Lines',
  description:
    'Reverse text by characters, words, or lines instantly. Free online tool for flipping strings and text. Handles Unicode and emoji.',
  slug: 'text-reverser',
  keywords: [
    'text reverser',
    'reverse text online',
    'reverse string',
    'flip text',
    'backwards text',
    'reverse words',
    'mirror text',
  ],
});

export default function TextReverserPage() {
  return <TextReverserTool />;
}
