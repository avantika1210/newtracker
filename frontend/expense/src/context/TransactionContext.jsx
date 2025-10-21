// src/context/TransactionContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  getTransactions,
  addTransaction as addTxAPI,
  deleteTransaction as delTxAPI,
  updateTransaction as updateTxAPI,
} from "../utils/api";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions once when app loads
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  // Add a new transaction
  const addTransaction = async (t) => {
    try {
      const res = await addTxAPI(t);
      setTransactions([...transactions, res.data]);
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      await delTxAPI(id);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete transaction:", err);
    }
  };

  // Update a transaction
  const updateTransaction = async (updated) => {
    try {
      const res = await updateTxAPI(updated._id, updated);
      setTransactions(
        transactions.map((t) => (t._id === updated._id ? res.data : t))
      );
    } catch (err) {
      console.error("Failed to update transaction:", err);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};