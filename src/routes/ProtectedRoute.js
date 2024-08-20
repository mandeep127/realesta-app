import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  console.log(children, "children");
  const data = localStorage.getItem("token");
  const navigate = useNavigate();
  const userType = "admin";
  useEffect(() => {
    if (!data && userType != "admin") {
      return navigate("/admin/login");
    } else if (!data && userType != "user") {
      return navigate("/");
    }
  }, []);
  return children;
};

export default ProtectedRoute;
