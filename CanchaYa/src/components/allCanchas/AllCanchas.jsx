import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showConfirmToast, showSuccessToast } from '../../toast/toastNotifications.jsX';

const AllCanchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/");
  };

  const fetchCanchas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("canchaYa-token");
      const res = await fetch("http://localhost:3000/api/canchas/getAll", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok) {
        setCanchas(data);
      } else {
        showErrorToast("Error al obtener las canchas");
      }
    } catch (error) {
      console.error("Error al obtener canchas:", error);
      showErrorToast("Error al obtener las canchas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    showConfirmToast("¿Seguro que deseas eliminar esta cancha?", async () => {
      const token = localStorage.getItem("canchaYa-token");
      try {
        const res = await fetch(`http://localhost:3000/api/canchas/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          setCanchas(prev => prev.filter(c => c.id !== id));
          showSuccessToast("Cancha eliminada correctamente");
        } else {
          showErrorToast("Error al eliminar la cancha");
        }
      } catch (error) {
        console.error("Error al eliminar cancha:", error);
        showErrorToast("Error al eliminar la cancha");
      }
    });
  };

  useEffect(() => {
    fetchCanchas();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 
                    bg-gray-50 dark:bg-gray-900 
                    text-gray-800 dark:text-gray-100 
                    min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4 
                     border-gray-300 dark:border-gray-700">
        Gestión de Canchas
      </h1>

      {loading && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Cargando canchas...
          </p>
        </div>
      )}

      {!loading && canchas.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No hay canchas registradas.
          </p>
        </div>
      )}

      {!loading && canchas.length > 0 && (
        <div className="bg-white dark:bg-gray-800 
                        rounded-lg shadow-xl ring-1 ring-gray-100 dark:ring-gray-700 
                        overflow-x-auto transition-colors duration-300">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {["ID", "Nombre", "Deporte", "Tipo", "Dirección", "Precio", "Horarios", "Creada", "Acciones"].map(header => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium 
                               text-gray-500 dark:text-gray-300 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {canchas.map((cancha) => (
                <tr
                  key={cancha.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{cancha.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{cancha.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{cancha.deporte}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{cancha.tipo}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{cancha.direccion}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">${cancha.precio}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{cancha.horarios}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {new Date(cancha.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    <button
                      onClick={() => handleDelete(cancha.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 
                                 px-3 py-1 bg-red-100 dark:bg-red-900/40 rounded-md transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleVolver}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 
                      text-white font-semibold rounded-lg shadow-md transition"
        >
          Volver a inicio
        </button>
      </div>
    </div>
  );
};

export default AllCanchas;
