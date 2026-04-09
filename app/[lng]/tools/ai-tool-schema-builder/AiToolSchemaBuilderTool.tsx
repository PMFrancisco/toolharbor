'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  CopyButton,
  Input,
  Select,
  Checkbox,
  ModeToggle,
  ReadOnlyTextarea,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateSchema, createParameter, PARAMETER_TYPES } from '@/lib/tools/ai-tool-schema';
import type { SchemaParameter, SchemaFormat } from '@/lib/tools/ai-tool-schema';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function AiToolSchemaBuilderUI() {
  const [format, setFormat] = useState<SchemaFormat>('openai');
  const [functionName, setFunctionName] = useState('');
  const [functionDescription, setFunctionDescription] = useState('');
  const [params, setParams] = useState<SchemaParameter[]>([createParameter()]);

  const output = useMemo(
    () => generateSchema(format, functionName, functionDescription, params),
    [format, functionName, functionDescription, params]
  );

  const updateParam = useCallback(
    (id: string, field: keyof SchemaParameter, value: string | boolean) => {
      setParams((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    },
    []
  );

  const addParam = useCallback(() => {
    setParams((prev) => [...prev, createParameter()]);
  }, []);

  const removeParam = useCallback((id: string) => {
    setParams((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return filtered.length === 0 ? [createParameter()] : filtered;
    });
  }, []);

  const clearAll = useCallback(() => {
    setFunctionName('');
    setFunctionDescription('');
    setParams([createParameter()]);
  }, []);

  const loadSample = useCallback(() => {
    setFunctionName('get_weather');
    setFunctionDescription('Get the current weather for a given location');
    setParams([
      createParameter('location', 'string', 'City and state, e.g. San Francisco, CA', true),
      createParameter('unit', 'string', 'Temperature unit: celsius or fahrenheit', false),
    ]);
  }, []);

  return (
    <div className="space-y-4">
      {/* Format toggle */}
      <ModeToggle
        options={[
          { value: 'openai', label: 'OpenAI' },
          { value: 'anthropic', label: 'Anthropic' },
        ]}
        value={format}
        onChange={setFormat}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Function details */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Function Name
          </label>
          <Input
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            placeholder="e.g. get_weather"
            className="font-mono"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Description
          </label>
          <Input
            value={functionDescription}
            onChange={(e) => setFunctionDescription(e.target.value)}
            placeholder="What does this function do?"
          />
        </div>
      </div>

      {/* Parameters */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Parameters
        </label>
        <div className="space-y-2">
          {params.map((param) => (
            <div key={param.id} className="flex flex-wrap items-center gap-2">
              <Input
                value={param.name}
                onChange={(e) => updateParam(param.id, 'name', e.target.value)}
                placeholder="Name"
                className="w-32 flex-shrink-0 font-mono"
              />
              <Select
                value={param.type}
                onChange={(e) => updateParam(param.id, 'type', e.target.value)}
                options={PARAMETER_TYPES}
                className="w-28 flex-shrink-0"
              />
              <Input
                value={param.description}
                onChange={(e) => updateParam(param.id, 'description', e.target.value)}
                placeholder="Description"
                className="min-w-0 flex-1"
              />
              <Checkbox
                label="Required"
                checked={param.required}
                onChange={(e) => updateParam(param.id, 'required', e.target.checked)}
              />
              <button
                onClick={() => removeParam(param.id)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-300 text-zinc-500 hover:border-red-300 hover:text-red-500 dark:border-zinc-700 dark:hover:border-red-700"
                aria-label="Remove parameter"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Button variant="ghost" onClick={addParam} className="mt-2">
          + Add Parameter
        </Button>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {format === 'openai' ? 'OpenAI Function Schema' : 'Anthropic Tool Schema'}
          </label>
          <CopyButton text={output} size="sm" />
        </div>
        <ReadOnlyTextarea value={output} className="min-h-[300px] font-mono text-sm" />
      </div>
    </div>
  );
}

export function AiToolSchemaBuilderTool() {
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
        slug={toolInfo.slug}
        toolUI={<AiToolSchemaBuilderUI />}
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
