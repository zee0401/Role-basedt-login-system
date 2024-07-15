import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRoutes, ...rest }) => {
  const { currentUser, userRoutes } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const hasAccess = requiredRoutes.some((route) => userRoutes.includes(route));

  return hasAccess ? <Outlet {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
