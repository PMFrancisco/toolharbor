import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CsvViewerTool } from './CsvViewerTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'CSV Viewer',
  description:
    'View and preview CSV data as a formatted table online. Free CSV viewer with delimiter support and header detection.',
  slug: 'csv-viewer',
  keywords: ['csv', 'viewer', 'table', 'preview', 'spreadsheet', 'tsv', 'data'],
});

export default function CsvViewerPage() {
  return <CsvViewerTool />;
}
