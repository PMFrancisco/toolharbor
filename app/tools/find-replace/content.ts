export const toolInfo = {
  name: 'Find & Replace Tool',
  description:
    'Find and replace text instantly with support for case sensitivity, whole word matching, and regular expressions.',
  slug: 'find-replace',
};

export const relatedTools = [
  { name: 'Regex Tester', href: '/tools/regex-tester' },
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'Word Counter', href: '/tools/word-counter' },
  { name: 'Remove Duplicates', href: '/tools/remove-duplicates' },
];

export const features = [
  'Find and replace all occurrences in any text',
  'Case-sensitive and case-insensitive matching',
  'Whole word matching to avoid partial replacements',
  'Regular expression support for advanced patterns',
  'Real-time match count as you type',
  'Copy the result with one click',
];

export const howToSteps = [
  'Paste or type your text in the source text area',
  'Enter the text you want to find in the Find field',
  'Enter the replacement text in the Replace field',
  'Toggle options like case sensitivity, whole word, or regex mode',
  'Click "Replace All" and copy the result',
];

export const examples = [
  {
    title: 'Simple replacement',
    input: 'Find: "foo" → Replace: "bar" in "foo is great, foo is fast"',
    output: 'bar is great, bar is fast',
  },
  {
    title: 'Case-sensitive replacement',
    input: 'Find: "API" (case sensitive) → Replace: "endpoint" in "The API and the api"',
    output: 'The endpoint and the api',
  },
  {
    title: 'Whole word matching',
    input: 'Find: "cat" (whole word) → Replace: "dog" in "cat category caterpillar"',
    output: 'dog category caterpillar',
  },
  {
    title: 'Regex pattern',
    input: 'Find: "\\d+" (regex) → Replace: "X" in "Order 123 has 5 items"',
    output: 'Order X has X items',
  },
];

export const explanation = {
  title: 'What Is a Find and Replace Tool?',
  content: [
    'Find and Replace is one of the most fundamental text editing operations. It searches for all occurrences of a specified string or pattern in your text and replaces them with another value. This online tool brings that functionality to your browser without needing to open a text editor or IDE.',
    'The tool supports three matching modes that can be combined. Case-sensitive mode distinguishes between uppercase and lowercase letters, so "API" and "api" are treated as different strings. Whole word mode only matches complete words, preventing unintended partial replacements — searching for "cat" will not match "category" or "caterpillar". Regex mode lets you use regular expression patterns for complex matching like digits, email addresses, or repeating structures.',
    'Common use cases include cleaning up data exports, normalizing text formats, renaming variables across code snippets, stripping unwanted characters, and batch-editing content. Developers use it to refactor code, writers use it to fix repeated typos, and data analysts use it to transform column values.',
    'The match counter updates in real time as you type your search term, giving you immediate feedback on how many occurrences exist before you commit to the replacement. This helps you verify your search pattern is correct and avoid unintended changes.',
    'All processing happens in your browser. Your text is never sent to a server, making this tool safe for confidential code, private documents, and sensitive data. Paste, replace, copy — done.',
  ],
};

export const faqItems = [
  {
    question: 'Can I use regular expressions?',
    answer:
      'Yes. Enable the "Regex" toggle and enter any valid JavaScript regular expression pattern. For example, "\\d+" matches one or more digits, and "[A-Z]+" matches uppercase letter sequences.',
  },
  {
    question: 'What does "whole word" matching do?',
    answer:
      'Whole word mode adds word boundaries to your search, so it only matches complete words. Searching for "cat" will match the word "cat" but not "category", "caterpillar", or "concatenate".',
  },
  {
    question: 'Can I replace with an empty string?',
    answer:
      'Yes. Leave the Replace field empty to delete all occurrences of the search term. This is useful for stripping unwanted characters or tags from text.',
  },
  {
    question: 'Does it support multiline text?',
    answer:
      'Yes. You can paste text with any number of lines. The find and replace operates across the entire text including line breaks.',
  },
  {
    question: 'Is my text sent to a server?',
    answer:
      'No. All find and replace operations happen entirely in your browser using client-side JavaScript. Your text never leaves your device.',
  },
];
