// src/components/SummaryCard.jsx
import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

export default function SummaryCard({ transactions = [] }) {
  // Ensure transactions is always an array
  const txs = Array.isArray(transactions) ? transactions : [];

  const income = txs
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const expense = txs
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const balance = income + expense;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto mb-6 transform transition duration-300 hover:scale-105">
      {/* Balance */}
      <h2 className="text-xl font-medium text-gray-700 text-center">Current Balance</h2>
      <h3 className="text-4xl font-bold text-gray-900 text-center my-4">₹{balance.toFixed(2)}</h3>

      {/* Income & Expense */}
      <div className="flex justify-between gap-6 mt-4">
        <div className="flex flex-col items-center bg-green-50 p-4 rounded-xl w-1/2 shadow-sm">
          <div className="flex items-center gap-1 text-green-600">
            <ArrowUpIcon className="w-5 h-5" />
            <p className="font-medium text-gray-600">Income</p>
          </div>
          <p className="text-green-700 font-semibold text-lg mt-1">₹{income.toFixed(2)}</p>
        </div>

        <div className="flex flex-col items-center bg-red-50 p-4 rounded-xl w-1/2 shadow-sm">
          <div className="flex items-center gap-1 text-red-600">
            <ArrowDownIcon className="w-5 h-5" />
            <p className="font-medium text-gray-600">Expense</p>
          </div>
          <p className="text-red-700 font-semibold text-lg mt-1">₹{Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}