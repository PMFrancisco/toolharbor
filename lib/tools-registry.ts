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
  | 'Preview';

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
];

// Helper functions
export const getFeaturedTools = () => tools.filter((t) => t.featured);
export const getToolsByCategory = (category: ToolCategory) =>
  tools.filter((t) => t.category === category);
export const getToolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
