'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, Select, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateUUIDs, formatUUID } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function UuidUI() {
  const [uuids, setUuids] = useState<string[]>(() => generateUUIDs(1));
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const handleGenerate = useCallback(() => {
    setUuids(generateUUIDs(count));
  }, [count]);

  const formattedUuids = uuids.map((uuid) => formatUUID(uuid, { uppercase, noDashes }));
  const allUuidsText = formattedUuids.join('\n');

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
            options={[1, 5, 10, 25, 50, 100].map((n) => ({ value: n, label: String(n) }))}
          />
        </div>

        <Checkbox
          label="Uppercase"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
        />

        <Checkbox
          label="No dashes"
          checked={noDashes}
          onChange={(e) => setNoDashes(e.target.checked)}
        />

        {uuids.length > 1 && (
          <CopyButton text={allUuidsText} label="Copy All" className="ml-auto" />
        )}
      </div>

      {/* UUID List */}
      <div className="space-y-2">
        {formattedUuids.map((uuid, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <code className="flex-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">
              {uuid}
            </code>
            <CopyButton text={uuid} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function UuidTool() {
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
        toolUI={<UuidUI />}
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
