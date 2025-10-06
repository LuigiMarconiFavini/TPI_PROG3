import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const MainLayout = ({ children, loggedIn, onSignOut }) => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-[#0b132b] transition-colors duration-300">
      {!hideLayout && <Navbar loggedIn={loggedIn} onSignOut={onSignOut} />}
      <main className="flex-1 bg-gray-50 dark:bg-[#0b132b] transition-colors duration-300">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;


