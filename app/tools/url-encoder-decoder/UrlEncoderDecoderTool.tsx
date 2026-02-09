'use client';

import { useState, useCallback } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import {
  Button,
  Textarea,
  CopyButton,
  SwapButton,
  ModeToggle,
  ReadOnlyTextarea,
  InfoBox,
  Select,
} from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { encodeUrl, decodeUrl, encodeFullUrl, decodeFullUrl } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

type Mode = 'encode' | 'decode';
type EncodeType = 'component' | 'full';

function UrlEncoderDecoderUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [encodeType, setEncodeType] = useState<EncodeType>('component');

  const handleConvert = useCallback(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }

    let result;
    if (mode === 'encode') {
      result = encodeType === 'component' ? encodeUrl(input) : encodeFullUrl(input);
    } else {
      result = encodeType === 'component' ? decodeUrl(input) : decodeFullUrl(input);
    }

    if (result.success) {
      setOutput(result.data);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  }, [input, mode, encodeType]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput('Hello World! Special chars: &foo=bar baz?query=test#hash');
    } else {
      setInput('Hello%20World!%20Special%20chars%3A%20%26foo%3Dbar%20baz%3Fquery%3Dtest%23hash');
    }
    setError('');
    setOutput('');
  }, [mode]);

  const swapInputOutput = useCallback(() => {
    setInput(output);
    setOutput('');
    setMode((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    setError('');
  }, [output]);

  // Auto-convert on input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newInput = e.target.value;
      setInput(newInput);

      if (!newInput) {
        setOutput('');
        setError('');
        return;
      }

      let result;
      if (mode === 'encode') {
        result = encodeType === 'component' ? encodeUrl(newInput) : encodeFullUrl(newInput);
      } else {
        result = encodeType === 'component' ? decodeUrl(newInput) : decodeFullUrl(newInput);
      }

      if (result.success) {
        setOutput(result.data);
        setError('');
      } else {
        setError(result.error);
        setOutput('');
      }
    },
    [mode, encodeType]
  );

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <div className="flex flex-wrap items-center gap-4">
        <ModeToggle
          options={[
            { value: 'encode', label: 'Encode' },
            { value: 'decode', label: 'Decode' },
          ]}
          value={mode}
          onChange={(newMode) => {
            setMode(newMode);
            setOutput('');
            setError('');
          }}
        />

        <div className="flex items-center gap-2">
          <label htmlFor="encodeType" className="text-sm text-zinc-600 dark:text-zinc-400">
            Type:
          </label>
          <Select
            id="encodeType"
            value={encodeType}
            onChange={(e) => {
              setEncodeType(e.target.value as EncodeType);
              setOutput('');
            }}
            options={[
              { value: 'component', label: 'Component (encodeURIComponent)' },
              { value: 'full', label: 'Full URL (encodeURI)' },
            ]}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleConvert}>{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
        <SwapButton onClick={swapInputOutput} disabled={!output} />
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
      </div>

      {/* Input/Output */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'encode' ? 'Text to Encode' : 'Text to Decode'}
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder={
              mode === 'encode'
                ? 'Enter text or URL to encode...'
                : 'Enter URL-encoded text to decode...'
            }
            value={input}
            onChange={handleInputChange}
            error={error}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
            </label>
            <CopyButton text={output} size="sm" disabled={!output} />
          </div>
          <ReadOnlyTextarea
            value={output}
            placeholder={
              mode === 'encode'
                ? 'Encoded result will appear here...'
                : 'Decoded result will appear here...'
            }
          />
        </div>
      </div>

      {/* Info box */}
      <InfoBox title="Tip">
        {encodeType === 'component'
          ? 'Component mode encodes all special characters including / ? # &. Use this for query string values.'
          : 'Full URL mode preserves URL structure (:, /, ?, #). Use this for complete URLs.'}
      </InfoBox>
    </div>
  );
}

export function UrlEncoderDecoderTool() {
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
        toolUI={<UrlEncoderDecoderUI />}
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
