// Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/authAPI/authApiSlice";
import { toast } from "react-toastify";
import LogOutImg from "../../assets/logout.gif";

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
        toast.success("Logout successfully");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <>
      <div className="text-center mt-5">
        <p className="mt-5">Logging out... </p>
        <img
          src={LogOutImg}
          alt="logout"
          className="mt-5"
          width="50"
          height="50"
        />{" "}
      </div>
    </>
  );
};

export default UserLogout;
