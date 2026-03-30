import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TimestampConverterTool } from './TimestampConverterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Timestamp Converter',
  description:
    'Convert Unix timestamps to dates and dates to timestamps. Support for seconds and milliseconds with multiple output formats.',
  slug: 'timestamp-converter',
  keywords: [
    'unix timestamp',
    'epoch',
    'date converter',
    'time converter',
    'milliseconds',
    'datetime',
  ],
});

export default function TimestampConverterPage() {
  return <TimestampConverterTool />;
}
