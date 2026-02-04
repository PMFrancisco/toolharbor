'use client';

import { CopyButton } from '@/components/ui';

interface Example {
  title?: string;
  input: string;
  output: string;
  /** If true, render output as HTML instead of plain text */
  renderHtml?: boolean;
}

interface ToolExamplesProps {
  examples: Example[];
}

export function ToolExamples({ examples }: ToolExamplesProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Examples</h2>
      <div className="space-y-4">
        {examples.map((example, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
          >
            {example.title && (
              <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-800/50">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {example.title}
                </span>
              </div>
            )}
            <div className="grid md:grid-cols-2">
              <div className="border-b border-zinc-200 p-4 md:border-r md:border-b-0 dark:border-zinc-800">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">Input</p>
                  <CopyButton text={example.input} size="sm" variant="ghost" />
                </div>
                <pre className="overflow-x-auto font-mono text-sm break-all whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                  {example.input}
                </pre>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                    {example.renderHtml ? 'Preview' : 'Output'}
                  </p>
                  <CopyButton text={example.output} size="sm" variant="ghost" />
                </div>
                {example.renderHtml ? (
                  <div
                    className="text-sm text-zinc-800 dark:text-zinc-200 [&_code]:font-mono [&_code]:text-xs [&_em]:italic [&_h1]:mb-2 [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-0.5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-zinc-800 [&_pre]:p-3 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: example.output }}
                  />
                ) : (
                  <pre className="overflow-x-auto font-mono text-sm break-all whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                    {example.output}
                  </pre>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
