export interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <span className="block text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="block text-lg font-semibold text-zinc-900 dark:text-zinc-100">{value}</span>
    </div>
  );
}
