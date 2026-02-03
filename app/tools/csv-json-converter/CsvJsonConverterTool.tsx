'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
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

type ConversionMode = 'csv-to-json' | 'json-to-csv';
type Delimiter = ',' | ';' | '\t';

function CsvJsonConverterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ConversionMode>('csv-to-json');
  const [delimiter, setDelimiter] = useState<Delimiter>(',');

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some data to convert');
      setOutput('');
      return;
    }

    const result =
      mode === 'csv-to-json' ? csvToJson(input, delimiter) : jsonToCsv(input, delimiter);

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
    if (mode === 'csv-to-json') {
      setInput(`name,email,age,city
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,Los Angeles
Bob Johnson,bob@example.com,35,Chicago`);
    } else {
      setInput(`[
  { "name": "John Doe", "email": "john@example.com", "age": 30, "city": "New York" },
  { "name": "Jane Smith", "email": "jane@example.com", "age": 25, "city": "Los Angeles" },
  { "name": "Bob Johnson", "email": "bob@example.com", "age": 35, "city": "Chicago" }
]`);
    }
    setError('');
    setOutput('');
  }, [mode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json'));
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Mode and delimiter selection */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700">
          <button
            onClick={() => setMode('csv-to-json')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'csv-to-json'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            } rounded-l-lg`}
          >
            CSV → JSON
          </button>
          <button
            onClick={() => setMode('json-to-csv')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'json-to-csv'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            } rounded-r-lg`}
          >
            JSON → CSV
          </button>
        </div>

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
        <Button variant="secondary" onClick={swapMode} disabled={!output}>
          Swap Input/Output
        </Button>
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
              {mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'csv-to-json'
                ? 'Paste your CSV data here...\nFirst row should be headers.'
                : 'Paste your JSON array here...\n[{ "key": "value" }, ...]'
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
              {mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <textarea
            readOnly
            value={output}
            placeholder={
              mode === 'csv-to-json'
                ? 'JSON output will appear here...'
                : 'CSV output will appear here...'
            }
            className="min-h-[280px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
      </div>
    </div>
  );
}

export function CsvJsonConverterTool() {
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
        toolUI={<CsvJsonConverterUI />}
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
