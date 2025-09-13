import React from "react";

const PublicPromotions = () => {
  const promotionsInfo = [
    {
      title: "¿Cómo funcionan las promociones?",
      description:
        "Nuestras promociones te permiten acceder a descuentos especiales y otros beneficios en reservas de canchas.",
      icon: "🎁",
    },
    {
      title: "¿Cómo se canjean?",
      description:
        "Cuando hagas una reserva, podrás aplicar la promoción disponible directamente en el proceso de pago.",
      icon: "💳",
    },
    {
      title: "Tipos de promociones",
      description:
        "Contamos con descuentos por cantidad de reservas, beneficios para socios frecuentes y ofertas por temporada.",
      icon: "⭐",
    },
    {
      title: "Condiciones de uso",
      description:
        "Cada promoción puede tener reglas específicas: duración, días aplicables o canchas disponibles. Revisá siempre los detalles antes de reservar.",
      icon: "📋",
    },
    {
      title: "Beneficios para socios",
      description:
        "Los socios registrados acceden a promociones exclusivas, sorteos especiales y descuentos adicionales.",
      icon: "👥",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Cabecera estilo banner */}
      <div className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white py-16 px-4 text-center">
        <p className="uppercase tracking-widest text-sm font-medium">
          BENEFICIOS EXCLUSIVOS
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">
          ¿Cómo aprovechar nuestras promociones?
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Descubrí cómo funcionan, cómo podés canjearlas y cuáles son las
          promociones disponibles para que aproveches al máximo tus reservas.
        </p>
      </div>

      {/* Cards con info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6 py-16 -mt-12">
        {/* Primera fila con 3 cards */}
        {promotionsInfo.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center
                       hover:shadow-xl hover:scale-105 transition-transform transition-shadow duration-300 w-72 mx-auto"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}

        {/* Segunda fila con 2 cards centradas */}
        <div className="col-span-3 flex justify-center gap-8 mt-4">
          {promotionsInfo.slice(3).map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center
                         hover:shadow-xl hover:scale-105 transition-transform transition-shadow duration-300 w-72"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicPromotions;
