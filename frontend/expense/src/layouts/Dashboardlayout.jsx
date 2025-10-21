// src/layouts/DashboardLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg rounded-r-xl flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expense Tracker</h2>
        <nav className="flex flex-col space-y-3">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition"
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition"
          >
            Transactions
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition"
          >
            Profile
          </Link>
        </nav>

        {/* Logout Button with sober blue */}
        <Link
          to="/"
          className="mt-auto text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-center font-medium transition"
        >
          Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}