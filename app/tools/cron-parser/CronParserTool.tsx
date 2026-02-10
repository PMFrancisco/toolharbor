'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Input, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseCronExpression, CRON_PRESETS } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function CronParserUI() {
  const [expression, setExpression] = useState('');

  const result = useMemo(() => {
    if (!expression.trim()) return null;
    return parseCronExpression(expression);
  }, [expression]);

  const clearAll = useCallback(() => {
    setExpression('');
  }, []);

  const loadSample = useCallback(() => {
    setExpression('30 3 * * 1-5');
  }, []);

  const applyPreset = useCallback((expr: string) => {
    setExpression(expr);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

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

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {CRON_PRESETS.map((preset) => (
          <Button
            key={preset.expression}
            variant="secondary"
            size="sm"
            onClick={() => applyPreset(preset.expression)}
            title={preset.description}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Cron input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Cron Expression
          </label>
          <CopyButton text={expression} size="sm" disabled={!expression} />
        </div>
        <Input
          placeholder="e.g., */15 * * * *  or  0 9 * * 1-5"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="font-mono"
        />
        {result && !result.success && (
          <p className="text-sm text-red-600 dark:text-red-400">{result.error}</p>
        )}
      </div>

      {/* Description */}
      {result?.success && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Description
            </span>
            <CopyButton text={result.data.description} size="sm" />
          </div>
          <p className="mt-1 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {result.data.description}
          </p>
        </div>
      )}

      {/* Field breakdown */}
      {result?.success && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Field Breakdown
          </label>
          <div className="grid gap-2">
            {result.data.fields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-3 items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {field.name}
                </span>
                <code className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                  {field.value}
                </code>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {field.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next runs */}
      {result?.success && result.data.nextRuns.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Next 5 Runs
          </label>
          <div className="space-y-1.5">
            {result.data.nextRuns.map((run, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                    {index + 1}
                  </span>
                  <span className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                    {formatDate(run)}
                  </span>
                </div>
                <CopyButton text={run.toISOString()} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CronParserTool() {
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
        toolUI={<CronParserUI />}
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
