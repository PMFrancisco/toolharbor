'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { toonToJson, validateToon } from '@/lib/tools/toon-formatter';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function ToonFormatterUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [validationMsg, setValidationMsg] = useState('');

  const handleConvert = useCallback(() => {
    const result = toonToJson(input);
    if (result.success) {
      setOutput(result.data);
      setError('');
      setValidationMsg('');
    } else {
      setError(result.error);
      setOutput('');
      setValidationMsg('');
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    const result = validateToon(input);
    if (result.success) {
      setValidationMsg(result.data);
      setError('');
    } else {
      setError(result.error);
      setValidationMsg('');
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
    setValidationMsg('');
  }, []);

  const loadSample = useCallback(() => {
    const sample =
      '{name,age,city}[3]\nAlice\t30\tNew York\nBob\t25\tSan Francisco\nCharlie\t35\tChicago';
    setInput(sample);
    const result = toonToJson(sample);
    if (result.success) {
      setOutput(result.data);
      setError('');
      setValidationMsg('');
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleConvert}>Convert to JSON</Button>
        <Button variant="secondary" onClick={handleValidate}>
          Validate
        </Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Validation message */}
      {validationMsg && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/40">
          <p className="font-medium text-green-800 dark:text-green-300">✓ {validationMsg}</p>
        </div>
      )}

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              TOON Input
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={'Paste TOON data here...\n{name,age}[2]\nAlice\t30\nBob\t25'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[280px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              JSON Output
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Parsed JSON will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function ToonFormatterTool() {
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
        toolUI={<ToonFormatterUI />}
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
