import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);
  
  // Check if the user's role is included in the allowedRoles array
  const isAllowed = allowedRoles.includes(role);

  // If user has token and isAllowed, render the protected route
  // Otherwise, redirect to login page
  const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />;
  
  return accessibleRoute;
};

export default ProtectedRoute;
