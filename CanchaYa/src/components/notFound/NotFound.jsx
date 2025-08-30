import React from "react";

const NotFound = () => {
  const handleClick = () => {
    alert("Funcionalidad pendiente");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscas no existe o fue movida.</p>
      <button 
        onClick={handleClick} 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#333",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFound;
