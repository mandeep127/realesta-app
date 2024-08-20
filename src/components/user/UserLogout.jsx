import React from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "./apiSlice";

const UserLogout = () => {
  const navigate = useNavigate();
  const [logout, { isLoading, isError, isSuccess }] = userLogout();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger"
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default UserLogout;
