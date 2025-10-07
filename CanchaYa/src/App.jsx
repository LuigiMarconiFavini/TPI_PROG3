import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/notFound/NotFound";
import Login from "./components/auth/login/Login";
import Reservations from "./components/reservations/Reservations";
import Register from "./components/auth/register/Register";
import Protected from "./components/protected/Protected";
import MyProfile from "./components/myProfile/MyProfile";
import Contact from "./components/contact/Contact";
import MainLayout from "./components/layouts/MainLayout";
import Promotions from "./components/promotions/Promotions";
import PublicPromotions from "./components/promotions/PublicPromotions";
import { AuthenticationContext } from "./components/services/auth.context";
import { ThemeProvider } from "./components/context/ThemeProvider";
import AllUsers from "./components/allUsers/allUsers";
import AllCanchas from "./components/allCanchas/AllCanchas";

import { Toaster } from "react-hot-toast";

function App() {
  const { token, handleUserLogout } = useContext(AuthenticationContext);

  return (

  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/promotions"
          element={
            <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
              <PublicPromotions />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/all-users"
          element={
            <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
              <AllUsers />
            </MainLayout>
          }
        />

        <Route
          path="/all-canchas"
          element={
            <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
              <AllCanchas />
            </MainLayout>
          }
        />

        {/* Rutas privadas usando Protected + Outlet */}
        <Route element={<Protected />}>

    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Páginas públicas */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/promotions"
            element={
              <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                <PublicPromotions />
              </MainLayout>
            }
          />

          <Route
            path="/"
            element={
              <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/all-users"
            element={
              <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                <AllUsers />
              </MainLayout>
            }
          />

          {/* Rutas privadas usando Protected + Outlet */}
          <Route element={<Protected />}>
            <Route
              path="/promotions/private"
              element={
                <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                  <Promotions />
                </MainLayout>
              }
            />
            <Route
              path="/my-profile"
              element={
                <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                  <MyProfile />
                </MainLayout>
              }
            />
          </Route>

          <Route
            path="/reservations"
            element={
              <MainLayout loggedIn={!!token} onSignOut={handleUserLogout}>
                <Reservations />
              </MainLayout>
            }
          />

          {/* NotFound */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
