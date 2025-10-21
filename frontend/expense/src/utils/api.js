// src/utils/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // ✅ your backend port

// ✅ USER AUTH API
export const signupUser = async (userData) => {
  return await axios.post(`${BASE_URL}/auth/signup`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${BASE_URL}/auth/login`, userData);
};

// ✅ TRANSACTION APIs

// Get all transactions
export const getTransactions = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in first.");

  const res = await axios.get(`${BASE_URL}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// Add a new transaction
export const addTransaction = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in first.");

  const res = await axios.post(`${BASE_URL}/transactions`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in first.");

  const res = await axios.delete(`${BASE_URL}/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// ✅ UPDATE transaction (was missing earlier)
export const updateTransaction = async (id, updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in first.");

  const res = await axios.put(`${BASE_URL}/transactions/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};