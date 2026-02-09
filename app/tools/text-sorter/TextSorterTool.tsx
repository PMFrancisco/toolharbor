'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, Select } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { sortText, sortModeOptions } from '@/lib/tools';
import type { SortMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function TextSorterUI() {
  const [input, setInput] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('az');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = useState(false);

  const result = useMemo(
    () => sortText(input, { sortMode, caseSensitive, trimWhitespace, ignoreEmpty }),
    [input, sortMode, caseSensitive, trimWhitespace, ignoreEmpty]
  );

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput('cherry\napple\nBanana\ndate\napricot\nfig\nElderberry\ngrape\nkiwi\nLemon');
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sortMode" className="text-sm text-zinc-600 dark:text-zinc-400">
            Sort:
          </label>
          <Select
            id="sortMode"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            options={sortModeOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Case sensitive
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Trim whitespace
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={ignoreEmpty}
            onChange={(e) => setIgnoreEmpty(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Ignore empty lines
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
            {result.lineCount} line{result.lineCount !== 1 ? 's' : ''} sorted
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
            placeholder="Paste your list here (one item per line)..."
            className="min-h-[250px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Sorted Output
            </label>
            <CopyButton text={result.output} size="sm" disabled={!result.output} />
          </div>
          <ReadOnlyTextarea
            value={result.output}
            placeholder="Sorted text will appear here..."
            className="min-h-[250px]"
          />
        </div>
      </div>
    </div>
  );
}

export function TextSorterTool() {
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
        toolUI={<TextSorterUI />}
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
