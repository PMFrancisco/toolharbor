'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, Select } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { removeDuplicates, sortOptions } from '@/lib/tools';
import type { SortOrder } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function RemoveDuplicatesUI() {
  const [input, setInput] = useState('');
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('original');

  const result = useMemo(
    () => removeDuplicates(input, { trimWhitespace, caseInsensitive, ignoreEmpty, sortOrder }),
    [input, trimWhitespace, caseInsensitive, ignoreEmpty, sortOrder]
  );

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput('apple\nBanana\napple\n  cherry  \nbanana\ncherry\n\ndate\nApple\ndate\nfig\n\nfig');
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
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
            checked={caseInsensitive}
            onChange={(e) => setCaseInsensitive(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Case insensitive
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

        <div className="flex items-center gap-2">
          <label htmlFor="sortOrder" className="text-sm text-zinc-600 dark:text-zinc-400">
            Sort:
          </label>
          <Select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            options={sortOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
          />
        </div>
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
            Removed {result.removedCount} duplicate{result.removedCount !== 1 ? 's' : ''} (
            {result.originalCount} → {result.uniqueCount} lines)
          </span>
        )}
      </div>

      {/* Input/Output side by side */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Input List
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
              Unique Lines
            </label>
            <CopyButton text={result.output} size="sm" disabled={!result.output} />
          </div>
          <ReadOnlyTextarea
            value={result.output}
            placeholder="Deduplicated list will appear here..."
            className="min-h-[250px]"
          />
        </div>
      </div>
    </div>
  );
}

export function RemoveDuplicatesTool() {
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
        toolUI={<RemoveDuplicatesUI />}
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
