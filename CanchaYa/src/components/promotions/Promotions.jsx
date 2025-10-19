import { useState } from "react";
import { promotionsMock } from "../../mocks/mock";

export default function Promotions() {
  const [promotions, setPromotions] = useState(promotionsMock);

  const progress = promotions.totalBookings % promotions.rewardsCycle;
  const nextRewardAt = promotions.rewardsCycle - progress;
  const rewardAvailable = progress === 0 && promotions.totalBookings > 0;

  const handleRedeem = () => {
    const reward = promotions.availableRewards[
      promotions.redeemedRewards.length % promotions.availableRewards.length
    ];

    setPromotions({
      ...promotions,
      redeemedRewards: [...promotions.redeemedRewards, reward],
      totalBookings: 0,
    });
    alert(`🎉 ¡Recompensa canjeada! ${reward}`);
  };

  // Barra de progreso circular
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const offset = circleCircumference - (progress / promotions.rewardsCycle) * circleCircumference;

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen transition-colors duration-300"
      style={{ backgroundImage: `url(/images/img-fondo-promotions.webp)` }}
    >
      {/* Banner full width sólido */}
      <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-xl">
        <div className="max-w-7xl mx-auto p-12 text-center text-white rounded-b-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">🎁 Programa de Recompensas</h2>
          <p className="text-lg md:text-xl">
            Cada 5 reservas realizadas te dan un descuento en tu próxima cancha
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Cards explicativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-r from-green-400 to-green-200 dark:from-green-700 dark:to-green-500 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="font-bold text-2xl mb-2">Reservá tu cancha</h3>
            <p className="text-gray-800 dark:text-gray-200 text-lg">
              Cada reserva suma para tu próxima recompensa, ya sea fútbol o pádel.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-blue-400 to-blue-200 dark:from-blue-700 dark:to-blue-500 rounded-2xl shadow-lg text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="font-bold text-2xl mb-2">Canjea tu recompensa</h3>
            <p className="text-gray-800 dark:text-gray-200 text-lg">
              Cada 5 reservas completadas, podrás canjear un descuento en tu siguiente reserva.
            </p>
          </div>
        </div>

        {/* Contenedor de promociones */}
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg p-6 md:flex md:space-x-6 backdrop-blur-sm">
          {/* Progreso circular */}
          <div className="md:w-1/2 mb-6 md:mb-0 flex flex-col items-center justify-center">
            <svg width={120} height={120} className="mb-4">
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                stroke="#d1d5db"
                strokeWidth="10"
                fill="transparent"
                className="dark:stroke-gray-700"
              />
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                stroke="#fbbf24"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circleCircumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-gray-900 dark:text-gray-100 font-bold text-lg"
              >
                {progress}/{promotions.rewardsCycle}
              </text>
            </svg>
            {rewardAvailable ? (
              <div className="text-center">
                <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                  🎉 ¡Felicitaciones! Recompensa disponible
                </p>
                <button
                  onClick={handleRedeem}
                  className="mt-2 px-6 py-3 bg-green-500 dark:bg-green-600 text-white rounded-full hover:bg-green-400 dark:hover:bg-green-500 transition transform hover:scale-105"
                >
                  Canjear Recompensa
                </button>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-center mt-2">
                Faltan {nextRewardAt} reservas para la próxima recompensa
              </p>
            )}
          </div>

          {/* Historial de recompensas */}
          <div className="md:w-1/2 bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Historial de Recompensas</h3>
            {promotions.redeemedRewards.length > 0 ? (
              <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                {promotions.redeemedRewards.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-300">No tenés recompensas canjeadas todavía.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
