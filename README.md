# Finance Dashboard

A modern, interactive personal finance dashboard built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Features role-based access control, transaction management, financial insights, data persistence, and a global dark mode.

## 🎯 Project Overview

This Finance Dashboard is a comprehensive financial management application that allows users to:
- **Track Financial Activity**: View incoming and outgoing transactions
- **Analyze Spending Patterns**: Visualize income/expense trends and category breakdowns
- **Manage Transactions**: Add, edit, delete transactions with full CRUD operations
- **Get Financial Insights**: View smart recommendations and monthly comparisons
- **Switch Roles**: Simulate Admin (full access) and Viewer (read-only) roles
- **Export Data**: Download transactions as CSV or JSON files
- **Toggle Dark Mode**: Switch between light and dark themes globally

---

## ✅ Requirements Checklist

### 1. Dashboard Overview ✓
- **Summary Cards**: Displays Total Balance, Total Income, and Total Expenses with gradient styling
- **Time-based Visualization**: Balance Trend Chart (Line chart showing balances over time)
- **Categorical Visualization**: Spending by Category (Pie chart) and Category Breakdown (List view)
- **All core metrics calculated** dynamically from transaction data

### 2. Transactions Section ✓
- **Transaction List**: Displays all transactions with:
  - Date
  - Description
  - Category
  - Type (Income/Expense)
  - Amount
  - Actions (Edit/Delete - Admin only)
- **Filtering Features**:
  - Search by description
  - Filter by type (All/Income/Expense)
  - Filter by category
  - Sort by date or amount
  - Sort direction (Ascending/Descending)
- **Admin CRUD Operations**: Add, edit, and delete transactions with confirmation dialogs

### 3. Role-Based UI ✓
- **Viewer Role**: Can only view data (no add/edit/delete buttons)
- **Admin Role**: Full access to create, read, update, and delete transactions
- **Role Selector**: Dropdown in header to switch between roles for demonstration
- **Persistent Role Selection**: Saves selected role to localStorage

### 4. Insights Section ✓
- **Highest Spending Category**: Shows the category with maximum spending
- **Monthly Comparison**: Income and expense trends across months
- **Smart Financial Tips**: Personalized recommendations based on data
- **Category Performance**: Summary table of spending by category
- **Monthly Trends**: Side-by-side tables showing income and expense patterns

### 5. State Management ✓
- **React Context API**: Global state for transactions, role, and dark mode
- **Transactions Data**: 40 mock transactions across 4 months (Jan-Apr 2026)
- **Filters**: Properly managed within component state
- **Selected Role**: Stored in context and localStorage for persistence
- **Dark Mode State**: Global toggle affecting entire application

### 6. UI and UX ✓
- **Clean & Readable Design**: Modern interface with clear visual hierarchy
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Empty State Handling**: "No transactions found" message when filters yield no results
- **Visual Feedback**: Hover effects, transitions, and button interactions
- **Accessibility**: Proper semantic HTML, readable colors, clear labeling

---

## 🎁 Optional Enhancements (Implemented)

✅ **Dark Mode** - Global toggle that affects entire application  
✅ **Data Persistence** - Transactions, role, and dark mode preference saved to localStorage  
✅ **Export Functionality** - Download data as CSV or JSON files  
✅ **Advanced Filtering** - Multi-level filtering by type, category, search, and sort  
✅ **Animations & Transitions** - Smooth hover effects and UI interactions  
✅ **Mock Data** - 40 realistic transactions with proper totals  

---

## 📊 Key Features

### Summary Cards
- **Total Balance**: Income minus Expenses (₹13,160)
- **Total Income**: All income transactions summed (₹24,800)
- **Total Expenses**: All expenses summed (₹11,640)
- Gradient backgrounds and responsive design

### Charts & Visualizations
- **Balance Trend Chart** (Line chart): Track balance over time
- **Income vs Expenses Chart** (Bar chart): Monthly comparison
- **Spending by Category** (Pie chart): Visual breakdown of expenses
- **Category List**: Detailed category-wise spending table

### Transaction Management
- View all 40 transactions with filtering and sorting
- Admin can add new transactions with form validation
- Edit existing transactions with confirmation
- Delete transactions with safety confirmation
- Real-time updates to charts and summaries

### Export Options
- **CSV Export**: Download all transactions as CSV file
- **JSON Export**: Download transactions in JSON format
- File naming includes current date for easy organization

