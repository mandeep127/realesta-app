// Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/authAPI/authApiSlice";

const UserLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(Logout()).unwrap();

        localStorage.removeItem("user_token");
        localStorage.removeItem("User_Name");

        navigate("/");
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

export default UserLogout;
