'use client';

import { useState, useMemo, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, Input, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import {
  parseTemplateVariables,
  fillTemplate,
  formatFilledSummary,
} from '@/lib/tools/prompt-template';
import type { TemplateVariable } from '@/lib/tools/prompt-template';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function PromptTemplateFormatterUI() {
  const [template, setTemplate] = useState('');
  const [values, setValues] = useState<Record<string, string>>({});

  const variables = useMemo(() => parseTemplateVariables(template), [template]);

  const templateVars: TemplateVariable[] = useMemo(
    () => variables.map((name) => ({ name, value: values[name] || '' })),
    [variables, values]
  );

  const { filled } = useMemo(() => fillTemplate(template, templateVars), [template, templateVars]);

  const summary = useMemo(() => {
    if (!template.trim()) return '';
    return formatFilledSummary(template, templateVars);
  }, [template, templateVars]);

  const filledCount = templateVars.filter((v) => v.value).length;

  const updateValue = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const clearAll = useCallback(() => {
    setTemplate('');
    setValues({});
  }, []);

  const loadSample = useCallback(() => {
    setTemplate(
      'You are a {{role}} specializing in {{domain}}. Your task is to {{task}}.\n\nContext: The user is working with {{language}} and needs help with {{topic}}.\n\nPlease respond in a {{tone}} tone and keep your answer under {{max_words}} words.'
    );
    setValues({
      role: 'senior developer',
      domain: 'backend systems',
      task: 'review code and suggest improvements',
      language: 'TypeScript',
      topic: 'error handling patterns',
      tone: 'concise and technical',
      max_words: '300',
    });
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

      {/* Template Input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Template
            {variables.length > 0 && (
              <span className="ml-2 text-xs font-normal text-zinc-500">
                {variables.length} variable{variables.length !== 1 ? 's' : ''} detected
              </span>
            )}
          </label>
          <CopyButton text={template} size="sm" disabled={!template} />
        </div>
        <Textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Write your prompt template using {{variable_name}} syntax..."
          className="min-h-[200px] font-mono"
        />
      </div>

      {/* Variable Inputs */}
      {variables.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Variables
            {filledCount > 0 && (
              <span className="ml-2 text-xs font-normal text-zinc-500">
                {filledCount}/{variables.length} filled
              </span>
            )}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {variables.map((name) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {`{{${name}}}`}
                </label>
                <Input
                  value={values[name] || ''}
                  onChange={(e) => updateValue(name, e.target.value)}
                  placeholder={`Value for ${name}...`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Final Prompt
          </label>
          <CopyButton text={filled} size="sm" disabled={!filled} />
        </div>
        <ReadOnlyTextarea
          value={template.trim() ? filled : ''}
          placeholder="Your filled prompt will appear here..."
          className="min-h-[200px]"
        />
      </div>
    </div>
  );
}

export function PromptTemplateFormatterTool() {
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
        toolUI={<PromptTemplateFormatterUI />}
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
