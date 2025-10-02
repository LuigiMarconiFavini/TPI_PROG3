import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthenticationContext } from "../services/auth.context";
import { isTokenValid } from "../services/auth.helpers";

const Protected = () => {
  const { token } = useContext(AuthenticationContext);
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;
