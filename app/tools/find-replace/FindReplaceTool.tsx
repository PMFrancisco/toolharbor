'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, Input } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { findAndReplace, countMatches } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function FindReplaceUI() {
  const [input, setInput] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const options = useMemo(
    () => ({ caseSensitive, useRegex, wholeWord }),
    [caseSensitive, useRegex, wholeWord]
  );

  const matchCount = useMemo(() => countMatches(input, find, options), [input, find, options]);

  const result = useMemo(
    () => findAndReplace(input, find, replace, options),
    [input, find, replace, options]
  );

  const clearAll = useCallback(() => {
    setInput('');
    setFind('');
    setReplace('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(
      'The quick brown fox jumps over the lazy dog.\nThe Fox is quick and the dog is lazy.\nfox fox Fox FOX — foxes are everywhere!'
    );
    setFind('fox');
    setReplace('cat');
  }, []);

  return (
    <div className="space-y-4">
      {/* Find & Replace fields */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Find</label>
          <Input
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder="Search text or pattern..."
            className="font-mono"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Replace with
          </label>
          <Input
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder="Replacement text (empty to delete)"
            className="font-mono"
          />
        </div>
      </div>

      {/* Options + match count */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Case sensitive
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={wholeWord}
            onChange={(e) => setWholeWord(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Whole word
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700"
          />
          Regex
        </label>

        {find && (
          <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
            {matchCount} match{matchCount !== 1 ? 'es' : ''} found
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Source text */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Source Text
          </label>
          <CopyButton text={input} size="sm" disabled={!input} />
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[180px]"
        />
      </div>

      {/* Result */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Result
            {matchCount > 0 && (
              <span className="ml-2 text-xs font-normal text-zinc-500">
                ({matchCount} replacement{matchCount !== 1 ? 's' : ''})
              </span>
            )}
          </label>
          <CopyButton text={result.output} size="sm" disabled={!result.output || !find} />
        </div>
        <ReadOnlyTextarea
          value={find ? result.output : ''}
          placeholder="Result will appear here when you enter a search term..."
        />
      </div>
    </div>
  );
}

export function FindReplaceTool() {
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
        toolUI={<FindReplaceUI />}
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
