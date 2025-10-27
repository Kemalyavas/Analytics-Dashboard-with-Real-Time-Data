import { useState } from 'react';
import KPICard from '../components/Dashboard/KPICard';
import LineChartCard from '../components/Dashboard/LineChartCard';
import BarChartCard from '../components/Dashboard/BarChartCard';
import PieChartCard from '../components/Dashboard/PieChartCard';
import DateFilter from '../components/Dashboard/DateFilter';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import {
  generateLineChartData,
  generateBarChartData,
  generatePieChartData,
  getKPIData,
} from '../utils/generateData';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState(30);
  const [lineChartData, setLineChartData] = useState(() => generateLineChartData(dateRange));

  const kpiData = getKPIData();
  const barChartData = generateBarChartData();
  const pieChartData = generatePieChartData();

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setLineChartData(generateLineChartData(range));
  };

  return (
    <>
      {/* Header with Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <DateFilter selectedRange={dateRange} onRangeChange={handleDateRangeChange} />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          icon={DollarSign}
          label={kpiData.revenue.label}
          value={kpiData.revenue.value}
          change={kpiData.revenue.change}
          prefix={kpiData.revenue.prefix}
          color="blue"
        />
        <KPICard
          icon={Users}
          label={kpiData.users.label}
          value={kpiData.users.value}
          change={kpiData.users.change}
          color="purple"
        />
        <KPICard
          icon={ShoppingCart}
          label={kpiData.conversions.label}
          value={kpiData.conversions.value}
          change={kpiData.conversions.change}
          color="pink"
        />
        <KPICard
          icon={TrendingUp}
          label={kpiData.growth.label}
          value={kpiData.growth.value}
          change={kpiData.growth.change}
          suffix={kpiData.growth.suffix}
          color="green"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="lg:col-span-2">
          <LineChartCard data={lineChartData} title="Revenue & Users Trend" />
        </div>
        <BarChartCard data={barChartData} title="Product Performance" />
        <PieChartCard data={pieChartData} title="Traffic by Device" />
      </div>
    </>
  );
};

export default DashboardPage;
