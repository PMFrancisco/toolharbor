import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonDiffTool } from './JsonDiffTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON Diff',
  description:
    'Compare two JSON objects and see differences highlighted. Free online semantic JSON diff tool for developers.',
  slug: 'json-diff',
  keywords: ['json diff', 'json compare', 'json difference', 'compare json', 'json diff tool'],
});

export default function JsonDiffPage() {
  return <JsonDiffTool />;
}
