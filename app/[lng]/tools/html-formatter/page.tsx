import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HtmlFormatterTool } from './HtmlFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'HTML Formatter',
  description:
    'Format, beautify, and minify HTML code online. Free HTML formatter with proper indentation and void element handling.',
  slug: 'html-formatter',
  keywords: ['html', 'formatter', 'beautifier', 'prettifier', 'minifier', 'indentation'],
});

export default function HtmlFormatterPage() {
  return <HtmlFormatterTool />;
}
