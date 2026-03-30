import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { SqlFormatterTool } from './SqlFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'SQL Formatter',
  description:
    'Format and beautify SQL queries online. Add proper indentation, uppercase keywords, and minify SQL for better readability.',
  slug: 'sql-formatter',
  keywords: [
    'sql formatter',
    'sql beautifier',
    'sql prettifier',
    'format sql',
    'sql minify',
    'query formatter',
  ],
});

export default function SqlFormatterPage() {
  return <SqlFormatterTool />;
}
