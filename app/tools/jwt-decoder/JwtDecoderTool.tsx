'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { decodeJwt } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function JwtDecoderUI() {
  const [token, setToken] = useState('');

  const result = useMemo(() => {
    if (!token.trim()) return null;
    return decodeJwt(token);
  }, [token]);

  const clearAll = useCallback(() => {
    setToken('');
  }, []);

  const loadSample = useCallback(() => {
    // Sample JWT with typical claims
    setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MzU2ODk2MDB9.demo-signature-not-real'
    );
  }, []);

  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return date.toLocaleString();
  };

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

      {/* Token input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">JWT Token</label>
          <CopyButton text={token} size="sm" disabled={!token} />
        </div>
        <Textarea
          placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIs...)..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          error={result && !result.success ? result.error : undefined}
          className="min-h-[100px] font-mono text-sm"
        />
      </div>

      {/* Decoded output */}
      {result?.success && (
        <div className="space-y-4">
          {/* Status banner */}
          <div
            className={`flex items-center justify-between rounded-lg border p-3 ${
              result.data.isExpired
                ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                : 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-lg ${result.data.isExpired ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
              >
                {result.data.isExpired ? '⚠️' : '✓'}
              </span>
              <span
                className={`font-medium ${result.data.isExpired ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}
              >
                {result.data.isExpired ? 'Token Expired' : 'Token Valid (not expired)'}
              </span>
            </div>
            {result.data.expiresAt && (
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {result.data.isExpired ? 'Expired' : 'Expires'}: {formatDate(result.data.expiresAt)}
              </span>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Header
                <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-normal text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  ALGORITHM & TOKEN TYPE
                </span>
              </label>
              <CopyButton text={JSON.stringify(result.data.header, null, 2)} size="sm" />
            </div>
            <pre className="overflow-auto rounded-lg border border-zinc-300 bg-zinc-50 p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
              {JSON.stringify(result.data.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Payload
                <span className="ml-2 rounded bg-purple-100 px-1.5 py-0.5 text-xs font-normal text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  DATA
                </span>
              </label>
              <CopyButton text={JSON.stringify(result.data.payload, null, 2)} size="sm" />
            </div>
            <pre className="overflow-auto rounded-lg border border-zinc-300 bg-zinc-50 p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
              {JSON.stringify(result.data.payload, null, 2)}
            </pre>
          </div>

          {/* Timestamps */}
          {(result.data.issuedAt || result.data.expiresAt) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {result.data.issuedAt && (
                <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
                  <p className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                    Issued At (iat)
                  </p>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
                    {formatDate(result.data.issuedAt)}
                  </p>
                </div>
              )}
              {result.data.expiresAt && (
                <div className="rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
                  <p className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
                    Expires At (exp)
                  </p>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
                    {formatDate(result.data.expiresAt)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Signature */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Signature
                <span className="ml-2 rounded bg-orange-100 px-1.5 py-0.5 text-xs font-normal text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                  NOT VERIFIED
                </span>
              </label>
              <CopyButton text={result.data.signature} size="sm" />
            </div>
            <div className="overflow-auto rounded-lg border border-zinc-300 bg-zinc-50 p-3 font-mono text-sm break-all dark:border-zinc-700 dark:bg-zinc-800">
              {result.data.signature}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Signature verification requires the secret key and should only be done server-side.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function JwtDecoderTool() {
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
        toolUI={<JwtDecoderUI />}
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
