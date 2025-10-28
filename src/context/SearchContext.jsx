import { createContext, useContext, useState } from 'react';
import { loadCustomers } from '../utils/customerData';
import { loadSales } from '../utils/salesData';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    customers: [],
    sales: [],
  });

  const performSearch = (query) => {
    setSearchQuery(query);

    if (!query || query.length < 2) {
      setSearchResults({ customers: [], sales: [] });
      return;
    }

    const customers = loadCustomers();
    const sales = loadSales();

    const lowerQuery = query.toLowerCase();

    // Search in customers
    const customerResults = customers.filter(customer =>
      customer.name.toLowerCase().includes(lowerQuery) ||
      customer.email.toLowerCase().includes(lowerQuery) ||
      customer.company.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);

    // Search in sales
    const salesResults = sales.filter(sale =>
      sale.id.toLowerCase().includes(lowerQuery) ||
      sale.customer.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);

    setSearchResults({
      customers: customerResults,
      sales: salesResults,
    });
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults({ customers: [], sales: [] });
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        searchQuery,
        searchResults,
        openSearch,
        closeSearch,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
