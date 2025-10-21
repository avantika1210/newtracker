import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-wide">
          ExpenseTracker
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-black font-medium uppercase tracking-wide">
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#illustration" className="hover:text-blue-500">Illustration</a>
          <a href="#testimonials" className="hover:text-blue-500">Testimonials</a>
          <a href="#CTA" className="hover:text-blue-500">CTA</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/signup">
            <button className={`px-5 py-2 rounded-lg shadow-md transition ${location.pathname === "/signup" ? "bg-blue-700 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className={`px-5 py-2 rounded-lg shadow-md transition border border-blue-600 ${location.pathname === "/login" ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-600 hover:text-white"}`}>
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-blue-800 text-3xl cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>☰</div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200 flex flex-col gap-4 p-4 z-50">
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#illustration" className="hover:text-blue-500">Illustration</a>
          <a href="#testimonials" className="hover:text-blue-500">Testimonials</a>
          <a href="#CTA" className="hover:text-blue-500">CTA</a>
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg w-full hover:bg-blue-600 hover:text-white">Login</button>
          </Link>
        </div>
      )}
    </nav>
  );
}