import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          telefono: formData.phone,
          asunto: formData.subject,
          mensaje: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Error al enviar mensaje");

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">📞 Contáctanos</h1>
        <p className="mt-4 text-lg text-indigo-100 max-w-2xl mx-auto">
          ¿Tenés dudas o problemas? Completá el formulario y nuestro equipo se pondrá en contacto en menos de 24 horas.
        </p>
      </div>

      {/* Formulario */}
      <div className="px-6 py-16 sm:py-20 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl bg-gray-50 p-8 rounded-2xl shadow-md"
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-semibold text-gray-900">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="341-610-7890"
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Asunto */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">Asunto</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Seleccioná un asunto</option>
                <option value="reserva">Problemas con la reserva</option>
                <option value="pago">Consulta de pago</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Mensaje */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">Mensaje</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
          </div>

          {/* Botón enviar */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className={`block w-full rounded-md bg-indigo-500 px-4 py-2 text-center text-sm font-semibold text-white shadow hover:bg-indigo-400 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>

          {/* Mensaje de éxito/error */}
          {status === "success" && (
            <p className="mt-6 text-center text-green-600 font-semibold">
              ✅ ¡Gracias por tu mensaje! Nuestro equipo te responderá pronto.
            </p>
          )}
          {status === "error" && (
            <p className="mt-6 text-center text-red-600 font-semibold">
              ❌ No se pudo enviar el mensaje. Intentá nuevamente.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

