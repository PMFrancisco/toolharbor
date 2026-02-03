'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { markdownToHtml, getPreviewHtml } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

const sampleMarkdown = `# Welcome to Markdown Preview

This is a **live preview** of your Markdown content. Start typing to see it rendered!

## Features

- **Bold** and *italic* text
- ~~Strikethrough~~ text
- [Links](https://example.com)
- Inline \`code\`

## Code Blocks

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

## Lists

### Unordered
- Item one
- Item two
  - Nested item
  - Another nested

### Ordered
1. First item
2. Second item
3. Third item

## Blockquote

> This is a blockquote.
> It can span multiple lines.

## Table

| Name | Role | Status |
|------|------|--------|
| Alice | Developer | Active |
| Bob | Designer | Active |
| Carol | Manager | Away |

## Task List

- [x] Completed task
- [ ] Pending task
- [ ] Another task

---

*That's the basics! Start writing your own Markdown above.*`;

type ViewMode = 'preview' | 'html';

function MarkdownPreviewUI() {
  const [markdown, setMarkdown] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('preview');

  const html = useMemo(() => markdownToHtml(markdown), [markdown]);
  const previewHtml = useMemo(() => getPreviewHtml(markdown), [markdown]);

  const clearAll = useCallback(() => {
    setMarkdown('');
  }, []);

  const loadSample = useCallback(() => {
    setMarkdown(sampleMarkdown);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>

        <div className="ml-auto flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === 'preview'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            } rounded-l-lg`}
          >
            Preview
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === 'html'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            } rounded-r-lg`}
          >
            HTML
          </button>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Markdown Editor */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Markdown</label>
            <CopyButton text={markdown} size="sm" disabled={!markdown} />
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your Markdown here..."
            className="min-h-[400px] w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        {/* Preview/HTML Output */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {viewMode === 'preview' ? 'Preview' : 'HTML Output'}
            </label>
            <CopyButton text={html} size="sm" disabled={!html} />
          </div>

          {viewMode === 'preview' ? (
            <div className="min-h-[400px] overflow-auto rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
              {markdown ? (
                <iframe
                  srcDoc={previewHtml}
                  className="h-full min-h-[400px] w-full"
                  title="Markdown Preview"
                  sandbox="allow-same-origin"
                />
              ) : (
                <div className="flex h-full min-h-[400px] items-center justify-center text-zinc-400">
                  Preview will appear here...
                </div>
              )}
            </div>
          ) : (
            <textarea
              readOnly
              value={html}
              placeholder="HTML output will appear here..."
              className="min-h-[400px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          )}
        </div>
      </div>

      {/* Quick reference */}
      <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Quick Reference</h3>
        <div className="mt-2 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2 lg:grid-cols-4 dark:text-zinc-400">
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700"># H1</code> Heading 1
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">**bold**</code> Bold text
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">*italic*</code> Italic text
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">[link](url)</code> Link
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">- item</code> List item
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">`code`</code> Inline code
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">&gt; quote</code> Blockquote
          </div>
          <div>
            <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">---</code> Horizontal rule
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarkdownPreviewTool() {
  return (
    <>
      <JsonLd
        data={[
          generateToolJsonLd(toolInfo),
          generateBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: toolInfo.name, path: `/tools/${toolInfo.slug}` },
          ]),
        ]}
      />
      <ToolLayout
        title={toolInfo.name}
        description={toolInfo.description}
        toolUI={<MarkdownPreviewUI />}
        content={{
          features,
          howToSteps,
          examples,
          explanation,
          faqItems,
        }}
        relatedTools={relatedTools}
      />
    </>
  );
}
