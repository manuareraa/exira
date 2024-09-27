import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { AppKitProvider } from "./ReOwnConfig.tsx";

// nullish the console.log for production
console.log = () => {};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <AppKitProvider>
        <Router>
          <App />
        </Router>
      </AppKitProvider>
    </NextUIProvider>
  </StrictMode>
);
