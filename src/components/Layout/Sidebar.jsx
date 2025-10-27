import { LayoutDashboard, BarChart3, Users, Settings, FileText, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: TrendingUp, label: 'Sales', path: '/sales' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Analytics</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
          <p className="text-sm font-semibold mb-1">Upgrade to Pro</p>
          <p className="text-xs opacity-90">Get unlimited access to all features</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
