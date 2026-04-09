export const toolInfo = {
  name: 'JSON to TOON Converter',
  description:
    'Convert JSON to TOON (Token-Oriented Object Notation) and see token savings. Compact, LLM-friendly format.',
  slug: 'json-to-toon-converter',
};

export const relatedTools = [
  { name: 'LLM Token Counter', href: '/tools/token-counter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
];

export const features = [
  'Convert JSON to TOON format with one click',
  'See byte-level size comparison between JSON and TOON',
  'Automatic table format for arrays of uniform objects',
  'Handles nested objects, arrays, and primitive values',
  'Copy TOON output to clipboard for use in LLM prompts',
  'Real-time size reduction percentage display',
];

export const howToSteps = [
  'Paste your JSON data in the input area or click "Load Sample" for example data',
  'Click "Convert" to transform JSON to TOON format',
  'Check the size comparison cards to see how much space was saved',
  'Copy the TOON output to use in your LLM prompts or data pipelines',
];

export const examples = [
  {
    title: 'Array of objects (best case)',
    input: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]',
    output: '{name,age}[2]\nAlice\t30\nBob\t25',
  },
  {
    title: 'Nested object',
    input: '{"server":{"host":"localhost","port":8080},"debug":true}',
    output: 'server:\n  host: localhost\n  port: 8080\ndebug: true',
  },
];

export const explanation = {
  title: 'What Is TOON and Why Use It?',
  content: [
    'TOON (Token-Oriented Object Notation) is a compact, human-readable encoding of the JSON data model designed specifically for LLM prompts. It combines YAML-like indentation for nested objects with a CSV-style tabular layout for arrays of uniform objects, achieving significant token savings while remaining easy for both humans and models to read.',
    'The biggest savings come from arrays of objects with the same fields — a common pattern in API responses, database results, and structured data. Instead of repeating field names for every object (as JSON does), TOON uses a header row with field names followed by tab-separated values. For a table with 100 rows and 5 columns, this can reduce size by 40-60%.',
    'Token savings translate directly to cost savings when using LLM APIs. If you include structured data in your prompts — user profiles, product catalogs, log entries, or any tabular data — converting from JSON to TOON before sending it to the model reduces the number of input tokens and therefore the API cost.',
    'TOON uses explicit length markers like [N] for arrays and {fields} headers for table structures. These markers help LLMs parse the data reliably, reducing errors in structured data extraction and improving the accuracy of model responses when working with tabular information.',
    'The format supports the full JSON data model — objects, arrays, strings, numbers, booleans, and null — with deterministic, lossless round-trips. Any valid JSON can be converted to TOON and back without losing information.',
  ],
};

export const faqItems = [
  {
    question: 'When does TOON save the most tokens?',
    answer:
      'The biggest savings come from arrays of objects with the same fields. The more rows and the longer the field names, the greater the savings. A simple key-value object saves less because field names only appear once in both formats.',
  },
  {
    question: 'Can LLMs understand TOON format?',
    answer:
      'Yes. TOON was designed to be easy for language models to parse. The explicit headers and length markers give models a clear schema to follow. Most frontier models (GPT-4, Claude, Gemini) can read and generate TOON format reliably.',
  },
  {
    question: 'Is TOON a replacement for JSON?',
    answer:
      'No. TOON is a complement to JSON, optimized for a specific use case: sending structured data to LLMs. JSON remains the standard for APIs, configuration files, and data storage. Use TOON when token count and cost matter.',
  },
  {
    question: 'How are special characters handled?',
    answer:
      'Strings containing tabs, newlines, commas, or curly braces are automatically double-quoted with proper escaping. Simple strings are left unquoted for readability. Numbers, booleans, and null are represented as-is.',
  },
  {
    question: 'Can I convert TOON back to JSON?',
    answer:
      'This tool focuses on JSON-to-TOON conversion. TOON is designed for lossless round-trips, so conversion back to JSON is possible. Check the TOON Formatter tool for TOON-to-JSON conversion.',
  },
];
