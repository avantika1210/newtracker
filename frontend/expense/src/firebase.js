// firebase.js
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions"; // ✅ add connectFunctionsEmulator

const firebaseConfig = {
  apiKey: "AIzaSyC70hOm9aoqTYkrlwbHls8uu3q8__-f-3o",
  authDomain: "expensetracker-6048c.firebaseapp.com",
  projectId: "expensetracker-6048c",
  storageBucket: "expensetracker-6048c.firebasestorage.app",
  messagingSenderId: "135008987811",
  appId: "1:135008987811:web:6db1d1f1f8231650ecad16",
  measurementId: "G-SP2EB6W1CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// 🔹 Connect to local emulator
connectFunctionsEmulator(functions, "127.0.0.1", 5002);

export { functions, httpsCallable };