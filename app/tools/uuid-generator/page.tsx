import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { UuidTool } from './UuidTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'UUID Generator',
  description:
    'Generate random UUIDs (v4) online. Free UUID/GUID generator with bulk generation support.',
  slug: 'uuid-generator',
  keywords: ['uuid', 'guid', 'generator', 'random', 'unique identifier', 'v4'],
});

export default function UuidPage() {
  return <UuidTool />;
}
