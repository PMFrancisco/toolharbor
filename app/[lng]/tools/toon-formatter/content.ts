export const toolInfo = {
  name: 'TOON Formatter & Validator',
  description:
    'Validate TOON (Token-Oriented Object Notation) data and convert it back to JSON. Check syntax and preview parsed output.',
  slug: 'toon-formatter',
};

export const relatedTools = [
  { name: 'JSON to TOON Converter', href: '/tools/json-to-toon-converter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'LLM Token Counter', href: '/tools/token-counter' },
];

export const features = [
  'Convert TOON back to formatted JSON',
  'Validate TOON syntax with clear error messages',
  'Parse tabular format ({fields}[N] with tab-separated rows)',
  'Parse key-value format (YAML-style indented objects)',
  'Handle primitive arrays, nested objects, and quoted strings',
  'Copy parsed JSON output to clipboard',
];

export const howToSteps = [
  'Paste your TOON data in the input area or click "Load Sample"',
  'Click "Convert to JSON" to parse the TOON and get formatted JSON output',
  'Click "Validate" to check if the TOON syntax is correct without converting',
  'Copy the JSON output using the copy button',
];

export const examples = [
  {
    title: 'Table format (array of objects)',
    input: '{name,age}[2]\nAlice\t30\nBob\t25',
    output: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]',
  },
  {
    title: 'Key-value format (object)',
    input: 'host: localhost\nport: 8080\nssl: true',
    output: '{"host":"localhost","port":8080,"ssl":true}',
  },
];

export const explanation = {
  title: 'What Is TOON and How to Parse It?',
  content: [
    'TOON (Token-Oriented Object Notation) is a compact data format designed to minimize tokens when sending structured data to LLMs. This tool handles the reverse direction: converting TOON back to standard JSON so you can process, validate, or inspect the data with familiar tools.',
    "The tabular format is TOON's most distinctive feature. A header like {name,age,city}[3] declares the field names and row count, followed by tab-separated values — one row per line. This tool parses the header, splits each row by tabs, and reconstructs the original JSON array of objects.",
    'The key-value format resembles YAML: each line has a key followed by a colon and value. Nested objects use indentation. This tool parses the indentation structure to reconstruct nested JSON objects. Values are automatically typed — numbers become numbers, "true"/"false" become booleans, and "null" becomes null.',
    'Validation checks that the TOON structure is syntactically correct without producing output. This is useful for verifying TOON data before sending it to a parser or LLM. The validator reports specific errors like mismatched row counts or malformed headers.',
    'All parsing happens in your browser. Your TOON data is never sent to any server, making this safe for proprietary data, internal API responses, and confidential datasets.',
  ],
};

export const faqItems = [
  {
    question: 'What TOON formats are supported?',
    answer:
      'The tool supports tabular format ({fields}[N] with tab-separated rows), key-value format (key: value with indentation for nesting), primitive arrays ([N] val1, val2), and single primitive values. These cover the most common TOON structures.',
  },
  {
    question: 'How are values typed during parsing?',
    answer:
      'The parser automatically infers types: "null" becomes JSON null, "true"/"false" become booleans, numeric strings become numbers, and quoted strings have their quotes removed and escape sequences processed. Everything else is treated as a plain string.',
  },
  {
    question: 'What if my TOON has the wrong number of rows?',
    answer:
      'If the row count in the header (e.g., [3]) does not match the actual number of data rows, the parser will report an error specifying the expected and actual counts. Fix the header or add/remove rows to match.',
  },
  {
    question: 'Can I use this with the JSON to TOON Converter?',
    answer:
      'Yes. The JSON to TOON Converter encodes JSON into TOON format, and this tool decodes TOON back to JSON. Together they provide a complete round-trip workflow for working with TOON data.',
  },
  {
    question: 'Does this tool handle nested tables?',
    answer:
      'Basic nested structures are supported — objects containing tables or nested key-value blocks. Deeply nested or mixed structures may require manual adjustment. The tool reports clear errors when it encounters unsupported structures.',
  },
];
