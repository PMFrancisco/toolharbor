export const toolInfo = {
  name: 'Text Diff Checker Online',
  description:
    'Compare two texts side by side and see the differences highlighted. Free online diff tool with ignore case, trim, and empty line options.',
  slug: 'text-diff',
};

export const relatedTools = [
  { name: 'Find & Replace', href: '/tools/find-replace' },
  { name: 'Remove Duplicates', href: '/tools/remove-duplicates' },
  { name: 'Text Sorter', href: '/tools/text-sorter' },
  { name: 'Word Counter', href: '/tools/word-counter' },
];

export const features = [
  'Line-by-line comparison of two texts',
  'Color-coded diff output (green for additions, red for removals)',
  'Ignore case differences option',
  'Trim whitespace for cleaner comparisons',
  'Skip empty lines to focus on content changes',
  'Summary showing added, removed, and unchanged line counts',
];

export const howToSteps = [
  'Paste the original text in the left panel',
  'Paste the modified text in the right panel',
  'Toggle options like ignore case, trim whitespace, or skip empty lines',
  'The diff result appears below with color-coded highlights',
  'Review the summary for a quick overview of changes',
];

export const examples = [
  {
    title: 'Simple text change',
    input: 'Original: Hello World\nModified: Hello Earth',
    output: '- Hello World\n+ Hello Earth',
  },
  {
    title: 'Added lines',
    input: 'Original: Line 1\\nLine 2\nModified: Line 1\\nLine 1.5\\nLine 2',
    output: '  Line 1\n+ Line 1.5\n  Line 2',
  },
  {
    title: 'Removed lines',
    input: 'Original: A\\nB\\nC\nModified: A\\nC',
    output: '  A\n- B\n  C',
  },
  {
    title: 'Multiple changes',
    input: 'Original: foo\\nbar\\nbaz\nModified: foo\\nqux\\nbaz\\nnew',
    output: '  foo\n- bar\n+ qux\n  baz\n+ new',
  },
];

export const explanation = {
  title: 'How to Compare Texts and Find Differences',
  content: [
    'Comparing two pieces of text to find the differences is one of the most common tasks in software development, writing, and data analysis. This tool performs a line-by-line diff — the same fundamental algorithm used by Git, GitHub, and professional code review tools — right in your browser.',
    'The diff algorithm works by finding the Longest Common Subsequence (LCS) between the two texts. Lines that appear in both texts are marked as unchanged. Lines present only in the original are marked as removed (shown in red), and lines present only in the modified version are marked as added (shown in green).',
    'The "ignore case" option treats uppercase and lowercase letters as identical for comparison. This is useful when comparing configuration files, SQL queries, or any text where casing may have changed but the content is semantically the same.',
    'The "trim whitespace" option strips leading and trailing spaces from each line before comparison. This catches differences caused by inconsistent indentation or trailing spaces — a common source of false positives in manual comparisons. The "skip empty lines" option removes blank lines from both texts before comparing.',
    'All processing happens locally in your browser using client-side JavaScript. Your texts are never sent to any server, making this tool safe for comparing sensitive content like configuration files, credentials, contracts, or private notes.',
  ],
};

export const faqItems = [
  {
    question: 'What algorithm does this tool use?',
    answer:
      'The tool uses a Longest Common Subsequence (LCS) based diff algorithm, the same fundamental approach used by Git and Unix diff. It compares texts line by line to produce the minimal set of changes.',
  },
  {
    question: 'Can I compare code with this tool?',
    answer:
      'Yes. The tool works with any plain text, including source code, configuration files, JSON, CSV, or prose. The line-by-line comparison is particularly well-suited for code diffs.',
  },
  {
    question: 'How are changes color-coded?',
    answer:
      'Added lines (present in modified but not original) are shown in green with a "+" prefix. Removed lines (present in original but not modified) are shown in red with a "−" prefix. Unchanged lines are shown normally.',
  },
  {
    question: 'Is there a size limit?',
    answer:
      'The tool runs in your browser, so performance depends on your device. For most use cases (thousands of lines), it runs instantly. Very large files (tens of thousands of lines) may take a moment.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All comparison happens entirely in your browser. Your texts never leave your device.',
  },
];
