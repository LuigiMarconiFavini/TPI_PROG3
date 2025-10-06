import { useMemo, useState } from "react";
import { AuthenticationContext } from "./auth.context";
import { decodeToken, isTokenValid } from "./auth.helpers";

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

  const user = useMemo(() => {
    if (!token) return null;
    if (!isTokenValid(token)) return null;
    return decodeToken(token); // devuelve el rol y email.
  }, [token]);

  return (
    <AuthenticationContext.Provider
      value={{ token, user, handleUserLogin, handleUserLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
