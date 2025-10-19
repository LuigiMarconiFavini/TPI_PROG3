import React, { useContext } from "react";
import { AuthenticationContext } from "../services/auth.context";
import { useNavigate } from "react-router-dom";

const CardCourts = ({ cancha, onEdit, onDelete }) => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleReserva = () => {
    navigate(`/my-reservations/${cancha.id}`);
  };

  const canEditOrDelete = user?.role === "admin" || user?.role === "sysadmin";

  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600
             rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300
             overflow-hidden flex flex-col w-full max-w-sm mx-auto"
    >
      <div className="relative">
        <img
          src={cancha.imagen}
          alt={cancha.nombre}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Título y precio en la misma línea */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {cancha.nombre}
          </h2>
          <span className="font-bold text-green-600">${cancha.precio}</span>
        </div>

        {/* Línea divisoria */}
        <div className="border-b border-gray-300 dark:border-gray-600 mb-3"></div>

        <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 space-y-1">
          <p><span className="font-semibold">Deporte:</span> {cancha.deporte}</p>
          <p><span className="font-semibold">Tipo:</span> {cancha.tipo}</p>
          <p><span className="font-semibold">Dirección:</span> {cancha.direccion}</p>
        </div>

        {user?.role === "user" && (
          <button
            onClick={handleReserva}
            className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                   py-2 rounded-lg transition"
          >
            Reservar
          </button>
        )}

        {canEditOrDelete && (
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-3">
            <button
              onClick={() => onEdit(cancha)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(cancha)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
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