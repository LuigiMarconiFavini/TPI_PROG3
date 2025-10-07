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

  // Fetch de todas las canchas
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

  // Eliminar cancha
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
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Gestión de Canchas
      </h1>

      {loading && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Cargando canchas...</p>
        </div>
      )}

      {!loading && canchas.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No hay canchas registradas.</p>
        </div>
      )}

      {!loading && canchas.length > 0 && (
        <div className="bg-white rounded-lg shadow-xl ring-1 ring-gray-100 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deporte</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dirección</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horarios</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creada</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {canchas.map((cancha) => (
                <tr key={cancha.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 text-sm text-gray-500">{cancha.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{cancha.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cancha.deporte}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cancha.tipo}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cancha.direccion}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">${cancha.precio}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cancha.horarios}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(cancha.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center text-sm">
                    <button
                      onClick={() => handleDelete(cancha.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 bg-red-100 rounded-md"
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
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Volver a inicio
        </button>
      </div>
    </div>
  );
};

export default AllCanchas;
