import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Protected from "./components/protected/Protected";
import MyProfile from "./components/myProfile/MyProfile";
import PrivateLayout from "./components/layouts/PrivateLayout";
import Contact from "./components/contact/Contact";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Rutas privadas */}
        <Route
          path="/"
          element={
            <Protected isSignedIn={loggedIn}>
              <PrivateLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
                <Dashboard />
              </PrivateLayout>
            </Protected>
          }
        />

        {/* Ruta para registro */}
        <Route path="/register" element={<Register />} /> {/* 🔹 Nueva ruta */}

        <Route
          path="/my-profile"
          element={
            <Protected isSignedIn={loggedIn}>
              <PrivateLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
                <MyProfile />
              </PrivateLayout>
            </Protected>
          }
        />

        <Route
          path="/contact"
          element={
            <Protected isSignedIn={loggedIn}>
              <PrivateLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
                <Contact />
              </PrivateLayout>
            </Protected>
          }
        />

        {/* NotFound */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;