### Dark Mode
- Toggle button in header
- Affects all components (cards, charts, tables, forms, etc.)
- Persists on page refresh using localStorage
- Uses color scheme: `bg-gray-900`, `text-white` for dark mode

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Root component with routing
│   ├── components/
│   │   ├── Header.tsx             # Navigation, date, export, dark mode toggle
│   │   ├── DashboardOverview.tsx  # (Legacy component)
│   │   ├── ExportButton.tsx       # CSV/JSON export functionality
│   │   ├── InsightsSection.tsx    # (Legacy component)
│   │   └── TransactionsList.tsx   # Transaction CRUD interface
│   ├── context/
│   │   └── FinanceContext.tsx     # Global state (transactions, role, darkMode)
│   ├── pages/
│   │   ├── DashboardPage.tsx      # Summary cards and charts
│   │   ├── TransactionsPage.tsx   # Transaction management
│   │   └── InsightsPage.tsx       # Financial insights and analysis
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces and types
│   └── utils/
│       ├── mockData.ts            # 40 sample transactions
│       └── helpers.ts             # Utility functions for calculations
├── index.css                      # Tailwind + global styles
└── main.tsx                       # React entry point
```

### Core Types
```typescript
interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  type: "income" | "expense";
  amount: number;
}

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

interface InsightData {
  highestCategory: { category: string; amount: number; percentage: number };
  monthlyIncomeChange: { amount: number; percentChange: number };
  monthlyExpenseChange: { amount: number; percentChange: number };
  monthlySavings: { amount: number; rate: number };
}
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
cd finance-dashboard
npm install
```

### Development Server
```bash
npm run dev
```
Opens on `http://localhost:5174/` with hot module reloading

### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

---

## 💻 Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 18.3.1** | UI framework with hooks |
| **TypeScript 5.4** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first styling |
| **Vite 8.0.1** | Lightning-fast builder |
| **React Router DOM** | Client-side routing |
| **Recharts 2.12.7** | Data visualization charts |
| **UUID 13.0.0** | Unique ID generation |
| **date-fns** | Date manipulation |

---

## 📊 Sample Data

The dashboard includes **40 transactions** spanning 4 months (January - April 2026):

### Transaction Summary
- **Total Income**: ₹24,800 (Salary, Freelance, Investment, Bonus)
- **Total Expenses**: ₹11,640 (Food, Transport, Shopping, Entertainment, Bills, Healthcare, Education)
- **Net Balance**: ₹13,160

### Categories
- **Income**: Salary, Freelance, Investment, Bonus
- **Expense**: Food, Transport, Shopping, Entertainment, Bills, Healthcare, Education, Other

---

## 🎮 How to Use

### Viewing Dashboard
1. **Dashboard Page**: See summary cards and all visualizations
2. **Charts**: Hover over charts for detailed tooltips
3. **Category Breakdown**: View spending by category

### Managing Transactions
1. Click **+ Add Transaction** button (Admin only)
2. Fill in details: Description, Category, Type, Amount
3. Click **Add** to save
4. To **Edit**: Click the ✏️ button on any transaction
5. To **Delete**: Click 🗑️ button (requires confirmation)

### Filtering & Searching
1. Use **Search** box to find transactions by description
2. Select **Type** filter (All/Income/Expense)
3. Select **Category** filter
4. Choose **Sort** criteria (Date/Amount)
5. Click **⬆️ Asc** or **⬇️ Desc** to change direction
6. Click **Reset** to clear all filters

### Switching Roles
1. Click **Admin** dropdown in bottom-left corner
2. Select **Admin** (full access) or **Viewer** (read-only)
3. UI updates to show/hide admin controls

### Exporting Data
1. Click **📥 Export Data** button in header
2. Choose **CSV** or **JSON** format
3. File downloads with current date in filename

### Dark Mode
1. Click **🌙 Dark Mode** toggle in header
2. Entire app switches to dark theme
3. Preference persists on refresh

---

## 🎨 Design Decisions

### Component Architecture
- **Page-based structure**: Dashboard, Transactions, and Insights as separate pages
- **Reusable components**: Header, TransactionsList, Export functionality
- **Separation of concerns**: Logic in utils, UI in components, state in context

### State Management
- **React Context API**: Chosen for simplicity without Redux complexity
- **Single source of truth**: All shared state in `FinanceContext`
- **localStorage**: Persists transactions, role, and theme preference

### Styling
- **Tailwind CSS**: Utility-first for rapid development
- **Dark mode**: Conditional classes based on context state
- **Responsive**: Mobile-first design with breakpoints for tablet/desktop

### Data Updates
- **Real-time calculations**: Charts and summaries update as transactions change
- **Optimistic updates**: Immediate UI feedback on user actions
- **Confirmation dialogs**: Safety checks for destructive actions (delete)

