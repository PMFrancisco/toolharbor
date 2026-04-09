import { AI_MODELS, formatContextWindow } from './token-counter';
import type { ModelTokenInfo } from './token-counter';

export type UsageLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ContextSection {
  label: string;
  tokens: number;
}

export interface ContextAnalysis {
  model: ModelTokenInfo;
  sections: ContextSection[];
  totalTokens: number;
  remainingTokens: number;
  usagePercent: number;
  usageLevel: UsageLevel;
}

function estimateTokens(text: string, charsPerToken: number): number {
  if (!text.trim()) return 0;
  return Math.ceil(text.length / charsPerToken);
}

function getUsageLevel(percent: number): UsageLevel {
  if (percent < 25) return 'low';
  if (percent < 50) return 'medium';
  if (percent < 80) return 'high';
  return 'critical';
}

export function analyzeContext(
  modelId: string,
  systemPrompt: string,
  fewShotExamples: string,
  userMessage: string
): ContextAnalysis {
  const model = AI_MODELS.find((m) => m.id === modelId) || AI_MODELS[0];

  const sections: ContextSection[] = [
    {
      label: 'System Prompt',
      tokens: estimateTokens(systemPrompt, model.charsPerToken),
    },
    {
      label: 'Few-shot Examples',
      tokens: estimateTokens(fewShotExamples, model.charsPerToken),
    },
    {
      label: 'User Message',
      tokens: estimateTokens(userMessage, model.charsPerToken),
    },
  ];

  const totalTokens = sections.reduce((sum, s) => sum + s.tokens, 0);
  const remainingTokens = Math.max(0, model.contextWindow - totalTokens);
  const usagePercent = model.contextWindow > 0 ? (totalTokens / model.contextWindow) * 100 : 0;
  const usageLevel = getUsageLevel(usagePercent);

  return { model, sections, totalTokens, remainingTokens, usagePercent, usageLevel };
}

export function formatContextSummary(analysis: ContextAnalysis): string {
  const lines = [
    `Model: ${analysis.model.name} (${formatContextWindow(analysis.model.contextWindow)} context)`,
    '',
    ...analysis.sections.map((s) => `${s.label}: ~${s.tokens.toLocaleString()} tokens`),
    '',
    `Total: ~${analysis.totalTokens.toLocaleString()} / ${analysis.model.contextWindow.toLocaleString()} tokens`,
    `Remaining: ~${analysis.remainingTokens.toLocaleString()} tokens`,
    `Usage: ${analysis.usagePercent.toFixed(1)}%`,
  ];
  return lines.join('\n');
}
