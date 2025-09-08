import { useState } from "react";
import { userMock } from "../../mocks/mock";

export default function MyProfile() {
  const [user, setUser] = useState(userMock);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser({ ...formData });
    setEditMode(false);
    setMsg("✅ Perfil actualizado correctamente!");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6">👤 Mi Perfil</h2>

      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.photo}
          alt="Profile picture"
          className="w-24 h-24 rounded-full border-2 border-indigo-500"
        />
        <div>
          <p className="text-white font-semibold text-lg">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-400">Rol: {user.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-200">
            Nombre
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!editMode}
            className={`mt-1 block w-full rounded-md px-3 py-2 text-white bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              !editMode && "opacity-60 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-semibold text-gray-200">
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!editMode}
            className={`mt-1 block w-full rounded-md px-3 py-2 text-white bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              !editMode && "opacity-60 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full rounded-md px-3 py-2 text-gray-400 bg-white/10 cursor-not-allowed"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-semibold text-gray-200">
            Teléfono
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode}
            className={`mt-1 block w-full rounded-md px-3 py-2 text-white bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              !editMode && "opacity-60 cursor-not-allowed"
            }`}
          />
        </div>
      </div>

      {/* Botones para editar/guardar */}
      <div className="mt-6 flex items-center space-x-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-400 transition"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-400 transition"
          >
            Editar Perfil
          </button>
        )}
      </div>

      {/* Mensaje de éxito */}
      {msg && <p className="mt-4 text-green-400 font-semibold">{msg}</p>}

      {/* Nota de privacidad */}
      <p className="mt-8 text-sm text-gray-400">
        🔒 Tus datos se usan únicamente para gestionar tus reservas. Nunca serán
        compartidos con terceros.
      </p>
    </div>
  );
}