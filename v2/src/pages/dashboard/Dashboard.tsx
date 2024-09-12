import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const Dashboard: React.FC = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string>("All Properties");

  const menuItems = [
    { name: "All Properties", icon: "🏠" },
    { name: "Launchpad / Invest", icon: "🚀" },
    { name: "Buy / Trade", icon: "💱" },
  ];

  const accountItems = [
    { name: "Your Portfolio", icon: "📊" },
    { name: "Transaction History", icon: "📜" },
    { name: "Property Management", icon: "🏗️" },
    { name: "Account", icon: "👤" },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-gray-100 border-r border-gray-200">
        <div className="p-6">
          <h1 className="mb-8 text-2xl font-bold">Exira</h1>
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-xs font-semibold text-gray-500">
                Marketplace
              </h2>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                      activeMenu === item.name
                        ? "bg-gray-200"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveMenu(item.name)}
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-xs font-semibold text-gray-500">
                Your Account
              </h2>
              <ul className="space-y-2">
                {accountItems.map((item) => (
                  <li
                    key={item.name}
                    className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                      activeMenu === item.name
                        ? "bg-gray-200"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveMenu(item.name)}
                  >
                    <span>{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">All Properties</h2>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm text-white bg-black rounded-full">
              Sign In / Up
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
