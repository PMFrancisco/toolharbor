import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { CssMinifierTool } from './CssMinifierTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'CSS Minifier',
  description:
    'Minify CSS code online. Remove comments, whitespace, and reduce file size instantly with this free CSS minifier.',
  slug: 'css-minifier',
  keywords: [
    'css minifier',
    'css compressor',
    'minify css',
    'compress css',
    'css reduce size',
    'css optimizer',
  ],
});

export default function CssMinifierPage() {
  return <CssMinifierTool />;
}
