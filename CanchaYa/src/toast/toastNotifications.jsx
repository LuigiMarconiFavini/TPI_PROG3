// src/utils/toastNotifications.js
import { toast } from "react-hot-toast";

export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
    style: {
      background: "#4CAF50",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#f44336",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

export const showInfoToast = (message) => {
  toast(message, {
    duration: 3500,
    position: "top-right",
    style: {
      background: "#2196f3",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

export const showWarningToast = (message) => {
  toast(message, {
    duration: 3500,
    position: "top-right",
    icon: "⚠️",
    style: {
      background: "#ff9800",
      color: "#fff",
      fontWeight: "bold",
    },
  });
};

// ✅ Nuevo: toast de confirmación
export const showConfirmToast = (message, onConfirm) => {
  toast((t) => (
    <div className="flex flex-col gap-3 text-white">
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm(); // Ejecuta la acción confirmada
          }}
          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
        >
          Sí
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          No
        </button>
      </div>
    </div>
  ), {
    duration: 5000,
    position: "top-center",
    style: {
      background: "#333",
      color: "#fff",
      padding: "16px",
      borderRadius: "10px",
    },
  });
};