/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Transaction } from "../types"; // ✅ FIXED (type import)
import { mockTransactions } from "../utils/mockData";

interface ContextType {
  transactions: Transaction[];
  role: "admin" | "viewer";
  setRole: (r: "admin" | "viewer") => void;
  addTransaction: (t: Transaction) => void;
  updateTransaction: (id: string, t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
}

const FinanceContext = createContext<ContextType | null>(null);

interface Props {
  children: ReactNode; // ✅ FIXED (no more any)
}

export const FinanceProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : mockTransactions;
  });

  const [role, setRole] = useState<"admin" | "viewer">(() => {
    return (localStorage.getItem("role") as "admin" | "viewer") || "viewer";
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const data = localStorage.getItem("darkMode");
    return data ? JSON.parse(data) : false;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTransaction = (t: Transaction) => {
    setTransactions((prev) => [...prev, t]);
  };

  const updateTransaction = (id: string, t: Transaction) => {
    setTransactions((prev) => prev.map((transaction) => (transaction.id === id ? t : transaction)));
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, role, setRole, addTransaction, updateTransaction, deleteTransaction, darkMode, setDarkMode }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used inside FinanceProvider");
  }
  return context;
};