// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Context
import { TransactionProvider } from "./context/TransactionContext";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InteractiveIllustrations from "./components/InteractiveIllustrations";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Dashboardlayout from "./layouts/Dashboardlayout";
import ProtectedRoute from "./components/ProtectedRoute";
import TestEmail from "./components/TestEmail"; // ✅ Import TestEmail component

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";

// Wrapper to conditionally render Navbar
function Layout({ children }) {
  const location = useLocation();
  const showNavbar = location.pathname === "/"; // Navbar only on home page
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <InteractiveIllustrations />
                  <Testimonials />
                  <CTA />
                  {/* ✅ Test Email Button for testing transaction emails */}
                  <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <TestEmail />
                  </div>
                  <Footer />
                </>
              }
            />

            {/* Auth Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dashboard Layout Routes (Protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboardlayout>
                    <DashboardPage />
                  </Dashboardlayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Dashboardlayout>
                    <TransactionPage />
                  </Dashboardlayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Dashboardlayout>
                    <ProfilePage />
                  </Dashboardlayout>
                </ProtectedRoute>
              }
            />

            {/* Optional: Catch-all route redirects to login */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    </TransactionProvider>
  );
}