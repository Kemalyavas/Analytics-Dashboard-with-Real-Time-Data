import { useEffect } from 'react';
import { X, User, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const SearchModal = () => {
  const navigate = useNavigate();
  const { isSearchOpen, searchQuery, searchResults, closeSearch, performSearch } = useSearch();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const totalResults = searchResults.customers.length + searchResults.sales.length;

  const handleNavigate = (path) => {
    navigate(path);
    closeSearch();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[600px] flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers, invoices..."
              value={searchQuery}
              onChange={(e) => performSearch(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={closeSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {searchQuery.length < 2 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Type at least 2 characters to search...
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Customers */}
              {searchResults.customers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Customers ({searchResults.customers.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.customers.map((customer) => (
                      <button
                        key={customer.id}
                        onClick={() => handleNavigate('/customers')}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {customer.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sales/Invoices */}
              {searchResults.sales.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Invoices ({searchResults.sales.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.sales.map((sale) => (
                      <button
                        key={sale.id}
                        onClick={() => handleNavigate('/sales')}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {sale.id}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {sale.customer}  
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Press <kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
