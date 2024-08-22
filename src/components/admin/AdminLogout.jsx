import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../store/AdminHomeAPI/adminhApiSlice";

const AdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safely get admin state with default values
  const adminState = useSelector((state) => state.admin) || {};
  const { isLoading = false, isError = false, isSuccess = false } = adminState;

  const handleLogout = async () => {
    try {
      await dispatch(adminLogout()).unwrap();

      localStorage.removeItem("admin_token");

      navigate("/");
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

export default AdminLogout;
