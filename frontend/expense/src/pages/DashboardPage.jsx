import React, { useEffect, useState, useContext } from "react";
import Lottie from "lottie-react";
import SummaryCard from "../components/Transactions/SummaryCard";
import AddTransaction from "../components/Transactions/AddTransactionForm";
import TransactionList from "../components/Transactions/TransactionList";
import { TransactionContext } from "../context/TransactionContext";

export default function DashboardPage() {
  const { transactions, addTransaction } = useContext(TransactionContext);

  // Animations
  const [fintechAnimation, setFintechAnimation] = useState(null);
  const [balanceAnimation, setBalanceAnimation] = useState(null);

  // ===== AI INSIGHT LOGIC =====
  const getAIInsight = () => {
    if (!transactions || transactions.length === 0)
      return "Start adding transactions to unlock smart insights! 💡";

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

    const categoryMap = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        categoryMap[t.category] =
          (categoryMap[t.category] || 0) + Number(t.amount);
      }
    });

    const topCategory =
      Object.keys(categoryMap).length > 0
        ? Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0][0]
        : "Miscellaneous";

    let insight = `💡 This month you spent ₹${totalExpense}. `;
    insight += `Your top spending category is ${topCategory}. `;
    if (balance < 0)
      insight += `You’ve overspent by ₹${Math.abs(
        balance
      )} — time to slow down a bit! 🧾`;
    else if (balance === 0)
      insight += `You're breaking even — track your small spends closely. ⚖️`;
    else insight += `Great job! You saved ₹${balance} this month! 🎯`;

    return insight;
  };

  const [aiInsight, setAiInsight] = useState(getAIInsight());
  const [aiTip, setAiTip] = useState("");

  useEffect(() => {
    setAiInsight(getAIInsight());

    if (!transactions || transactions.length === 0) return;

    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += Number(t.amount);
      else totalExpense += Number(t.amount);
    });

    const spendRatio = totalIncome ? (totalExpense / totalIncome) * 100 : 0;
    let tip = "";

    if (spendRatio > 80) {
      tip = "⚠️ You're spending a lot this week! Try to save at least ₹500 more.";
    } else if (spendRatio > 60) {
      tip = "💡 Doing well! Save ₹300 extra this week for a cushion.";
    } else if (spendRatio > 30) {
      tip = "✨ Great balance! Keep saving regularly.";
    } else if (spendRatio > 0) {
      tip = "🌱 Excellent saving habit! Consider investing a small part.";
    } else {
      tip = "💰 Add some income or expenses to see smart insights.";
    }

    setAiTip(tip);
  }, [transactions]);

  // Load animations dynamically
  useEffect(() => {
    fetch("/animations/Fintech.json")
      .then((res) => res.json())
      .then(setFintechAnimation)
      .catch((err) => console.error("Failed to load Fintech animation:", err));

    fetch("/animations/d1.json")
      .then((res) => res.json())
      .then(setBalanceAnimation)
      .catch((err) => console.error("Failed to load d1 animation:", err));
  }, []);

  if (!fintechAnimation || !balanceAnimation)
    return <div>Loading animations...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-pink-50 to-blue-100 min-h-screen space-y-8 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute bg-indigo-100 rounded-full opacity-30 animate-bubble"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 p-6 rounded-2xl shadow-sm relative z-10 backdrop-blur-lg">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, Avantika 👋 — Here's a quick look at your finances.
          </p>
        </div>
        <div className="w-52 md:w-64">
          <Lottie animationData={fintechAnimation} loop={true} />
        </div>
      </div>

      {/* Summary Section */}
      <div className="relative z-10 my-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-56 md:w-72">
          <Lottie animationData={balanceAnimation} loop={true} />
        </div>
        <div className="flex-1">
          <SummaryCard transactions={transactions} />
        </div>
      </div>

      {/* Add Transaction */}
      <section className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-6 relative z-10 my-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add a New Transaction
        </h2>
        <AddTransaction onTransactionAdded={addTransaction} />
      </section>

      {/* Transaction List */}
      <section className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl p-6 relative z-10 my-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h2>
        <TransactionList transactions={transactions} />
      </section>

      {/* ===== AI INSIGHTS SECTION ===== */}
      <div className="mt-10">
        <div className="ai-card bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-gray-200 transition-all hover:shadow-md">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#2563eb"
                className="w-7 h-7 animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m4 0a9 9 0 11-8-8.94"
                />
              </svg>
              <div className="absolute -bottom-1 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                AI Financial Insights
              </h2>
              <p className="text-sm text-gray-500">
                Personalized suggestions to optimize your expenses
              </p>
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-white rounded-xl p-5 shadow-inner border border-gray-100 transition-all hover:scale-[1.01]">
            <p className="text-gray-700 text-lg leading-relaxed">{aiInsight}</p>
          </div>

          {/* Tip Card */}
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl p-5 shadow-inner border border-gray-100 mt-4">
            <p className="text-gray-700 text-lg leading-relaxed">🧠 {aiTip}</p>
          </div>

          {/* Regenerate */}
          <div
            className="flex items-center justify-end mt-4 text-sm text-blue-600 font-medium hover:underline cursor-pointer"
            onClick={() => {
              const newTips = [
                "Try saving ₹500 more this week 💰",
                "You spent 20% more on food this month 🍴",
                "Keep up your consistent savings — great job 👏",
                "Consider setting a monthly goal for utilities ⚡",
                "Track small daily expenses — they add up fast 🕒",
              ];
              const random = Math.floor(Math.random() * newTips.length);
              setAiTip(newTips[random]);
            }}
          >
            Regenerate Tip ↻
          </div>
        </div>
      </div>

      {/* Bubble Animation */}
      <style>{`
        @keyframes bubble {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-50vh) scale(1); opacity: 0; }
        }
        .animate-bubble {
          animation: bubble 15s linear infinite;
        }
        @keyframes glow {
          0% { box-shadow: 0 0 8px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 20px rgba(59,130,246,0.4); }
          100% { box-shadow: 0 0 8px rgba(59,130,246,0.2); }
        }
        .ai-card:hover {
          animation: glow 2s infinite;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}