import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationSummary() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-10 flex flex-col">
      {/* Contenedor central con ancho limitado */}
      <div className="max-w-8xl mx-auto px-8 flex-1">
        {/* Botón CanchaYa */}
        <button
          onClick={() => navigate("/")}
          className="text-4xl font-bold text-blue-600 hover:text-blue-800 mb-4"
        >
          CanchaYa
        </button>

        {/* Breadcrumb */}
        <nav className="text-gray-500 text-lg mb-8" aria-label="breadcrumb">
          <ol className="list-reset flex space-x-2">
            <li>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                Deporte
              </span>
              <span className="mx-2">{">"}</span>
            </li>
            <li>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                Fútbol
              </span>
              <span className="mx-2">{">"}</span>
            </li>
            <li>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate("/")}
              >
                NombreDelComplejo
              </span>
              <span className="mx-2">{">"}</span>
            </li>
            <li className="text-gray-800 font-semibold">Reservar</li>
          </ol>
        </nav>

        {/* Título */}
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Ya casi terminamos!
        </h1>
        <p className="text-gray-600 mb-10">
          Para completar tu reserva en{" "}
          <span className="font-semibold">Nombre del complejo deportivo</span>, por favor chequeá
          tus datos y luego confirmá.
        </p>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8">
          {/* Columna izquierda */}
          <div className="space-y-6">
            <div className="border rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Nombre del complejo deportivo
              </h2>
              <p className="text-sm text-gray-600">📍 Pasaje Madrid 451, Rosario</p>

              <div className="space-y-4">
                <div>
                  <p className="flex justify-between text-gray-700">
                    <span>📅 Fecha</span> <span>vie. 19/09/2025</span>
                  </p>
                  <hr className="mt-2" />
                </div>
                <div>
                  <p className="flex justify-between text-gray-700">
                    <span>⏰ Turno</span> <span>16:00 - 17:00</span>
                  </p>
                  <hr className="mt-2" />
                </div>
                <div>
                  <p className="flex justify-between text-gray-700">
                    <span>⚽ Cancha</span> <span>Cancha 2 - Fútbol 5</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Césped sintético · Con iluminación · Descubierta
                  </p>
                  <hr className="mt-2" />
                </div>

                {/* Promoción */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-sm flex justify-between items-center mt-2">
                  <div>
                    <p className="text-yellow-800 font-semibold">
                      🎁 Promoción: 10% de descuento
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Aplicable gracias a nuestras promociones exclusivas.
                    </p>
                  </div>
                  <button
                    onClick={() => alert("Funcionalidad pendiente")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Aplicar
                  </button>
                </div>

                {/* Precio final */}
                <p className="flex justify-between font-semibold text-gray-800 mt-4">
                  <span>💰 Precio final</span> <span>$49.000</span>
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Información personal */}
            <div className="border rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                👤 Información personal
              </h2>
              <hr className="mb-3" />
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 border rounded-lg p-2 hover:bg-gray-50 transition">
                  👤
                  <input
                    type="text"
                    value="Luigi Marconi Favini"
                    className="w-full bg-transparent outline-none"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2 border rounded-lg p-2 hover:bg-gray-50 transition">
                  📞
                  <input
                    type="text"
                    value="+54 3416106492"
                    className="w-full bg-transparent outline-none"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2 border rounded-lg p-2 hover:bg-gray-50 transition md:col-span-2">
                  ✉️
                  <input
                    type="email"
                    value="luigimarconifavini@gmail.com"
                    className="w-full bg-transparent outline-none"
                    readOnly
                  />
                </div>
              </form>
            </div>


            {/* Contenedor de pago */}
            <div className="border rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                💳 Sobre el pago
              </h2>
              <hr className="mb-3" />
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm">
                <p className="text-blue-900 font-medium flex items-center gap-2">
                  El método de pago será definido por el complejo deportivo.
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Recomendamos revisar las aclaraciones del club y estar atentos a
                  posibles comunicaciones luego de realizar la reserva.
                </p>
              </div>
            </div>

            {/* Botón confirmar reserva: ocupa la mitad del contenedor derecho */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => alert("Funcionalidad pendiente")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 w-1/2 rounded-full text-base transition"
              >
                ✅ Confirmar reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}