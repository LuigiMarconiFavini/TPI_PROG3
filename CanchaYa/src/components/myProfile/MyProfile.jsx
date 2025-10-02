import { useState, useEffect } from "react";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [msg, setMsg] = useState("");

  const fetchMyProfile = async () => {
    try {
      const token = localStorage.getItem("canchaYa-token");

      const res = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setFormData(data);
      } else {
        alert(data?.message || "⚠️ No se pudo obtener el perfil");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error al conectar con el servidor");
    }
  };

  const updateMyProfile = async () => {
    try {
      const token = localStorage.getItem("canchaYa-token");

      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user || { ...user, username: formData.username });
        setEditMode(false);
        setMsg("✅ Perfil actualizado correctamente!");
      } else {
        alert(data?.message || "⚠️ No se pudo actualizar el perfil");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error al conectar con el servidor");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchMyProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-4">
      {/* Card principal con borde azul translúcido más notorio */}
      <div className="w-full max-w-lg p-8 rounded-xl shadow-xl bg-white/20 backdrop-blur-md border border-blue-500/40">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Mi Perfil
        </h1>

        {!user ? (
          <p className="text-center text-gray-600">Cargando perfil...</p>
        ) : (
          <div>
            {editMode ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateMyProfile();
                }}
                className="space-y-5"
              >
                <label className="block">
                  <span className="font-medium text-gray-700">
                    Nombre de usuario:
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 rounded-lg border border-blue-400/20 bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300/40 transition"
                  />
                </label>

                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFormData(user);
                      setMsg("");
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Bloques de datos con borde sutil */}
                <div className="p-3 text-base rounded-lg bg-white/10 backdrop-blur-lg border border-blue-400/20 shadow-sm transform transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:border-blue-400/50 cursor-pointer">
                  <strong>Nombre de usuario:</strong> {user.username}
                </div>

                <div className="p-3 text-base rounded-lg bg-white/10 backdrop-blur-lg border border-blue-400/20 shadow-sm transform transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:border-blue-400/50 cursor-pointer">
                  <strong>Email:</strong> {user.email}
                </div>

                <div className="p-3 text-base rounded-lg bg-white/10 backdrop-blur-lg border border-blue-400/20 shadow-sm transform transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:border-blue-400/50 cursor-pointer">
                  <strong>Contraseña:</strong>{" "}
                  {user.password ? "********" : "No disponible"}
                </div>

                <div className="p-3 text-base rounded-lg bg-white/10 backdrop-blur-lg border border-blue-400/20 shadow-sm transform transition-all duration-200 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-md hover:border-blue-400/50 cursor-pointer">
                  <strong>Miembro desde:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>

                <button
                  onClick={() => {
                    setEditMode(true);
                    setMsg("");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium mt-3 transition"
                >
                  Editar Perfil
                </button>
              </div>
            )}

            {msg && (
              <p
                className={`mt-5 text-center font-medium ${
                  msg.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {msg}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
