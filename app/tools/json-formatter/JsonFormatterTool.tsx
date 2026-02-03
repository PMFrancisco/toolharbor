'use client';

import { useState, useCallback } from 'react';
import {
  ToolLayout,
  JsonLd,
  ToolFeatures,
  HowToUse,
  ToolExamples,
  ToolExplanation,
  ToolFAQ,
} from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { formatJson, minifyJson } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

export function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = useCallback(() => {
    const result = formatJson(input, indentSize);
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, indentSize]);

  const handleMinify = useCallback(() => {
    const result = minifyJson(input);
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    const sample = {
      name: 'ToolHarbor',
      version: '1.0.0',
      tools: ['JSON Formatter', 'Base64 Encoder', 'UUID Generator'],
      config: {
        theme: 'dark',
        autoFormat: true,
      },
    };
    setInput(JSON.stringify(sample));
    setError('');
  }, []);

  return (
    <ToolLayout
      title={toolInfo.name}
      description={toolInfo.description}
      relatedTools={relatedTools}
    >
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

      {/* Tool UI */}
      <section>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleFormat}>Format</Button>
            <Button variant="secondary" onClick={handleMinify}>
              Minify
            </Button>
            <Button variant="ghost" onClick={loadSample}>
              Load Sample
            </Button>
            <Button variant="ghost" onClick={clearAll}>
              Clear
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="indent" className="text-sm text-zinc-600 dark:text-zinc-400">
                Indent:
              </label>
              <select
                id="indent"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>Tab</option>
              </select>
            </div>
          </div>

          {/* Input/Output */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Textarea
              label="Input JSON"
              placeholder="Paste your JSON here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              error={error}
              className="min-h-[280px]"
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Output
                </label>
                {output && <CopyButton text={output} size="sm" />}
              </div>
              <textarea
                readOnly
                value={output}
                placeholder="Formatted JSON will appear here..."
                className="min-h-[280px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>
      </section>

      <ToolFeatures features={features} />
      <HowToUse steps={howToSteps} />
      <ToolExamples examples={examples} />
      <ToolExplanation title={explanation.title} content={explanation.content} />
      <ToolFAQ items={faqItems} />
    </ToolLayout>
  );
}
