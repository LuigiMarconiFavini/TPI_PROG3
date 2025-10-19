import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../services/auth.context";
import {
  showErrorToast,
  showSuccessToast,
} from "../../toast/toastNotifications.jsX";
import toast from "react-hot-toast";

const Reservations = () => {
  const { user, token } = useContext(AuthenticationContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    try {
      const url = `http://localhost:3000/api/reservas?userId=${user.id}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al cargar reservas");
      const data = await res.json();
      setReservas(data);
    } catch (err) {
      showErrorToast("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, [user, token]);

  const handleEliminar = (reservaId) => {
    toast.custom(
      (t) => (
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-96 mx-auto text-gray-900 dark:text-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-center">
            ⚠️ Confirmar eliminación
          </h3>
          <p className="text-center mb-6">
            ¿Seguro que querés eliminar esta reserva?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-medium"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              onClick={async () => {
                try {
                  const res = await fetch(
                    `http://localhost:3000/api/reservas/${reservaId}`,
                    {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  if (!res.ok) {
                    const data = await res.json();
                    throw new Error(
                      data.error || "No se pudo eliminar la reserva"
                    );
                  }
                  showSuccessToast("Reserva eliminada ✅");
                  setReservas((prev) =>
                    prev.filter(
                      (item) =>
                        item.id !== reservaId && item.idReserva !== reservaId
                    )
                  );
                } catch (err) {
                  showErrorToast("Error al eliminar: " + err.message);
                } finally {
                  toast.dismiss(t.id);
                }
              }}
            >
              Sí, cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity } // dura hasta que el usuario haga click
    );
  };

  if (loading) return <p className="text-center">Cargando reservas...</p>;
  if (!reservas.length)
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <svg
          className="w-16 h-16 mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m0-4v-2m6 6v-2m0-4V7m-9 8h6m-6-4h6m-6-4h6"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No tienes reservas aún
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Cuando hagas tu primera reserva, aparecerá aquí.
        </p>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-0 px-0 relative"
      style={{
        backgroundImage: `url("/images/img-fondo-misreservas2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Banner full width */}
      <div className="w-full bg-green-600 flex flex-col items-center justify-center py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center">
          Mis Reservas
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl text-center">
          Aquí podrás ver todas tus reservas activas y gestionar tus horarios fácilmente.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservas.map((r) => (
            <div
              key={r.idReserva || r.id}
              className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm flex flex-col"
            >
              {/* Imagen de la cancha */}
              {r.cancha?.imagen && (
                <img
                  src={r.cancha.imagen}
                  alt={r.cancha.nombre}
                  className="w-full h-40 object-cover rounded-t-2xl"
                />
              )}

              <div className="p-6 space-y-3 flex-1 flex flex-col">
                {/* Nombre y botón cancelar */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {r.cancha?.nombre}
                  </h2>
                  <button
                    onClick={() => handleEliminar(r.idReserva || r.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm transition shadow-md hover:shadow-lg"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Detalles */}
                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1 mt-2 flex-1">
                  <p>
                    <span className="font-semibold">Deporte:</span> {r.cancha?.deporte}
                  </p>
                  <p>
                    <span className="font-semibold">Fecha:</span> {r.fechaReserva}
                  </p>
                  <p>
                    <span className="font-semibold">Horario:</span> {r.horaReserva}
                  </p>
                  {user.role === "admin" || user.role === "sysadmin" ? (
                    <p>
                      <span className="font-semibold">Usuario:</span> {r.usuario?.username} (
                      {r.usuario?.email})
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
