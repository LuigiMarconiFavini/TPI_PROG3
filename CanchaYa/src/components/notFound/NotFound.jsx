import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/images/imagen-arbitro.jpg"
          alt="Árbitro mostrando fuera de juego"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center max-w-md">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
            Lo sentimos, no pudimos encontrar la página que buscás.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
