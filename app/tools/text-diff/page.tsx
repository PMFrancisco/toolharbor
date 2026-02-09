import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TextDiffTool } from './TextDiffTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Text Diff Checker – Compare Texts & Find Differences Online',
  description:
    'Compare two texts side by side and see differences highlighted. Free online diff tool with ignore case, trim whitespace, and line-by-line comparison.',
  slug: 'text-diff',
  keywords: [
    'text diff',
    'diff checker',
    'compare text online',
    'text comparison tool',
    'find differences',
    'online diff',
    'text diff checker',
  ],
});

export default function TextDiffPage() {
  return <TextDiffTool />;
}
