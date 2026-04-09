'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, StatCard } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { countTokens, formatTokenSummary, formatContextWindow } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function TokenCounterUI() {
  const [input, setInput] = useState('');

  const result = useMemo(() => countTokens(input), [input]);
  const summary = useMemo(() => {
    if (!input.trim()) return '';
    return formatTokenSummary(result);
  }, [input, result]);

  const clearAll = useCallback(() => setInput(''), []);

  const loadSample = useCallback(() => {
    setInput(
      "You are a helpful assistant that answers questions about software development. Always provide code examples when relevant and explain your reasoning step by step.\n\nUser: How do I implement a binary search in TypeScript?\n\nAssistant: Here's a binary search implementation in TypeScript:\n\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n\n  return -1;\n}"
    );
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
      </div>

      {/* Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Text</label>
        <Textarea
          placeholder="Paste or type your text to estimate token counts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      {/* Quick Stats */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Text Stats</h3>
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Characters" value={result.characters.toLocaleString()} />
          <StatCard label="Words" value={result.words.toLocaleString()} />
          <StatCard label="Lines" value={result.lines.toLocaleString()} />
        </div>
      </div>

      {/* Token Estimates Table */}
      {result.characters > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Token Estimates
            </h3>
            <CopyButton text={summary} label="Copy Summary" size="sm" disabled={!summary} />
          </div>
          <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            Estimates based on average character-to-token ratios per model family. Actual counts may
            vary.
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Model
                  </th>
                  <th className="hidden px-3 py-2 text-left font-medium text-zinc-600 sm:table-cell dark:text-zinc-400">
                    Provider
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-zinc-600 dark:text-zinc-400">
                    Tokens
                  </th>
                  <th className="hidden px-3 py-2 text-right font-medium text-zinc-600 sm:table-cell dark:text-zinc-400">
                    Context
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-zinc-600 dark:text-zinc-400">
                    % Used
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.estimates.map((est, i) => (
                  <tr
                    key={est.model.id}
                    className={
                      i < result.estimates.length - 1
                        ? 'border-b border-zinc-100 dark:border-zinc-800/50'
                        : ''
                    }
                  >
                    <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
                      {est.model.name}
                    </td>
                    <td className="hidden px-3 py-2 text-zinc-600 sm:table-cell dark:text-zinc-400">
                      {est.model.provider}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-zinc-900 dark:text-zinc-100">
                      ~{est.tokens.toLocaleString()}
                    </td>
                    <td className="hidden px-3 py-2 text-right text-zinc-500 sm:table-cell dark:text-zinc-400">
                      {formatContextWindow(est.model.contextWindow)}
                    </td>
                    <td className="px-3 py-2 text-right text-zinc-500 dark:text-zinc-400">
                      {est.percentOfContext}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function TokenCounterTool() {
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
        slug={toolInfo.slug}
        toolUI={<TokenCounterUI />}
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
