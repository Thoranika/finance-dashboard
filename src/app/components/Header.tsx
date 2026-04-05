import { useFinance } from "../context/FinanceContext";
import type { ChangeEvent } from "react";
import ExportButton from "./ExportButton";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { role, setRole, darkMode, setDarkMode } = useFinance();
  const location = useLocation();

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
      } p-4 transition-colors shadow-lg sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 items-center">
          <Link
            to="/finance-dashboard/"
            className={`px-3 py-2 rounded transition ${
              location.pathname === "/finance-dashboard/"
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-700"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/finance-dashboard/transactions"
            className={`px-3 py-2 rounded transition ${
              location.pathname === "/finance-dashboard/transactions"
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-700"
            }`}
          >
            Transactions
          </Link>
          <Link
            to="/finance-dashboard/insights"
            className={`px-3 py-2 rounded transition ${
              location.pathname === "/finance-dashboard/insights"
                ? "bg-white text-blue-600 font-semibold"
                : "hover:bg-blue-700"
            }`}
          >
            Insights
          </Link>
        </nav>

        <div className="flex gap-4 items-center flex-wrap">
          <div className="text-sm opacity-90">{getCurrentDate()}</div>

          <ExportButton />

          <select
            value={role}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setRole(e.target.value as "admin" | "viewer")
            }
            className="px-3 py-2 rounded bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
          >
            <option value="viewer">👁️ Viewer</option>
            <option value="admin">👨‍💼 Admin</option>
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;