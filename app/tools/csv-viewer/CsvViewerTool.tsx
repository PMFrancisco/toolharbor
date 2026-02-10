'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, Select, ErrorMessage, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseCsvTable } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

type Delimiter = ',' | ';' | '\t';

function CsvViewerUI() {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState<Delimiter>(',');
  const [hasHeader, setHasHeader] = useState(true);

  const result = useMemo(
    () => parseCsvTable(input, { delimiter, hasHeader }),
    [input, delimiter, hasHeader]
  );

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(`name,email,age,city,role
John Doe,john@example.com,30,New York,Developer
Jane Smith,jane@example.com,25,Los Angeles,Designer
Bob Johnson,bob@example.com,35,Chicago,Manager
Alice Brown,alice@example.com,28,Seattle,Developer
Charlie Wilson,charlie@example.com,42,Boston,Director`);
    setDelimiter(',');
    setHasHeader(true);
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

        <div className="ml-auto flex items-center gap-4">
          <Checkbox
            label="Has Header"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
          />

          <div className="flex items-center gap-2">
            <label htmlFor="delimiter" className="text-sm text-zinc-600 dark:text-zinc-400">
              Delimiter:
            </label>
            <Select
              id="delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as Delimiter)}
              options={[
                { value: ',', label: 'Comma (,)' },
                { value: ';', label: 'Semicolon (;)' },
                { value: '\t', label: 'Tab' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* CSV Input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CSV Input</label>
          <CopyButton text={input} size="sm" disabled={!input} />
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSV data here..."
          className="min-h-[150px]"
        />
      </div>

      {/* Error */}
      {result && !result.success && <ErrorMessage message={result.error} />}

      {/* Stats bar */}
      {result?.success && result.data.rowCount > 0 && (
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <span>
            <strong className="text-zinc-900 dark:text-zinc-100">{result.data.rowCount}</strong> row
            {result.data.rowCount !== 1 ? 's' : ''}
          </span>
          <span>
            <strong className="text-zinc-900 dark:text-zinc-100">{result.data.columnCount}</strong>{' '}
            column{result.data.columnCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Table Preview */}
      {result?.success && result.data.rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <th className="px-3 py-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  #
                </th>
                {result.data.headers.map((header, i) => (
                  <th key={i} className="px-3 py-2 font-medium text-zinc-700 dark:text-zinc-300">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.data.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-zinc-100 dark:border-zinc-800 ${
                    rowIndex % 2 === 0
                      ? 'bg-white dark:bg-zinc-950'
                      : 'bg-zinc-50/50 dark:bg-zinc-900/50'
                  }`}
                >
                  <td className="px-3 py-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    {rowIndex + 1}
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="max-w-[300px] truncate px-3 py-2 text-zinc-900 dark:text-zinc-100"
                      title={cell}
                    >
                      {cell || <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function CsvViewerTool() {
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
        toolUI={<CsvViewerUI />}
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
