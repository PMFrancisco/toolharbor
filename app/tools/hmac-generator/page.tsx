import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HmacGeneratorTool } from './HmacGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'HMAC Generator',
  description:
    'Generate HMAC-SHA256, HMAC-SHA384, and HMAC-SHA512 hashes online. Free HMAC calculator with Web Crypto API.',
  slug: 'hmac-generator',
  keywords: [
    'hmac generator',
    'hmac sha256',
    'hmac calculator',
    'hmac online',
    'hmac sha512',
    'message authentication code',
  ],
});

export default function HmacGeneratorPage() {
  return <HmacGeneratorTool />;
}
