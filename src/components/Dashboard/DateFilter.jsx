import { Calendar } from 'lucide-react';

const DateFilter = ({ selectedRange, onRangeChange }) => {
  const ranges = [
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 30 Days', value: 30 },
    { label: 'Last 90 Days', value: 90 },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(Number(e.target.value))}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all cursor-pointer"
      >
        {ranges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;
