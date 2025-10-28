import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import NotificationPanel from '../NotificationPanel';

const Header = () => {
  const [userSettings, setUserSettings] = useState(null);

  useEffect(() => {
    // Load user settings
    const loadSettings = () => {
      const stored = localStorage.getItem('userSettings');
      if (stored) {
        setUserSettings(JSON.parse(stored));
      }
    };

    loadSettings();

    // Listen for settings changes
    window.addEventListener('userSettingsUpdated', loadSettings);
    return () => window.removeEventListener('userSettingsUpdated', loadSettings);
  }, []);


  const getUserInitials = () => {
    if (userSettings?.profile?.name) {
      return userSettings.profile.name.split(' ').map(n => n[0]).join('');
    }
    return 'JD';
  };


  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-4">
            <div className="relative">
              <NotificationPanel />
            </div>

            <ThemeToggle />

            <div className="flex items-center space-x-3">
              {userSettings?.profile?.avatar ? (
                <img
                  src={userSettings.profile.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {getUserInitials()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
