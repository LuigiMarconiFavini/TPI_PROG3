import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthenticationContext } from "../services/auth.context";
import { isTokenValid } from "../services/auth.helpers";

const Protected = ({ allowedRoles }) => {
  const { token, user } = useContext(AuthenticationContext);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected;
