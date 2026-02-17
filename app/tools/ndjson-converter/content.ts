export const toolInfo = {
  name: 'NDJSON Converter',
  description:
    'Convert between JSON arrays and NDJSON (Newline Delimited JSON). Transform JSON Lines data instantly.',
  slug: 'ndjson-converter',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'JSON Flatten/Unflatten', href: '/tools/json-flatten' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
];

export const features = [
  'Convert JSON arrays to NDJSON (one object per line)',
  'Convert NDJSON back to JSON arrays',
  'Validates each line independently with line-specific errors',
  'Swap between modes instantly',
  'Works entirely offline — your data never leaves your browser',
  'Copy result with one click',
];

export const howToSteps = [
  'Choose "JSON → NDJSON" or "NDJSON → JSON" mode',
  'Paste your data into the input field',
  'Click "Convert" to transform the data',
  'Use the swap button to reverse input and output',
  'Copy the result with the Copy button',
];

export const examples = [
  {
    title: 'JSON array to NDJSON',
    input: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]',
    output: '{"name":"Alice","age":30}\n{"name":"Bob","age":25}',
  },
  {
    title: 'NDJSON to JSON array',
    input: '{"id":1,"status":"active"}\n{"id":2,"status":"inactive"}',
    output: '[\n  {"id":1,"status":"active"},\n  {"id":2,"status":"inactive"}\n]',
  },
];

export const explanation = {
  title: 'What Is NDJSON?',
  content: [
    'NDJSON (Newline Delimited JSON), also known as JSON Lines or JSONL, is a format where each line is a valid JSON value, typically a JSON object. Unlike a JSON array, NDJSON does not wrap items in brackets or separate them with commas — each line stands alone as independent JSON. This makes it ideal for streaming, logging, and processing large datasets line by line.',
    'The key advantage of NDJSON over JSON arrays is that it can be processed incrementally. You can read, write, or stream one record at a time without loading the entire file into memory. This makes NDJSON the standard format for log files, data pipelines (like BigQuery, Elasticsearch bulk API), machine learning datasets, and any system that handles millions of records.',
    'Converting from a JSON array to NDJSON is straightforward: take each element of the array and serialize it on its own line. Converting from NDJSON to a JSON array collects all the lines and wraps them in an array. This tool validates each line independently, so if one line contains invalid JSON, it reports the exact line number.',
    'Common file extensions for NDJSON include .ndjson, .jsonl, and .jl. Many tools support this format natively: jq, pandas (read_json with lines=True), Node.js streams, and most data engineering platforms. If your tool expects a JSON array but your data is in NDJSON (or vice versa), this converter handles the transformation instantly.',
    'All processing happens in your browser. Your data — log entries, API records, or dataset rows — is never uploaded to any server. Paste, convert, and copy.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between NDJSON and JSON?',
    answer:
      'A JSON array wraps all items in brackets and separates them with commas. NDJSON puts one JSON value per line with no brackets or commas. NDJSON is easier to stream and append to.',
  },
  {
    question: 'Are NDJSON and JSON Lines the same thing?',
    answer:
      'Yes. NDJSON (Newline Delimited JSON), JSON Lines, and JSONL all refer to the same format: one JSON value per line, separated by newline characters.',
  },
  {
    question: 'What happens if a line contains invalid JSON?',
    answer:
      'The tool validates each line independently and reports the exact line number with the error. Valid lines are still processed — only the invalid lines are flagged.',
  },
  {
    question: 'Can I convert NDJSON with non-object values?',
    answer:
      'Yes. NDJSON lines can contain any valid JSON value: objects, arrays, strings, numbers, booleans, or null. The converter handles all value types.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your data never leaves your device.',
  },
];
