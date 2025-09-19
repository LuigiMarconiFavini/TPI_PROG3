import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const MainLayout = ({ children, loggedIn, onSignOut, hideNavbar = false }) => {
  const location = useLocation();

  // Si estoy en login o register, oculto navbar y footer
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && !hideNavbar && <Navbar loggedIn={loggedIn} onSignOut={onSignOut} />}
      <main className="flex-1">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;


