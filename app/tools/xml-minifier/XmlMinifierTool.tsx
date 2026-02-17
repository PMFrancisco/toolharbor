'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton, ReadOnlyTextarea } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { minifyXml, getByteSize } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function XmlMinifierUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleMinify = useCallback(() => {
    const result = minifyXml(input);
    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    setInput(`<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <product id="1">
    <name>Widget Pro</name>
    <description>A professional-grade widget</description>
    <price currency="USD">29.99</price>
    <category>Electronics</category>
    <stock>150</stock>
  </product>
  <product id="2">
    <name>Gadget Plus</name>
    <description>Enhanced gadget with premium features</description>
    <price currency="USD">49.99</price>
    <category>Electronics</category>
    <stock>75</stock>
  </product>
  <product id="3">
    <name>Tool Kit Basic</name>
    <description>Essential tools for everyday use</description>
    <price currency="USD">19.99</price>
    <category>Tools</category>
    <stock>200</stock>
  </product>
</catalog>`);
    setError('');
  }, []);

  const inputSize = input ? getByteSize(input) : 0;
  const outputSize = output ? getByteSize(output) : 0;
  const savings =
    inputSize > 0 && outputSize > 0 ? Math.round((1 - outputSize / inputSize) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleMinify}>Minify</Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>

        {output && (
          <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-400">
            {inputSize.toLocaleString()} → {outputSize.toLocaleString()} bytes
            <span className="ml-1 font-medium text-emerald-600 dark:text-emerald-400">
              ({savings}% smaller)
            </span>
          </span>
        )}
      </div>

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Input XML
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder="Paste your XML here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[280px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Minified Output
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder="Minified XML will appear here..."
            className="min-h-[280px]"
          />
        </div>
      </div>
    </div>
  );
}

export function XmlMinifierTool() {
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
        toolUI={<XmlMinifierUI />}
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
