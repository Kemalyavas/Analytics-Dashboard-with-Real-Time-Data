// Mock sales data
export const generateSales = () => {
  const products = ['Website Design', 'Mobile App', 'SEO Service', 'Consulting', 'Marketing Campaign', 'Cloud Hosting', 'Database Setup', 'API Integration'];
  const customers = ['Tech Corp', 'Global Inc', 'Innovate LLC', 'Digital Solutions', 'Smart Systems', 'Future Tech', 'Prime Industries', 'Elite Services'];
  const statuses = ['paid', 'pending', 'overdue', 'cancelled'];
  
  const sales = [];
  
  for (let i = 0; i < 80; i++) {
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const price = Math.floor(Math.random() * 5000) + 500;
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        name: products[Math.floor(Math.random() * products.length)],
        quantity,
        price,
        total: price * quantity
      });
      subtotal += price * quantity;
    }
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + 30);
    
    sales.push({
      id: `INV-${String(i + 1).padStart(4, '0')}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      items,
      subtotal,
      tax,
      total,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: date.toISOString(),
      dueDate: dueDate.toISOString(),
      paymentMethod: ['Credit Card', 'Bank Transfer', 'PayPal'][Math.floor(Math.random() * 3)],
    });
  }
  
  return sales.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const saveSales = (sales) => {
  localStorage.setItem('sales', JSON.stringify(sales));
};

export const loadSales = () => {
  const stored = localStorage.getItem('sales');
  return stored ? JSON.parse(stored) : generateSales();
};

export const updateSaleStatus = (sales, invoiceId, newStatus) => {
  return sales.map(sale => 
    sale.id === invoiceId ? { ...sale, status: newStatus } : sale
  );
};
