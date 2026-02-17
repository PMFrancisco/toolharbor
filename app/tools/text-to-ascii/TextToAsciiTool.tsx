'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  Textarea,
  CopyButton,
  SwapButton,
  ModeToggle,
  ReadOnlyTextarea,
  Input,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { textToAscii, asciiToText, asciiFormatOptions, asciiModeOptions } from '@/lib/tools';
import type { AsciiFormat, AsciiMode } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function TextToAsciiUI() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AsciiMode>('text-to-ascii');
  const [format, setFormat] = useState<AsciiFormat>('decimal');
  const [separator, setSeparator] = useState(' ');

  const result = useMemo(() => {
    if (!input) return null;
    return mode === 'text-to-ascii'
      ? textToAscii(input, format, separator)
      : asciiToText(input, format, separator);
  }, [input, mode, format, separator]);

  const output = result?.success ? result.data : '';
  const chars = result?.success && 'chars' in result ? result.chars : undefined;
  const error = result && !result.success ? result.error : '';

  const swapInputOutput = useCallback(() => {
    if (!output) return;
    setInput(output);
    setMode((prev) => (prev === 'text-to-ascii' ? 'ascii-to-text' : 'text-to-ascii'));
  }, [output]);

  const clearAll = useCallback(() => setInput(''), []);

  const loadSample = useCallback(() => {
    if (mode === 'text-to-ascii') {
      setInput('Hello, World! 🚀');
    } else {
      setInput('72 101 108 108 111 44 32 87 111 114 108 100 33');
    }
  }, [mode]);

  return (
    <div className="space-y-4">
      {/* Mode + Format */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={asciiModeOptions.map((o) => ({ value: o.value, label: o.label }))}
          value={mode}
          onChange={setMode}
        />
        <ModeToggle
          options={asciiFormatOptions.map((o) => ({ value: o.value, label: o.label }))}
          value={format}
          onChange={setFormat}
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">Separator:</label>
          <Input
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-16 text-center"
            placeholder=" "
          />
        </div>
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

      {/* Input / Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'text-to-ascii' ? 'Text Input' : 'ASCII Codes'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'text-to-ascii'
                ? 'Type or paste text here...'
                : 'Enter ASCII codes separated by spaces...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[160px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'text-to-ascii' ? `ASCII Codes (${format})` : 'Decoded Text'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Result will appear here..."
            className="min-h-[160px]"
          />
        </div>
      </div>

      {/* Character Table */}
      {mode === 'text-to-ascii' && chars && chars.length > 0 && chars.length <= 200 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Character Table</h3>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Char
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Decimal
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Hex
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Binary
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Octal
                  </th>
                </tr>
              </thead>
              <tbody>
                {chars.map((c, i) => (
                  <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="px-3 py-1.5 font-mono font-medium text-zinc-900 dark:text-zinc-100">
                      {c.char === ' '
                        ? '␣'
                        : c.char === '\n'
                          ? '↵'
                          : c.char === '\t'
                            ? '⇥'
                            : c.char}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-zinc-700 dark:text-zinc-300">
                      {c.decimal}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-zinc-700 dark:text-zinc-300">
                      {c.hex}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-zinc-700 dark:text-zinc-300">
                      {c.binary}
                    </td>
                    <td className="px-3 py-1.5 font-mono text-zinc-700 dark:text-zinc-300">
                      {c.octal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function TextToAsciiTool() {
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
        toolUI={<TextToAsciiUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
