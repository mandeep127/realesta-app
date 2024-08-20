import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../store/AdminHomeAPI/adminhApiSlice";

const AdminLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess } = useSelector((state) => state.admin);

  const handleLogout = async () => {
    try {
      await dispatch(adminLogout()).unwrap();

      localStorage.removeItem("token");
      localStorage.removeItem("name");

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
