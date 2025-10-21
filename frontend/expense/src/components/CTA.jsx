import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="CTA"
    className="relative py-28 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 text-gray-900 text-center overflow-hidden">
      {/* Subtle animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-200 to-transparent opacity-20 blur-2xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Take Control of Your Finances 
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Track your income, expenses, and savings seamlessly — all in one dashboard designed for clarity and simplicity.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-12 py-4 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300"
        >
          Get Started Now
        </motion.button>
      </div>
    </section>
  );
}