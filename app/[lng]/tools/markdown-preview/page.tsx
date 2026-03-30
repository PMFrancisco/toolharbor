import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { MarkdownPreviewTool } from './MarkdownPreviewTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Markdown Preview',
  description:
    'Preview Markdown as HTML in real-time. Write and format documentation with instant visual feedback and copy the HTML output.',
  slug: 'markdown-preview',
  keywords: ['markdown', 'preview', 'editor', 'html', 'documentation', 'readme', 'formatter'],
});

export default function MarkdownPreviewPage() {
  return <MarkdownPreviewTool />;
}
