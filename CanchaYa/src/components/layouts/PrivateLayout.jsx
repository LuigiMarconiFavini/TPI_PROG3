import React from "react";
import Navbar from "../navbar/Navbar";

const PrivateLayout = ({ children, loggedIn, onSignOut }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar recibe la función onSignOut */}
      <Navbar loggedIn={loggedIn} onSignOut={onSignOut} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default PrivateLayout;

