import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePass } from "../../store/AdminHomeAPI/adminhApiSlice";

const AdminChangePass = () => {
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [generalError, setGeneralError] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages({});
    setGeneralError("");

    if (!current_password || !new_password || !confirm_new_password) {
      setGeneralError("All fields are required");
      return;
    }
    if (new_password !== confirm_new_password) {
      setGeneralError("New passwords do not match");
      return;
    }
    if (new_password.length < 6) {
      setGeneralError("New password must be at least 6 characters long");
      return;
    }

    try {
      const response = await dispatch(
        changePass({ current_password, new_password, confirm_new_password })
      ).unwrap();

      if (response.code === 200) {
        toast.success(response.message || "Password updated successfully!");
      } else if (response.code === 401) {
        toast.error("Current password does not match.");
      }
    } catch (err) {
      if (err.errors) {
        setErrorMessages(err.errors);
      } else {
        setGeneralError(err.message || "An error occurred");
        toast.error(err.message || "An error occurred");
      }
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5 py-5">
      <div
        className="rounded-4 p-5 shadow-lg w-100"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="mb-5 text-center">Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="current-password" className="form-label">
              <FaLock /> Current Password
            </label>
            <input
              type="password"
              id="current-password"
              className="form-control"
              value={current_password}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            {errorMessages.current_password && (
              <div className="alert alert-danger">
                {errorMessages.current_password.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="new-password" className="form-label">
              <FaLock /> New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="form-control"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {errorMessages.new_password && (
              <div className="alert alert-danger">
                {errorMessages.new_password.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirm-new-password" className="form-label">
              <FaLock /> Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-new-password"
              className="form-control"
              value={confirm_new_password}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            {errorMessages.confirm_new_password && (
              <div className="alert alert-danger">
                {errorMessages.confirm_new_password.join(", ")}
              </div>
            )}
          </div>

          {generalError && (
            <div className="alert alert-danger">{generalError}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary rounded-5 p-3 px-4 fw-bold"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminChangePass;
