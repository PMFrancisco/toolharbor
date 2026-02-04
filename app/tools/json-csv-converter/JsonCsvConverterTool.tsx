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
import { csvToJson, jsonToCsv } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

type ConversionMode = 'json-to-csv' | 'csv-to-json';
type Delimiter = ',' | ';' | '\t';

function JsonCsvConverterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ConversionMode>('json-to-csv');
  const [delimiter, setDelimiter] = useState<Delimiter>(',');

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some data to convert');
      setOutput('');
      return;
    }

    const result =
      mode === 'json-to-csv' ? jsonToCsv(input, delimiter) : csvToJson(input, delimiter);

    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode, delimiter]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'json-to-csv') {
      setInput(`[
  { "id": 1, "name": "Alice Johnson", "email": "alice@example.com", "role": "Admin" },
  { "id": 2, "name": "Bob Smith", "email": "bob@example.com", "role": "User" },
  { "id": 3, "name": "Carol White", "email": "carol@example.com", "role": "User" }
]`);
    } else {
      setInput(`id,name,email,role
1,Alice Johnson,alice@example.com,Admin
2,Bob Smith,bob@example.com,User
3,Carol White,carol@example.com,User`);
    }
    setError('');
    setOutput('');
  }, [mode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv'));
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Mode and delimiter selection */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={[
            { value: 'json-to-csv', label: 'JSON → CSV' },
            { value: 'csv-to-json', label: 'CSV → JSON' },
          ]}
          value={mode}
          onChange={setMode}
        />

        <div className="flex items-center gap-2">
          <label htmlFor="delimiter" className="text-sm text-zinc-600 dark:text-zinc-400">
            Delimiter:
          </label>
          <select
            id="delimiter"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as Delimiter)}
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="&#9;">Tab</option>
          </select>
        </div>
      </div>

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
              {mode === 'json-to-csv' ? 'JSON Input' : 'CSV Input'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'json-to-csv'
                ? 'Paste your JSON array here...\n[{ "key": "value" }, ...]'
                : 'Paste your CSV data here...\nFirst row should be headers.'
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
              {mode === 'json-to-csv' ? 'CSV Output' : 'JSON Output'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder={
              mode === 'json-to-csv'
                ? 'CSV output will appear here...'
                : 'JSON output will appear here...'
            }
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function JsonCsvConverterTool() {
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
        toolUI={<JsonCsvConverterUI />}
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
