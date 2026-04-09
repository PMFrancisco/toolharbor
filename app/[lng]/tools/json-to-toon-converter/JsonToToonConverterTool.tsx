'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, StatCard } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { jsonToToon } from '@/lib/tools/toon';
import type { ToonStats } from '@/lib/tools/toon';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JsonToToonConverterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<ToonStats | null>(null);

  const handleConvert = useCallback(() => {
    const result = jsonToToon(input);
    if (result.success) {
      setOutput(result.data);
      setStats(result.stats);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
      setStats(null);
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
    setStats(null);
  }, []);

  const loadSample = useCallback(() => {
    const sample = JSON.stringify(
      [
        { name: 'Alice Johnson', age: 30, city: 'New York', role: 'engineer' },
        { name: 'Bob Smith', age: 25, city: 'San Francisco', role: 'designer' },
        { name: 'Charlie Brown', age: 35, city: 'Chicago', role: 'manager' },
        { name: 'Diana Lee', age: 28, city: 'Seattle', role: 'engineer' },
        { name: 'Eve Wilson', age: 32, city: 'Austin', role: 'analyst' },
      ],
      null,
      2
    );
    setInput(sample);
    const result = jsonToToon(sample);
    if (result.success) {
      setOutput(result.data);
      setStats(result.stats);
      setError('');
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleConvert}>Convert</Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Stats */}
      {stats && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Size Comparison
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <StatCard label="JSON Size" value={`${stats.jsonBytes.toLocaleString()} B`} />
            <StatCard label="TOON Size" value={`${stats.toonBytes.toLocaleString()} B`} />
            <StatCard label="Saved" value={`${stats.savedBytes.toLocaleString()} B`} />
            <StatCard label="Reduction" value={`${stats.savedPercent}%`} />
          </div>
        </div>
      )}

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              JSON Input
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder='Paste your JSON here...\n[\n  { "name": "Alice", "age": 30 }\n]'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[280px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              TOON Output
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="TOON output will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function JsonToToonConverterTool() {
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
        toolUI={<JsonToToonConverterUI />}
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
