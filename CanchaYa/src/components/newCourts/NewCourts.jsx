import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../services/auth.context";
import { deportes, tiposPorDeporte, horarios } from "../../mocks/mock";
import toast from "react-hot-toast";

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
        ? `http://localhost:3000/api/canchas/${existingCourt.id}`
        : "http://localhost:3000/api/canchas";

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

      toast.success(
        existingCourt
          ? "✅ Cancha actualizada correctamente"
          : "✅ Cancha agregada correctamente"
      );
      if (!existingCourt) {
        setNombre("");
        setDeporte("");
        setTipo("");
        setDireccion("");
        setPrecio("");
        setImagen("");
        setHorariosSeleccionados([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
        {existingCourt ? "Editar Cancha" : "Nueva Cancha"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de la Cancha"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <select
          value={deporte}
          onChange={(e) => {
            setDeporte(e.target.value);
            setTipo("");
          }}
          className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
            className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
          className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="URL de la Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="border rounded-lg p-3 w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Horarios Disponibles
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {horarios.map((h) => (
              <label
                key={h}
                className="flex items-center justify-center gap-2 border px-3 py-2 rounded-xl cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
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
          className="bg-blue-600 text-white rounded-lg py-3 px-6 font-semibold hover:bg-blue-700 transition mt-4 w-full"
        >
          {loading
            ? "Guardando..."
            : existingCourt
            ? "Actualizar Cancha"
            : "Agregar Cancha"}
        </button>
      </form>
    </div>
  </div>
);


};

export default NewCourts;
