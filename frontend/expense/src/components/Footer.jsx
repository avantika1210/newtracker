export default function Footer() {
  return (
    <footer className="py-6 bg-gray-800 text-white text-center">
      <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:text-gray-400">About</a>
        <a href="#" className="hover:text-gray-400">Privacy</a>
        <a href="#" className="hover:text-gray-400">Contact</a>
      </div>
    </footer>
  );
}