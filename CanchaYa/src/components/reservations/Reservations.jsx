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
              Sí, eliminar
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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 lg:px-12">
      <h1 className="text-center text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Mis Reservas
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        {user.role === "admin" || user.role === "sysadmin"
          ? "Aquí puedes ver todas las reservas"
          : "Aquí puedes ver tus reservas realizadas"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservas.map((r) => (
          <div
            key={r.idReserva || r.id}
            className="relative bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {r.cancha?.nombre}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <p>
                <strong>Deporte:</strong> {r.cancha?.deporte}
              </p>
              <p>
                <strong>Fecha:</strong> {r.fechaReserva}
              </p>
              <p>
                <strong>Horario:</strong> {r.horaReserva}
              </p>
              {user.role === "admin" || user.role === "sysadmin" ? (
                <p>
                  <strong>Usuario:</strong> {r.usuario?.username} (
                  {r.usuario?.email})
                </p>
              ) : null}
            </div>

            {/* Botón eliminar */}
            <button
              onClick={() => handleEliminar(r.idReserva || r.id)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
