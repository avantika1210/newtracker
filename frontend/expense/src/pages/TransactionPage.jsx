import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import { TransactionContext } from "../context/TransactionContext";
import AddTransactionForm from "../components/Transactions/AddTransactionForm";
import TransactionList from "../components/Transactions/TransactionList";
import FilterSection from "../components/Transactions/FilterSection";
// import InsightsCard from "../components/Transactions/InsightsCard";
// import { generateInsights } from "../utils/insightGenerator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const TransactionPage = () => {
  const { transactions = [], addTransaction, deleteTransaction } =
    useContext(TransactionContext);
  const [showAdd, setShowAdd] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const COLORS = ["#a8dadc", "#ffd6a5", "#ffadad", "#caffbf", "#b5ead7", "#d4a5a5"];

  // ✅ Load Lottie animation from public folder
  useEffect(() => {
    fetch("/animations/d3.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  
  // ✅ Monthly chart data
  const monthlyData = months.map((m) => {
    const monthTx = transactions.filter((t) => new Date(t.date).getMonth() + 1 === m);
    const income = monthTx.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
    const expense = monthTx.filter((t) => t.type === "expense").reduce((acc, t) => acc + Math.abs(t.amount), 0);
    return { month: `M${m}`, income, expense };
  });

  // ✅ Category chart data (expenses only)
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        const cat = t.category || t.title || "Others";
        if (!acc[cat]) acc[cat] = { name: cat, value: 0 };
        acc[cat].value += Math.abs(t.amount);
      }
      return acc;
    }, {})
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">💰 Transaction Dashboard</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition-all"
        >
          {showAdd ? "Close" : "➕ Add Transaction"}
        </button>
      </div>

      {/* Add Transaction */}
      {showAdd && <AddTransactionForm addTransaction={addTransaction} />}

      {/* Filters */}
      <FilterSection
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
      />

      {/* Transaction List */}
      <TransactionList
        transactions={transactions}
        filterCategory={filterCategory}
        filterMonth={filterMonth}
        deleteTransaction={deleteTransaction}
      />

      {/* AI Insights */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          🤖 AI Insights on Spending Patterns
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            {animationData && <Lottie animationData={animationData} className="w-40 h-40" />}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <InsightsCard key={index} insight={insight} />
            ))}
          </div>
        )}
      </div>

      {/* Monthly Area Chart */}
      <div className="mt-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Monthly Totals</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="income" stroke="#4f46e5" fill="url(#incomeGrad)" />
            <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="url(#expenseGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Category Pie Chart */}
      <div className="mt-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Expense by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionPage;