export const toolInfo = {
  name: 'CSV Viewer',
  description:
    'View and preview CSV data as a formatted table instantly. Free online CSV viewer with delimiter detection.',
  slug: 'csv-viewer',
};

export const relatedTools = [
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'JSON to CSV Converter', href: '/tools/json-csv-converter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'SQL Formatter', href: '/tools/sql-formatter' },
];

export const features = [
  'Preview CSV data as a formatted table instantly',
  'Supports comma, semicolon, and tab delimiters',
  'Toggle header row on/off for headerless data',
  'Shows row and column count',
  'Alternating row colors for easy reading',
  'Works offline — no data sent to servers',
];

export const howToSteps = [
  'Paste your CSV data into the input field',
  'Select the correct delimiter (comma, semicolon, or tab)',
  'Toggle "Has Header" if your first row contains column names',
  'View the rendered table below with row and column counts',
  'Click "Load Sample" to try an example dataset',
];

export const examples = [
  {
    title: 'Simple CSV with headers',
    input: `name,email,age,city
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,Los Angeles`,
    output: 'Renders as a 2-row, 4-column table with name, email, age, and city headers.',
  },
  {
    title: 'Semicolon-delimited CSV',
    input: `product;price;quantity
Laptop;999.99;5
Mouse;29.99;50
Keyboard;79.99;25`,
    output: 'Select semicolon delimiter to render a 3-row, 3-column product table.',
  },
];

export const explanation = {
  title: 'What is a CSV Viewer?',
  content: [
    'CSV (Comma-Separated Values) is one of the most common formats for tabular data. It is used for database exports, spreadsheet data, log files, data science datasets, and data exchange between systems. Despite its simplicity, raw CSV text can be difficult to read, especially when files contain many columns or long values.',
    'A CSV viewer takes raw CSV text and renders it as a formatted, readable table. Instead of squinting at comma-separated lines of text, you see a clean table with headers, aligned columns, and alternating row colors. This makes it easy to verify data, spot issues, and understand the structure of your dataset at a glance.',
    'Our online CSV viewer supports multiple delimiter formats: commas (the standard), semicolons (common in European locales and Excel exports), and tabs (TSV format). It automatically handles quoted fields that contain the delimiter character, escaped quotes, and multi-column data of varying widths.',
    'The "Has Header" toggle lets you control whether the first row is treated as column headers or data. Many CSV files include a header row, but some exports skip it. When headers are off, the viewer generates numbered column names (Column 1, Column 2, etc.) so you can still read the data in a structured table.',
    'This CSV viewer runs entirely in your browser — your data stays on your machine. This is essential when working with sensitive datasets like customer records, financial reports, or internal business data. No uploads, no accounts, just instant table preview from any CSV source.',
  ],
};

export const faqItems = [
  {
    question: 'What delimiters are supported?',
    answer:
      'The viewer supports comma (,), semicolon (;), and tab delimiters. Select the matching delimiter from the dropdown to parse your data correctly.',
  },
  {
    question: 'What if my CSV has no header row?',
    answer:
      'Uncheck the "Has Header" option. The viewer will generate numbered column names (Column 1, Column 2, etc.) and treat all rows as data.',
  },
  {
    question: 'Can it handle quoted fields?',
    answer:
      'Yes. Fields containing the delimiter character, newlines, or double quotes can be enclosed in double quotes. Escaped quotes ("") inside quoted fields are handled correctly.',
  },
  {
    question: 'Is there a size limit?',
    answer:
      'There is no hard limit, but very large files (thousands of rows) may cause the browser to slow down when rendering the table. For best performance, preview the first few hundred rows.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Yes. All parsing and rendering happens in your browser using client-side JavaScript. Your CSV data is never uploaded to any server.',
  },
];
