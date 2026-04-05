import { useFinance } from "../context/FinanceContext";
import {
  formatCurrency,
  calculateTotalIncome,
  calculateTotalExpense,
  calculateBalance,
  getMonthlyData,
  getCategorySpending,
} from "../utils/helpers";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#EF4444", "#F97316", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#EC4899", "#6366F1"];

const DashboardPage = () => {
  const { transactions, darkMode } = useFinance();

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const balance = calculateBalance(transactions);
  const monthlyData = getMonthlyData(transactions);
  const categorySpending = getCategorySpending(transactions);

  return (
    <div className={`p-6 space-y-6 ${darkMode ? "bg-gray-950" : ""}`}>
      {/* Dashboard Title */}
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Dashboard Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total Balance</span>
            <span className="text-3xl">💰</span>
          </div>
          <div className="text-4xl font-bold">{formatCurrency(balance)}</div>
          <div className="text-sm opacity-75 mt-2">Current balance</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total Income</span>
            <span className="text-3xl">📈</span>
          </div>
          <div className="text-4xl font-bold">{formatCurrency(totalIncome)}</div>
          <div className="text-sm opacity-75 mt-2">All time earnings</div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total Expenses</span>
            <span className="text-3xl">📉</span>
          </div>
          <div className="text-4xl font-bold">{formatCurrency(totalExpense)}</div>
          <div className="text-sm opacity-75 mt-2">All time spending</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend Chart */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Balance Trend (Last 6 Months)</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  dot={{ fill: "#10b981", r: 5 }}
                  name="Income"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  dot={{ fill: "#ef4444", r: 5 }}
                  name="Expense"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  dot={{ fill: "#3b82f6", r: 5 }}
                  name="Balance"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Income vs Expenses Chart */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Income vs Expenses</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Spending by Category - Pie Chart */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Spending by Category</h3>
          {categorySpending.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpending}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => {
                    const total = categorySpending.reduce((sum, item) => sum + item.amount, 0);
                    const percent = ((value as number) / total) * 100;
                    return `${name} ${percent.toFixed(0)}%`;
                  }}
                >
                  {categorySpending.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No expense data
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Category Breakdown</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {categorySpending.length > 0 ? (
              categorySpending.map((item, index) => (
                <div key={item.category} className={`flex items-center justify-between p-3 rounded ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div>
                      <div className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{item.category}</div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{item.percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{formatCurrency(item.amount)}</div>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
