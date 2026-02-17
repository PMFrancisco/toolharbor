'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  Textarea,
  CopyButton,
  SwapButton,
  ModeToggle,
  ReadOnlyTextarea,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { jsonToNdjson, ndjsonToJson, ndjsonModeOptions } from '@/lib/tools';
import type { NdjsonMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function NdjsonConverterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<NdjsonMode>('json-to-ndjson');

  const handleConvert = useCallback(() => {
    const result = mode === 'json-to-ndjson' ? jsonToNdjson(input) : ndjsonToJson(input);
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'json-to-ndjson' ? 'ndjson-to-json' : 'json-to-ndjson'));
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'json-to-ndjson') {
      setInput(
        JSON.stringify(
          [
            { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
            { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' },
          ],
          null,
          2
        )
      );
    } else {
      setInput(
        '{"id":1,"name":"Alice","email":"alice@example.com","role":"admin"}\n{"id":2,"name":"Bob","email":"bob@example.com","role":"user"}\n{"id":3,"name":"Charlie","email":"charlie@example.com","role":"user"}'
      );
    }
    setError('');
    setOutput('');
  }, [mode]);

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <ModeToggle
        options={ndjsonModeOptions.map((o) => ({ value: o.value, label: o.label }))}
        value={mode}
        onChange={setMode}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleConvert}>Convert</Button>
        <SwapButton onClick={swapMode} disabled={!output} />
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
              {mode === 'json-to-ndjson' ? 'JSON Array' : 'NDJSON Input'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'json-to-ndjson'
                ? 'Paste a JSON array here...'
                : 'Paste NDJSON (one object per line)...'
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
              {mode === 'json-to-ndjson' ? 'NDJSON Output' : 'JSON Array'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Result will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function NdjsonConverterTool() {
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
        toolUI={<NdjsonConverterUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
