import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { JsonCsvConverterTool } from './JsonCsvConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'JSON to CSV Converter',
  description:
    'Convert JSON to CSV online. Export JSON arrays to CSV format for Excel, Google Sheets, and spreadsheet applications.',
  slug: 'json-csv-converter',
  keywords: ['json', 'csv', 'converter', 'excel', 'spreadsheet', 'export', 'array'],
});

export default function JsonCsvConverterPage() {
  return <JsonCsvConverterTool />;
}
