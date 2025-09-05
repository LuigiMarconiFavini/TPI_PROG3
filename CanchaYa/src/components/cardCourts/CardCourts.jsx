import React from "react";

const CardCourts = ({ cancha }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Imagen */}
      <img
        src={cancha.imagen}
        alt={cancha.nombre}
        className="w-full h-48 object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {cancha.nombre}
        </h2>

        <div className="text-gray-600 text-sm mb-2 space-y-1">
          <p>
            <span className="font-semibold">Deporte:</span> {cancha.deporte}
          </p>
          <p>
            <span className="font-semibold">Tipo:</span> {cancha.tipo}
          </p>
          <p>
            <span className="font-semibold">Dirección:</span> {cancha.direccion}
          </p>
          <p>
            <span className="font-semibold">Precio:</span> ${cancha.precio}
          </p>
          <p>
            <span className="font-semibold">Horarios:</span>{" "}
            {cancha.horarios.join(", ")}
          </p>
        </div>

        {/* Botón reservar */}
        <button className="mt-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Reservar
        </button>
      </div>
    </div>
  );
};

export default CardCourts;
