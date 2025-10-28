// Generate mock notifications
export const generateNotifications = () => {
  const types = ['info', 'success', 'warning', 'error'];
  const messages = [
    { type: 'success', title: 'New customer added', message: 'Sarah Johnson has been added to your customer list.' },
    { type: 'info', title: 'Invoice payment received', message: 'Payment of ,240 received for INV-1023.' },
    { type: 'warning', title: 'Invoice overdue', message: 'Invoice INV-1015 is 5 days overdue.' },
    { type: 'success', title: 'Report generated', message: 'Your monthly sales report is ready to download.' },
    { type: 'info', title: 'New order placed', message: 'Tech Corp placed a new order worth ,500.' },
    { type: 'warning', title: 'Low inventory alert', message: 'Product stock is running low for 3 items.' },
    { type: 'success', title: 'Customer updated', message: 'Profile updated for Michael Brown.' },
    { type: 'error', title: 'Payment failed', message: 'Payment attempt failed for INV-1018. Please retry.' },
  ];

  const notifications = [];
  const count = Math.floor(Math.random() * 8) + 5;

  for (let i = 0; i < count; i++) {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 48));

    notifications.push({
      id: i + 1,
      ...msg,
      timestamp: date.toISOString(),
      read: Math.random() > 0.6,
    });
  }

  return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const saveNotifications = (notifications) => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const loadNotifications = () => {
  const stored = localStorage.getItem('notifications');
  return stored ? JSON.parse(stored) : generateNotifications();
};

export const markAsRead = (notifications, id) => {
  return notifications.map(n => n.id === id ? { ...n, read: true } : n);
};

export const markAllAsRead = (notifications) => {
  return notifications.map(n => ({ ...n, read: true }));
};

export const deleteNotification = (notifications, id) => {
  return notifications.filter(n => n.id !== id);
};

export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};
