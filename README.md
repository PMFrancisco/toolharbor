# ToolHarbor

A fast, SEO-optimized collection of developer utilities built with Next.js. Each tool is designed to work client-side, load instantly, and provide real value to developers.

All tools run fully in your browser — your input stays on your device.

Live site: [toolharbor.dev](https://toolharbor.dev) (browse tools: [toolharbor.dev/tools](https://toolharbor.dev/tools))

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Rendering:** Static Site Generation (SSG)
- **Hosting:** Vercel

## Available Tools (27)

### Formatters

| Tool                                                          | Description                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| [JSON Formatter](https://toolharbor.dev/tools/json-formatter) | Format, validate, and beautify JSON with syntax highlighting |
| [SQL Formatter](https://toolharbor.dev/tools/sql-formatter)   | Format and beautify SQL queries with proper indentation      |

### Encoders & Decoders

| Tool                                                                    | Description                                                     |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| [Base64 Encoder](https://toolharbor.dev/tools/base64-encoder)           | Encode and decode Base64 strings instantly                      |
| [URL Encoder/Decoder](https://toolharbor.dev/tools/url-encoder-decoder) | Encode and decode URLs with percent-encoding                    |
| [HTML Encoder/Decoder](https://toolharbor.dev/tools/html-encoder)       | Encode and decode HTML entities to prevent XSS                  |
| [JWT Decoder](https://toolharbor.dev/tools/jwt-decoder)                 | Decode and inspect JSON Web Tokens instantly                    |
| [URL Parser](https://toolharbor.dev/tools/url-parser)                   | Parse any URL into protocol, host, path, query params, and hash |

### Generators

| Tool                                                                        | Description                                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [UUID Generator](https://toolharbor.dev/tools/uuid-generator)               | Generate random UUIDs (v4) for your applications             |
| [Hash Generator](https://toolharbor.dev/tools/hash-generator)               | Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes    |
| [Slug Generator](https://toolharbor.dev/tools/slug-generator)               | Generate clean, URL-friendly slugs from any text             |
| [Query String Builder](https://toolharbor.dev/tools/query-string-builder)   | Build URL query strings from key-value pairs or parse URLs   |
| [Lorem Ipsum Generator](https://toolharbor.dev/tools/lorem-ipsum-generator) | Generate placeholder text by paragraphs, sentences, or words |

### Converters

| Tool                                                                       | Description                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [CSV to JSON Converter](https://toolharbor.dev/tools/csv-json-converter)   | Convert between CSV and JSON formats easily                        |
| [JSON to YAML Converter](https://toolharbor.dev/tools/json-yaml-converter) | Convert between JSON and YAML formats instantly                    |
| [JSON to CSV Converter](https://toolharbor.dev/tools/json-csv-converter)   | Export JSON arrays to CSV for Excel and spreadsheets               |
| [Timestamp Converter](https://toolharbor.dev/tools/timestamp-converter)    | Convert Unix timestamps to dates and vice versa                    |
| [Case Converter](https://toolharbor.dev/tools/case-converter)              | Convert text between camelCase, PascalCase, snake_case, and more   |
| [Color Converter](https://toolharbor.dev/tools/color-converter)            | Convert colors between HEX, RGB, and HSL formats with live preview |

### Text Tools

| Tool                                                                | Description                                                          |
| ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [Word Counter](https://toolharbor.dev/tools/word-counter)           | Count words, characters, sentences, and paragraphs with reading time |
| [Find & Replace](https://toolharbor.dev/tools/find-replace)         | Find and replace text with regex, case sensitivity, and whole words  |
| [Remove Duplicates](https://toolharbor.dev/tools/remove-duplicates) | Remove duplicate lines with trim, case matching, and sorting         |
| [Text Sorter](https://toolharbor.dev/tools/text-sorter)             | Sort lines alphabetically, by length, or randomly                    |
| [Line Numbering](https://toolharbor.dev/tools/line-numbers)         | Add line numbers with configurable format, padding, and start number |
| [Text Reverser](https://toolharbor.dev/tools/text-reverser)         | Reverse text by characters, words, or lines instantly                |
| [Text Diff Checker](https://toolharbor.dev/tools/text-diff)         | Compare two texts and see differences highlighted line by line       |

### Other

| Tool                                                              | Description                                                |
| ----------------------------------------------------------------- | ---------------------------------------------------------- |
| [Regex Tester](https://toolharbor.dev/tools/regex-tester)         | Test and debug regular expressions with real-time matching |
| [Markdown Preview](https://toolharbor.dev/tools/markdown-preview) | Preview Markdown as rendered HTML in real-time             |

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
│       └── ...                 # 27 tools total
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
