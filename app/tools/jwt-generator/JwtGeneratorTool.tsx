'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  Textarea,
  Input,
  Select,
  CopyButton,
  ReadOnlyTextarea,
  InfoBox,
  ErrorMessage,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { generateJwt, getDefaultPayload, jwtAlgorithms } from '@/lib/tools';
import type { JwtAlgorithm } from '@/lib/tools/jwt-generator';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JwtGeneratorUI() {
  const [payload, setPayload] = useState('');
  const [secret, setSecret] = useState('my-secret-key');
  const [algorithm, setAlgorithm] = useState<JwtAlgorithm>('HS256');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setError('');
    const result = await generateJwt(payload, secret, algorithm);
    if (result.success) {
      setOutput(result.data);
    } else {
      setError(result.error);
      setOutput('');
    }
    setIsGenerating(false);
  }, [payload, secret, algorithm]);

  const loadSample = useCallback(() => {
    setPayload(getDefaultPayload());
    setError('');
    setOutput('');
  }, []);

  const clearAll = useCallback(() => {
    setPayload('');
    setSecret('my-secret-key');
    setAlgorithm('HS256');
    setOutput('');
    setError('');
  }, []);

  return (
    <div className="space-y-4">
      {/* Warning */}
      <InfoBox>For testing only. Never use real secrets in client-side tools.</InfoBox>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Algorithm + Secret row */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Algorithm</label>
          <Select
            options={jwtAlgorithms}
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as JwtAlgorithm)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Secret Key</label>
          <Input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter secret key..."
          />
        </div>
      </div>

      {/* Payload textarea */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Payload (JSON)
          </label>
          <CopyButton text={payload} size="sm" disabled={!payload} />
        </div>
        <Textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder='{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}'
          className="min-h-[180px] font-mono"
        />
      </div>

      {/* Generate button */}
      <Button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate JWT'}
      </Button>

      {/* Error */}
      <ErrorMessage message={error} />

      {/* Output */}
      {output && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Generated JWT
            </label>
            <CopyButton text={output} size="sm" />
          </div>
          <ReadOnlyTextarea value={output} className="min-h-[100px]" />
        </div>
      )}
    </div>
  );
}

export function JwtGeneratorTool() {
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
        toolUI={<JwtGeneratorUI />}
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
