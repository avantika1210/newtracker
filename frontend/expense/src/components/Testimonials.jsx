import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  { name: "Aarav", quote: "This app made managing my expenses so easy!" },
  { name: "Sanya", quote: "Love the charts and quick-add features." },
  { name: "Rohit", quote: "Finally, I can track my income & expenses in one place." },
];

export default function Testimonials() {
  return (
    <section id="testimonials"
    className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
        What Our Users Say 💬
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {reviews.map((r, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="relative bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <Quote className="text-purple-400 absolute top-4 left-4 opacity-50 w-6 h-6" />
            <p className="text-gray-700 italic leading-relaxed mb-6 mt-4">
              “{r.quote}”
            </p>
            <h4 className="font-semibold text-lg text-gray-800">— {r.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}