export const toolInfo = {
  name: 'Regex Tester',
  description:
    'Test and debug regular expressions in real-time. See matches highlighted instantly with support for all JavaScript regex flags.',
  slug: 'regex-tester',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'URL Encoder/Decoder', href: '/tools/url-encoder-decoder' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Real-time regex matching with instant feedback',
  'Support for all JavaScript regex flags (g, i, m, s, u)',
  'Highlighted matches in the test string',
  'Display of capture groups and named groups',
  'Match count and position information',
  'Works offline - no data sent to servers',
];

export const howToSteps = [
  'Enter your regular expression pattern in the pattern field',
  'Select the flags you want to use (global, case-insensitive, etc.)',
  'Type or paste your test string in the input area',
  'View highlighted matches and capture groups instantly',
  'Adjust your pattern until you get the desired matches',
];

export const examples = [
  {
    title: 'Email validation',
    input:
      'Pattern: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\nTest: Contact us at support@example.com or sales@company.org',
    output: 'Matches: support@example.com, sales@company.org',
  },
  {
    title: 'Extract numbers',
    input: 'Pattern: \\d+\nTest: Order #12345 contains 3 items totaling $99.99',
    output: 'Matches: 12345, 3, 99, 99',
  },
  {
    title: 'Named capture groups',
    input: 'Pattern: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})\nTest: Date: 2024-03-15',
    output: 'Match: 2024-03-15\nGroups: year=2024, month=03, day=15',
  },
];

export const explanation = {
  title: 'What is a Regex Tester?',
  content: [
    'Regular expressions (regex or regexp) are powerful patterns used to match, search, and manipulate text. They form a specialized language for describing character patterns and are supported in virtually every programming language, text editor, and command-line tool. A regex tester helps you write and debug these patterns interactively.',
    'Writing regex can be tricky because the syntax is compact and cryptic. A regex tester provides immediate visual feedback, showing you exactly what your pattern matches in real-time. This makes it much easier to develop complex patterns incrementally, testing each part as you build it up.',
    "Our regex tester uses JavaScript's RegExp engine, which supports modern features like named capture groups, lookahead, lookbehind, and Unicode character classes. The flags panel lets you toggle options like global matching (g), case-insensitive (i), multiline mode (m), and dotAll mode (s).",
    "The tool highlights all matches directly in your test string, so you can see exactly where matches occur. It also shows detailed information about each match, including its position, length, and any captured groups. This is invaluable for debugging patterns that aren't matching as expected.",
    "All processing happens locally in your browser using JavaScript. Your regex patterns and test data are never sent to any server. This makes the tool completely private and safe to use with sensitive data, and it works even when you're offline.",
  ],
};

export const faqItems = [
  {
    question: 'What regex flavors are supported?',
    answer:
      "This tester uses JavaScript's RegExp engine, which follows the ECMAScript specification. It supports features like named groups, lookahead (?=), lookbehind (?<=), and Unicode property escapes (\\p{}).",
  },
  {
    question: 'What do the flags mean?',
    answer:
      'g (global) finds all matches instead of stopping at the first. i (ignoreCase) makes the pattern case-insensitive. m (multiline) makes ^ and $ match line starts/ends. s (dotAll) makes . match newlines.',
  },
  {
    question: "Why isn't my pattern matching?",
    answer:
      "Common issues include: forgetting to escape special characters (like . or $), not enabling the right flags, or using features from other regex flavors that JavaScript doesn't support (like atomic groups).",
  },
  {
    question: 'How do I match special characters literally?',
    answer:
      'Escape them with a backslash. To match a literal dot, use \\. To match a backslash itself, use \\\\. Special characters include: . * + ? ^ $ { } [ ] ( ) | \\',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Yes. Everything runs in your browser locally. Your patterns and test text are never sent to any server. You can even use this tool offline.',
  },
];
