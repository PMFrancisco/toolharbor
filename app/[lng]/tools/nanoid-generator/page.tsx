import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { NanoidGeneratorTool } from './NanoidGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'NanoID Generator',
  description:
    'Generate NanoID-style random IDs with customizable length, alphabet, and batch count. Free online ID generator.',
  slug: 'nanoid-generator',
  keywords: [
    'nanoid generator',
    'nanoid',
    'random id generator',
    'short id',
    'unique id',
    'custom alphabet id',
  ],
});

export default function NanoidGeneratorPage() {
  return <NanoidGeneratorTool />;
}
