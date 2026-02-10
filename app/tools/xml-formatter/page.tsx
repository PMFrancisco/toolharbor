import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { XmlFormatterTool } from './XmlFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'XML Formatter',
  description:
    'Format, validate, and beautify XML data online. Free XML formatter with syntax validation and customizable indentation.',
  slug: 'xml-formatter',
  keywords: ['xml', 'formatter', 'beautifier', 'validator', 'prettifier', 'minifier'],
});

export default function XmlFormatterPage() {
  return <XmlFormatterTool />;
}
