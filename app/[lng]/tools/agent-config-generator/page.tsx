import type { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';
import { AgentConfigGeneratorTool } from './AgentConfigGeneratorTool';

export const metadata: Metadata = generateToolMetadata({
  name: 'AI Agent Config Generator',
  description:
    'Generate CLAUDE.md, .cursorrules, copilot-instructions.md, and more. Pick your stack and get config files for every AI coding agent.',
  slug: 'agent-config-generator',
  keywords: [
    'claude.md generator',
    'cursorrules generator',
    'ai agent config',
    'copilot instructions',
    'windsurf rules',
    'agents.md',
    'ai coding assistant config',
  ],
});

export default function AgentConfigGeneratorPage() {
  return <AgentConfigGeneratorTool />;
}
