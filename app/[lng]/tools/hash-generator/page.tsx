import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HashGeneratorTool } from './HashGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Hash Generator',
  description:
    'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes online. Free hash calculator with instant results.',
  slug: 'hash-generator',
  keywords: ['hash generator', 'md5', 'sha1', 'sha256', 'sha512', 'checksum', 'hash calculator'],
});

export default function HashGeneratorPage() {
  return <HashGeneratorTool />;
}
