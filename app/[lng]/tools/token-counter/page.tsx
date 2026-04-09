import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { TokenCounterTool } from './TokenCounterTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'LLM Token Counter',
  description:
    'Estimate token counts for GPT-4o, Claude, Llama, and Gemini models. Compare token usage across providers instantly.',
  slug: 'token-counter',
  keywords: [
    'token counter',
    'llm token counter',
    'gpt token counter',
    'claude token counter',
    'token estimator',
    'context window',
    'openai tokens',
  ],
});

export default function TokenCounterPage() {
  return <TokenCounterTool />;
}
