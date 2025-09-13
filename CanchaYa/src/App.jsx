import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Protected from "./components/protected/Protected";
import MyProfile from "./components/myProfile/MyProfile";
import Contact from "./components/contact/Contact";
import MainLayout from "./components/layouts/MainLayout";
import Promotions from "./components/promotions/Promotions";
import PublicPromotions from "./components/promotions/PublicPromotions";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => setLoggedIn(true);
  const handleSignOut = () => setLoggedIn(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/promotions"
          element={
            <MainLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
              <PublicPromotions />
            </MainLayout>
          }
        />

        {/* Dashboard público */}
        <Route
          path="/"
          element={
            <MainLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
              <Dashboard />
            </MainLayout>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/promotions/private"
          element={
            <Protected isSignedIn={loggedIn}>
              <MainLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
                <Promotions />
              </MainLayout>
            </Protected>
          }
        />

        <Route
          path="/my-profile"
          element={
            <Protected isSignedIn={loggedIn}>
              <MainLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
                <MyProfile />
              </MainLayout>
            </Protected>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout loggedIn={loggedIn} onSignOut={handleSignOut}>
              <Contact />
            </MainLayout>
          }
        />

        {/* NotFound */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;