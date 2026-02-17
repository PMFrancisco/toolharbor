'use client';

import { useState, useCallback, useRef } from 'react';
import { ToolLayout, JsonLd } from '@/components';
import { Button, Textarea, CopyButton } from '@/components/ui';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { parseBase64Image } from '@/lib/tools';
import type { ImageInfo } from '@/lib/tools';
import {
  toolInfo,
  relatedTools,
  features,
  howToSteps,
  examples,
  explanation,
  faqItems,
} from './content';

function Base64ImageViewerUI() {
  const [input, setInput] = useState('');
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [error, setError] = useState('');
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handlePreview = useCallback(() => {
    setDimensions(null);
    const result = parseBase64Image(input);
    if (result.success) {
      setImageInfo(result.data);
      setError('');
    } else {
      setError(result.error);
      setImageInfo(null);
    }
  }, [input]);

  const handleImageLoad = useCallback(() => {
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!imageInfo) return;
    const link = document.createElement('a');
    link.href = imageInfo.dataUrl;
    const ext = imageInfo.format.toLowerCase();
    link.download = `image.${ext === 'jpeg' ? 'jpg' : ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageInfo]);

  const clearAll = useCallback(() => {
    setInput('');
    setImageInfo(null);
    setError('');
    setDimensions(null);
  }, []);

  const loadSample = useCallback(() => {
    setInput(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InNreUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMGY3ZmE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2IyZWJmMjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIAogIDwhLS0gQmFja2dyb3VuZCBDaXJjbGUgLS0+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5MCIgZmlsbD0idXJsKCNza3lHcmFkaWVudCkiIHN0cm9rZT0iIzAwYmNkNCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CgogIDxzdHlsZT4KICAgIC5ib2F0LXRleHQgewogICAgICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlOwogICAgICBmb250LXNpemU6IDI4cHg7CiAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7CiAgICAgIGZpbGw6ICMwMDYwNjQ7CiAgICB9CiAgICAuZmxhZyB7IGZpbGw6ICNkMzJmMmY7IH0KICAgIC53YXZlcyB7IGZpbGw6ICMwMjc3YmQ7IGZvbnQtc2l6ZTogMjBweDt9CiAgPC9zdHlsZT4KCiAgPHRleHQgeD0iNTMlIiB5PSI0MyUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGNsYXNzPSJib2F0LXRleHQiPgogICAgPHRzcGFuIHg9IjU3JSIgZHk9Ii0wLjZlbSI+PHRzcGFuIGNsYXNzPSJmbGFnIj4gfCZndDs8L3RzcGFuPjwvdHNwYW4+CiAgICA8dHNwYW4geD0iNTMlIiBkeT0iMS4xZW0iPl9ffF9fPC90c3Bhbj4KICAgIDx0c3BhbiB4PSI1MyUiIGR5PSIxLjFlbSI+XF9fXy88L3RzcGFuPgogICAgPHRzcGFuIHg9IjQ5JSIgZHk9IjEuNGVtIiBjbGFzcz0id2F2ZXMiPn5+fn5+PC90c3Bhbj4KICA8L3RleHQ+Cjwvc3ZnPg=='
    );
    setError('');
    setImageInfo(null);
    setDimensions(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handlePreview}>Preview</Button>
        <Button variant="ghost" onClick={loadSample}>
          Load Sample
        </Button>
        <Button variant="ghost" onClick={clearAll}>
          Clear
        </Button>
        {imageInfo && (
          <>
            <Button variant="secondary" onClick={handleDownload}>
              Download
            </Button>
            <CopyButton text={imageInfo.dataUrl} label="Copy Data URL" />
          </>
        )}
      </div>

      {/* Input / Preview */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Base64 Input
            </label>
            <CopyButton text={input} size="sm" disabled={!input} />
          </div>
          <Textarea
            placeholder="Paste a base64 string or data URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error}
            className="min-h-[320px]"
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Image Preview
          </label>
          <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-zinc-200 bg-[repeating-conic-gradient(#e5e7eb_0%_25%,transparent_0%_50%)] bg-[length:20px_20px] dark:border-zinc-800 dark:bg-[repeating-conic-gradient(#27272a_0%_25%,transparent_0%_50%)]">
            {imageInfo ? (
              <img
                ref={imgRef}
                src={imageInfo.dataUrl}
                alt="Base64 decoded preview"
                onLoad={handleImageLoad}
                className="max-h-[400px] max-w-full object-contain"
              />
            ) : (
              <span className="text-sm text-zinc-400 dark:text-zinc-600">
                Image preview will appear here...
              </span>
            )}
          </div>

          {/* Image Info */}
          {imageInfo && (
            <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                Format:{' '}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {imageInfo.format}
                </span>
              </span>
              <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                Size:{' '}
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {imageInfo.sizeFormatted}
                </span>
              </span>
              {dimensions && (
                <span className="rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  Dimensions:{' '}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {dimensions.width} × {dimensions.height}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Base64ImageViewerTool() {
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
        toolUI={<Base64ImageViewerUI />}
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
