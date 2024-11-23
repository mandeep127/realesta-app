import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../store/AdminHomeAPI/adminhApiSlice";

const AdminLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(adminLogout()).unwrap();

        localStorage.removeItem("token");

        navigate("/admin/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div className="text-center mt-5">
      <p>Logging out...</p>
    </div>
  );
};

export default AdminLogout;
