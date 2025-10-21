import React from "react";

const features = [
  {
    icon: "/icons/quick.png",
    title: "Quick Add",
    description:
      "Effortlessly add transactions in a single click to stay on top of your finances."
  },
  {
    icon: "/icons/graph.png",
    title: "Charts & Reports",
    description:
      "Visualize income and expenses with clear, interactive charts for better insights."
  },
  {
    icon: "/icons/notification.png",
    title: "Budget Alerts",
    description:
      "Receive timely notifications when you approach or exceed your monthly budget."
  },
  {
    icon: "/icons/budget.png",
    title: "Add Expense / Income",
    description:
      "Record all transactions accurately to maintain a complete financial overview."
  }
];

export default function Features() {
  return (
    <section id="features"
    className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Features
        </h2>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {/* Icon */}
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-20 h-20 mx-auto mb-4"
              />

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}