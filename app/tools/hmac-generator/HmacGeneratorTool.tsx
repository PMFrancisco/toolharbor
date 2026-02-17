'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, Input } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateAllHmacs, hmacAlgorithms } from '@/lib/tools';
import type { HmacEntry } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function HmacGeneratorUI() {
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [hmacs, setHmacs] = useState<HmacEntry[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculateHmacs = useCallback(async (msg: string, key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!msg.trim() || !key) {
      setHmacs([]);
      setIsCalculating(false);
      return;
    }

    setIsCalculating(true);
    timeoutRef.current = setTimeout(async () => {
      const results = await generateAllHmacs(msg, key);
      setHmacs(results);
      setIsCalculating(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setMessage(val);
      calculateHmacs(val, secret);
    },
    [calculateHmacs, secret]
  );

  const handleSecretChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSecret(val);
      calculateHmacs(message, val);
    },
    [calculateHmacs, message]
  );

  const clearAll = useCallback(() => {
    setMessage('');
    setSecret('');
    setHmacs([]);
  }, []);

  const loadSample = useCallback(() => {
    const sampleMsg = 'Hello, World!';
    const sampleKey = 'my-secret-key';
    setMessage(sampleMsg);
    setSecret(sampleKey);
    calculateHmacs(sampleMsg, sampleKey);
  }, [calculateHmacs]);

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

      {/* Message input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
          <CopyButton text={message} size="sm" disabled={!message} />
        </div>
        <Textarea
          placeholder="Enter the message to authenticate..."
          value={message}
          onChange={handleMessageChange}
          className="min-h-[120px]"
        />
      </div>

      {/* Secret key input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Secret Key</label>
        <Input
          type="text"
          placeholder="Enter your secret key..."
          value={secret}
          onChange={handleSecretChange}
        />
      </div>

      {/* HMAC Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">HMAC Results</h3>
          {isCalculating && <span className="text-xs text-zinc-500">Calculating...</span>}
        </div>

        <div className="space-y-2">
          {hmacAlgorithms.map(({ value: algorithm, label, bits }) => {
            const entry = hmacs.find((h) => h.algorithm === algorithm);
            const hash = entry?.hash || '';

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
                      Enter message and secret key above
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

export function HmacGeneratorTool() {
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
        toolUI={<HmacGeneratorUI />}
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
