// src/components/AIInsights.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"; // if you are using shadcn UI
// ya simple divs bhi use kar sakti ho agar ye dependency nahi hai

const AIInsights = () => {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsight();
  }, []);

  const generateInsight = () => {
    // 🔹 Temporary dummy data (tum baad me backend/AI API se real data fetch kar sakti ho)
    const totalSpent = 12450;
    const highestCategory = "Food & Dining";
    const lastMonthSpent = 10800;
    const diff = totalSpent - lastMonthSpent;

    let message = `💡 This month you spent ₹${totalSpent}. `;
    message += `Your highest spending is on ${highestCategory}. `;
    if (diff > 0)
      message += `That's ₹${diff} more than last month — consider cutting down next time!`;
    else message += `Good job! You saved ₹${Math.abs(diff)} compared to last month!`;

    setInsight(message);
    setLoading(false);
  };

  return (
    <Card className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-md p-5">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-3 text-purple-800">AI Insights 💬</h2>
        {loading ? (
          <p className="text-gray-500 italic">Generating insights...</p>
        ) : (
          <p className="text-gray-700 leading-relaxed">{insight}</p>
        )}
        <button
          onClick={generateInsight}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          🔄 Regenerate Insight
        </button>
      </CardContent>
    </Card>
  );
};

export default AIInsights;