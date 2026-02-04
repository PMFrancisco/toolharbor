'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateAllHashes, hashAlgorithms, type HashAlgorithm } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

interface HashEntry {
  algorithm: HashAlgorithm;
  hash: string;
}

function HashGeneratorUI() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<HashEntry[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate hashes with debounce
  const calculateHashes = useCallback(async (text: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!text.trim()) {
      setHashes([]);
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);
    timeoutRef.current = setTimeout(async () => {
      const results = await generateAllHashes(text);
      setHashes(results);
      setIsCalculating(false);
    }, 100);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInput(newValue);
      calculateHashes(newValue);
    },
    [calculateHashes]
  );

  const clearAll = useCallback(() => {
    setInput('');
    setHashes([]);
  }, []);

  const loadSample = useCallback(() => {
    const sampleText = 'Hello, World!';
    setInput(sampleText);
    calculateHashes(sampleText);
  }, [calculateHashes]);

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

      {/* Input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Text to Hash
          </label>
          <CopyButton text={input} size="sm" disabled={!input} />
        </div>
        <Textarea
          placeholder="Enter text to generate hashes..."
          value={input}
          onChange={handleInputChange}
          className="min-h-[120px]"
        />
      </div>

      {/* Hash Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Generated Hashes</h3>
          {isCalculating && <span className="text-xs text-zinc-500">Calculating...</span>}
        </div>

        <div className="space-y-2">
          {hashAlgorithms.map(({ value: algorithm, label, bits }) => {
            const hashEntry = hashes.find((h) => h.algorithm === algorithm);
            const hash = hashEntry?.hash || '';

            return (
              <div
                key={algorithm}
                className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label} <span className="text-xs text-zinc-500">({bits} bits)</span>
                  </span>
                  <CopyButton text={hash} size="sm" disabled={!hash} />
                </div>
                <code className="block font-mono text-sm break-all text-zinc-600 dark:text-zinc-400">
                  {hash || (
                    <span className="text-zinc-400 dark:text-zinc-600">
                      Enter text above to generate hash
                    </span>
                  )}
                </code>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HashGeneratorTool() {
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
        toolUI={<HashGeneratorUI />}
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
