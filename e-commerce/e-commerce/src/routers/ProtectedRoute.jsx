// src/routes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { jwt, role: userRole } = useSelector((store) => store.auth);

  if (!jwt) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />; // block wrong role
  }

  return children;
};

export default ProtectedRoute;
