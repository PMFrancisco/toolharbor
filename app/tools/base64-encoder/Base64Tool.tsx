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
import { encodeBase64, decodeBase64 } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleAction = useCallback(() => {
    const result = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);

    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [mode, input]);

  const swapInputOutput = useCallback(() => {
    setInput(output);
    setOutput('');
    setError('');
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
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
          {/* Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border border-zinc-300 p-1 dark:border-zinc-700">
              <button
                onClick={() => setMode('encode')}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'encode'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode('decode')}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'decode'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleAction}>
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </Button>
            <Button variant="secondary" onClick={swapInputOutput} disabled={!output}>
              Swap
            </Button>
            <Button variant="ghost" onClick={clearAll}>
              Clear
            </Button>
          </div>

          {/* Input/Output */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Textarea
              label={mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
              placeholder={
                mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              error={error}
              className="min-h-[200px]"
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                </label>
                {output && <CopyButton text={output} size="sm" />}
              </div>
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="min-h-[200px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
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
