'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, Select, Checkbox, Slider } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateNanoids, buildAlphabet, alphabetOptions } from '@/lib/tools';
import type { AlphabetKey } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function NanoidGeneratorUI() {
  const [ids, setIds] = useState<string[]>(() => generateNanoids());
  const [length, setLength] = useState(21);
  const [count, setCount] = useState(1);
  const [selectedAlphabets, setSelectedAlphabets] = useState<AlphabetKey[]>([
    'lowercase',
    'uppercase',
    'numbers',
    'symbols',
  ]);

  const handleGenerate = useCallback(() => {
    const alphabet = buildAlphabet(selectedAlphabets);
    if (alphabet.length < 2) {
      setIds(['Select at least one character set']);
      return;
    }
    setIds(generateNanoids({ length, alphabet, count }));
  }, [length, count, selectedAlphabets]);

  const handleAlphabetToggle = useCallback((key: AlphabetKey, checked: boolean) => {
    setSelectedAlphabets((prev) => (checked ? [...prev, key] : prev.filter((k) => k !== key)));
  }, []);

  const allIdsText = ids.join('\n');

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">Length:</label>
          <Slider
            min={1}
            max={128}
            value={length}
            onValueChange={setLength}
            showValue={false}
            className="w-32"
          />
          <span className="w-8 text-sm font-medium text-zinc-800 dark:text-zinc-200">{length}</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="nanoid-count" className="text-sm text-zinc-600 dark:text-zinc-400">
            Count:
          </label>
          <Select
            id="nanoid-count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            options={[1, 5, 10, 25, 50, 100].map((n) => ({ value: n, label: String(n) }))}
          />
        </div>
      </div>

      {/* Alphabet selection */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Alphabet:</span>
        {alphabetOptions.map(({ value, label }) => (
          <Checkbox
            key={value}
            label={label}
            checked={selectedAlphabets.includes(value)}
            onChange={(e) => handleAlphabetToggle(value, e.target.checked)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleGenerate}>Generate</Button>
        {ids.length > 1 && <CopyButton text={allIdsText} label="Copy All" className="ml-auto" />}
      </div>

      {/* ID List */}
      <div className="space-y-2">
        {ids.map((id, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <code className="flex-1 font-mono text-sm break-all text-zinc-900 dark:text-zinc-100">
              {id}
            </code>
            <CopyButton text={id} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NanoidGeneratorTool() {
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
        toolUI={<NanoidGeneratorUI />}
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
