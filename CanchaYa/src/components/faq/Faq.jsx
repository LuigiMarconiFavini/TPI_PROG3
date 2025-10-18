import { useState } from "react";

const faqData = [
  {
    question: "¿Cómo hago para reservar una cancha?",
    answer:
      "Solo ingresá a 'Reservar Cancha', elegí la fecha y hora deseada, y completá tus datos para confirmar la reserva.",
  },
  {
    question: "¿Puedo cancelar o modificar mi reserva?",
    answer:
      "Sí, desde 'Mis Reservas' podés cancelar o cambiar la fecha y hora, siempre que la reserva aún no haya comenzado.",
  },
  {
    question: "¿Qué pasa si llego tarde a mi reserva?",
    answer:
      "Se recomienda llegar a tiempo. Las reservas tienen un tiempo de tolerancia de 10 minutos; después de eso, la cancha puede ser reasignada.",
  },
  {
    question: "¿Qué tipos de canchas están disponibles?",
    answer:
      "Actualmente tenemos canchas de fútbol 5, fútbol 7, fútbol 9, fútbol 11 y padel.",
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "El método de pago será definido por el complejo deportivo.",
  },
  {
    question: "¿Cómo contacto al soporte si tengo un problema?",
    answer:
      "Desde la sección 'Contactos/Soporte', completá el formulario y nuestro equipo te responderá en menos de 24 horas.",
  },
  {
    question: "¿Cuánto tiempo antes debo hacer la reserva?",
    answer:
      "Se recomienda reservar con al menos 1 hora de anticipación, dependiendo de la disponibilidad.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-lg transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 transition-colors">
        ❓ Preguntas Frecuentes
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4 transition-colors duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full text-left text-gray-900 dark:text-white font-semibold focus:outline-none transition-colors"
            >
              <span>{item.question}</span>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
