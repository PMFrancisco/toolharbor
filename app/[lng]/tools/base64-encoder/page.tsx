import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { Base64Tool } from './Base64Tool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Base64 Encoder/Decoder',
  description:
    'Encode and decode Base64 strings online. Free Base64 converter for text and data encoding.',
  slug: 'base64-encoder',
  keywords: ['base64', 'encoder', 'decoder', 'encode', 'decode', 'converter'],
});

export default function Base64Page() {
  return <Base64Tool />;
}
