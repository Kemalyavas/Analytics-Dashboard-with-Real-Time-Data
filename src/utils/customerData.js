// Mock customer data
export const generateCustomers = () => {
  const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Emily', 'Robert', 'Maria', 'William', 'Jessica', 'Richard', 'Jennifer', 'Thomas'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
  const companies = ['Tech Corp', 'Global Inc', 'Innovate LLC', 'Digital Solutions', 'Smart Systems', 'Future Tech', 'Prime Industries', 'Elite Services', 'Apex Group', 'Summit Enterprises'];
  const statuses = ['active', 'inactive', 'pending'];

  const customers = [];
  
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    customers.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      company: companies[Math.floor(Math.random() * companies.length)],
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      status: status,
      totalSpent: Math.floor(Math.random() * 50000) + 1000,
      orders: Math.floor(Math.random() * 50) + 1,
      joinedDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    });
  }
  
  return customers;
};

// LocalStorage helpers
export const saveCustomers = (customers) => {
  localStorage.setItem('customers', JSON.stringify(customers));
};

export const loadCustomers = () => {
  const stored = localStorage.getItem('customers');
  return stored ? JSON.parse(stored) : generateCustomers();
};

export const deleteCustomer = (customers, id) => {
  return customers.filter(c => c.id !== id);
};

export const updateCustomer = (customers, updatedCustomer) => {
  return customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c);
};

export const addCustomer = (customers, newCustomer) => {
  const maxId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) : 0;
  return [...customers, { ...newCustomer, id: maxId + 1, joinedDate: new Date().toISOString() }];
};
