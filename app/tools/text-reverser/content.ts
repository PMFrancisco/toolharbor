export const toolInfo = {
  name: 'Text Reverser Online',
  description:
    'Reverse text by characters, words, or lines instantly. Free online tool for flipping strings, words, and line order.',
  slug: 'text-reverser',
};

export const relatedTools = [
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'Text Sorter', href: '/tools/text-sorter' },
  { name: 'Find & Replace', href: '/tools/find-replace' },
  { name: 'Word Counter', href: '/tools/word-counter' },
];

export const features = [
  'Reverse text character by character',
  'Reverse word order within each line',
  'Reverse line order (flip top to bottom)',
  'Handles Unicode and emoji correctly',
  'Instant results as you type',
  'Copy reversed text with one click',
];

export const howToSteps = [
  'Paste or type your text into the input area',
  'Choose a reverse mode: Characters, Words, or Lines',
  'The reversed result appears instantly in the output panel',
  'Click Copy to copy the reversed text to your clipboard',
];

export const examples = [
  {
    title: 'Reverse characters',
    input: 'Hello, World!',
    output: '!dlroW ,olleH',
  },
  {
    title: 'Reverse words',
    input: 'The quick brown fox',
    output: 'fox brown quick The',
  },
  {
    title: 'Reverse lines',
    input: 'First line\nSecond line\nThird line',
    output: 'Third line\nSecond line\nFirst line',
  },
  {
    title: 'Reverse characters (multiline)',
    input: 'abc\ndef\nghi',
    output: 'ihg\nfed\ncba',
  },
];

export const explanation = {
  title: 'How to Reverse Text Online',
  content: [
    'Reversing text is a simple but surprisingly useful operation. Whether you need to flip a string for a coding challenge, reverse the order of log entries, create mirror text for design work, or just have fun with backwards messages, this tool makes it effortless.',
    'Character reversal flips every character in the entire text — "Hello" becomes "olleH". The tool uses Array.from() to correctly handle Unicode characters and emoji, so multi-byte characters like 🎉 are preserved as single units rather than being split into broken surrogate pairs.',
    'Word reversal keeps each line intact but reverses the order of words within it. "The quick brown fox" becomes "fox brown quick The". Whitespace between words is preserved, so your formatting stays consistent. This mode processes each line independently, making it ideal for reversing column data or reordering sentences.',
    'Line reversal flips the order of lines from top to bottom. The last line becomes the first and vice versa. This is useful for inverting log files, reversing chronological lists, or flipping any multi-line text where you need the bottom-up view.',
    'All processing runs entirely in your browser — no data is sent to any server. The tool handles any text size and updates in real time as you type or change the reverse mode.',
  ],
};

export const faqItems = [
  {
    question: 'Does it handle emoji and special characters?',
    answer:
      'Yes. The tool uses Array.from() which correctly handles Unicode characters, including emoji, accented letters, and other multi-byte characters. Each character is treated as a single unit.',
  },
  {
    question: 'What is the difference between reversing words and lines?',
    answer:
      'Reversing words flips the word order within each line (e.g., "hello world" → "world hello"). Reversing lines flips the line order (the last line becomes the first). Word reversal processes each line independently.',
  },
  {
    question: 'Can I reverse a single word?',
    answer:
      'Yes. Use the "Characters" mode to reverse a single word letter by letter. For example, "javascript" becomes "tpircsavaj".',
  },
  {
    question: 'Is whitespace preserved?',
    answer:
      'Yes. In word reversal mode, the whitespace between words is preserved. In character and line modes, all whitespace including newlines is handled correctly.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All text reversal happens entirely in your browser using client-side JavaScript. Your data never leaves your device.',
  },
];
