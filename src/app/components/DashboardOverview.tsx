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

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

const DashboardOverview = () => {
  const { transactions } = useFinance();

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const balance = calculateBalance(transactions);
  const monthlyData = getMonthlyData(transactions);
  const categorySpending = getCategorySpending(transactions);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-300 to-green-500 p-6 rounded-lg shadow text-white">
          <div className="text-sm opacity-90">Total Income</div>
          <div className="text-3xl font-bold mt-2">{formatCurrency(totalIncome)}</div>
        </div>
        <div className="bg-gradient-to-br from-red-300 to-red-500 p-6 rounded-lg shadow text-white">
          <div className="text-sm opacity-90">Total Expenses</div>
          <div className="text-3xl font-bold mt-2">{formatCurrency(totalExpense)}</div>
        </div>
        <div
          className={`bg-gradient-to-br ${
            balance >= 0
              ? "from-blue-300 to-blue-500"
              : "from-orange-300 to-orange-500"
          } p-6 rounded-lg shadow text-white`}
        >
          <div className="text-sm opacity-90">Balance</div>
          <div className="text-3xl font-bold mt-2">{formatCurrency(balance)}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Balance Trend</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  dot={{ fill: "#3b82f6" }}
                  name="Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Income vs Expenses Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Income vs Expenses</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No data available
            </div>
          )}
        </div>

        {/* Spending by Category */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Spending Distribution</h3>
          {categorySpending.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpending}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No expense data
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Category Breakdown</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {categorySpending.length > 0 ? (
              categorySpending.map((item) => (
                <div key={item.category} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.category}</div>
                    <div className="text-sm text-gray-600">{item.percentage.toFixed(1)}%</div>
                  </div>
                  <div className="font-bold text-right">{formatCurrency(item.amount)}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;