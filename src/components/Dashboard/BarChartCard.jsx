import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const BarChartCard = ({ data, title }) => {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{payload[0].payload.name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: 
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
          <XAxis
            dataKey="name"
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Sales" />
          <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
