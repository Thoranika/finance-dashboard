import TransactionsList from "../components/TransactionsList";
import { useFinance } from "../context/FinanceContext";

const TransactionsPage = () => {
  const { darkMode } = useFinance();

  return (
    <div className={`p-6 ${darkMode ? "bg-gray-950" : ""}`}>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Transactions</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Manage and view all your transactions</p>
      </div>

      <div className={`rounded-lg shadow ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <TransactionsList />
      </div>
    </div>
  );
};

export default TransactionsPage;
