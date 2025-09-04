import { useState } from "react";

const opcionesIniciales = {
    futbol: [
      { value: "f5", label: "Fútbol 5" },
      { value: "f7", label: "Fútbol 7" },
      { value: "f8", label: "Fútbol 8" },
      { value: "f9", label: "Fútbol 9" },
    ],
    padel: [
      { value: "cubiertas", label: "Cubiertas" },
      { value: "panoramicas", label: "Panorámicas" },
      { value: "cesped", label: "Césped sintético" },
      { value: "cielo", label: "Cielo abierto" },
    ],
};

const inicialHorario = [
        { value: "9:00hs", label: "9:00hs" },
        { value: "10:00hs", label: "10:00hs" },
        { value: "11:00hs", label: "11:00hs" },
        { value: "12:00hs", label: "12:00hs" },
        { value: "13:00hs", label: "13:00hs" },
        { value: "14:00hs", label: "14:00hs" },
        { value: "15:00hs", label: "15:00hs" },
        { value: "16:00hs", label: "16:00hs" },
        { value: "17:00hs", label: "17:00hs" },
        { value: "18:00hs", label: "18:00hs" },
        { value: "19:00hs", label: "19:00hs" },
        { value: "20:00hs", label: "20:00hs" },
        { value: "21:00hs", label: "21:00hs" },
        { value: "22:00hs", label: "22:00hs" },
        { value: "23:00hs", label: "23:00hs" },
]

const SearchForm = () => {
  const [deporte, setDeporte] = useState("");
  const [tipoCancha, setTipoCancha] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  const handleDeporte = (e) => {
    setDeporte(e.target.value);
  }

  const handleTipoCancha = (e) => {
    setTipoCancha(e.target.value)
  }

  const handleHorario = (e) => {
    setHorarioSeleccionado(e.target.value)
  }

  return (
    <form>
     <select
        id="deporte"
        name="deporte"
        value={deporte}
        onChange={handleDeporte}
      >
        <option value="">Elige Deporte</option>
        <option value="futbol">Fútbol</option>
        <option value="padel">Pádel</option>
      </select>

      {deporte && (
        <select
          id="tipoCancha"
          name="tipoCancha"
          value={tipoCancha}
          onChange={handleTipoCancha}
        >
          <option value="">Selecciona el tipo de cancha</option>
          {opcionesIniciales[deporte].map(
            (op) => (
            <option key={op.value} value={op.value}>
                {op.label}
            </option>
          ))}
        </select>
      )}

        <select
            name="horario"
            id="horario"
            value={horarioSeleccionado}
            onChange={handleHorario}
        >
            <option value="">Elige Horario</option>
            {inicialHorario.map((h) => (
                <option key={h.value} value={h.value}>
                {h.label}
                </option>
            ))}
        </select>

      <button>Buscar Canchas</button>
    </form>
  );
};

export default SearchForm;
