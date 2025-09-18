import React from "react";

export default function ReservationSummary() {
  return (
    <div className="bg-white min-h-screen px-6 py-10">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        ¡Ya casi terminamos!
      </h1>
      <p className="text-gray-600 mb-8">
        Para completar tu reserva en{" "}
        <span className="font-semibold">Nombre del complejo deportivo</span>, por favor chequeá
        tus datos y luego confirmá.
      </p>

      {/* Contenedor principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-4">
          <div className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Nombre del complejo deportivo.
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              📍 Pasaje Madrid 451, Rosario
            </p>
            <div className="space-y-3">
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
              <p className="flex justify-between font-semibold text-gray-800">
                <span>💰 Precio</span> <span>$39.000</span>
              </p>
            </div>
          </div>

          {/* Promoción */}
          <div className="border rounded-xl p-5 shadow-sm bg-green-50 flex justify-between items-center">
            <div>
              <p className="text-green-700 font-semibold">
                🎁 Promoción: 10% de descuento
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Aplicable gracias a nuestras promociones exclusivas.
              </p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Usar
            </button>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-4">
          {/* Información personal */}
          <div className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              👤 Información personal
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 border rounded-lg p-2">
                👤
                <input
                  type="text"
                  value="Luigi Marconi Favini"
                  className="w-full bg-transparent outline-none"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2 border rounded-lg p-2">
                📞
                <input
                  type="text"
                  value="+54 3416106492"
                  className="w-full bg-transparent outline-none"
                  readOnly
                />
              </div>
              <div className="flex items-center gap-2 border rounded-lg p-2 md:col-span-2">
                ✉️
                <input
                  type="email"
                  value="luigimarconifavini@gmail.com"
                  className="w-full bg-transparent outline-none"
                  readOnly
                />
              </div>
            </form>
            {/* Línea divisoria debajo de Información personal */}
            <hr className="mt-4" />
          </div>

          {/* Pago */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-700 font-medium flex items-center gap-2">
              💳 El método de pago será definido por el complejo deportivo.
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Recomendamos revisar las aclaraciones del club y estar atentos a
              posibles comunicaciones luego de realizar la reserva.
            </p>
          </div>

          {/* Botón confirmar */}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition">
            ✅ Confirmar reserva
          </button>
        </div>
      </div>
    </div>
  );
}




