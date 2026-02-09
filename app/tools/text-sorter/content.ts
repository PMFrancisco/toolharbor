export const toolInfo = {
  name: 'Text Sorter Online',
  description:
    'Sort lines of text alphabetically, by length, or randomly. Free online tool with case-sensitive and trim options.',
  slug: 'text-sorter',
};

export const relatedTools = [
  { name: 'Remove Duplicates', href: '/tools/remove-duplicates' },
  { name: 'Find & Replace', href: '/tools/find-replace' },
  { name: 'Word Counter', href: '/tools/word-counter' },
  { name: 'Case Converter', href: '/tools/case-converter' },
];

export const features = [
  'Sort lines alphabetically A–Z or Z–A',
  'Sort by line length (shortest or longest first)',
  'Random shuffle for quick randomization',
  'Case-sensitive or case-insensitive sorting',
  'Trim whitespace and remove empty lines',
  'Instant results as you type',
];

export const howToSteps = [
  'Paste your text into the input area (one item per line)',
  'Choose a sort mode: alphabetical, by length, or random',
  'Toggle case-sensitive, trim, or ignore empty lines as needed',
  'The sorted result appears instantly in the output panel',
  'Click Copy to copy the sorted text to your clipboard',
];

export const examples = [
  {
    title: 'Alphabetical sort (A–Z)',
    input: 'cherry\napple\nbanana\ndate',
    output: 'apple\nbanana\ncherry\ndate',
  },
  {
    title: 'Reverse alphabetical (Z–A)',
    input: 'cherry\napple\nbanana\ndate',
    output: 'date\ncherry\nbanana\napple',
  },
  {
    title: 'Sort by length (shortest first)',
    input: 'strawberry\nfig\napple\nkiwi',
    output: 'fig\nkiwi\napple\nstrawberry',
  },
  {
    title: 'Case-insensitive sort',
    input: 'Banana\napple\nCherry\ndate',
    output: 'apple\nBanana\nCherry\ndate',
  },
];

export const explanation = {
  title: 'How to Sort Text Lines Online',
  content: [
    'Sorting lines of text is one of the most common operations when working with lists, data exports, log files, or any plain-text content. This tool takes your input, splits it into individual lines, and reorders them based on the sort mode you choose — all in your browser with zero server calls.',
    'Alphabetical sorting (A–Z or Z–A) uses locale-aware comparison, so accented characters and international text sort correctly. When case-sensitive mode is off, "Apple" and "apple" are treated as equal for ordering purposes, which is useful for messy data where capitalization is inconsistent.',
    'Length-based sorting is handy when you need to find the shortest or longest entries in a list — for example, sorting CSS class names, variable names, or dictionary words. When two lines have the same length, they fall back to alphabetical order for a stable, predictable result.',
    'Random shuffle uses the Fisher–Yates algorithm to produce an unbiased random permutation. This is useful for randomizing quiz answers, playlist orders, raffle entries, or any list where you need a fair shuffle.',
    'The trim whitespace option strips leading and trailing spaces from each line before sorting, preventing invisible characters from affecting the order. The ignore empty lines option removes blank lines from the result, keeping your output clean and compact.',
  ],
};

export const faqItems = [
  {
    question: 'How does case-insensitive sorting work?',
    answer:
      'When case-sensitive is turned off, the tool converts lines to lowercase for comparison only. The original casing is preserved in the output — so "Apple" stays "Apple" but sorts next to "apple".',
  },
  {
    question: 'Is the random shuffle truly random?',
    answer:
      'Yes. The tool uses the Fisher–Yates shuffle algorithm, which produces an unbiased random permutation. Each possible ordering is equally likely.',
  },
  {
    question: 'Can I sort numbers correctly?',
    answer:
      'The tool sorts lines as text (lexicographic order), so "9" comes after "10" alphabetically. For numeric sorting, pad numbers with leading zeros or use the length-based sort as a workaround.',
  },
  {
    question: 'What happens with empty lines?',
    answer:
      'By default, empty lines are included in the sort. Enable "Ignore empty lines" to strip them from the output.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All sorting happens entirely in your browser using client-side JavaScript. Your data never leaves your device.',
  },
];
