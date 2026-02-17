'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { minifyHtml, getByteSize } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function HtmlMinifierUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleMinify = useCallback(() => {
    const result = minifyHtml(input);
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sample Page</title>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Welcome to My Site</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <p>This is a sample HTML page for minification.</p>
      </main>
    </div>
  </body>
</html>`);
    setError('');
  }, []);

  const inputSize = input ? getByteSize(input) : 0;
  const outputSize = output ? getByteSize(output) : 0;
  const savings =
    inputSize > 0 && outputSize > 0 ? Math.round((1 - outputSize / inputSize) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleMinify}>Minify</Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>

        {output && (
          <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-400">
            {inputSize.toLocaleString()} → {outputSize.toLocaleString()} bytes
            <span className="ml-1 font-medium text-emerald-600 dark:text-emerald-400">
              ({savings}% smaller)
            </span>
          </span>
        )}
      </div>

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Input HTML
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder="Paste your HTML here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[280px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Minified Output
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Minified HTML will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function HtmlMinifierTool() {
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
        toolUI={<HtmlMinifierUI />}
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
