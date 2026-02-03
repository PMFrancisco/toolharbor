export const toolInfo = {
  name: 'Timestamp Converter',
  description:
    'Convert Unix timestamps to human-readable dates and vice versa. Support for seconds and milliseconds.',
  slug: 'timestamp-converter',
};

export const relatedTools = [
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

export const features = [
  'Convert Unix timestamps to readable dates',
  'Convert dates to Unix timestamps',
  'Support for seconds and milliseconds',
  'Display in multiple formats (ISO, UTC, local)',
  'Show relative time (e.g., "2 hours ago")',
  'Get current timestamp with one click',
];

export const howToSteps = [
  'Enter a Unix timestamp (seconds or milliseconds) or a date string',
  'View the converted date in multiple formats',
  'Use "Now" to get the current timestamp',
  'Copy any format to your clipboard',
  'Use the date picker to select a specific date',
];

export const examples = [
  {
    title: 'Unix timestamp (seconds)',
    input: '1704067200',
    output:
      'ISO: 2024-01-01T00:00:00.000Z\nUTC: Mon, 01 Jan 2024 00:00:00 GMT\nUnix (ms): 1704067200000',
  },
  {
    title: 'Unix timestamp (milliseconds)',
    input: '1704067200000',
    output: 'ISO: 2024-01-01T00:00:00.000Z\nUnix (s): 1704067200',
  },
  {
    title: 'ISO date string',
    input: '2024-06-15T14:30:00Z',
    output: 'Unix (s): 1718461800\nUnix (ms): 1718461800000\nRelative: in 5 months',
  },
];

export const explanation = {
  title: 'What is a Unix Timestamp?',
  content: [
    'A Unix timestamp (also called Epoch time or POSIX time) is a way of representing a point in time as a single number. It counts the number of seconds that have elapsed since January 1, 1970, at 00:00:00 UTC - a moment known as the Unix Epoch. This simple representation makes timestamps easy to store, compare, and transmit between systems.',
    'Unix timestamps are used extensively in computing because they are timezone-independent and require minimal storage space. They are found in databases, file systems, APIs, logging systems, and JWT tokens. JavaScript uses millisecond timestamps, while many Unix systems and APIs use second timestamps.',
    'Converting between timestamps and human-readable dates is a common task for developers. When debugging APIs or database records, you often encounter timestamps that need to be interpreted. When building features like "posted 2 hours ago" or scheduling events, you need to convert dates to timestamps.',
    'Our converter automatically detects whether you are entering a timestamp or a date string. It handles both second and millisecond precision, and displays the result in multiple formats: ISO 8601 (the standard for data interchange), UTC (for server logs), local time (for user display), and relative time (for UI text).',
    "All conversions happen locally in your browser using JavaScript's built-in Date object. Your timestamps and dates are never sent to any server. The tool uses your browser's timezone for local time display but also shows UTC for unambiguous reference.",
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between seconds and milliseconds?',
    answer:
      'Unix timestamps in seconds have 10 digits (e.g., 1704067200). Millisecond timestamps have 13 digits (e.g., 1704067200000). JavaScript uses milliseconds, while many Unix systems and APIs use seconds.',
  },
  {
    question: 'Why does my timestamp show a different date than expected?',
    answer:
      'Timestamps are always in UTC. The local time display depends on your browser timezone setting. Check the UTC output for a timezone-independent reference.',
  },
  {
    question: 'What date formats are supported for input?',
    answer:
      'The tool accepts Unix timestamps (seconds or milliseconds) and most date string formats including ISO 8601 (2024-01-15T10:30:00Z), RFC 2822, and common formats like "Jan 15, 2024" or "2024/01/15".',
  },
  {
    question: 'What is the Unix Epoch?',
    answer:
      'The Unix Epoch is January 1, 1970, 00:00:00 UTC. This date was chosen as the reference point when Unix was developed. All Unix timestamps count seconds (or milliseconds) from this moment.',
  },
  {
    question: 'Can timestamps be negative?',
    answer:
      'Yes, negative timestamps represent dates before the Unix Epoch (January 1, 1970). For example, -86400 represents December 31, 1969. Most systems support dates back to 1901 or earlier.',
  },
];
