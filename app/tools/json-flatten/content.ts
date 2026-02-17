export const toolInfo = {
  name: 'JSON Flatten/Unflatten',
  description:
    'Flatten nested JSON objects to dot-notation keys or unflatten flat objects back to nested structures.',
  slug: 'json-flatten',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON Diff', href: '/tools/json-diff' },
  { name: 'JSON to CSV Converter', href: '/tools/json-csv-converter' },
  { name: 'JSON to TypeScript', href: '/tools/json-to-typescript' },
];

export const features = [
  'Flatten deeply nested JSON to dot-notation key-value pairs',
  'Unflatten dot-notation objects back to nested JSON',
  'Custom separator (default ".", also supports "/" or "__")',
  'Handles arrays with numeric index keys',
  'Preserves empty objects and arrays',
  'Works entirely offline — your data never leaves your browser',
];

export const howToSteps = [
  'Paste your JSON into the input field',
  'Choose "Flatten" or "Unflatten" mode',
  'Optionally change the separator character',
  'Click "Convert" to transform the JSON',
  'Copy the result from the output panel',
];

export const examples = [
  {
    title: 'Flatten nested object',
    input: `{
  "user": {
    "name": "John",
    "address": {
      "city": "Boston"
    }
  }
}`,
    output: `{
  "user.name": "John",
  "user.address.city": "Boston"
}`,
  },
  {
    title: 'Unflatten dot-notation',
    input: `{
  "user.name": "John",
  "user.address.city": "Boston"
}`,
    output: `{
  "user": {
    "name": "John",
    "address": {
      "city": "Boston"
    }
  }
}`,
  },
];

export const explanation = {
  title: 'What Is JSON Flattening?',
  content: [
    'JSON flattening converts a nested JSON object into a flat structure where each key is a dot-notation path representing the full location of the value. For example, {"user":{"name":"John"}} becomes {"user.name":"John"}. This transformation is useful when you need to work with flat data formats, analytics tools, or spreadsheets that do not support nested structures.',
    'The reverse operation — unflattening — takes a flat object with dot-notation keys and reconstructs the original nested hierarchy. This is commonly needed when importing data from CSV files, flat databases, or key-value stores back into structured JSON for API consumption.',
    'Arrays are handled by using numeric indices in the path. For example, {"users":[{"name":"John"},{"name":"Jane"}]} becomes {"users.0.name":"John","users.1.name":"Jane"}. When unflattening, numeric path segments are automatically converted back to array indices.',
    'The separator is customizable. While the dot (.) is the most common convention, some systems use forward slash (/) for path-like notation or double underscore (__) for environments where dots have special meaning (like MongoDB field names or environment variables).',
    'Common use cases include: exporting nested JSON to CSV/spreadsheet formats, building search indexes, creating flat configuration stores, transforming data for analytics pipelines, and debugging deeply nested API responses. The tool runs entirely in your browser — no data is sent to any server.',
  ],
};

export const faqItems = [
  {
    question: 'How are arrays handled?',
    answer:
      'Array elements are represented with numeric indices in the path. For example, "items.0.name" refers to the name property of the first element in the items array. When unflattening, numeric keys are automatically converted back to array indices.',
  },
  {
    question: 'Can I use a custom separator?',
    answer:
      'Yes. The default separator is a dot (.), but you can change it to "/" for path-like notation or "__" for systems where dots have special meaning.',
  },
  {
    question: 'Does it preserve empty objects and arrays?',
    answer:
      'Yes. Empty objects ({}) and empty arrays ([]) are preserved as leaf values in the flattened output, so no structural information is lost.',
  },
  {
    question: 'Can I flatten arrays at the root level?',
    answer:
      'Yes. Root-level arrays are flattened using numeric indices as top-level keys (e.g., "0.name", "1.name").',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your JSON data never leaves your device.',
  },
];
