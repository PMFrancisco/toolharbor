'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, Input, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { buildQueryString, parseQueryString, createParam } from '@/lib/tools';
import type { QueryParam } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function QueryStringBuilderUI() {
  const [baseUrl, setBaseUrl] = useState('');
  const [params, setParams] = useState<QueryParam[]>([createParam(), createParam(), createParam()]);

  const output = useMemo(() => buildQueryString(baseUrl, params), [baseUrl, params]);

  const updateParam = useCallback((id: string, field: 'key' | 'value', val: string) => {
    setParams((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  }, []);

  const addParam = useCallback(() => {
    setParams((prev) => [...prev, createParam()]);
  }, []);

  const removeParam = useCallback((id: string) => {
    setParams((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return filtered.length === 0 ? [createParam()] : filtered;
    });
  }, []);

  const handleParseUrl = useCallback(() => {
    if (!baseUrl.trim()) return;
    const parsed = parseQueryString(baseUrl);
    if (parsed.length > 0) {
      setParams(parsed);
      // Clean the base URL (remove query + hash)
      try {
        const url = new URL(baseUrl);
        setBaseUrl(`${url.origin}${url.pathname}`);
      } catch {
        // Keep as-is if not a valid URL
      }
    }
  }, [baseUrl]);

  const clearAll = useCallback(() => {
    setBaseUrl('');
    setParams([createParam(), createParam(), createParam()]);
  }, []);

  const loadSample = useCallback(() => {
    setBaseUrl('https://api.example.com/search');
    setParams([
      createParam('q', 'hello world'),
      createParam('lang', 'en'),
      createParam('page', '1'),
      createParam('sort', 'relevance'),
    ]);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={handleParseUrl} disabled={!baseUrl}>
          Parse URL
        </Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Base URL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Base URL (optional)
        </label>
        <Input
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://example.com/api/endpoint"
          className="font-mono"
        />
      </div>

      {/* Parameters */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Parameters</label>

        {params.map((param) => (
          <div key={param.id} className="flex items-center gap-2">
            <Input
              value={param.key}
              onChange={(e) => updateParam(param.id, 'key', e.target.value)}
              placeholder="Key"
              className="flex-1 font-mono"
            />
            <span className="text-zinc-400">=</span>
            <Input
              value={param.value}
              onChange={(e) => updateParam(param.id, 'value', e.target.value)}
              placeholder="Value"
              className="flex-1 font-mono"
            />
            <button
              onClick={() => removeParam(param.id)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-500 hover:border-red-300 hover:text-red-500 dark:border-zinc-700 dark:hover:border-red-700"
              aria-label="Remove parameter"
            >
              ×
            </button>
          </div>
        ))}

        <Button variant="ghost" onClick={addParam} className="self-start">
          + Add Parameter
        </Button>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Generated URL
          </label>
          <CopyButton text={output} size="sm" disabled={!output} />
        </div>
        <ReadOnlyTextarea
          value={output}
          placeholder="Generated URL will appear here..."
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
}

export function QueryStringBuilderTool() {
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
        toolUI={<QueryStringBuilderUI />}
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
