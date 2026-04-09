'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, Select, CopyButton, StatCard } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { analyzeContext, formatContextSummary } from '@/lib/tools';
import { AI_MODELS, formatContextWindow } from '@/lib/tools/token-counter';
import type { UsageLevel } from '@/lib/tools/context-window';
import { cn } from '@/lib/utils';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function usageBarColor(level: UsageLevel): string {
  switch (level) {
    case 'low':
      return 'bg-green-500';
    case 'medium':
      return 'bg-green-400';
    case 'high':
      return 'bg-yellow-500';
    case 'critical':
      return 'bg-red-500';
  }
}

function usageTextColor(level: UsageLevel): string {
  switch (level) {
    case 'low':
    case 'medium':
      return 'text-green-600 dark:text-green-400';
    case 'high':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'critical':
      return 'text-red-600 dark:text-red-400';
  }
}

const modelOptions = AI_MODELS.map((m) => ({
  value: m.id,
  label: `${m.name} (${formatContextWindow(m.contextWindow)})`,
}));

function ContextWindowCalculatorUI() {
  const [modelId, setModelId] = useState('gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [fewShot, setFewShot] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const analysis = useMemo(
    () => analyzeContext(modelId, systemPrompt, fewShot, userMessage),
    [modelId, systemPrompt, fewShot, userMessage]
  );

  const summary = useMemo(() => {
    if (analysis.totalTokens === 0) return '';
    return formatContextSummary(analysis);
  }, [analysis]);

  const clearAll = useCallback(() => {
    setSystemPrompt('');
    setFewShot('');
    setUserMessage('');
  }, []);

  const loadSample = useCallback(() => {
    setSystemPrompt(
      'You are a senior TypeScript developer. Answer questions with concise code examples. Always use modern ES2022+ syntax and explain trade-offs.'
    );
    setFewShot(
      "User: How do I debounce a function?\nAssistant: Here's a type-safe debounce:\n\nfunction debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {\n  let id: ReturnType<typeof setTimeout>;\n  return (...args: Parameters<T>) => {\n    clearTimeout(id);\n    id = setTimeout(() => fn(...args), ms);\n  };\n}"
    );
    setUserMessage('How do I implement a retry mechanism with exponential backoff in TypeScript?');
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="model" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Model:
          </label>
          <Select
            id="model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            options={modelOptions}
          />
        </div>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* System Prompt */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          System Prompt
        </label>
        <Textarea
          placeholder="Enter your system prompt..."
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* Few-shot Examples */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Few-shot Examples
        </label>
        <Textarea
          placeholder="Enter few-shot examples (optional)..."
          value={fewShot}
          onChange={(e) => setFewShot(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      {/* User Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">User Message</label>
        <Textarea
          placeholder="Enter the user message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      {/* Usage Bar */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800">
        <div className="mb-1.5 flex items-center justify-between">
          <span className={cn('text-sm font-medium', usageTextColor(analysis.usageLevel))}>
            {analysis.usagePercent.toFixed(1)}% used
          </span>
          <span className="text-xs text-zinc-500">
            ~{analysis.totalTokens.toLocaleString()} /{' '}
            {analysis.model.contextWindow.toLocaleString()} tokens
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className={cn(
              'h-3 rounded-full transition-all duration-300',
              usageBarColor(analysis.usageLevel)
            )}
            style={{ width: `${Math.min(100, analysis.usagePercent)}%` }}
          />
        </div>
      </div>

      {/* Section Breakdown */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Breakdown</h3>
          <CopyButton text={summary} label="Copy Summary" size="sm" disabled={!summary} />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {analysis.sections.map((section) => (
            <StatCard
              key={section.label}
              label={section.label}
              value={`~${section.tokens.toLocaleString()}`}
            />
          ))}
          <StatCard label="Total Used" value={`~${analysis.totalTokens.toLocaleString()}`} />
          <StatCard label="Remaining" value={`~${analysis.remainingTokens.toLocaleString()}`} />
        </div>
      </div>
    </div>
  );
}

export function ContextWindowCalculatorTool() {
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
        toolUI={<ContextWindowCalculatorUI />}
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
