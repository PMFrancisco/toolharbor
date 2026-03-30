import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { RemoveDuplicatesTool } from './RemoveDuplicatesTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Remove Duplicates from List',
  description:
    'Remove duplicate lines from any list or text instantly. Free online tool with trim, case-insensitive matching, and sorting.',
  slug: 'remove-duplicates',
  keywords: [
    'remove duplicates',
    'deduplicate list',
    'unique lines',
    'remove duplicate lines',
    'deduplicate text',
    'duplicate remover',
    'unique values',
  ],
});

export default function RemoveDuplicatesPage() {
  return <RemoveDuplicatesTool />;
}
