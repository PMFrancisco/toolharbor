'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { validateJsonSchema, getDefaultSchema, getDefaultSchemaData } from '@/lib/tools';
import type { SchemaValidationResult } from '@/lib/tools/json-schema';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JsonSchemaValidatorUI() {
  const [schema, setSchema] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState<SchemaValidationResult | null>(null);

  const handleValidate = useCallback(() => {
    setResult(validateJsonSchema(schema, data));
  }, [schema, data]);

  const loadSample = useCallback(() => {
    setSchema(getDefaultSchema());
    setData(getDefaultSchemaData());
    setResult(null);
  }, []);

  const clearAll = useCallback(() => {
    setSchema('');
    setData('');
    setResult(null);
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

      {/* Two input panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              JSON Schema
            </label>
            <CopyButton text={schema} size="sm" disabled={!schema} />
          </div>
          <Textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            placeholder='{\n  "type": "object",\n  "properties": { ... },\n  "required": [ ... ]\n}'
            className="min-h-[250px] font-mono"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              JSON Data
            </label>
            <CopyButton text={data} size="sm" disabled={!data} />
          </div>
          <Textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder='{\n  "name": "Jane Doe",\n  "email": "jane@example.com"\n}'
            className="min-h-[250px] font-mono"
          />
        </div>
      </div>

      {/* Validate button */}
      <Button onClick={handleValidate}>Validate</Button>

      {/* Results */}
      {result && (
        <div className="space-y-3">
          {result.success ? (
            result.data.valid ? (
              <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/40">
                <p className="font-medium text-green-800 dark:text-green-300">
                  ✓ Valid — JSON matches the schema
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/40">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    ✗ Invalid — {result.data.errors.length} error
                    {result.data.errors.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="space-y-2">
                  {result.data.errors.map((err, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                    >
                      <span className="font-mono text-xs text-red-600 dark:text-red-400">
                        {err.path}
                      </span>
                      <p className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
                        {err.message}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/40">
              <p className="font-medium text-red-800 dark:text-red-300">{result.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function JsonSchemaValidatorTool() {
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
        toolUI={<JsonSchemaValidatorUI />}
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
