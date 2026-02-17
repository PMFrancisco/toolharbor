'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ModeToggle } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseBatchTimestamps, formatBatchResults, timezoneModeOptions } from '@/lib/tools';
import type { TimezoneMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function TimestampBatchUI() {
  const [input, setInput] = useState('');
  const [tzMode, setTzMode] = useState<TimezoneMode>('utc');

  const entries = useMemo(() => parseBatchTimestamps(input), [input]);
  const copyText = useMemo(() => formatBatchResults(entries, tzMode), [entries, tzMode]);

  const clearAll = useCallback(() => setInput(''), []);

  const loadSample = useCallback(() => {
    setInput('1704067200\n1706745600\n1709251200\n1711929600\n2024-06-15T12:00:00Z\n1719792000000');
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={timezoneModeOptions.map((o) => ({ value: o.value, label: o.label }))}
          value={tzMode}
          onChange={setTzMode}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
        {entries.length > 0 && <CopyButton text={copyText} label="Copy All" className="ml-auto" />}
      </div>

      {/* Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Timestamps (one per line)
        </label>
        <Textarea
          placeholder="Paste timestamps here, one per line...&#10;e.g. 1704067200&#10;1704067200000&#10;2024-01-15T10:30:00Z"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[140px]"
        />
      </div>

      {/* Results */}
      {entries.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Results ({entries.length})
          </h3>
          <div className="space-y-2">
            {entries.map((entry, idx) => (
              <div
                key={idx}
                className={`rounded-lg border p-3 ${
                  entry.success
                    ? 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                    : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {entry.input}
                    </div>
                    {entry.success ? (
                      <div className="grid gap-1 text-sm sm:grid-cols-2">
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-400">ISO: </span>
                          <span className="font-mono text-zinc-700 dark:text-zinc-300">
                            {entry.iso}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-400">
                            {tzMode === 'utc' ? 'UTC' : 'Local'}:{' '}
                          </span>
                          <span className="font-mono text-zinc-700 dark:text-zinc-300">
                            {tzMode === 'utc' ? entry.utc : entry.local}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-400">Unix: </span>
                          <span className="font-mono text-zinc-700 dark:text-zinc-300">
                            {entry.unix}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 dark:text-zinc-400">Relative: </span>
                          <span className="text-zinc-700 dark:text-zinc-300">{entry.relative}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-red-600 dark:text-red-400">{entry.error}</div>
                    )}
                  </div>
                  {entry.success && (
                    <CopyButton text={tzMode === 'utc' ? entry.iso! : entry.local!} size="sm" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TimestampBatchTool() {
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
        toolUI={<TimestampBatchUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
