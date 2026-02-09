'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, Select, Input } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { addLineNumbers, numberFormatOptions } from '@/lib/tools';
import type { NumberFormat } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function LineNumbersUI() {
  const [input, setInput] = useState('');
  const [format, setFormat] = useState<NumberFormat>('dot');
  const [startNumber, setStartNumber] = useState(1);
  const [padNumbers, setPadNumbers] = useState(true);
  const [skipEmpty, setSkipEmpty] = useState(false);

  const result = useMemo(
    () => addLineNumbers(input, { format, startNumber, padNumbers, skipEmpty }),
    [input, format, startNumber, padNumbers, skipEmpty]
  );

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(
      'const express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("Hello World!");\n});\n\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});'
    );
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="format" className="text-sm text-zinc-600 dark:text-zinc-400">
            Format:
          </label>
          <Select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value as NumberFormat)}
            options={numberFormatOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="startNumber" className="text-sm text-zinc-600 dark:text-zinc-400">
            Start at:
          </label>
          <Input
            id="startNumber"
            type="number"
            min={0}
            value={startNumber}
            onChange={(e) => setStartNumber(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-20"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={padNumbers}
            onChange={(e) => setPadNumbers(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Pad numbers
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={skipEmpty}
            onChange={(e) => setSkipEmpty(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Skip empty lines
        </label>
      </div>

      {/* Controls + stats */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>

        {input.trim() && (
          <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
            {result.lineCount} line{result.lineCount !== 1 ? 's' : ''} numbered
          </span>
        )}
      </div>

      {/* Input/Output side by side */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Input Text
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[250px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Numbered Output
            </label>
            <CopyButton text={result.output} size="sm" disabled={!result.output} />
          </div>
          <ReadOnlyTextarea
            value={result.output}
            placeholder="Numbered text will appear here..."
            className="min-h-[250px]"
            style={{ tabSize: 4 }}
          />
        </div>
      </div>
    </div>
  );
}

export function LineNumbersTool() {
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
        toolUI={<LineNumbersUI />}
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
