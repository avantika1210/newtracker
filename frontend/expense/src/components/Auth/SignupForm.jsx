import { motion } from "framer-motion";
import { useState } from "react";
import { signupUser } from "../../utils/api"; // ✅ import API
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // ✅ API call to backend
      const res = await signupUser(formData);
      setSuccess("Signup successful! Redirecting to login...");
      console.log("Signup response:", res.data);

      // ✅ Optional: redirect after 2s
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed! Please try again.");
    }
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Start managing your finances with ease. It's free and quick!
        </p>

        {/* ✅ Success or Error messages */}
        {success && (
          <p className="text-green-600 text-center text-sm mb-3">{success}</p>
        )}
        {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-5">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Log In
          </a>
        </p>
      </motion.div>
    </section>
  );
}