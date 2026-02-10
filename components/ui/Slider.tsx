'use client';

import {
  forwardRef,
  useState,
  useCallback,
  type InputHTMLAttributes,
  type ChangeEvent,
} from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
  editable?: boolean;
  onValueChange?: (value: number) => void;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      showValue = true,
      editable = false,
      onValueChange,
      id,
      value,
      min,
      max,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId =
      id || (label ? `slider-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const numMin = min !== undefined ? Number(min) : 0;
    const numMax = max !== undefined ? Number(max) : 100;

    // Local state only used while the number input is focused
    const [isFocused, setIsFocused] = useState(false);
    const [draft, setDraft] = useState('');

    const clamp = useCallback(
      (v: number) => Math.min(numMax, Math.max(numMin, Math.round(v))),
      [numMin, numMax]
    );

    const handleRangeChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onValueChange?.(Number(e.target.value));
      },
      [onChange, onValueChange]
    );

    const handleNumberChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setDraft(raw);

        const num = parseInt(raw, 10);
        if (!isNaN(num)) {
          const clamped = clamp(num);
          const syntheticEvent = {
            ...e,
            target: { ...e.target, value: String(clamped) },
          } as ChangeEvent<HTMLInputElement>;
          onChange?.(syntheticEvent);
          onValueChange?.(clamped);
        }
      },
      [onChange, onValueChange, clamp]
    );

    const handleNumberFocus = useCallback(() => {
      setIsFocused(true);
      setDraft(String(value ?? ''));
    }, [value]);

    const handleNumberBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    // When focused, show the draft (allows typing intermediate values like "3" before "32").
    // When not focused, show the controlled value prop directly.
    const displayValue = isFocused ? draft : String(value ?? '');

    return (
      <div className="flex flex-col gap-1.5">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                {label}
              </label>
            )}
            {showValue &&
              (editable ? (
                <input
                  type="number"
                  value={displayValue}
                  min={min}
                  max={max}
                  onChange={handleNumberChange}
                  onFocus={handleNumberFocus}
                  onBlur={handleNumberBlur}
                  className={cn(
                    'w-16 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-right font-mono text-sm tabular-nums',
                    'focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-1 focus-visible:outline-none',
                    'dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:focus-visible:ring-zinc-300',
                    '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  )}
                />
              ) : (
                <span className="font-mono text-sm text-zinc-600 tabular-nums dark:text-zinc-400">
                  {value}
                </span>
              ))}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          id={inputId}
          value={value}
          min={min}
          max={max}
          onChange={handleRangeChange}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 [&::-webkit-slider-thumb]:dark:bg-zinc-100',
            '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-zinc-900 [&::-moz-range-thumb]:dark:bg-zinc-100',
            'focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-zinc-300',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {min !== undefined && max !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">{min}</span>
            <span className="text-xs text-zinc-500">{max}</span>
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';
