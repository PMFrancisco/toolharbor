'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, ModeToggle, Input } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { jsonToTypeScript, outputStyleOptions } from '@/lib/tools';
import type { OutputStyle } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JsonToTypescriptUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [style, setStyle] = useState<OutputStyle>('interface');
  const [rootName, setRootName] = useState('Root');

  const handleGenerate = useCallback(() => {
    const result = jsonToTypeScript(input, { style, rootName });
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, style, rootName]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(
      JSON.stringify(
        {
          id: 1,
          name: 'ToolHarbor',
          url: 'https://toolharbor.dev',
          isPublic: true,
          tags: ['developer', 'tools', 'free'],
          author: {
            name: 'John Doe',
            email: 'john@example.com',
            social: {
              twitter: '@johndoe',
              github: 'johndoe',
            },
          },
          tools: [
            {
              slug: 'json-formatter',
              name: 'JSON Formatter',
              featured: true,
              category: 'Formatters',
            },
            {
              slug: 'base64-encoder',
              name: 'Base64 Encoder',
              featured: true,
              category: 'Encoders',
            },
          ],
          stats: {
            totalTools: 46,
            monthlyVisitors: 50000,
            uptime: 99.9,
          },
        },
        null,
        2
      )
    );
    setError('');
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={outputStyleOptions.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
          value={style}
          onChange={setStyle}
        />

        <div className="flex items-center gap-2">
          <label htmlFor="rootName" className="text-sm text-zinc-600 dark:text-zinc-400">
            Root name:
          </label>
          <Input
            id="rootName"
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            placeholder="Root"
            className="w-36"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleGenerate}>Generate Types</Button>
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
              Input JSON
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[320px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              TypeScript Output
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="TypeScript types will appear here..."
            className="min-h-[320px]"
          />
        </div>
      </div>
    </div>
  );
}

export function JsonToTypescriptTool() {
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
        toolUI={<JsonToTypescriptUI />}
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
