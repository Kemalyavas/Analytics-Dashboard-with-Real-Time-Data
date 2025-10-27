import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { animateValue } from '../../utils/generateData';

const KPICard = ({ icon: Icon, label, value, change, prefix = '', suffix = '', color = 'blue' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const isPositive = change >= 0;

  useEffect(() => {
    animateValue(0, value, 1000, setDisplayValue);
  }, [value]);

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center space-x-1 text-sm font-semibold`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          {prefix}{displayValue.toLocaleString()}{suffix}
        </h3>
      </div>

      {/* Label */}
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
};

export default KPICard;
