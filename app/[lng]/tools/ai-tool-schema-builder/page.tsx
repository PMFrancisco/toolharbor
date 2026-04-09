import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { AiToolSchemaBuilderTool } from './AiToolSchemaBuilderTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'AI Tool Schema Builder',
  description:
    'Build function calling schemas for OpenAI and Anthropic Claude visually. Add parameters, set types, and export JSON.',
  slug: 'ai-tool-schema-builder',
  keywords: [
    'function calling schema',
    'openai tool schema',
    'claude tool use',
    'ai function schema builder',
    'tool definition json',
    'llm tool schema',
  ],
});

export default function AiToolSchemaBuilderPage() {
  return <AiToolSchemaBuilderTool />;
}
