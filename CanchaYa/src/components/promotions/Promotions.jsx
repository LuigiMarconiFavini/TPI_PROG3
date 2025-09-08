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
      totalBookings: 0, // reiniciamos el ciclo después de canjear
    });
    alert(`🎉 ¡Recompensa canjeada! ${reward}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6">🎁 Mis Promociones</h2>

      <p className="text-gray-300 mb-4">
        Reservas realizadas: {promotions.totalBookings}/5
      </p>

      {rewardAvailable ? (
        <div className="mb-4">
          <p className="text-green-400 font-semibold">
            🎉 ¡Felicitaciones! Tenés una recompensa disponible:
          </p>
          <button
            onClick={handleRedeem}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition"
          >
            Canjear Recompensa
          </button>
        </div>
      ) : (
        <p className="text-gray-300 mb-4">
          Te faltan {nextRewardAt} reservas para tu próxima recompensa.
        </p>
      )}

      {promotions.redeemedRewards.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white mb-2">Historial de Recompensas:</h3>
          <ul className="list-disc list-inside text-gray-300">
            {promotions.redeemedRewards.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
