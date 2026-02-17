'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  Textarea,
  CopyButton,
  SwapButton,
  ModeToggle,
  ReadOnlyTextarea,
  Checkbox,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { escapeUnicode, unescapeUnicode, escapeModeOptions } from '@/lib/tools';
import type { EscapeMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function UnicodeEscapeUI() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<EscapeMode>('escape');
  const [escapeAll, setEscapeAll] = useState(false);

  const result = useMemo(() => {
    if (!input) return null;
    return mode === 'escape' ? escapeUnicode(input, escapeAll) : unescapeUnicode(input);
  }, [mode, input, escapeAll]);

  const output = result?.success ? result.data : '';
  const error = result && !result.success ? result.error : '';

  const swapInputOutput = useCallback(() => {
    if (!output) return;
    setInput(output);
    setMode((prev) => (prev === 'escape' ? 'unescape' : 'escape'));
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'escape') {
      setInput('Café résumé naïve 你好世界 🌍🚀');
    } else {
      setInput('Caf\\u00e9 r\\u00e9sum\\u00e9 na\\u00efve \\u4f60\\u597d\\u4e16\\u754c');
    }
  }, [mode]);

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={escapeModeOptions.map((o) => ({ value: o.value, label: o.label }))}
          value={mode}
          onChange={setMode}
        />
        {mode === 'escape' && (
          <Checkbox
            label="Escape all characters"
            checked={escapeAll}
            onChange={(e) => setEscapeAll(e.target.checked)}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <SwapButton onClick={swapInputOutput} disabled={!output} />
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
              {mode === 'escape' ? 'Text to Escape' : 'Escaped Text'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'escape'
                ? 'Enter text to escape...'
                : 'Paste \\uXXXX sequences to unescape...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[200px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'escape' ? 'Escaped Output' : 'Unescaped Text'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Result will appear here..."
            className="min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}

export function UnicodeEscapeTool() {
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
        toolUI={<UnicodeEscapeUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
