'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, CopyButton, ReadOnlyTextarea, ModeToggle } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateRsaKeyPair, keySizeOptions } from '@/lib/tools';
import type { RsaKeySize } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function RsaKeyGeneratorUI() {
  const [keySize, setKeySize] = useState<RsaKeySize>(2048);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setError('');
    try {
      const result = await generateRsaKeyPair(keySize);
      if (result.success) {
        setPublicKey(result.data.publicKey);
        setPrivateKey(result.data.privateKey);
        setError('');
      } else {
        setError(result.error);
        setPublicKey('');
        setPrivateKey('');
      }
    } finally {
      setGenerating(false);
    }
  }, [keySize]);

  const downloadKey = useCallback((key: string, filename: string) => {
    const blob = new Blob([key], { type: 'application/x-pem-file' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const clearAll = useCallback(() => {
    setPublicKey('');
    setPrivateKey('');
    setError('');
  }, []);

  return (
    <div className="space-y-4">
      {/* Key size selection */}
      <ModeToggle
        options={keySizeOptions.map((o) => ({ value: String(o.value), label: o.label }))}
        value={String(keySize)}
        onChange={(val) => setKeySize(Number(val) as RsaKeySize)}
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generating...' : 'Generate Key Pair'}
        </Button>
        <Button variant="ghost" onClick={clearAll} disabled={!publicKey && !privateKey}>
          Clear
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Public Key
            </label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => downloadKey(publicKey, 'public_key.pem')}
                disabled={!publicKey}
                className="h-7 text-xs"
              >
                Download
              </Button>
              <CopyButton text={publicKey} size="sm" disabled={!publicKey} />
            </div>
          </div>
          <ReadOnlyTextarea
            value={publicKey}
            placeholder="Public key will appear here..."
            className="min-h-[280px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Private Key
            </label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => downloadKey(privateKey, 'private_key.pem')}
                disabled={!privateKey}
                className="h-7 text-xs"
              >
                Download
              </Button>
              <CopyButton text={privateKey} size="sm" disabled={!privateKey} />
            </div>
          </div>
          <ReadOnlyTextarea
            value={privateKey}
            placeholder="Private key will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>

      {publicKey && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
          <strong>Security note:</strong> These keys were generated in your browser and never
          transmitted. For production use, generate keys in a secure environment and store private
          keys safely.
        </div>
      )}
    </div>
  );
}

export function RsaKeyGeneratorTool() {
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
        toolUI={<RsaKeyGeneratorUI />}
        content={{ features, howToSteps, examples, explanation, faqItems }}
        relatedTools={relatedTools}
      />
    </>
  );
}
