import { useState } from 'react';
import { Calendar, Download, FileText, TrendingUp, Users, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

const ReportsPage = () => {
  const { isDark } = useTheme();
  const [reportType, setReportType] = useState('revenue');
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState('30');

  // Mock report data
  const generateReportData = () => {
    const days = parseInt(dateRange);
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: Math.floor(Math.random() * 15000) + 10000,
        sales: Math.floor(Math.random() * 50) + 20,
        customers: Math.floor(Math.random() * 30) + 10,
      });
    }
    
    return data;
  };

  const reportData = generateReportData();

  // Calculate summary stats
  const stats = {
    revenue: {
      total: reportData.reduce((sum, d) => sum + d.revenue, 0),
      avg: Math.floor(reportData.reduce((sum, d) => sum + d.revenue, 0) / reportData.length),
      change: 12.5,
    },
    sales: {
      total: reportData.reduce((sum, d) => sum + d.sales, 0),
      avg: Math.floor(reportData.reduce((sum, d) => sum + d.sales, 0) / reportData.length),
      change: 8.3,
    },
    customers: {
      total: reportData.reduce((sum, d) => sum + d.customers, 0),
      avg: Math.floor(reportData.reduce((sum, d) => sum + d.customers, 0) / reportData.length),
      change: 15.7,
    },
  };

  const reportTypes = [
    { id: 'revenue', label: 'Revenue Report', icon: DollarSign, color: 'blue' },
    { id: 'sales', label: 'Sales Report', icon: TrendingUp, color: 'green' },
    { id: 'customers', label: 'Customer Report', icon: Users, color: 'purple' },
  ];

  const chartTypes = [
    { id: 'bar', label: 'Bar Chart' },
    { id: 'line', label: 'Line Chart' },
    { id: 'pie', label: 'Pie Chart' },
  ];

  const dateRanges = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
  ];

  const handleExport = (format) => {
    const currentStats = stats[reportType];
    const reportTypeLabel = reportTypes.find(t => t.id === reportType)?.label || reportType;
    
    if (format === 'csv') {
      // CSV Export
      const csvData = [
        ['Date', reportTypeLabel, 'Notes'],
        ...reportData.map(item => [
          item.date,
          item[reportType],
          `${reportTypeLabel} data for ${item.date}`
        ]),
        [], // Empty row
        ['Summary Statistics'],
        ['Total', currentStats.total],
        ['Average', currentStats.avg],
        ['Change from last period', `+${currentStats.change}%`]
      ];
      
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${reportTypeLabel}_Report_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } else if (format === 'pdf') {
      // PDF Export
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text('Analytics Dashboard Report', 20, 20);
      
      doc.setFontSize(16);
      doc.text(reportTypeLabel, 20, 35);
      
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
      doc.text(`Date Range: Last ${dateRange} Days`, 20, 55);
      
      // Summary Statistics
      doc.setFontSize(14);
      doc.text('Summary Statistics', 20, 70);
      
      const summaryData = [
        ['Metric', 'Value'],
        ['Total', reportType === 'revenue' ? `$${currentStats.total.toLocaleString()}` : currentStats.total.toLocaleString()],
        ['Average per day', reportType === 'revenue' ? `$${currentStats.avg.toLocaleString()}` : currentStats.avg.toLocaleString()],
        ['Change from last period', `+${currentStats.change}%`]
      ];
      
      autoTable(doc, {
        head: [summaryData[0]],
        body: summaryData.slice(1),
        startY: 75,
        margin: { left: 20 },
        styles: { fontSize: 10 }
      });
      
      // Data Table
      doc.setFontSize(14);
      doc.text('Detailed Data', 20, 115);
      
      const tableData = reportData.map(item => [
        item.date,
        reportType === 'revenue' ? `$${item[reportType].toLocaleString()}` : item[reportType].toLocaleString()
      ]);
      
      autoTable(doc, {
        head: [['Date', reportTypeLabel]],
        body: tableData,
        startY: 120,
        margin: { left: 20 },
        styles: { fontSize: 9 }
      });
      
      // Save PDF
      doc.save(`${reportTypeLabel}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    }
  };

  const renderChart = () => {
    const colors = {
      revenue: '#3b82f6',
      sales: '#10b981',
      customers: '#8b5cf6',
    };

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="date" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey={reportType} fill={colors[reportType]} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="date" stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={reportType}
              stroke={colors[reportType]}
              strokeWidth={3}
              dot={{ fill: colors[reportType], r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'pie') {
      const pieData = reportData.slice(0, 5).map((d, i) => ({
        name: d.date,
        value: d[reportType],
        color: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][i],
      }));

      return (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  const currentStats = stats[reportType];

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate and export custom reports
          </p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          const isActive = reportType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              } border-2 rounded-xl p-4 hover:shadow-lg transition-all`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${
                  isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                } w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                } font-semibold`}>
                  {type.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {reportType === 'revenue' ? '$' : ''}{currentStats.total.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +{currentStats.change}% from last period
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {reportType === 'revenue' ? '$' : ''}{currentStats.avg.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Per day
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Period</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {dateRange} Days
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Selected range
          </p>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chart Type
            </label>
            <div className="flex space-x-2">
              {chartTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setChartType(type.id)}
                  className={`${
                    chartType === type.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } flex-1 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {reportTypes.find(t => t.id === reportType)?.label}
        </h3>
        {renderChart()}
      </div>
    </>
  );
};

export default ReportsPage;
