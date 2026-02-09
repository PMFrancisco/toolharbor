export const toolInfo = {
  name: 'Remove Duplicates from List',
  description:
    'Remove duplicate lines from any list instantly. Supports trimming, case-insensitive matching, and sorting.',
  slug: 'remove-duplicates',
};

export const relatedTools = [
  { name: 'Find & Replace', href: '/tools/find-replace' },
  { name: 'Word Counter', href: '/tools/word-counter' },
  { name: 'Case Converter', href: '/tools/case-converter' },
  { name: 'Slug Generator', href: '/tools/slug-generator' },
];

export const features = [
  'Remove duplicate lines from any text or list',
  'Trim whitespace to catch near-duplicates',
  'Case-insensitive matching option',
  'Automatically ignore empty lines',
  'Sort output alphabetically (A-Z or Z-A)',
  'Shows count of removed duplicates',
];

export const howToSteps = [
  'Paste your list into the input field (one item per line)',
  'Toggle options like trim whitespace, case-insensitive, or ignore empty lines',
  'Choose a sort order or keep the original order',
  'The deduplicated list appears instantly in the output',
  'Copy the result using the Copy button',
];

export const examples = [
  {
    title: 'Simple duplicate removal',
    input: 'apple\nbanana\napple\ncherry\nbanana',
    output: 'apple\nbanana\ncherry',
  },
  {
    title: 'Case-insensitive dedup',
    input: 'Hello\nhello\nHELLO\nWorld',
    output: 'Hello\nWorld',
  },
  {
    title: 'Trimmed whitespace',
    input: '  foo  \nfoo\n  bar\nbar  ',
    output: 'foo\nbar',
  },
  {
    title: 'Sorted output (A-Z)',
    input: 'cherry\napple\nbanana\napple\ncherry',
    output: 'apple\nbanana\ncherry',
  },
];

export const explanation = {
  title: 'How to Remove Duplicates from a List',
  content: [
    'Removing duplicates from a list is a common task when working with data exports, log files, email lists, keyword research, or any text that contains repeated lines. This tool scans your input line by line, identifies duplicates, and returns a clean list with only unique entries.',
    'The trim whitespace option handles a frequent source of hidden duplicates. Lines like "apple" and "  apple  " look different but are semantically identical. With trimming enabled (the default), leading and trailing spaces are stripped before comparison, so these are correctly recognized as duplicates.',
    'Case-insensitive mode treats "Hello", "hello", and "HELLO" as the same entry. When duplicates are found in this mode, the tool keeps the first occurrence and removes the rest. This is useful when working with lists where capitalization is inconsistent, such as CSV exports or manually entered data.',
    'The sort option lets you reorder the output alphabetically (A-Z or Z-A) or keep the original order of first appearances. Sorting is applied after deduplication, so the result is both unique and organized. The "ignore empty lines" option strips blank lines from the output, keeping your list compact.',
    'The tool displays a summary showing how many duplicates were removed — for example, "Removed 12 duplicates (47 → 35 lines)". All processing runs in your browser with no server calls, so your data stays private.',
  ],
};

export const faqItems = [
  {
    question: 'How does duplicate detection work?',
    answer:
      'The tool compares each line against all previously seen lines. When a duplicate is found, it is removed from the output. The first occurrence of each unique line is always kept.',
  },
  {
    question: 'Does trimming affect the output?',
    answer:
      'Yes. When trim whitespace is enabled, each line is trimmed before comparison and in the output. This means "  hello  " becomes "hello" in the result.',
  },
  {
    question: 'How does case-insensitive mode work?',
    answer:
      'In case-insensitive mode, "Hello" and "hello" are treated as the same entry. The first occurrence is kept with its original casing, and subsequent case variations are removed.',
  },
  {
    question: 'Can I sort the results?',
    answer:
      'Yes. Choose "A → Z" for ascending alphabetical order or "Z → A" for descending. Select "Original order" to keep lines in the order they first appeared.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All deduplication happens entirely in your browser using client-side JavaScript. Your data never leaves your device.',
  },
];
