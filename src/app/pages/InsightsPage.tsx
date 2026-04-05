import { useFinance } from "../context/FinanceContext";
import { getInsights, formatCurrency, getMonthlyData, getCategorySpending } from "../utils/helpers";

const InsightsPage = () => {
  const { transactions, darkMode } = useFinance();
  const insights = getInsights(transactions);
  const monthlyData = getMonthlyData(transactions);
  const categorySpending = getCategorySpending(transactions);

  const getIncomeChange = () => {
    return insights.monthlyIncomeChange.percentChange >= 0 ? "↑" : "↓";
  };

  const getExpenseChange = () => {
    return insights.monthlyExpenseChange.percentChange >= 0 ? "↑" : "↓";
  };

  return (
    <div className={`p-6 space-y-8 ${darkMode ? "bg-gray-950" : ""}`}>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Financial Insights</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Get detailed analysis of your financial behavior</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Highest Spending Category */}
        <div className={`${darkMode ? "bg-gray-900 border-blue-500" : "bg-white border-blue-600"} p-6 rounded-lg shadow border-l-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Highest Spending Category</span>
            <span className="text-2xl">🎯</span>
          </div>
          <div className={`text-2xl font-bold mt-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            {insights.highestCategory?.category || "N/A"}
          </div>
          <div className={`text-lg mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {insights.highestCategory ? formatCurrency(insights.highestCategory.amount) : "No data"}
          </div>
          <div className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {insights.highestCategory?.percentage.toFixed(1)}% of total spending
          </div>
        </div>

        {/* Income Comparison */}
        <div className={`${darkMode ? "bg-gray-900 border-green-500" : "bg-white border-green-600"} p-6 rounded-lg shadow border-l-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Monthly Income</span>
            <span className="text-2xl">📈</span>
          </div>
          <div className={`text-2xl font-bold mt-2 ${darkMode ? "text-green-400" : "text-green-600"}`}>
            {formatCurrency(insights.monthlyIncomeChange.current)}
          </div>
          <div className="text-lg mt-2 flex items-center gap-2">
            <span
              className={`text-2xl ${
                insights.monthlyIncomeChange.percentChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {getIncomeChange()}
            </span>
            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {Math.abs(insights.monthlyIncomeChange.percentChange).toFixed(1)}% vs last month
            </span>
          </div>
        </div>

        {/* Expense Comparison */}
        <div className={`${darkMode ? "bg-gray-900 border-red-500" : "bg-white border-red-600"} p-6 rounded-lg shadow border-l-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Monthly Expenses</span>
            <span className="text-2xl">📉</span>
          </div>
          <div className={`text-2xl font-bold mt-2 ${darkMode ? "text-red-400" : "text-red-600"}`}>
            {formatCurrency(insights.monthlyExpenseChange.current)}
          </div>
          <div className="text-lg mt-2 flex items-center gap-2">
            <span
              className={`text-2xl ${
                insights.monthlyExpenseChange.percentChange <= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {getExpenseChange()}
            </span>
            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {Math.abs(insights.monthlyExpenseChange.percentChange).toFixed(1)}% vs last month
            </span>
          </div>
        </div>

        {/* Savings */}
        <div className={`${darkMode ? "bg-gray-900 border-purple-500" : "bg-white border-purple-600"} p-6 rounded-lg shadow border-l-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Monthly Savings</span>
            <span className="text-2xl">💎</span>
          </div>
          <div className={`text-2xl font-bold mt-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
            {formatCurrency(insights.monthlySavings.amount)}
          </div>
          <div className={`text-lg mt-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Savings Rate: {insights.monthlySavings.rate.toFixed(1)}%</div>
          <div className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {insights.monthlySavings.rate >= 20
              ? "✓ Excellent savings rate!"
              : insights.monthlySavings.rate >= 10
              ? "⚬ Good savings rate"
              : "⚠ Consider increasing savings"}
          </div>
        </div>
      </div>

      {/* Smart Tips */}
      <div className={`${darkMode ? "bg-gray-900 border-purple-600" : "bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300"} p-6 rounded-lg border`}>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>💡 Smart Financial Tips</h3>
        <ul className={`space-y-3 text-sm ${darkMode ? "text-gray-300" : ""}`}>
          {insights.highestCategory && (
            <li className="flex items-start gap-2">
              <span className={`font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>→</span>
              <span>
                Your highest spending is on <strong>{insights.highestCategory.category}</strong> (
                {insights.highestCategory.percentage.toFixed(1)}% of total). Consider setting a budget for this
                category.
              </span>
            </li>
          )}
          {insights.monthlyIncomeChange.percentChange > 0 && (
            <li className="flex items-start gap-2">
              <span className={darkMode ? "text-green-400" : "text-green-600"}>✓</span>
              <span>
                Great news! Your income increased by{" "}
                <strong>{insights.monthlyIncomeChange.percentChange.toFixed(1)}%</strong> this month. Keep it up!
              </span>
            </li>
          )}
          {insights.monthlyExpenseChange.percentChange < 0 && (
            <li className="flex items-start gap-2">
              <span className={darkMode ? "text-green-400" : "text-green-600"}>✓</span>
              <span>
                Your expenses decreased by{" "}
                <strong>{Math.abs(insights.monthlyExpenseChange.percentChange).toFixed(1)}%</strong>. Excellent control!
              </span>
            </li>
          )}
          {insights.monthlySavings.rate >= 20 && (
            <li className="flex items-start gap-2">
              <span>🎉</span>
              <span>You're in a strong financial position with a great savings rate! Keep up this excellent habit.</span>
            </li>
          )}
          {insights.monthlySavings.rate < 10 && (
            <li className="flex items-start gap-2">
              <span>⚠</span>
              <span>
                Consider reducing expenses or finding ways to increase income to improve your savings rate and build
                wealth.
              </span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <span>💡</span>
            <span>Track your spending regularly to identify patterns and make informed financial decisions.</span>
          </li>
        </ul>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Trends */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Income Trends</h3>
          <div className="space-y-2">
            {monthlyData.map((month) => (
              <div key={month.month} className={`flex justify-between items-center p-2 rounded ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{month.month}</span>
                <span className={`font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>{formatCurrency(month.income)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Trends */}
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
          <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Expense Trends</h3>
          <div className="space-y-2">
            {monthlyData.map((month) => (
              <div key={month.month} className={`flex justify-between items-center p-2 rounded ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{month.month}</span>
                <span className={`font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>{formatCurrency(month.expense)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow`}>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Category Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : ""}`}>
                <th className={`text-left p-3 font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Category</th>
                <th className={`text-right p-3 font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Amount</th>
                <th className={`text-right p-3 font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {categorySpending.map((item) => (
                <tr key={item.category} className={`border-b ${darkMode ? "border-gray-700 hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                  <td className={`p-3 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>{item.category}</td>
                  <td className={`text-right p-3 font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{formatCurrency(item.amount)}</td>
                  <td className={`text-right p-3 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>{item.percentage.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
