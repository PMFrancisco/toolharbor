'use client';

import { Button, type ButtonProps } from './Button';

export interface SwapButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  label?: string;
}

export function SwapButton({ label = 'Swap Input/Output', ...props }: SwapButtonProps) {
  return (
    <Button variant="secondary" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1.5"
      >
        <path d="M7 16V4m0 0L3 8m4-4l4 4" />
        <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
      {label}
    </Button>
  );
}
