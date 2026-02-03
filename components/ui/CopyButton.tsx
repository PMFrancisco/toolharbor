'use client';

import { useState, useCallback } from 'react';
import { Button, type ButtonProps } from './Button';
import { copyToClipboard } from '@/lib/utils';

interface CopyButtonProps extends Omit<ButtonProps, 'children'> {
  text: string;
  label?: string;
  copiedLabel?: string;
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  variant = 'secondary',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <Button
      variant={variant}
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : `${label} to clipboard`}
      {...props}
    >
      {copied ? copiedLabel : label}
    </Button>
  );
}
