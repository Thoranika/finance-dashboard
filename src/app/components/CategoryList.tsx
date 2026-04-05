import { useFinance } from "../context/FinanceContext";
import { getCategorySpending, formatCurrency } from "../utils/helpers";

const CategoryList = () => {
  const { transactions } = useFinance();
  const categorySpending = getCategorySpending(transactions);

  if (categorySpending.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No expense data available
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Spending by Category</h2>
      <div className="space-y-3">
        {categorySpending.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{item.category}</span>
                <span className="text-sm text-gray-600">{item.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-700 mt-1">{formatCurrency(item.amount)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
