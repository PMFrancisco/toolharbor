'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { minifyCss, getByteSize } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function CssMinifierUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleMinify = useCallback(() => {
    const result = minifyCss(input);
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
    setInput(`/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Typography */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background-color: #1a1a2e;
  color: white;
  padding: 16px 0;
}

.header nav ul {
  display: flex;
  list-style: none;
  gap: 24px;
}

.header nav a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
}

.header nav a:hover {
  opacity: 0.8;
}`);
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
              Input CSS
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder="Paste your CSS here..."
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
            placeholder="Minified CSS will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function CssMinifierTool() {
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
        toolUI={<CssMinifierUI />}
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
