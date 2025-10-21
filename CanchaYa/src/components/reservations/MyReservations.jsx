import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  showErrorToast,
  showWarningToast,
} from "../../toast/toastNotifications.jsX";
import { AuthenticationContext } from "../services/auth.context";

const MyReservations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);

  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  // Cargar cancha
  useEffect(() => {
    const fetchCancha = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/canchas/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener la cancha");
        const data = await res.json();
        setCancha(data); // los horarios ya vienen ordenados del backend
      } catch (err) {
        showErrorToast("Error al cargar la cancha: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCancha();
  }, [id]);

  // Cambiar fecha y obtener horarios disponibles
  const handleFechaChange = async (e) => {
    const fechaSeleccionada = e.target.value;
    setFecha(fechaSeleccionada);

    try {
      const res = await fetch(
        `http://localhost:3000/api/reservas/porFecha?canchaId=${id}&fecha=${fechaSeleccionada}`
      );
      const reservas = await res.json();
      const horariosReservados = reservas.map((r) => r.horaReserva);

      const disponibles = (cancha.horarios || []).filter(
        (hora) => !horariosReservados.includes(hora)
      );

      setHorariosDisponibles(disponibles);
      setHorarioSeleccionado("");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      showErrorToast("Error al cargar horarios disponibles");
    }
  };

  // Continuar a resumen
  const handleSiguiente = () => {
    if (!user || !user.id) {
      showWarningToast("Debes iniciar sesión o registrarte para reservar");
      return;
    }
    if (!fecha || !horarioSeleccionado) {
      showWarningToast("Selecciona una fecha y un horario");
      return;
    }

    navigate("/resumen-reserva", {
      state: { cancha, fecha, horarioSeleccionado, userId: user.id },
    });
  };

  if (loading) return <p className="text-gray-300">Cargando cancha...</p>;
  if (!cancha)
    return <p className="text-red-500">No se pudo cargar la cancha.</p>;

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-0 px-0 relative"
      style={{
        backgroundImage: `url("/images/img-fondo-reservas3.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Banner full width verde */}
      <div className="w-full bg-green-600 flex flex-col items-center justify-center py-12 px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center">
          Estás cerca de confirmar tu reserva en {cancha.nombre}!
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl text-center">
          Elegí el día y el horario disponible que mejor te convenga para tu
          próxima cancha.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-12 mt-8">
        {/* Detalles de la cancha */}
        <div className="bg-white/90 dark:bg-gray-800/90 dark:text-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl">
          <div className="p-6">
            {/* Título y línea divisoria */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Detalles de tu reserva
            </h3>
            <hr className="border-gray-300 dark:border-gray-600 mb-4" />

            {/* Nombre de la cancha */}
            <p className="text-lg font-semibold mb-4  text-gray-900 dark:text-white">
              Nombre del Complejo: {cancha.nombre}
            </p>

            {/* Detalles */}

            <p>
              <span className="font-semibold">Deporte:</span> {cancha.deporte}
            </p>
            <p>
              <span className="font-semibold">Tipo:</span> {cancha.tipo}
            </p>
            <p>
              <span className="font-semibold">Dirección:</span>{" "}
              {cancha.direccion}
            </p>
            <p>
              <span className="font-semibold">Precio:</span> ${cancha.precio}
            </p>
            <p>
              <span className="font-semibold">Horarios disponibles:</span>{" "}
              {cancha.horarios?.join(", ")}
            </p>
          </div>
        </div>

        {/* Calendario y select de horarios */}
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Elegí tu horario
          </h3>
          <input
            type="date"
            value={fecha}
            onChange={handleFechaChange}
            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg mb-4 w-full shadow-inner"
          />
          {fecha && (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Horarios disponibles
              </h3>
              <select
                value={horarioSeleccionado}
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg w-full shadow-inner"
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

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSiguiente}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
          <div className="flex justify-center mt-10 mb-12">
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 hover:bg-red-600 text-white font-semibold py-3 px-10 rounded-lg shadow-md transition transform hover:scale-105"
            >
              Volver Atrás
            </button>
          </div>
    </div>
  );
};

export default MyReservations;
