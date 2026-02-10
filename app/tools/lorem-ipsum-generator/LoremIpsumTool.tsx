'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, Select, ReadOnlyTextarea, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateLoremIpsum, loremUnitOptions } from '@/lib/tools';
import type { LoremUnit } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function LoremIpsumUI() {
  const [output, setOutput] = useState(() =>
    generateLoremIpsum({ count: 3, unit: 'paragraphs', startWithLorem: true })
  );
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<LoremUnit>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);

  const handleGenerate = useCallback(() => {
    setOutput(generateLoremIpsum({ count, unit, startWithLorem }));
  }, [count, unit, startWithLorem]);

  const countOptions = (() => {
    switch (unit) {
      case 'paragraphs':
        return [1, 2, 3, 5, 7, 10];
      case 'sentences':
        return [1, 3, 5, 10, 15, 20];
      case 'words':
        return [5, 10, 25, 50, 100, 200, 500];
      default:
        return [1, 3, 5, 10];
    }
  })();

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={handleGenerate}>Generate</Button>

        <div className="flex items-center gap-2">
          <label htmlFor="unit" className="text-sm text-zinc-600 dark:text-zinc-400">
            Unit:
          </label>
          <Select
            id="unit"
            value={unit}
            onChange={(e) => {
              const newUnit = e.target.value as LoremUnit;
              setUnit(newUnit);
              // Reset count to a sensible default for the new unit
              if (newUnit === 'paragraphs') setCount(3);
              else if (newUnit === 'sentences') setCount(5);
              else setCount(50);
            }}
            options={loremUnitOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="count" className="text-sm text-zinc-600 dark:text-zinc-400">
            Count:
          </label>
          <Select
            id="count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            options={countOptions.map((n) => ({ value: n, label: String(n) }))}
          />
        </div>

        <Checkbox
          label={'Start with "Lorem ipsum..."'}
          checked={startWithLorem}
          onChange={(e) => setStartWithLorem(e.target.checked)}
        />

        <CopyButton text={output} label="Copy All" className="ml-auto" />
      </div>

      {/* Output */}
      <ReadOnlyTextarea
        value={output}
        placeholder="Click Generate to create placeholder text..."
        className="min-h-[350px]"
      />
    </div>
  );
}

export function LoremIpsumTool() {
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
        toolUI={<LoremIpsumUI />}
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
