import { useFinance } from "../context/FinanceContext";
import { useState, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import { formatCurrency, formatDate } from "../utils/helpers";
import type { Transaction, TransactionCategory } from "../types/index.js";

const categories: TransactionCategory[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Bonus",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Education",
  "Other",
];

const TransactionsList = () => {
  const { transactions, deleteTransaction, addTransaction, role, updateTransaction, darkMode } =
    useFinance();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | TransactionCategory>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Form states for add/edit
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    category: "Food" as TransactionCategory,
    type: "expense" as "income" | "expense",
    amount: "",
  });

  // Filter and sort transactions
  const filtered = transactions
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => typeFilter === "all" || t.type === typeFilter)
    .filter((t) => categoryFilter === "all" || t.category === categoryFilter)
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "date") {
        return order * (new Date(a.date).getTime() - new Date(b.date).getTime());
      } else {
        return order * (a.amount - b.amount);
      }
    });

  const handleAdd = () => {
    if (!formData.description.trim() || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId) {
      updateTransaction(editingId, {
        ...transactions.find((t) => t.id === editingId)!,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        amount: Number(formData.amount),
      });
      setEditingId(null);
    } else {
      addTransaction({
        id: uuid(),
        date: new Date().toISOString(),
        description: formData.description,
        category: formData.category,
        type: formData.type,
        amount: Number(formData.amount),
      });
    }

    setFormData({
      description: "",
      category: "Food",
      type: "expense",
      amount: "",
    });
    setShowForm(false);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setFormData({
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount.toString(),
    });
    setShowForm(true);
  };

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setSortBy("date");
    setSortOrder("desc");
  };

  return (
    <div className="space-y-4">
      {/* Header with Title and Add Button */}
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Transactions</h2>
        {role === "admin" && !showForm && (
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                description: "",
                category: "Food",
                type: "expense",
                amount: "",
              });
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
          >
            ➕ Add Transaction
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && role === "admin" && (
        <div className={`${darkMode ? "bg-gray-800 border-blue-600" : "bg-blue-50 border-blue-200"} p-4 rounded-lg border`}>
          <h3 className={`font-bold mb-4 ${darkMode ? "text-white" : ""}`}>{editingId ? "Edit Transaction" : "Add New Transaction"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400" : ""}`}
            />
            <select
              value={formData.category}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData({
                  ...formData,
                  category: e.target.value as TransactionCategory,
                })
              }
              className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={formData.type}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "income" | "expense",
                })
              }
              className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400" : ""}`}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {editingId ? "Update" : "Add"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className={`${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"} text-white px-4 py-2 rounded transition`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} p-4 rounded-lg space-y-4`}>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search description"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className={`border p-2 rounded flex-1 min-w-48 ${darkMode ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400" : ""}`}
          />

          <select
            value={typeFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setTypeFilter(e.target.value as "all" | "income" | "expense")
            }
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCategoryFilter(e.target.value as "all" | TransactionCategory)
            }
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSortBy(e.target.value as "date" | "amount")
            }
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}`}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600" : "bg-white hover:bg-gray-100"}`}
          >
            {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
          </button>

          <button
            onClick={resetFilters}
            className={`${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-400 hover:bg-gray-500"} text-white px-4 py-2 rounded transition`}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      {filtered.length === 0 ? (
        <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                <th className={`border p-3 text-left ${darkMode ? "border-gray-700 text-white" : ""}`}>Date</th>
                <th className={`border p-3 text-left ${darkMode ? "border-gray-700 text-white" : ""}`}>Description</th>
                <th className={`border p-3 text-left ${darkMode ? "border-gray-700 text-white" : ""}`}>Category</th>
                <th className={`border p-3 text-left ${darkMode ? "border-gray-700 text-white" : ""}`}>Type</th>
                <th className={`border p-3 text-right ${darkMode ? "border-gray-700 text-white" : ""}`}>Amount</th>
                {role === "admin" && <th className={`border p-3 text-center ${darkMode ? "border-gray-700 text-white" : ""}`}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className={`border ${darkMode ? "hover:bg-gray-800 bg-gray-900 border-gray-700" : "hover:bg-gray-50"}`}>
                  <td className={`border p-3 ${darkMode ? "border-gray-700 text-gray-300" : ""}`}>{formatDate(t.date)}</td>
                  <td className={`border p-3 ${darkMode ? "border-gray-700 text-gray-300" : ""}`}>{t.description}</td>
                  <td className={`border p-3 ${darkMode ? "border-gray-700 text-gray-300" : ""}`}>{t.category}</td>
                  <td className={`border p-3 ${darkMode ? "border-gray-700" : ""}`}>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        t.type === "income" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className={`border p-3 text-right font-semibold ${darkMode ? "border-gray-700 text-white" : ""}`}>{formatCurrency(t.amount)}</td>
                  {role === "admin" && (
                    <td className={`border p-3 text-center space-x-2 ${darkMode ? "border-gray-700" : ""}`}>
                      <button
                        onClick={() => handleEdit(t)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this transaction?")) {
                            deleteTransaction(t.id);
                          }
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={`mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        <div>
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;