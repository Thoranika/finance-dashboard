export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Bonus"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Healthcare"
  | "Education"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface CategorySpending {
  category: TransactionCategory;
  amount: number;
  percentage: number;
}

export interface InsightData {
  highestCategory: CategorySpending | null;
  monthlyIncomeChange: { current: number; previous: number; percentChange: number };
  monthlyExpenseChange: { current: number; previous: number; percentChange: number };
  monthlySavings: { amount: number; rate: number };
}