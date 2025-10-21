import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function InteractiveIllustration() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}animations/Charts.json`)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading animation:", err));
  }, []);

  return (
    <section id="illustration"
     className="py-24 bg-gradient-to-b from-white to-blue-50 flex justify-center items-center relative overflow-hidden">
      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-ping"></div>

      <div className="text-center relative z-10 max-w-3xl px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-800">
          Visualize Your Spending
        </h2>
        <p className="mb-10 text-lg md:text-xl text-gray-700">
          Interactive charts and dynamic animations bring your financial data to life — making tracking smarter and more engaging.
        </p>

       <div className="w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] mx-auto drop-shadow-2xl">
  {animationData ? (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: "100%", height: "100%" }}
    />
  ) : (
    <p className="text-gray-400">Loading animation...</p>
  )}
</div>

        <button className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition duration-300">
          See Your Dashboard
        </button>
      </div>
    </section>
  );
}