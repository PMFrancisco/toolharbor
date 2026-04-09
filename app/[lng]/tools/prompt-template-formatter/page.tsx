import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { PromptTemplateFormatterTool } from './PromptTemplateFormatterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Prompt Template Formatter',
  description:
    'Create reusable prompt templates with {{variables}}. Fill values and preview the final prompt instantly.',
  slug: 'prompt-template-formatter',
  keywords: [
    'prompt template',
    'prompt formatter',
    'llm prompt builder',
    'ai prompt template',
    'prompt variables',
    'prompt engineering',
  ],
});

export default function PromptTemplateFormatterPage() {
  return <PromptTemplateFormatterTool />;
}
