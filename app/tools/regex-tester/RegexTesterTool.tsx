'use client';

import { useState, useCallback, useMemo } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ErrorMessage, Checkbox } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { testRegex } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function RegexTesterUI() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('');
  }, [flags]);

  const result = useMemo(() => {
    return testRegex(pattern, testString, flagString);
  }, [pattern, testString, flagString]);

  const highlightedText = useMemo(() => {
    if (!result.success || result.matches.length === 0 || !testString) {
      return testString;
    }

    const parts: Array<{ text: string; isMatch: boolean }> = [];
    let lastIndex = 0;

    result.matches.forEach((match) => {
      if (match.index > lastIndex) {
        parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false });
      }
      parts.push({ text: match.match, isMatch: true });
      lastIndex = match.index + match.length;
    });

    if (lastIndex < testString.length) {
      parts.push({ text: testString.slice(lastIndex), isMatch: false });
    }

    return parts;
  }, [result, testString]);

  const clearAll = useCallback(() => {
    setPattern('');
    setTestString('');
  }, []);

  const loadSample = useCallback(() => {
    setPattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
    setTestString(
      'Contact us at support@example.com for general inquiries.\nFor sales, email sales@company.org or call us.'
    );
  }, []);

  const handleFlagChange = useCallback((flag: keyof typeof flags, checked: boolean) => {
    setFlags((prev) => ({ ...prev, [flag]: checked }));
  }, []);

  return (
    <div className="space-y-4">
      {/* Pattern input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Regular Expression
          </label>
          <CopyButton text={pattern} size="sm" disabled={!pattern} />
        </div>
        <div className="flex gap-2">
          <span className="flex h-10 items-center rounded-l-lg border border-r-0 border-zinc-300 bg-zinc-100 px-3 font-mono text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            /
          </span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className="h-10 flex-1 rounded-none border border-zinc-300 bg-white px-3 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <span className="flex h-10 items-center rounded-r-lg border border-l-0 border-zinc-300 bg-zinc-100 px-3 font-mono text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            /{flagString}
          </span>
        </div>
        {!result.success && pattern && <ErrorMessage message={result.error} />}
      </div>

      {/* Flags */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Flags:</span>
        {Object.entries(flags).map(([flag, enabled]) => {
          const flagName =
            flag === 'g'
              ? 'global'
              : flag === 'i'
                ? 'ignoreCase'
                : flag === 'm'
                  ? 'multiline'
                  : 'dotAll';
          return (
            <Checkbox
              key={flag}
              label={`${flag} (${flagName})`}
              checked={enabled}
              onChange={(e) => handleFlagChange(flag as keyof typeof flags, e.target.checked)}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
        {result.success && result.matches.length > 0 && (
          <span className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
            {result.matches.length} match{result.matches.length !== 1 ? 'es' : ''} found
          </span>
        )}
      </div>

      {/* Test string with highlights */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Test String
          </label>
          <CopyButton text={testString} size="sm" disabled={!testString} />
        </div>
        <Textarea
          placeholder="Enter text to test against the pattern..."
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      {/* Highlighted results */}
      {testString && pattern && result.success && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Highlighted Matches
          </label>
          <div className="min-h-[120px] rounded-lg border border-zinc-300 bg-zinc-50 p-3 font-mono text-sm whitespace-pre-wrap dark:border-zinc-700 dark:bg-zinc-800">
            {Array.isArray(highlightedText)
              ? highlightedText.map((part, i) =>
                  part.isMatch ? (
                    <mark key={i} className="rounded bg-yellow-300 px-0.5 dark:bg-yellow-600">
                      {part.text}
                    </mark>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )
              : highlightedText}
          </div>
        </div>
      )}

      {/* Match details */}
      {result.success && result.matches.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Match Details
          </label>
          <div className="max-h-[200px] overflow-auto rounded-lg border border-zinc-300 dark:border-zinc-700">
            <table className="w-full text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">#</th>
                  <th className="px-3 py-2 text-left font-medium">Match</th>
                  <th className="px-3 py-2 text-left font-medium">Index</th>
                  <th className="px-3 py-2 text-left font-medium">Length</th>
                  {result.matches.some((m) => m.groups) && (
                    <th className="px-3 py-2 text-left font-medium">Groups</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {result.matches.map((match, i) => (
                  <tr key={i} className="bg-white dark:bg-zinc-900">
                    <td className="px-3 py-2 text-zinc-500">{i + 1}</td>
                    <td className="px-3 py-2 font-mono">{match.match}</td>
                    <td className="px-3 py-2">{match.index}</td>
                    <td className="px-3 py-2">{match.length}</td>
                    {result.matches.some((m) => m.groups) && (
                      <td className="px-3 py-2 font-mono text-xs">
                        {match.groups ? JSON.stringify(match.groups) : '-'}
                      </td>
                    )}
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

export function RegexTesterTool() {
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
        toolUI={<RegexTesterUI />}
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
