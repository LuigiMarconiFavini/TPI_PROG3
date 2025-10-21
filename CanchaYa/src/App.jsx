import React, { useContext } from "react";
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
import { AuthenticationContext } from "./components/services/auth.context";
import { ThemeProvider } from "./components/context/ThemeProvider";
import AllUsers from "./components/allUsers/allUsers";
import AllCanchas from "./components/allCanchas/AllCanchas";
import AllReservas from "./components/allReservas/AllReservas";
import MyReservations from "./components/reservations/MyReservations";
import ReservationSummary from "./components/reservationSummary/ReservationSummary";
import { Toaster } from "react-hot-toast";

function App() {
  const { token, handleUserLogout } = useContext(AuthenticationContext);
  const loggedIn = !!token;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={loggedIn ? <Navigate to="/" /> : <Register />}
          />
          
          <Route
            path="/"
            element={
              <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                <Contact />
              </MainLayout>
            }
          />

          {/* Rutas privadas para cualquier user logueado */}
          <Route
            element={<Protected allowedRoles={["user", "admin", "sysadmin"]} />}
          >
            
            <Route
              path="/my-profile"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <MyProfile />
                </MainLayout>
              }
            />
            <Route
              path="/reservations"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <Reservations />
                </MainLayout>
              }
            />
            <Route
              path="/resumen-reserva"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <ReservationSummary />
                </MainLayout>
              }
            />
            <Route
              path="/my-reservations/:id"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <MyReservations />
                </MainLayout>
              }
            />
          </Route>

          {/* Rutas solo para admin y sysadmin */}
          <Route element={<Protected allowedRoles={["admin", "sysadmin"]} />}>
            <Route
              path="/all-users"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <AllUsers />
                </MainLayout>
              }
            />
            <Route
              path="/all-canchas"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <AllCanchas />
                </MainLayout>
              }
            />
            <Route
              path="/all-reservas"
              element={
                <MainLayout loggedIn={loggedIn} onSignOut={handleUserLogout}>
                  <AllReservas />
                </MainLayout>
              }
            />
          </Route>

          {/* NotFound */}
          <Route path="/*" element={<NotFound />} />
        </Routes>

        {/* Toaster sin props problemáticas */}
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
