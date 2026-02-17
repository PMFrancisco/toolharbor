export const toolInfo = {
  name: 'JSON Diff',
  description:
    'Compare two JSON objects and see added, removed, and changed values highlighted with their paths.',
  slug: 'json-diff',
};

export const relatedTools = [
  { name: 'Text Diff Checker', href: '/tools/text-diff' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON Flatten/Unflatten', href: '/tools/json-flatten' },
  { name: 'JSON to TypeScript', href: '/tools/json-to-typescript' },
];

export const features = [
  'Semantic comparison of JSON structure and values',
  'Highlights added, removed, and changed keys with dot-path notation',
  'Shows old and new values side by side',
  'Option to sort keys for order-independent comparison',
  'Validates both inputs before comparing',
  'Works entirely offline — your data never leaves your browser',
];

export const howToSteps = [
  'Paste the original JSON in the left input field',
  'Paste the modified JSON in the right input field',
  'Optionally enable "Sort keys" for order-independent comparison',
  'The diff results appear automatically below',
  'Review added (+), removed (−), and changed (~) entries',
];

export const examples = [
  {
    title: 'Detecting changed values',
    input: '{"name":"John","age":30}\n→\n{"name":"John","age":31}',
    output: '~ age: 30 → 31',
  },
  {
    title: 'Detecting added and removed keys',
    input: '{"name":"John","role":"admin"}\n→\n{"name":"John","email":"john@test.com"}',
    output: '− role: "admin"\n+ email: "john@test.com"',
  },
];

export const explanation = {
  title: 'What Is JSON Diff?',
  content: [
    'JSON diff is a semantic comparison of two JSON documents that identifies exactly what changed between them. Unlike a plain text diff that compares line by line, a JSON diff understands the data structure — it knows that {"a":1,"b":2} and {"b":2,"a":1} are equivalent, and it can show you that a specific nested key three levels deep changed from one value to another.',
    'This tool compares JSON at the key/value level and reports four types of differences: added keys (present in modified but not original), removed keys (present in original but not modified), changed values (same key, different value), and unchanged entries. Each difference is shown with its full dot-notation path, making it easy to locate changes in deeply nested structures.',
    'The "Sort keys" option enables order-independent comparison. JSON objects are unordered by specification, so {"a":1,"b":2} and {"b":2,"a":1} should be considered identical. With sort keys enabled, the tool ignores key order differences and focuses only on actual data changes.',
    'Common use cases include: comparing API responses between environments (staging vs production), reviewing configuration file changes, debugging data transformations, verifying migration scripts, and validating test fixtures. Any time you need to know exactly what changed between two JSON documents, this tool gives you a clear, structured answer.',
    'Everything runs in your browser. Your JSON data is never sent to any server. Whether you are comparing API keys, user records, or internal config files, the comparison happens entirely on your device.',
  ],
};

export const faqItems = [
  {
    question: 'Does key order matter?',
    answer:
      'By default, keys are compared in the order they appear. Enable the "Sort keys" option to ignore key order and compare based on structure and values only.',
  },
  {
    question: 'How does it handle nested objects?',
    answer:
      'The tool recursively compares nested objects and arrays. Each difference is reported with its full dot-notation path (e.g., "user.address.city"), so you can locate changes at any depth.',
  },
  {
    question: 'How are arrays compared?',
    answer:
      'Arrays are compared index by index. If one array has more elements than the other, the extra elements are reported as added or removed.',
  },
  {
    question: 'Can I compare large JSON files?',
    answer:
      'Yes. The tool handles large JSON documents. For very large files with thousands of keys, the comparison may take a moment, but it runs entirely in your browser.',
  },
  {
    question: 'Is my JSON data sent to a server?',
    answer:
      'No. All comparison logic runs entirely in your browser. Your data never leaves your device.',
  },
];
