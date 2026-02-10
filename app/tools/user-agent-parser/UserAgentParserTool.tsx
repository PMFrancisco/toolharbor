'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseUserAgent } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

// ─── Info card ───────────────────────────────────────────────────────────────

interface InfoCardProps {
  label: string;
  value: string;
  sublabel?: string;
}

function InfoCard({ label, value, sublabel }: InfoCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{value}</p>
      {sublabel && <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{sublabel}</p>}
    </div>
  );
}

// ─── Summary formatter ───────────────────────────────────────────────────────

function formatSummary(data: import('@/lib/tools/user-agent').UserAgentData): string {
  const lines = [
    `Browser:  ${data.browser.name}${data.browser.version ? ' ' + data.browser.version : ''}`,
    `Engine:   ${data.engine.name}${data.engine.version ? ' ' + data.engine.version : ''}`,
    `OS:       ${data.os.name}${data.os.version ? ' ' + data.os.version : ''}`,
    `Device:   ${data.device.type}`,
    `Bot:      ${data.isBot ? 'Yes' : 'No'}`,
  ];
  return lines.join('\n');
}

// ─── Sample UA for "Load Sample" ─────────────────────────────────────────────

const SAMPLE_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ─── Tool UI ─────────────────────────────────────────────────────────────────

function UserAgentParserUI() {
  const [input, setInput] = useState('');

  const result = useMemo(() => {
    if (!input.trim()) return null;
    return parseUserAgent(input);
  }, [input]);

  const summary = useMemo(() => {
    if (!result?.success) return '';
    return formatSummary(result.data);
  }, [result]);

  const detectBrowser = useCallback(() => {
    if (typeof window !== 'undefined') {
      setInput(navigator.userAgent);
    }
  }, []);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_UA);
  }, []);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={detectBrowser}>
          Detect My Browser
        </Button>
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
            User Agent String
          </label>
          <CopyButton text={input} size="sm" disabled={!input} />
        </div>
        <Textarea
          placeholder='Paste a user agent string here, or click "Detect My Browser"...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={result && !result.success ? result.error : undefined}
          className="min-h-[80px] font-mono text-sm"
        />
      </div>

      {/* Parsed result */}
      {result?.success && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Parsed Result</h3>
            <CopyButton text={summary} label="Copy Summary" size="sm" />
          </div>

          {/* Info cards grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              label="Browser"
              value={result.data.browser.name}
              sublabel={
                result.data.browser.version ? `Version ${result.data.browser.version}` : undefined
              }
            />
            <InfoCard
              label="Rendering Engine"
              value={result.data.engine.name}
              sublabel={
                result.data.engine.version ? `Version ${result.data.engine.version}` : undefined
              }
            />
            <InfoCard
              label="Operating System"
              value={result.data.os.name}
              sublabel={result.data.os.version ? `Version ${result.data.os.version}` : undefined}
            />
            <InfoCard label="Device Type" value={result.data.device.type} />
          </div>

          {/* Bot indicator */}
          {result.data.isBot && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950/30">
              <span className="text-lg">&#x1F916;</span>
              <span className="font-medium text-amber-800 dark:text-amber-300">
                This user agent belongs to a bot or crawler
              </span>
            </div>
          )}

          {!result.data.isBot && (
            <div className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
              <span className="text-lg text-green-600 dark:text-green-400">&#x2713;</span>
              <span className="font-medium text-green-800 dark:text-green-300">
                Regular browser &mdash; not a bot
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Exported wrapper ────────────────────────────────────────────────────────

export function UserAgentParserTool() {
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
        toolUI={<UserAgentParserUI />}
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
