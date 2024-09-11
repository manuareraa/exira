import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import AuthMiddleware from "./components/custom/auth/AuthMiddleware";
import Navbar from "./components/custom/Navbar";

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <Navbar />
            <div className="">
              {/* Main content area with padding-top to accommodate the Navbar height */}
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}

                {/* Private Route with Guard for Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <AuthMiddleware>
                      <Dashboard />
                    </AuthMiddleware>
                  }
                />
              </Routes>
            </div>
          </Router>
          {/* <WalletMultiButton /> */}
          {/* <WalletDisconnectButton /> */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
