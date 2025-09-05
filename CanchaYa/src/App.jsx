import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/auth/login/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true); // cambia el estado al loguearse
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz "/" */}
        <Route
          path="/"
          element={loggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />

        {/* Ruta para login explícita */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Ruta para cualquier cosa no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

