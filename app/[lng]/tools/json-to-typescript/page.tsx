import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonToTypescriptTool } from './JsonToTypescriptTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON to TypeScript',
  description:
    'Convert JSON to TypeScript interfaces or type aliases instantly. Free online tool that infers types from JSON data.',
  slug: 'json-to-typescript',
  keywords: [
    'json to typescript',
    'json to ts',
    'json to interface',
    'json to type',
    'typescript generator',
    'infer types from json',
  ],
});

export default function JsonToTypescriptPage() {
  return <JsonToTypescriptTool />;
}
