// Analytics Page - Advanced Analytics (fixed JSX and Tailwind classes)
import { useMemo, useState } from 'react';
import {
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const colorTokens = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
  },
};

const AnalyticsPage = () => {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('30days');

  // Helpers
  const getRangeConfig = (range) => {
    switch (range) {
      case '7days':
        return { points: 7, granularity: 'day' };
      case '30days':
        return { points: 30, granularity: 'day' };
      case '90days':
        return { points: 90, granularity: 'day' };
      case 'year':
        return { points: 12, granularity: 'month' };
      default:
        return { points: 30, granularity: 'day' };
    }
  };

  const withVariance = (value, rangePct = 0.12) => {
    const delta = (Math.random() * 2 - 1) * rangePct; // [-rangePct, +rangePct]
    return Math.max(0, Math.round(value * (1 + delta)));
  };

  // Data generators
  const revenueData = useMemo(() => {
    const cfg = getRangeConfig(timeRange);
    const data = [];

    if (cfg.granularity === 'month') {
      for (let i = cfg.points - 1; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const revenue = Math.floor(Math.random() * 80000) + 60000; // monthly
        const expenses = Math.floor(Math.random() * 50000) + 35000;
        data.push({
          date: d.toLocaleDateString('en-US', { month: 'short' }),
          revenue,
          expenses,
          profit: revenue - expenses,
        });
      }
    } else {
      for (let i = cfg.points - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const revenue = Math.floor(Math.random() * 20000) + 12000; // daily
        const expenses = Math.floor(Math.random() * 12000) + 7000;
        data.push({
          date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue,
          expenses,
          profit: revenue - expenses,
        });
      }
    }
    return data;
  }, [timeRange]);

  const conversionData = useMemo(() => {
    const cfg = getRangeConfig(timeRange);
    // Base visitors scale by range length
    const baseVisitors = cfg.granularity === 'month'
      ? 120000
      : cfg.points <= 7
        ? 2000
        : cfg.points <= 30
          ? 10000
          : 30000;

    const visitors = withVariance(baseVisitors, 0.08);
    const signUps = Math.round(visitors * 0.35);
    const active = Math.round(visitors * 0.21);
    const paid = Math.round(visitors * 0.085);
    const premium = Math.round(visitors * 0.034);

    return [
      { stage: 'Visitors', value: visitors, percentage: 100 },
      { stage: 'Sign Ups', value: signUps, percentage: Math.round((signUps / visitors) * 100) },
      { stage: 'Active Users', value: active, percentage: Math.round((active / visitors) * 100) },
      { stage: 'Paid Users', value: paid, percentage: Number(((paid / visitors) * 100).toFixed(1)) },
      { stage: 'Premium', value: premium, percentage: Number(((premium / visitors) * 100).toFixed(1)) },
    ];
  }, [timeRange]);

  // (Optional growth data removed; not used on this page)

  const performanceData = useMemo(() => {
    // Slightly vary by range to reflect different sample sizes
    const base = {
      Speed: 84,
      Quality: 90,
      Satisfaction: 87,
      Engagement: 80,
      Retention: 83,
    };
    const bump = timeRange === '7days' ? -2 : timeRange === '90days' ? 1 : timeRange === 'year' ? 2 : 0;
    return [
      { metric: 'Speed', value: base.Speed + bump },
      { metric: 'Quality', value: base.Quality + bump },
      { metric: 'Satisfaction', value: base.Satisfaction + bump },
      { metric: 'Engagement', value: base.Engagement + bump },
      { metric: 'Retention', value: base.Retention + bump },
    ];
  }, [timeRange]);

  const topProductsData = useMemo(() => {
    const cfg = getRangeConfig(timeRange);
    const scale = cfg.granularity === 'month' ? 4 : cfg.points / 30; // scale roughly with period length
    const mk = (name, baseSales, baseRevenue) => ({
      name,
      sales: Math.round(baseSales * scale),
      revenue: Math.round(baseRevenue * scale),
    });
    return [
      mk('Product A', 3000, 45000),
      mk('Product B', 2500, 38000),
      mk('Product C', 2100, 32000),
      mk('Product D', 1800, 27000),
      mk('Product E', 1500, 23000),
    ];
  }, [timeRange]);

  const metrics = useMemo(() => {
    // Derive KPIs from current data and compare with a synthetic previous period
    const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
    const visitors = conversionData[0]?.value || 0;
    const paidUsers = conversionData.find((s) => s.stage === 'Paid Users')?.value || 0;
    const orders = Math.max(1, Math.round(paidUsers * (1.1 + Math.random() * 0.6))); // 1.1x–1.7x orders per paid user
    const aov = totalRevenue / orders;
    const conversionRate = visitors ? (paidUsers / visitors) * 100 : 0;
    const ltv = paidUsers ? (totalRevenue / paidUsers) * (timeRange === 'year' ? 1.4 : 1.2) : 0;
    const churnRate = timeRange === '7days' ? 0.6 : timeRange === '90days' ? 1.8 : timeRange === 'year' ? 2.4 : 2.1;

    const previous = {
      conversionRate: (withVariance(conversionRate * 100, 0.08) / 100),
      aov: withVariance(aov, 0.08),
      ltv: withVariance(ltv, 0.08),
      churnRate: (withVariance(churnRate * 100, 0.08) / 100),
    };

    const pctChange = (curr, prev) => (prev > 0 ? ((curr - prev) / prev) * 100 : 0);

    return [
      {
        title: 'Conversion Rate',
        value: `${conversionRate.toFixed(1)}%`,
        change: Number(pctChange(conversionRate, previous.conversionRate).toFixed(1)),
        icon: TrendingUp,
        color: 'blue',
        description: 'Visitor to customer',
      },
      {
        title: 'Avg. Order Value',
        value: `$${Math.round(aov).toLocaleString()}`,
        change: Number(pctChange(aov, previous.aov).toFixed(1)),
        icon: DollarSign,
        color: 'green',
        description: 'Per transaction',
      },
      {
        title: 'Customer LTV',
        value: `$${Math.round(ltv).toLocaleString()}`,
        change: Number(pctChange(ltv, previous.ltv).toFixed(1)),
        icon: Users,
        color: 'purple',
        description: 'Lifetime value',
      },
      {
        title: 'Churn Rate',
        value: `${churnRate.toFixed(1)}%`,
        change: Number(pctChange(churnRate, previous.churnRate).toFixed(1)) * -1, // a düşüş iyi kabul edilir
        icon: Zap,
        color: 'red',
        description: 'Attrition over period',
      },
    ];
  }, [revenueData, conversionData, timeRange]);

  const MetricCard = ({ metric }) => {
    const Icon = metric.icon;
    const isPositive = metric.title === 'Churn Rate' ? metric.change < 0 : metric.change > 0;
    const colors = colorTokens[metric.color] || colorTokens.blue;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="text-sm font-semibold">{Math.abs(metric.change)}%</span>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{metric.description}</p>
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Advanced Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Deep insights into your business performance</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
        </div>

      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((m, idx) => (
          <MetricCard key={idx} metric={m} />
        ))}
      </div>

      {/* Main content: Chart + Right rail (Funnel) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        {/* Left: Revenue vs Expenses */}
        <div className="xl:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue vs Expenses & Profit</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="date" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#ffffff', border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`, borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Revenue" />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Expenses" />
                <Area type="monotone" dataKey="profit" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Conversion Funnel */}
        <div className="xl:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 xl:sticky xl:top-20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {conversionData.map((stage, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stage.stage}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {stage.value.toLocaleString()} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    >
                      {stage.percentage > 10 && `${stage.percentage}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke={isDark ? '#374151' : '#e5e7eb'} />
              <PolarAngleAxis dataKey="metric" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
              <PolarRadiusAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Radar name="Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Products
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis type="number" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
              <YAxis dataKey="name" type="category" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" radius={[0, 8, 8, 0]} name="Sales" />
              <Bar dataKey="revenue" fill="#10b981" radius={[0, 8, 8, 0]} name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
