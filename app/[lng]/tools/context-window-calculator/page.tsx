import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { ContextWindowCalculatorTool } from './ContextWindowCalculatorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'Context Window Calculator',
  description:
    'Calculate how much of an LLM context window your prompts use. Visual breakdown for GPT-4o, Claude, Llama, and Gemini.',
  slug: 'context-window-calculator',
  keywords: [
    'context window calculator',
    'llm context window',
    'token limit',
    'prompt size calculator',
    'gpt context limit',
    'claude context window',
  ],
});

export default function ContextWindowCalculatorPage() {
  return <ContextWindowCalculatorTool />;
}
