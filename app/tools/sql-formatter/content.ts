export const toolInfo = {
  name: 'SQL Formatter',
  description:
    'Format and beautify SQL queries online. Add proper indentation, uppercase keywords, and improve readability.',
  slug: 'sql-formatter',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'JSON to CSV Converter', href: '/tools/json-csv-converter' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
];

export const features = [
  'Format SQL with proper indentation',
  'Uppercase SQL keywords automatically',
  'Minify SQL to remove whitespace',
  'Support for common SQL dialects',
  'Copy formatted output with one click',
  'Works offline - your queries stay private',
];

export const howToSteps = [
  'Paste your SQL query in the input field',
  'Click "Format" to beautify the SQL',
  'Adjust the indentation size if needed',
  'Use "Minify" to compress the query',
  'Copy the formatted result to your clipboard',
];

export const examples = [
  {
    title: 'Simple SELECT query',
    input: 'SELECT id, name, email FROM users WHERE active = 1 ORDER BY name',
    output: `SELECT
  id,
  name,
  email
FROM users
WHERE active = 1
ORDER BY name`,
  },
  {
    title: 'JOIN query',
    input:
      'SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE o.status = "completed"',
    output: `SELECT
  u.name,
  o.total
FROM users u
INNER JOIN orders o
  ON u.id = o.user_id
WHERE o.status = "completed"`,
  },
];

export const explanation = {
  title: 'What is a SQL Formatter?',
  content: [
    'SQL (Structured Query Language) is the standard language for interacting with relational databases. SQL queries can become complex with multiple joins, subqueries, and conditions. A SQL formatter transforms messy or minified SQL into a clean, readable format with proper indentation and consistent styling.',
    'Readable SQL is easier to debug, review, and maintain. When queries are properly formatted, you can quickly understand the structure: which tables are being joined, what conditions are applied, and how results are sorted. This is especially important in team environments where multiple developers work with the same queries.',
    'Our SQL formatter applies several transformations: it adds line breaks before major clauses (SELECT, FROM, WHERE, JOIN), indents column lists and conditions, and converts SQL keywords to uppercase. Uppercase keywords are a common convention that makes the SQL structure stand out from table and column names.',
    'The formatter supports standard SQL syntax used by most databases including MySQL, PostgreSQL, SQL Server, SQLite, and Oracle. While each database has dialect-specific features, the core SQL syntax is shared, and this formatter handles the most common patterns effectively.',
    'All formatting happens locally in your browser. Your SQL queries, which may contain sensitive table structures, column names, or data conditions, are never sent to any server. This makes the tool safe for formatting production queries or queries containing confidential business logic.',
  ],
};

export const faqItems = [
  {
    question: 'Does this formatter support all SQL dialects?',
    answer:
      'This formatter handles standard SQL syntax that works across MySQL, PostgreSQL, SQL Server, SQLite, and Oracle. Dialect-specific extensions may not be formatted perfectly but will not be broken.',
  },
  {
    question: 'Does formatting change the query behavior?',
    answer:
      'No. Formatting only changes whitespace and keyword capitalization. The query logic and results remain identical. It is purely a visual transformation for readability.',
  },
  {
    question: 'Why use uppercase for SQL keywords?',
    answer:
      'Uppercase keywords (SELECT, FROM, WHERE) are a widely adopted convention that makes the query structure visually distinct from table names, column names, and values, which typically use lowercase or mixed case.',
  },
  {
    question: 'When should I minify SQL?',
    answer:
      'Minified SQL removes unnecessary whitespace, which can be useful when embedding queries in code, storing them in configuration, or reducing payload size. Minification has no effect on query performance.',
  },
  {
    question: 'Can I format stored procedures or DDL?',
    answer:
      'This formatter focuses on DML queries (SELECT, INSERT, UPDATE, DELETE). Basic DDL statements (CREATE TABLE, ALTER) will be formatted, but complex stored procedures may need manual adjustment.',
  },
];
