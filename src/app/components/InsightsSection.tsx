import { useFinance } from "../context/FinanceContext";
import { getInsights, formatCurrency } from "../utils/helpers";

const InsightsSection = () => {
  const { transactions } = useFinance();
  const insights = getInsights(transactions);

  const getIncomeChange = () => {
    return insights.monthlyIncomeChange.percentChange >= 0 ? "↑" : "↓";
  };

  const getExpenseChange = () => {
    return insights.monthlyExpenseChange.percentChange >= 0 ? "↑" : "↓";
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Financial Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Highest Spending Category */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <div className="text-sm text-gray-600 mb-2">Highest Spending Category</div>
          <div className="text-2xl font-bold text-blue-600">
            {insights.highestCategory?.category || "N/A"}
          </div>
          <div className="text-lg text-gray-700 mt-2">
            {insights.highestCategory
              ? formatCurrency(insights.highestCategory.amount)
              : "No data"}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {insights.highestCategory?.percentage.toFixed(1)}% of total spending
          </div>
        </div>

        {/* Income Comparison */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <div className="text-sm text-gray-600 mb-2">Monthly Income</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(insights.monthlyIncomeChange.current)}
          </div>
          <div className="text-lg mt-2 flex items-center gap-2">
            <span
              className={`text-2xl ${
                insights.monthlyIncomeChange.percentChange >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {getIncomeChange()}
            </span>
            <span className="text-sm text-gray-700">
              {Math.abs(insights.monthlyIncomeChange.percentChange).toFixed(1)}% vs last month
            </span>
          </div>
        </div>

        {/* Expense Comparison */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-600">
          <div className="text-sm text-gray-600 mb-2">Monthly Expenses</div>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(insights.monthlyExpenseChange.current)}
          </div>
          <div className="text-lg mt-2 flex items-center gap-2">
            <span
              className={`text-2xl ${
                insights.monthlyExpenseChange.percentChange <= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {getExpenseChange()}
            </span>
            <span className="text-sm text-gray-700">
              {Math.abs(insights.monthlyExpenseChange.percentChange).toFixed(1)}% vs last month
            </span>
          </div>
        </div>

        {/* Savings */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
          <div className="text-sm text-gray-600 mb-2">Monthly Savings</div>
          <div className="text-2xl font-bold text-purple-600">
            {formatCurrency(insights.monthlySavings.amount)}
          </div>
          <div className="text-lg text-gray-700 mt-2">
            Savings Rate: {insights.monthlySavings.rate.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {insights.monthlySavings.rate >= 20
              ? "✓ Excellent savings rate!"
              : insights.monthlySavings.rate >= 10
              ? "⚬ Good savings rate"
              : "⚠ Consider increasing savings"}
          </div>
        </div>
      </div>

      {/* Smart Tips */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg border border-purple-300">
        <h3 className="text-lg font-bold mb-4">💡 Smart Tips</h3>
        <ul className="space-y-2 text-sm">
          {insights.highestCategory && (
            <li>
              • Your highest spending is on <strong>{insights.highestCategory.category}</strong> (
              {insights.highestCategory.percentage.toFixed(1)}% of total)
            </li>
          )}
          {insights.monthlyIncomeChange.percentChange > 0 && (
            <li>
              • Great news! Your income increased by{" "}
              <strong>{insights.monthlyIncomeChange.percentChange.toFixed(1)}%</strong> this month.
            </li>
          )}
          {insights.monthlyExpenseChange.percentChange < 0 && (
            <li>
              • Your expenses decreased by{" "}
              <strong>{Math.abs(insights.monthlyExpenseChange.percentChange).toFixed(1)}%</strong>.
              Keep it up!
            </li>
          )}
          {insights.monthlySavings.rate >= 20 && (
            <li>• You're in a strong financial position with a great savings rate! 🎉</li>
          )}
          {insights.monthlySavings.rate < 10 && (
            <li>
              • Consider reducing expenses or finding ways to increase income to improve your
              savings rate.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InsightsSection;