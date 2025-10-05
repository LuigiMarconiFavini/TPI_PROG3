import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../services/auth.context";
import { deportes, tiposPorDeporte, horarios } from "../../mocks/mock";

const NewCourts = ({ existingCourt = null, onSaved }) => {
  const { token } = useContext(AuthenticationContext);

  const [nombre, setNombre] = useState(existingCourt?.nombre || "");
  const [deporte, setDeporte] = useState(existingCourt?.deporte || "");
  const [tipo, setTipo] = useState(existingCourt?.tipo || "");
  const [direccion, setDireccion] = useState(existingCourt?.direccion || "");
  const [precio, setPrecio] = useState(existingCourt?.precio || "");
  const [imagen, setImagen] = useState(existingCourt?.imagen || "");
  const [horariosSeleccionados, setHorariosSeleccionados] = useState(
    existingCourt?.horarios || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError("No estás autenticado");

    setLoading(true);
    setError("");

    try {
      const payload = {
        nombre,
        deporte,
        tipo,
        direccion,
        precio,
        imagen,
        horarios: horariosSeleccionados,
      };

      const url = existingCourt
        ? `http://localhost:3000/canchas/${existingCourt.id}`
        : "http://localhost:3000/canchas";

      const method = existingCourt ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar la cancha");
      const data = await res.json();
      if (onSaved) onSaved(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {existingCourt ? "Editar Cancha" : "Nueva Cancha"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de la Cancha"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <select
          value={deporte}
          onChange={(e) => {
            setDeporte(e.target.value);
            setTipo("");
          }}
          className="border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="">Deporte</option>
          {deportes.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>

        {deporte && (
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">Tipo</option>
            {tiposPorDeporte[deporte]?.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="URL de la Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        {/* Horarios como checkboxes */}
        <div className="flex flex-col gap-2 mt-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Horarios Disponibles
          </label>
          <div className="flex flex-wrap gap-2">
            {horarios.map((h) => (
              <label
                key={h}
                className="flex items-center gap-2 border px-3 py-1 rounded-xl cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <input
                  type="checkbox"
                  value={h}
                  checked={horariosSeleccionados.includes(h)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setHorariosSeleccionados([...horariosSeleccionados, h]);
                    } else {
                      setHorariosSeleccionados(
                        horariosSeleccionados.filter((hor) => hor !== h)
                      );
                    }
                  }}
                  className="accent-blue-500"
                />
                {h}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg py-3 px-6 font-semibold hover:bg-blue-700 transition mt-4"
        >
          {loading
            ? "Guardando..."
            : existingCourt
            ? "Actualizar Cancha"
            : "Agregar Cancha"}
        </button>
      </form>
    </div>
  );
};

export default NewCourts;
