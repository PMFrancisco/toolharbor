export const toolInfo = {
  name: 'Timestamp Batch Converter',
  description:
    'Convert multiple Unix timestamps to human-readable dates at once. Supports seconds and milliseconds with timezone toggle.',
  slug: 'timestamp-batch',
};

export const relatedTools = [
  { name: 'Timestamp Converter', href: '/tools/timestamp-converter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Text Sorter', href: '/tools/text-sorter' },
  { name: 'Remove Duplicates', href: '/tools/remove-duplicates' },
];

export const features = [
  'Convert multiple timestamps at once (one per line)',
  'Supports Unix seconds and milliseconds automatically',
  'Toggle between UTC and local timezone display',
  'Shows ISO 8601, UTC, local time, and relative time',
  'Highlights invalid timestamps with clear error messages',
  'Works entirely offline — your data never leaves your browser',
];

export const howToSteps = [
  'Paste multiple timestamps into the input field (one per line)',
  'Results appear automatically as you type',
  'Toggle between UTC and Local timezone display',
  'Copy all results with the Copy button',
];

export const examples = [
  {
    title: 'Multiple Unix timestamps',
    input: '1704067200\n1706745600\n1709251200',
    output: '2024-01-01T00:00:00.000Z\n2024-02-01T00:00:00.000Z\n2024-03-01T00:00:00.000Z',
  },
  {
    title: 'Mixed formats',
    input: '1704067200\n1704067200000\n2024-06-15T12:00:00Z',
    output: 'All converted to ISO/UTC/Local with relative times',
  },
];

export const explanation = {
  title: 'Why Batch Convert Timestamps?',
  content: [
    'When debugging logs, analyzing data exports, or reviewing database records, you often encounter lists of Unix timestamps that need to be converted to human-readable dates. Doing this one at a time is tedious. This batch converter lets you paste an entire list and see all the results at once.',
    'The tool automatically detects whether each timestamp is in seconds (10 digits, like 1704067200) or milliseconds (13 digits, like 1704067200000). It also accepts ISO 8601 date strings and other common date formats, converting everything to a consistent output format.',
    'The timezone toggle lets you switch between UTC and your local timezone. This is especially useful when correlating events across systems that may log in different timezones. UTC is the standard for server logs, while local time helps you understand when events occurred relative to your own schedule.',
    'Each result shows the ISO 8601 format (the universal standard), UTC string, local time, Unix timestamp in both seconds and milliseconds, and a relative time indicator (e.g., "3 months ago"). Invalid entries are clearly marked so you can spot format issues immediately.',
    'All processing happens in your browser. Your timestamps — whether from production logs, database queries, or analytics exports — are never sent to any server.',
  ],
};

export const faqItems = [
  {
    question: 'How does it detect seconds vs milliseconds?',
    answer:
      'Timestamps with values greater than 1 trillion are treated as milliseconds. Values below that threshold are treated as seconds. This heuristic works correctly for all dates from 1970 through the far future.',
  },
  {
    question: 'What input formats are supported?',
    answer:
      'Unix timestamps in seconds or milliseconds, ISO 8601 date strings (e.g., 2024-01-15T10:30:00Z), and most other date string formats that JavaScript Date can parse.',
  },
  {
    question: 'Can I mix different formats in the same batch?',
    answer:
      'Yes. Each line is parsed independently, so you can mix Unix timestamps, millisecond timestamps, and date strings in the same input.',
  },
  {
    question: 'What timezone is used for display?',
    answer:
      'You can toggle between UTC and your local timezone. UTC is the default and is recommended when working with server logs or cross-timezone data.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your timestamps never leave your device.',
  },
];
