export const toolInfo = {
  name: 'Word & Character Counter',
  description:
    'Count words, characters, sentences, paragraphs, and more. Includes reading time estimate and top keyword analysis.',
  slug: 'word-counter',
};

export const relatedTools = [
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'Find & Replace', href: '/tools/find-replace' },
  { name: 'Remove Duplicates', href: '/tools/remove-duplicates' },
  { name: 'Markdown Preview', href: '/tools/markdown-preview' },
];

export const features = [
  'Count words, characters, and characters without spaces',
  'Count sentences, paragraphs, and lines',
  'Estimate reading time and speaking time',
  'Top 5 keyword analysis with word density',
  'Copy full stats summary to clipboard',
  'Real-time counting as you type',
];

export const howToSteps = [
  'Paste or type your text in the input area',
  'All statistics update instantly as you type',
  'View reading and speaking time estimates',
  'Check the top keywords section for word frequency analysis',
  'Click "Copy Summary" to copy all stats as plain text',
];

export const examples = [
  {
    title: 'Blog post intro',
    input:
      'Building a REST API with Node.js is easier than you think. In this guide, we cover routing, middleware, error handling, and deployment. By the end, you will have a production-ready API.',
    output: 'Words: 32 | Characters: 186 | Sentences: 3 | Reading time: < 1 min',
  },
  {
    title: 'Product description',
    input:
      'Our wireless headphones deliver crystal-clear sound with 30 hours of battery life. The active noise cancellation blocks out distractions so you can focus on what matters.',
    output: 'Words: 28 | Characters: 167 | Sentences: 2 | Reading time: < 1 min',
  },
];

export const explanation = {
  title: 'Why Use a Word and Character Counter?',
  content: [
    'A word and character counter is an essential tool for writers, developers, marketers, and students. Whether you are writing a blog post, crafting a tweet, preparing an essay, or optimizing meta descriptions, knowing the exact length of your text helps you stay within limits and improve clarity.',
    'Social media platforms enforce strict character limits — X (Twitter) allows 280 characters, Instagram captions cap at 2,200, and LinkedIn posts work best under 1,300 characters. Meta titles should stay under 60 characters and meta descriptions under 160. This tool makes it easy to check at a glance without counting manually.',
    'The reading time estimate uses an average speed of 238 words per minute, which is the widely accepted norm for adult English readers. Speaking time uses 150 words per minute, useful when preparing presentations, speeches, or video scripts. Both estimates update in real time as you edit your text.',
    'The keyword analysis section shows your top 5 most frequently used words, excluding common stop words like "the", "and", "is", and similar function words. It also calculates keyword density — the percentage each word represents out of your total word count. This is useful for SEO content writers who need to maintain natural keyword distribution without over-optimization.',
    'All processing happens in your browser. Your text is never uploaded to any server, making this tool safe for confidential documents, private notes, and unpublished content. The stats summary can be copied to your clipboard as formatted plain text for reports or documentation.',
  ],
};

export const faqItems = [
  {
    question: 'How is reading time calculated?',
    answer:
      'Reading time is based on an average reading speed of 238 words per minute, which is the widely accepted standard for silent reading in English. The tool rounds up to the nearest minute.',
  },
  {
    question: 'What counts as a sentence?',
    answer:
      'A sentence is detected by ending punctuation: periods (.), exclamation marks (!), or question marks (?). Multiple consecutive punctuation marks (like "..." or "?!") count as one sentence boundary.',
  },
  {
    question: 'What counts as a paragraph?',
    answer:
      'A paragraph is a block of text separated by one or more blank lines. A single block of text with no blank lines counts as one paragraph.',
  },
  {
    question: 'How does keyword analysis work?',
    answer:
      'The tool counts word frequency while filtering out common English stop words (the, and, is, etc.) and words shorter than 2 characters. It shows the top 5 words by frequency along with their density percentage.',
  },
  {
    question: 'Is my text stored or sent to a server?',
    answer:
      'No. All counting and analysis happens entirely in your browser using client-side JavaScript. Your text never leaves your device.',
  },
];
