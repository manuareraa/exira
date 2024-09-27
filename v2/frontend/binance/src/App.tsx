import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import AuthMiddleware from "./components/custom/auth/AuthMiddleware";
import Navbar from "./components/custom/Navbar";
import AboutUs from "./pages/AboutUs";
import AllProperties from "./components/custom/dashboard/pages/AllProperties";
import Launchpad from "./components/custom/dashboard/pages/Launchpad";
import Trade from "./components/custom/dashboard/pages/Trade";
import Portfolio from "./components/custom/dashboard/pages/Portfolio";
import History from "./components/custom/dashboard/pages/History";
import PropertyView from "./pages/PropertyView";
import HowItWorks from "./pages/HowItWorks";

import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected === true) {
      console.log("Connected to wallet", address);
    } else {
      console.log("Disconnected from wallet");
      navigate("/");
    }
  }, [isConnected]);

  return (
    <>
      <Toaster />
      {
        // Navbar component
        location.pathname.includes("/dashboard") ? null : <Navbar />
      }
      <div className="">
        {/* Main content area with padding-top to accommodate the Navbar height */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* Private Route with Guard for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <AuthMiddleware>
                <Dashboard>
                  <AllProperties />
                </Dashboard>
              </AuthMiddleware>
            }
          />
          <Route
            path="/dashboard/launchpad"
            element={
              <AuthMiddleware>
                <Dashboard>
                  <Launchpad />
                </Dashboard>
              </AuthMiddleware>
            }
          />
          <Route
            path="/dashboard/trade"
            element={
              <AuthMiddleware>
                <Dashboard>
                  <Trade />
                </Dashboard>
              </AuthMiddleware>
            }
          />
          <Route
            path="/dashboard/portfolio"
            element={
              <AuthMiddleware>
                <Dashboard>
                  <Portfolio />
                </Dashboard>
              </AuthMiddleware>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <AuthMiddleware>
                <Dashboard>
                  <History />
                </Dashboard>
              </AuthMiddleware>
            }
          />

          <Route path="/property/view/:id" element={<PropertyView />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
