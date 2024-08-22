import React, { useState } from "react";
import { FaLock } from "react-icons/fa";

const UserChangePass = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }
    setError("");

    // Submit the form data (e.g., make an API call)
    console.log({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    // Reset form
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="new-password" className="form-label">
              <FaLock /> New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm-new-password" className="form-label">
              <FaLock /> Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-new-password"
              className="form-control"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary rounded-5 p-3 px-4 fw-bold"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserChangePass;
