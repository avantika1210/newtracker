// src/pages/SignupPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignupForm from "../components/Auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
     <main
  className="flex-grow flex justify-center items-center py-20 bg-cover bg-center relative z-0"
  style={{ backgroundImage: `url(/signup.jpg)` }}
>
  <div className="bg-white/90 p-8 rounded-xl shadow-xl max-w-md w-full relative z-10">
    <SignupForm />
  </div>
</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}