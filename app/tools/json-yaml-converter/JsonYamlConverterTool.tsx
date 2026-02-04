'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  Textarea,
  CopyButton,
  SwapButton,
  ModeToggle,
  ReadOnlyTextarea,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { jsonToYaml, yamlToJson } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

type ConversionMode = 'json-to-yaml' | 'yaml-to-json';

function JsonYamlConverterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ConversionMode>('json-to-yaml');

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter some data to convert');
      setOutput('');
      return;
    }

    const result = mode === 'json-to-yaml' ? jsonToYaml(input) : yamlToJson(input);

    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'json-to-yaml') {
      setInput(`{
  "server": {
    "host": "localhost",
    "port": 8080,
    "ssl": true
  },
  "database": {
    "name": "myapp",
    "user": "admin",
    "maxConnections": 10
  },
  "features": ["auth", "logging", "cache"]
}`);
    } else {
      setInput(`server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  user: admin
  maxConnections: 10
features:
  - auth
  - logging
  - cache`);
    }
    setError('');
    setOutput('');
  }, [mode]);

  const swapMode = useCallback(() => {
    setMode((prev) => (prev === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml'));
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={[
            { value: 'json-to-yaml', label: 'JSON → YAML' },
            { value: 'yaml-to-json', label: 'YAML → JSON' },
          ]}
          value={mode}
          onChange={setMode}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleConvert}>Convert</Button>
        <SwapButton onClick={swapMode} disabled={!output} />
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
              {mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'json-to-yaml'
                ? 'Paste your JSON data here...\n{\n  "key": "value"\n}'
                : 'Paste your YAML data here...\nkey: value'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[280px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder={
              mode === 'json-to-yaml'
                ? 'YAML output will appear here...'
                : 'JSON output will appear here...'
            }
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function JsonYamlConverterTool() {
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
        toolUI={<JsonYamlConverterUI />}
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
