// src/components/TransactionList.jsx
import React from "react";
import { deleteTransaction } from "../../utils/api";

export default function TransactionList({ transactions, token, onDelete = () => {} }) {
  // Ensure transactions is always an array
  const txs = Array.isArray(transactions) ? transactions : [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await deleteTransaction(id, token);
      onDelete(id); // parent state update
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete transaction. Try again!");
    }
  };

  if (txs.length === 0) {
    return (
      <div className="w-full flex justify-center py-10 bg-blue-50">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center text-gray-500">
          No transactions yet
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-10 bg-blue-50">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Transaction History
        </h2>

        <ul className="space-y-3">
          {txs.map((t) => {
            const dateObj = new Date(t.date);
            const formattedDate = dateObj.toLocaleDateString();
            const formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <li
                key={t.id || t._id}
                className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-sm border-l-4 transition-colors ${
                  t.amount > 0
                    ? "border-green-400 bg-green-50 hover:bg-green-100"
                    : "border-indigo-400 bg-indigo-50 hover:bg-indigo-100"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">{t.text || t.title}</span>
                  <span className="text-gray-400 text-sm">{formattedDate} | {formattedTime}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${t.amount > 0 ? "text-green-600" : "text-indigo-600"}`}>
                    ₹{t.amount}
                  </span>
                  <button
                    onClick={() => handleDelete(t.id || t._id)}
                    className="text-gray-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}