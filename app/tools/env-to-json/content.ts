export const toolInfo = {
  name: '.env to JSON Converter',
  description: 'Convert .env files to JSON and back. Parse environment variables instantly.',
  slug: 'env-to-json',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Convert .env files to JSON format in real time',
  'Convert JSON objects back to .env format',
  'Handle quoted values, inline comments, and export prefixes',
  'Preserve special characters with proper escaping',
  'Swap between modes instantly with one click',
  'Works offline — your environment variables never leave your browser',
];

export const howToSteps = [
  'Select the conversion direction: .env → JSON or JSON → .env',
  'Paste your .env content or JSON object in the input field',
  'See the converted output appear instantly as you type',
  'Copy the result to your clipboard with the copy button',
  'Use the swap button to reverse the conversion',
];

export const examples = [
  {
    title: '.env to JSON',
    input: `# Database config
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_PASSWORD="s3cret#pass"

# App settings
NODE_ENV=production
API_KEY=abc123xyz`,
    output: `{
  "DB_HOST": "localhost",
  "DB_PORT": "5432",
  "DB_NAME": "myapp",
  "DB_PASSWORD": "s3cret#pass",
  "NODE_ENV": "production",
  "API_KEY": "abc123xyz"
}`,
  },
  {
    title: 'JSON to .env',
    input: `{
  "DATABASE_URL": "postgres://user:pass@localhost:5432/db",
  "REDIS_HOST": "127.0.0.1",
  "SECRET_KEY": "my secret value",
  "DEBUG": "false"
}`,
    output: `DATABASE_URL=postgres://user:pass@localhost:5432/db
REDIS_HOST=127.0.0.1
SECRET_KEY="my secret value"
DEBUG=false`,
  },
  {
    title: 'With export prefix and inline comments',
    input: `export AWS_REGION=us-east-1
export AWS_BUCKET=my-bucket # production bucket
export AWS_ACCESS_KEY='AKIAIOSFODNN7EXAMPLE'`,
    output: `{
  "AWS_REGION": "us-east-1",
  "AWS_BUCKET": "my-bucket",
  "AWS_ACCESS_KEY": "AKIAIOSFODNN7EXAMPLE"
}`,
  },
];

export const explanation = {
  title: 'What is a .env to JSON Converter?',
  content: [
    'A .env to JSON converter transforms environment variable files into JSON format and vice versa. The .env file format is the standard way to define environment variables for applications, widely used with tools like Docker, Node.js, Python, and most modern frameworks. Each line follows the KEY=VALUE pattern, with support for comments, quoted values, and export prefixes.',
    'Environment variables store configuration that changes between deployments — database credentials, API keys, feature flags, and service URLs. Converting these to JSON is useful when you need to import configuration into scripts, pass variables to APIs, manage settings in a JSON-based config system, or compare environments side by side.',
    'This converter handles all common .env conventions: lines starting with # are treated as comments, values wrapped in single or double quotes are unquoted properly, the export prefix is stripped automatically, and inline comments after values are removed. Special characters like newlines and tabs inside double-quoted values are correctly interpreted as escape sequences.',
    'The reverse conversion — JSON to .env — takes a flat JSON object and produces a valid .env file. Values containing spaces, special characters, or the hash symbol are automatically wrapped in double quotes with proper escaping. This is handy when you need to export configuration from a JSON source like a secrets manager, deployment tool, or API response into a format your application can load directly.',
    'All processing runs entirely in your browser. Your environment variables, API keys, and secrets are never transmitted to any server, making this tool safe for handling sensitive configuration data.',
  ],
};

export const faqItems = [
  {
    question: 'What .env syntax does this converter support?',
    answer:
      'The converter supports standard .env syntax: KEY=VALUE pairs, lines starting with # as comments, empty lines, values in single or double quotes, the export prefix, and inline comments after values (space + #). Double-quoted values process escape sequences like \\n for newlines.',
  },
  {
    question: 'Are my environment variables safe?',
    answer:
      'Yes. All conversion happens entirely in your browser using client-side JavaScript. No data is sent to any server, so your API keys, database passwords, and other secrets remain private.',
  },
  {
    question: 'What JSON structure does this produce?',
    answer:
      'The converter produces a flat JSON object where each key is the variable name and each value is a string. Nested structures are not created — all values are kept as strings exactly as they appear in the .env file.',
  },
  {
    question: 'Can I convert JSON with nested objects to .env?',
    answer:
      'The converter expects a flat JSON object with string-compatible values. Nested objects and arrays will be converted to their string representation. For best results, use a flat JSON object like { "KEY": "value" }.',
  },
  {
    question: 'Why are some values quoted in the .env output?',
    answer:
      'Values are automatically wrapped in double quotes when they contain spaces, hash symbols (#), equals signs, quotes, or other special characters that could break .env parsing. This ensures the generated .env file is valid and portable across different parsers.',
  },
];
