'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { analyzeText, formatStatsSummary } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <span className="block text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="block text-lg font-semibold text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  );
}

function WordCounterUI() {
  const [input, setInput] = useState('');

  const analysis = useMemo(() => analyzeText(input), [input]);
  const { stats, topKeywords } = analysis;

  const summary = useMemo(() => {
    if (!input.trim()) return '';
    return formatStatsSummary(analysis);
  }, [input, analysis]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(
      'Building a REST API with Node.js is easier than you think. In this guide, we cover routing, middleware, error handling, and deployment. By the end, you will have a production-ready API.\n\nNode.js provides a lightweight runtime for building fast, scalable server-side applications. Combined with Express, you can set up routes, parse request bodies, and handle errors in just a few lines of code.\n\nWhether you are building a small side project or a large-scale microservice, Node.js gives you the flexibility and performance you need.'
    );
  }, []);

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
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Text</label>
        <Textarea
          placeholder="Paste or type your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      {/* Stats Grid */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Statistics</h3>
          <CopyButton text={summary} label="Copy Summary" size="sm" disabled={!summary} />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Words" value={stats.words} />
          <StatCard label="Characters" value={stats.characters} />
          <StatCard label="Characters (no spaces)" value={stats.charactersNoSpaces} />
          <StatCard label="Sentences" value={stats.sentences} />
          <StatCard label="Paragraphs" value={stats.paragraphs} />
          <StatCard label="Lines" value={stats.lines} />
          <StatCard label="Reading Time" value={stats.readingTime} />
          <StatCard label="Speaking Time" value={stats.speakingTime} />
        </div>
      </div>

      {/* Top Keywords */}
      {topKeywords.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Top Keywords
          </h3>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <th className="px-3 py-2 text-left font-medium text-zinc-600 dark:text-zinc-400">
                    Word
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-zinc-600 dark:text-zinc-400">
                    Count
                  </th>
                  <th className="px-3 py-2 text-right font-medium text-zinc-600 dark:text-zinc-400">
                    Density
                  </th>
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((kw, i) => (
                  <tr
                    key={kw.word}
                    className={
                      i < topKeywords.length - 1
                        ? 'border-b border-zinc-100 dark:border-zinc-800/50'
                        : ''
                    }
                  >
                    <td className="px-3 py-2 font-mono text-zinc-900 dark:text-zinc-100">
                      {kw.word}
                    </td>
                    <td className="px-3 py-2 text-right text-zinc-700 dark:text-zinc-300">
                      {kw.count}
                    </td>
                    <td className="px-3 py-2 text-right text-zinc-500 dark:text-zinc-400">
                      {kw.density}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function WordCounterTool() {
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
        toolUI={<WordCounterUI />}
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
