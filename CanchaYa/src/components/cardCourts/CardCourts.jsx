import React from "react";

const CardCourts = ({ cancha }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col transition-colors">
      {/* Imagen */}
      <img
        src={cancha.imagen}
        alt={cancha.nombre}
        className="w-full h-48 object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {cancha.nombre}
        </h2>

        <div className="text-gray-600 dark:text-gray-300 text-sm mb-2 space-y-1">
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
        <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
          Reservar
        </button>
      </div>
    </div>
  );
};

export default CardCourts;
