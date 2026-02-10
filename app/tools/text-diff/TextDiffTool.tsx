'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { computeDiff } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function TextDiffUI() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(false);
  const [ignoreEmpty, setIgnoreEmpty] = useState(false);

  const result = useMemo(
    () => computeDiff(original, modified, { ignoreCase, trimWhitespace, ignoreEmpty }),
    [original, modified, ignoreCase, trimWhitespace, ignoreEmpty]
  );

  const hasDiff = original.trim() || modified.trim();

  const diffText = useMemo(() => {
    return result.lines
      .map((line) => {
        if (line.type === 'added') return `+ ${line.text}`;
        if (line.type === 'removed') return `- ${line.text}`;
        return `  ${line.text}`;
      })
      .join('\n');
  }, [result.lines]);

  const clearAll = useCallback(() => {
    setOriginal('');
    setModified('');
  }, []);

  const loadSample = useCallback(() => {
    setOriginal(
      'function greet(name) {\n  console.log("Hello, " + name);\n  return true;\n}\n\ngreet("World");'
    );
    setModified(
      'function greet(name, greeting) {\n  const message = `${greeting}, ${name}!`;\n  console.log(message);\n  return message;\n}\n\ngreet("World", "Hi");'
    );
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <Checkbox
          label="Ignore case"
          checked={ignoreCase}
          onChange={(e) => setIgnoreCase(e.target.checked)}
        />
        <Checkbox
          label="Trim whitespace"
          checked={trimWhitespace}
          onChange={(e) => setTrimWhitespace(e.target.checked)}
        />
        <Checkbox
          label="Skip empty lines"
          checked={ignoreEmpty}
          onChange={(e) => setIgnoreEmpty(e.target.checked)}
        />
      </div>

      {/* Controls + stats */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>

        {hasDiff && (
          <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-green-600 dark:text-green-400">+{result.addedCount}</span>
            {' / '}
            <span className="text-red-600 dark:text-red-400">−{result.removedCount}</span>
            {' / '}
            <span>{result.unchangedCount} unchanged</span>
          </span>
        )}
      </div>

      {/* Two input panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Original Text
            </label>
            <CopyButton text={original} size="sm" disabled={!original} />
          </div>
          <Textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste original text here..."
            className="min-h-[200px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Modified Text
            </label>
            <CopyButton text={modified} size="sm" disabled={!modified} />
          </div>
          <Textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste modified text here..."
            className="min-h-[200px]"
          />
        </div>
      </div>

      {/* Diff output */}
      {hasDiff && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Diff Result
            </label>
            <CopyButton text={diffText} size="sm" disabled={!diffText} />
          </div>
          <div className="overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="min-w-0">
              {result.lines.map((line, idx) => (
                <div
                  key={idx}
                  className={`flex items-start border-l-4 px-3 py-0.5 font-mono text-sm ${
                    line.type === 'added'
                      ? 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-300'
                      : line.type === 'removed'
                        ? 'border-red-500 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-300'
                        : 'border-transparent text-zinc-700 dark:text-zinc-400'
                  }`}
                >
                  <span className="mr-3 w-6 flex-shrink-0 text-right text-zinc-400 select-none dark:text-zinc-600">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                  </span>
                  <span className="break-all whitespace-pre-wrap">{line.text || '\u00A0'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TextDiffTool() {
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
        toolUI={<TextDiffUI />}
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
