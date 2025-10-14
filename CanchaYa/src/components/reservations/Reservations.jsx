import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../services/auth.context";
import {
  showErrorToast,
  showSuccessToast,
} from "../../toast/toastNotifications.jsX";

const Reservations = () => {
  const { user, token } = useContext(AuthenticationContext);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        let url = "http://localhost:3000/api/reservas";

        // Si el usuario NO es admin o superadmin, solo traemos sus reservas
        if (user.role !== "Admin" && user.role !== "SuperAdmin") {
          url += `?userId=${user.id}`;
        }

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al cargar reservas");
        const data = await res.json();
        setReservas(data);
        showSuccessToast("Reservas cargadas");
      } catch (err) {
        showErrorToast("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [user, token]);

  if (loading) return <p className="text-center">Cargando reservas...</p>;
  if (!reservas.length)
    return <p className="text-center text-gray-500">No hay reservas.</p>;

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-center text-3xl font-bold mb-4">Mis Reservas</h1>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
        Aquí puedes ver{" "}
        {user.role === "admin" || user.role === "sysadmin"
          ? "todas las reservas"
          : "tus reservas realizadas"}
        .
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reservas.map((r) => (
          <div
            key={r.idReserva || r.id}
            className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow"
          >
            <p>
              <strong>Cancha:</strong> {r.cancha?.nombre}
            </p>
            <p>
              <strong>Deporte:</strong> {r.cancha?.deporte}
            </p>
            <p>
              <strong>Tipo:</strong> {r.cancha?.tipo}
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
        ))}
      </div>
    </div>
  );
};

export default Reservations;
