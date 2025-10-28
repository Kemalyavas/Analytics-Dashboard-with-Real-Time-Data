# AI Coding Agent Instructions for Analytics Dashboard

## Project Architecture Overview

This is a **React 19 + Vite analytics dashboard** with real-time data visualization, featuring a responsive dark/light theme system and modular component architecture.

### Core Stack & Dependencies

- **Frontend**: React 19, React Router DOM v7, Vite 7
- **Styling**: TailwindCSS v3 with `class`-based dark mode
- **Charts**: Recharts v3 for all data visualizations
- **Icons**: Lucide React for consistent iconography
- **PDF Export**: jsPDF + jsPDF-autotable for report generation
- **Data**: CSV parsing via PapaParse, localStorage for persistence

## Key Architectural Patterns

### 1. Layout & Navigation Structure

- **Single Layout Wrapper**: `src/components/Layout/Layout.jsx` contains `<Sidebar>` + `<Header>` + main content
- **Sidebar Navigation**: Fixed 6-page structure (Dashboard, Analytics, Customers, Sales, Reports, Settings)
- **Route Structure**: All pages mounted in `src/App.jsx` with React Router, wrapped by `<Layout>`

### 2. Theme System Implementation

- **Context-Based**: `src/context/ThemeContext.jsx` provides `isDark` state and `toggleTheme()`
- **CSS Classes**: Uses TailwindCSS `dark:` variants, toggled via `document.documentElement.classList`
- **Theme Pattern**: Always include both light/dark variants: `bg-white dark:bg-gray-800`

### 3. Data Architecture

- **Mock Data Generators**: `src/utils/generateData.js` creates randomized chart data with consistent shapes
- **LocalStorage Pattern**: `src/utils/customerData.js` shows save/load/CRUD pattern for persistent data
- **State Management**: Component-level useState for data, no global state management

### 4. Component Structure Conventions

- **Dashboard Cards**: KPI cards follow `<Icon> + <Value> + <Change%> + <Label>` pattern
- **Chart Components**: All in `src/components/Dashboard/` - LineChart, BarChart, PieChart cards
- **Modal Pattern**: Reusable modals (CustomerModal, InvoiceModal) with form state management
- **Color System**: Predefined gradient classes: `blue`, `purple`, `pink`, `green` for consistent theming

## Development Workflow

### Essential Commands

```bash
npm run dev    # Start development server (Vite HMR on port 5173)
npm run build  # Production build
npm run lint   # ESLint check
```

### File Organization Rules

- **Pages**: Main route components in `src/pages/` (e.g., `DashboardPage.jsx`)
- **Reusable Components**: `src/components/` with nested folders by feature
- **Utils**: Pure functions in `src/utils/` for data generation and CRUD operations
- **Context**: React contexts in `src/context/` (currently only ThemeContext)

### Styling Conventions

- **Responsive Design**: Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` pattern for responsive grids
- **Dark Mode**: Every component must include dark mode variants using `dark:` prefix
- **Gradients**: Use predefined gradient combinations like `from-blue-500 to-blue-600`
- **Shadows**: Standard pattern: `shadow-lg hover:shadow-xl transition-shadow duration-300`

## Code Patterns & Examples

### Data Generation Pattern

```javascript
// Always return consistent data shapes for charts
export const generateLineChartData = (days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    date: formatDate(i),
    revenue: randomValue(),
    users: randomValue(),
  }));
};
```

### Modal Component Pattern

```jsx
// Standard modal with form state + CRUD operations
const [isModalOpen, setIsModalOpen] = useState(false);
const [editingItem, setEditingItem] = useState(null);

const handleSave = (data) => {
  editingItem ? updateItem(data) : addItem(data);
  setIsModalOpen(false);
};
```

### Chart Card Wrapper Pattern

```jsx
// Consistent card structure for all dashboard components
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Chart Title
  </h3>
  <ResponsiveContainer width="100%" height={300}>
    {/* Recharts component */}
  </ResponsiveContainer>
</div>
```

## Integration Points

### Chart Library (Recharts)

- All charts wrapped in `<ResponsiveContainer>` with `width="100%" height={300}`
- Use consistent color palettes: Tailwind's blue-500, purple-500, and pink-500
- Tooltip styling follows dark mode conventions

### LocalStorage Integration

- Customer data persisted to localStorage with save/load helper functions
- Always include error handling for localStorage operations
- Pattern: `loadItems() → useState() → saveItems()` on CRUD operations

### Router Integration

- Use `useLocation()` hook in Sidebar for active link highlighting
- All navigation via React Router `<Link>` components, not `<a>` tags
- Route paths are simple: `/`, `/analytics`, `/customers`, `/sales`, `/reports`, `/settings`

## Common Gotchas & Best Practices

- **React 19**: Uses new `createRoot` API, ensure imports from `react-dom/client`
- **Vite Config**: Minimal configuration, uses `@vitejs/plugin-react` for Fast Refresh
- **ESLint**: Uses flat config (`eslint.config.js`), includes React hooks plugin
- **Dark Mode**: Always test both themes, use `useTheme()` hook for conditional logic
- **Responsive**: Mobile-first approach, sidebar hidden on `md:` breakpoint and below
- **Data Updates**: Use functional setState updates for array/object state modifications
