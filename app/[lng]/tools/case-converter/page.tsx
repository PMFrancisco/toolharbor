import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CaseConverterTool } from './CaseConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Case Converter',
  description:
    'Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, and more. Free online case converter for developers.',
  slug: 'case-converter',
  keywords: [
    'case converter',
    'camelCase',
    'PascalCase',
    'snake_case',
    'kebab-case',
    'naming convention',
    'text case',
    'convert case',
  ],
});

export default function CaseConverterPage() {
  return <CaseConverterTool />;
}
