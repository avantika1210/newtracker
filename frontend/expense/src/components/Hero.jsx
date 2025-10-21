export default function Hero() {
  return (
    <section 
      className="h-screen flex flex-col justify-center items-center text-white relative bg-cover bg-center"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      <div className="bg-black/40 w-full h-full absolute top-0 left-0"></div> {/* Overlay for readability */}

      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Track Your Expenses Effortlessly
        </h1>
        <p className="text-2xl md:text-3xl mb-8 max-w-2xl drop-shadow-md">
          Manage your income, expenses, and budget all in one place
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md hover:shadow-lg">
            Sign Up
          </button>
          <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-500 transition shadow-md hover:shadow-lg">
            Login
          </button>
        </div>
      </div>

      {/* Optional: Small animated illustration */}
      <div className="absolute bottom-10 animate-bounce text-4xl z-10">
        💰
      </div>
    </section>
  );
}