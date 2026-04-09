export const toolInfo = {
  name: 'Context Window Calculator',
  description:
    'Calculate how much of an LLM context window your prompts use. Visual breakdown for GPT-4o, Claude, Llama, and Gemini.',
  slug: 'context-window-calculator',
};

export const relatedTools = [
  { name: 'LLM Token Counter', href: '/tools/token-counter' },
  { name: 'Word & Character Counter', href: '/tools/word-counter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Calculate context window usage for 14 LLM models across 5 providers',
  'Separate inputs for system prompt, few-shot examples, and user message',
  'Visual progress bar with color-coded usage levels',
  'Real-time token estimation as you type',
  'Breakdown of tokens per section with total and remaining counts',
  'Copy full analysis summary to clipboard',
];

export const howToSteps = [
  'Select your target model from the dropdown — context window size updates automatically',
  'Enter your system prompt in the first textarea',
  'Add any few-shot examples in the second textarea (optional)',
  'Type the user message in the third textarea',
  'Watch the usage bar and breakdown update in real time as you type',
  'Click "Copy Summary" to export the full analysis as plain text',
];

export const examples = [
  {
    title: 'Simple chatbot prompt',
    input:
      'Model: GPT-5.4 | System: "You are a helpful assistant." | Message: "What is TypeScript?"',
    output: 'System: ~10 tokens | Message: ~5 tokens | Total: ~15 / 272K (0.01%)',
  },
  {
    title: 'Few-shot coding assistant',
    input: 'Model: Claude Opus 4.6 | System: 150 chars | Examples: 800 chars | Message: 200 chars',
    output:
      'System: ~43 tokens | Examples: ~229 tokens | Message: ~57 tokens | Total: ~329 / 1.0M (0.03%)',
  },
];

export const explanation = {
  title: 'Why Use a Context Window Calculator?',
  content: [
    "Every LLM has a context window — a maximum number of tokens it can process in a single request. This includes your system prompt, conversation history, few-shot examples, the user message, and the model's response. If your input exceeds the context window, the API will reject the request or truncate your content.",
    "This calculator helps you design prompts that fit within your target model's limits. By separating inputs into system prompt, few-shot examples, and user message, you can see exactly where your tokens are going and optimize each section independently. The visual bar gives instant feedback on how close you are to the limit.",
    'Context window sizes vary dramatically across models. DeepSeek V3 offers 128K tokens, GPT-5.4 provides 272K, Claude Opus 4.6 and Sonnet 4.6 support 1M, and Llama 4 Scout leads with 10M tokens. Choosing the right model for your use case often depends on how much context you need. This tool lets you compare models and find the most efficient fit.',
    "For production applications, you need to reserve tokens for the model's response. If your prompt uses 90% of the context window, the model only has 10% left for its answer. A good rule of thumb is to keep prompt usage under 50-60% for conversational applications and under 80% for single-turn tasks. The color-coded bar helps you stay in safe territory.",
    'All calculations happen in your browser. Your system prompts, examples, and messages are never sent to any server. This makes the tool safe for confidential prompts, proprietary few-shot examples, and internal documentation that you plan to include in your LLM context.',
  ],
};

export const faqItems = [
  {
    question: 'How is token usage calculated?',
    answer:
      'Token counts are estimated using average character-to-token ratios for each model family. OpenAI models average about 4 characters per token, Anthropic about 3.5, and Meta about 3.7. These are approximations — actual counts depend on the specific tokenizer and content type.',
  },
  {
    question: 'What do the usage bar colors mean?',
    answer:
      "Green (0-25%) means you have plenty of room. Yellow-green (25-50%) is moderate usage. Yellow (50-80%) means you're using a significant portion. Red (80%+) means you're near the limit and should consider shortening your prompt or using a model with a larger context window.",
  },
  {
    question: "Should I leave room for the model's response?",
    answer:
      'Yes. The context window includes both input and output tokens. If your prompt fills 95% of the window, the model can only generate a very short response. For chat applications, aim to keep prompt usage under 50%. For single-turn tasks with known output length, you can go higher.',
  },
  {
    question: 'Why do Claude models show more tokens for the same text?',
    answer:
      "Anthropic's tokenizer uses a slightly smaller average characters-per-token ratio than OpenAI's, resulting in higher token counts for the same text. This is normal — different tokenizer vocabularies encode text at different densities.",
  },
  {
    question: 'Is this tool useful for estimating API costs?',
    answer:
      "Yes. Since most providers charge per token, knowing approximate token counts helps you estimate costs before making API calls. Multiply the estimated tokens by your provider's per-token price to get a cost estimate. Check each provider's pricing page for current rates.",
  },
];
