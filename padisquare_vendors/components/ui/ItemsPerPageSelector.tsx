'use client';

interface ItemsPerPageSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
}

export default function ItemsPerPageSelector({ 
  value, 
  onChange,
  options = [6, 12, 24, 48]
}: ItemsPerPageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label 
        htmlFor="items-per-page" 
        className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
      >
        Show:
      </label>
      <select
        id="items-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-2 py-1 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
