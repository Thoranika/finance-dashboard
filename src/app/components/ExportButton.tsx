import { useFinance } from "../context/FinanceContext";
import { exportToCSV, exportToJSON } from "../utils/helpers";
import { useState } from "react";

const ExportButton = () => {
  const { transactions } = useFinance();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        📥 Export Data
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
          <button
            onClick={() => {
              exportToCSV(transactions);
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
          >
            📊 Export as CSV
          </button>
          <button
            onClick={() => {
              exportToJSON(transactions);
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            📄 Export as JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;