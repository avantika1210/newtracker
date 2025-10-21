import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch 💬
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions, feedback, or just want to connect? We’d love to hear from you!
        </p>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div className="flex flex-col items-center">
            <Mail className="w-10 h-10 text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
            <p className="text-gray-600">support@expensetracker.com</p>
          </div>

          <div className="flex flex-col items-center">
            <Phone className="w-10 h-10 text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
            <p className="text-gray-600">Lakhimpur Kheri, Uttar Pradesh</p>
          </div>
        </div>

        <motion.form
          className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>
          </div>

          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-10 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}