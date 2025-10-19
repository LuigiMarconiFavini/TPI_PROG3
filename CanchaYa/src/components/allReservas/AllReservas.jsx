import React, { useContext, useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
  showConfirmToast,
} from "../../toast/toastNotifications.jsX";
import { AuthenticationContext } from "../services/auth.context";
import { useNavigate } from "react-router-dom";

const AllReservas = () => {
  const { user, token } = useContext(AuthenticationContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchReservas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/reservas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al cargar reservas");
      const data = await res.json();
      setReservas(data);
    } catch (err) {
      setError(err.message);
      showErrorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  // Solo admin o sysadmin
  if (!user) {
    return (
      <div className="text-center py-20 text-red-600">
        No tenés permiso para ver esta página.
      </div>
    );
  }

  if (user.role !== "admin" && user.role !== "sysadmin") {
    return (
      <div className="text-center py-20 text-red-600">
        No tenés permisos para ver todas las reservas.
      </div>
    );
  }

  const handleEliminar = (reservaId) => {
    showConfirmToast("¿Seguro que deseas eliminar esta reserva?", async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/reservas/${reservaId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("No se pudo eliminar la reserva");

        setReservas((prev) =>
          prev.filter((r) => r.idReserva !== reservaId && r.id !== reservaId)
        );
        showSuccessToast("Reserva eliminada ✅");
      } catch (err) {
        showErrorToast("Error al eliminar: " + err.message);
      }
    });
  };

  const handleVolver = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-800 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-4">
        Todas las Reservas
      </h1>

      {loading && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Cargando reservas...
        </p>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong> <span>{error}</span>
        </div>
      )}

      {!loading && !error && reservas.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No hay reservas registradas.
        </p>
      )}

      {!loading && !error && reservas.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cancha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Deporte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Horario
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {reservas.map((r) => (
                <tr
                  key={r.idReserva || r.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {r.usuario?.username} ({r.usuario?.email})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {r.cancha?.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {r.cancha?.deporte}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {r.fechaReserva}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {r.horaReserva}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleEliminar(r.idReserva || r.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botón de volver a inicio */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleVolver}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition"
        >
          Volver a inicio
        </button>
      </div>
    </div>
  );
};

export default AllReservas;