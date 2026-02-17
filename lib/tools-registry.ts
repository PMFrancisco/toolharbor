/**
 * Central registry of all tools
 *
 * This is the SINGLE SOURCE OF TRUTH for tools.
 * When adding a new tool, add it here and it will automatically appear in:
 * - /tools index page
 * - sitemap.xml
 * - homepage (if featured)
 */

export type ToolCategory =
  | 'Formatters'
  | 'Encoders'
  | 'Decoders'
  | 'Generators'
  | 'Converters'
  | 'Testers'
  | 'Preview'
  | 'Text Tools';

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  featured?: boolean;
}

export const tools: Tool[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    category: 'Formatters',
    featured: true,
  },
  {
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries with proper indentation',
    category: 'Formatters',
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings instantly',
    category: 'Encoders',
    featured: true,
  },
  {
    slug: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs with percent-encoding',
    category: 'Encoders',
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens instantly',
    category: 'Decoders',
    featured: true,
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs (v4) for your applications',
    category: 'Generators',
    featured: true,
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching',
    category: 'Testers',
    featured: true,
  },
  {
    slug: 'csv-json-converter',
    name: 'CSV to JSON Converter',
    description: 'Convert between CSV and JSON formats easily',
    category: 'Converters',
  },
  {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to dates and vice versa',
    category: 'Converters',
    featured: true,
  },
  {
    slug: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Preview Markdown as rendered HTML in real-time',
    category: 'Preview',
  },
  {
    slug: 'json-yaml-converter',
    name: 'JSON to YAML Converter',
    description: 'Convert between JSON and YAML formats instantly',
    category: 'Converters',
  },
  {
    slug: 'json-csv-converter',
    name: 'JSON to CSV Converter',
    description: 'Export JSON arrays to CSV for Excel and spreadsheets',
    category: 'Converters',
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes',
    category: 'Generators',
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between camelCase, PascalCase, snake_case, kebab-case, and more',
    category: 'Converters',
  },
  {
    slug: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate clean, URL-friendly slugs from any text',
    category: 'Generators',
  },
  {
    slug: 'word-counter',
    name: 'Word & Character Counter',
    description: 'Count words, characters, sentences, and paragraphs with reading time',
    category: 'Text Tools',
  },
  {
    slug: 'find-replace',
    name: 'Find & Replace',
    description: 'Find and replace text with regex, case sensitivity, and whole word matching',
    category: 'Text Tools',
  },
  {
    slug: 'remove-duplicates',
    name: 'Remove Duplicates',
    description: 'Remove duplicate lines from any list with trim, case matching, and sorting',
    category: 'Text Tools',
  },
  {
    slug: 'html-encoder',
    name: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities to prevent XSS and display HTML safely',
    category: 'Encoders',
  },
  {
    slug: 'url-parser',
    name: 'URL Parser',
    description: 'Parse any URL into protocol, host, path, query parameters, and hash',
    category: 'Decoders',
  },
  {
    slug: 'query-string-builder',
    name: 'Query String Builder',
    description: 'Build URL query strings from key-value pairs or parse existing URLs',
    category: 'Generators',
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats with live preview',
    category: 'Converters',
  },
  {
    slug: 'text-sorter',
    name: 'Text Sorter',
    description: 'Sort lines alphabetically, by length, or randomly with case and trim options',
    category: 'Text Tools',
  },
  {
    slug: 'line-numbers',
    name: 'Line Numbering Tool',
    description: 'Add line numbers to any text with configurable format, padding, and start number',
    category: 'Text Tools',
  },
  {
    slug: 'text-reverser',
    name: 'Text Reverser',
    description: 'Reverse text by characters, words, or lines instantly',
    category: 'Text Tools',
  },
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text by paragraphs, sentences, or words',
    category: 'Generators',
  },
  {
    slug: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two texts and see differences highlighted line by line',
    category: 'Text Tools',
  },
  {
    slug: 'yaml-formatter',
    name: 'YAML Formatter',
    description: 'Format, validate, and beautify YAML data with key sorting and custom indentation',
    category: 'Formatters',
  },
  {
    slug: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format, validate, and beautify XML data with syntax validation',
    category: 'Formatters',
  },
  {
    slug: 'html-formatter',
    name: 'HTML Formatter',
    description: 'Format, beautify, and minify HTML code with proper indentation',
    category: 'Formatters',
  },
  {
    slug: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert numbers between binary, decimal, hexadecimal, and octal instantly',
    category: 'Converters',
  },
  {
    slug: 'csv-viewer',
    name: 'CSV Viewer',
    description: 'View and preview CSV data as a formatted table with delimiter support',
    category: 'Preview',
  },
  {
    slug: 'env-to-json',
    name: '.env to JSON Converter',
    description: 'Convert .env environment variable files to JSON and back instantly',
    category: 'Converters',
  },
  {
    slug: 'jwt-generator',
    name: 'JWT Generator',
    description: 'Generate and sign JSON Web Tokens (JWT) for testing with HS256, HS384, HS512',
    category: 'Generators',
  },
  {
    slug: 'json-schema-validator',
    name: 'JSON Schema Validator',
    description: 'Validate JSON data against a JSON Schema to check structure and types',
    category: 'Testers',
  },
  {
    slug: 'user-agent-parser',
    name: 'User Agent Parser',
    description:
      'Parse user agent strings to identify browser, OS, device type, and rendering engine',
    category: 'Decoders',
  },
  {
    slug: 'cron-parser',
    name: 'Cron Expression Parser',
    description: 'Parse and explain cron expressions in plain English with next run times',
    category: 'Decoders',
  },
  {
    slug: 'cron-generator',
    name: 'Cron Expression Generator',
    description: 'Generate cron expressions visually with an easy-to-use schedule builder',
    category: 'Generators',
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description:
      'Generate strong, secure random passwords with customizable length and character options',
    category: 'Generators',
  },
  {
    slug: 'http-status-lookup',
    name: 'HTTP Status Code Lookup',
    description: 'Look up any HTTP status code with descriptions, categories, and search',
    category: 'Decoders',
  },
  {
    slug: 'mime-type-lookup',
    name: 'MIME Type Lookup',
    description:
      'Look up MIME types by file extension or content type with a searchable developer reference',
    category: 'Decoders',
  },
  {
    slug: 'json-minifier',
    name: 'JSON Minifier',
    description: 'Minify and compress JSON data by removing all unnecessary whitespace',
    category: 'Formatters',
  },
  {
    slug: 'html-minifier',
    name: 'HTML Minifier',
    description: 'Minify HTML code by removing whitespace, line breaks, and unnecessary characters',
    category: 'Formatters',
  },
  {
    slug: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Minify CSS code by removing comments, whitespace, and unnecessary characters',
    category: 'Formatters',
  },
  {
    slug: 'sql-minifier',
    name: 'SQL Minifier',
    description: 'Minify SQL queries by removing whitespace and compressing to a single line',
    category: 'Formatters',
  },
  {
    slug: 'xml-minifier',
    name: 'XML Minifier',
    description: 'Minify XML data by removing whitespace and line breaks with validation',
    category: 'Formatters',
  },
  {
    slug: 'json-to-typescript',
    name: 'JSON to TypeScript',
    description: 'Convert JSON data to TypeScript interfaces or type aliases instantly',
    category: 'Converters',
  },
  {
    slug: 'base64-image-viewer',
    name: 'Base64 Image Viewer',
    description:
      'Preview base64 encoded images with auto format detection, dimensions, and download',
    category: 'Preview',
  },
  {
    slug: 'curl-to-fetch',
    name: 'cURL to Fetch Converter',
    description: 'Convert curl commands to JavaScript fetch() code with headers, body, and auth',
    category: 'Converters',
  },
  {
    slug: 'json-diff',
    name: 'JSON Diff',
    description: 'Compare two JSON objects and see added, removed, and changed values highlighted',
    category: 'Testers',
  },
  {
    slug: 'json-flatten',
    name: 'JSON Flatten/Unflatten',
    description: 'Flatten nested JSON to dot-notation keys or unflatten back to nested structure',
    category: 'Converters',
  },
  {
    slug: 'hmac-generator',
    name: 'HMAC Generator',
    description: 'Generate HMAC-SHA256, HMAC-SHA384, and HMAC-SHA512 with a secret key',
    category: 'Generators',
  },
  {
    slug: 'nanoid-generator',
    name: 'NanoID Generator',
    description: 'Generate cryptographically secure NanoID-style random IDs with custom alphabet',
    category: 'Generators',
  },
  {
    slug: 'unicode-escape',
    name: 'Unicode Escape/Unescape',
    description: 'Escape text to \\uXXXX Unicode sequences or unescape them back to readable text',
    category: 'Encoders',
  },
  {
    slug: 'ndjson-converter',
    name: 'NDJSON Converter',
    description: 'Convert between JSON arrays and NDJSON (Newline Delimited JSON) format',
    category: 'Converters',
  },
  {
    slug: 'http-header-formatter',
    name: 'HTTP Header Formatter',
    description: 'Normalize HTTP headers and convert between raw headers and JSON format',
    category: 'Formatters',
  },
  {
    slug: 'timestamp-batch',
    name: 'Timestamp Batch Converter',
    description: 'Convert multiple Unix timestamps to dates at once with timezone toggle',
    category: 'Converters',
  },
  {
    slug: 'rsa-key-generator',
    name: 'RSA Key Pair Generator',
    description: 'Generate RSA 2048/4096-bit key pairs in PEM format using Web Crypto API',
    category: 'Generators',
  },
  {
    slug: 'text-to-ascii',
    name: 'Text to ASCII Converter',
    description: 'Convert text to ASCII codes (decimal, hex, binary, octal) or codes back to text',
    category: 'Converters',
  },
];

// Helper functions
export const getFeaturedTools = () => tools.filter((t) => t.featured);
export const getToolsByCategory = (category: ToolCategory) =>
  tools.filter((t) => t.category === category);
export const getToolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
