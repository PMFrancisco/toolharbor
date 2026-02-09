import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { WordCounterTool } from './WordCounterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Word & Character Counter',
  description:
    'Count words, characters, sentences, and paragraphs instantly. Free online word counter with reading time and keyword density analysis.',
  slug: 'word-counter',
  keywords: [
    'word counter',
    'character counter',
    'word count',
    'character count',
    'reading time',
    'keyword density',
    'text analysis',
  ],
});

export default function WordCounterPage() {
  return <WordCounterTool />;
}
