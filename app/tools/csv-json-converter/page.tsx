import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CsvJsonConverterTool } from './CsvJsonConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'CSV to JSON Converter',
  description:
    'Convert CSV to JSON and JSON to CSV online. Free converter for spreadsheet data with custom delimiter support.',
  slug: 'csv-json-converter',
  keywords: ['csv', 'json', 'converter', 'spreadsheet', 'data transform', 'tsv', 'export'],
});

export default function CsvJsonConverterPage() {
  return <CsvJsonConverterTool />;
}
