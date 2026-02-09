'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, ErrorMessage } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseFullUrl } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

interface ComponentCardProps {
  label: string;
  value: string;
}

function ComponentCard({ label, value }: ComponentCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
          {label}
        </span>
        <CopyButton text={value} size="sm" disabled={!value} />
      </div>
      <p className="mt-1 font-mono text-sm break-all text-zinc-900 dark:text-zinc-100">
        {value || <span className="text-zinc-400 dark:text-zinc-600">—</span>}
      </p>
    </div>
  );
}

function formatParsedSummary(data: import('@/lib/tools').ParsedUrl): string {
  const lines = [
    `Protocol:     ${data.protocol}`,
    `Host:         ${data.host}`,
    `Hostname:     ${data.hostname}`,
    `Port:         ${data.port || '(default)'}`,
    `Pathname:     ${data.pathname}`,
    `Origin:       ${data.origin}`,
    `Query String: ${data.search || '(none)'}`,
    `Hash:         ${data.hash || '(none)'}`,
  ];

  if (data.params.length > 0) {
    lines.push('', 'Query Parameters:');
    for (const p of data.params) {
      lines.push(`  ${p.key} = ${p.value}`);
    }
  }

  return lines.join('\n');
}

function UrlParserUI() {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return parseFullUrl(input);
  }, [input]);

  const summary = useMemo(() => {
    if (!result?.success) return '';
    return formatParsedSummary(result.data);
  }, [result]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput('https://example.com/search?q=hello+world&lang=en&page=2&sort=relevance#results');
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            URL to Parse
          </label>
          <CopyButton text={input} size="sm" disabled={!input} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/path?key=value&key2=value2#section"
          className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        {result && !result.success && <ErrorMessage message={result.error} />}
      </div>

      {/* Parsed components */}
      {result?.success && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Parsed Components
            </h3>
            <CopyButton text={summary} label="Copy Summary" size="sm" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ComponentCard label="Protocol" value={result.data.protocol} />
            <ComponentCard label="Host" value={result.data.host} />
            <ComponentCard label="Hostname" value={result.data.hostname} />
            <ComponentCard label="Port" value={result.data.port || '(default)'} />
            <ComponentCard label="Pathname" value={result.data.pathname} />
            <ComponentCard label="Origin" value={result.data.origin} />
            <ComponentCard label="Query String" value={result.data.search} />
            <ComponentCard label="Hash / Fragment" value={result.data.hash} />
          </div>

          {/* Query parameters table */}
          {result.data.params.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Query Parameters ({result.data.params.length})
              </h3>
              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                      <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                        Key
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                        Value
                      </th>
                      <th className="w-12 px-3 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.params.map((param, i) => (
                      <tr
                        key={`${param.key}-${i}`}
                        className={
                          i < result.data.params.length - 1
                            ? 'border-b border-zinc-100 dark:border-zinc-800/50'
                            : ''
                        }
                      >
                        <td className="px-3 py-2 font-mono font-medium text-zinc-900 dark:text-zinc-100">
                          {param.key}
                        </td>
                        <td className="px-3 py-2 font-mono text-zinc-700 dark:text-zinc-300">
                          {param.value || <span className="text-zinc-400">(empty)</span>}
                        </td>
                        <td className="px-3 py-2">
                          <CopyButton text={`${param.key}=${param.value}`} size="sm" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function UrlParserTool() {
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
        toolUI={<UrlParserUI />}
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
