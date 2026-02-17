'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea, ModeToggle, Input } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { flattenJson, unflattenJson, flattenModeOptions } from '@/lib/tools';
import type { FlattenMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JsonFlattenUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<FlattenMode>('flatten');
  const [separator, setSeparator] = useState('.');

  const handleConvert = useCallback(() => {
    const opts = { separator: separator || '.' };
    const result = mode === 'flatten' ? flattenJson(input, opts) : unflattenJson(input, opts);
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode, separator]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'flatten') {
      setInput(
        JSON.stringify(
          {
            user: {
              name: 'Jane Doe',
              email: 'jane@example.com',
              address: { city: 'Boston', zip: '02101', country: 'US' },
            },
            tags: ['developer', 'typescript'],
            settings: { theme: 'dark', notifications: { email: true, sms: false } },
          },
          null,
          2
        )
      );
    } else {
      setInput(
        JSON.stringify(
          {
            'user.name': 'Jane Doe',
            'user.email': 'jane@example.com',
            'user.address.city': 'Boston',
            'user.address.zip': '02101',
            'user.address.country': 'US',
            'tags.0': 'developer',
            'tags.1': 'typescript',
            'settings.theme': 'dark',
            'settings.notifications.email': true,
            'settings.notifications.sms': false,
          },
          null,
          2
        )
      );
    }
    setError('');
  }, [mode]);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={flattenModeOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
          value={mode}
          onChange={setMode}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="separator" className="text-sm text-zinc-600 dark:text-zinc-400">
            Separator:
          </label>
          <Input
            id="separator"
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            placeholder="."
            className="w-20"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleConvert}>Convert</Button>
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
            placeholder={
              mode === 'flatten' ? 'Paste nested JSON here...' : 'Paste flat JSON here...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[300px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'flatten' ? 'Flattened Output' : 'Nested Output'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder={
              mode === 'flatten'
                ? 'Flattened JSON will appear here...'
                : 'Nested JSON will appear here...'
            }
            className="min-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
}

export function JsonFlattenTool() {
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
        toolUI={<JsonFlattenUI />}
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
