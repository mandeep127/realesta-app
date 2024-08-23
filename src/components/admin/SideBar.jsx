import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./Header.css";
import Img from "../../assets/dark.gif";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/admin/dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add any necessary logout logic here
    navigate("/admin/logout");
    setShowLogoutModal(false); // Hide modal after logout
  };

  const handleShowModal = () => setShowLogoutModal(true);
  const handleHideModal = () => setShowLogoutModal(false);

  return (
    <>
      <aside className="sidebar p-3">
        <div className="welcome-message mb-4 text-center">
          <img src={Img} alt="Admin" className="img-fluid" />
          <h4 className="mt-2">Welcome Admin</h4>
          <hr />
        </div>
        <nav className="nav flex-column">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `nav-link d-flex fw-bold align-items-center mb-2 ${
                isActive ? "active" : ""
              }`
            }
            onClick={() => handleNavClick("/admin/dashboard")}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/property"
            className={({ isActive }) =>
              `nav-link d-flex fw-bold align-items-center mb-2 ${
                isActive ? "active" : ""
              }`
            }
            onClick={() => handleNavClick("/admin/property")}
          >
            <FaHome className="me-2" /> Properties
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-link d-flex fw-bold align-items-center mb-2 ${
                isActive ? "active" : ""
              }`
            }
            onClick={() => handleNavClick("/admin/users")}
          >
            <FaUser className="me-2" /> Users
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `nav-link d-flex fw-bold align-items-center mb-2 ${
                isActive ? "active" : ""
              }`
            }
            onClick={() => handleNavClick("/admin/settings")}
          >
            <FaCog className="me-2" /> Settings
          </NavLink>

          <NavLink
            onClick={(e) => {
              e.preventDefault();
              handleShowModal();
            }}
            className="d-flex fw-bold align-items-center mb-2 text-white fs-5 pt-2"
            style={{ textDecoration: "none", paddingLeft: "14px" }}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </NavLink>
        </nav>
      </aside>

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

export default Sidebar;
