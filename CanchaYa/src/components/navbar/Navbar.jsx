import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, onSignOut }) => {
  const handleClick = () => {
    onSignOut();
  };

  return (
    <div className="w-full top-0 py-2 bg-white shadow z-50">
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h2 className="text-black font-bold text-2xl">CanchaYa</h2>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex space-x-8 items-center text-base font-bold text-black/80">
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
            to="/my-reservations"
            className="hover:underline hover:underline-offset-4"
          >
            Mis Reservas
          </Link>
          <Link
            to="/my-profile"
            className="hover:underline hover:underline-offset-4"
          >
            Mi Perfil
          </Link>
          <Link
            to="/contact"
            className="hover:underline hover:underline-offset-4"
          >
            Contactanos
          </Link>
        </div>

        {/* Botones */}
        <div className="hidden lg:flex lg:items-center gap-x-2">
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
              onClick={handleClick}
              className="flex items-center justify-center rounded-md bg-indigo-500 text-white px-6 py-2.5 font-semibold hover:bg-indigo-600 transition duration-200"
            >
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* Mobile menu (hamburguesa) */}
        <div className="flex lg:hidden">
          <button className="focus:outline-none text-slate-800 dark:text-white">
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="text-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
