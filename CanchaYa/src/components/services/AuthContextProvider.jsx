import { useMemo, useState } from "react";
import { AuthenticationContext } from "./auth.context";
import { decodeToken, isTokenValid } from "./auth.helpers";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const tokenValue = localStorage.getItem("canchaYa-token");

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  const handleUserLogin = (token) => {
    localStorage.setItem("canchaYa-token", token);
    setToken(token);
  };

  const handleUserLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Vas a salir de tu cuenta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("canchaYa-token");
      setToken(null);

      toast.success("Cerraste sesión correctamente 👋", {
        duration: 3000,
        position: "top-center",
      });
    }
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
