import { useState } from "react";
import "./Contact.css";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        country: "AR",
        message: "",
        subject: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Podés simular un "reset" del formulario si querés
        setFormData({
            firstName: "",
            lastName: "",
            company: "",
            email: "",
            phone: "",
            country: "AR",
            message: "",
            subject: "",
        });

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    📞 Contáctanos
                </h2>
                <p className="mt-2 text-lg text-gray-400">
                    ¿Tenés dudas o problemas? Completá el formulario y nuestro equipo se pondrá en contacto en menos de 24 horas.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* NOMBRE */}
                    <div>
                        <label className="block text-sm font-semibold text-white">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* APELLIDO */}
                    <div>
                        <label className="block text-sm font-semibold text-white">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* TELÉFONO */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-white">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="341-610-7890"
                            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* ASUNTO */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-white">
                            Asunto
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="custom-select mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Seleccioná un asunto</option>
                            <option value="reserva">Problemas con la reserva</option>
                            <option value="pago">Consulta de pago</option>
                            <option value="sugerencia">Sugerencia</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>


                    {/* MENSAJE */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-white">
                            Mensaje
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* BOTÓN ENVIAR */}
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-500 px-4 py-2 text-center text-sm font-semibold text-white shadow hover:bg-indigo-400 transition"
                    >
                        Enviar mensaje
                    </button>
                </div>
            </form>

            {/* MENSAJE DE ÉXITO */}
            {submitted && (
                <p className="mt-6 text-center text-green-400 font-semibold">
                    ✅ ¡Gracias por tu mensaje! Nuestro equipo te responderá pronto.
                </p>
            )}
        </div>
    );
}



