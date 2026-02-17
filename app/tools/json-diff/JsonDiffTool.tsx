'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { diffJson } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JsonDiffUI() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [sortKeys, setSortKeys] = useState(false);

  const result = useMemo(
    () => diffJson(original, modified, { sortKeys }),
    [original, modified, sortKeys]
  );

  const hasDiff = original.trim() || modified.trim();

  const diffText = useMemo(() => {
    if (!result.success) return '';
    return result.entries
      .filter((e) => e.type !== 'unchanged')
      .map((e) => {
        if (e.type === 'added') return `+ ${e.path}: ${e.newValue}`;
        if (e.type === 'removed') return `- ${e.path}: ${e.oldValue}`;
        return `~ ${e.path}: ${e.oldValue} → ${e.newValue}`;
      })
      .join('\n');
  }, [result]);

  const clearAll = useCallback(() => {
    setOriginal('');
    setModified('');
  }, []);

  const loadSample = useCallback(() => {
    setOriginal(
      JSON.stringify(
        {
          name: 'ToolHarbor',
          version: '1.0.0',
          features: ['json', 'base64', 'uuid'],
          config: { theme: 'dark', ads: true, maxTools: 50 },
        },
        null,
        2
      )
    );
    setModified(
      JSON.stringify(
        {
          name: 'ToolHarbor',
          version: '2.0.0',
          features: ['json', 'base64', 'uuid', 'curl'],
          config: { theme: 'light', ads: true, analytics: true },
        },
        null,
        2
      )
    );
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <Checkbox
          label="Sort keys (order-independent)"
          checked={sortKeys}
          onChange={(e) => setSortKeys(e.target.checked)}
        />
      </div>

      {/* Controls + stats */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>

        {result.success && hasDiff && (
          <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-green-600 dark:text-green-400">+{result.addedCount}</span>
            {' / '}
            <span className="text-red-600 dark:text-red-400">−{result.removedCount}</span>
            {' / '}
            <span className="text-amber-600 dark:text-amber-400">~{result.changedCount}</span>
            {' / '}
            <span>{result.unchangedCount} unchanged</span>
          </span>
        )}
      </div>

      {/* Two input panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Original JSON
            </label>
            <CopyButton text={original} size="sm" disabled={!original} />
          </div>
          <Textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original JSON here..."
            error={
              !result.success && (result.target === 'original' || result.target === 'both')
                ? result.error
                : ''
            }
            className="min-h-[200px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Modified JSON
            </label>
            <CopyButton text={modified} size="sm" disabled={!modified} />
          </div>
          <Textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified JSON here..."
            error={!result.success && result.target === 'modified' ? result.error : ''}
            className="min-h-[200px]"
          />
        </div>
      </div>

      {/* Diff output */}
      {result.success && hasDiff && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Diff Result
            </label>
            <CopyButton text={diffText} size="sm" disabled={!diffText} />
          </div>
          <div className="overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="min-w-0">
              {result.entries.map((entry, idx) => {
                if (entry.type === 'unchanged') return null;

                const colors = {
                  added:
                    'border-green-500 bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-300',
                  removed:
                    'border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-300',
                  changed:
                    'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300',
                };

                const symbol = { added: '+', removed: '−', changed: '~' };

                return (
                  <div
                    key={idx}
                    className={`flex items-start border-l-4 px-3 py-1 font-mono text-sm ${colors[entry.type]}`}
                  >
                    <span className="mr-3 w-4 flex-shrink-0 text-center select-none">
                      {symbol[entry.type]}
                    </span>
                    <span className="font-medium">{entry.path}</span>
                    <span className="mx-2">:</span>
                    {entry.type === 'changed' ? (
                      <span className="break-all">
                        <span className="line-through opacity-60">{entry.oldValue}</span>
                        <span className="mx-1">→</span>
                        <span>{entry.newValue}</span>
                      </span>
                    ) : entry.type === 'added' ? (
                      <span className="break-all">{entry.newValue}</span>
                    ) : (
                      <span className="break-all">{entry.oldValue}</span>
                    )}
                  </div>
                );
              })}
              {result.entries.every((e) => e.type === 'unchanged') && (
                <div className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">
                  No differences found — the two JSON documents are identical.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function JsonDiffTool() {
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
        toolUI={<JsonDiffUI />}
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
