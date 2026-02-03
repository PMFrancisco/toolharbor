export const toolInfo = {
  name: 'JSON Formatter',
  description:
    'Format, validate, and beautify JSON data instantly. Free online tool with syntax validation.',
  slug: 'json-formatter',
};

export const relatedTools = [
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'JWT Decoder', href: '/tools/jwt-decoder' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Format JSON with customizable indentation',
  'Minify JSON to reduce file size',
  'Validate JSON syntax instantly',
  'Works offline - no data sent to servers',
  'Copy formatted output with one click',
  'Supports large JSON files',
];

export const howToSteps = [
  'Paste your JSON data into the input field on the left',
  'Click "Format" to beautify or "Minify" to compress your JSON',
  'View the formatted output on the right side',
  'Click "Copy" to copy the result to your clipboard',
];

export const examples = [
  {
    title: 'Formatting minified JSON',
    input: '{"name":"John","age":30,"city":"New York"}',
    output: `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`,
  },
  {
    title: 'Nested objects',
    input: '{"user":{"name":"Jane","address":{"city":"Boston","zip":"02101"}}}',
    output: `{
  "user": {
    "name": "Jane",
    "address": {
      "city": "Boston",
      "zip": "02101"
    }
  }
}`,
  },
];

export const explanation = {
  title: 'What is a JSON Formatter?',
  content: [
    'JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It has become the standard format for data exchange in web applications, REST APIs, and configuration files across virtually every programming language.',
    'A JSON formatter (also called a JSON beautifier or JSON prettifier) takes compact or minified JSON data and transforms it into a human-readable format with proper indentation and line breaks. This makes it much easier to understand the structure of the data, debug issues, and work with complex nested objects. When working with API responses or config files, a well-formatted JSON document can save hours of debugging time.',
    'Our online JSON formatter tool validates your JSON syntax in real-time, catching errors like missing commas, unclosed brackets, or invalid characters. This instant validation helps you quickly identify and fix malformed JSON before using it in your applications. The formatter also handles edge cases like escaped characters, Unicode strings, and deeply nested structures.',
    'The JSON minify feature does the opposite — it removes all unnecessary whitespace to reduce file size. Minified JSON is ideal for production environments where smaller payloads mean faster load times and reduced bandwidth costs. Many developers use both features: beautify for development and debugging, minify for deployment.',
    'Unlike online tools that send your data to remote servers, this JSON formatter runs entirely in your browser using client-side JavaScript. Your sensitive data never leaves your computer, making it safe to use with API keys, authentication tokens, user data, or any confidential information. No registration, no data collection, just a fast and private formatting tool.',
  ],
};

export const faqItems = [
  {
    question: 'What is JSON formatting?',
    answer:
      'JSON formatting (or beautifying) is the process of adding proper indentation, line breaks, and spacing to JSON data to make it human-readable. Minified JSON is compact but hard to read; formatted JSON is structured and easy to understand.',
  },
  {
    question: 'Is my data safe when using this tool?',
    answer:
      'Yes, completely. This tool runs entirely in your browser using JavaScript. Your JSON data is never sent to any server - all processing happens locally on your device.',
  },
  {
    question: 'What causes "Invalid JSON" errors?',
    answer:
      'Common causes include: missing or extra commas, unquoted property names, single quotes instead of double quotes, trailing commas after the last item, and unclosed brackets or braces.',
  },
  {
    question: 'Can I format large JSON files?',
    answer:
      'Yes, this tool can handle large JSON files. However, extremely large files (several megabytes) may cause your browser to slow down temporarily during formatting.',
  },
  {
    question: 'What is the difference between Format and Minify?',
    answer:
      'Format adds indentation and line breaks to make JSON readable. Minify removes all unnecessary whitespace to reduce file size - useful for production environments where smaller payloads improve performance.',
  },
];
