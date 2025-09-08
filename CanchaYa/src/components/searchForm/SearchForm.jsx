import { useState } from "react";
import CardCourts from "../cardCourts/CardCourts";
import { canchas, deportes, tiposPorDeporte, horarios } from "../../mocks/mock";

const SearchForm = () => {
  const [deporte, setDeporte] = useState("");
  const [tipoCancha, setTipoCancha] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [resultados, setResultados] = useState(canchas);

  const handleDeporte = (e) => {
    setDeporte(e.target.value);
    setTipoCancha("");
  };

  const handleTipoCancha = (e) => {
    setTipoCancha(e.target.value);
  };

  const handleHorario = (e) => {
    setHorarioSeleccionado(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const filtradas = canchas.filter((c) => {
      const matchDeporte = deporte ? c.deporte === deporte : true;
      const matchTipo = tipoCancha ? c.tipo === tipoCancha : true;
      const matchHorario = horarioSeleccionado
        ? c.horarios.includes(horarioSeleccionado)
        : true;
      return matchDeporte && matchTipo && matchHorario;
    });

    setResultados(filtradas);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      {/* // Aca empieza el form */}
      <form
        onSubmit={handleFilter}
        className="flex flex-wrap gap-6 items-end bg-white p-6 rounded-2xl shadow-md justify-center"
      >
        {/* // Este es el select de deportes */}
        <div className="flex flex-col w-48">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Deporte
          </label>
          <select
            value={deporte}
            onChange={handleDeporte}
            className="border border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Elegir Deporte</option>
            {deportes.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        {/* // Este es el select de canchas */}
        {deporte && (
          <div className="flex flex-col w-48">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Tipo de Cancha
            </label>
            <select
              value={tipoCancha}
              onChange={handleTipoCancha}
              className="border border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        {/* // select de horario */}
        <div className="flex flex-col w-48">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Horario
          </label>
          <select
            value={horarioSeleccionado}
            onChange={handleHorario}
            className="border border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Elige Horario</option>
            {horarios.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        {/* // aca se busca */}
        <div className="flex flex-col w-48">
          <label className="invisible mb-2">Buscar</label>
            <button
              type="submit"
              className="border border-gray-600 rounded-lg px-3 py-2 shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            Buscar Canchas
        </button>
        </div>
      </form>
      {/* // aca muestra lo que busca */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {resultados.length > 0 ? (
          resultados.map((c) => <CardCourts key={c.id} cancha={c} />)
        ) : (
          <div className="col-span-full flex justify-center items-center h-32">
            <p className="text-gray-500 text-lg font-medium">
              No se encontraron canchas 😢
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
// este es uno de oro
export default SearchForm;
