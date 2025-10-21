// Base URL of your backend
export const BASE_URL = "http://localhost:8080/api";

// ---------------- Auth Routes -----------------
export const AUTH_ROUTES = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,

};

// ---------------- Transaction Routes -----------------
export const TRANSACTION_ROUTES = {
  GET_ALL: `${BASE_URL}/transactions`,
  ADD: `${BASE_URL}/transactions`,
  UPDATE: (id) => `${BASE_URL}/transactions/${id}`,
  DELETE: (id) => `${BASE_URL}/transactions/${id}`,
};