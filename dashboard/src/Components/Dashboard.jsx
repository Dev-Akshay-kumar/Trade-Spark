import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import PaletteIcon from "@mui/icons-material/Palette";
import { GeneralContextProvider } from "./GeneralContext";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";

function Dashboard() {
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);

  const toggleWatchList = () => {
    setIsWatchListOpen((prev) => !prev);
  };

  const closeWatchList = () => {
    setIsWatchListOpen(false);
  };

  return (
    <div className="dashboard-container grid grid-cols-6">
      {/* LEFT COLUMN */}
      <div className="col-span-6 md:col-span-2 relative">
        {/* Mobile Toggle Button */}
        <div className="px-4 py-2 md:hidden bg-gray-200/90">
          <PaletteIcon
            size={20}
            className="cursor-pointer"
            onClick={toggleWatchList}
          />
        </div>

        {/* Desktop WatchList */}
        <div className="hidden md:flex h-full">
          <GeneralContextProvider>
            <WatchList />
          </GeneralContextProvider>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`
            fixed top-0 left-0 z-40 h-full w-60 bg-gray-200/90
            transform transition-transform duration-300 ease-in-out space-y-2
            md:hidden
            ${isWatchListOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <PaletteIcon
            size={20}
            className="cursor-pointer m-4"
            onClick={closeWatchList}
          />
          <div className="overflow-y-auto h-full">
            <GeneralContextProvider>
              <WatchList />
            </GeneralContextProvider>
          </div>
        </div>

        {/* Backdrop */}
        {isWatchListOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={closeWatchList}
          />
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="content col-span-6 md:col-span-4 w-full min-w-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/logout" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}
export default Dashboard;
