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
    <div className="w-full sticky top-0 py-3 bg-gray-100 dark:bg-gray-900 shadow-md z-50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h2 className="text-black dark:text-white font-bold text-2xl tracking-wide">
            CanchaYa
          </h2>
        </Link>

        {/* Links principales */}
        <div className="hidden lg:flex flex-wrap items-center gap-x-6 text-base font-semibold text-black/80 dark:text-gray-200">
          <Link to="/" className="hover:underline hover:underline-offset-4">
            Inicio
          </Link>
          <Link
            to={loggedIn ? "/promotions/private" : "/promotions"}
            className="hover:underline hover:underline-offset-4"
          >
            {loggedIn ? "Mis Promociones" : "Promociones"}
          </Link>
          <Link to="/contact" className="hover:underline hover:underline-offset-4">
            Contactanos
          </Link>
          <Link to="/my-profile" className="hover:underline hover:underline-offset-4">
            Mi Perfil
          </Link>

          {(role === "user" ) && (
            <Link to="/reservations" className="hover:underline hover:underline-offset-4">
            Mis Reservas
          </Link>
          )}


          {(role === "admin" || role === "sysadmin") && (
            <button
              onClick={() => setOpenNewCourt(true)}
              className="ml-2 rounded-md bg-green-500 text-white px-4 py-2 hover:bg-green-600 font-semibold transition duration-200"
            >
              Nueva Cancha
            </button>
          )}

          {role === "sysadmin" && (
            <Link
              to="/all-users"
              className="text-red-500 hover:underline hover:underline-offset-4"
            >
              Ver Usuarios
            </Link>
          )}
        </div>

        {/* Botones derecha */}
        <div className="hidden lg:flex items-center gap-x-4">
          <ThemeToggle />
          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="rounded-md bg-indigo-500 text-white px-5 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-indigo-500 text-white px-5 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={handleUserLogout}
              className="rounded-md bg-indigo-500 text-white px-5 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Modal Nueva Cancha */}
      {openNewCourt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setOpenNewCourt(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
            <NewCourts onSaved={() => setOpenNewCourt(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
