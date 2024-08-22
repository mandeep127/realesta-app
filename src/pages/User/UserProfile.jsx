import React, { useEffect, useState } from "react";
import proImg from "../../assets/profile.jpg";
import Loading from "../../assets/wait.gif";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../store/authAPI/authApiSlice";

const UserProfile = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Profile, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/logout");
  };

  const handleChangePassword = () => {
    console.log("Changing password...");
    navigate("/change-password");
  };

  console.log("User profile", Profile);

  const displayText =
    Profile?.name && Profile?.id
      ? `${Profile.name}.${Profile.id}`
      : "Loading...";

  const handleShowModal = () => setShowLogoutModal(true);
  const handleHideModal = () => setShowLogoutModal(false);

  if (loading) return <img src={Loading} alt="Loading" className="img-fluid" />;
  if (error) return <p className="text-danger">Error loading user profile.</p>;

  return (
    <div className="container my-5 py-5">
      <div className="d-flex flex-column align-items-center">
        <div
          className="rounded-4 p-5 shadow-lg w-100"
          style={{ maxWidth: "400px" }}
        >
          {/* <div className="profile-pic-container rounded-circle border-5 p-2 shadow-sm mb-4"> */}
          <div className="d-flex justify-content-between align-items-center mx-1  mb-4">
            <div>
              <img
                src={proImg}
                alt="Profile Pic"
                className="img-fluid rounded-circle border border-5"
                style={{ width: "130px", height: "130px", objectFit: "cover" }}
              />
            </div>
            <div className="d-flex flex-column align-items-end me-5">
              <button
                className="btn btn-primary mb-2 fw-bold"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              <button
                className="btn btn-danger fw-bold"
                style={{ textDecoration: "none", color: "white" }}
                onClick={handleShowModal}
              >
                Logout
              </button>
            </div>
          </div>
          {/* </div> */}

          <h1 className="mb-4 text-primary text-center">
            {Profile?.name || "Loading..."}
          </h1>
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3 text-left">
              <h5>
                <strong className="pe-1">Username:</strong>{" "}
                <span className="text-secondary">{displayText}</span>
              </h5>
              <h5>
                <strong className="pe-1">ID:</strong>{" "}
                <span className="text-secondary">
                  {Profile?.id || "Loading..."}
                </span>
              </h5>
              <h5>
                <strong className="pe-1">Email:</strong>{" "}
                <span className="text-secondary">
                  {Profile?.email || "Loading..."}
                </span>
              </h5>
            </div>
            <div className="bg-light rounded-3 shadow-sm p-2 px-5">
              <div className="text-left">
                <h5>
                  <strong className="pe-1">Email Verified:</strong>
                  <span
                    className={
                      Profile?.isEmailVerified ? "text-success" : "text-danger"
                    }
                  >
                    {Profile?.isEmailVerified ? "Yes" : "No"}
                  </span>
                </h5>
                <h5>
                  <strong className="pe-1">Created Date:</strong>
                  <span className="text-secondary">
                    {Profile?.created_at || "Loading..."}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        <Modal show={showLogoutModal} onHide={handleHideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Logout Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body className="h6">
            Are you sure you want to logout?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-secondary rounded-pill mt-3 px-4 py-2 me-3"
              onClick={handleHideModal}
            >
              No
            </Button>
            <Button
              className="btn-danger rounded-pill mt-3 px-4 py-2 me-3"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Uncomment if you want to use the loading state */}
        {/* <div className="mt-5 text-center">
        <img src={Loading} alt="Loading" className="img-fluid" />
        <p className="mt-2 text-muted">More Details Not Found...</p>
      </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
