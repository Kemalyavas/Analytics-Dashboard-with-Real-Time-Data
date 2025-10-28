# Analytics Dashboard - Professional Business Intelligence Platform

A comprehensive, full-featured analytics dashboard built with React, Tailwind CSS, and Recharts. Features complete CRUD operations, real-time data visualization, notification system, and advanced reporting capabilities.

![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Key Features

### 📊 Dashboard

- 4 KPI Cards with animated values and trend indicators
- Interactive Charts (Line, Bar, Pie) with date range filtering
- Dark/Light Mode with persistent theme preference
- Real-time Data updates and smooth animations

### 👥 Customer Management

- Full CRUD Operations - Add, Edit, Delete customers
- Advanced Search & Filter - Search by name, email, company
- Status Management - Active, Inactive, Pending
- Pagination - 10 items per page with navigation
- Data Persistence - LocalStorage integration

### 💰 Sales & Invoices

- Invoice Management - Complete invoice listing with status tracking
- Detailed View - Full invoice modal with itemized billing
- Status Updates - Paid, Pending, Overdue, Cancelled
- Payment Tracking - Payment methods and due dates
- Statistics - Revenue breakdown by status

### 📈 Reports & Analytics

- Dynamic Report Types - Revenue, Sales, Customer reports
- Multiple Chart Views - Bar, Line, Pie chart options
- Date Range Selection - 7, 30, 90 days filtering
- CSV Export - Download data in CSV format
- PDF Export - Professional PDF reports with formatting
- Summary Statistics - Total, Average, and Period metrics

### ⚙️ Settings & Profile

- Profile Management - Name, email, company, bio
- Photo Upload - Avatar with image preview and removal
- Notification Preferences - Granular notification controls
- Theme Settings - Light/Dark mode with visual preview
- Language & Timezone - Localization preferences
- Security - Password change and account management

### 🔍 Global Search

- Keyboard Shortcut - Ctrl+K (Cmd+K on Mac)
- Instant Results - Search across customers and invoices
- Smart Filtering - Type-ahead search with highlighting
- Quick Navigation - Click results to navigate directly

### 🔔 Notification System

- Real-time Notifications - Bell icon with unread badge
- Multiple Types - Info, Success, Warning, Error
- Action Buttons - Mark as read, Delete individual
- Bulk Actions - Mark all as read
- Time Stamps - Relative time display (e.g., "2h ago")
- Persistence - Saved to LocalStorage

## 🚀 Tech Stack

- React 18 - Modern React with Hooks and Context API
- Vite - Fast build tool and dev server
- React Router DOM - Client-side routing
- Tailwind CSS - Utility-first CSS framework
- Recharts - Composable charting library
- Lucide React - Beautiful, customizable icons
- LocalStorage API - Client-side data persistence

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Kemalyavas/Analytics-Dashboard-with-Real-Time-Data.git
cd Analytics-Dashboard-with-Real-Time-Data

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the dist directory.

## 📂 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx              # Top navigation with search & notifications
│   │   ├── Sidebar.jsx             # Side navigation menu
│   │   └── Layout.jsx              # Main layout wrapper
│   ├── Dashboard/
│   │   ├── KPICard.jsx             # KPI metric cards
│   │   ├── LineChartCard.jsx       # Line chart component
│   │   ├── BarChartCard.jsx        # Bar chart component
│   │   ├── PieChartCard.jsx        # Pie chart component
│   │   └── DateFilter.jsx          # Date range selector
│   ├── CustomerModal.jsx           # Customer add/edit modal
│   ├── InvoiceModal.jsx            # Invoice detail modal
│   ├── SearchModal.jsx             # Global search modal
│   ├── NotificationPanel.jsx       # Notification dropdown
│   └── ThemeToggle.jsx             # Dark/light mode toggle
├── pages/
│   ├── DashboardPage.jsx           # Main dashboard
│   ├── CustomersPage.jsx           # Customer management
│   ├── SalesPage.jsx               # Sales & invoices
│   ├── ReportsPage.jsx             # Reports & analytics
│   ├── SettingsPage.jsx            # Settings & preferences
│   └── AnalyticsPage.jsx           # Advanced analytics (placeholder)
├── context/
│   ├── ThemeContext.jsx            # Theme state management
│   └── SearchContext.jsx           # Search state management
├── utils/
│   ├── generateData.js             # Dashboard data generator
│   ├── customerData.js             # Customer CRUD utilities
│   ├── salesData.js                # Sales/Invoice utilities
│   └── notificationData.js         # Notification utilities
├── App.jsx                         # Main app with routing
└── main.jsx                        # App entry point
```

## 📊 Performance

- Optimized Bundle - production build
- Fast Loading - Vite's optimized pipeline
- Smooth Animations - Hardware-accelerated CSS
- Efficient Rendering - React optimization techniques
- LocalStorage Caching - Instant data loading

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Developer

Kemal Yavas

- GitHub: https://github.com/Kemalyavas

```

```
