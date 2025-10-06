import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }

   {/* --- Obtener todos los usuarios ---*/}
  const fetchGetUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("canchaYa-token");

      const res = await fetch("http://localhost:3000/api/users/getAllUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await res.json();

      if (res.ok) {
        setUsers(data)
      } else {
        setError('Error al obtener los usuarios');
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (id, selectedRole) => {
    const token = localStorage.getItem("canchaYa-token");
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role: selectedRole } : u));
        setOpenDropdown(null);
      } else {
        alert("Error al cambiar el rol");
      }
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
    }
  };
  
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("canchaYa-token");

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        setOpenDropdown(null);
      } else {
        alert("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    fetchGetUsers();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Gestión de Usuarios
      </h1>

      {loading && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Cargando usuarios...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="ml-2">{error}</span>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No hay usuarios registrados.</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="bg-white rounded-lg shadow-xl ring-1 ring-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miembro Desde</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${user.role === 'sysadmin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium relative">
                  <div className="inline-block text-left">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold"
                    >
                      Acciones
                    </button>

                    {openDropdown === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="px-4 py-2 text-sm">
                          <label className="block text-gray-700 mb-1">Cambiar Rol:</label>
                          <select
                            className="w-full border rounded-md p-1"
                            value={user.role}
                            onChange={(e) => handleChangeRole(user.id, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="sysadmin">Sysadmin</option>
                          </select>
                        </div>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                          Eliminar Usuario
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleClick}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Volver a inicio
        </button>
      </div>
    </div>
  )
}

export default AllUsers
