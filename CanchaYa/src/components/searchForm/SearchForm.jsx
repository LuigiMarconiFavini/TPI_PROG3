import { useState, useEffect, useContext } from "react";
import CardCourts from "../cardCourts/CardCourts";
import { deportes, tiposPorDeporte, horarios } from "../../mocks/mock";
import { AuthenticationContext } from "../services/auth.context";
import toast from "react-hot-toast";
import NewCourts from "../newCourts/NewCourts";

const SearchForm = () => {
  const { token } = useContext(AuthenticationContext);

  const [deporte, setDeporte] = useState("");
  const [tipoCancha, setTipoCancha] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingCourt, setEditingCourt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCanchas = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "http://localhost:3000/api/canchas";

      const query = new URLSearchParams();
      if (deporte) query.append("deporte", deporte);
      if (tipoCancha) query.append("tipo", tipoCancha);
      if (horarioSeleccionado) query.append("horario", horarioSeleccionado);

      if (query.toString()) url += "?" + query.toString();

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al traer las canchas");

      const data = await res.json();
      setResultados(data);
    } catch (err) {
      setError(err.message);
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Traer todas las canchas al montar
  useEffect(() => {
    fetchCanchas();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchCanchas(); // Volvemos a traer del backend con los filtros
  };

  const handleDelete = async (cancha) => {
    if (!token) return toast.error("No estás autenticado");

    // Confirmación usando toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>❌ ¿Seguro que querés eliminar la cancha "{cancha.nombre}"?</p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // cerrar el toast
                try {
                  const res = await fetch(
                    `http://localhost:3000/api/canchas/${cancha.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (!res.ok) throw new Error("Error al eliminar la cancha");
                  setResultados((prev) =>
                    prev.filter((c) => c.id !== cancha.id)
                  );
                  toast.success("✅ Cancha eliminada correctamente");
                } catch (err) {
                  console.error(err);
                  toast.error("❌ " + err.message);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
            >
              Sí, eliminar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleEdit = (cancha) => {
    setEditingCourt(cancha);
    setModalOpen(true);
  };

  const handleSaved = (updateCourt) => {
    setResultados((prev) =>
      prev.map((c) => (c.id === updateCourt.id ? updateCourt : c))
    );
    setModalOpen(false);
  };
  return (
    <div className="p-6 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Formulario de filtros */}
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap gap-6 items-end bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-md justify-center transition-colors duration-300"
      >
        {/* Select de deporte */}
        <div className="flex flex-col w-48">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Deporte
          </label>
          <select
            value={deporte}
            onChange={(e) => {
              setDeporte(e.target.value);
              setTipoCancha("");
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            <option value="">Elegir Deporte</option>
            {deportes.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Select de tipo de cancha */}
        {deporte && (
          <div className="flex flex-col w-48">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Cancha
            </label>
            <select
              value={tipoCancha}
              onChange={(e) => setTipoCancha(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            >
              <option value="">Selecciona Tipo</option>
              {tiposPorDeporte[deporte].map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Select de horario */}
        <div className="flex flex-col w-48">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Horario
          </label>
          <select
            value={horarioSeleccionado}
            onChange={(e) => setHorarioSeleccionado(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            <option value="">Elige Horario</option>
            {horarios.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <div className="flex flex-col w-48">
          <label className="invisible mb-2">Buscar</label>
          <button
            type="submit"
            className="border border-gray-300 dark:border-gray-600 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buscar Canchas
          </button>
        </div>
      </form>

      {/* Resultados */}
      {loading ? (
        <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
          Cargando...
        </p>
      ) : error ? (
        <p className="text-center mt-10 text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {resultados.length > 0 ? (
            resultados.map((c) => (
              <CardCourts
                key={c.id}
                cancha={c}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-32">
              <p className="text-gray-500 text-lg font-medium dark:text-gray-400">
                No se encontraron canchas 😢
              </p>
            </div>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-md w-full">
            <button
              className="text-gray-500 dark:text-gray-300 float-right"
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>
            <NewCourts existingCourt={editingCourt} onSaved={handleSaved} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
