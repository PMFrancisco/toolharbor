'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ModeToggle, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { normalizeHeaders, headersToJson, jsonToHeaders, headerModeOptions } from '@/lib/tools';
import type { HeaderMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function HttpHeaderFormatterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<HeaderMode>('normalize');

  const handleFormat = useCallback(() => {
    let result;
    switch (mode) {
      case 'normalize':
        result = normalizeHeaders(input);
        break;
      case 'to-json':
        result = headersToJson(input);
        break;
      case 'from-json':
        result = jsonToHeaders(input);
        break;
    }
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'from-json') {
      setInput(
        JSON.stringify(
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9...',
            'X-Request-Id': 'req-abc-123',
            'Cache-Control': 'no-cache, no-store',
            Accept: 'application/json',
          },
          null,
          2
        )
      );
    } else {
      setInput(`HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
x-request-id: req-abc-123
cache-control: no-cache, no-store
accept: application/json
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 999`);
    }
    setError('');
    setOutput('');
  }, [mode]);

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <ModeToggle
        options={headerModeOptions.map((o) => ({ value: o.value, label: o.label }))}
        value={mode}
        onChange={setMode}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleFormat}>Format</Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'from-json' ? 'JSON Input' : 'Raw Headers'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'from-json'
                ? 'Paste JSON object here...'
                : 'Paste HTTP headers here (Key: Value)...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[280px] font-mono text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'to-json'
                ? 'JSON Output'
                : mode === 'from-json'
                  ? 'Raw Headers'
                  : 'Normalized Headers'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Formatted result will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function HttpHeaderFormatterTool() {
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
        toolUI={<HttpHeaderFormatterUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
