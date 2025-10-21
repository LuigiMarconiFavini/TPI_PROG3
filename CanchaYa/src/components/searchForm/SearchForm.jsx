import { useState, useContext, useEffect } from "react";
import CardCourts from "../cardCourts/CardCourts";
import { deportes, tiposPorDeporte, horarios } from "../../mocks/mock";
import { AuthenticationContext } from "../services/auth.context";
import toast from "react-hot-toast";
import NewCourts from "../newCourts/NewCourts";
import "./SearchForm.css";

const SearchForm = () => {
  const { token } = useContext(AuthenticationContext);

  const [deporte, setDeporte] = useState("");
  const [tipoCancha, setTipoCancha] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

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

  const handleFilter = async (e) => {
    e.preventDefault();
    setSearched(true);
    await fetchCanchas();
  };

  const handleDelete = async (cancha) => {
    if (!token) return toast.error("No estás autenticado");

    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>❌ ¿Seguro que querés eliminar la cancha "{cancha.nombre}"?</p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
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

  const handleSaved = (court) => {
    setResultados((prev) => {
      const exists = prev.some((c) => c.id === court.id);
      if (exists) {
        return prev.map((c) => (c.id === court.id ? court : c));
      }
      return [...prev, court];
    });

    setModalOpen(false);
  };

  //lo usamos para que el modal no se superponga
  useEffect(() => {
  if (modalOpen) {
    document.body.style.overflow = "hidden"; // bloquea el scroll del fondo
  } else {
    document.body.style.overflow = "auto"; // lo restaura
  }

  return () => {
    document.body.style.overflow = "auto"; // cleanup por seguridad
  };
}, [modalOpen]);

  return (
    <div className="searchform-container text-black dark:text-white transition-colors duration-300">
      {/* 🔍 Formulario de filtros */}
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap gap-6 items-end justify-center bg-gray-900/40 dark:bg-gray-800/50 text-white backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10"
      >
        {/* Select de deporte */}
        <div className="flex flex-col w-48">
          <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 h-12 shadow-sm bg-white/90 dark:bg-gray-700 text-black dark:text-white focus-within:ring-2 focus-within:ring-blue-400 transition">
            <span className="text-lg">⚽</span>
            <select
              value={deporte}
              onChange={(e) => {
                setDeporte(e.target.value);
                setTipoCancha("");
              }}
              className="flex-1 bg-transparent focus:outline-none text-black dark:text-white h-full"
            >
              <option value="">Elige Deporte</option>
              {deportes.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select de tipo de cancha */}
        {deporte && (
          <div className="flex flex-col w-48">
            <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 h-12 shadow-sm bg-white/90 dark:bg-gray-700 text-black dark:text-white focus-within:ring-2 focus-within:ring-blue-400 transition">
              <span className="text-lg">🏟️</span>
              <select
                value={tipoCancha}
                onChange={(e) => setTipoCancha(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-black dark:text-white h-full"
              >
                <option value="">Selecciona Tipo</option>
                {tiposPorDeporte[deporte].map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Select de horario */}
        <div className="flex flex-col w-48">
          <div className="flex items-center gap-2 border border-gray-400 rounded-lg px-3 h-12 shadow-sm bg-white/90 dark:bg-gray-700 text-black dark:text-white focus-within:ring-2 focus-within:ring-blue-400 transition">
            <span className="text-lg">🕒</span>
            <select
              value={horarioSeleccionado}
              onChange={(e) => setHorarioSeleccionado(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-black dark:text-white h-full"
            >
              <option value="">Elige Horario</option>
              {horarios.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón */}
        <div className="flex flex-col w-48">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold h-12 rounded-lg hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2"
          >
            🔎 Buscar Canchas
          </button>
        </div>
      </form>

      {/* 📋 Resultados */}
      {loading ? (
        <p className="text-center mt-10 text-gray-200">Cargando...</p>
      ) : error ? (
        <p className="text-center mt-10 text-red-400">{error}</p>
      ) : searched ? ( // 👈 solo mostramos resultados si ya buscó
        <div className="w-full mt-16 px-6">
          {resultados.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-7">
              {resultados.map((c) => (
                <CardCourts
                  key={c.id}
                  cancha={c}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full flex flex-col justify-center items-center h-40 text-center text-gray-400">
              <span className="text-4xl mb-2">🧐</span>
              <p className="text-lg font-medium">
                No se encontraron canchas con esos filtros
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Probá cambiar el deporte, tipo o horario
              </p>
            </div>
          )}
        </div>
      ) : null}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center px-4 py-10 mt-10">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <button
                className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                onClick={() => {
                  setModalOpen(false);
                  setEditingCourt(null);
                }}
              >
                ×
              </button>

              <NewCourts existingCourt={editingCourt} onSaved={handleSaved} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
