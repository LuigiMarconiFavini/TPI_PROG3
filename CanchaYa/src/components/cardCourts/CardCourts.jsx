import React, { useContext } from "react";
import { AuthenticationContext } from "../services/auth.context";

const CardCourts = ({ cancha, onEdit, onDelete }) => {
  const { user } = useContext(AuthenticationContext);

  const canEditOrDelete = user?.rol === "admin" || user?.rol === "sysadmin";

  const showReservar = !canEditOrDelete;

 return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col transition-colors">
      <img
        src={cancha.imagen}
        alt={cancha.nombre}
        className="w-full h-48 object-cover"
      />
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

        {showReservar && (
          <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
            Reservar
          </button>
        )}

        {canEditOrDelete && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(cancha)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(cancha)}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCourts;
