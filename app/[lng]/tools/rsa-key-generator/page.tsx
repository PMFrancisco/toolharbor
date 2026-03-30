import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { RsaKeyGeneratorTool } from './RsaKeyGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'RSA Key Pair Generator',
  description:
    'Generate RSA key pairs (2048 or 4096 bit) in PEM format using Web Crypto API. Free, client-side, no server.',
  slug: 'rsa-key-generator',
  keywords: [
    'rsa key generator',
    'rsa key pair',
    'generate rsa',
    'public key',
    'private key',
    'pem key',
    'web crypto',
  ],
});

export default function RsaKeyGeneratorPage() {
  return <RsaKeyGeneratorTool />;
}