---

## 📈 Performance & Best Practices

✅ **TypeScript**: Full type safety across application  
✅ **Error Handling**: Validation and confirmation for user actions  
✅ **Responsive Design**: Mobile, tablet, desktop support  
✅ **Code Splitting**: React Router enables lazy loading  
✅ **Memoization**: Components optimized to prevent unnecessary re-renders  
✅ **Accessibility**: Semantic HTML, keyboard navigation, descriptive labels  

---

## 🧪 Testing Scenarios

### Test Case 1: Add Transaction (Admin)
1. Log in as Admin
2. Click "+ Add Transaction"
3. Fill form with: "Coffee", Food, Expense, ₹150
4. Submit and verify it appears in list and updates totals

### Test Case 2: Filter Transactions
1. Search for "Salary"
2. Filter by "Income" type
3. Verify only income transactions appear
4. Reset and confirm all transactions return

### Test Case 3: Dark Mode Toggle
1. Click dark mode button
2. Verify all pages switch colors
3. Refresh page and confirm preference persists
4. Switch roles and confirm dark mode still active

### Test Case 4: Export Data
1. Click "Export Data" button
2. Choose CSV format
3. Verify file downloads with all transactions
4. Compare with JSON export

### Test Case 5: Viewer vs Admin
1. Switch to Viewer role
2. Verify no "+ Add Transaction" button
3. Verify no edit/delete buttons on transactions
4. Switch to Admin and confirm buttons reappear

---

## 📌 Key Calculations & Formulas

```
Total Income = Sum of all transactions where type === "income"
Total Expenses = Sum of all transactions where type === "expense"
Total Balance = Total Income - Total Expenses

Monthly Data:
- Income: Sum of income transactions in that month
- Expense: Sum of expense transactions in that month
- Balance: Income - Expense for that month

Category Spending = Sum of all expenses in that category

Highest Spending Category = Category with maximum expense amount

Savings Rate = (Total Income - Total Expenses) / Total Income * 100

Income Change = ((Current Month Income - Previous Month Income) / Previous Month Income) * 100
Expense Change = ((Current Month Expense - Previous Month Expense) / Previous Month Expense) * 100
```

---

## 🎯 Meeting Assignment Requirements

### Requirement Met ✓
- ✅ Dashboard Overview with summary cards and visualizations
- ✅ Transactions section with filtering, sorting, and search
- ✅ Role-based UI (Admin/Viewer simulation)
- ✅ Insights section with analysis and recommendations
- ✅ Proper state management with Context API
- ✅ Clean, responsive, and intuitive UI/UX
- ✅ Dark mode implementation
- ✅ Data persistence with localStorage
- ✅ Export functionality (CSV/JSON)
- ✅ Advanced filtering and sorting
- ✅ Animations and smooth transitions
- ✅ Comprehensive README documentation

### Design Philosophy
The dashboard prioritizes:
1. **Clarity**: Information hierarchy and visual organization
2. **Usability**: Intuitive navigation and clear interactions
3. **Responsiveness**: Works on all screen sizes
4. **Performance**: Fast load times and smooth interactions
5. **Extensibility**: Easy to add new features or modify existing ones

---

## 📝 Future Enhancements

- Backend integration with real API
- User authentication with login/signup
- Multiple users with separate data
- Recurring transactions
- Budget planning and alerts
- Advanced analytics and reports
- Mobile app version
- Payment gateway integration
- Bank account synchronization

---

## 👨‍💻 Development Notes

### File Naming Convention
- Components: PascalCase (e.g., `TransactionsList.tsx`)
- Utils: camelCase (e.g., `mockData.ts`)
- Types: camelCase (e.g., `index.ts`)

### Code Quality
- ESLint configured for code standards
- TypeScript strict mode enabled
- Tailwind CSS with automatic formatting
- Consistent spacing and indentation

### Debugging
```bash
# Type checking
npx tsc --noEmit

# Build check
npm run build

# Dev server with HMR
npm run dev
```

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author Notes

This Finance Dashboard demonstrates:
- **Frontend Architecture**: Component-based React with proper separation of concerns
- **State Management**: Effective use of Context API for global state
- **UI/UX Design**: Clean, modern interface with attention to detail
- **TypeScript**: Full type safety and proper interfaces
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Feature Completeness**: All requirements met with bonus features implemented

The application is fully functional, production-ready in structure, and serves as a solid foundation for a personal finance management tool.

---

## 🤝 Support

For questions or feedback about this project, refer to the documentation or examine the source code structure.

**Happy tracking your finances! 💰**
