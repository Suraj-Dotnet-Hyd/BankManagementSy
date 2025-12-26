import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({child}){
    // const navigate = useNavigate();
    const token = localStorage.getItem("token")
   if (!token) {
    return <Navigate to="/" replace />;
  }

  return child;

}
export default ProtectedRoute;
