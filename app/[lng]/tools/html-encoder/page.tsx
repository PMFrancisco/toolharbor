import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HtmlEncoderTool } from './HtmlEncoderTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'HTML Encoder/Decoder',
  description:
    'Encode and decode HTML entities online. Convert special characters to HTML entities and back. Free HTML encoder for developers.',
  slug: 'html-encoder',
  keywords: [
    'html encoder',
    'html decoder',
    'html entities',
    'encode html',
    'decode html',
    'html escape',
    'xss prevention',
  ],
});

export default function HtmlEncoderPage() {
  return <HtmlEncoderTool />;
}
