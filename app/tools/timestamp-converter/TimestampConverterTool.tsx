'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseTimestamp, getCurrentTimestamp } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function TimestampConverterUI() {
  const [input, setInput] = useState('');
  const [currentTime, setCurrentTime] = useState(() => getCurrentTimestamp());

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return parseTimestamp(input);
  }, [input]);

  const setNow = useCallback(() => {
    const now = Date.now();
    setInput(now.toString());
    setCurrentTime(getCurrentTimestamp());
  }, []);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Current time display */}
      <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Current Time</span>
          <Button size="sm" onClick={setNow}>
            Refresh
          </Button>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded bg-white px-3 py-2 dark:bg-zinc-900">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Unix (s)</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{currentTime.unix}</span>
              <CopyButton text={currentTime.unix.toString()} size="sm" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded bg-white px-3 py-2 dark:bg-zinc-900">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Unix (ms)</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{currentTime.unixMs}</span>
              <CopyButton text={currentTime.unixMs.toString()} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={setNow}>Use Current Time</Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Enter Timestamp or Date
        </label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="e.g., 1704067200, 1704067200000, or 2024-01-15T10:30:00Z"
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 font-mono text-lg text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        {result && !result.success && (
          <p className="text-sm text-red-600 dark:text-red-400">{result.error}</p>
        )}
      </div>

      {/* Output */}
      {result?.success && (
        <div className="space-y-4">
          {/* Main formats */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  Unix Timestamp (seconds)
                </span>
                <CopyButton text={result.data.unix.toString()} size="sm" />
              </div>
              <p className="mt-1 font-mono text-lg text-zinc-900 dark:text-zinc-100">
                {result.data.unix}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  Unix Timestamp (milliseconds)
                </span>
                <CopyButton text={result.data.unixMs.toString()} size="sm" />
              </div>
              <p className="mt-1 font-mono text-lg text-zinc-900 dark:text-zinc-100">
                {result.data.unixMs}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  ISO 8601
                </span>
                <CopyButton text={result.data.iso} size="sm" />
              </div>
              <p className="mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {result.data.iso}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  UTC
                </span>
                <CopyButton text={result.data.utc} size="sm" />
              </div>
              <p className="mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {result.data.utc}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  Local Time
                </span>
                <CopyButton text={result.data.local} size="sm" />
              </div>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{result.data.local}</p>
            </div>

            <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
              <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                Relative
              </span>
              <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
                {result.data.relative}
              </p>
            </div>
          </div>

          {/* Date breakdown */}
          <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
            <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
              Date Components
            </span>
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Year</p>
                <p className="font-mono font-medium">{result.data.date.year}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Month</p>
                <p className="font-mono font-medium">{result.data.date.month}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Day</p>
                <p className="font-mono font-medium">{result.data.date.day}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Hour</p>
                <p className="font-mono font-medium">{result.data.date.hour}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Min</p>
                <p className="font-mono font-medium">{result.data.date.minute}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Sec</p>
                <p className="font-mono font-medium">{result.data.date.second}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Ms</p>
                <p className="font-mono font-medium">{result.data.date.millisecond}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Day</p>
                <p className="text-sm font-medium">{result.data.date.dayOfWeek.slice(0, 3)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TimestampConverterTool() {
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
        toolUI={<TimestampConverterUI />}
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
