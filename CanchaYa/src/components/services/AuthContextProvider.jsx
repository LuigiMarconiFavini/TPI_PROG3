import { useState } from "react";
import { AuthenticationContext } from "./auth.context";

const tokenValue = localStorage.getItem("canchaYa-token");

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  const handleUserLogin = (token) => {
    localStorage.setItem("canchaYa-token", token);
    setToken(token);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("canchaYa-token");
    setToken(null);
  };

  return (
    <AuthenticationContext value={{ token, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthenticationContext>
  );
};
