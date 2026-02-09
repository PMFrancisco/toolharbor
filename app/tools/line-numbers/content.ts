export const toolInfo = {
  name: 'Line Numbering Tool',
  description:
    'Add line numbers to any text instantly. Choose separator style, start number, padding, and skip empty lines.',
  slug: 'line-numbers',
};

export const relatedTools = [
  { name: 'Text Sorter', href: '/tools/text-sorter' },
  { name: 'Remove Duplicates', href: '/tools/remove-duplicates' },
  { name: 'Word Counter', href: '/tools/word-counter' },
  { name: 'Find & Replace', href: '/tools/find-replace' },
];

export const features = [
  'Add line numbers with multiple separator styles (dot, paren, colon, tab, space)',
  'Configurable start number',
  'Auto-pad numbers for aligned output',
  'Option to skip empty lines',
  'Instant results as you type',
  'Copy the numbered text with one click',
];

export const howToSteps = [
  'Paste your text into the input area',
  'Choose a number format (1. Line, 1) Line, 1: Line, etc.)',
  'Set the starting number (default is 1)',
  'Toggle padding and skip-empty-lines options',
  'Copy the numbered output using the Copy button',
];

export const examples = [
  {
    title: 'Basic line numbering',
    input: 'First line\nSecond line\nThird line',
    output: '1. First line\n2. Second line\n3. Third line',
  },
  {
    title: 'Parenthesis format',
    input: 'apples\nbananas\ncherries',
    output: '1) apples\n2) bananas\n3) cherries',
  },
  {
    title: 'Starting from 10',
    input: 'Item A\nItem B\nItem C',
    output: '10. Item A\n11. Item B\n12. Item C',
  },
  {
    title: 'Skip empty lines',
    input: 'Line one\n\nLine three\n\nLine five',
    output: '1. Line one\n\n2. Line three\n\n3. Line five',
  },
];

export const explanation = {
  title: 'How to Add Line Numbers to Text',
  content: [
    'Adding line numbers to text is a common task when preparing code snippets for documentation, creating numbered lists from plain text, referencing specific lines in a file, or formatting data for presentations. This tool automatically prepends a sequential number to every line in your input.',
    'You can choose from several separator styles to match your needs. The "1. Line" format creates a traditional numbered list. The "1) Line" style is common in academic and legal documents. The "1: Line" format is familiar to programmers. Tab and space separators are useful when the output will be pasted into spreadsheets or fixed-width contexts.',
    'The start number option lets you begin numbering from any integer — useful when you are continuing a list from a previous section or need to match existing line references. Combined with auto-padding, the numbers stay neatly aligned regardless of how many lines you have.',
    'The skip empty lines option leaves blank lines unnumbered while still preserving them in the output. This is particularly useful when working with code or structured text where blank lines serve as visual separators and should not receive a number.',
    'All processing happens locally in your browser. No data is sent to any server, so you can safely number confidential documents, source code, or private notes without privacy concerns.',
  ],
};

export const faqItems = [
  {
    question: 'Can I start numbering from a specific number?',
    answer:
      'Yes. Set the "Start at" field to any positive integer. For example, setting it to 100 will number your lines as 100, 101, 102, and so on.',
  },
  {
    question: 'What does auto-padding do?',
    answer:
      'Auto-padding adds leading spaces to shorter numbers so all lines align. For example, in a 100-line text, line 1 becomes "  1." while line 100 stays "100." — keeping columns neat.',
  },
  {
    question: 'How does skip empty lines work?',
    answer:
      'When enabled, empty lines are preserved in the output but do not receive a number. The numbering continues on the next non-empty line, so numbers stay sequential without gaps.',
  },
  {
    question: 'Can I use this for code?',
    answer:
      'Absolutely. Use the colon or tab separator for code-friendly output. The padded numbers keep indentation consistent when referencing lines.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All processing runs entirely in your browser using client-side JavaScript. Your text never leaves your device.',
  },
];
