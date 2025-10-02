import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { AuthenticationContext } from "../services/auth.context";

const Navbar = () => {
  const { token, handleUserLogout, user } = useContext(AuthenticationContext);

  const loggedIn = !!token;
  const role = user?.role;

  return (
    <div className="w-full top-0 py-2 bg-gray-100 dark:bg-gray-900 shadow z-50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        {/* FALTA Logo */}
        <Link to="/">
          <h2 className="text-black dark:text-white font-bold text-2xl transition-colors duration-300">
            CanchaYa
          </h2>
        </Link>

        <div className="hidden lg:flex space-x-8 items-center text-base font-bold text-black/80 dark:text-gray-200 transition-colors duration-300">
          <Link to="/" className="hover:underline hover:underline-offset-4">
            Inicio
          </Link>
          <Link
            to="/services"
            className="hover:underline hover:underline-offset-4"
          >
            Reservar Cancha
          </Link>
          <Link
            to={loggedIn ? "/promotions/private" : "/promotions"}
            className="hover:underline hover:underline-offset-4"
          >
            {loggedIn ? "Mis Promociones" : "Promociones"}
          </Link>
          <Link
            to="/contact"
            className="hover:underline hover:underline-offset-4"
          >
            Contactanos
          </Link>
          <Link
            to="/my-profile"
            className="hover:underline hover:underline-offset-4"
          >
            Mi Perfil
          </Link>
          {/* ----------------------------------------------- */}
          {role === "sysadmin" && (
            <Link to="/all-users" className="text-red-500">
              Ver Usuarios
            </Link>
          )}
        </div>

        <div className="hidden lg:flex lg:items-center gap-x-2">
          <ThemeToggle />
          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="flex items-center justify-center rounded-md bg-indigo-500 text-white px-6 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center rounded-md bg-indigo-500 text-white px-6 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={handleUserLogout}
              className="flex items-center justify-center rounded-md bg-indigo-500 text-white px-6 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
