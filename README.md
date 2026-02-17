# ToolHarbor

A fast, SEO-optimized collection of developer utilities built with Next.js. Each tool is designed to work client-side, load instantly, and provide real value to developers.

All tools run fully in your browser — your input stays on your device.

Live site: [toolharbor.dev](https://toolharbor.dev) (browse tools: [toolharbor.dev/tools](https://toolharbor.dev/tools))

## Tech Stack

- **Framework:** Next.js 16.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Rendering:** Static Site Generation (SSG)
- **Hosting:** Vercel

## Available Tools (59)

### Formatters & Minifiers

| Tool                                                                        | Description                                                                      |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [JSON Formatter](https://toolharbor.dev/tools/json-formatter)               | Format, validate, and beautify JSON data with syntax highlighting                |
| [SQL Formatter](https://toolharbor.dev/tools/sql-formatter)                 | Format and beautify SQL queries with proper indentation                          |
| [YAML Formatter](https://toolharbor.dev/tools/yaml-formatter)               | Format, validate, and beautify YAML data with key sorting and custom indentation |
| [XML Formatter](https://toolharbor.dev/tools/xml-formatter)                 | Format, validate, and beautify XML data with syntax validation                   |
| [HTML Formatter](https://toolharbor.dev/tools/html-formatter)               | Format, beautify, and minify HTML code with proper indentation                   |
| [HTTP Header Formatter](https://toolharbor.dev/tools/http-header-formatter) | Normalize HTTP headers and convert between raw headers and JSON format           |
| [JSON Minifier](https://toolharbor.dev/tools/json-minifier)                 | Minify and compress JSON data by removing all unnecessary whitespace             |
| [HTML Minifier](https://toolharbor.dev/tools/html-minifier)                 | Minify HTML code by removing whitespace, line breaks, and unnecessary characters |
| [CSS Minifier](https://toolharbor.dev/tools/css-minifier)                   | Minify CSS code by removing comments, whitespace, and unnecessary characters     |
| [SQL Minifier](https://toolharbor.dev/tools/sql-minifier)                   | Minify SQL queries by removing whitespace and compressing to a single line       |
| [XML Minifier](https://toolharbor.dev/tools/xml-minifier)                   | Minify XML data by removing whitespace and line breaks with validation           |

### Encoders & Decoders

| Tool                                                                       | Description                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Base64 Encoder](https://toolharbor.dev/tools/base64-encoder)              | Encode and decode Base64 strings instantly                                                 |
| [URL Encoder/Decoder](https://toolharbor.dev/tools/url-encoder-decoder)    | Encode and decode URLs with percent-encoding                                               |
| [HTML Encoder/Decoder](https://toolharbor.dev/tools/html-encoder)          | Encode and decode HTML entities to prevent XSS and display HTML safely                     |
| [JWT Decoder](https://toolharbor.dev/tools/jwt-decoder)                    | Decode and inspect JSON Web Tokens instantly                                               |
| [URL Parser](https://toolharbor.dev/tools/url-parser)                      | Parse any URL into protocol, host, path, query parameters, and hash                        |
| [User Agent Parser](https://toolharbor.dev/tools/user-agent-parser)        | Parse user agent strings to identify browser, OS, device type, and rendering engine        |
| [Cron Expression Parser](https://toolharbor.dev/tools/cron-parser)         | Parse and explain cron expressions in plain English with next run times                    |
| [HTTP Status Code Lookup](https://toolharbor.dev/tools/http-status-lookup) | Look up any HTTP status code with descriptions, categories, and search                     |
| [MIME Type Lookup](https://toolharbor.dev/tools/mime-type-lookup)          | Look up MIME types by file extension or content type with a searchable developer reference |
| [Unicode Escape/Unescape](https://toolharbor.dev/tools/unicode-escape)     | Escape text to \\uXXXX Unicode sequences or unescape them back to readable text            |

### Generators

| Tool                                                                        | Description                                                                             |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [UUID Generator](https://toolharbor.dev/tools/uuid-generator)               | Generate random UUIDs (v4) for your applications                                        |
| [Hash Generator](https://toolharbor.dev/tools/hash-generator)               | Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes                               |
| [HMAC Generator](https://toolharbor.dev/tools/hmac-generator)               | Generate HMAC-SHA256, HMAC-SHA384, and HMAC-SHA512 with a secret key                    |
| [Slug Generator](https://toolharbor.dev/tools/slug-generator)               | Generate clean, URL-friendly slugs from any text                                        |
| [Query String Builder](https://toolharbor.dev/tools/query-string-builder)   | Build URL query strings from key-value pairs or parse existing URLs                     |
| [Lorem Ipsum Generator](https://toolharbor.dev/tools/lorem-ipsum-generator) | Generate placeholder text by paragraphs, sentences, or words                            |
| [Cron Expression Generator](https://toolharbor.dev/tools/cron-generator)    | Generate cron expressions visually with an easy-to-use schedule builder                 |
| [Password Generator](https://toolharbor.dev/tools/password-generator)       | Generate strong, secure random passwords with customizable length and character options |
| [JWT Generator](https://toolharbor.dev/tools/jwt-generator)                 | Generate and sign JSON Web Tokens (JWT) for testing with HS256, HS384, HS512            |
| [NanoID Generator](https://toolharbor.dev/tools/nanoid-generator)           | Generate cryptographically secure NanoID-style random IDs with custom alphabet          |
| [RSA Key Pair Generator](https://toolharbor.dev/tools/rsa-key-generator)    | Generate RSA 2048/4096-bit key pairs in PEM format using Web Crypto API                 |

### Converters

| Tool                                                                        | Description                                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [CSV to JSON Converter](https://toolharbor.dev/tools/csv-json-converter)    | Convert between CSV and JSON formats easily                                     |
| [JSON to YAML Converter](https://toolharbor.dev/tools/json-yaml-converter)  | Convert between JSON and YAML formats instantly                                 |
| [JSON to CSV Converter](https://toolharbor.dev/tools/json-csv-converter)    | Export JSON arrays to CSV for Excel and spreadsheets                            |
| [JSON to TypeScript](https://toolharbor.dev/tools/json-to-typescript)       | Convert JSON data to TypeScript interfaces or type aliases instantly            |
| [JSON Flatten/Unflatten](https://toolharbor.dev/tools/json-flatten)         | Flatten nested JSON to dot-notation keys or unflatten back to nested structure  |
| [NDJSON Converter](https://toolharbor.dev/tools/ndjson-converter)           | Convert between JSON arrays and NDJSON (Newline Delimited JSON) format          |
| [Timestamp Converter](https://toolharbor.dev/tools/timestamp-converter)     | Convert Unix timestamps to dates and vice versa                                 |
| [Timestamp Batch Converter](https://toolharbor.dev/tools/timestamp-batch)   | Convert multiple Unix timestamps to dates at once with timezone toggle          |
| [Case Converter](https://toolharbor.dev/tools/case-converter)               | Convert text between camelCase, PascalCase, snake_case, kebab-case, and more    |
| [Color Converter](https://toolharbor.dev/tools/color-converter)             | Convert colors between HEX, RGB, and HSL formats with live preview              |
| [Number Base Converter](https://toolharbor.dev/tools/number-base-converter) | Convert numbers between binary, decimal, hexadecimal, and octal instantly       |
| [.env to JSON Converter](https://toolharbor.dev/tools/env-to-json)          | Convert .env environment variable files to JSON and back instantly              |
| [cURL to Fetch Converter](https://toolharbor.dev/tools/curl-to-fetch)       | Convert curl commands to JavaScript fetch() code with headers, body, and auth   |
| [Text to ASCII Converter](https://toolharbor.dev/tools/text-to-ascii)       | Convert text to ASCII codes (decimal, hex, binary, octal) or codes back to text |

### Text Tools

| Tool                                                                  | Description                                                                      |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Word & Character Counter](https://toolharbor.dev/tools/word-counter) | Count words, characters, sentences, and paragraphs with reading time             |
| [Find & Replace](https://toolharbor.dev/tools/find-replace)           | Find and replace text with regex, case sensitivity, and whole word matching      |
| [Remove Duplicates](https://toolharbor.dev/tools/remove-duplicates)   | Remove duplicate lines from any list with trim, case matching, and sorting       |
| [Text Sorter](https://toolharbor.dev/tools/text-sorter)               | Sort lines alphabetically, by length, or randomly with case and trim options     |
| [Line Numbering](https://toolharbor.dev/tools/line-numbers)           | Add line numbers to any text with configurable format, padding, and start number |
| [Text Reverser](https://toolharbor.dev/tools/text-reverser)           | Reverse text by characters, words, or lines instantly                            |
| [Text Diff Checker](https://toolharbor.dev/tools/text-diff)           | Compare two texts and see differences highlighted line by line                   |

### Testers & Validators

| Tool                                                                        | Description                                                                     |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Regex Tester](https://toolharbor.dev/tools/regex-tester)                   | Test and debug regular expressions with real-time matching                      |
| [JSON Schema Validator](https://toolharbor.dev/tools/json-schema-validator) | Validate JSON data against a JSON Schema to check structure and types           |
| [JSON Diff](https://toolharbor.dev/tools/json-diff)                         | Compare two JSON objects and see added, removed, and changed values highlighted |

### Preview

| Tool                                                                    | Description                                                                        |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [Markdown Preview](https://toolharbor.dev/tools/markdown-preview)       | Preview Markdown as rendered HTML in real-time                                     |
| [CSV Viewer](https://toolharbor.dev/tools/csv-viewer)                   | View and preview CSV data as a formatted table with delimiter support              |
| [Base64 Image Viewer](https://toolharbor.dev/tools/base64-image-viewer) | Preview base64 encoded images with auto format detection, dimensions, and download |

## Getting Started

### Prerequisites

- Node.js 20+
- Bun (recommended) or npm/yarn/pnpm

### Installation

```bash
cd toolharbor
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
bun run build
bun start
```

## Project Structure

```
toolharbor/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt config
│   ├── cookie-policy/          # Cookie policy page
│   ├── privacy-policy/         # Privacy policy page
│   └── tools/
│       ├── page.tsx            # Tools index page
│       ├── json-formatter/     # Each tool has its own folder
│       ├── base64-encoder/
│       └── ...                 # 59 tools total
├── components/
│   ├── Header.tsx              # Site header
│   ├── Footer.tsx              # Site footer
│   ├── ToolLayout.tsx          # Shared tool page layout
│   ├── ToolCard.tsx            # Tool card for listings
│   ├── ToolsDirectory.tsx      # Tools index directory
│   ├── JsonLd.tsx              # JSON-LD structured data
│   ├── tool-sections/          # Reusable SEO content sections
│   │   ├── ToolFeatures.tsx
│   │   ├── HowToUse.tsx
│   │   ├── ToolExamples.tsx
│   │   ├── ToolExplanation.tsx
│   │   ├── ToolFAQ.tsx
│   │   └── AdSlot.tsx
│   └── ui/                     # Base UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── CopyButton.tsx
│       ├── Textarea.tsx
│       ├── ReadOnlyTextarea.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── ModeToggle.tsx
│       ├── SwapButton.tsx
│       ├── ErrorMessage.tsx
│       └── InfoBox.tsx
├── lib/
│   ├── seo.ts                  # SEO utilities
│   ├── utils.ts                # General utilities
│   ├── tools-registry.ts       # Single source of truth for all tools
│   └── tools/                  # Pure tool logic (one file per tool)
│       ├── json.ts
│       ├── base64.ts
│       ├── uuid.ts
│       └── ...
└── public/
    ├── ads.txt
    └── symbol-boat.svg
```

## Adding a New Tool

1. Create folder: `app/tools/<tool-slug>/`
2. Add files:
   - `page.tsx` -- Next.js entry with metadata
   - `<ToolName>Tool.tsx` -- Interactive UI component
   - `content.ts` -- SEO content (features, steps, examples, FAQ)
3. Add logic to `lib/tools/<tool>.ts`
4. Export from `lib/tools/index.ts`
5. **Register in `lib/tools-registry.ts`** -- this automatically updates the tools index page, sitemap, and homepage

Each tool page includes:

- H1 title with primary keyword
- Tool UI (above the fold)
- Features list
- How to use steps
- Input/output examples
- Explanation (300-600 words)
- FAQ section
- Related tools links

## Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `bun dev`              | Start development server  |
| `bun run build`        | Build for production      |
| `bun start`            | Start production server   |
| `bun run lint`         | Run ESLint                |
| `bun run format`       | Format code with Prettier |
| `bun run format:check` | Check code formatting     |

## Design Principles

- **Speed first:** Minimal JS, no heavy libraries, Lighthouse > 90
- **Client-side:** Tools work offline, no backend required
- **SEO-optimized:** Unique titles, descriptions, structured data
- **Clean UI:** Dark mode, minimal design, copy buttons everywhere

## License

MIT License. See [LICENSE](./LICENSE) for details.
