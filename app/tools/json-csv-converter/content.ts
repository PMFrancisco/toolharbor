export const toolInfo = {
  name: 'JSON to CSV Converter',
  description:
    'Convert JSON arrays to CSV format instantly. Export API data to spreadsheets, Excel, and Google Sheets.',
  slug: 'json-csv-converter',
};

export const relatedTools = [
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
];

export const features = [
  'Convert JSON arrays to CSV format',
  'Convert CSV back to JSON if needed',
  'Support for custom delimiters (comma, tab, semicolon)',
  'Handles nested objects by stringifying them',
  'Automatically extracts headers from JSON keys',
  'Works offline - no data sent to servers',
];

export const howToSteps = [
  'Paste your JSON array in the input field',
  'Optionally select a custom delimiter for the CSV output',
  'Click Convert to transform your data',
  'Copy the CSV output to your clipboard',
  'Import into Excel, Google Sheets, or other tools',
];

export const examples = [
  {
    title: 'JSON to CSV',
    input: `[
  { "id": 1, "name": "Alice", "email": "alice@example.com" },
  { "id": 2, "name": "Bob", "email": "bob@example.com" }
]`,
    output: `id,name,email
1,Alice,alice@example.com
2,Bob,bob@example.com`,
  },
  {
    title: 'API Response to CSV',
    input: `[
  { "product": "Widget", "price": 9.99, "stock": 100 },
  { "product": "Gadget", "price": 19.99, "stock": 50 }
]`,
    output: `product,price,stock
Widget,9.99,100
Gadget,19.99,50`,
  },
  {
    title: 'Tab-separated output',
    input: '[{"col1":"value1","col2":"value2"},{"col1":"value3","col2":"value4"}]',
    output: 'col1\tcol2\nvalue1\tvalue2\nvalue3\tvalue4',
  },
];

export const explanation = {
  title: 'What is a JSON to CSV Converter?',
  content: [
    'JSON (JavaScript Object Notation) is the standard format for web APIs, while CSV (Comma-Separated Values) is the universal format for spreadsheets and data analysis tools. Converting JSON to CSV allows you to import API data into Excel, Google Sheets, databases, and other tools that work with tabular data.',
    'A JSON to CSV converter takes an array of objects and flattens them into rows and columns. Each unique key in the JSON objects becomes a column header, and each object becomes a row. This transformation makes it easy to analyze API data in familiar spreadsheet tools.',
    'The conversion process handles various data types: strings and numbers are converted directly, booleans become "true" or "false", null values become empty cells, and nested objects are converted to JSON strings to preserve the data. This ensures no information is lost during conversion.',
    'Common use cases include exporting user data from web applications, converting API responses for reporting, preparing data for import into databases, and creating backups of JSON data in a more readable format. The CSV format is also useful for sharing data with non-technical stakeholders.',
    'Our converter runs entirely in your browser, so your data never leaves your computer. This makes it safe for converting sensitive data like customer information, financial records, or personal data. There are no file size limits beyond your browser memory.',
  ],
};

export const faqItems = [
  {
    question: 'What JSON format does this converter accept?',
    answer:
      'The converter accepts JSON arrays of objects, like [{"key": "value"}, ...]. Each object in the array becomes a row in the CSV. Single objects or primitive values are not supported - wrap them in an array first.',
  },
  {
    question: 'How are nested objects handled?',
    answer:
      'Nested objects and arrays are converted to JSON strings in the CSV cell. For example, {"address": {"city": "NYC"}} becomes a cell containing {"city":"NYC"}. For truly flat CSV, flatten your JSON first.',
  },
  {
    question: 'Can I use this for Excel import?',
    answer:
      'Yes! The CSV output is compatible with Excel, Google Sheets, LibreOffice Calc, and most spreadsheet applications. For Excel, use comma delimiter. For European locales, semicolon may work better.',
  },
  {
    question: 'What if my JSON objects have different keys?',
    answer:
      'The converter collects all unique keys from all objects to create the header row. Objects missing certain keys will have empty cells for those columns.',
  },
  {
    question: 'How do I handle special characters in values?',
    answer:
      'Values containing commas, quotes, or newlines are automatically wrapped in quotes and escaped according to CSV standards. This ensures the output imports correctly into spreadsheet applications.',
  },
];
