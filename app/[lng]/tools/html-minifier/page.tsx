import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { HtmlMinifierTool } from './HtmlMinifierTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'HTML Minifier',
  description:
    'Minify HTML code online. Remove whitespace, comments, and reduce file size instantly with this free HTML minifier.',
  slug: 'html-minifier',
  keywords: [
    'html minifier',
    'html compressor',
    'minify html',
    'compress html',
    'html reduce size',
  ],
});

export default function HtmlMinifierPage() {
  return <HtmlMinifierTool />;
}
