import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { FindReplaceTool } from './FindReplaceTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Find & Replace Tool',
  description:
    'Find and replace text online with regex support, case sensitivity, and whole word matching. Free browser-based find and replace.',
  slug: 'find-replace',
  keywords: [
    'find and replace',
    'text replace',
    'find replace online',
    'regex replace',
    'search and replace',
    'text editor',
    'bulk replace',
  ],
});

export default function FindReplacePage() {
  return <FindReplaceTool />;
}
