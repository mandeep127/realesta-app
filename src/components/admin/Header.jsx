import React, { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { Button, Dropdown, Modal } from "react-bootstrap";
import "./Header.css";
import { useNavigate } from "react-router";

const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/admin/logout");
    setShowLogoutModal(false);
  };

  const handleShowModal = () => setShowLogoutModal(true);
  const handleHideModal = () => setShowLogoutModal(false);
  return (
    <>
      <header className="header bg-dark text-white d-flex justify-content-between align-items-center p-3">
        <h3 className="m-0">Admin Dashboard</h3>
        <div className="d-flex align-items-center">
          <FaBell className="mx-2" />
          <Dropdown>
            <Dropdown.Toggle
              variant="dark"
              id="dropdown-basic"
              className="d-flex align-items-center"
            >
              <FaUser className="me-2" />
              <span className="fw-bolder me-2">Profile</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="/admin/profile" className="fw-bolder">
                Profile
              </Dropdown.Item>

              <Dropdown.Item
                href="/admin/change-password"
                className="fw-bolder"
              >
                Change Password
              </Dropdown.Item>

              <Dropdown.Item
                href="#"
                className="fw-bolder"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowModal();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
    </>
  );
};

export default Header;
