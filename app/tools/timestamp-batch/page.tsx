import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TimestampBatchTool } from './TimestampBatchTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Timestamp Batch Converter',
  description:
    'Convert multiple Unix timestamps to dates at once. Batch timestamp converter with UTC and local timezone toggle.',
  slug: 'timestamp-batch',
  keywords: [
    'timestamp batch converter',
    'bulk timestamp',
    'multiple timestamps',
    'batch unix converter',
    'timestamp to date batch',
  ],
});

export default function TimestampBatchPage() {
  return <TimestampBatchTool />;
}
