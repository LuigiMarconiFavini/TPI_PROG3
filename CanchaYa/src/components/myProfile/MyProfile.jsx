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
        setFormData(data); // Inicializa formData con los datos del usuario
      } else {
        alert(data?.message || "⚠️ No se pudo obtener el perfil");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          // El email no se envía porque no es editable aquí
          // Si quisieras cambiar la contraseña, necesitarías un campo y lógica aparte
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Actualiza el estado del usuario con los nuevos datos, manteniendo el email y role originales si no se actualizan
        setUser(data.user || { ...user, username: formData.username });
        setEditMode(false);
        setMsg("✅ Perfil actualizado correctamente!");
      } else {
        alert(data?.message || "⚠️ No se pudo actualizar el perfil");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
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
    <div style={{ padding: '20px' }}>
      <h1>Mi Perfil</h1>
      {!user ? (
        <p>Cargando perfil...</p>
      ) : (
        <div>
          {editMode ? (
            // Modo Edición: Solo nombre de usuario editable, email fijo
            <form onSubmit={(e) => { e.preventDefault(); updateMyProfile(); }}>
              <label>
                Nombre de usuario:
                <input
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  style={{ marginLeft: '10px', marginBottom: '10px', padding: '5px' }}
                />
              </label>
              <br />
              <p><strong>Email:</strong> {user.email}</p> {/* Email fijo, no editable */}
              <br />
              <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                Guardar
              </button>
              <button type="button" onClick={() => { setEditMode(false); setFormData(user); setMsg(''); }} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Cancelar
              </button>
            </form>
          ) : (
            // Modo Visualización: Mostrar nombre de usuario, email, rol, createdAt y contraseña (si disponible)
            <div>
              <p><strong>Nombre de usuario:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/*<p><strong>Rol:</strong> {user.role}</p>        esperar para ver rol segun rol*/}
              <p><strong>Contraseña:</strong> {user.password ? '********' : 'No disponible'}</p> {/* Asumiendo que `user.password` existe y lo quieres mostrar ofuscado */}
              <p><strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              <button onClick={() => { setEditMode(true); setMsg(''); }} style={{ padding: '10px 15px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Editar Perfil
              </button>
            </div>
          )}
          {msg && <p style={{ marginTop: '15px', color: msg.startsWith('✅') ? 'green' : 'red' }}>{msg}</p>}
        </div>
      )}
    </div>
  );
}