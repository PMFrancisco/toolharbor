export const toolInfo = {
  name: 'JSON Minifier',
  description:
    'Minify and compress JSON data by removing all unnecessary whitespace. Reduce file size instantly.',
  slug: 'json-minifier',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
  { name: 'JSON to CSV Converter', href: '/tools/json-csv-converter' },
  { name: 'HTML Minifier', href: '/tools/html-minifier' },
];

export const features = [
  'Minify JSON by removing all whitespace and line breaks',
  'See original vs minified size and savings percentage',
  'Validates JSON syntax before minifying',
  'Works entirely offline — your data never leaves your browser',
  'Copy minified output with one click',
  'Handles deeply nested and large JSON documents',
];

export const howToSteps = [
  'Paste your formatted or uncompressed JSON into the input field',
  'Click "Minify" to compress the JSON',
  'View the minified output and size savings on the right',
  'Click "Copy" to copy the minified JSON to your clipboard',
];

export const examples = [
  {
    title: 'Minifying a simple object',
    input: `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`,
    output: '{"name":"John","age":30,"city":"New York"}',
  },
  {
    title: 'Minifying nested data',
    input: `{
  "user": {
    "name": "Jane",
    "address": {
      "city": "Boston",
      "zip": "02101"
    }
  }
}`,
    output: '{"user":{"name":"Jane","address":{"city":"Boston","zip":"02101"}}}',
  },
];

export const explanation = {
  title: 'What Is JSON Minification?',
  content: [
    'JSON minification is the process of removing all unnecessary characters from JSON data without changing its meaning. This includes whitespace, indentation, line breaks, and extra spaces. The result is a compact, single-line string that is functionally identical to the original but significantly smaller in size.',
    'Minified JSON is essential for production environments where every byte matters. Smaller JSON payloads mean faster API responses, reduced bandwidth consumption, and lower hosting costs. When your application sends thousands of JSON responses per second, even a 30% reduction in size can translate to real performance improvements and cost savings.',
    'This tool validates your JSON before minifying it. If your input contains syntax errors — like trailing commas, unquoted keys, or mismatched brackets — the tool will catch them and report the exact issue. This makes it useful as a quick JSON validator too.',
    'The size comparison feature shows you exactly how many bytes you saved. Formatted JSON with 2-space indentation can easily be 40–60% larger than its minified version, especially for deeply nested structures with many keys. Seeing the savings in real numbers helps you understand the impact of minification on your payloads.',
    'All processing happens in your browser using client-side JavaScript. Your JSON data — whether it contains API keys, user records, or configuration secrets — never leaves your device. No server, no logging, no data collection. Just paste, minify, and copy.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between JSON minification and compression?',
    answer:
      'Minification removes unnecessary whitespace from the JSON text itself. Compression (like gzip) is a separate process applied at the transport level that further reduces size. They complement each other — minify first, then let your server gzip the response.',
  },
  {
    question: 'Does minification change the data?',
    answer:
      'No. Minification only removes whitespace and formatting. The actual data — keys, values, arrays, objects — remains exactly the same. Any JSON parser will produce identical results from both the formatted and minified versions.',
  },
  {
    question: 'How much space does minification save?',
    answer:
      'Typically 30–60%, depending on the structure. Deeply nested JSON with many keys and indentation saves the most. Simple flat arrays save less. The tool shows you the exact byte savings for your specific input.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Yes. This tool runs entirely in your browser. Your JSON is never sent to any server — all minification happens locally on your device using JavaScript.',
  },
  {
    question: 'Can I minify large JSON files?',
    answer:
      'Yes. This tool handles large JSON documents. For very large files (several MB), your browser may take a moment to process, but it will work without any data being uploaded.',
  },
];
