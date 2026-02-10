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
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { envToJson, jsonToEnv } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

type ConversionMode = 'env-to-json' | 'json-to-env';

function EnvToJsonUI() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ConversionMode>('env-to-json');

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return mode === 'env-to-json' ? envToJson(input) : jsonToEnv(input);
  }, [mode, input]);

  const output = result?.success ? result.data : '';
  const error = result && !result.success ? result.error : '';

  const swapInputOutput = useCallback(() => {
    if (!output) return;
    setInput(output);
    setMode((prev) => (prev === 'env-to-json' ? 'json-to-env' : 'env-to-json'));
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'env-to-json') {
      setInput(`# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_PASSWORD="s3cret#pass"

# Application settings
export NODE_ENV=production
API_URL=https://api.example.com
SECRET_KEY='my-secret-key'
DEBUG=false`);
    } else {
      setInput(`{
  "DB_HOST": "localhost",
  "DB_PORT": "5432",
  "DB_NAME": "myapp",
  "DB_PASSWORD": "s3cret#pass",
  "NODE_ENV": "production",
  "API_URL": "https://api.example.com",
  "SECRET_KEY": "my-secret-key",
  "DEBUG": "false"
}`);
    }
  }, [mode]);

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <ModeToggle
        options={[
          { value: 'env-to-json', label: '.env → JSON' },
          { value: 'json-to-env', label: 'JSON → .env' },
        ]}
        value={mode}
        onChange={setMode}
      />

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
              {mode === 'env-to-json' ? '.env Input' : 'JSON Input'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'env-to-json'
                ? 'Paste your .env content here...\nKEY=value\nDB_HOST=localhost'
                : 'Paste your JSON object here...\n{\n  "KEY": "value"\n}'
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
              {mode === 'env-to-json' ? 'JSON Output' : '.env Output'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder={
              mode === 'env-to-json'
                ? 'JSON output will appear here...'
                : '.env output will appear here...'
            }
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function EnvToJsonTool() {
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
        toolUI={<EnvToJsonUI />}
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
