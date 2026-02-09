'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ModeToggle, ReadOnlyTextarea, Input } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateSlug, slugSeparatorOptions } from '@/lib/tools';
import type { SlugSeparator } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function SlugGeneratorUI() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<SlugSeparator>('-');
  const [maxLength, setMaxLength] = useState(0);

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return generateSlug(input, { separator, maxLength });
  }, [input, separator, maxLength]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput('How to Build a REST API with Node.js\nCafé résumé naïve\n10 Tips for Better CSS!');
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={slugSeparatorOptions.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
          value={separator}
          onChange={setSeparator}
        />

        <div className="flex items-center gap-2">
          <label htmlFor="maxLength" className="text-sm text-zinc-600 dark:text-zinc-400">
            Max length:
          </label>
          <Input
            id="maxLength"
            type="number"
            min={0}
            max={200}
            value={maxLength || ''}
            onChange={(e) => setMaxLength(Number(e.target.value) || 0)}
            placeholder="0 = no limit"
            className="w-36"
          />
        </div>
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

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Text to Slugify
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder="Enter a title, heading, or any text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Generated Slug
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea value={output} placeholder="Your slug will appear here..." />
        </div>
      </div>
    </div>
  );
}

export function SlugGeneratorTool() {
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
        toolUI={<SlugGeneratorUI />}
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
