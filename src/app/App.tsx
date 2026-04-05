import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";
import { FinanceProvider, useFinance } from "./context/FinanceContext";

function AppContent() {
  const { darkMode } = useFinance();

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      <main className="max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer
        className={`${
          darkMode
            ? "bg-gray-900 text-gray-300"
            : "bg-gray-800 text-white"
        } text-center p-4 mt-8 transition-colors`}
      >
        <p>Finance Dashboard • Built with React & Tailwind CSS</p>
        <p>© 2026 • All rights reserved</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <FinanceProvider>
      <Router>
        <AppContent />
      </Router>
    </FinanceProvider>
  );
}

export default App;