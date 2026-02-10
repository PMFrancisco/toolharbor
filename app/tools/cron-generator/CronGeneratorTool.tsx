'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, Select } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import {
  buildCronExpression,
  parseCronExpression,
  getMinuteOptions,
  getHourOptions,
  getDayOfMonthOptions,
  getMonthOptions,
  getDayOfWeekOptions,
  CRON_PRESETS,
} from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function CronGeneratorUI() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');

  const expression = useMemo(
    () => buildCronExpression({ minute, hour, dayOfMonth, month, dayOfWeek }),
    [minute, hour, dayOfMonth, month, dayOfWeek]
  );

  const result = useMemo(() => parseCronExpression(expression), [expression]);

  const minuteOptions = useMemo(() => getMinuteOptions(), []);
  const hourOptions = useMemo(() => getHourOptions(), []);
  const domOptions = useMemo(() => getDayOfMonthOptions(), []);
  const monthOptions = useMemo(() => getMonthOptions(), []);
  const dowOptions = useMemo(() => getDayOfWeekOptions(), []);

  const applyPreset = useCallback((expr: string) => {
    const parts = expr.split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
    }
  }, []);

  const resetAll = useCallback(() => {
    setMinute('*');
    setHour('*');
    setDayOfMonth('*');
    setMonth('*');
    setDayOfWeek('*');
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
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
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
        <Button variant="ghost" size="sm" onClick={resetAll}>
          Reset
        </Button>
      </div>

      {/* Field selectors */}
      <div className="grid gap-4 sm:grid-cols-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Minute</label>
          <Select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            options={minuteOptions}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Hour</label>
          <Select value={hour} onChange={(e) => setHour(e.target.value)} options={hourOptions} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Day of Month
          </label>
          <Select
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            options={domOptions}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Month</label>
          <Select value={month} onChange={(e) => setMonth(e.target.value)} options={monthOptions} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Day of Week
          </label>
          <Select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            options={dowOptions}
          />
        </div>
      </div>

      {/* Generated expression */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Generated Expression
          </span>
          <CopyButton text={expression} size="sm" />
        </div>
        <p className="mt-1 font-mono text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {expression}
        </p>
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

export function CronGeneratorTool() {
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
        toolUI={<CronGeneratorUI />}
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
