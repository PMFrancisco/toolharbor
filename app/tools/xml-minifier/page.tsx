import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { XmlMinifierTool } from './XmlMinifierTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'XML Minifier',
  description:
    'Minify XML code online. Remove whitespace and reduce file size instantly with this free XML minifier and compressor.',
  slug: 'xml-minifier',
  keywords: ['xml minifier', 'xml compressor', 'minify xml', 'compress xml', 'xml reduce size'],
});

export default function XmlMinifierPage() {
  return <XmlMinifierTool />;
}
