export const toolInfo = {
  name: 'LLM Token Counter',
  description:
    'Estimate token counts for GPT-4o, Claude, Llama, and Gemini models. Compare usage across providers in real time.',
  slug: 'token-counter',
};

export const relatedTools = [
  { name: 'Context Window Calculator', href: '/tools/context-window-calculator' },
  { name: 'Word & Character Counter', href: '/tools/word-counter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Estimate token counts for 14 popular LLM models across 5 providers',
  'Real-time counting as you type with instant updates',
  'Compare token usage across OpenAI, Anthropic, Google, Meta, and DeepSeek models',
  "See what percentage of each model's context window your text uses",
  'Copy full summary with all model estimates to clipboard',
  'Includes character, word, and line counts alongside token estimates',
];

export const howToSteps = [
  'Paste or type your text — a prompt, system message, or any content you plan to send to an LLM',
  'View the text stats section for character, word, and line counts',
  'Check the token estimates table to see approximate token usage per model',
  'Compare the "% Used" column to understand how much of each model\'s context window your text occupies',
  'Click "Copy Summary" to copy all estimates as plain text for documentation or cost calculations',
];

export const examples = [
  {
    title: 'Short system prompt',
    input: 'You are a helpful assistant that answers questions about software development.',
    output: 'GPT-5.4: ~18 tokens | Claude Opus 4.6: ~21 tokens | Llama 4 Scout: ~20 tokens',
  },
  {
    title: 'Code snippet with context',
    input:
      'function binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n  }\n  return -1;\n}',
    output: 'GPT-5.4: ~58 tokens | Claude Opus 4.6: ~66 tokens | Llama 4 Scout: ~63 tokens',
  },
];

export const explanation = {
  title: 'Why Estimate LLM Token Counts?',
  content: [
    'Large language models process text as tokens — chunks of characters that typically represent common words, subwords, or individual characters. Understanding how many tokens your text uses is essential for managing costs, staying within context limits, and optimizing prompt engineering workflows.',
    "Different model providers use different tokenizers. OpenAI models use o200k_base, Anthropic uses their own tokenizer, Meta's Llama models use SentencePiece, Google's Gemini has its own approach, and DeepSeek uses a custom vocabulary. This means the same text produces different token counts depending on the model. This tool estimates counts for all major providers so you can compare side by side.",
    'Token counts directly impact API costs. Most providers charge per token for both input and output. A prompt that uses 1,000 tokens on GPT-5.4 costs differently than the same prompt on Claude Sonnet 4.6. By estimating tokens before sending requests, you can choose the most cost-effective model for your use case and avoid unexpected bills.',
    "Context window limits determine how much text a model can process in a single request. These range from 128K tokens for DeepSeek models to 10M for Llama 4 Scout. If your system prompt, few-shot examples, and user message exceed the context window, the API call will fail. This tool shows what percentage of each model's context window your text occupies, helping you design prompts that fit comfortably within limits.",
    "All estimation happens in your browser using average character-to-token ratios per model family. While actual tokenizer output may vary slightly — especially for code, non-English text, or unusual formatting — these estimates are accurate enough for planning and cost estimation. For exact counts, use each provider's official tokenizer.",
  ],
};

export const faqItems = [
  {
    question: 'How accurate are the token estimates?',
    answer:
      "The estimates use average character-to-token ratios derived from each model family's tokenizer behavior on English text. They are typically within 10-15% of actual counts. For exact numbers, use the official tokenizer from each provider (e.g., tiktoken for OpenAI).",
  },
  {
    question: 'Why do different models produce different token counts?',
    answer:
      "Each model family uses a different tokenizer with a different vocabulary. Anthropic's tokenizer tends to produce slightly more tokens per character than OpenAI's, while Meta's SentencePiece tokenizer falls in between. The vocabulary size and training data affect how efficiently text is tokenized.",
  },
  {
    question: 'What is a context window?',
    answer:
      "A context window is the maximum number of tokens a model can process in a single request, including both the input (your prompt) and the output (the model's response). For example, GPT-4o has a 128K token context window, meaning your prompt and the response together cannot exceed 128,000 tokens.",
  },
  {
    question: 'Does this tool handle code and non-English text?',
    answer:
      'Yes, but estimates may be less precise for code and non-English text. Code typically uses more tokens per character due to special characters and formatting. Non-English text, especially languages with non-Latin scripts, may also tokenize differently. The estimates remain useful for ballpark planning.',
  },
  {
    question: 'Is my text sent to any server?',
    answer:
      'No. All token estimation happens entirely in your browser using client-side JavaScript. Your text never leaves your device, making this safe for proprietary code, confidential prompts, and sensitive data.',
  },
];
