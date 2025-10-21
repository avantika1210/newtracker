import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext"; // ✅ Import added

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionProvider>  {/* ✅ Wrap your app here */}
      <App />
    </TransactionProvider>
  </StrictMode>
);