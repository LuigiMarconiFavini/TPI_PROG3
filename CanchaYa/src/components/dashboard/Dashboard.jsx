import React from "react";
import SearchForm from "../searchForm/SearchForm";
import Faq from "../faq/Faq";

const Dashboard = () => {

  const escudos = [
    "/images/escudo1.png",
    "/images/escudo2.png",
    "/images/escudo3.png",
    "/images/escudo4.png",
    "/images/escudo5.png",
    "/images/escudo6.png",
    "/images/escudo7.png",
    "/images/escudo8.png",
    "/images/escudo9.png",
    "/images/escudo10.png",
  ];

  return (
    <div
      className="relative flex flex-col min-h-screen justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/padel-bg.avif')" }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32 text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Reservá tu cancha al instante
        </h1>
        <p className="text-lg sm:text-xl mb-10 max-w-2xl text-gray-200">
          Encontrá canchas de fútbol y pádel disponibles en tiempo real.
        </p>

        <div className="w-full max-w-4xl">
          <SearchForm />
        </div>
      </div>

      {/* Banner de clubes con marquee solo Tailwind */}
      <div className="relative z-10 bg-green-600 py-6 px-6 mt-10 overflow-hidden">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Confían en nosotros
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-10 animate-marquee">
            {escudos.concat(escudos).map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Club ${index + 1}`}
                className="w-32 sm:w-36 md:w-40 lg:w-44 flex-shrink-0 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-900/80 py-16 px-6 shadow-inner">
        <div className="max-w-5xl mx-auto text-center">
          <Faq />
        </div>
      </div>

      {/* Tailwind @layer para animación marquee */}
      <style jsx global>{`
      @layer utilities {
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      }
    `}</style>
    </div>
  );
};

export default Dashboard;

