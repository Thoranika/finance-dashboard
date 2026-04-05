import type { Transaction } from "../types/index.js";

export const mockTransactions: Transaction[] = [
  // January 2026
  { id: "1", date: "2026-01-03", description: "Monthly Salary", category: "Salary", type: "income", amount: 4000 },
  { id: "2", date: "2026-01-05", description: "Grocery Shopping", category: "Food", type: "expense", amount: 450 },
  { id: "3", date: "2026-01-07", description: "Freelance Project", category: "Freelance", type: "income", amount: 1200 },
  { id: "4", date: "2026-01-09", description: "Electricity Bill", category: "Bills", type: "expense", amount: 350 },
  { id: "5", date: "2026-01-10", description: "Restaurant Dinner", category: "Food", type: "expense", amount: 250 },
  { id: "6", date: "2026-01-12", description: "Uber Rides", category: "Transport", type: "expense", amount: 120 },
  { id: "7", date: "2026-01-15", description: "Movie Tickets", category: "Entertainment", type: "expense", amount: 100 },
  { id: "8", date: "2026-01-18", description: "Clothing Shopping", category: "Shopping", type: "expense", amount: 600 },
  { id: "9", date: "2026-01-20", description: "Doctor Visit", category: "Healthcare", type: "expense", amount: 300 },
  { id: "10", date: "2026-01-22", description: "Investment Return", category: "Investment", type: "income", amount: 800 },

  // February 2026
  { id: "11", date: "2026-02-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 4000 },
  { id: "12", date: "2026-02-03", description: "Grocery Shopping", category: "Food", type: "expense", amount: 380 },
  { id: "13", date: "2026-02-05", description: "Freelance Project", category: "Freelance", type: "income", amount: 1500 },
  { id: "14", date: "2026-02-07", description: "Internet Bill", category: "Bills", type: "expense", amount: 300 },
  { id: "15", date: "2026-02-08", description: "Movie Night", category: "Entertainment", type: "expense", amount: 270 },
  { id: "16", date: "2026-02-10", description: "Gas Fill-up", category: "Transport", type: "expense", amount: 200 },
  { id: "17", date: "2026-02-12", description: "Online Course", category: "Education", type: "expense", amount: 500 },
  { id: "18", date: "2026-02-14", description: "Pharmacy", category: "Healthcare", type: "expense", amount: 150 },
  { id: "19", date: "2026-02-16", description: "Electronics Store", category: "Shopping", type: "expense", amount: 800 },
  { id: "20", date: "2026-02-18", description: "Bonus Received", category: "Bonus", type: "income", amount: 1000 },

  // March 2026
  { id: "21", date: "2026-03-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 4000 },
  { id: "22", date: "2026-03-03", description: "Grocery Shopping", category: "Food", type: "expense", amount: 520 },
  { id: "23", date: "2026-03-05", description: "Freelance Project", category: "Freelance", type: "income", amount: 1800 },
  { id: "24", date: "2026-03-07", description: "Water Bill", category: "Bills", type: "expense", amount: 200 },
  { id: "25", date: "2026-03-09", description: "Restaurant", category: "Food", type: "expense", amount: 320 },
  { id: "26", date: "2026-03-11", description: "Concert Tickets", category: "Entertainment", type: "expense", amount: 400 },
  { id: "27", date: "2026-03-13", description: "Taxi Service", category: "Transport", type: "expense", amount: 180 },
  { id: "28", date: "2026-03-15", description: "Book Purchase", category: "Education", type: "expense", amount: 200 },
  { id: "29", date: "2026-03-17", description: "Medical Checkup", category: "Healthcare", type: "expense", amount: 400 },
  { id: "30", date: "2026-03-19", description: "Furniture Store", category: "Shopping", type: "expense", amount: 1200 },

  // April 2026 (Current Month)
  { id: "31", date: "2026-04-01", description: "Monthly Salary", category: "Salary", type: "income", amount: 4500 },
  { id: "32", date: "2026-04-03", description: "Grocery Shopping", category: "Food", type: "expense", amount: 420 },
  { id: "33", date: "2026-04-05", description: "Freelance Project", category: "Freelance", type: "income", amount: 2000 },
  { id: "34", date: "2026-04-07", description: "Phone Bill", category: "Bills", type: "expense", amount: 250 },
  { id: "35", date: "2026-04-09", description: "Cafe Visit", category: "Food", type: "expense", amount: 180 },
  { id: "36", date: "2026-04-11", description: "Gaming Subscription", category: "Entertainment", type: "expense", amount: 100 },
  { id: "37", date: "2026-04-13", description: "Flight Booking", category: "Transport", type: "expense", amount: 1500 },
  { id: "38", date: "2026-04-15", description: "Workshop Fee", category: "Education", type: "expense", amount: 300 },
  { id: "39", date: "2026-04-17", description: "Supplements", category: "Healthcare", type: "expense", amount: 200 },
  { id: "40", date: "2026-04-19", description: "Sports Equipment", category: "Shopping", type: "expense", amount: 500 },
];