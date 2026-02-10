'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, ErrorMessage } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { convertBase } from '@/lib/tools';
import type { BaseType } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

const fields: { key: BaseType; label: string; placeholder: string; prefix: string }[] = [
  { key: 'decimal', label: 'Decimal', placeholder: '255', prefix: 'Base 10' },
  { key: 'binary', label: 'Binary', placeholder: '11111111', prefix: 'Base 2' },
  { key: 'hexadecimal', label: 'Hexadecimal', placeholder: 'FF', prefix: 'Base 16' },
  { key: 'octal', label: 'Octal', placeholder: '377', prefix: 'Base 8' },
];

function NumberBaseConverterUI() {
  const [values, setValues] = useState({ binary: '', octal: '', decimal: '', hexadecimal: '' });
  const [activeField, setActiveField] = useState<BaseType | null>(null);
  const [error, setError] = useState('');

  const handleChange = useCallback((value: string, fromBase: BaseType) => {
    setActiveField(fromBase);

    if (!value.trim()) {
      setValues({ binary: '', octal: '', decimal: '', hexadecimal: '' });
      setError('');
      return;
    }

    const result = convertBase(value, fromBase);

    if (result.success) {
      setValues({ ...result.data, [fromBase]: value });
      setError('');
    } else {
      setValues((prev) => ({ ...prev, [fromBase]: value }));
      setError(result.error);
    }
  }, []);

  const clearAll = useCallback(() => {
    setValues({ binary: '', octal: '', decimal: '', hexadecimal: '' });
    setActiveField(null);
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    const result = convertBase('42', 'decimal');
    if (result.success) {
      setValues(result.data);
      setActiveField('decimal');
      setError('');
    }
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

      {error && <ErrorMessage message={error} />}

      {/* Base fields in 2x2 grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label, placeholder, prefix }) => (
          <div
            key={key}
            className={`rounded-lg border p-4 transition-colors ${
              activeField === key
                ? 'border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20'
                : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {label}
                </span>
                <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500">{prefix}</span>
              </div>
              <CopyButton text={values[key]} size="sm" disabled={!values[key]} />
            </div>
            <input
              type="text"
              value={values[key]}
              onChange={(e) => handleChange(e.target.value, key)}
              onFocus={() => setActiveField(key)}
              placeholder={placeholder}
              className="mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 font-mono text-lg text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NumberBaseConverterTool() {
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
        toolUI={<NumberBaseConverterUI />}
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
