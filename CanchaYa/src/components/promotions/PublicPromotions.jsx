import React from "react";

const PublicPromotions = () => {
  const promotionsInfo = [
    {
      title: "¿Qué son las promociones?",
      description:
        "Son descuentos aplicados directamente sobre el precio de la cancha para que disfrutes más pagando menos.",
      icon: "⚽",
    },
    {
      title: "¿Cómo aplicarlas?",
      description:
        "Al momento de reservar tu cancha, si hay una promoción activa, podrás verla y aplicarla antes de confirmar el pago.",
      icon: "💳",
    },
    {
      title: "Tipos de descuentos",
      description:
        "Ofrecemos rebajas por temporada, descuentos en determinados días y precios especiales en horarios seleccionados.",
      icon: "📉",
    },
    {
      title: "Condiciones de uso",
      description:
        "Los descuentos solo son válidos en reservas online y no se combinan con otras promociones. Revisá siempre los días y horarios habilitados antes de confirmar.",
      icon: "📋",
    },
    {
      title: "Próximamente...",
      description:
        "Muy pronto vas a poder acceder a otro tipo de beneficios además de descuentos en el precio, como premios y experiencias exclusivas.",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Cabecera estilo banner */}
      <div className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white py-16 px-4 text-center">
        <p className="uppercase tracking-widest text-sm font-medium">
          DESCUENTOS DISPONIBLES
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">
          Aprovechá nuestras promociones
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Reservá tu cancha con descuentos especiales en precio. Conocé cómo
          funcionan, cómo aplicarlos y cuáles son las condiciones.
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