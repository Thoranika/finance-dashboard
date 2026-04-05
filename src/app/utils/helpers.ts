import type { Transaction, MonthlyData, CategorySpending, InsightData, TransactionCategory } from "../types/index.js";

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getMonthYear = (date: string): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
  });
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateBalance = (transactions: Transaction[]): number => {
  return calculateTotalIncome(transactions) - calculateTotalExpense(transactions);
};

export const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyMap = new Map<string, { income: number; expense: number }>();

  transactions.forEach((t) => {
    const monthKey = getMonthYear(t.date);
    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { income: 0, expense: 0 });
    }
    const data = monthlyMap.get(monthKey)!;
    if (t.type === "income") {
      data.income += t.amount;
    } else {
      data.expense += t.amount;
    }
  });

  return Array.from(monthlyMap, ([month, { income, expense }]) => ({
    month,
    income,
    expense,
    balance: income - expense,
  })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
};

export const getCategorySpending = (transactions: Transaction[]): CategorySpending[] => {
  const categoryMap = new Map<TransactionCategory, number>();
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalExpense = calculateTotalExpense(transactions);

  expenses.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });

  return Array.from(categoryMap, ([category, amount]) => ({
    category,
    amount,
    percentage: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
  }))
    .sort((a, b) => b.amount - a.amount);
};

export const getInsights = (transactions: Transaction[]): InsightData => {
  const categorySpending = getCategorySpending(transactions);
  const monthlyData = getMonthlyData(transactions);

  // Current and previous month
  const currentMonth = monthlyData[monthlyData.length - 1] || { income: 0, expense: 0 };
  const previousMonth = monthlyData[monthlyData.length - 2] || { income: 0, expense: 0 };

  const incomeChange = previousMonth.income > 0 
    ? ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100 
    : 0;
  const expenseChange = previousMonth.expense > 0 
    ? ((currentMonth.expense - previousMonth.expense) / previousMonth.expense) * 100 
    : 0;

  return {
    highestCategory: categorySpending[0] || null,
    monthlyIncomeChange: {
      current: currentMonth.income,
      previous: previousMonth.income,
      percentChange: incomeChange,
    },
    monthlyExpenseChange: {
      current: currentMonth.expense,
      previous: previousMonth.expense,
      percentChange: expenseChange,
    },
    monthlySavings: {
      amount: currentMonth.balance,
      rate: currentMonth.income > 0 ? (currentMonth.balance / currentMonth.income) * 100 : 0,
    },
  };
};

export const exportToCSV = (transactions: Transaction[], filename = "transactions.csv"): void => {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map((t) => [
    formatDate(t.date),
    t.description,
    t.category,
    t.type,
    formatCurrency(t.amount),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const exportToJSON = (transactions: Transaction[], filename = "transactions.json"): void => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};