import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

// redefine console.log function to nothing
if (import.meta.env.VITE_ENV !== "development") {
  console.log = () => {};
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <Router>
        <App />
      </Router>
    </NextUIProvider>
  </StrictMode>
);
