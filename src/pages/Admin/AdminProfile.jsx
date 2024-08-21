import React from "react";
import proImg from "../../assets/profile.jpg";
import Loading from "../../assets/wait.gif";

// Dummy user data
const user = {
  id: "12345",
  email: "user@example.com",
  name: "John Doe",
  isEmailVerified: 1,
  createdDate: "2023-01-15",
  username: "johndoe",
};

const AdminProfile = () => {
  return (
    <div className="container mt-4">
      <div className="row rounded-4 bg-light shadow-sm">
        <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
          <div className="profile-pic-container rounded-circle border-5 p-2 shadow-sm">
            <img
              src={proImg}
              alt="Profile Pic"
              className="img-fluid rounded-circle border border-5"
              style={{ width: "130px", height: "130px", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-center p-4">
          <h2 className="mb-3 text-primary">{user.name}</h2>
          <div className="d-flex flex-wrap">
            <div className="flex-fill me-4">
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
            <div className="flex-fill">
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
      </div>
      <div className="mt-5 text-center">
        <img src={Loading} alt="Loading" className="img-fluid" />
        <p className="mt-2 text-muted">More Details Not Found...</p>
      </div>
    </div>
  );
};

export default AdminProfile;
