# ToolHarbor

A fast, SEO-optimized collection of developer utilities built with Next.js. Each tool is designed to work client-side, load instantly, and provide real value to developers.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Rendering:** Static Site Generation (SSG)
- **Hosting:** Vercel

## Available Tools

| Tool           | Description                         |
| -------------- | ----------------------------------- |
| JSON Formatter | Format, validate, and beautify JSON |
| Base64 Encoder | Encode and decode Base64 strings    |
| UUID Generator | Generate UUIDs (v1, v4, v7)         |

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
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt config
│   └── tools/
│       ├── json-formatter/
│       ├── base64-encoder/
│       └── uuid-generator/
├── components/
│   ├── ToolLayout.tsx      # Shared tool page layout
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── tool-sections/      # Reusable SEO sections
│   └── ui/                 # Base UI components
├── lib/
│   ├── seo.ts              # SEO utilities
│   ├── utils.ts
│   └── tools/              # Pure tool logic
└── public/
```

## Adding a New Tool

1. Create folder: `app/tools/<tool-slug>/`
2. Add files:
   - `page.tsx` - Next.js entry with metadata
   - `<ToolName>Tool.tsx` - Interactive UI component
   - `content.ts` - SEO content (features, steps, examples, FAQ)
3. Add logic to `lib/tools/<tool>.ts`
4. Update `sitemap.ts`

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

See [LICENSE](./LICENSE) for details.
