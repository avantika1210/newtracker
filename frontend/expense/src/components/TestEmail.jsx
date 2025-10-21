import React from "react";
import { functions, httpsCallable } from "../firebase"; // ✅ correct import path

const TestEmail = () => {
  const handleSend = async () => {
    const sendTransactionEmail = httpsCallable(functions, "sendTransactionEmail");

    try {
      const res = await sendTransactionEmail({
        userEmail: "example@gmail.com",
        transaction: {
          title: "Test Tx",
          type: "Expense",
          amount: 500,
          category: "Food",
          date: "2025-10-16",
        },
      });
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Test Email
      </button>
    </div>
  );
};

export default TestEmail;