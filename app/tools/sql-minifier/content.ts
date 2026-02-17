export const toolInfo = {
  name: 'SQL Minifier',
  description:
    'Minify SQL queries by removing whitespace and compressing code to a single line. Reduce query size instantly.',
  slug: 'sql-minifier',
};

export const relatedTools = [
  { name: 'SQL Formatter', href: '/tools/sql-formatter' },
  { name: 'JSON Minifier', href: '/tools/json-minifier' },
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'HTML Minifier', href: '/tools/html-minifier' },
];

export const features = [
  'Compress SQL queries by removing whitespace and line breaks',
  'Preserves string literals inside quotes',
  'Removes unnecessary spaces around operators',
  'See original vs minified size and savings percentage',
  'Works entirely offline — your queries never leave your browser',
  'Copy minified output with one click',
];

export const howToSteps = [
  'Paste your SQL query into the input field',
  'Click "Minify" to compress the SQL',
  'View the minified output and size savings on the right',
  'Click "Copy" to copy the minified SQL to your clipboard',
];

export const examples = [
  {
    title: 'Minifying a SELECT query',
    input: `SELECT
  users.name,
  users.email,
  orders.total
FROM users
INNER JOIN orders
  ON users.id = orders.user_id
WHERE orders.total > 100
ORDER BY orders.total DESC
LIMIT 10;`,
    output:
      'SELECT users.name,users.email,orders.total FROM users INNER JOIN orders ON users.id=orders.user_id WHERE orders.total>100 ORDER BY orders.total DESC LIMIT 10;',
  },
  {
    title: 'Minifying an INSERT statement',
    input: `INSERT INTO products (
  name,
  price,
  category,
  in_stock
) VALUES (
  'Widget Pro',
  29.99,
  'Electronics',
  true
);`,
    output:
      "INSERT INTO products(name,price,category,in_stock)VALUES('Widget Pro',29.99,'Electronics',true);",
  },
];

export const explanation = {
  title: 'What Is SQL Minification?',
  content: [
    'SQL minification compresses formatted SQL queries into compact, single-line statements by removing unnecessary whitespace, line breaks, and extra spaces around operators. The resulting query is functionally identical to the original — the database engine interprets both versions the same way.',
    'Minified SQL is commonly used when embedding queries in application code, configuration files, or logging systems where readability is less important than compactness. It is also useful for reducing the size of SQL payloads sent over network connections or stored in version-controlled migration files.',
    "This tool is smart about preserving string literals. Quoted values like 'Hello World' keep their internal spacing intact, ensuring the minification never corrupts your data. Spaces around SQL operators (=, >, <) and parentheses are removed where safe, but the semantic meaning of every clause is preserved.",
    'For development, you typically want formatted SQL for readability. For production logs, embedded queries, and compact storage, minified SQL is the better choice. Many teams use a formatter during development and a minifier in their deployment pipeline to get the best of both worlds.',
    'Everything runs in your browser. Your SQL queries — whether they reference internal table schemas, sensitive column names, or proprietary database structures — are never sent to any server. The minification happens instantly on your device.',
  ],
};

export const faqItems = [
  {
    question: 'Does SQL minification change how the query runs?',
    answer:
      'No. Whitespace has no effect on SQL execution. The database engine parses both the formatted and minified versions identically. Your results will be exactly the same.',
  },
  {
    question: 'Does it preserve string values?',
    answer:
      'Yes. Quoted string literals (single quotes) are preserved as-is. The minifier only removes whitespace outside of string values, so your data stays intact.',
  },
  {
    question: 'How much space does SQL minification save?',
    answer:
      'Typically 30–50%, depending on the level of formatting in the original query. Queries with heavy indentation, multi-line SELECT lists, and generous spacing see the most savings.',
  },
  {
    question: 'Can I minify stored procedures or multi-statement SQL?',
    answer:
      'This tool works best with individual queries (SELECT, INSERT, UPDATE, DELETE). For complex stored procedures with BEGIN/END blocks, results may vary — always verify the output.',
  },
  {
    question: 'Is my SQL sent to a server?',
    answer:
      'No. All processing happens entirely in your browser. Your SQL queries never leave your device.',
  },
];
