import { useState, useEffect } from 'react';
import { Search, Filter, Eye, DollarSign, TrendingUp, Clock, XCircle } from 'lucide-react';
import InvoiceModal from '../components/InvoiceModal';
import { loadSales, saveSales, updateSaleStatus } from '../utils/salesData';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load sales from localStorage
  useEffect(() => {
    const loadedSales = loadSales();
    setSales(loadedSales);
    setFilteredSales(loadedSales);
  }, []);

  // Filter and search
  useEffect(() => {
    let result = sales;

    // Search filter
    if (searchTerm) {
      result = result.filter(sale =>
        sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(sale => sale.status === statusFilter);
    }

    setFilteredSales(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sales]);

  // Calculate stats
  const stats = {
    total: sales.reduce((sum, sale) => sum + sale.total, 0),
    paid: sales.filter(s => s.status === 'paid').reduce((sum, sale) => sum + sale.total, 0),
    pending: sales.filter(s => s.status === 'pending').reduce((sum, sale) => sum + sale.total, 0),
    overdue: sales.filter(s => s.status === 'overdue').reduce((sum, sale) => sum + sale.total, 0),
  };

  // Pagination
  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSales = filteredSales.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = (invoiceId, newStatus) => {
    const updated = updateSaleStatus(sales, invoiceId, newStatus);
    setSales(updated);
    saveSales(updated);
    
    // Update selected invoice if it's open
    if (selectedInvoice && selectedInvoice.id === invoiceId) {
      setSelectedInvoice({ ...selectedInvoice, status: newStatus });
    }
  };

  const openInvoiceModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status) => {
    const styles = {
      paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };

    return (
      <span className={`${styles[status]} px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sales & Invoices
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and manage all your invoices
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Paid</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Overdue</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by invoice ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedSales.length} of {filteredSales.length} invoices
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {sale.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {formatDate(sale.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {formatDate(sale.dueDate)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(sale.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900 dark:text-white">
                    
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => openInvoiceModal(sale)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};

export default SalesPage;
