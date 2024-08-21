import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
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
            <Dropdown.Item href="#settings" className="fw-bolder">
              Settings
            </Dropdown.Item>
            <Dropdown.Item href="#logout" className="fw-bolder">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
