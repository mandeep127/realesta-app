
import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import './Header.css'; 


const Header = () => {
  return (
    <header className="header bg-dark text-white d-flex justify-content-between align-items-center p-3">
     
      <h3 className="m-0">Admin Dashboard</h3>
      <div className="d-flex align-items-center">
        <FaBell className="mx-2" />
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic" className="d-flex align-items-center">
            <FaUser className="me-2" />
            <span>Profile</span>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item href="#profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#settings">Settings</Dropdown.Item>
            <Dropdown.Item href="#logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
