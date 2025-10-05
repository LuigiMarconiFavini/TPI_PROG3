import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { AuthenticationContext } from "../services/auth.context";
import NewCourts from "../newCourts/NewCourts";

const Navbar = () => {
  const { token, handleUserLogout, user } = useContext(AuthenticationContext);
  const loggedIn = !!token;
  const role = user?.role;

  const [openNewCourt, setOpenNewCourt] = useState(false);

  return (
    <div className="w-full top-0 py-2 bg-gray-100 dark:bg-gray-900 shadow z-50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h2 className="text-black dark:text-white font-bold text-2xl transition-colors duration-300">
            CanchaYa
          </h2>
        </Link>

        {/* Links principales */}
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

          {/* Botón Nueva Cancha solo para admin/sysadmin */}
          {(role === "admin" || role === "sysadmin") && (
            <button
              onClick={() => setOpenNewCourt(true)}
              className="ml-4 flex items-center justify-center rounded-md bg-green-500 text-white px-4 py-2 font-semibold hover:bg-green-600 transition duration-200"
            >
              Nueva Cancha
            </button>
          )}

          {/* Link Ver Usuarios solo para sysadmin */}
          {role === "sysadmin" && (
            <Link to="/all-users" className="text-red-500">
              Ver Usuarios
            </Link>
          )}
        </div>

        {/* Botones de login/logout y toggle */}
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

      {/* Modal Nueva Cancha */}
      {openNewCourt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setOpenNewCourt(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold text-lg"
            >
              ✕
            </button>
            <NewCourts onSaved={() => setOpenNewCourt(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
