import { X, Download, Printer } from 'lucide-react';

const InvoiceModal = ({ isOpen, onClose, invoice, onStatusChange }) => {
  if (!isOpen || !invoice) return null;

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
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Invoice {invoice.id}
            </h2>
            <div className="mt-2">
              {getStatusBadge(invoice.status)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert('Print functionality')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Print"
            >
              <Printer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={() => alert('Download functionality')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Customer
              </h3>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {invoice.customer}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Payment Method
              </h3>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {invoice.paymentMethod}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Invoice Date
              </h3>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {formatDate(invoice.date)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Due Date
              </h3>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {formatDate(invoice.dueDate)}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Items
            </h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Item
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-gray-900 dark:text-white">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">
                        
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-white">
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal:</span>
                <span></span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%):</span>
                <span></span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total:</span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Update Status
            </h3>
            <div className="flex space-x-2">
              {['paid', 'pending', 'overdue', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(invoice.id, status)}
                  className={`${
                    invoice.status === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  } px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity capitalize`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
