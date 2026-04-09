'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Select, Checkbox, CopyButton, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import {
  generateConfigFiles,
  getDefaultOptions,
  FRAMEWORK_OPTIONS,
  LANGUAGE_OPTIONS,
  STYLING_OPTIONS,
  PACKAGE_MANAGER_OPTIONS,
  TEST_RUNNER_OPTIONS,
  CONVENTION_OPTIONS,
  CONFIG_PRESETS,
} from '@/lib/tools/agent-config';
import type { AgentConfigOptions } from '@/lib/tools/agent-config';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function AgentConfigGeneratorUI() {
  const [options, setOptions] = useState<AgentConfigOptions>(() => getDefaultOptions());
  const [activeTab, setActiveTab] = useState(0);

  const configFiles = useMemo(() => generateConfigFiles(options), [options]);

  const applyPreset = useCallback((preset: AgentConfigOptions) => {
    setOptions(preset);
    setActiveTab(0);
  }, []);

  const toggleConvention = useCallback((value: string) => {
    setOptions((prev) => ({
      ...prev,
      conventions: prev.conventions.includes(value)
        ? prev.conventions.filter((c) => c !== value)
        : [...prev.conventions, value],
    }));
  }, []);

  const allContent = useMemo(
    () => configFiles.map((f) => `--- ${f.filename} ---\n${f.content}`).join('\n\n'),
    [configFiles]
  );

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        {CONFIG_PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="secondary"
            size="sm"
            onClick={() => applyPreset(preset.options)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Stack selectors */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Framework</label>
          <Select
            value={options.framework}
            onChange={(e) => setOptions((prev) => ({ ...prev, framework: e.target.value }))}
            options={FRAMEWORK_OPTIONS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Language</label>
          <Select
            value={options.language}
            onChange={(e) => setOptions((prev) => ({ ...prev, language: e.target.value }))}
            options={LANGUAGE_OPTIONS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Styling</label>
          <Select
            value={options.styling}
            onChange={(e) => setOptions((prev) => ({ ...prev, styling: e.target.value }))}
            options={STYLING_OPTIONS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Package Manager
          </label>
          <Select
            value={options.packageManager}
            onChange={(e) => setOptions((prev) => ({ ...prev, packageManager: e.target.value }))}
            options={PACKAGE_MANAGER_OPTIONS}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Testing</label>
          <Select
            value={options.testRunner}
            onChange={(e) => setOptions((prev) => ({ ...prev, testRunner: e.target.value }))}
            options={TEST_RUNNER_OPTIONS}
          />
        </div>
      </div>

      {/* Conventions */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Conventions</h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {CONVENTION_OPTIONS.map((conv) => (
            <Checkbox
              key={conv.value}
              label={conv.label}
              checked={options.conventions.includes(conv.value)}
              onChange={() => toggleConvention(conv.value)}
            />
          ))}
        </div>
      </div>

      {/* Output tabs */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {configFiles.map((file, i) => (
              <button
                key={file.filename}
                onClick={() => setActiveTab(i)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === i
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                }`}
              >
                {file.label}
              </button>
            ))}
          </div>
          <CopyButton text={allContent} label="Copy All" size="sm" />
        </div>

        {/* Active file output */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800">
          <div className="mb-2 flex items-center justify-between">
            <code className="text-xs text-zinc-500 dark:text-zinc-400">
              {configFiles[activeTab].filename}
            </code>
            <CopyButton text={configFiles[activeTab].content} size="sm" />
          </div>
          <ReadOnlyTextarea
            value={configFiles[activeTab].content}
            className="min-h-[300px] border-0 bg-transparent p-0 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export function AgentConfigGeneratorTool() {
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
        slug={toolInfo.slug}
        toolUI={<AgentConfigGeneratorUI />}
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
