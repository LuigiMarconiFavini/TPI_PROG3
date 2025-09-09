import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/auth/login/Login";
import Protected from "./components/protected/Protected";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true); // cambia el estado al loguearse
  };

  const hanldeSingOut = () => {
    setLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz "/" */}
        <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
          <Route path="/" element={
            <Protected isSignedIn={loggedIn} >
              <Navbar onsingout={hanldeSingOut}/>
              <Dashboard />
            </Protected>
        }/>

        {/* Ruta para cualquier cosa no encontrada */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

