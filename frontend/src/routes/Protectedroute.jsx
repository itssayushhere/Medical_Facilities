// components/ProtectedRoute.js
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);

  const isAllowed = allowedRoles.includes(role);

  return token && isAllowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
