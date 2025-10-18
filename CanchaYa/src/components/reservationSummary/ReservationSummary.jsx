import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../services/auth.context";
import {
  showSuccessToast,
  showErrorToast,
} from "../../toast/toastNotifications.jsX";

const ReservationSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, token } = useContext(AuthenticationContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok)
          throw new Error("No se pudo cargar la información del usuario");
        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        showErrorToast("Error al cargar datos del usuario");
      }
    };

    fetchUser();
  }, [user.id, token]);

  if (!state) {
    return (
      <div className="text-center py-20 text-red-600">
        No hay información de reserva. Volvé a seleccionar una cancha.
      </div>
    );
  }

  const { cancha, fecha, horarioSeleccionado } = state;

  const handleReserva = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          canchaId: cancha.id,
          userId: user.id,
          fechaReserva: fecha,
          horaReserva: horarioSeleccionado,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al reservar");
      }

      showSuccessToast("Reserva confirmada ✅");
      navigate("/");
    } catch (err) {
      showErrorToast("Error al confirmar reserva: " + err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-8xl mx-auto px-8 flex-1">
        {/* Botón CanchaYa */}
        <button
          onClick={() => navigate("/")}
          className="text-4xl font-bold text-blue-600 hover:text-blue-800 mb-4 dark:text-blue-400 dark:hover:text-blue-500"
        >
          CanchaYa
        </button>

        {/* Título */}
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          ¡Ya casi terminamos!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Para completar tu reserva en{" "}
          <span className="font-semibold">
            {cancha?.nombre || "Nombre del complejo deportivo"}
          </span>
          , por favor chequeá tus datos y luego confirmá.
        </p>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8">
          {/* Columna izquierda */}
          <div className="space-y-6">
            <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-sm space-y-4 bg-gray-50 dark:bg-gray-800 transition-colors">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {cancha?.nombre}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">📍 {cancha?.direccion}</p>

              <div className="space-y-4">
                <div>
                  <p className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>📅 Fecha</span> <span>{fecha}</span>
                  </p>
                  <hr className="mt-2 border-gray-300 dark:border-gray-700" />
                </div>
                <div>
                  <p className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>⏰ Turno</span> <span>{horarioSeleccionado}</span>
                  </p>
                  <hr className="mt-2 border-gray-300 dark:border-gray-700" />
                </div>
                <div>
                  <p className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>⚽ Cancha</span>{" "}
                    <span>
                      {cancha.tipo} - {cancha.deporte}
                    </span>
                  </p>

                  <hr className="mt-2 border-gray-300 dark:border-gray-700" />
                </div>

                {/* Promoción */}
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-xl shadow-sm flex justify-between items-center mt-2">
                  <div>
                    <p className="text-yellow-800 dark:text-yellow-300 font-semibold">
                      🎁 Promoción: 10% de descuento
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
                <p className="flex justify-between font-semibold text-gray-800 dark:text-gray-100 mt-4">
                  <span>💰 Precio final</span> <span>${cancha?.precio}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-6">
            {/* Información personal */}
            <div className="border border-gray-300 dark:border-gray-700 
                          rounded-xl p-5 shadow-sm bg-white dark:bg-gray-800 transition-colors">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                👤 Información personal
              </h2>
              <hr className="mb-3 border-gray-300 dark:border-gray-700" />
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 
                              border border-gray-300 dark:border-gray-700 
                              rounded-lg p-2 bg-white dark:bg-gray-700 
                              hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                  👤
                  <input
                    type="text"
                    value={userInfo?.username}
                    className="w-full bg-transparent outline-none 
                              text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2 
                              border border-gray-300 dark:border-gray-700 
                              rounded-lg p-2 bg-white dark:bg-gray-700 
                              hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                  📞
                  <input
                    type="text"
                    value={userInfo?.phone}
                    className="w-full bg-transparent outline-none 
                              text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2 
                              border border-gray-300 dark:border-gray-700 
                              rounded-lg p-2 bg-white dark:bg-gray-700 
                              hover:bg-gray-50 dark:hover:bg-gray-600 
                              transition md:col-span-2">
                  ✉️
                  <input
                    type="email"
                    value={userInfo?.email}
                    className="w-full bg-transparent outline-none 
                            text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>
              </form>
            </div>

            {/* Contenedor de pago */}
            <div className="border border-gray-300 dark:border-gray-700 
                          rounded-xl p-5 shadow-sm bg-white dark:bg-gray-800 transition-colors">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                💳 Sobre el pago
              </h2>
              <hr className="mb-3 border-gray-300 dark:border-gray-700" />
              <div className="bg-blue-50 dark:bg-blue-900/30 
                            p-5 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm">
                <p className="text-blue-900 dark:text-blue-300 font-medium flex items-center gap-2">
                  El método de pago será definido por el complejo deportivo.
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Recomendamos revisar las aclaraciones del club y estar atentos
                  a posibles comunicaciones luego de realizar la reserva.
                </p>
              </div>
            </div>

            {/* Botón confirmar reserva */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleReserva}
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
};

export default ReservationSummary;
