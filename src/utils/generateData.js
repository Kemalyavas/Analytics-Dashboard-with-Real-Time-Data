// Generate fake data for charts and KPIs
export const generateLineChartData = (days = 30) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.floor(Math.random() * 5000) + 15000,
      users: Math.floor(Math.random() * 500) + 1000,
    });
  }

  return data;
};

export const generateBarChartData = () => {
  const categories = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];

  return categories.map(category => ({
    name: category,
    sales: Math.floor(Math.random() * 8000) + 2000,
    profit: Math.floor(Math.random() * 3000) + 1000,
  }));
};

export const generatePieChartData = () => {
  return [
    { name: 'Desktop', value: 4500, color: '#3b82f6' },
    { name: 'Mobile', value: 3200, color: '#8b5cf6' },
    { name: 'Tablet', value: 1800, color: '#ec4899' },
    { name: 'Other', value: 500, color: '#f59e0b' },
  ];
};

export const getKPIData = () => {
  return {
    revenue: {
      value: 45231,
      change: 12.5,
      label: 'Total Revenue',
      prefix: '$',
    },
    users: {
      value: 8549,
      change: 8.2,
      label: 'Active Users',
      prefix: '',
    },
    conversions: {
      value: 1423,
      change: -3.4,
      label: 'Conversions',
      prefix: '',
    },
    growth: {
      value: 23.8,
      change: 5.1,
      label: 'Growth Rate',
      prefix: '',
      suffix: '%',
    },
  };
};

// Animate number changes
export const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();

  const updateValue = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOutQuad = progress * (2 - progress);
    const current = start + (end - start) * easeOutQuad;

    callback(Math.floor(current));

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  };

  requestAnimationFrame(updateValue);
};
