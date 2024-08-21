import React from "react";
import proImg from "../../assets/profile.jpg";
import Loading from "../../assets/wait.gif";

const user = {
  id: "12345",
  email: "user@example.com",
  name: "John Doe",
  isEmailVerified: 1,
  createdDate: "2023-01-15",
  username: "johndoe",
};

const UserProfile = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleChangePassword = () => {
    console.log("Changing password...");
  };

  return (
    <div className="container my-5 py-5">
      <div className="d-flex flex-column align-items-center">
        <div className="profile-pic-container rounded-circle border-5 p-2 shadow-sm mb-4">
          <img
            src={proImg}
            alt="Profile Pic"
            className="img-fluid rounded-circle border border-5"
            style={{ width: "130px", height: "130px", objectFit: "cover" }}
          />
        </div>
        <div className="bg-light rounded-4 shadow-sm  p-2 px-5">
          <h2 className="mb-4 text-primary text-center">{user.name}</h2>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3 text-left">
              <p>
                <strong className="pe-1">Username:</strong>{" "}
                <span className="text-secondary">{user.username}</span>
              </p>
              <p>
                <strong className="pe-1">ID:</strong>{" "}
                <span className="text-secondary">{user.id}</span>
              </p>
              <p>
                <strong className="pe-1">Email:</strong>{" "}
                <span className="text-secondary">{user.email}</span>
              </p>
            </div>
            <div className="text-left">
              <p>
                <strong className="pe-1">Email Verified:</strong>
                <span
                  className={
                    user.isEmailVerified ? "text-success" : "text-danger"
                  }
                >
                  {user.isEmailVerified ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <strong className="pe-1">Created Date:</strong>
                <span className="text-secondary">{user.createdDate}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4 mb-5">
          <button
            className="btn btn-primary me-2 fw-bold"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <button className="btn btn-danger fw-bold" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {/* Uncomment if you want to use the loading state */}
      {/* <div className="mt-5 text-center">
        <img src={Loading} alt="Loading" className="img-fluid" />
        <p className="mt-2 text-muted">More Details Not Found...</p>
      </div> */}
    </div>
  );
};

export default UserProfile;
