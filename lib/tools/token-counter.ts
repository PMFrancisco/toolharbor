export interface ModelTokenInfo {
  id: string;
  name: string;
  provider: string;
  charsPerToken: number;
  contextWindow: number;
}

export interface TokenEstimate {
  model: ModelTokenInfo;
  tokens: number;
  percentOfContext: string;
}

export interface TokenCountResult {
  characters: number;
  words: number;
  lines: number;
  estimates: TokenEstimate[];
}

export const AI_MODELS: ModelTokenInfo[] = [
  // OpenAI
  {
    id: 'gpt-5.4',
    name: 'GPT-5.4',
    provider: 'OpenAI',
    charsPerToken: 4.0,
    contextWindow: 272000,
  },
  {
    id: 'gpt-5.4-mini',
    name: 'GPT-5.4 Mini',
    provider: 'OpenAI',
    charsPerToken: 4.0,
    contextWindow: 400000,
  },
  {
    id: 'o3',
    name: 'o3',
    provider: 'OpenAI',
    charsPerToken: 4.0,
    contextWindow: 200000,
  },
  {
    id: 'o4-mini',
    name: 'o4-mini',
    provider: 'OpenAI',
    charsPerToken: 4.0,
    contextWindow: 200000,
  },
  // Anthropic
  {
    id: 'claude-opus-4.6',
    name: 'Claude Opus 4.6',
    provider: 'Anthropic',
    charsPerToken: 3.5,
    contextWindow: 1000000,
  },
  {
    id: 'claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    charsPerToken: 3.5,
    contextWindow: 1000000,
  },
  {
    id: 'claude-haiku-4.5',
    name: 'Claude Haiku 4.5',
    provider: 'Anthropic',
    charsPerToken: 3.5,
    contextWindow: 200000,
  },
  // Google
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    charsPerToken: 4.0,
    contextWindow: 1048576,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    charsPerToken: 4.0,
    contextWindow: 1048576,
  },
  // Meta
  {
    id: 'llama-4-scout',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    charsPerToken: 3.7,
    contextWindow: 10000000,
  },
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    charsPerToken: 3.7,
    contextWindow: 1000000,
  },
  // DeepSeek
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    charsPerToken: 3.5,
    contextWindow: 128000,
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    charsPerToken: 3.5,
    contextWindow: 128000,
  },
];

function estimateTokens(text: string, charsPerToken: number): number {
  if (!text.trim()) return 0;
  return Math.ceil(text.length / charsPerToken);
}

export function formatContextWindow(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M`;
  return `${(tokens / 1000).toFixed(0)}K`;
}

export function countTokens(input: string): TokenCountResult {
  if (!input.trim()) {
    return {
      characters: 0,
      words: 0,
      lines: 0,
      estimates: AI_MODELS.map((model) => ({
        model,
        tokens: 0,
        percentOfContext: '0',
      })),
    };
  }

  const characters = input.length;
  const words = input.trim().split(/\s+/).filter(Boolean).length;
  const lines = input.split('\n').length;

  const estimates = AI_MODELS.map((model) => {
    const tokens = estimateTokens(input, model.charsPerToken);
    const percentOfContext = ((tokens / model.contextWindow) * 100).toFixed(2);
    return { model, tokens, percentOfContext };
  });

  return { characters, words, lines, estimates };
}

export function formatTokenSummary(result: TokenCountResult): string {
  const lines = [
    `Characters: ${result.characters.toLocaleString()}`,
    `Words: ${result.words.toLocaleString()}`,
    `Lines: ${result.lines.toLocaleString()}`,
    '',
    'Token Estimates:',
    ...result.estimates.map(
      (e) =>
        `  ${e.model.name}: ~${e.tokens.toLocaleString()} tokens (${e.percentOfContext}% of ${formatContextWindow(e.model.contextWindow)})`
    ),
  ];
  return lines.join('\n');
}
