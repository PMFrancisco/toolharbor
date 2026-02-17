import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { SqlMinifierTool } from './SqlMinifierTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'SQL Minifier',
  description:
    'Minify SQL queries online. Remove whitespace and compress SQL code to a single line instantly with this free SQL minifier.',
  slug: 'sql-minifier',
  keywords: ['sql minifier', 'sql compressor', 'minify sql', 'compress sql', 'sql one line'],
});

export default function SqlMinifierPage() {
  return <SqlMinifierTool />;
}
