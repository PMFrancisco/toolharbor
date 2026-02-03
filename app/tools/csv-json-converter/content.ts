export const toolInfo = {
  name: 'CSV to JSON Converter',
  description:
    'Convert between CSV and JSON formats instantly. Transform spreadsheet data to JSON arrays or JSON to CSV files.',
  slug: 'csv-json-converter',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
  { name: 'SQL Formatter', href: '/tools/sql-formatter' },
];

export const features = [
  'Convert CSV to JSON array of objects',
  'Convert JSON array back to CSV format',
  'Support for custom delimiters (comma, tab, semicolon)',
  'Handle quoted values and escaped characters',
  'Preserve data types where possible',
  'Works offline - no data sent to servers',
];

export const howToSteps = [
  'Select the conversion direction (CSV to JSON or JSON to CSV)',
  'Paste your CSV or JSON data in the input field',
  'Optionally select a custom delimiter for CSV',
  'Click Convert to transform your data',
  'Copy the converted output to your clipboard',
];

export const examples = [
  {
    title: 'CSV to JSON',
    input: 'name,age,city\nJohn,30,New York\nJane,25,Boston',
    output: `[
  { "name": "John", "age": "30", "city": "New York" },
  { "name": "Jane", "age": "25", "city": "Boston" }
]`,
  },
  {
    title: 'JSON to CSV',
    input: '[{"id":1,"product":"Widget","price":9.99},{"id":2,"product":"Gadget","price":19.99}]',
    output: 'id,product,price\n1,Widget,9.99\n2,Gadget,19.99',
  },
  {
    title: 'Handling quoted values',
    input: 'name,description\n"Smith, John","A ""quoted"" value"',
    output: '[{ "name": "Smith, John", "description": "A \\"quoted\\" value" }]',
  },
];

export const explanation = {
  title: 'What is a CSV to JSON Converter?',
  content: [
    'CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are two of the most common data interchange formats. CSV is widely used for spreadsheets, databases exports, and data analysis tools. JSON is the standard format for web APIs, configuration files, and JavaScript applications. Converting between them is a common task for developers and data analysts.',
    'A CSV to JSON converter transforms tabular data into a structured JSON format. The first row of the CSV is treated as headers, and each subsequent row becomes a JSON object with keys matching those headers. This makes CSV data easy to use in web applications and APIs that expect JSON input.',
    'The reverse conversion (JSON to CSV) takes an array of objects and flattens them into tabular format. All unique keys become column headers, and each object becomes a row. This is useful when you need to import API data into Excel, Google Sheets, or other spreadsheet applications.',
    'Our converter handles edge cases like quoted values containing commas, escaped quotes within values, and inconsistent columns. It also supports different delimiters - while comma is standard, some regions use semicolons, and tab-separated values (TSV) are common in certain applications.',
    "All conversion happens in your browser using JavaScript. Your data never leaves your computer, making it safe to convert sensitive information like customer data, financial records, or personal information. The tool works offline and has no file size limits beyond your browser's memory.",
  ],
};

export const faqItems = [
  {
    question: 'How do I handle CSV files with different delimiters?',
    answer:
      'Use the delimiter dropdown to select comma, semicolon, or tab. European locales often use semicolons since commas are used as decimal separators. Tab-separated files (TSV) are common in database exports.',
  },
  {
    question: 'Why are all my JSON values strings?',
    answer:
      'CSV is a text format with no data types. All values are imported as strings by default. If you need numbers or booleans, you can post-process the JSON in your application to convert the types.',
  },
  {
    question: 'How do I handle CSV with quotes inside values?',
    answer:
      'In standard CSV, quotes inside quoted fields are escaped by doubling them. For example, "He said ""Hello""" represents: He said "Hello". Our converter handles this automatically.',
  },
  {
    question: 'What if my JSON has nested objects?',
    answer:
      'Nested objects are converted to JSON string representations in the CSV cell. For truly flat CSV output, you may need to flatten your JSON first or only convert arrays of simple objects.',
  },
  {
    question: 'Is there a file size limit?',
    answer:
      'There is no hard limit, but very large files may slow down your browser. For files over 10MB, consider using command-line tools or processing in chunks. The tool works best with files under 5MB.',
  },
];
