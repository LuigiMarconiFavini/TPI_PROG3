import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "../../toast/toastNotifications.jsX";
import { AuthenticationContext } from "../services/auth.context";

const MyReservations = () => {
  const { id } = useParams();
  const { user } = useContext(AuthenticationContext);

  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/canchas/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la cancha");
        const data = await response.json();
        setCancha(data);
        // showSuccessToast("Cancha cargada con éxito");
      } catch (err) {
        showErrorToast("Error al cargar la cancha: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCancha();
  }, [id]);

  const handleFechaChange = async (e) => {
    const fechaSeleccionada = e.target.value;
    setFecha(fechaSeleccionada);

    try {
      const res = await fetch(
        `http://localhost:3000/api/reservas/porFecha?canchaId=${id}&fecha=${fechaSeleccionada}`
      );
      const reservas = await res.json();
      const horariosReservados = reservas.map((r) => r.horaReserva);

      const horariosDisponiblesFiltrados = (cancha.horarios || []).filter(
        (hora) => !horariosReservados.includes(hora)
      );

      setHorariosDisponibles(horariosDisponiblesFiltrados);
      setHorarioSeleccionado(""); // resetear selección
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Error al cargar horarios disponibles");
    }
  };

  const handleReserva = async () => {
    if (!fecha || !horarioSeleccionado) {
      showWarningToast("Selecciona una fecha y un horario");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      showSuccessToast("Reserva confirmada");
      setHorarioSeleccionado(""); // solo resetear
      setFecha("");

      // Opcional: actualizar horariosDisponibles inmediatamente
      setHorariosDisponibles((prev) =>
        prev.filter((h) => h !== horarioSeleccionado)
      );
    } catch (err) {
      showErrorToast("Error al confirmar reserva: " + err.message);
    }
  };

  if (loading) return <p className="text-gray-300">Cargando cancha...</p>;
  if (!cancha)
    return <p className="text-red-500">No se pudo cargar la cancha.</p>;

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Reservar: {cancha.nombre}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detalles de la cancha */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Detalles de la Cancha</h3>
          <p>
            <strong>Deporte:</strong> {cancha.deporte}
          </p>
          <p>
            <strong>Tipo:</strong> {cancha.tipo}
          </p>
          <p>
            <strong>Dirección:</strong> {cancha.direccion}
          </p>
          <p>
            <strong>Precio:</strong> ${cancha.precio}
          </p>
          <p>
            <strong>Horarios disponibles:</strong> {cancha.horarios?.join(", ")}
          </p>
        </div>

        {/* Calendario y select de horarios */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Elegí una fecha</h3>
          <input
            type="date"
            value={fecha}
            onChange={handleFechaChange}
            className="bg-gray-800 text-white p-2 rounded mb-4 w-full"
          />

          {fecha && (
            <>
              <h3 className="text-lg font-semibold mb-3">
                Horarios disponibles
              </h3>
              <select
                value={horarioSeleccionado}
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded w-full"
              >
                <option value="">-- Seleccionar horario --</option>
                {horariosDisponibles.map((hora, i) => (
                  <option key={i} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      {/* Botón de reserva */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleReserva}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default MyReservations;
