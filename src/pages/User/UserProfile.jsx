import React, { useEffect, useState } from "react";
import proImg from "../../assets/profile.jpg";
import Loading from "../../assets/wait.gif";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../store/authAPI/authApiSlice";
import { FaEye, FaSignOutAlt } from "react-icons/fa";
import "./UserProfile.css";
import { format } from "date-fns";

const UserProfile = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Updated state to handle properties
  const { Profile, properties, loading, error } = useSelector((state) => ({
    Profile: state.users.Profile,
    properties: state.users.Profile ? state.users.Profile.properties : [],
    loading: state.users.loading,
    error: state.users.error,
  }));

  console.log("UserProfile", Profile);

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

  const displayText =
    Profile?.name && Profile?.id
      ? `${Profile.name}.${Profile.id}`
      : "Loading...";

  const handleShowModal = () => setShowLogoutModal(true);
  const handleHideModal = () => setShowLogoutModal(false);

  if (loading)
    return (
      <img src={Loading} alt="Loading" className="img-fluid d-block mx-auto" />
    );
  if (error)
    return (
      <p className="text-danger text-center">Error loading user profile.</p>
    );

  return (
    <div className="mx-5 my-5">
      <div className="custom-css rounded-4 bg-light shadow-lg d-flex align-items-start position-relative">
        {/* Profile Info Section */}
        <div className="flex-grow-1 pe-4">
          <h1 className="text-primary pb-3">
            Welcome, {Profile?.name || "Loading..."}
          </h1>
          <p className="p-custom">
            <strong>Username:</strong>{" "}
            <span className="text-secondary">{displayText}</span>
          </p>
          <p className="p-custom">
            <strong>ID:</strong>{" "}
            <span className="text-secondary">
              {Profile?.id || "Loading..."}
            </span>
          </p>
          <p className="p-custom">
            <strong>Email:</strong>{" "}
            <span className="text-secondary">
              {Profile?.email || "Loading..."}
            </span>
          </p>
          <p className="p-custom">
            <strong>Email Verified:</strong>{" "}
            <span
              className={
                Profile?.isEmailVerified ? "text-success" : "text-danger"
              }
            >
              {Profile?.isEmailVerified ? "Yes" : "No"}
            </span>
          </p>
          <p className="p-custom">
            <strong>Created Date:</strong>{" "}
            <span className="text-secondary">
              {Profile?.created_at
                ? format(new Date(Profile?.created_at), "dd MMM yy, hh:mm a")
                : "N/A"}
            </span>
          </p>
        </div>

        {/* Profile Picture and Buttons Section */}
        <div className="d-flex flex-column align-items-end position-relative">
          <img
            src={proImg}
            alt="Profile Pic"
            className="profile-pic img-fluid rounded-circle border border-5"
          />
          <p className="mt-2 me-5">
            <strong>Last Update on:</strong>{" "}
            <span className="text-secondary">
              {Profile?.updated_at
                ? format(new Date(Profile?.updated_at), "dd.MMM.yy")
                : "N/A"}
            </span>
          </p>
          <div className=" text-end">
            <Button
              className="btn-primary me-3 p-2 px-3"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
            <Button
              className="bg-danger btn-danger p-2 px-3"
              onClick={handleShowModal}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="custom-css rounded-4 bg-light shadow p-4">
        <h3 className="text-center mb-5 mt-4">Properties for Sale</h3>
        {properties.length > 0 ? (
          <ul className="list-unstyled">
            {properties.map((property) => (
              <li key={property.id} className="mb-4">
                <div className="d-flex align-items-center rounded-4 bg-white shadow p-2 ps-3">
                  {property.image ? (
                    <img
                      src={`http://127.0.0.1:8000/${property.image} `}
                      alt="Image Not Found"
                      className="img-fluid property-section rounded-4 me-4"
                    />
                  ) : null}
                  <div className="flex-grow-1 ps-2">
                    <h5 className="text-primary pb-2">
                      {property.address || "N/a"}
                    </h5>
                    <p className="text-secondary">
                      Price: {property.price || "N/a"} /-
                    </p>
                    <p className="text-secondary">
                      Size: {property.size || "N/a"} sq.ft
                    </p>
                  </div>

                  <div className="flex-grow-3 me-5">
                    <Button
                      variant="outline-primary"
                      className="d-flex align-items-center justify-content-center rounded-pill mt-3"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <FaEye className="me-2" /> View More
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No properties found 🚫.</p>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
