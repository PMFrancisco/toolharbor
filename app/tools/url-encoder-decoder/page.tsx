import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { UrlEncoderDecoderTool } from './UrlEncoderDecoderTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'URL Encoder/Decoder',
  description:
    'Encode and decode URLs online. Convert special characters to percent-encoding and decode URL-encoded strings.',
  slug: 'url-encoder-decoder',
  keywords: [
    'url encoder',
    'url decoder',
    'percent encoding',
    'urlencode',
    'query string',
    'encodeURIComponent',
  ],
});

export default function UrlEncoderDecoderPage() {
  return <UrlEncoderDecoderTool />;
}
