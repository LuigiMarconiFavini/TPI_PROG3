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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    if (!fullName) {
      setMsg("❌ El nombre no puede estar vacío");
      setTimeout(() => setMsg(""), 4000);
      return;
    }
    setUser({ ...formData });
    setEditMode(false);
    setMsg("✅ Perfil actualizado correctamente!");
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-gray-800 p-10 text-gray-200 shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Foto de perfil y botón de cambio */}
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <div className="relative inline-block">
              <img
                src={formData.photo}
                alt="Profile"
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-600 transition-transform duration-300 hover:scale-105"
              />
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4.768l11.232-11.232-4.768-4.768L4 20z" />
                  </svg>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              )}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={editMode ? handleSave : () => setEditMode(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300"
              >
                {editMode ? "Guardar" : "Editar Perfil"}
              </button>
              {editMode && (
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData({ ...user });
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancelar
                </button>
              )}
            </div>
            {msg && <p className={`mt-2 ${msg.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>{msg}</p>}
          </div>

          {/* Información del usuario */}
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-2xl font-bold text-indigo-400 mb-2">
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={`${formData.firstName} ${formData.lastName}`}
                  onChange={(e) => {
                    const [firstName, ...lastName] = e.target.value.split(" ");
                    setFormData({ ...formData, firstName, lastName: lastName.join(" ") });
                  }}
                  className="border-b border-indigo-400 text-gray-200 font-bold text-2xl focus:outline-none w-full bg-gray-900"
                />
              ) : (
                `${user.firstName} ${user.lastName}`
              )}
            </h1>
            <p className="text-gray-400 mb-6">Rol: {user.role}</p>

            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Información Personal
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {user.email}
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {user.phone}
              </li>
            </ul>

            {/* Nota de privacidad */}
            <p className="mt-8 text-sm text-gray-400">
              🔒 Tus datos se usan únicamente para gestionar tus reservas. Nunca
              serán compartidos con terceros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}