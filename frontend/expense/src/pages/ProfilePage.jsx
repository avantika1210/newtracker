import React, { useContext, useState, useEffect } from "react";
import Lottie from "lottie-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import SummaryCard from "../components/Transactions/SummaryCard";
import TransactionList from "../components/Transactions/TransactionList";
import { TransactionContext } from "../context/TransactionContext";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"; 

export default function ProfilePage() {
  const { transactions = [], deleteTransaction } = useContext(TransactionContext);

  const [profileAnimation, setProfileAnimation] = useState(null);
  const [d3Animation, setD3Animation] = useState(null);
  const [d4Animation, setD4Animation] = useState(null);

  const COLORS = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#6366f1"];

  // Load animations
  useEffect(() => {
    fetch("/animations/Profile.json")
      .then((res) => res.json())
      .then(setProfileAnimation)
      .catch((err) => console.error("Failed to load Profile animation:", err));

    fetch("/animations/d3.json")
      .then((res) => res.json())
      .then(setD3Animation)
      .catch((err) => console.error("Failed to load d3 animation:", err));

    fetch("/animations/d4.json")
      .then((res) => res.json())
      .then(setD4Animation)
      .catch((err) => console.error("Failed to load d4 animation:", err));
  }, []);

  const txs = Array.isArray(transactions) ? transactions : [];

  // Expense by category
  const categoryData = Object.values(
    txs.reduce((acc, t) => {
      if (t.type === "expense") {
        const cat = t.category || t.title || "Others";
        if (!acc[cat]) acc[cat] = { name: cat, value: 0 };
        acc[cat].value += Math.abs(t.amount);
      }
      return acc;
    }, {})
  );

  // Income vs Expense ratio for stars
  const totalIncome = txs.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = txs.filter(t => t.type === "expense").reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const incomeRatio = totalIncome ? totalIncome / (totalIncome + totalExpense) : 0;
  const starsCount = Math.round(incomeRatio * 5);

  const topCategory = categoryData.length > 0 
    ? categoryData.reduce((a, b) => (a.value > b.value ? a : b)).name 
    : null;

  // PDF export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions Report", 14, 20);

    const tableData = txs.map(t => [
      t.title || t.text || "-",
      t.type,
      t.category || "-",
      t.amount,
      new Date(t.date).toLocaleString()
    ]);

    autoTable(doc, {
      head: [["Title", "Type", "Category", "Amount", "Date & Time"]],
      body: tableData,
      startY: 30,
    });

    doc.save("transactions_report.pdf");
  };

  const recentTransactions = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const handleDelete = (id) => deleteTransaction(id);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 min-h-screen space-y-6 relative overflow-hidden">

      {/* Profile Header with d3 animation */}
      <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="w-32 h-32">
          {profileAnimation ? <Lottie animationData={profileAnimation} loop /> : <p className="text-gray-400 text-sm">Loading animation...</p>}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">Avantika Pandey</h2>
          <p className="text-gray-500">avantika@example.com</p>
          <p className="text-gray-400 mt-1">Last login: {new Date().toLocaleDateString()}</p>

          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xl mr-1 ${i < starsCount ? "text-green-500" : "text-gray-300"}`}>⭐</span>
            ))}
          </div>

          {topCategory && (
            <p className="text-sm text-gray-500 mt-1">
              Top spending category this month: <strong>{topCategory}</strong>
            </p>
          )}
        </div>

        {/* d3.json Animation */}
        {d3Animation && (
          <div className="w-32 md:w-40 flex-shrink-0">
            <Lottie animationData={d3Animation} loop />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button onClick={exportPDF} className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-600 transition">
            Export PDF
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>

      {/* Summary */}
      {txs.length > 0 ? <SummaryCard transactions={txs} /> :
        <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-400 text-center">No transactions yet. Start tracking your expenses!</div>
      }

      {/* Expense by Category Pie Chart */}
      {txs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Expense by Category</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {categoryData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      {txs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent Transactions</h3>
          <TransactionList transactions={recentTransactions} onDelete={handleDelete} />
        </div>
      )}

      {/* d4.json Animation floating bottom-right */}
      {d4Animation && (
        <div className="absolute bottom-6 right-6 w-32 opacity-80 pointer-events-none">
          <Lottie animationData={d4Animation} loop />
        </div>
      )}
    </div>
  );
}