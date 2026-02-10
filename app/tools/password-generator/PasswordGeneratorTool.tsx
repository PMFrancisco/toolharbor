'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, Select, Slider, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generatePassword, generatePasswords, getDefaultOptions } from '@/lib/tools';
import type { PasswordOptions, PasswordResult, PasswordStrength } from '@/lib/tools/password';
import { cn } from '@/lib/utils';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function strengthColorAndWidth(strength: PasswordStrength): string {
  switch (strength) {
    case 'very-weak':
      return 'w-1/5 bg-red-500';
    case 'weak':
      return 'w-2/5 bg-red-400';
    case 'fair':
      return 'w-3/5 bg-yellow-500';
    case 'strong':
      return 'w-4/5 bg-green-500';
    case 'very-strong':
      return 'w-full bg-green-400';
  }
}

function strengthTextColor(strength: PasswordStrength): string {
  switch (strength) {
    case 'very-weak':
    case 'weak':
      return 'text-red-600 dark:text-red-400';
    case 'fair':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'strong':
    case 'very-strong':
      return 'text-green-600 dark:text-green-400';
  }
}

function PasswordGeneratorUI() {
  const [options, setOptions] = useState<PasswordOptions>(() => getDefaultOptions());
  const [passwords, setPasswords] = useState<PasswordResult[]>(() => [
    generatePassword(getDefaultOptions()),
  ]);
  const [count, setCount] = useState(1);

  const handleGenerate = useCallback(() => {
    setPasswords(generatePasswords(options, count));
  }, [options, count]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={handleGenerate}>Generate</Button>

        <div className="flex items-center gap-2">
          <label htmlFor="count" className="text-sm text-zinc-600 dark:text-zinc-400">
            Count:
          </label>
          <Select
            id="count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            options={[1, 5, 10, 25].map((n) => ({ value: n, label: String(n) }))}
          />
        </div>
      </div>

      {/* Length Slider */}
      <Slider
        label="Password Length"
        value={options.length}
        min={4}
        max={128}
        editable
        onValueChange={(len) => setOptions((prev) => ({ ...prev, length: len }))}
      />

      {/* Character Options */}
      <div className="flex flex-wrap items-center gap-4">
        <Checkbox
          label="Uppercase (A-Z)"
          checked={options.uppercase}
          onChange={(e) => setOptions((prev) => ({ ...prev, uppercase: e.target.checked }))}
        />
        <Checkbox
          label="Lowercase (a-z)"
          checked={options.lowercase}
          onChange={(e) => setOptions((prev) => ({ ...prev, lowercase: e.target.checked }))}
        />
        <Checkbox
          label="Numbers (0-9)"
          checked={options.numbers}
          onChange={(e) => setOptions((prev) => ({ ...prev, numbers: e.target.checked }))}
        />
        <Checkbox
          label="Symbols (!@#$...)"
          checked={options.symbols}
          onChange={(e) => setOptions((prev) => ({ ...prev, symbols: e.target.checked }))}
        />
        <Checkbox
          label="Exclude Ambiguous"
          checked={options.excludeAmbiguous}
          onChange={(e) => setOptions((prev) => ({ ...prev, excludeAmbiguous: e.target.checked }))}
        />
      </div>

      {/* Strength indicator (once — same settings = same strength) */}
      {passwords.length > 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800">
          <div className="mb-1.5 flex items-center justify-between">
            <span
              className={cn(
                'text-sm font-medium capitalize',
                strengthTextColor(passwords[0].strength)
              )}
            >
              Strength: {passwords[0].strength.replace('-', ' ')}
            </span>
            <span className="text-xs text-zinc-500">
              {passwords[0].entropy.toFixed(0)} bits &middot; {passwords[0].crackTime}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className={cn(
                'h-2 rounded-full transition-all',
                strengthColorAndWidth(passwords[0].strength)
              )}
            />
          </div>
        </div>
      )}

      {/* Password List */}
      <div className="space-y-2">
        {passwords.length > 1 && (
          <div className="flex justify-end">
            <CopyButton text={passwords.map((p) => p.password).join('\n')} label="Copy All" />
          </div>
        )}
        {passwords.map((result, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <code className="flex-1 font-mono text-sm break-all text-zinc-900 dark:text-zinc-100">
              {result.password}
            </code>
            <CopyButton text={result.password} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PasswordGeneratorTool() {
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
        toolUI={<PasswordGeneratorUI />}
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
