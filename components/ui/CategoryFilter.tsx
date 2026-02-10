'use client';

export interface CategoryFilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface CategoryFilterProps {
  options: CategoryFilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  allLabel?: string;
  allCount?: number;
  className?: string;
}

const activeClass = 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900';
const inactiveClass =
  'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700';

export function CategoryFilter({
  options,
  value,
  onChange,
  allLabel = 'All',
  allCount,
  className = '',
}: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => onChange(null)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          value === null ? activeClass : inactiveClass
        }`}
      >
        {allLabel}
        {allCount !== undefined && ` (${allCount})`}
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            value === option.value ? activeClass : inactiveClass
          }`}
        >
          {option.label}
          {option.count !== undefined && ` (${option.count})`}
        </button>
      ))}
    </div>
  );
}
