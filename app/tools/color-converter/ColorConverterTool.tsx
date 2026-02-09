'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, ErrorMessage } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseColor } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function ColorConverterUI() {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return parseColor(input);
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput('#3b82f6');
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
      </div>

      {/* Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Enter Color</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#ff6600, rgb(255, 102, 0), or hsl(24, 100%, 50%)"
            className="h-12 flex-1 rounded-lg border border-zinc-300 bg-white px-4 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          {/* Color preview swatch */}
          <div
            className="h-12 w-12 shrink-0 rounded-lg border border-zinc-300 dark:border-zinc-700"
            style={{
              backgroundColor: result?.success ? result.data.hex : 'transparent',
            }}
            title={result?.success ? result.data.hexString : 'No color'}
          />
        </div>
        {result && !result.success && <ErrorMessage message={result.error} />}
      </div>

      {/* Converted formats */}
      {result?.success && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Converted Formats
          </h3>

          {/* Large color preview */}
          <div
            className="h-24 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
            style={{ backgroundColor: result.data.hex }}
          />

          {/* Format cards */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  HEX
                </span>
                <CopyButton text={result.data.hexString} size="sm" />
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {result.data.hexString}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  RGB
                </span>
                <CopyButton text={result.data.rgbString} size="sm" />
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {result.data.rgbString}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                  HSL
                </span>
                <CopyButton text={result.data.hslString} size="sm" />
              </div>
              <p className="mt-1 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {result.data.hslString}
              </p>
            </div>
          </div>

          {/* Individual values */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {[
              { label: 'R', value: result.data.rgb.r },
              { label: 'G', value: result.data.rgb.g },
              { label: 'B', value: result.data.rgb.b },
              { label: 'H', value: `${result.data.hsl.h}°` },
              { label: 'S', value: `${result.data.hsl.s}%` },
              { label: 'L', value: `${result.data.hsl.l}%` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border border-zinc-200 bg-white p-2 text-center dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
                <span className="block font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ColorConverterTool() {
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
        toolUI={<ColorConverterUI />}
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
