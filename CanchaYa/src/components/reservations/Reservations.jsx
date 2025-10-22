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

  // Estado para edición (modal)
  const [reservaAEditar, setReservaAEditar] = useState(null);
  const [fechaEditar, setFechaEditar] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioEditar, setHorarioEditar] = useState("");

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
    if (user && token) {
      fetchReservas();
    }
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
      { duration: Infinity }
    );
  };

  const abrirPanelEditar = async (reserva) => {
    setReservaAEditar(reserva);
    setFechaEditar(reserva.fechaReserva);
    setHorarioEditar(reserva.horaReserva);

    try {
      const res = await fetch(
        `http://localhost:3000/api/reservas/porFecha?canchaId=${reserva.cancha.id}&fecha=${reserva.fechaReserva}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Error al cargar horarios disponibles");
      const reservasDelDia = await res.json();
      const horariosReservados = reservasDelDia
        .filter((r) => r.id !== reserva.id)
        .map((r) => r.horaReserva);

      const todosHorarios = reserva.cancha.horarios || [];
      const disponibles = todosHorarios.filter(
        (h) => !horariosReservados.includes(h) || h === reserva.horaReserva
      );

      setHorariosDisponibles(disponibles);
    } catch (err) {
      showErrorToast(err.message);
      setHorariosDisponibles([]);
    }
  };

  const handleGuardarCambios = async () => {
    if (!fechaEditar || !horarioEditar) {
      showErrorToast("Fecha y horario son obligatorios");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/reservas/${reservaAEditar.idReserva}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fechaReserva: fechaEditar,
            horaReserva: horarioEditar,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo actualizar la reserva");
      }

      const dataActualizada = data.reserva;

      setReservas((prev) =>
        prev.map((r) =>
          r.idReserva === dataActualizada.idReserva ? { ...r, ...dataActualizada } : r
        )
      );

      showSuccessToast("Reserva actualizada ✅");
      setReservaAEditar(null);
    } catch (err) {
      showErrorToast("Error al actualizar: " + err.message);
    }
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
      className="flex min-h-screen bg-gray-50 dark:bg-gray-900 relative"
      style={{
        backgroundImage: `url("/images/img-fondo-misreservas2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lista de reservas */}
      <div className="flex-1 p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservas.map((r) => (
            <div
              key={`${r.idReserva}-${r.updatedAt}`}
              className="relative bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm flex flex-col"
            >
              {r.cancha?.imagen && (
                <img
                  src={r.cancha.imagen}
                  alt={r.cancha.nombre}
                  className="w-full h-40 object-cover rounded-t-2xl"
                />
              )}

              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {r.cancha?.nombre}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => abrirPanelEditar(r)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm transition shadow-md hover:shadow-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(r.idReserva || r.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm transition shadow-md hover:shadow-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>

                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1 mt-2 flex-1">
                  <p><span className="font-semibold">Deporte:</span> {r.cancha?.deporte}</p>
                  <p><span className="font-semibold">Dirección:</span> {r.cancha?.direccion}</p>
                  <p><span className="font-semibold">Fecha:</span> {r.fechaReserva}</p>
                  <p><span className="font-semibold">Horario:</span> {r.horaReserva}</p>
                  <p><span className="font-semibold">Precio:</span> ${r.cancha?.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*MODAL centrado para editar */}
      {reservaAEditar && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setReservaAEditar(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
              Editar reserva
            </h2>

            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Fecha
            </label>
            <input
              type="date"
              value={fechaEditar}
              onChange={(e) => {
                setFechaEditar(e.target.value);
                if (reservaAEditar.cancha?.id) {
                  fetch(
                    `http://localhost:3000/api/reservas/porFecha?canchaId=${reservaAEditar.cancha.id}&fecha=${e.target.value}`,
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  )
                    .then(async (res) => {
                      if (!res.ok)
                        throw new Error("Error al cargar horarios disponibles");
                      const reservasDelDia = await res.json();
                      const horariosReservados = reservasDelDia
                        .filter((r) => r.id !== reservaAEditar.id)
                        .map((r) => r.horaReserva);

                      const todosHorarios = reservaAEditar.cancha.horarios || [];
                      const disponibles = todosHorarios.filter(
                        (h) =>
                          !horariosReservados.includes(h) ||
                          h === reservaAEditar.horaReserva
                      );

                      setHorariosDisponibles(disponibles);
                      setHorarioEditar("");
                    })
                    .catch(() => {
                      showErrorToast("Error al cargar horarios disponibles");
                      setHorariosDisponibles([]);
                    });
                }
              }}
              className="w-full p-3 mb-4 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Horario
            </label>
            <select
              value={horarioEditar}
              onChange={(e) => setHorarioEditar(e.target.value)}
              className="w-full p-3 mb-6 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">-- Seleccioná un horario --</option>
              {horariosDisponibles.map((h, i) => (
                <option key={i} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setReservaAEditar(null)}
                className="flex-1 py-3 bg-gray-400 hover:bg-gray-500 rounded-md text-white font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCambios}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
