import React, { useState } from "react";
import { addTransaction } from "../../utils/api";

export default function AddTransaction({ token, onTransactionAdded }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!text || !amount) return;

  try {
    const transactionData = {
      title: text,                    
      amount: parseFloat(amount),
      type: parseFloat(amount) > 0 ? "income" : "expense", 
    };
const res = await addTransaction({
  title: text,                   
  amount: parseFloat(amount),     
  type: amount >= 0 ? "income" : "expense", 
});
    onTransactionAdded(res.data.transaction);
    setText("");
    setAmount("");
  } catch (err) {
    console.error("Failed to add transaction:", err);
    alert("Transaction could not be added. Try again!");
  }
};

  return (
    <div className="w-full flex justify-center py-10 bg-blue-50">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 shadow-xl rounded-2xl p-6 w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter description..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 placeholder-gray-400 transition"
          />
          <input
            type="number"
            placeholder="Enter amount (use - for expense)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 placeholder-gray-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}